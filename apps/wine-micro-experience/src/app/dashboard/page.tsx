'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import WineCardModal from '@/components/WineCardModal'
import { supabase } from '@/lib/supabase'

const WineCanvas = dynamic(() => import('@/components/WineCanvas'), { ssr: false })

interface WineCard {
  id: string
  wine_name: string
  region: string
  varietal: string
  maker_voice: string | null
  cultural_context: string | null
  attribution: Record<string, unknown>
}

type ActiveView = 'overview' | 'canvas' | 'cards' | 'api'

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ActiveView>('overview')
  const [persona, setPersona] = useState<'trader' | 'buyer'>('buyer')
  const [selectedWine, setSelectedWine] = useState<WineCard | null>(null)
  const [wineCards, setWineCards] = useState<WineCard[]>([])
  const [cardsLoading, setCardsLoading] = useState(false)
  const [apiTestResult, setApiTestResult] = useState<string | null>(null)
  const [apiTestLoading, setApiTestLoading] = useState(false)
  const sessionId = useRef(crypto.randomUUID())

  const loadWineCards = async () => {
    setCardsLoading(true)
    const { data, error } = await supabase
      .from('wine_cards')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setWineCards(data as WineCard[])
    if (error) console.error('Failed to load wine cards:', error)
    setCardsLoading(false)
  }

  const testApiRoute = async () => {
    setApiTestLoading(true)
    setApiTestResult(null)
    try {
      const testCard = {
        wine_name: 'Test Riesling',
        region: 'Okanagan Valley, BC',
        varietal: 'Riesling',
        maker_voice: 'Cool-climate precision in every glass.',
        cultural_context: 'Syilx Okanagan Nation stewardship informs our practice.',
      }
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wine_card: testCard, persona }),
      })
      const data = await res.json()
      setApiTestResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setApiTestResult(`Error: ${err instanceof Error ? err.message : 'Request failed'}`)
    }
    setApiTestLoading(false)
  }

  const navItems: { key: ActiveView; label: string; description: string }[] = [
    { key: 'overview', label: 'Overview', description: 'Architecture and route map' },
    { key: 'canvas', label: 'Wine Canvas', description: 'Phaser interactive map' },
    { key: 'cards', label: 'Wine Cards', description: 'Supabase card browser' },
    { key: 'api', label: 'API Test', description: 'AI story generation test' },
  ]

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-studio-blue to-purple-900 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Spatial Studio Dashboard</h1>
        <p className="text-white/70">
          Unified interface for the Wine Micro-Experience build.
          All components, routes, and data in one place.
        </p>

        {/* Persona Toggle */}
        <div className="flex gap-2 mt-6">
          <button
            className={`px-4 py-2 rounded-full font-medium transition text-sm ${
              persona === 'trader'
                ? 'bg-white text-studio-blue'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            onClick={() => setPersona('trader')}
          >
            Trader
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition text-sm ${
              persona === 'buyer'
                ? 'bg-white text-purple-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            onClick={() => setPersona('buyer')}
          >
            Buyer
          </button>
        </div>
      </section>

      {/* View Navigation */}
      <nav className="flex gap-2 flex-wrap">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveView(item.key)
              if (item.key === 'cards' && wineCards.length === 0) loadWineCards()
            }}
            className={`px-4 py-3 rounded-lg transition text-left ${
              activeView === item.key
                ? 'bg-studio-blue text-white'
                : 'bg-white hover:bg-studio-blue/5 border border-studio-blue/10'
            }`}
          >
            <p className="font-medium text-sm">{item.label}</p>
            <p className={`text-xs mt-0.5 ${
              activeView === item.key ? 'text-white/70' : 'text-studio-blue/50'
            }`}>
              {item.description}
            </p>
          </button>
        ))}
      </nav>

      {/* ============================== */}
      {/* OVERVIEW VIEW */}
      {/* ============================== */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Route Map */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-studio-blue mb-4">Route Map</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="block p-4 rounded-lg border border-studio-blue/10 hover:border-studio-blue/30 hover:bg-studio-blue/5 transition"
              >
                <p className="font-semibold text-studio-blue">/</p>
                <p className="text-sm text-studio-blue/60 mt-1">
                  Home &mdash; BC-focused WineExplorerGame with persona toggle and engagement dashboard
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-wine-red/10 text-wine-red px-2 py-0.5 rounded-full">WineExplorerGame</span>
                  <span className="text-xs bg-wine-red/10 text-wine-red px-2 py-0.5 rounded-full">WineStoryCard</span>
                </div>
              </Link>
              <Link
                href="/trader"
                className="block p-4 rounded-lg border border-studio-blue/10 hover:border-studio-blue/30 hover:bg-studio-blue/5 transition"
              >
                <p className="font-semibold text-studio-blue">/trader</p>
                <p className="text-sm text-studio-blue/60 mt-1">
                  Trade Portal &mdash; Cascadia WineCanvas with allocation-focused WineCardModal
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">WineCanvas</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">WineCardModal</span>
                </div>
              </Link>
              <Link
                href="/buyer"
                className="block p-4 rounded-lg border border-studio-blue/10 hover:border-studio-blue/30 hover:bg-studio-blue/5 transition"
              >
                <p className="font-semibold text-studio-blue">/buyer</p>
                <p className="text-sm text-studio-blue/60 mt-1">
                  Discovery &mdash; Cascadia WineCanvas with story-driven WineCardModal
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">WineCanvas</span>
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">WineCardModal</span>
                </div>
              </Link>
              <Link
                href="/dashboard"
                className="block p-4 rounded-lg border-2 border-studio-blue/30 bg-studio-blue/5"
              >
                <p className="font-semibold text-studio-blue">/dashboard</p>
                <p className="text-sm text-studio-blue/60 mt-1">
                  You are here &mdash; Unified interface to inspect all components, data, and API
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-studio-blue/10 text-studio-blue px-2 py-0.5 rounded-full">All Components</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Component Registry */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-studio-blue mb-4">Component Registry</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-studio-blue/10">
                    <th className="text-left py-2 text-studio-blue/60 font-medium">Component</th>
                    <th className="text-left py-2 text-studio-blue/60 font-medium">Path</th>
                    <th className="text-left py-2 text-studio-blue/60 font-medium">Type</th>
                    <th className="text-left py-2 text-studio-blue/60 font-medium">Used In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-studio-blue/5">
                  <tr>
                    <td className="py-2 font-medium">WineCanvas</td>
                    <td className="py-2 font-mono text-xs text-studio-blue/50">components/WineCanvas.tsx</td>
                    <td className="py-2"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Phaser</span></td>
                    <td className="py-2 text-xs text-studio-blue/50">/trader, /buyer, /dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">WineCardModal</td>
                    <td className="py-2 font-mono text-xs text-studio-blue/50">components/WineCardModal.tsx</td>
                    <td className="py-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Modal</span></td>
                    <td className="py-2 text-xs text-studio-blue/50">/trader, /buyer, /dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">WineExplorerGame</td>
                    <td className="py-2 font-mono text-xs text-studio-blue/50">components/WineExplorerGame.tsx</td>
                    <td className="py-2"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Phaser</span></td>
                    <td className="py-2 text-xs text-studio-blue/50">/</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">WineStoryCard</td>
                    <td className="py-2 font-mono text-xs text-studio-blue/50">components/WineStoryCard.tsx</td>
                    <td className="py-2"><span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Card</span></td>
                    <td className="py-2 text-xs text-studio-blue/50">/</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Stack & Data Layer */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg text-studio-blue mb-4">Stack</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Framework</span><span className="font-mono text-studio-blue/50">Next.js 14</span></li>
                <li className="flex justify-between"><span>Game Engine</span><span className="font-mono text-studio-blue/50">Phaser 3</span></li>
                <li className="flex justify-between"><span>Database</span><span className="font-mono text-studio-blue/50">Supabase (PostgreSQL)</span></li>
                <li className="flex justify-between"><span>AI SDK</span><span className="font-mono text-studio-blue/50">Vercel AI + gpt-4o-mini</span></li>
                <li className="flex justify-between"><span>Styling</span><span className="font-mono text-studio-blue/50">Tailwind CSS</span></li>
                <li className="flex justify-between"><span>Validation</span><span className="font-mono text-studio-blue/50">Zod</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg text-studio-blue mb-4">Data Layer</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>wine_cards</span><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">6 seeded</span></li>
                <li className="flex justify-between"><span>wine_interactions</span><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">event log</span></li>
                <li className="flex justify-between"><span>wine_stories</span><span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">BC wines</span></li>
                <li className="flex justify-between"><span>engagement_events</span><span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">depth scoring</span></li>
                <li className="flex justify-between"><span>cascadia_wine_summary</span><span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">view</span></li>
              </ul>
            </div>
          </div>

          {/* API Routes */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-studio-blue mb-4">API Routes</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-studio-blue/5 rounded-lg">
                <span className="text-xs font-mono font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">POST</span>
                <span className="font-mono text-sm">/api/generate-story</span>
                <span className="text-xs text-studio-blue/50 ml-auto">AI story generation with cultural safety gate</span>
              </div>
            </div>
          </div>

          {/* Libs */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-studio-blue mb-4">Libraries</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-studio-blue/5 rounded-lg">
                <p className="font-medium">supabase.ts</p>
                <p className="text-xs text-studio-blue/50 mt-1">Client, logInteraction, getWineCardsByRegion, getCascadiaWineSummary</p>
              </div>
              <div className="p-3 bg-studio-blue/5 rounded-lg">
                <p className="font-medium">cultural-safety.ts</p>
                <p className="text-xs text-studio-blue/50 mt-1">FPIC verification, sensitive term detection, appropriation checks</p>
              </div>
              <div className="p-3 bg-studio-blue/5 rounded-lg">
                <p className="font-medium">discord.ts</p>
                <p className="text-xs text-studio-blue/50 mt-1">Webhook sharing, invite messages, channel recommendations</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================== */}
      {/* CANVAS VIEW */}
      {/* ============================== */}
      {activeView === 'canvas' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-studio-blue">
                WineCanvas &mdash; {persona === 'trader' ? 'Trade Portal' : 'Discovery'} Mode
              </h2>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                persona === 'trader'
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                {persona}
              </span>
            </div>
            <WineCanvas
              persona={persona}
              onWineCardSelect={(card) => setSelectedWine(card as WineCard)}
            />
          </div>
          {selectedWine && (
            <WineCardModal
              wine={selectedWine}
              persona={persona}
              sessionId={sessionId.current}
              onClose={() => setSelectedWine(null)}
            />
          )}
        </div>
      )}

      {/* ============================== */}
      {/* CARDS VIEW */}
      {/* ============================== */}
      {activeView === 'cards' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-studio-blue">Wine Cards from Supabase</h2>
              <button
                onClick={loadWineCards}
                className="text-sm px-4 py-2 bg-studio-blue text-white rounded-lg hover:bg-studio-blue/90 transition"
              >
                {cardsLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {wineCards.length === 0 && !cardsLoading && (
              <div className="text-center py-12 text-studio-blue/40">
                <p className="text-lg mb-2">No cards loaded</p>
                <p className="text-sm">Connect Supabase and run the migration to seed wine cards</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wineCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedWine(card)}
                  className="text-left p-4 rounded-lg border border-studio-blue/10 hover:border-studio-blue/30 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-studio-blue">{card.wine_name}</h3>
                  <p className="text-sm text-studio-blue/50 mt-1">{card.region}</p>
                  <p className="text-xs text-studio-blue/40 mt-0.5">{card.varietal}</p>
                  {card.maker_voice && (
                    <p className="text-xs text-studio-blue/60 mt-2 italic line-clamp-2">
                      &ldquo;{card.maker_voice}&rdquo;
                    </p>
                  )}
                  {(card.attribution as { land_acknowledgment?: string }).land_acknowledgment && (
                    <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      {(card.attribution as { land_acknowledgment: string }).land_acknowledgment}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {selectedWine && (
            <WineCardModal
              wine={selectedWine}
              persona={persona}
              sessionId={sessionId.current}
              onClose={() => setSelectedWine(null)}
            />
          )}
        </div>
      )}

      {/* ============================== */}
      {/* API TEST VIEW */}
      {/* ============================== */}
      {activeView === 'api' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-studio-blue mb-4">
              POST /api/generate-story
            </h2>
            <p className="text-sm text-studio-blue/60 mb-4">
              Tests the Vercel AI SDK endpoint with a sample wine card.
              Requires <code className="bg-studio-blue/5 px-1 rounded">OPENAI_API_KEY</code> in your environment.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-studio-blue/60">Persona:</span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                persona === 'trader'
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                {persona}
              </span>
              <span className="text-xs text-studio-blue/40">
                {persona === 'trader' ? 'Will request allocation insights' : 'Will request terroir story'}
              </span>
            </div>

            <button
              onClick={testApiRoute}
              disabled={apiTestLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
            >
              {apiTestLoading ? 'Generating...' : 'Send Test Request'}
            </button>

            {apiTestResult && (
              <pre className="mt-4 p-4 bg-studio-blue/5 rounded-lg text-xs font-mono overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap">
                {apiTestResult}
              </pre>
            )}
          </div>

          {/* Request Shape */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-studio-blue mb-3">Request Shape</h3>
            <pre className="p-4 bg-studio-blue/5 rounded-lg text-xs font-mono overflow-x-auto">{`POST /api/generate-story
Content-Type: application/json

{
  "wine_card": {
    "wine_name": "string",
    "region": "string",
    "varietal": "string",
    "maker_voice": "string",
    "cultural_context": "string"
  },
  "persona": "trader" | "buyer"
}`}</pre>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-studio-blue mb-3">Response Shape (Zod-validated)</h3>
            <pre className="p-4 bg-studio-blue/5 rounded-lg text-xs font-mono overflow-x-auto">{`{
  "headline": "string (6-8 words)",
  "narrative": "string (150 words)",
  "pairing": "string (unexpected food pairing)",
  "cultural_safety_check": boolean
}

// If cultural_safety_check is false:
// HTTP 400 { "error": "Cultural safety gate failed" }`}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
