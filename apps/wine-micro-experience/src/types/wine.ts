/**
 * Wine Micro-Experience Type Definitions
 *
 * Maps to V&V Evaluation Framework:
 * - Primitive: Wine Story Card
 * - Governance: Engagement Depth Score
 * - Safety: Cultural Attribution
 */

// === WINE STORY CARD (Primitive) ===

export interface WineStoryCard {
  wine_id: string
  name: string
  varietal: string
  vintage: number

  // Terroir & Origin
  origin: {
    region: string
    subregion?: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }

  // Maker Voice (Oral-Kinetic pairing)
  maker_voice: {
    name: string
    role: 'winemaker' | 'viticulturist' | 'owner' | 'sommelier'
    perspective: 'incumbent' | 'digital_native'
    quote: string
    audio_url?: string
  }

  // Pairing & Experience
  pairing_notes: {
    food: string[]
    occasion: string[]
    mood: string[]
  }

  // Cultural Attribution (Safety Gate)
  attribution: {
    indigenous_territory?: string
    labor_acknowledgment?: string
    cultural_notes?: string
    fpic_status: 'verified' | 'pending' | 'not_applicable'
  }

  // Engagement metadata
  engagement: {
    views: number
    saves: number
    shares: number
    depth_score: number
  }

  // Status
  crown_status: 'OPEN' | 'LOCKED' | 'PREMIUM'
  created_at: string
  updated_at: string
}

// === DUAL PERSONA TYPES ===

export type PersonaType = 'trader' | 'new_buyer'

export interface UserPersona {
  type: PersonaType
  session_id: string
  preferences: {
    regions_explored: string[]
    varietals_liked: string[]
    price_range?: 'value' | 'mid' | 'premium' | 'luxury'
  }
  journey: {
    cards_viewed: string[]
    cards_saved: string[]
    time_spent_ms: number
    interactions: number
  }
}

// === ENGAGEMENT EVENTS (STA-39 Mapping) ===

export type EngagementEventType =
  | 'card_viewed'
  | 'card_saved'
  | 'card_shared'
  | 'region_explored'
  | 'audio_played'
  | 'audio_completed'
  | 'persona_switched'
  | 'unlock_requested'
  | 'session_started'
  | 'session_ended'

export interface EngagementEvent {
  event_id: string
  event_type: EngagementEventType
  session_id: string
  persona: PersonaType
  timestamp: string
  properties: Record<string, unknown>

  // Depth scoring components
  depth_signals: {
    time_on_card_ms?: number
    scroll_depth?: number
    interactions_count?: number
    audio_completion_pct?: number
  }
}

// === ENGAGEMENT DEPTH SCORE ===

export interface EngagementDepthScore {
  session_id: string
  persona: PersonaType

  // Score components (0-100 each)
  components: {
    regions_explored: number      // breadth
    time_engaged: number          // duration
    interactions: number          // activity
    depth_per_card: number        // quality
  }

  // Composite score (weighted average)
  total_score: number

  // Computed at
  computed_at: string
}

// === CULTURAL SAFETY GATE ===

export interface CulturalSafetyCheck {
  wine_id: string
  check_type: 'narrative_generation' | 'attribution_display' | 'sharing'

  // Safety flags
  flags: {
    indigenous_territory_mentioned: boolean
    requires_fpic: boolean
    labor_attribution_needed: boolean
    cultural_sensitivity_warning: boolean
  }

  // Gate decision
  passed: boolean
  blocked_reason?: string

  // Audit
  checked_at: string
}

// === PHASER GAME STATE ===

export interface GameState {
  currentCard: WineStoryCard | null
  persona: PersonaType
  discoveredRegions: Set<string>
  savedCards: string[]
  sessionStartTime: number
  interactionCount: number
}

// === API RESPONSES ===

export interface WineDiscoveryResponse {
  cards: WineStoryCard[]
  regions: {
    name: string
    card_count: number
    center: { lat: number; lng: number }
  }[]
  persona_recommendations: string[]
}

export interface ShareableCardPayload {
  card: WineStoryCard
  sharer_persona: PersonaType
  share_token: string
  expires_at: string
  discord_webhook_url?: string
}
