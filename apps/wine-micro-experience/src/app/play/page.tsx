'use client'

import { useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import WineCardModal from '@/components/WineCardModal'
import ProofPoints from '@/components/ProofPoints'
import StoryGemExport from '@/components/StoryGemExport'
import WineryUnlockGate from '@/components/WineryUnlockGate'
import { logInteraction } from '@/lib/supabase'

const SpinBottle = dynamic(() => import('@/components/SpinBottle'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto rounded-lg border-4 border-pink-600 bg-[#1a0a1e] flex items-center justify-center" style={{ width: 600, height: 600 }}>
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-purple-300 text-sm">Loading Spin the Bottle...</p>
      </div>
    </div>
  ),
})

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

interface Recommendation {
  recommended_wine: string
  reasoning: string
  transition_quotient: number
  next_action: string
}

export default function PlayPage() {
  const [persona, setPersona] = useState<'trader' | 'buyer'>('buyer')
  const [selectedWine, setSelectedWine] = useState<WineCard | null>(null)
  const [lastStory, setLastStory] = useState<GeneratedStory | null>(null)
  const [showExport, setShowExport] = useState(false)

  // Collection state
  const [regionsExplored, setRegionsExplored] = useState<string[]>([])
  const [winesViewed, setWinesViewed] = useState<string[]>([])
  const [storiesGenerated, setStoriesGenerated] = useState(0)
  const [spinsCompleted, setSpinsCompleted] = useState(0)

  // Recommendation state
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [recLoading, setRecLoading] = useState(false)

  const sessionId = useRef(crypto.randomUUID())

  const totalPoints =
    new Set(regionsExplored).size * 15 +
    new Set(winesViewed).size * 10 +
    storiesGenerated * 20 +
    spinsCompleted * 5

  const handleWineSelected = useCallback((wine: WineCard) => {
    setSelectedWine(wine)
    setSpinsCompleted((prev) => prev + 1)

    // Track region and wine
    if (wine.region) {
      setRegionsExplored((prev) => [...prev, wine.region])
    }
    if (wine.id) {
      setWinesViewed((prev) => [...prev, wine.id])
    }
  }, [])

  const handleModalClose = () => {
    setSelectedWine(null)
  }

  const handleStoryGenerated = (story: GeneratedStory) => {
    setLastStory(story)
    setStoriesGenerated((prev) => prev + 1)
  }

  const fetchRecommendation = async () => {
    setRecLoading(true)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId.current,
          persona,
        }),
      })

      if (res.ok) {
        const data: Recommendation = await res.json()
        setRecommendation(data)
        await logInteraction(
          sessionId.current,
          persona,
          'recommendation_viewed',
          { recommended_wine: data.recommended_wine, tq: data.transition_quotient }
        )
      }
    } catch (err) {
      console.error('Failed to fetch recommendation:', err)
    }
    setRecLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-studio-blue mb-2">
          Spin &amp; Discover
        </h1>
        <p className="text-studio-blue/60 max-w-lg mx-auto">
          Spin the bottle to land on a Cascadia wine region. Collect proof
          points, unlock winery access, and export your story gems.
        </p>

        {/* Persona Toggle */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded-full font-medium transition text-sm ${
              persona === 'trader'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setPersona('trader')}
          >
            Trader
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition text-sm ${
              persona === 'buyer'
                ? 'bg-pink-600 text-white'
                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
            }`}
            onClick={() => setPersona('buyer')}
          >
            Explorer
          </button>
        </div>
      </section>

      {/* Spin the Bottle */}
      <section>
        <SpinBottle
          sessionId={sessionId.current}
          persona={persona}
          onWineSelected={handleWineSelected}
        />
      </section>

      {/* Winery Unlock Gate */}
      <section>
        <WineryUnlockGate
          regionsExplored={new Set(regionsExplored).size}
          requiredRegions={3}
          persona={persona}
          wineryName={selectedWine?.wine_name}
        />
      </section>

      {/* 99 Proof Points */}
      <section>
        <ProofPoints
          regionsExplored={regionsExplored}
          winesViewed={winesViewed}
          storiesGenerated={storiesGenerated}
          spinsCompleted={spinsCompleted}
          persona={persona}
        />
      </section>

      {/* Agent Recommendation */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-lg text-studio-blue">
              What Should You Try Next?
            </h2>
            <p className="text-sm text-studio-blue/50">
              AI agent analyzes your interaction patterns to recommend wines
            </p>
          </div>
          <button
            onClick={fetchRecommendation}
            disabled={recLoading || spinsCompleted === 0}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {recLoading ? 'Thinking...' : 'Get Recommendation'}
          </button>
        </div>

        {spinsCompleted === 0 && (
          <p className="text-center text-studio-blue/40 py-4 text-sm">
            Spin the bottle at least once to enable recommendations
          </p>
        )}

        {recommendation && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-purple-900">
                {recommendation.recommended_wine}
              </h3>
              <div className="text-right">
                <p className="text-xs text-purple-500">Transition Quotient</p>
                <p className="text-2xl font-mono font-bold text-purple-700">
                  {recommendation.transition_quotient}
                </p>
              </div>
            </div>
            <p className="text-purple-800 text-sm leading-relaxed mb-3">
              {recommendation.reasoning}
            </p>
            <div className="bg-white/60 rounded px-3 py-2">
              <p className="text-xs text-purple-600">
                <strong>Next:</strong> {recommendation.next_action}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Story Gem Export */}
      {selectedWine && (
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg text-studio-blue">
                Story Gem Export
              </h2>
              <p className="text-sm text-studio-blue/50">
                Download your wine story with full attribution
              </p>
            </div>
            <button
              onClick={() => setShowExport(!showExport)}
              className="text-sm px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
            >
              {showExport ? 'Hide' : 'Show'} Export
            </button>
          </div>

          {showExport && (
            <StoryGemExport
              wine={selectedWine}
              story={lastStory}
              proofPoints={totalPoints}
            />
          )}
        </section>
      )}

      {/* Wine Card Modal */}
      {selectedWine && (
        <WineCardModal
          wine={selectedWine}
          persona={persona}
          sessionId={sessionId.current}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}
