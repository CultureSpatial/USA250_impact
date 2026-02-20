import React, { useState, useEffect } from "react"
import { MapPin, Volume2, Users, Share2, ChevronRight, Lock } from "lucide-react"
import PlacePacketShell from "./PlacePacketShell"
import {
  activeTrailStops,
  type ProhibitionArtifact,
  type NarrativeLayerType,
} from "../../seeds/prohibition-artifacts"
import {
  getFlagsForLevel,
  checkIgnisAdaptGate,
  type SovereigntyLevel,
} from "../../src/config/growthbook-sovereignty"

// ============================================================
// TYPES
// ============================================================

interface ProhibitionTrailPacketProps {
  /** GrowthBook-assigned sovereignty level for this deployment */
  sovereigntyLevel?: SovereigntyLevel
  /** Optional: override which trail stop to display first */
  initialStopIndex?: number
  /** Optional: user proximity zone (0-3); 0 = ambient, 3 = immersion */
  proximityZone?: 0 | 1 | 2 | 3
}

interface TrailStopState {
  artifact: ProhibitionArtifact
  activeLayer: NarrativeLayerType
  audioPlaying: boolean
}

// ============================================================
// PROHIBITION CONTEXT TOKENS
// (extends the 'freedomTrails' context from PlacePacketShell)
// ============================================================

const PROHIBITION_PALETTE = {
  primary: "#92400E",    // amber-800 (aged whiskey)
  secondary: "#1C1917",  // stone-900 (speakeasy dark)
  accent: "#D97706",     // amber-600 (candlelight)
  light: "#FEF3C7",      // amber-100
  muted: "#78716C",      // stone-500
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function ProximityZoneBadge({ zone }: { zone: 0 | 1 | 2 | 3 }) {
  const labels: Record<number, { text: string; color: string }> = {
    0: { text: "Ambient", color: "bg-stone-700 text-stone-300" },
    1: { text: "Approach", color: "bg-amber-900 text-amber-300" },
    2: { text: "Threshold", color: "bg-amber-700 text-amber-100" },
    3: { text: "Immersion", color: "bg-amber-500 text-stone-900" },
  }
  const { text, color } = labels[zone]
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {text}
    </span>
  )
}

function LayerTab({
  layerType,
  isActive,
  isLocked,
  onClick,
}: {
  layerType: NarrativeLayerType
  isActive: boolean
  isLocked: boolean
  onClick: () => void
}) {
  const labels: Record<NarrativeLayerType, string> = {
    historical: "Historical",
    community_memory: "Community",
    sensory_atmosphere: "Atmosphere",
  }
  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all
        ${isActive
          ? "bg-amber-600 text-stone-900 font-semibold"
          : isLocked
            ? "bg-stone-800 text-stone-600 cursor-not-allowed"
            : "bg-stone-700 text-stone-300 hover:bg-stone-600"
        }`}
    >
      {isLocked && <Lock size={12} />}
      {labels[layerType]}
    </button>
  )
}

function GovernanceBadge({
  cfiScore,
  ssiScore,
  sovereigntyLevel,
}: {
  cfiScore: number
  ssiScore: number
  sovereigntyLevel: SovereigntyLevel
}) {
  const gate = checkIgnisAdaptGate(cfiScore, ssiScore, sovereigntyLevel)
  if (!gate.pass) {
    return (
      <div className="text-xs px-2 py-1 bg-red-900 text-red-300 rounded border border-red-700">
        Tier 1 Veto — CFI/SSI below threshold
      </div>
    )
  }
  return (
    <div className="text-xs px-2 py-1 bg-stone-800 text-stone-400 rounded">
      CFI {(cfiScore * 100).toFixed(0)} · SSI {(ssiScore * 100).toFixed(0)}
      {gate.tier === 3 && " · Enhancement eligible"}
    </div>
  )
}

// ============================================================
// TRAIL STOP CARD
// ============================================================

function TrailStopCard({
  stopState,
  sovereigntyLevel,
  proximityZone,
  onLayerChange,
  onShare,
}: {
  stopState: TrailStopState
  sovereigntyLevel: SovereigntyLevel
  proximityZone: 0 | 1 | 2 | 3
  onLayerChange: (layer: NarrativeLayerType) => void
  onShare: () => void
}) {
  const { artifact, activeLayer } = stopState
  const flags = getFlagsForLevel(sovereigntyLevel)

  const activeNarrative = artifact.narratives.find((n) => n.layerType === activeLayer)

  const communityLocked = !flags["community-memory-layer"] || proximityZone < 3
  const atmosphereLocked = proximityZone < 3

  return (
    <div
      className="flex flex-col h-full bg-stone-900 rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(217, 119, 6, 0.3)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-start justify-between"
        style={{ background: "linear-gradient(135deg, #292524 0%, #1C1917 100%)" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} className="text-amber-500" />
            <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
              Stop {artifact.trailStop} of 7
            </span>
            <ProximityZoneBadge zone={proximityZone} />
          </div>
          <h2 className="text-xl font-bold text-stone-100">{artifact.name}</h2>
          <p className="text-stone-400 text-sm mt-0.5">
            {artifact.eraStart}
            {artifact.eraEnd !== artifact.eraStart ? `–${artifact.eraEnd}` : ""}
            {" · "}
            {artifact.address.split(",")[1]?.trim()}
          </p>
        </div>
        <GovernanceBadge
          cfiScore={artifact.cfiScore}
          ssiScore={artifact.ssiScore}
          sovereigntyLevel={sovereigntyLevel}
        />
      </div>

      {/* Layer Tabs */}
      <div className="px-6 py-3 flex gap-2 border-b border-stone-800">
        <LayerTab
          layerType="historical"
          isActive={activeLayer === "historical"}
          isLocked={false}
          onClick={() => onLayerChange("historical")}
        />
        <LayerTab
          layerType="community_memory"
          isActive={activeLayer === "community_memory"}
          isLocked={communityLocked}
          onClick={() => onLayerChange("community_memory")}
        />
        <LayerTab
          layerType="sensory_atmosphere"
          isActive={activeLayer === "sensory_atmosphere"}
          isLocked={atmosphereLocked}
          onClick={() => onLayerChange("sensory_atmosphere")}
        />
      </div>

      {/* Narrative Content */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        {activeNarrative ? (
          <div>
            <h3 className="text-stone-200 font-semibold mb-3">{activeNarrative.title}</h3>
            <p className="text-stone-300 leading-relaxed text-sm">{activeNarrative.scriptText}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-stone-500">
              <span>{Math.ceil(activeNarrative.durationSeconds / 60)} min</span>
              <span>·</span>
              <span>CFI {(activeNarrative.cfiScore * 100).toFixed(0)}</span>
              {!activeNarrative.stewardApproved && (
                <>
                  <span>·</span>
                  <span className="text-amber-600">Pending steward approval</span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-stone-600">
            <div className="text-center">
              <Lock size={24} className="mx-auto mb-2" />
              <p className="text-sm">
                {communityLocked && activeLayer === "community_memory"
                  ? "Move within 10m of this site to unlock"
                  : "Approach the site to unlock this layer"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className="px-6 py-4 flex items-center justify-between border-t border-stone-800"
        style={{ background: "rgba(28, 25, 23, 0.8)" }}
      >
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-amber-700 text-stone-100 hover:bg-amber-600 transition-colors"
        >
          <Volume2 size={16} />
          Play Audio
        </button>

        <div className="flex gap-2">
          {flags["tend-action-enabled"] && proximityZone >= 3 && (
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm
                bg-stone-700 text-stone-300 hover:bg-stone-600 transition-colors"
            >
              <Users size={14} />
              Tend
            </button>
          )}
          {flags["transmit-action-enabled"] && (
            <button
              onClick={onShare}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm
                bg-stone-700 text-stone-300 hover:bg-stone-600 transition-colors"
            >
              <Share2 size={14} />
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// TRAIL NAVIGATION SIDEBAR
// ============================================================

function TrailSidebar({
  stops,
  activeIndex,
  onSelectStop,
  proximityZone,
}: {
  stops: ProhibitionArtifact[]
  activeIndex: number
  onSelectStop: (index: number) => void
  proximityZone: 0 | 1 | 2 | 3
}) {
  return (
    <div className="w-64 flex-shrink-0 bg-stone-950 border-r border-stone-800 overflow-y-auto">
      <div className="px-4 py-5">
        <h1 className="text-base font-bold text-amber-400 leading-tight">
          Chicago Prohibition
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">Resistance Trail · 7 Stops · 2.5 mi</p>
      </div>

      <div className="px-2 pb-4 space-y-1">
        {stops.map((stop, i) => (
          <button
            key={stop.siteId}
            onClick={() => onSelectStop(i)}
            className={`w-full text-left px-3 py-3 rounded-xl transition-all
              ${i === activeIndex
                ? "bg-amber-900/50 border border-amber-700/50"
                : "hover:bg-stone-800/60"
              }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${i === activeIndex
                    ? "bg-amber-600 text-stone-900"
                    : "bg-stone-700 text-stone-400"
                  }`}
              >
                {stop.trailStop}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-medium truncate
                    ${i === activeIndex ? "text-amber-200" : "text-stone-300"}`}
                >
                  {stop.name}
                </p>
                <p className="text-xs text-stone-600 truncate">
                  {stop.eraStart}–{stop.eraEnd}
                </p>
              </div>
              {i === activeIndex && (
                <ChevronRight size={14} className="text-amber-500 flex-shrink-0 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ProhibitionTrailPacket({
  sovereigntyLevel = 0,
  initialStopIndex = 0,
  proximityZone = 2,
}: ProhibitionTrailPacketProps) {
  const [activeStopIndex, setActiveStopIndex] = useState(initialStopIndex)
  const [stopState, setStopState] = useState<TrailStopState>({
    artifact: activeTrailStops[initialStopIndex],
    activeLayer: "historical",
    audioPlaying: false,
  })

  useEffect(() => {
    setStopState((prev) => ({
      ...prev,
      artifact: activeTrailStops[activeStopIndex],
      activeLayer: "historical",
      audioPlaying: false,
    }))
  }, [activeStopIndex])

  function handleLayerChange(layer: NarrativeLayerType) {
    setStopState((prev) => ({ ...prev, activeLayer: layer }))
  }

  function handleShare() {
    const url = `${window.location.origin}/trail/${stopState.artifact.siteId}`
    navigator.clipboard?.writeText(url).catch(() => {})
  }

  return (
    <PlacePacketShell context="freedomTrails">
      <div className="flex h-full">
        {/* Trail Stop Navigation */}
        <TrailSidebar
          stops={activeTrailStops}
          activeIndex={activeStopIndex}
          onSelectStop={setActiveStopIndex}
          proximityZone={proximityZone}
        />

        {/* Active Stop Detail */}
        <div className="flex-1 p-6 overflow-hidden">
          <TrailStopCard
            stopState={stopState}
            sovereigntyLevel={sovereigntyLevel}
            proximityZone={proximityZone}
            onLayerChange={handleLayerChange}
            onShare={handleShare}
          />
        </div>
      </div>
    </PlacePacketShell>
  )
}

export default ProhibitionTrailPacket
