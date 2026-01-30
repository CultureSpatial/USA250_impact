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

export default function TraderPage() {
  const [selectedWine, setSelectedWine] = useState<WineCard | null>(null)
  const sessionId = useRef(crypto.randomUUID())

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Trade Portal</h1>
      <p className="text-gray-300 mb-8">Explore allocations and supplier data across the Cascadia corridor</p>
      <WineCanvas
        persona="trader"
        onWineCardSelect={(card) => setSelectedWine(card as WineCard)}
      />
      {selectedWine && (
        <WineCardModal
          wine={selectedWine}
          persona="trader"
          sessionId={sessionId.current}
          onClose={() => setSelectedWine(null)}
        />
      )}
    </div>
  )
}
