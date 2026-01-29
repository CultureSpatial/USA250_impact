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
