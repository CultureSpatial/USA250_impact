/**
 * GrowthBook Sovereignty Configuration
 * Cultural Current Mesh — IGNIS-ADAPT feature flag system
 *
 * Maps graduated sovereignty levels (0-3) to GrowthBook feature flag presets.
 * Used by component slices (Conference, Pop-Up, Workshop, Commercial) to control
 * which CCM capabilities are active in each deployment context.
 */

// ============================================================
// Feature Flag Definitions
// ============================================================

export type CCMFeatureFlags = {
  /** IGNIS-ADAPT Tier 1: CFI/SSI < 0.50 triggers hard block (veto) */
  "governance-tier1-veto": boolean
  /** Hume.ai EVI voice synthesis (sensory atmosphere layer) */
  "hume-voice-synthesis": boolean
  /** Layer 2: Community Memory narrative layer */
  "community-memory-layer": boolean
  /** Tend action: steward contribution submission */
  "tend-action-enabled": boolean
  /** Transmit action: share/viral mechanic */
  "transmit-action-enabled": boolean
  /** SCID/DACUM vocational training mode (Workshop slice) */
  "scid-dacum-mode": boolean
  /** Minimum Viable Revenue tracking (Commercial slice) */
  "mvr-tracking": boolean
  /** ECP distribution enforcement (70/20/10 split) */
  "ecp-distribution": boolean
  /** pgvector semantic search (Phase 2) */
  "semantic-search": boolean
  /** Felt.com live collaborative editing (vs read-only embed) */
  "felt-live-edit": boolean
}

export type SovereigntyLevel = 0 | 1 | 2 | 3

export type DeploymentSlice = "conference" | "popup" | "workshop" | "commercial" | "devpost"

// ============================================================
// Sovereignty Level Presets
// ============================================================

/**
 * Level 0 — Observer
 * Conference demos, public kiosk, read-only contexts.
 * Governance runs in "monitor" mode — records but does not block.
 */
export const SOVEREIGNTY_LEVEL_0: CCMFeatureFlags = {
  "governance-tier1-veto": false,
  "hume-voice-synthesis": false,
  "community-memory-layer": false,
  "tend-action-enabled": false,
  "transmit-action-enabled": true,
  "scid-dacum-mode": false,
  "mvr-tracking": false,
  "ecp-distribution": false,
  "semantic-search": false,
  "felt-live-edit": false,
}

/**
 * Level 1 — Editorial Control
 * Pop-Up events, hospitality activations.
 * Narrative editors assigned; community memory unlocked.
 */
export const SOVEREIGNTY_LEVEL_1: CCMFeatureFlags = {
  "governance-tier1-veto": false,
  "hume-voice-synthesis": true,
  "community-memory-layer": true,
  "tend-action-enabled": false,
  "transmit-action-enabled": true,
  "scid-dacum-mode": false,
  "mvr-tracking": false,
  "ecp-distribution": false,
  "semantic-search": false,
  "felt-live-edit": false,
}

/**
 * Level 2 — Revenue Rules Active
 * Workshop, academic, domain association contexts.
 * Full IGNIS-ADAPT Tier 1 gate active; Tend loop enabled.
 */
export const SOVEREIGNTY_LEVEL_2: CCMFeatureFlags = {
  "governance-tier1-veto": true,
  "hume-voice-synthesis": false,
  "community-memory-layer": true,
  "tend-action-enabled": true,
  "transmit-action-enabled": true,
  "scid-dacum-mode": true,
  "mvr-tracking": false,
  "ecp-distribution": false,
  "semantic-search": false,
  "felt-live-edit": true,
}

/**
 * Level 3 — Federation
 * Commercial B2B deployments with full governance stack.
 * ECP distribution enforced; MVR tracking active.
 */
export const SOVEREIGNTY_LEVEL_3: CCMFeatureFlags = {
  "governance-tier1-veto": true,
  "hume-voice-synthesis": true,
  "community-memory-layer": true,
  "tend-action-enabled": true,
  "transmit-action-enabled": true,
  "scid-dacum-mode": true,
  "mvr-tracking": true,
  "ecp-distribution": true,
  "semantic-search": false, // pgvector Phase 2 — not yet production
  "felt-live-edit": true,
}

export const SOVEREIGNTY_CONFIGS: Record<SovereigntyLevel, CCMFeatureFlags> = {
  0: SOVEREIGNTY_LEVEL_0,
  1: SOVEREIGNTY_LEVEL_1,
  2: SOVEREIGNTY_LEVEL_2,
  3: SOVEREIGNTY_LEVEL_3,
}

// ============================================================
// Deployment Slice → Sovereignty Level Mapping
// ============================================================

export const SLICE_TO_SOVEREIGNTY: Record<DeploymentSlice, SovereigntyLevel> = {
  conference: 0,
  devpost: 0,
  popup: 1,
  workshop: 2,
  commercial: 3,
}

// ============================================================
// IGNIS-ADAPT Gate Thresholds
// ============================================================

export const IGNIS_ADAPT_THRESHOLDS = {
  /** Tier 1: CFI or SSI below this → hard veto (project termination) */
  TIER_1_VETO: 0.50,
  /** Tier 2: CFI or SSI below this → recertification required */
  TIER_2_RECERTIFY: 0.65,
  /** Tier 3: Both CFI and SSI above this → enhancement eligible */
  TIER_3_ENHANCEMENT: 0.80,
} as const

// ============================================================
// Helper: Get flags for a given sovereignty level or slice
// ============================================================

export function getFlagsForLevel(level: SovereigntyLevel): CCMFeatureFlags {
  return SOVEREIGNTY_CONFIGS[level]
}

export function getFlagsForSlice(slice: DeploymentSlice): CCMFeatureFlags {
  return SOVEREIGNTY_CONFIGS[SLICE_TO_SOVEREIGNTY[slice]]
}

export function isFeatureEnabled(
  feature: keyof CCMFeatureFlags,
  level: SovereigntyLevel
): boolean {
  return SOVEREIGNTY_CONFIGS[level][feature]
}

/**
 * Check IGNIS-ADAPT governance gate.
 * Returns true if the narrative passes (can proceed), false if vetoed.
 */
export function checkIgnisAdaptGate(
  cfiScore: number,
  ssiScore: number,
  sovereigntyLevel: SovereigntyLevel
): { pass: boolean; tier: 1 | 2 | 3 | null; message: string } {
  const flags = getFlagsForLevel(sovereigntyLevel)

  // Tier 1 veto only active at Level 2+
  if (flags["governance-tier1-veto"]) {
    if (cfiScore < IGNIS_ADAPT_THRESHOLDS.TIER_1_VETO) {
      return {
        pass: false,
        tier: 1,
        message: `CFI score ${cfiScore} is below Tier 1 threshold (${IGNIS_ADAPT_THRESHOLDS.TIER_1_VETO}). Project terminated.`,
      }
    }
    if (ssiScore < IGNIS_ADAPT_THRESHOLDS.TIER_1_VETO) {
      return {
        pass: false,
        tier: 1,
        message: `SSI score ${ssiScore} is below Tier 1 threshold (${IGNIS_ADAPT_THRESHOLDS.TIER_1_VETO}). Project terminated.`,
      }
    }
  }

  if (
    cfiScore >= IGNIS_ADAPT_THRESHOLDS.TIER_3_ENHANCEMENT &&
    ssiScore >= IGNIS_ADAPT_THRESHOLDS.TIER_3_ENHANCEMENT
  ) {
    return { pass: true, tier: 3, message: "Tier 3: Enhancement eligible." }
  }

  if (
    cfiScore >= IGNIS_ADAPT_THRESHOLDS.TIER_2_RECERTIFY &&
    ssiScore >= IGNIS_ADAPT_THRESHOLDS.TIER_2_RECERTIFY
  ) {
    return { pass: true, tier: 2, message: "Tier 2: Active with recertification schedule." }
  }

  return { pass: true, tier: null, message: "Monitoring mode (Level 0/1)." }
}
