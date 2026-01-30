'use client'

import { useState, useRef } from 'react'
import WineCanvas from '@/components/WineCanvas'
import WineCardModal from '@/components/WineCardModal'

interface WineCard {
  id: string
  wine_name: string
  region: string
  varietal: string
  maker_voice: string | null
  cultural_context: string | null
  attribution: Record<string, unknown>
}

export default function BuyerPage() {
  const [selectedWine, setSelectedWine] = useState<WineCard | null>(null)
  const sessionId = useRef(crypto.randomUUID())

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Discover Your Story</h1>
      <p className="text-gray-200 mb-8">Every wine has a place, a maker, and a reason</p>
      <WineCanvas
        persona="buyer"
        onWineCardSelect={(card) => setSelectedWine(card as WineCard)}
      />
      {selectedWine && (
        <WineCardModal
          wine={selectedWine}
          persona="buyer"
          sessionId={sessionId.current}
          onClose={() => setSelectedWine(null)}
        />
      )}
    </div>
  )
}
