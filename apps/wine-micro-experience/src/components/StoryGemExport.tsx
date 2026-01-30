'use client'

import { useRef } from 'react'

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
}

interface StoryGemExportProps {
  wine: WineCard
  story: GeneratedStory | null
  proofPoints: number
}

export default function StoryGemExport({ wine, story, proofPoints }: StoryGemExportProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const exportAsJSON = () => {
    const gem = {
      version: '1.0',
      type: 'story_gem',
      exported_at: new Date().toISOString(),
      wine: {
        name: wine.wine_name,
        region: wine.region,
        varietal: wine.varietal,
        maker_voice: wine.maker_voice,
        cultural_context: wine.cultural_context,
        attribution: wine.attribution,
      },
      story: story
        ? {
            headline: story.headline,
            narrative: story.narrative,
            pairing: story.pairing,
          }
        : null,
      provenance: {
        proof_points: proofPoints,
        platform: 'Vintage & Voice',
        framework: 'Spatial Studio',
      },
    }

    const blob = new Blob([JSON.stringify(gem, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `story-gem-${wine.wine_name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    const text = [
      `${wine.wine_name}`,
      `${wine.region} | ${wine.varietal}`,
      '',
      wine.maker_voice ? `"${wine.maker_voice}"` : '',
      '',
      story ? `${story.headline}` : '',
      story ? story.narrative : '',
      story ? `Pair with: ${story.pairing}` : '',
      '',
      wine.cultural_context ? `Cultural context: ${wine.cultural_context}` : '',
      '',
      `Shared via Vintage & Voice | ${proofPoints} proof points`,
    ]
      .filter(Boolean)
      .join('\n')

    await navigator.clipboard.writeText(text)
  }

  const attr = wine.attribution as {
    winery?: string
    land_acknowledgment?: string
    cultural_advisor?: string
  }

  return (
    <div className="space-y-4">
      {/* Exportable card preview */}
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 rounded-xl p-6 text-white"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">{wine.wine_name}</h3>
            <p className="text-purple-200 text-sm">
              {wine.region} &mdash; {wine.varietal}
            </p>
          </div>
          <div className="bg-white/10 rounded-full px-3 py-1">
            <span className="text-xs font-mono">{proofPoints} pts</span>
          </div>
        </div>

        {/* Maker voice */}
        {wine.maker_voice && (
          <blockquote className="border-l-2 border-pink-400 pl-3 mb-4 text-purple-100 italic text-sm">
            &ldquo;{wine.maker_voice}&rdquo;
          </blockquote>
        )}

        {/* Generated story */}
        {story && (
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <p className="font-semibold text-pink-200 text-sm mb-1">
              {story.headline}
            </p>
            <p className="text-purple-100 text-xs leading-relaxed">
              {story.narrative}
            </p>
            <p className="text-pink-300 text-xs mt-2">
              Pair with: {story.pairing}
            </p>
          </div>
        )}

        {/* Attribution */}
        <div className="border-t border-white/10 pt-3 text-xs text-purple-300 space-y-1">
          {attr.winery && <p>Winery: {attr.winery}</p>}
          {attr.land_acknowledgment && (
            <p>Land: {attr.land_acknowledgment}</p>
          )}
          {attr.cultural_advisor && (
            <p>Cultural Advisor: {attr.cultural_advisor}</p>
          )}
          {wine.cultural_context && (
            <p className="text-purple-400 italic">{wine.cultural_context}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-400">
          <span>Vintage & Voice Story Gem</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Export actions */}
      <div className="flex gap-3">
        <button
          onClick={exportAsJSON}
          className="flex-1 py-2 px-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition text-sm"
        >
          Export JSON
        </button>
        <button
          onClick={copyToClipboard}
          className="flex-1 py-2 px-4 border border-purple-900 text-purple-900 rounded-lg hover:bg-purple-50 transition text-sm"
        >
          Copy Text
        </button>
      </div>
    </div>
  )
}
