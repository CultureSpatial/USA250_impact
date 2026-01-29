'use client'

import { useState } from 'react'
import { logInteraction } from '@/lib/supabase'

interface WineCard {
  id: string
  wine_name: string
  region: string
  varietal: string
  maker_voice: string | null
  cultural_context: string | null
  attribution: Record<string, unknown>
}

interface GeneratedStory {
  headline: string
  narrative: string
  pairing: string
  cultural_safety_check: boolean
}

interface WineCardModalProps {
  wine: WineCard
  persona: 'trader' | 'buyer'
  sessionId: string
  onClose: () => void
}

export default function WineCardModal({ wine, persona, sessionId, onClose }: WineCardModalProps) {
  const [story, setStory] = useState<GeneratedStory | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateStory = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wine_card: wine, persona }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Generation failed')
      }

      const data: GeneratedStory = await res.json()
      setStory(data)
      await logInteraction(sessionId, persona, 'story_generated', {
        wine_id: wine.id,
        headline: data.headline,
        safety_passed: data.cultural_safety_check,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold mb-4">{wine.wine_name}</h2>
        <p className="text-gray-600 mb-2">
          {wine.region} &mdash; {wine.varietal}
        </p>

        {/* Maker Voice */}
        {wine.maker_voice && (
          <blockquote className="border-l-4 border-purple-400 pl-4 my-4 text-gray-700 italic">
            &ldquo;{wine.maker_voice}&rdquo;
          </blockquote>
        )}

        {/* Cultural Context */}
        {wine.cultural_context && (
          <div className="bg-amber-50 rounded-lg p-4 my-4">
            <p className="text-sm font-medium text-amber-900 mb-1">Cultural Context</p>
            <p className="text-amber-700 text-sm">{wine.cultural_context}</p>
          </div>
        )}

        {/* Generate Button */}
        {!story && (
          <button
            onClick={generateStory}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Generating...'
              : persona === 'trader'
                ? 'Get Allocation Data'
                : 'Discover Story'}
          </button>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Generated Story */}
        {story && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-purple-700">{story.headline}</h3>
            <p className="text-gray-700 leading-relaxed">{story.narrative}</p>
            <div className="bg-purple-50 p-4 rounded">
              <strong>Pairing:</strong> {story.pairing}
            </div>
            {story.cultural_safety_check && (
              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Cultural safety verified
              </span>
            )}
          </div>
        )}

        {/* Attribution */}
        {wine.attribution && Object.keys(wine.attribution).length > 0 && (
          <div className="text-sm text-gray-500 border-t pt-4 mt-6 space-y-1">
            {(wine.attribution as { winery?: string }).winery && (
              <p>
                <strong>Winery:</strong>{' '}
                {(wine.attribution as { winery: string }).winery}
              </p>
            )}
            {(wine.attribution as { land_acknowledgment?: string }).land_acknowledgment && (
              <p>
                <strong>Land:</strong>{' '}
                {(wine.attribution as { land_acknowledgment: string }).land_acknowledgment}
              </p>
            )}
            {(wine.attribution as { cultural_advisor?: string }).cultural_advisor && (
              <p>
                <strong>Cultural Advisor:</strong>{' '}
                {(wine.attribution as { cultural_advisor: string }).cultural_advisor}
              </p>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-gray-500 hover:text-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}
