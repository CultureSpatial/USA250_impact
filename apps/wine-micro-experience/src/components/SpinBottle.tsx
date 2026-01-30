'use client'

import { useEffect, useRef } from 'react'
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

interface SpinBottleProps {
  sessionId: string
  persona: 'trader' | 'buyer'
  onWineSelected: (wine: WineCard) => void
}

export default function SpinBottle({ sessionId, persona, onWineSelected }: SpinBottleProps) {
  const gameRef = useRef<Phaser.Game | null>(null)
  const callbackRef = useRef(onWineSelected)
  callbackRef.current = onWineSelected

  useEffect(() => {
    if (gameRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'spin-container',
      width: 600,
      height: 600,
      physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 } } },
      scene: {
        preload: preloadSpin,
        create: function (this: Phaser.Scene) {
          createSpin.call(this, sessionId, persona, (wine: WineCard) => callbackRef.current(wine))
        },
      },
      backgroundColor: '#1a0a1e',
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [sessionId, persona])

  return (
    <div
      id="spin-container"
      className="mx-auto rounded-lg border-4 border-pink-600 overflow-hidden"
      style={{ maxWidth: 600 }}
    />
  )
}

function preloadSpin(this: Phaser.Scene) {
  const graphics = this.make.graphics({ x: 0, y: 0, add: false })

  // Bottle body
  graphics.fillStyle(0x8b4513, 1)
  graphics.fillRect(5, 20, 10, 80)
  // Bottle neck
  graphics.fillStyle(0x654321, 1)
  graphics.fillRect(7, 0, 6, 25)
  // Bottle cap
  graphics.fillStyle(0xc9a962, 1)
  graphics.fillCircle(10, 0, 5)
  graphics.generateTexture('bottle', 20, 100)
  graphics.destroy()
}

function createSpin(
  this: Phaser.Scene,
  sessionId: string,
  persona: 'trader' | 'buyer',
  onWineSelected: (wine: WineCard) => void
) {
  const centerX = 300
  const centerY = 280

  // Title
  this.add
    .text(centerX, 30, 'Spin the Bottle', {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ffffff',
    })
    .setOrigin(0.5)

  this.add
    .text(centerX, 60, 'Land on a region to discover a wine', {
      fontSize: '14px',
      color: '#a78bfa',
    })
    .setOrigin(0.5)

  // Wine region positions in a circle
  const winePositions = [
    { angle: 0, label: 'Puget Sound', color: 0x4a5568 },
    { angle: 60, label: 'Willamette', color: 0x34d399 },
    { angle: 120, label: 'Okanagan', color: 0xf59e0b },
    { angle: 180, label: 'Columbia Valley', color: 0x6366f1 },
    { angle: 240, label: 'Similkameen', color: 0xef4444 },
    { angle: 300, label: 'Umpqua', color: 0x8b5cf6 },
  ]

  const radius = 200

  winePositions.forEach((pos) => {
    const rad = Phaser.Math.DegToRad(pos.angle - 90)
    const x = centerX + radius * Math.cos(rad)
    const y = centerY + radius * Math.sin(rad)

    // Region node
    this.add.circle(x, y, 44, pos.color, 0.6)
    this.add.circle(x, y, 44, 0xffffff, 0.1)

    // Label
    this.add
      .text(x, y, pos.label, {
        fontSize: '11px',
        color: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 80 },
      })
      .setOrigin(0.5)
  })

  // Center ring
  this.add.circle(centerX, centerY, 50, 0x2d1b2e, 1)
  this.add.circle(centerX, centerY, 50, 0x9333ea, 0.3)
  this.add.circle(centerX, centerY, 48, 0x000000, 0.2)

  // Bottle sprite
  const bottle = this.add.sprite(centerX, centerY, 'bottle')
  bottle.setOrigin(0.5, 0.9)

  // Spin button
  const buttonY = 540
  const btnBg = this.add
    .rectangle(centerX, buttonY, 200, 56, 0xec4899, 1)
    .setInteractive({ useHandCursor: true })

  // Button rounded corners effect
  this.add.rectangle(centerX, buttonY, 196, 52, 0xec4899, 1)

  const buttonText = this.add
    .text(centerX, buttonY, 'SPIN', {
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#ffffff',
    })
    .setOrigin(0.5)

  let isSpinning = false

  // Hover effects
  btnBg.on('pointerover', () => {
    if (!isSpinning) btnBg.setFillStyle(0xdb2777)
  })
  btnBg.on('pointerout', () => {
    if (!isSpinning) btnBg.setFillStyle(0xec4899)
  })

  btnBg.on('pointerdown', async () => {
    if (isSpinning) return
    isSpinning = true
    buttonText.setText('...')
    btnBg.setFillStyle(0x9333ea)

    await logInteraction(sessionId, persona, 'bottle_spin_initiated', {})

    // Random spin: 2-4 full rotations + random final position
    const targetAngle =
      Phaser.Math.Between(720, 1440) + Phaser.Math.Between(0, 360)

    this.tweens.add({
      targets: bottle,
      angle: targetAngle,
      duration: 3000,
      ease: 'Cubic.easeOut',
      onComplete: async () => {
        const finalAngle = ((targetAngle % 360) + 360) % 360
        // Map angle to region index (60-degree segments)
        const selectedIndex = Math.floor(((finalAngle + 30) % 360) / 60)
        const selectedRegion = winePositions[selectedIndex]

        // Highlight selected region
        const rad = Phaser.Math.DegToRad(selectedRegion.angle - 90)
        const tx = centerX + radius * Math.cos(rad)
        const ty = centerY + radius * Math.sin(rad)

        // Pulse highlight
        const highlight = this.add.circle(tx, ty, 50, 0xffffff, 0.4)
        this.tweens.add({
          targets: highlight,
          alpha: 0,
          scale: 1.5,
          duration: 800,
          ease: 'Power2',
        })

        await logInteraction(sessionId, persona, 'bottle_spin_complete', {
          region: selectedRegion.label,
          final_angle: finalAngle,
        })

        // Fetch wine card from Supabase
        const { data } = await supabase
          .from('wine_cards')
          .select('*')
          .ilike('region', `%${selectedRegion.label}%`)
          .limit(1)
          .single()

        if (data) {
          onWineSelected(data as WineCard)
        }

        // Reset button
        buttonText.setText('SPIN AGAIN')
        btnBg.setFillStyle(0xec4899)
        isSpinning = false
      },
    })
  })

  logInteraction(sessionId, persona, 'spin_scene_loaded', {
    timestamp: Date.now(),
  })
}
