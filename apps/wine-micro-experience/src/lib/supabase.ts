import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type-safe database interface
export type Database = {
  public: {
    Tables: {
      wine_stories: {
        Row: {
          id: string
          wine_id: string
          name: string
          varietal: string
          vintage: number
          origin: Record<string, unknown>
          maker_voice: Record<string, unknown>
          pairing_notes: Record<string, unknown>
          attribution: Record<string, unknown>
          engagement: Record<string, unknown>
          crown_status: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['wine_stories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['wine_stories']['Insert']>
      }
      engagement_events: {
        Row: {
          id: string
          event_type: string
          session_id: string
          persona: string
          timestamp: string
          properties: Record<string, unknown>
          depth_signals: Record<string, unknown>
        }
        Insert: Omit<Database['public']['Tables']['engagement_events']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['engagement_events']['Insert']>
      }
      sessions: {
        Row: {
          id: string
          session_id: string
          persona: string
          started_at: string
          ended_at: string | null
          depth_score: Record<string, unknown> | null
        }
        Insert: Omit<Database['public']['Tables']['sessions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['sessions']['Insert']>
      }
      // Cascadia expansion tables
      wine_interactions: {
        Row: {
          id: string
          session_id: string
          persona: 'trader' | 'buyer'
          event_type: string
          event_payload: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['wine_interactions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['wine_interactions']['Insert']>
      }
      wine_cards: {
        Row: {
          id: string
          wine_name: string
          region: string
          varietal: string
          maker_voice: string | null
          cultural_context: string | null
          attribution: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['wine_cards']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['wine_cards']['Insert']>
      }
    }
  }
}

// Helper functions for common operations

export async function logEngagementEvent(
  eventType: string,
  sessionId: string,
  persona: string,
  properties: Record<string, unknown> = {},
  depthSignals: Record<string, unknown> = {}
) {
  const { error } = await supabase
    .from('engagement_events')
    .insert({
      event_type: eventType,
      session_id: sessionId,
      persona,
      timestamp: new Date().toISOString(),
      properties,
      depth_signals: depthSignals,
    })

  if (error) {
    console.error('Failed to log engagement event:', error)
  }
}

export async function getWineStories(limit = 10) {
  const { data, error } = await supabase
    .from('wine_stories')
    .select('*')
    .limit(limit)

  if (error) {
    console.error('Failed to fetch wine stories:', error)
    return []
  }

  return data
}

export async function saveCardToProfile(sessionId: string, wineId: string) {
  const { error } = await supabase
    .from('saved_cards')
    .insert({
      session_id: sessionId,
      wine_id: wineId,
      saved_at: new Date().toISOString(),
    })

  return !error
}

// ============================================
// Cascadia Wine Cards helpers
// ============================================

/**
 * Log interaction to simplified wine_interactions table
 * Use for Cascadia region tracking (WA, OR, BC)
 */
export async function logInteraction(
  sessionId: string,
  persona: 'trader' | 'buyer',
  eventType: string,
  eventPayload: Record<string, unknown> = {}
) {
  const { error } = await supabase
    .from('wine_interactions')
    .insert({
      session_id: sessionId,
      persona,
      event_type: eventType,
      event_payload: eventPayload,
    })

  if (error) {
    console.error('Failed to log interaction:', error)
  }
  return !error
}

/**
 * Get wine cards by region (WA, OR, BC)
 */
export async function getWineCardsByRegion(regionFilter?: string) {
  let query = supabase.from('wine_cards').select('*')

  if (regionFilter) {
    query = query.ilike('region', `%${regionFilter}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Failed to fetch wine cards:', error)
    return []
  }

  return data
}

/**
 * Get all Cascadia wine cards grouped by state/province
 */
export async function getCascadiaWineSummary() {
  const { data, error } = await supabase
    .from('cascadia_wine_summary')
    .select('*')

  if (error) {
    console.error('Failed to fetch Cascadia summary:', error)
    return []
  }

  return data
}
