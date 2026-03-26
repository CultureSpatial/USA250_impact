/**
 * TQ (Transition Quotient) Telemetry Service — ENG-14 / Issue #17
 *
 * Measures real-time Cultural Safety by computing a rolling score from
 * interaction events. When the score exceeds 0.65, the TQ_PAUSED event
 * is emitted via the EventBus and (when configured) posted to Supabase.
 *
 * Architecture:
 *   interaction events → TQTelemetryService → rolling score
 *                                           → EventBus.emit('TQ_UPDATE')
 *                                           → EventBus.emit('TQ_PAUSED')  [if > threshold]
 *                                           → Supabase tq_state table     [if configured]
 *
 * Usage:
 *   import { tqTelemetry } from '@/lib/services/tq-telemetry'
 *
 *   // In a page/layout component:
 *   tqTelemetry.startSession('session-abc-123')
 *   tqTelemetry.record({ type: 'page_view', weight: 0.1 })
 *   tqTelemetry.record({ type: 'refusal_triggered', weight: 0.9 })
 *
 *   // BCI bridge (from useBrainInterface / window.onMentalState):
 *   tqTelemetry.ingestBiometric({ tq: 0.72, pp: 0.4, ncv: 0.3, source: 'eeg_muse' })
 */

import { eventBus } from './event-bus'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TQEventType =
  | 'page_view'
  | 'stop_arrived'
  | 'stop_departed'
  | 'story_played'
  | 'refusal_triggered'
  | 'consent_accepted'
  | 'consent_declined'
  | 'audio_gem_captured'
  | 'narrative_skipped'
  | 'cultural_boundary_hit'
  | 'biometric_update'

export interface TQInteractionEvent {
  type: TQEventType
  /** 0–1: how much this interaction stresses the cultural safety threshold */
  weight: number
  metadata?: Record<string, unknown>
}

export interface BiometricPayload {
  tq: number   // 0–1, direct from NeuralOS / HMD
  pp: number   // Presence Pulse
  ncv: number  // Neural Coherence Value
  source: string
}

export interface TQSnapshot {
  score: number
  sessionId: string
  eventCount: number
  paused: boolean
  timestamp: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAUSE_THRESHOLD = 0.65
const WINDOW_SIZE     = 20  // rolling window — last N events
const BIOMETRIC_BLEND = 0.4 // how much weight biometric tq gets vs. interaction tq

// Default interaction weights — override via record() `weight` param
const DEFAULT_WEIGHTS: Record<TQEventType, number> = {
  page_view:             0.05,
  stop_arrived:          0.1,
  stop_departed:         0.05,
  story_played:          0.15,
  refusal_triggered:     0.85,
  consent_accepted:      0.1,
  consent_declined:      0.7,
  audio_gem_captured:    0.2,
  narrative_skipped:     0.3,
  cultural_boundary_hit: 0.9,
  biometric_update:      0.0,  // handled separately
}

// ─── Service ──────────────────────────────────────────────────────────────────

class TQTelemetryService {
  private sessionId: string | null = null
  private paused = false
  private eventWindow: number[] = []
  private latestBiometricTQ: number | null = null
  private supabaseUrl: string | null = null
  private supabaseKey: string | null = null

  /** Configure Supabase endpoint (call before startSession if needed). */
  configure(supabaseUrl: string, supabaseKey: string) {
    this.supabaseUrl = supabaseUrl
    this.supabaseKey = supabaseKey
  }

  /** Start (or restart) a named session. */
  startSession(sessionId: string) {
    this.sessionId = sessionId
    this.paused = false
    this.eventWindow = []
    this.latestBiometricTQ = null
    console.debug(`[TQ] Session started: ${sessionId}`)
  }

  /** Record an interaction event and update the rolling score. */
  record(event: TQInteractionEvent) {
    const weight = event.weight ?? DEFAULT_WEIGHTS[event.type] ?? 0.1
    this.pushWeight(weight)
    this.evaluate()
  }

  /**
   * Ingest a biometric payload (from NeuralOS BCI / HMD).
   * Blends with interaction score per BIOMETRIC_BLEND ratio.
   */
  ingestBiometric(payload: BiometricPayload) {
    this.latestBiometricTQ = payload.tq

    // Also emit to bus so other services can react
    eventBus.emit('MENTAL_STATE_UPDATE', {
      tq: payload.tq,
      pp: payload.pp,
      ncv: payload.ncv,
      source: payload.source,
    })

    this.pushWeight(payload.tq)
    this.evaluate()
  }

  /** Manually resume after a TQ_PAUSED state (moderator action). */
  resume() {
    if (!this.paused || !this.sessionId) return
    this.paused = false
    eventBus.emit('TQ_RESUMED', {
      score: this.currentScore(),
      sessionId: this.sessionId,
    })
    console.info(`[TQ] Session resumed: ${this.sessionId}`)
  }

  /** Return current snapshot (non-mutating). */
  snapshot(): TQSnapshot {
    return {
      score:      this.currentScore(),
      sessionId:  this.sessionId ?? 'none',
      eventCount: this.eventWindow.length,
      paused:     this.paused,
      timestamp:  new Date().toISOString(),
    }
  }

  // ── Internals ──────────────────────────────────────────────────────────────

  private pushWeight(w: number) {
    this.eventWindow.push(Math.max(0, Math.min(1, w)))
    if (this.eventWindow.length > WINDOW_SIZE) {
      this.eventWindow.shift()
    }
  }

  private currentScore(): number {
    if (this.eventWindow.length === 0) return 0

    const interactionScore =
      this.eventWindow.reduce((s, v) => s + v, 0) / this.eventWindow.length

    if (this.latestBiometricTQ !== null) {
      return (
        interactionScore * (1 - BIOMETRIC_BLEND) +
        this.latestBiometricTQ * BIOMETRIC_BLEND
      )
    }

    return interactionScore
  }

  private evaluate() {
    if (!this.sessionId) return
    const score = this.currentScore()

    eventBus.emit('TQ_UPDATE', {
      score,
      delta: score - (this.eventWindow[this.eventWindow.length - 2] ?? 0),
      sessionId: this.sessionId,
    })

    if (!this.paused && score > PAUSE_THRESHOLD) {
      this.paused = true
      const triggeredAt = new Date().toISOString()

      eventBus.emit('TQ_PAUSED', {
        score,
        sessionId: this.sessionId,
        triggeredAt,
      })

      console.warn(`[TQ] PAUSED — score ${score.toFixed(3)} > ${PAUSE_THRESHOLD} at ${triggeredAt}`)
      this.persistToSupabase(score, triggeredAt)
    }
  }

  private async persistToSupabase(score: number, triggeredAt: string) {
    if (!this.supabaseUrl || !this.supabaseKey || !this.sessionId) return
    try {
      await fetch(`${this.supabaseUrl}/rest/v1/tq_state`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          session_id:   this.sessionId,
          score,
          paused:       true,
          triggered_at: triggeredAt,
          window_size:  this.eventWindow.length,
        }),
      })
    } catch (err) {
      console.error('[TQ] Supabase persistence failed:', err)
    }
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

export const tqTelemetry = new TQTelemetryService()

// ─── BCI bridge — connect window.onMentalState (NeuralOS WebViewManager.kt) ──

if (typeof window !== 'undefined') {
  ;(window as Window & { onMentalState?: (payload: BiometricPayload) => void }).onMentalState =
    (payload) => tqTelemetry.ingestBiometric(payload)
}
