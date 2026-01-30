'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface InteractionEvent {
  id: string
  session_id: string
  persona: 'trader' | 'buyer'
  event_type: string
  event_payload: Record<string, unknown>
  created_at: string
}

export default function InsightsPage() {
  const [events, setEvents] = useState<InteractionEvent[]>([])

  useEffect(() => {
    loadEvents()

    const channel = supabase
      .channel('wine_interactions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wine_interactions' },
        (payload) =>
          setEvents((prev) => [payload.new as InteractionEvent, ...prev])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function loadEvents() {
    const { data } = await supabase
      .from('wine_interactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    setEvents((data as InteractionEvent[]) || [])
  }

  const traderEvents = events.filter((e) => e.persona === 'trader')
  const buyerEvents = events.filter((e) => e.persona === 'buyer')

  const eventTypeCounts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.event_type] = (acc[e.event_type] || 0) + 1
    return acc
  }, {})

  const regionCounts = events.reduce<Record<string, number>>((acc, e) => {
    const region = (e.event_payload as { region?: string }).region
    if (region) acc[region] = (acc[region] || 0) + 1
    return acc
  }, {})

  const uniqueSessions = new Set(events.map((e) => e.session_id)).size

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        Live Engagement Insights
      </h1>
      <p className="text-gray-400 mb-8">
        Real-time event stream from wine_interactions via Supabase Realtime
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-800/30">
          <h2 className="text-sm font-medium text-blue-300 mb-2">
            Trader Activity
          </h2>
          <p className="text-4xl font-mono text-white">
            {traderEvents.length}
          </p>
          <p className="text-gray-500 text-xs mt-1">interactions</p>
        </div>
        <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-800/30">
          <h2 className="text-sm font-medium text-purple-300 mb-2">
            Buyer Activity
          </h2>
          <p className="text-4xl font-mono text-white">
            {buyerEvents.length}
          </p>
          <p className="text-gray-500 text-xs mt-1">interactions</p>
        </div>
        <div className="bg-green-900/30 p-6 rounded-lg border border-green-800/30">
          <h2 className="text-sm font-medium text-green-300 mb-2">
            Unique Sessions
          </h2>
          <p className="text-4xl font-mono text-white">{uniqueSessions}</p>
          <p className="text-gray-500 text-xs mt-1">distinct users</p>
        </div>
        <div className="bg-amber-900/30 p-6 rounded-lg border border-amber-800/30">
          <h2 className="text-sm font-medium text-amber-300 mb-2">
            Total Events
          </h2>
          <p className="text-4xl font-mono text-white">{events.length}</p>
          <p className="text-gray-500 text-xs mt-1">last 50 shown</p>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Event Types */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Event Types
          </h3>
          <div className="space-y-2">
            {Object.entries(eventTypeCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-mono">
                    {type}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{
                          width: `${(count / events.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Region Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Region Activity
          </h3>
          {Object.keys(regionCounts).length === 0 ? (
            <p className="text-gray-500 text-sm">
              No region clicks recorded yet
            </p>
          ) : (
            <div className="space-y-2">
              {Object.entries(regionCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([region, count]) => (
                  <div
                    key={region}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 text-sm">{region}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{
                            width: `${(count / Math.max(...Object.values(regionCounts))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Stream */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Event Stream</h3>
          <button
            onClick={loadEvents}
            className="text-sm px-3 py-1.5 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
          >
            Refresh
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No events recorded yet. Interact with /trader or /buyer to
              generate events.
            </p>
          )}
          {events.map((event) => (
            <div key={event.id} className="bg-gray-700 p-3 rounded text-sm">
              <span
                className={`font-bold ${
                  event.persona === 'trader'
                    ? 'text-blue-300'
                    : 'text-purple-300'
                }`}
              >
                {event.persona.toUpperCase()}
              </span>
              {' \u2014 '}
              <span className="text-gray-300">{event.event_type}</span>
              {' \u2014 '}
              <span className="text-gray-500 text-xs">
                {new Date(event.created_at).toLocaleTimeString()}
              </span>
              {event.event_payload &&
                Object.keys(event.event_payload).length > 0 && (
                  <pre className="text-xs text-gray-400 mt-2 overflow-x-auto">
                    {JSON.stringify(event.event_payload, null, 2)}
                  </pre>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
