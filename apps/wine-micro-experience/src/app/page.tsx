'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { WineStoryCard, toShareableJSON } from '@/components/WineStoryCard'
import { shareToDiscord, createDiscordInviteMessage, getChannelRecommendations } from '@/lib/discord'
import type { WineStoryCard as WineStoryCardType, PersonaType, EngagementEvent } from '@/types/wine'

// Dynamic import for Phaser (client-side only)
const WineExplorerGame = dynamic(
  () => import('@/components/WineExplorerGame').then(mod => mod.WineExplorerGame),
  {
    ssr: false,
    loading: () => (
      <div className="phaser-container bg-warm-sand rounded-xl flex items-center justify-center">
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-wine-red border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-studio-blue/60 text-sm">Loading experience...</p>
        </div>
      </div>
    ),
  }
)

// Sample wine data (in production, this would come from Supabase)
const SAMPLE_WINES: WineStoryCardType[] = [
  {
    wine_id: 'bc-okanagan-pinot-2022',
    name: 'Okanagan Valley Pinot Noir Reserve',
    varietal: 'Pinot Noir',
    vintage: 2022,
    origin: {
      region: 'Okanagan Valley',
      subregion: 'Naramata Bench',
      country: 'Canada',
      coordinates: { lat: 49.5935, lng: -119.6027 },
    },
    maker_voice: {
      name: 'Sandra Oldfield',
      role: 'winemaker',
      perspective: 'incumbent',
      quote: "Thirty years teaching in this valley, and the vines still surprise me. Climate change isn't coming—it's here. We adapt or we disappear.",
    },
    pairing_notes: {
      food: ['Duck confit', 'Wild mushroom risotto', 'Aged gruyère'],
      occasion: ['Intimate dinner', 'Anniversary', 'Fall harvest'],
      mood: ['Reflective', 'Celebratory', 'Romantic'],
    },
    attribution: {
      indigenous_territory: 'Syilx (Okanagan) Nation',
      labor_acknowledgment: 'Hand-harvested by seasonal workers with living wage commitment',
      fpic_status: 'verified',
    },
    engagement: { views: 1247, saves: 89, shares: 34, depth_score: 72 },
    crown_status: 'OPEN',
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    wine_id: 'bc-similkameen-riesling-2023',
    name: 'Similkameen Organic Riesling',
    varietal: 'Riesling',
    vintage: 2023,
    origin: {
      region: 'Similkameen Valley',
      subregion: 'Cawston',
      country: 'Canada',
      coordinates: { lat: 49.1736, lng: -119.7553 },
    },
    maker_voice: {
      name: 'Maya Chen',
      role: 'viticulturist',
      perspective: 'digital_native',
      quote: "I came to wine through sustainability apps, not family tradition. The data says organic isn't just ethical—it's the only future.",
    },
    pairing_notes: {
      food: ['Sushi', 'Thai green curry', 'Fresh oysters'],
      occasion: ['Summer patio', 'First date', 'Brunch'],
      mood: ['Playful', 'Fresh', 'Adventurous'],
    },
    attribution: {
      indigenous_territory: "Syilx (Okanagan) Nation / Nlaka'pamux Nation",
      labor_acknowledgment: 'Certified organic operation with worker wellness program',
      fpic_status: 'pending',
    },
    engagement: { views: 892, saves: 156, shares: 67, depth_score: 81 },
    crown_status: 'OPEN',
    created_at: '2024-02-01',
    updated_at: '2024-02-10',
  },
  {
    wine_id: 'bc-fraser-gewurz-2021',
    name: 'Fraser Valley Gewürztraminer',
    varietal: 'Gewürztraminer',
    vintage: 2021,
    origin: {
      region: 'Fraser Valley',
      subregion: 'Abbotsford',
      country: 'Canada',
      coordinates: { lat: 49.0504, lng: -122.3045 },
    },
    maker_voice: {
      name: 'James Baptiste',
      role: 'owner',
      perspective: 'incumbent',
      quote: "My grandmother planted these vines. When I pour this wine, I'm pouring her story. That's not marketing—that's lineage.",
    },
    pairing_notes: {
      food: ['Spicy Asian cuisine', 'Charcuterie', 'Soft cheeses'],
      occasion: ['Family gathering', 'Book club', 'Casual entertaining'],
      mood: ['Nostalgic', 'Warm', 'Welcoming'],
    },
    attribution: {
      indigenous_territory: 'Stó:lō Nation',
      cultural_notes: 'Third-generation family vineyard with deep community ties',
      fpic_status: 'not_applicable',
    },
    engagement: { views: 634, saves: 45, shares: 23, depth_score: 65 },
    crown_status: 'OPEN',
    created_at: '2024-01-20',
    updated_at: '2024-01-25',
  },
  {
    wine_id: 'bc-vancouver-island-2022',
    name: 'Vancouver Island Ortega',
    varietal: 'Ortega',
    vintage: 2022,
    origin: {
      region: 'Vancouver Island',
      subregion: 'Cowichan Valley',
      country: 'Canada',
      coordinates: { lat: 48.7886, lng: -123.7086 },
    },
    maker_voice: {
      name: 'River Thompson',
      role: 'sommelier',
      perspective: 'digital_native',
      quote: "I discovered BC wine through TikTok, no joke. Now I spend my weekends driving these backroads. The algorithm knew something I didn't.",
    },
    pairing_notes: {
      food: ['Salmon', 'Local shellfish', 'Garden salads'],
      occasion: ['Picnic', 'Seafood feast', 'Wine club'],
      mood: ['Curious', 'Coastal', 'Laid-back'],
    },
    attribution: {
      indigenous_territory: "Quw'utsun (Cowichan) Tribes",
      labor_acknowledgment: 'Small-lot production with owner-harvested grapes',
      fpic_status: 'verified',
    },
    engagement: { views: 478, saves: 67, shares: 41, depth_score: 58 },
    crown_status: 'OPEN',
    created_at: '2024-02-05',
    updated_at: '2024-02-12',
  },
  {
    wine_id: 'bc-okanagan-icewine-2021',
    name: 'Okanagan Late Harvest Ice Wine',
    varietal: 'Vidal',
    vintage: 2021,
    origin: {
      region: 'Okanagan Valley',
      subregion: 'Oliver',
      country: 'Canada',
      coordinates: { lat: 49.1822, lng: -119.5516 },
    },
    maker_voice: {
      name: 'Dr. Helen Park',
      role: 'winemaker',
      perspective: 'incumbent',
      quote: "Ice wine is patience made liquid. Harvesting at -8°C at 3am... you either love this madness or you find another profession.",
    },
    pairing_notes: {
      food: ['Foie gras', 'Blue cheese', 'Crème brûlée'],
      occasion: ['Special celebration', 'Dessert course', 'Gift'],
      mood: ['Luxurious', 'Indulgent', 'Memorable'],
    },
    attribution: {
      indigenous_territory: 'Syilx (Okanagan) Nation',
      labor_acknowledgment: 'Night harvest crew with premium compensation',
      fpic_status: 'verified',
    },
    engagement: { views: 2341, saves: 234, shares: 156, depth_score: 89 },
    crown_status: 'PREMIUM',
    created_at: '2024-01-10',
    updated_at: '2024-01-18',
  },
]

export default function HomePage() {
  const [persona, setPersona] = useState<PersonaType>('new_buyer')
  const [selectedCard, setSelectedCard] = useState<WineStoryCardType | null>(null)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [engagementEvents, setEngagementEvents] = useState<EngagementEvent[]>([])
  const [savedCards, setSavedCards] = useState<string[]>([])
  const [regionsExplored, setRegionsExplored] = useState<Set<string>>(new Set())
  const [showDiscordInvite, setShowDiscordInvite] = useState(false)
  const [discordShareStatus, setDiscordShareStatus] = useState<'idle' | 'sharing' | 'success' | 'error'>('idle')
  const [perspectivesViewed, setPerspectivesViewed] = useState<Set<'incumbent' | 'digital_native'>>(new Set())

  // Track session start
  useEffect(() => {
    logEvent('session_started', { persona })
  }, [])

  // Log engagement event
  const logEvent = useCallback((eventType: string, properties: Record<string, unknown> = {}) => {
    const event: EngagementEvent = {
      event_id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event_type: eventType as EngagementEvent['event_type'],
      session_id: sessionId,
      persona,
      timestamp: new Date().toISOString(),
      properties,
      depth_signals: {},
    }
    setEngagementEvents(prev => [...prev, event])
    console.log('📊 Engagement Event:', event)
  }, [sessionId, persona])

  // Handle card selection
  const handleCardSelect = (card: WineStoryCardType) => {
    setSelectedCard(card)
    setPerspectivesViewed(prev => new Set(prev).add(card.maker_voice.perspective))
    logEvent('card_viewed', {
      wine_id: card.wine_id,
      region: card.origin.region,
      varietal: card.varietal,
      crown_status: card.crown_status,
      perspective: card.maker_voice.perspective,
    })
  }

  // Handle region exploration
  const handleRegionExplore = (region: string) => {
    setRegionsExplored(prev => new Set(prev).add(region))
    logEvent('region_explored', { region })
  }

  // Handle save
  const handleSave = (wineId: string) => {
    setSavedCards(prev => [...prev, wineId])
    logEvent('card_saved', { wine_id: wineId })
  }

  // Handle share
  const handleShare = async (card: WineStoryCardType) => {
    const shareData = toShareableJSON(card)

    // Try native share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.name} | Vintage & Voice`,
          text: card.maker_voice.quote,
          url: window.location.href,
        })
        logEvent('card_shared', { wine_id: card.wine_id, method: 'native' })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData)
      alert('Wine story copied to clipboard!')
      logEvent('card_shared', { wine_id: card.wine_id, method: 'clipboard' })
    }
  }

  // Handle Discord share
  const handleDiscordShare = async (card: WineStoryCardType) => {
    setDiscordShareStatus('sharing')
    const result = await shareToDiscord(card, persona)

    if (result.success) {
      setDiscordShareStatus('success')
      logEvent('card_shared', { wine_id: card.wine_id, method: 'discord' })
      setTimeout(() => setDiscordShareStatus('idle'), 3000)
    } else {
      setDiscordShareStatus('error')
      console.error('Discord share failed:', result.error)
      setTimeout(() => setDiscordShareStatus('idle'), 3000)
    }
  }

  // Show Discord invite modal
  const handleShowDiscordInvite = () => {
    setShowDiscordInvite(true)
    logEvent('discord_invite_viewed', {
      regions_explored: Array.from(regionsExplored),
      cards_viewed: engagementEvents.filter(e => e.event_type === 'card_viewed').length,
      depth_score: depthScore.total,
    })
  }

  // Handle persona switch
  const handlePersonaSwitch = (newPersona: PersonaType) => {
    setPersona(newPersona)
    logEvent('persona_switched', { from: persona, to: newPersona })
  }

  // Calculate engagement depth score
  const depthScore = {
    regions_explored: Math.min(regionsExplored.size * 25, 100),
    cards_viewed: Math.min(engagementEvents.filter(e => e.event_type === 'card_viewed').length * 10, 100),
    cards_saved: Math.min(savedCards.length * 20, 100),
    total: Math.round(
      (regionsExplored.size * 25 +
        engagementEvents.filter(e => e.event_type === 'card_viewed').length * 10 +
        savedCards.length * 20) / 3
    ),
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-studio-blue mb-3">
          Discover BC Wine Stories
        </h1>
        <p className="text-studio-blue/70 max-w-xl mx-auto">
          Two perspectives on wine, told side-by-side. Explore regions, meet makers,
          and find wines that match your journey.
        </p>

        {/* Persona Toggle */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            className={`
              px-4 py-2 rounded-full font-medium transition
              ${persona === 'trader'
                ? 'bg-studio-blue text-white'
                : 'bg-studio-blue/10 text-studio-blue hover:bg-studio-blue/20'}
            `}
            onClick={() => handlePersonaSwitch('trader')}
          >
            🏪 I'm a Trader
          </button>
          <button
            className={`
              px-4 py-2 rounded-full font-medium transition
              ${persona === 'new_buyer'
                ? 'bg-wine-red text-white'
                : 'bg-wine-red/10 text-wine-red hover:bg-wine-red/20'}
            `}
            onClick={() => handlePersonaSwitch('new_buyer')}
          >
            🍷 I'm Exploring
          </button>
        </div>
      </section>

      {/* Interactive Map */}
      <section>
        <WineExplorerGame
          wines={SAMPLE_WINES}
          persona={persona}
          onCardSelect={handleCardSelect}
          onRegionExplore={handleRegionExplore}
          onEngagementEvent={logEvent}
        />
      </section>

      {/* Selected Card Modal/Detail */}
      {selectedCard && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-sm w-full">
            <button
              className="absolute -top-10 right-0 text-white hover:text-wine-gold transition"
              onClick={() => setSelectedCard(null)}
            >
              ✕ Close
            </button>
            <WineStoryCard
              card={selectedCard}
              persona={persona}
              onSave={handleSave}
              onShare={handleShare}
              onExploreRegion={handleRegionExplore}
            />
          </div>
        </section>
      )}

      {/* Engagement Dashboard (Development View) */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="font-semibold text-studio-blue mb-4 flex items-center gap-2">
          <span>📊</span> Engagement Depth Score
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-warm-sand rounded-lg">
            <p className="text-2xl font-bold text-wine-red">{regionsExplored.size}</p>
            <p className="text-xs text-studio-blue/60">Regions Explored</p>
          </div>
          <div className="text-center p-4 bg-warm-sand rounded-lg">
            <p className="text-2xl font-bold text-action-teal">
              {engagementEvents.filter(e => e.event_type === 'card_viewed').length}
            </p>
            <p className="text-xs text-studio-blue/60">Cards Viewed</p>
          </div>
          <div className="text-center p-4 bg-warm-sand rounded-lg">
            <p className="text-2xl font-bold text-wine-gold">{savedCards.length}</p>
            <p className="text-xs text-studio-blue/60">Cards Saved</p>
          </div>
          <div className="text-center p-4 bg-wine-red text-white rounded-lg">
            <p className="text-2xl font-bold">{depthScore.total}</p>
            <p className="text-xs text-white/80">Depth Score</p>
          </div>
        </div>

        {/* Event Log (collapsible) */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-studio-blue/60 hover:text-studio-blue">
            View {engagementEvents.length} logged events
          </summary>
          <div className="mt-2 max-h-40 overflow-y-auto text-xs font-mono bg-studio-blue/5 rounded p-2">
            {engagementEvents.slice(-10).reverse().map((event) => (
              <div key={event.event_id} className="py-1 border-b border-studio-blue/10">
                <span className="text-wine-red">{event.event_type}</span>
                <span className="text-studio-blue/40 ml-2">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 bg-gradient-to-r from-wine-red to-incumbent-burgundy rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to go deeper?</h2>
        <p className="text-white/80 mb-4">
          {persona === 'trader'
            ? 'Unlock direct winery contacts and trade pricing'
            : 'Save your favorites and join our wine community'}
        </p>
        <button
          className="px-6 py-3 bg-white text-wine-red font-semibold rounded-full hover:bg-wine-gold hover:text-white transition"
          onClick={handleShowDiscordInvite}
        >
          {persona === 'trader' ? '🔓 Unlock Trade Access' : '💬 Join Discord Community'}
        </button>
      </section>

      {/* Discord Invite Modal */}
      {showDiscordInvite && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-studio-blue/60 hover:text-studio-blue transition"
              onClick={() => setShowDiscordInvite(false)}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🍷</div>
              <h3 className="text-xl font-bold text-studio-blue">Join the Community</h3>
            </div>

            <p className="text-studio-blue/80 text-sm mb-4">
              {createDiscordInviteMessage(
                Array.from(regionsExplored),
                engagementEvents.filter(e => e.event_type === 'card_viewed').length,
                depthScore.total
              )}
            </p>

            {/* Recommended Channels */}
            <div className="bg-warm-sand rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-studio-blue/60 mb-2">RECOMMENDED CHANNELS</p>
              <div className="flex flex-wrap gap-2">
                {getChannelRecommendations(
                  Array.from(regionsExplored),
                  Array.from(perspectivesViewed)
                ).map(channel => (
                  <span
                    key={channel}
                    className="text-sm bg-white px-2 py-1 rounded text-studio-blue"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://discord.gg/vintageandvoice"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#5865F2] text-white font-semibold rounded-lg text-center hover:bg-[#4752C4] transition"
              onClick={() => logEvent('discord_join_clicked', { persona })}
            >
              Join Discord Server
            </a>

            <p className="text-xs text-center text-studio-blue/40 mt-4">
              Connect with winemakers, traders, and fellow enthusiasts
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
