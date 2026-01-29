'use client'

import { useState } from 'react'
import type { WineStoryCard as WineStoryCardType, PersonaType } from '@/types/wine'

interface WineStoryCardProps {
  card: WineStoryCardType
  persona: PersonaType
  onSave?: (wineId: string) => void
  onShare?: (card: WineStoryCardType) => void
  onExploreRegion?: (region: string) => void
}

export function WineStoryCard({
  card,
  persona,
  onSave,
  onShare,
  onExploreRegion,
}: WineStoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    onSave?.(card.wine_id)
  }

  const handleShare = () => {
    onShare?.(card)
  }

  const isPremium = card.crown_status === 'PREMIUM'
  const isLocked = card.crown_status === 'LOCKED'

  return (
    <div
      className={`
        relative w-full max-w-sm mx-auto
        ${isLocked ? 'opacity-60' : ''}
      `}
    >
      {/* Crown Status Badge */}
      {isPremium && (
        <div className="absolute -top-2 -right-2 z-10 bg-wine-gold text-white text-xs font-bold px-2 py-1 rounded-full">
          PREMIUM
        </div>
      )}
      {isLocked && (
        <div className="absolute -top-2 -right-2 z-10 bg-studio-blue text-white text-xs font-bold px-2 py-1 rounded-full">
          🔒 LOCKED
        </div>
      )}

      {/* Card Container */}
      <div
        className={`
          relative h-[480px] rounded-xl overflow-hidden cursor-pointer
          transition-transform duration-500 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          ${!isLocked ? 'hover:shadow-xl' : ''}
        `}
        onClick={() => !isLocked && setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-wine-red to-incumbent-burgundy text-white p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-wine-gold text-sm font-medium">{card.varietal}</p>
              <h3 className="text-xl font-bold leading-tight">{card.name}</h3>
              <p className="text-white/70 text-sm">{card.vintage}</p>
            </div>
            <span className="text-3xl">🍷</span>
          </div>

          {/* Origin */}
          <button
            className="text-left bg-white/10 rounded-lg p-3 mb-4 hover:bg-white/20 transition"
            onClick={(e) => {
              e.stopPropagation()
              onExploreRegion?.(card.origin.region)
            }}
          >
            <p className="text-wine-gold text-xs font-medium uppercase tracking-wide">Origin</p>
            <p className="font-semibold">{card.origin.region}</p>
            {card.origin.subregion && (
              <p className="text-white/70 text-sm">{card.origin.subregion}</p>
            )}
          </button>

          {/* Maker Voice Preview */}
          <div className="bg-white/10 rounded-lg p-3 mb-4 flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className={`
                text-xs font-bold px-2 py-0.5 rounded-full
                ${card.maker_voice.perspective === 'incumbent'
                  ? 'bg-wine-gold text-wine-red'
                  : 'bg-action-teal text-white'}
              `}>
                {card.maker_voice.perspective === 'incumbent' ? 'VINTAGE' : 'VOICE'}
              </span>
              <span className="text-white/70 text-xs">{card.maker_voice.role}</span>
            </div>
            <p className="text-sm italic line-clamp-3">"{card.maker_voice.quote}"</p>
            <p className="text-wine-gold text-xs mt-2">— {card.maker_voice.name}</p>
          </div>

          {/* Pairing Preview */}
          <div className="flex flex-wrap gap-1">
            {card.pairing_notes.food.slice(0, 3).map((food, i) => (
              <span key={i} className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {food}
              </span>
            ))}
          </div>

          {/* Tap Hint */}
          <p className="text-center text-white/50 text-xs mt-4">Tap to flip</p>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-warm-sand text-studio-blue p-6 flex flex-col">
          {/* Cultural Attribution (Safety Gate) */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-studio-blue/10">
            <h4 className="text-sm font-bold text-wine-red mb-2 flex items-center gap-2">
              <span>🏛️</span> Cultural Attribution
            </h4>
            {card.attribution.indigenous_territory && (
              <p className="text-xs mb-1">
                <span className="font-medium">Traditional Territory:</span>{' '}
                {card.attribution.indigenous_territory}
              </p>
            )}
            {card.attribution.labor_acknowledgment && (
              <p className="text-xs mb-1">
                <span className="font-medium">Labor:</span>{' '}
                {card.attribution.labor_acknowledgment}
              </p>
            )}
            <div className="flex items-center gap-1 mt-2">
              <span className={`
                w-2 h-2 rounded-full
                ${card.attribution.fpic_status === 'verified' ? 'bg-green-500' :
                  card.attribution.fpic_status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}
              `} />
              <span className="text-xs text-studio-blue/60">
                FPIC: {card.attribution.fpic_status}
              </span>
            </div>
          </div>

          {/* Full Pairing Notes */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-studio-blue/10 flex-grow">
            <h4 className="text-sm font-bold text-wine-red mb-2">Pairing Notes</h4>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-studio-blue/60">Food</p>
                <p className="text-sm">{card.pairing_notes.food.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-studio-blue/60">Occasion</p>
                <p className="text-sm">{card.pairing_notes.occasion.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-studio-blue/60">Mood</p>
                <p className="text-sm">{card.pairing_notes.mood.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Persona-Specific CTA */}
          <div className="space-y-2">
            {persona === 'trader' ? (
              <button
                className={`
                  w-full py-3 rounded-lg font-semibold text-sm transition
                  ${isPremium
                    ? 'bg-wine-gold text-white hover:bg-wine-gold/90'
                    : 'bg-studio-blue text-white hover:bg-studio-blue/90'}
                `}
                onClick={(e) => {
                  e.stopPropagation()
                  // Unlock gate for traders
                  alert('Contact winery directly (premium unlock)')
                }}
              >
                {isPremium ? '🔓 Unlock Winery Contact' : '📧 Request Trade Info'}
              </button>
            ) : (
              <button
                className="w-full py-3 rounded-lg font-semibold text-sm bg-wine-red text-white hover:bg-wine-red/90 transition"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSave()
                }}
                disabled={isSaved}
              >
                {isSaved ? '✓ Saved to Profile' : '❤️ Save to My Wines'}
              </button>
            )}

            <button
              className="w-full py-2 rounded-lg font-medium text-sm border border-studio-blue/20 hover:bg-studio-blue/5 transition"
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              📤 Share Story
            </button>
          </div>

          {/* Tap Hint */}
          <p className="text-center text-studio-blue/50 text-xs mt-4">Tap to flip back</p>
        </div>
      </div>

      {/* Engagement Stats (subtle) */}
      <div className="flex justify-center gap-4 mt-3 text-xs text-studio-blue/40">
        <span>{card.engagement.views} views</span>
        <span>{card.engagement.saves} saves</span>
        <span>{card.engagement.shares} shares</span>
      </div>
    </div>
  )
}

// Export shareable JSON for the card
export function toShareableJSON(card: WineStoryCardType): string {
  return JSON.stringify({
    wine_id: card.wine_id,
    name: card.name,
    varietal: card.varietal,
    vintage: card.vintage,
    origin: card.origin,
    maker_voice: {
      name: card.maker_voice.name,
      perspective: card.maker_voice.perspective,
      quote: card.maker_voice.quote,
    },
    pairing_notes: card.pairing_notes,
    attribution: card.attribution,
  }, null, 2)
}
