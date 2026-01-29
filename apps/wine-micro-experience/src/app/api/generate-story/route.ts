import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

const WineStorySchema = z.object({
  headline: z.string().describe('Compelling 6-8 word headline'),
  narrative: z.string().describe('150-word cultural terroir story'),
  pairing: z.string().describe('One unexpected food pairing'),
  cultural_safety_check: z
    .boolean()
    .describe('True if narrative respects Indigenous knowledge sovereignty'),
})

export async function POST(req: Request) {
  const { wine_card, persona } = await req.json()

  const prompt =
    persona === 'trader'
      ? `Generate allocation insights for ${wine_card.wine_name}: production volume estimate, competitive positioning, margin opportunity. Stay factual.`
      : `Generate a story for ${wine_card.wine_name} from ${wine_card.region}. Use maker_voice: "${wine_card.maker_voice}" and cultural_context: "${wine_card.cultural_context}". Respect Indigenous knowledge - never claim ownership of TEK. If cultural_context mentions a Nation, frame as partnership/acknowledgment, not appropriation.`

  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: WineStorySchema,
    prompt,
  })

  if (!object.cultural_safety_check) {
    return Response.json(
      { error: 'Cultural safety gate failed' },
      { status: 400 }
    )
  }

  return Response.json(object)
}
