'use client'

import { useEffect, useRef, useState } from 'react'
import type { WineStoryCard, PersonaType, GameState } from '@/types/wine'

interface WineExplorerGameProps {
  wines: WineStoryCard[]
  persona: PersonaType
  onCardSelect: (card: WineStoryCard) => void
  onRegionExplore: (region: string) => void
  onEngagementEvent: (eventType: string, properties: Record<string, unknown>) => void
}

// BC Wine Regions with coordinates (normalized to game canvas)
const WINE_REGIONS = [
  { name: 'Okanagan Valley', x: 0.65, y: 0.35, color: 0x8B1538 },
  { name: 'Similkameen Valley', x: 0.55, y: 0.45, color: 0xC9A962 },
  { name: 'Fraser Valley', x: 0.25, y: 0.55, color: 0x0D9488 },
  { name: 'Vancouver Island', x: 0.1, y: 0.4, color: 0x1E3A5F },
]

export function WineExplorerGame({
  wines,
  persona,
  onCardSelect,
  onRegionExplore,
  onEngagementEvent,
}: WineExplorerGameProps) {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  useEffect(() => {
    // Dynamic import of Phaser (client-side only)
    const initPhaser = async () => {
      const Phaser = await import('phaser')

      if (!gameRef.current || phaserGameRef.current) return

      // Game Scene
      class WineExplorerScene extends Phaser.Scene {
        private regionNodes: Phaser.GameObjects.Container[] = []
        private selectedNode: Phaser.GameObjects.Container | null = null
        private tooltip: Phaser.GameObjects.Container | null = null

        constructor() {
          super({ key: 'WineExplorer' })
        }

        preload() {
          // Create gradient background texture
          const graphics = this.make.graphics({ x: 0, y: 0 })
          graphics.fillGradientStyle(0xF5F0E8, 0xF5F0E8, 0xE8E0D5, 0xE8E0D5, 1)
          graphics.fillRect(0, 0, 800, 450)
          graphics.generateTexture('bg', 800, 450)
          graphics.destroy()
        }

        create() {
          const { width, height } = this.scale

          // Background
          this.add.image(width / 2, height / 2, 'bg')

          // Title
          this.add.text(width / 2, 30, 'BC Wine Regions', {
            fontSize: '24px',
            fontFamily: 'Inter, sans-serif',
            color: '#1E3A5F',
          }).setOrigin(0.5)

          // Persona indicator
          const personaText = persona === 'trader' ? '🏪 Trade View' : '🍷 Explorer View'
          this.add.text(width - 20, 20, personaText, {
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            color: '#475569',
          }).setOrigin(1, 0)

          // Create region nodes
          WINE_REGIONS.forEach((region, index) => {
            const x = region.x * width
            const y = region.y * height
            const node = this.createRegionNode(x, y, region, index)
            this.regionNodes.push(node)
          })

          // Create connection lines between regions
          this.createConnectionLines()

          // Instructions
          this.add.text(width / 2, height - 25, 'Click a region to explore wines', {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            color: '#64748B',
          }).setOrigin(0.5)
        }

        createRegionNode(x: number, y: number, region: typeof WINE_REGIONS[0], index: number) {
          const container = this.add.container(x, y)

          // Pulse animation circle (background)
          const pulse = this.add.circle(0, 0, 35, region.color, 0.2)
          this.tweens.add({
            targets: pulse,
            scale: 1.3,
            alpha: 0,
            duration: 2000,
            repeat: -1,
            delay: index * 300,
          })

          // Main circle
          const circle = this.add.circle(0, 0, 25, region.color, 1)
          circle.setStrokeStyle(3, 0xFFFFFF)

          // Wine count from data
          const wineCount = wines.filter(w => w.origin.region === region.name).length
          const countText = this.add.text(0, 0, wineCount.toString(), {
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            color: '#FFFFFF',
            fontStyle: 'bold',
          }).setOrigin(0.5)

          // Region label
          const label = this.add.text(0, 40, region.name, {
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            color: '#1E3A5F',
            backgroundColor: '#FFFFFF',
            padding: { x: 6, y: 3 },
          }).setOrigin(0.5)

          container.add([pulse, circle, countText, label])

          // Interactivity
          circle.setInteractive({ useHandCursor: true })

          circle.on('pointerover', () => {
            this.tweens.add({
              targets: container,
              scale: 1.15,
              duration: 200,
              ease: 'Back.easeOut',
            })
            this.showTooltip(x, y - 60, region.name, wineCount)
          })

          circle.on('pointerout', () => {
            this.tweens.add({
              targets: container,
              scale: 1,
              duration: 200,
            })
            this.hideTooltip()
          })

          circle.on('pointerdown', () => {
            // Visual feedback
            this.tweens.add({
              targets: circle,
              scale: 0.9,
              duration: 100,
              yoyo: true,
            })

            // Select region
            this.selectRegion(container, region.name)
          })

          return container
        }

        createConnectionLines() {
          const graphics = this.add.graphics()
          graphics.lineStyle(1, 0x1E3A5F, 0.15)

          // Connect adjacent regions with curved lines
          const { width, height } = this.scale
          const points = WINE_REGIONS.map(r => ({ x: r.x * width, y: r.y * height }))

          // Draw connections
          for (let i = 0; i < points.length - 1; i++) {
            graphics.lineBetween(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
          }
        }

        showTooltip(x: number, y: number, name: string, count: number) {
          if (this.tooltip) this.tooltip.destroy()

          this.tooltip = this.add.container(x, y)

          const bg = this.add.rectangle(0, 0, 140, 50, 0x1E3A5F, 0.95)
          bg.setStrokeStyle(1, 0xFFFFFF)

          const title = this.add.text(0, -10, name, {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            color: '#FFFFFF',
            fontStyle: 'bold',
          }).setOrigin(0.5)

          const subtitle = this.add.text(0, 8, `${count} wine${count !== 1 ? 's' : ''} to explore`, {
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            color: '#C9A962',
          }).setOrigin(0.5)

          this.tooltip.add([bg, title, subtitle])
          this.tooltip.setDepth(100)
        }

        hideTooltip() {
          if (this.tooltip) {
            this.tooltip.destroy()
            this.tooltip = null
          }
        }

        selectRegion(node: Phaser.GameObjects.Container, regionName: string) {
          // Deselect previous
          if (this.selectedNode) {
            this.tweens.add({
              targets: this.selectedNode,
              scale: 1,
              duration: 200,
            })
          }

          // Select new
          this.selectedNode = node
          this.tweens.add({
            targets: node,
            scale: 1.2,
            duration: 300,
            ease: 'Back.easeOut',
          })

          // Emit events
          setSelectedRegion(regionName)
          onRegionExplore(regionName)
          onEngagementEvent('region_explored', { region: regionName })
        }
      }

      // Create game config
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: 800,
        height: 450,
        backgroundColor: '#F5F0E8',
        scene: WineExplorerScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      }

      phaserGameRef.current = new Phaser.Game(config)
      setIsLoading(false)
    }

    initPhaser()

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true)
        phaserGameRef.current = null
      }
    }
  }, [persona, wines, onRegionExplore, onEngagementEvent])

  // Get wines for selected region
  const regionWines = selectedRegion
    ? wines.filter(w => w.origin.region === selectedRegion)
    : []

  return (
    <div className="space-y-4">
      {/* Phaser Canvas Container */}
      <div className="phaser-container bg-warm-sand rounded-xl overflow-hidden shadow-lg">
        {isLoading && (
          <div className="flex items-center justify-center h-[450px] bg-warm-sand">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-wine-red border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-studio-blue/60 text-sm">Loading wine regions...</p>
            </div>
          </div>
        )}
        <div ref={gameRef} className={isLoading ? 'hidden' : ''} />
      </div>

      {/* Selected Region Wine List */}
      {selectedRegion && regionWines.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="font-semibold text-studio-blue mb-3 flex items-center gap-2">
            <span>🍇</span>
            {selectedRegion} — {regionWines.length} wine{regionWines.length !== 1 ? 's' : ''}
          </h3>
          <div className="grid gap-2">
            {regionWines.map((wine) => (
              <button
                key={wine.wine_id}
                className="flex items-center justify-between p-3 bg-warm-sand/50 rounded-lg hover:bg-warm-sand transition text-left"
                onClick={() => {
                  onCardSelect(wine)
                  onEngagementEvent('card_viewed', {
                    wine_id: wine.wine_id,
                    region: wine.origin.region,
                  })
                }}
              >
                <div>
                  <p className="font-medium text-studio-blue text-sm">{wine.name}</p>
                  <p className="text-xs text-studio-blue/60">
                    {wine.varietal} · {wine.vintage}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {wine.crown_status === 'PREMIUM' && (
                    <span className="bg-wine-gold text-white text-xs px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${wine.maker_voice.perspective === 'incumbent'
                      ? 'bg-incumbent-burgundy/10 text-incumbent-burgundy'
                      : 'bg-action-teal/10 text-action-teal'}
                  `}>
                    {wine.maker_voice.perspective === 'incumbent' ? 'Vintage' : 'Voice'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
