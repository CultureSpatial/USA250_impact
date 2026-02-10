import React, { useState, createContext, useContext } from 'react';
import { Wine, MapPin, Music, Rocket } from 'lucide-react';

/**
 * PLACE PACKET SHELL - BOILERPLATE COMPONENT
 *
 * This component demonstrates the design evolution from Spatial Studio (stable)
 * to Place Packet (context-adaptive) visual language.
 *
 * Key Principles:
 * 1. Layout structure is STABLE (inherited from Spatial Studio)
 * 2. Visual theme is ADAPTIVE (based on heritage context)
 * 3. Interaction patterns are STABLE (consistent UX)
 * 4. Content is CONTEXTUAL (community-driven)
 *
 * @example
 * ```tsx
 * <PlacePacketShell context="wine">
 *   <PlacePacketContent />
 * </PlacePacketShell>
 * ```
 */

// ============================================================================
// DESIGN TOKEN DEFINITIONS
// ============================================================================

/**
 * LAYER 1: SPATIAL STUDIO CORE (Never Changes)
 * These tokens represent the stable infrastructure brand
 */
const spatialStudioCore = {
  brand: {
    primary: '#10B981',      // emerald-600
    secondary: '#312E81',    // indigo-900
    dark: '#0F172A',         // slate-900
  },
  layout: {
    sidebarWidth: '24rem',   // w-96
    headerHeight: '5rem',    // h-20
    borderRadius: {
      card: '1rem',          // rounded-xl
      button: '0.75rem',     // rounded-lg
      large: '1.5rem',       // rounded-2xl
    },
  },
  interaction: {
    hover: 'transform hover:-translate-y-1 transition-all duration-200',
    shadow: 'shadow-lg',
    shadowLarge: 'shadow-2xl',
  },
};

/**
 * LAYER 2: PLACE PACKET CONTEXTS (Adaptive)
 * Each context defines colors, gradients, textures for specific heritage
 */
const placePacketContexts = {
  wine: {
    id: 'wine',
    name: 'Wine Heritage',
    subtitle: 'Crime-to-Culture Edition',
    icon: Wine,
    palette: {
      primary: '#9333EA',      // purple-600
      secondary: '#DB2777',    // pink-600
      accent: '#F87171',       // red-400 (crime context)
      light: '#E9D5FF',        // purple-200
      lighter: '#F3E8FF',      // purple-100
    },
    gradient: 'from-purple-900 via-pink-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #581C87 0%, #831843 50%, #0F172A 100%)',
    textureUrl: '/textures/wine-cellar.jpg',
    textureOpacity: 0.2,
    emotionalTone: 'Mysterious, transformative, heritage-rich',
  },
  freedomTrails: {
    id: 'freedomTrails',
    name: 'Freedom Trails',
    subtitle: 'Story Trail Navigator',
    icon: MapPin,
    palette: {
      primary: '#1E40AF',      // blue-800
      secondary: '#B45309',    // amber-700
      accent: '#FDE047',       // yellow-300 (hope)
      light: '#BFDBFE',        // blue-200
      lighter: '#DBEAFE',      // blue-100
    },
    gradient: 'from-slate-800 via-blue-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #1E293B 0%, #1E3A8A 50%, #0F172A 100%)',
    textureUrl: '/textures/archival-map.jpg',
    textureOpacity: 0.3,
    emotionalTone: 'Reverent, dignified, archival',
  },
  soundClash: {
    id: 'soundClash',
    name: 'Sound Clash',
    subtitle: 'Carnival Edition',
    icon: Music,
    palette: {
      primary: '#EA580C',      // orange-500
      secondary: '#06B6D4',    // cyan-500
      accent: '#F59E0B',       // amber-500
      light: '#FEF3C7',        // amber-100
      lighter: '#FFFBEB',      // amber-50
    },
    gradient: 'from-orange-600 via-pink-600 to-purple-600',
    gradientCSS: 'linear-gradient(135deg, #EA580C 0%, #DB2777 50%, #9333EA 100%)',
    textureUrl: '/textures/carnival-pattern.jpg',
    textureOpacity: 0.25,
    emotionalTone: 'Energetic, celebratory, embodied',
  },
};

type PlacePacketContextType = keyof typeof placePacketContexts;

/**
 * LAYER 3: THEME CONTEXT (Runtime Composition)
 * React context for providing theme throughout component tree
 */
interface ThemeContextValue {
  context: PlacePacketContextType;
  theme: typeof placePacketContexts[PlacePacketContextType];
  coreTokens: typeof spatialStudioCore;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const usePlacePacketTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePlacePacketTheme must be used within PlacePacketShell');
  }
  return context;
};

// ============================================================================
// PLACE PACKET SHELL COMPONENT
// ============================================================================

interface PlacePacketShellProps {
  context: PlacePacketContextType;
  children: React.ReactNode;
}

export const PlacePacketShell: React.FC<PlacePacketShellProps> = ({
  context,
  children,
}) => {
  const theme = placePacketContexts[context];
  const coreTokens = spatialStudioCore;

  const themeValue: ThemeContextValue = {
    context,
    theme,
    coreTokens,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div
        className={`flex h-screen bg-gradient-to-br ${theme.gradient} font-sans text-white overflow-hidden`}
        style={{
          background: theme.gradientCSS,
        }}
      >
        {/* SIDEBAR: Spatial Studio Structure (Stable) */}
        <PlacePacketSidebar />

        {/* MAIN CANVAS: Context-Adaptive */}
        <PlacePacketCanvas>{children}</PlacePacketCanvas>
      </div>
    </ThemeContext.Provider>
  );
};

// ============================================================================
// SIDEBAR COMPONENT (Stable Structure, Context Icons)
// ============================================================================

const PlacePacketSidebar: React.FC = () => {
  const { theme, coreTokens } = usePlacePacketTheme();
  const [activePhase, setActivePhase] = useState('pilot');
  const Icon = theme.icon;

  return (
    <div className="w-96 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 shadow-2xl z-20">
      {/* Logo Area: Shows Spatial Studio brand with context icon */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="p-3 rounded-2xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.primary} 0%, ${theme.palette.secondary} 100%)`,
            boxShadow: `0 10px 30px ${theme.palette.primary}50`,
          }}
        >
          <Icon className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-tight">Spatial Studio</h1>
          <p
            className="text-[10px] uppercase tracking-[0.1em] font-bold"
            style={{ color: theme.palette.light }}
          >
            {theme.subtitle}
          </p>
        </div>
      </div>

      {/* Phase Selector: Uses core interaction patterns */}
      <section className="mb-8">
        <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4 block">
          Launch Phase
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          {['Pilot', 'Scale', 'Global'].map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase.toLowerCase())}
              className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                activePhase === phase.toLowerCase()
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              }`}
              style={{
                backgroundColor:
                  activePhase === phase.toLowerCase()
                    ? theme.palette.primary
                    : undefined,
                boxShadow:
                  activePhase === phase.toLowerCase()
                    ? `0 4px 14px ${theme.palette.primary}50`
                    : undefined,
              }}
            >
              {phase}
            </button>
          ))}
        </div>
      </section>

      {/* Content Cards: Context-themed but stable structure */}
      <section className="flex-1 space-y-4">
        <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">
          Place Packets
        </label>

        <div className="space-y-3">
          <PlacePacketCard
            title="Example Place Packet 1"
            location="Location Name"
            era="1920-1933"
            status="Active"
            gtmScore={92}
            isActive={true}
          />
          <PlacePacketCard
            title="Example Place Packet 2"
            location="Location Name"
            era="1940-1945"
            status="Pipeline"
            gtmScore={88}
            isActive={false}
          />
          <PlacePacketCard
            title="Example Place Packet 3"
            location="Location Name"
            era="1882-1943"
            status="Research"
            gtmScore={85}
            isActive={false}
          />
        </div>
      </section>

      {/* Felt.com CTA: Uses Spatial Studio core brand */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div
          className="rounded-2xl p-4 relative overflow-hidden group cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.primary} 0%, ${theme.palette.secondary} 100%)`,
            boxShadow: `0 10px 30px ${theme.palette.primary}50`,
          }}
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
            <MapPin className="w-12 h-12" />
          </div>
          <p
            className="text-[10px] font-bold uppercase mb-1"
            style={{ color: theme.palette.lighter }}
          >
            Felt.com Integration
          </p>
          <h4 className="text-sm font-bold mb-3 italic">Deploy to Live Map</h4>
          <button className="w-full bg-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            style={{ color: theme.palette.primary }}
          >
            🗺️ Launch Map View
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PLACE PACKET CARD COMPONENT
// ============================================================================

interface PlacePacketCardProps {
  title: string;
  location: string;
  era: string;
  status: 'Active' | 'Pipeline' | 'Research';
  gtmScore: number;
  isActive: boolean;
}

const PlacePacketCard: React.FC<PlacePacketCardProps> = ({
  title,
  location,
  era,
  status,
  gtmScore,
  isActive,
}) => {
  const { theme } = usePlacePacketTheme();

  const statusColors = {
    Active: { bg: '#10B98120', text: '#6EE7B7' },
    Pipeline: { bg: `${theme.palette.secondary}20`, text: theme.palette.light },
    Research: { bg: '#64748B20', text: '#94A3B8' },
  };

  return (
    <button
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group ${
        isActive
          ? 'shadow-lg ring-1'
          : 'hover:bg-white/10 hover:border-white/20'
      }`}
      style={{
        borderColor: isActive ? theme.palette.primary : 'rgba(255,255,255,0.1)',
        backgroundColor: isActive
          ? `${theme.palette.primary}20`
          : 'rgba(255,255,255,0.05)',
        boxShadow: isActive
          ? `0 10px 30px ${theme.palette.primary}30`
          : undefined,
        ringColor: isActive ? theme.palette.primary : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm font-bold ${
            isActive ? 'text-white' : 'text-white/80'
          }`}
        >
          {title}
        </span>
        <span
          className="text-[9px] px-2 py-0.5 rounded-full font-bold"
          style={{
            backgroundColor: statusColors[status].bg,
            color: statusColors[status].text,
          }}
        >
          {status}
        </span>
      </div>
      <p className="text-[10px] text-white/50 mb-1">
        {era} • {location}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-white/40">GTM Score:</span>
        <span
          className="text-xs font-black"
          style={{ color: theme.palette.light }}
        >
          {gtmScore}
        </span>
      </div>
    </button>
  );
};

// ============================================================================
// MAIN CANVAS COMPONENT
// ============================================================================

const PlacePacketCanvas: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = usePlacePacketTheme();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Bar */}
      <header className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-10 shadow-lg z-10">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold"
            style={{
              backgroundColor: `${theme.palette.primary}20`,
              color: theme.palette.light,
              border: `1px solid ${theme.palette.primary}30`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: theme.palette.primary }}
            />
            LIVE SYNC ACTIVE
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm font-semibold text-white/60">
            Story: <span className="text-white">Active Place Packet</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
              Cultural Impact Score
            </span>
            <span
              className="text-xl font-black leading-none"
              style={{ color: theme.palette.primary }}
            >
              92%
            </span>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg"
            style={{
              background: `linear-gradient(to right, ${theme.palette.primary}, ${theme.palette.secondary})`,
              color: 'white',
              boxShadow: `0 4px 14px ${theme.palette.primary}50`,
            }}
          >
            Export Story Package
          </button>
        </div>
      </header>

      {/* Main Content Area with Texture */}
      <div
        className="flex-1 relative"
        style={{
          background: theme.gradientCSS,
        }}
      >
        {/* Background Texture */}
        {theme.textureUrl && (
          <div
            className="absolute inset-0 bg-cover mix-blend-overlay"
            style={{
              backgroundImage: `url('${theme.textureUrl}')`,
              opacity: theme.textureOpacity,
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example: Wine Heritage Place Packet
 */
export const WineHeritagePlacePacket: React.FC = () => {
  const { theme } = usePlacePacketTheme();

  return (
    <div className="max-w-4xl w-full">
      {/* Title */}
      <div className="text-center mb-12">
        <h2
          className="text-5xl font-black mb-4 bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary}, ${theme.palette.light}, ${theme.palette.primary})`,
          }}
        >
          Prohibition Cellar
        </h2>
        <p className="text-xl text-white/60 italic">Willamette Valley, OR • 1920-1933</p>
      </div>

      {/* Crime Context */}
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">⚡</span>
          <h3
            className="text-lg font-bold"
            style={{ color: theme.palette.accent }}
          >
            Crime Context (Historical)
          </h3>
        </div>
        <p className="text-white/80 leading-relaxed">
          Bootlegger operation during Prohibition era. Secret cellar network
          connected 47 documented sites across the valley, creating shadow
          infrastructure for wine production and distribution.
        </p>
      </div>

      {/* Cultural Transformation */}
      <div
        className="backdrop-blur-xl border rounded-3xl p-8 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
          borderColor: `${theme.palette.primary}30`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Wine className="w-5 h-5" style={{ color: theme.palette.light }} />
          <h3
            className="text-lg font-bold"
            style={{ color: theme.palette.lighter }}
          >
            Cultural Transformation (Today)
          </h3>
        </div>
        <p className="text-white/90 leading-relaxed mb-6">
          Historic winery restoration & heritage tourism. Now a living museum
          where visitors experience the full narrative: constraint → innovation
          → cultural asset.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <span>🎧</span> Audio Tour
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <span>📍</span> Visit Site
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border font-semibold text-sm"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <span>💬</span> Discussion
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT DEMO COMPONENTS
// ============================================================================

export const WineHeritageDemo = () => (
  <PlacePacketShell context="wine">
    <WineHeritagePlacePacket />
  </PlacePacketShell>
);

export const FreedomTrailsDemo = () => (
  <PlacePacketShell context="freedomTrails">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Freedom Trails Content</h2>
      <p className="text-xl opacity-80">
        Replace this with your Freedom Trails narrative component
      </p>
    </div>
  </PlacePacketShell>
);

export const SoundClashDemo = () => (
  <PlacePacketShell context="soundClash">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Sound Clash Content</h2>
      <p className="text-xl opacity-80">
        Replace this with your Sound Clash narrative component
      </p>
    </div>
  </PlacePacketShell>
);

export default PlacePacketShell;
