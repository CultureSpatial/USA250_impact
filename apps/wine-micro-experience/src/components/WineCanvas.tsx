'use client'

import { useEffect, useRef, useState } from 'react'
import * as Phaser from 'phaser'
import { supabase, logInteraction } from '@/lib/supabase'

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

interface WineCanvasProps {
  persona: 'trader' | 'buyer'
  onWineCardSelect?: (card: WineCard) => void
}

export default function WineCanvas({ persona, onWineCardSelect }: WineCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null)
  const sessionId = useRef(crypto.randomUUID())
  const [selectedCard, setSelectedCard] = useState<WineCard | null>(null)
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null)
  const [storyLoading, setStoryLoading] = useState(false)
  const [storyError, setStoryError] = useState<string | null>(null)

  useEffect(() => {
    if (gameRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: function (this: Phaser.Scene) {
          create.call(this, persona, sessionId.current, handleRegionSelect)
        },
        update: update,
      },
      backgroundColor: '#2d1b2e',
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [persona])

  const handleRegionSelect = async (region: string) => {
    await logInteraction(sessionId.current, persona, 'region_clicked', { region })

    // Map display region to database region pattern
    const regionMap: Record<string, string> = {
      'Puget Sound': 'Puget Sound, WA',
      'Columbia Valley': 'Columbia Valley, WA',
      Willamette: 'Willamette Valley, OR',
      Umpqua: 'Umpqua Valley, OR',
      Okanagan: 'Okanagan Valley, BC',
      Similkameen: 'Similkameen Valley, BC',
    }

    const dbRegion = regionMap[region] || region

    // Fetch wine card from Supabase
    const { data, error } = await supabase
      .from('wine_cards')
      .select('*')
      .ilike('region', `%${region}%`)
      .limit(1)
      .single()

    if (data) {
      setSelectedCard(data as WineCard)
      setGeneratedStory(null)
      setStoryError(null)
      onWineCardSelect?.(data as WineCard)
      await logInteraction(sessionId.current, persona, 'card_viewed', {
        wine_id: data.id,
        wine_name: data.wine_name,
        region: data.region,
      })
    } else if (error) {
      console.error('Failed to fetch wine card:', error)
    }
  }

  const handleGenerateStory = async (card: WineCard) => {
    setStoryLoading(true)
    setStoryError(null)

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wine_card: card, persona }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Generation failed')
      }

      const story: GeneratedStory = await res.json()
      setGeneratedStory(story)
      await logInteraction(sessionId.current, persona, 'story_generated', {
        wine_id: card.id,
        headline: story.headline,
        safety_passed: story.cultural_safety_check,
      })
    } catch (err) {
      setStoryError(err instanceof Error ? err.message : 'Failed to generate story')
    } finally {
      setStoryLoading(false)
    }
  }

  return (
    <div className="relative">
      <div id="phaser-container" className="mx-auto border-4 border-purple-700 rounded-lg overflow-hidden" />

      {/* Wine Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-6">
              <button
                className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold">{selectedCard.wine_name}</h2>
              <p className="text-purple-200 text-sm mt-1">
                {selectedCard.varietal} • {selectedCard.region}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Maker Voice */}
              {selectedCard.maker_voice && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-900 mb-1">Maker Voice</p>
                  <p className="text-purple-700 italic">"{selectedCard.maker_voice}"</p>
                </div>
              )}

              {/* Cultural Context */}
              {selectedCard.cultural_context && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-amber-900 mb-1">Cultural Context</p>
                  <p className="text-amber-700 text-sm">{selectedCard.cultural_context}</p>
                </div>
              )}

              {/* AI Generated Story */}
              {generatedStory && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm font-bold text-purple-900 mb-2">{generatedStory.headline}</p>
                  <p className="text-purple-800 text-sm leading-relaxed mb-3">{generatedStory.narrative}</p>
                  <div className="flex items-center gap-2 text-xs text-purple-600">
                    <span className="bg-purple-100 px-2 py-0.5 rounded-full">
                      Pair with: {generatedStory.pairing}
                    </span>
                    {generatedStory.cultural_safety_check && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Safety verified
                      </span>
                    )}
                  </div>
                </div>
              )}

              {storyError && (
                <div className="bg-red-50 rounded-lg p-3 text-red-700 text-sm">
                  {storyError}
                </div>
              )}

              {/* Attribution */}
              {selectedCard.attribution && (
                <div className="text-xs text-gray-500 border-t pt-4">
                  {(selectedCard.attribution as { winery?: string }).winery && (
                    <span className="mr-4">
                      Winery: {(selectedCard.attribution as { winery: string }).winery}
                    </span>
                  )}
                  {(selectedCard.attribution as { land_acknowledgment?: string }).land_acknowledgment && (
                    <span>
                      Land: {(selectedCard.attribution as { land_acknowledgment: string }).land_acknowledgment}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t p-4 space-y-3">
              {/* Generate Story Button */}
              {!generatedStory && (
                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleGenerateStory(selectedCard)}
                  disabled={storyLoading}
                >
                  {storyLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Generating...
                    </span>
                  ) : persona === 'trader' ? (
                    'Generate Allocation Insights'
                  ) : (
                    'Generate Wine Story'
                  )}
                </button>
              )}

              <div className="flex gap-3">
                {persona === 'trader' ? (
                  <>
                    <button className="flex-1 py-2 px-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition">
                      Request Allocation
                    </button>
                    <button className="py-2 px-4 border border-purple-900 text-purple-900 rounded-lg hover:bg-purple-50 transition">
                      Export Data
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 py-2 px-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition">
                      Save to Collection
                    </button>
                    <button className="py-2 px-4 border border-purple-900 text-purple-900 rounded-lg hover:bg-purple-50 transition">
                      Share Story
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function preload(this: Phaser.Scene) {
  // Create colored rectangle textures for regions
  const graphics = this.add.graphics()

  // WA - Slate blue
  graphics.fillStyle(0x4a5568)
  graphics.fillRoundedRect(0, 0, 100, 100, 12)
  graphics.generateTexture('region-wa', 100, 100)

  // OR - Emerald green
  graphics.clear()
  graphics.fillStyle(0x34d399)
  graphics.fillRoundedRect(0, 0, 100, 100, 12)
  graphics.generateTexture('region-or', 100, 100)

  // BC - Amber
  graphics.clear()
  graphics.fillStyle(0xf59e0b)
  graphics.fillRoundedRect(0, 0, 100, 100, 12)
  graphics.generateTexture('region-bc', 100, 100)

  graphics.destroy()
}

function create(
  this: Phaser.Scene,
  persona: 'trader' | 'buyer',
  sessionId: string,
  onRegionClick: (region: string) => void
) {
  const title =
    persona === 'trader'
      ? 'Select Region for Allocation Data'
      : 'Spin & Discover Your Next Wine Story'

  this.add
    .text(400, 50, title, {
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
    })
    .setOrigin(0.5)

  // Subtitle with persona context
  const subtitle =
    persona === 'trader'
      ? 'Click a region to view trade allocations and winery contacts'
      : 'Explore the Cascadia wine corridor from Puget Sound to Okanagan'

  this.add
    .text(400, 85, subtitle, {
      fontSize: '14px',
      color: '#a78bfa',
      align: 'center',
    })
    .setOrigin(0.5)

  const regions = [
    { key: 'region-wa', x: 200, y: 280, label: 'Puget Sound', state: 'WA' },
    { key: 'region-or', x: 400, y: 280, label: 'Willamette', state: 'OR' },
    { key: 'region-bc', x: 600, y: 280, label: 'Okanagan', state: 'BC' },
  ]

  regions.forEach((region) => {
    // Region sprite with hover effects
    const sprite = this.add
      .sprite(region.x, region.y, region.key)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        sprite.setScale(1.1)
        this.tweens.add({
          targets: sprite,
          y: region.y - 5,
          duration: 150,
          ease: 'Power2',
        })
      })
      .on('pointerout', () => {
        sprite.setScale(1)
        this.tweens.add({
          targets: sprite,
          y: region.y,
          duration: 150,
          ease: 'Power2',
        })
      })
      .on('pointerdown', () => {
        onRegionClick(region.label)
      })

    // Region label
    this.add
      .text(region.x, region.y + 70, region.label, {
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    // State badge
    this.add
      .text(region.x, region.y + 90, region.state, {
        fontSize: '12px',
        color: '#a78bfa',
      })
      .setOrigin(0.5)
  })

  // Instructions at bottom
  this.add
    .text(400, 520, 'Click a region to explore wines', {
      fontSize: '14px',
      color: '#6b7280',
    })
    .setOrigin(0.5)

  // Connection lines between regions (showing the corridor)
  const graphics = this.add.graphics()
  graphics.lineStyle(2, 0xa78bfa, 0.3)
  graphics.lineBetween(250, 280, 350, 280)
  graphics.lineBetween(450, 280, 550, 280)

  logInteraction(sessionId, persona, 'scene_loaded', { timestamp: Date.now() })
}

function update(this: Phaser.Scene) {
  // Animation loop (expandable for Day 2+)
}
