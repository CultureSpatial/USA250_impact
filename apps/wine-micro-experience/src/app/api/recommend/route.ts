import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const RecommendationSchema = z.object({
  recommended_wine: z.string().describe('Name of recommended wine from available cards'),
  reasoning: z.string().describe('2-3 sentence explanation of why this wine matches the user behavior'),
  transition_quotient: z.number().min(0).max(100).describe('TQ score: how ready is this user to try something new (0=comfort zone, 100=adventurous)'),
  next_action: z.string().describe('Suggested next action for the user'),
})

export async function POST(req: Request) {
  const { session_id, persona } = await req.json()

  // Fetch interaction history for this session
  const { data: interactions } = await supabase
    .from('wine_interactions')
    .select('event_type, event_payload, created_at')
    .eq('session_id', session_id)
    .order('created_at', { ascending: true })

  // Fetch all available wine cards
  const { data: wineCards } = await supabase
    .from('wine_cards')
    .select('wine_name, region, varietal, maker_voice, cultural_context')

  if (!interactions || interactions.length === 0) {
    return Response.json(
      { error: 'No interaction history found for this session' },
      { status: 400 }
    )
  }

  // Build interaction summary for the agent
  const regionsVisited = interactions
    .filter((i) => i.event_payload?.region)
    .map((i) => (i.event_payload as { region: string }).region)

  const eventTypes = interactions.map((i) => i.event_type)

  const interactionSummary = {
    total_interactions: interactions.length,
    regions_visited: [...new Set(regionsVisited)],
    event_types: eventTypes.reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] || 0) + 1
      return acc
    }, {}),
    session_duration_events: interactions.length,
    persona,
  }

  const availableWines = (wineCards || [])
    .map((w) => `${w.wine_name} (${w.region}, ${w.varietal})`)
    .join('\n')

  const prompt = `You are a wine recommendation agent for the Cascadia wine corridor (WA, OR, BC).

Based on this user's interaction history, recommend the BEST NEXT wine for them to explore.

USER BEHAVIOR:
${JSON.stringify(interactionSummary, null, 2)}

AVAILABLE WINES:
${availableWines}

RULES:
- Recommend a wine from a region they HAVEN'T visited yet (if possible)
- If they've visited all regions, recommend based on varietal diversity
- For "trader" persona: emphasize allocation opportunity and market positioning
- For "buyer" persona: emphasize story, cultural context, and discovery
- Calculate their Transition Quotient (TQ): how adventurous they are based on behavior patterns
  - High TQ (70+): diverse regions, many spins, quick exploration
  - Medium TQ (40-69): steady exploration, some repeat visits
  - Low TQ (0-39): few regions, long dwell time, cautious
- Never recommend exploitative cultural narratives`

  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: RecommendationSchema,
    prompt,
  })

  return Response.json(object)
}
