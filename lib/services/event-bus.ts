/**
 * Event Bus — cross-module broadcast service
 * Issue #35 / ENG-11
 *
 * Supports two transport layers:
 *   1. In-process:  typed pub/sub for same-origin components
 *   2. Cross-frame: window CustomEvent bridge for Module Federation remotes
 *
 * Usage (subscribe):
 *   import { eventBus } from '@/lib/services/event-bus'
 *   const unsub = eventBus.on('TQ_PAUSED', (payload) => { ... })
 *   // later:
 *   unsub()
 *
 * Usage (emit):
 *   eventBus.emit('STORY_SCANNED', { qrCode: 'sku-42', producerId: 'p-8' })
 */

// ─── Event catalogue ─────────────────────────────────────────────────────────

export interface BusEventMap {
  // Cultural Safety / TQ Control Loop (ENG-14)
  TQ_PAUSED:          { score: number; sessionId: string; triggeredAt: string }
  TQ_RESUMED:         { score: number; sessionId: string }
  TQ_UPDATE:          { score: number; delta: number; sessionId: string }

  // Narrative / Place Packet interactions
  STORY_SCANNED:      { qrCode: string; producerId: string; stopId?: string }
  NARRATIVE_STARTED:  { packetId: string; layerType: string }
  NARRATIVE_ENDED:    { packetId: string; durationMs: number }
  STOP_ARRIVED:       { stopId: string; packetId: string }
  STOP_DEPARTED:      { stopId: string; dwellMs: number }

  // Audio / Media (ENG-16)
  AUDIO_GEM_RECORDED: { blobUrl: string; durationMs: number; stopId?: string }
  AUDIO_GEM_UPLOADED: { gemId: string; transcriptPending: boolean }

  // BCI / Biometrics (ENG-14, MDP-85)
  MENTAL_STATE_UPDATE: { tq: number; pp: number; ncv: number; source: string }

  // DtC commerce attribution
  DTC_INTENT:         { skuId: string; producerId: string; sourceEvent: string }
  DTC_CONVERTED:      { orderId: string; skuId: string; daysPostScan: number }

  // MFE / navigation
  MFE_READY:          { moduleId: string; version: string }
  MFE_ERROR:          { moduleId: string; error: string }
  NAV_REQUESTED:      { path: string; params?: Record<string, string> }
}

export type BusEventName = keyof BusEventMap
export type BusHandler<K extends BusEventName> = (payload: BusEventMap[K]) => void

// ─── EventBus class ───────────────────────────────────────────────────────────

class EventBus {
  private handlers: Map<string, Set<BusHandler<BusEventName>>> = new Map()
  private bridgeEnabled = false

  // ── Subscription ──────────────────────────────────────────────────────────

  /** Subscribe to an event. Returns an unsubscribe function. */
  on<K extends BusEventName>(event: K, handler: BusHandler<K>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler as BusHandler<BusEventName>)
    return () => this.off(event, handler)
  }

  /** Alias for `on` (familiar EventEmitter API). */
  subscribe<K extends BusEventName>(event: K, handler: BusHandler<K>) {
    return this.on(event, handler)
  }

  /** One-shot subscriber — auto-unsubscribes after first invocation. */
  once<K extends BusEventName>(event: K, handler: BusHandler<K>): () => void {
    const wrapper: BusHandler<K> = (payload) => {
      handler(payload)
      this.off(event, wrapper)
    }
    return this.on(event, wrapper)
  }

  /** Remove a specific handler for an event. */
  off<K extends BusEventName>(event: K, handler: BusHandler<K>) {
    this.handlers.get(event)?.delete(handler as BusHandler<BusEventName>)
  }

  // ── Publishing ────────────────────────────────────────────────────────────

  /** Emit an event — notifies all in-process subscribers and (if enabled) the window bridge. */
  emit<K extends BusEventName>(event: K, payload: BusEventMap[K]) {
    // In-process delivery
    this.handlers.get(event)?.forEach((h) => {
      try {
        h(payload)
      } catch (err) {
        console.error(`[EventBus] Handler error on "${event}":`, err)
      }
    })

    // Cross-frame / MFE bridge
    if (this.bridgeEnabled && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(`usa250:${event}`, { detail: payload, bubbles: false })
      )
    }
  }

  /** Alias for `emit` (observable-style API). */
  publish<K extends BusEventName>(event: K, payload: BusEventMap[K]) {
    return this.emit(event, payload)
  }

  // ── Cross-frame bridge ────────────────────────────────────────────────────

  /**
   * Enable the window CustomEvent bridge so Module Federation remotes
   * (different JS contexts) can receive events via window.addEventListener.
   *
   * Call once in your shell app's root layout:
   *   eventBus.enableBridge()
   */
  enableBridge() {
    if (typeof window === 'undefined' || this.bridgeEnabled) return

    this.bridgeEnabled = true

    // Also subscribe to inbound bridge events from remotes
    ;(Object.keys({} as BusEventMap) as BusEventName[]).forEach((name) => {
      window.addEventListener(`usa250:${name}`, ((e: CustomEvent) => {
        this.emit(name, e.detail)
      }) as EventListener)
    })
  }

  // ── Diagnostics ───────────────────────────────────────────────────────────

  /** Returns the number of active subscribers per event (useful for testing). */
  subscriberCount<K extends BusEventName>(event: K): number {
    return this.handlers.get(event)?.size ?? 0
  }

  /** Remove all subscribers for all events. */
  clear() {
    this.handlers.clear()
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

export const eventBus = new EventBus()

// ─── React hook helper ────────────────────────────────────────────────────────

/**
 * Subscribe to a bus event for the lifetime of a React component.
 *
 * Usage:
 *   useBusEvent('TQ_PAUSED', ({ score }) => setPaused(true))
 */
export function useBusEvent<K extends BusEventName>(
  event: K,
  handler: BusHandler<K>,
  deps: unknown[] = []
) {
  // Dynamic import of useEffect so this file stays usable in non-React contexts
  if (typeof window === 'undefined') return // SSR guard

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useEffect } = require('react') as typeof import('react')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => eventBus.on(event, handler), [event, ...deps])
}
