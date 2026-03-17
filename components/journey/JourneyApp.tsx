'use client';

import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import {
  Wine,
  MapPin,
  Music,
  Rocket,
  Users,
  Map,
  BarChart3,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  Settings,
  Home,
  Globe,
  Zap,
  TrendingUp,
  Target,
  BookOpen,
  Upload,
  CheckCircle2,
  ArrowRight,
  X,
  Menu,
} from 'lucide-react';

// ============================================================================
// DESIGN TOKEN SYSTEM
// ============================================================================

const spatialStudioCore = {
  brand: {
    primary: '#10B981',
    secondary: '#312E81',
    dark: '#0F172A',
  },
  layout: {
    sidebarWidth: '20rem',
    headerHeight: '4rem',
    borderRadius: {
      card: '1rem',
      button: '0.75rem',
      large: '1.5rem',
    },
  },
};

const journeyContexts = {
  home: {
    id: 'home',
    name: 'Journey Home',
    subtitle: 'USA250 Experience Navigator',
    icon: Compass,
    palette: {
      primary: '#10B981',
      secondary: '#312E81',
      accent: '#6366F1',
      light: '#D1FAE5',
      lighter: '#ECFDF5',
    },
    gradient: 'from-slate-900 via-emerald-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #0F172A 0%, #064E3B 50%, #0F172A 100%)',
  },
  wine: {
    id: 'wine',
    name: 'Wine Heritage',
    subtitle: 'Crime-to-Culture Edition',
    icon: Wine,
    palette: {
      primary: '#9333EA',
      secondary: '#DB2777',
      accent: '#F87171',
      light: '#E9D5FF',
      lighter: '#F3E8FF',
    },
    gradient: 'from-purple-900 via-pink-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #581C87 0%, #831843 50%, #0F172A 100%)',
  },
  freedomTrails: {
    id: 'freedomTrails',
    name: 'Freedom Trails',
    subtitle: 'Story Trail Navigator',
    icon: MapPin,
    palette: {
      primary: '#1E40AF',
      secondary: '#B45309',
      accent: '#FDE047',
      light: '#BFDBFE',
      lighter: '#DBEAFE',
    },
    gradient: 'from-slate-800 via-blue-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #1E293B 0%, #1E3A8A 50%, #0F172A 100%)',
  },
  soundClash: {
    id: 'soundClash',
    name: 'Sound Clash',
    subtitle: 'Carnival Edition',
    icon: Music,
    palette: {
      primary: '#EA580C',
      secondary: '#06B6D4',
      accent: '#F59E0B',
      light: '#FEF3C7',
      lighter: '#FFFBEB',
    },
    gradient: 'from-orange-600 via-pink-600 to-purple-600',
    gradientCSS: 'linear-gradient(135deg, #EA580C 0%, #DB2777 50%, #9333EA 100%)',
  },
  gtm: {
    id: 'gtm',
    name: 'GTM Accelerator',
    subtitle: 'Spatial Intelligence',
    icon: Rocket,
    palette: {
      primary: '#10B981',
      secondary: '#6366F1',
      accent: '#14B8A6',
      light: '#D1FAE5',
      lighter: '#ECFDF5',
    },
    gradient: 'from-slate-900 via-emerald-900 to-indigo-900',
    gradientCSS: 'linear-gradient(135deg, #0F172A 0%, #064E3B 50%, #312E81 100%)',
  },
  guild: {
    id: 'guild',
    name: 'Guild Academy',
    subtitle: 'Technical Infrastructure R&D',
    icon: Users,
    palette: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#A78BFA',
      light: '#C7D2FE',
      lighter: '#E0E7FF',
    },
    gradient: 'from-indigo-900 via-purple-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #312E81 0%, #581C87 50%, #0F172A 100%)',
  },
  felt: {
    id: 'felt',
    name: 'Felt Integration',
    subtitle: 'Collaborative Mapping',
    icon: Map,
    palette: {
      primary: '#0EA5E9',
      secondary: '#6366F1',
      accent: '#22D3EE',
      light: '#BAE6FD',
      lighter: '#E0F2FE',
    },
    gradient: 'from-sky-900 via-indigo-900 to-slate-900',
    gradientCSS: 'linear-gradient(135deg, #0C4A6E 0%, #312E81 50%, #0F172A 100%)',
  },
};

type JourneyContextType = keyof typeof journeyContexts;

// ============================================================================
// JOURNEY CONTEXT
// ============================================================================

interface JourneyState {
  currentView: JourneyContextType;
  setCurrentView: (view: JourneyContextType) => void;
  theme: typeof journeyContexts[JourneyContextType];
  audioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isHydrated: boolean;
}

const JourneyContext = createContext<JourneyState | null>(null);

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) throw new Error('useJourney must be used within JourneyProvider');
  return context;
};

// ============================================================================
// NARRATIVE DATA
// ============================================================================

const wineNarratives = [
  {
    id: 'prohibition-cellar',
    title: 'Prohibition Cellar',
    era: '1920-1933',
    location: 'Willamette Valley, OR',
    crimeContext: 'Bootlegger operation during Prohibition era. Secret cellar network connected 47 documented sites across the valley.',
    cultureTransformation: 'Historic winery restoration & heritage tourism. Now a living museum where visitors experience the full narrative.',
    gtmScore: 92,
    status: 'Active' as const,
  },
  {
    id: 'bordeaux-mirror',
    title: 'Bordeaux Wine Route',
    era: '1940-1945',
    location: 'Burgundy, France',
    crimeContext: 'Resistance wine smuggling networks during WWII. Hidden cellars used to protect cultural heritage.',
    cultureTransformation: 'Liberation trail wine tourism connecting US and French heritage.',
    gtmScore: 88,
    status: 'Pipeline' as const,
  },
  {
    id: 'chinese-gardens',
    title: 'Chinese Gardens Underground',
    era: '1882-1943',
    location: 'Portland Chinatown',
    crimeContext: 'Exclusion Act resistance networks. Underground tunnels preserved community ties.',
    cultureTransformation: 'Cultural preservation & food heritage programs.',
    gtmScore: 85,
    status: 'Research' as const,
  },
];

const gtmMarketNodes = [
  { id: 1, territory: 'PNW (Anchor)', gtmScore: 94, status: 'Active', growth: '+12%', coordinates: [-122.68, 45.52] },
  { id: 2, territory: 'EU-West (Mirror)', gtmScore: 88, status: 'Pipeline', growth: '+8%', coordinates: [4.84, 47.05] },
  { id: 3, territory: 'Okanagan (BC)', gtmScore: 82, status: 'Planning', growth: '+5%', coordinates: [-119.50, 49.89] },
];

const guildTracks = [
  { id: 'sensor', name: 'Sovereignty & Sensor Architect', members: 8, status: 'Active' },
  { id: 'spatial', name: 'Spatial & Accessibility Architect', members: 5, status: 'Active' },
  { id: 'economic', name: 'Economic Sovereignty Architect', members: 6, status: 'Pipeline' },
  { id: 'narrative', name: 'Narrative Governance Architect', members: 4, status: 'Active' },
  { id: 'pattern', name: 'Pattern Architect', members: 7, status: 'Active' },
];

// ============================================================================
// MAIN JOURNEY APP COMPONENT
// ============================================================================

export default function JourneyApp(): React.ReactNode {
  const [currentView, setCurrentView] = useState<JourneyContextType>('home');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const theme = journeyContexts[currentView];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div className="w-screen h-screen bg-black/90" />;
  }

  const contextValue: JourneyState = {
    currentView,
    setCurrentView,
    theme,
    audioPlaying,
    setAudioPlaying,
    sidebarOpen,
    setSidebarOpen,
    isHydrated,
  };

  return (
    <JourneyContext.Provider value={contextValue}>
      <div
        className="flex h-screen font-sans text-white overflow-hidden transition-all duration-500"
        style={{ background: theme.gradientCSS }}
      >
        {/* Sidebar Navigation */}
        <JourneySidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <JourneyHeader />
          <JourneyCanvas />
        </main>
      </div>
    </JourneyContext.Provider>
  );
}

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

const JourneySidebar: React.FC = () => {
  const { currentView, setCurrentView, theme, sidebarOpen, setSidebarOpen } = useJourney();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wine', label: 'Wine Heritage', icon: Wine },
    { id: 'freedomTrails', label: 'Freedom Trails', icon: MapPin },
    { id: 'soundClash', label: 'Sound Clash', icon: Music },
    { id: 'gtm', label: 'GTM Accelerator', icon: Rocket },
    { id: 'guild', label: 'Guild Academy', icon: Users },
    { id: 'felt', label: 'Felt Maps', icon: Map },
  ] as const;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-40 h-full bg-black/50 backdrop-blur-2xl border-r border-white/10
          transition-all duration-300 flex flex-col
          ${sidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-white/10 ${!sidebarOpen && 'lg:p-4'}`}>
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-2xl shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary} 0%, ${theme.palette.secondary} 100%)`,
                boxShadow: `0 10px 30px ${theme.palette.primary}40`,
              }}
            >
              <Compass className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-lg leading-tight">USA250</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-60">
                  Impact Journey
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarOpen && (
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 px-3">
              Experiences
            </p>
          )}
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const itemTheme = journeyContexts[item.id as JourneyContextType];
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as JourneyContextType)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'shadow-lg' 
                    : 'hover:bg-white/10'
                  }
                  ${!sidebarOpen && 'lg:justify-center lg:px-3'}
                `}
                style={{
                  backgroundColor: isActive ? `${itemTheme.palette.primary}30` : undefined,
                  borderColor: isActive ? itemTheme.palette.primary : 'transparent',
                  border: isActive ? '1px solid' : '1px solid transparent',
                }}
              >
                <Icon 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: isActive ? itemTheme.palette.light : 'rgba(255,255,255,0.6)' }}
                />
                {sidebarOpen && (
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary}40 0%, ${theme.palette.secondary}40 100%)`,
                border: `1px solid ${theme.palette.primary}30`,
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">
                Journey Progress
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: '68%', 
                      background: `linear-gradient(90deg, ${theme.palette.primary}, ${theme.palette.secondary})` 
                    }}
                  />
                </div>
                <span className="text-sm font-bold">68%</span>
              </div>
              <p className="text-[10px] text-white/50 mt-2">3 of 7 experiences completed</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const JourneyHeader: React.FC = () => {
  const { theme, audioPlaying, setAudioPlaying } = useJourney();
  const Icon = theme.icon;

  return (
    <header className="h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 lg:px-10 shadow-lg z-10">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
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
          LIVE SYNC
        </div>
        <div className="hidden sm:block h-4 w-px bg-white/10" />
        <div className="hidden sm:flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: theme.palette.light }} />
          <span className="text-sm font-semibold">
            <span className="text-white/50">Experience:</span>{' '}
            <span className="text-white">{theme.name}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setAudioPlaying(!audioPlaying)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle audio"
        >
          {audioPlaying ? (
            <Volume2 className="w-5 h-5" style={{ color: theme.palette.light }} />
          ) : (
            <VolumeX className="w-5 h-5 text-white/50" />
          )}
        </button>
        
        <button
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg hover:opacity-90"
          style={{
            background: `linear-gradient(to right, ${theme.palette.primary}, ${theme.palette.secondary})`,
            boxShadow: `0 4px 14px ${theme.palette.primary}40`,
          }}
        >
          Export Package
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
};

// ============================================================================
// CANVAS COMPONENT
// ============================================================================

const JourneyCanvas: React.FC = () => {
  const { currentView, theme } = useJourney();

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'wine':
        return <WineHeritageView />;
      case 'freedomTrails':
        return <FreedomTrailsView />;
      case 'soundClash':
        return <SoundClashView />;
      case 'gtm':
        return <GTMView />;
      case 'guild':
        return <GuildAcademyView />;
      case 'felt':
        return <FeltIntegrationView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex-1 relative overflow-y-auto">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 lg:p-10">
        {renderContent()}
      </div>
    </div>
  );
};

// ============================================================================
// HOME VIEW
// ============================================================================

const HomeView: React.FC = () => {
  const { setCurrentView } = useJourney();

  const experiences = [
    { id: 'wine', title: 'Wine Heritage', desc: 'Crime-to-culture stories', progress: 85, icon: Wine },
    { id: 'freedomTrails', title: 'Freedom Trails', desc: 'Underground railroad narratives', progress: 60, icon: MapPin },
    { id: 'soundClash', title: 'Sound Clash', desc: 'Carnival embodied memory', progress: 40, icon: Music },
    { id: 'gtm', title: 'GTM Accelerator', desc: 'Market intelligence', progress: 92, icon: Rocket },
    { id: 'guild', title: 'Guild Academy', desc: 'Technical infrastructure R&D', progress: 75, icon: Users },
    { id: 'felt', title: 'Felt Maps', desc: 'Collaborative spatial deployment', progress: 55, icon: Map },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          USA250 Impact Journey
        </h1>
        <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto">
          Navigate cultural heritage experiences, market intelligence, and infrastructure development
          for America's 250th anniversary celebration.
        </p>
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => {
          const expTheme = journeyContexts[exp.id as JourneyContextType];
          const Icon = exp.icon;
          
          return (
            <button
              key={exp.id}
              onClick={() => setCurrentView(exp.id as JourneyContextType)}
              className="group text-left p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: `0 0 0 0 ${expTheme.palette.primary}00`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 40px ${expTheme.palette.primary}30`;
                e.currentTarget.style.borderColor = `${expTheme.palette.primary}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${expTheme.palette.primary}00`;
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-3 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${expTheme.palette.primary}30, ${expTheme.palette.secondary}30)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: expTheme.palette.light }} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{exp.title}</h3>
                  <p className="text-xs text-white/50">{exp.desc}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-white/70">Progress</span>
                  <span className="text-xs font-bold" style={{ color: expTheme.palette.light }}>
                    {exp.progress}%
                  </span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${exp.progress}%`,
                      background: `linear-gradient(90deg, ${expTheme.palette.primary}, ${expTheme.palette.secondary})`,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// WINE HERITAGE VIEW
// ============================================================================

const WineHeritageView: React.FC = () => {
  const { theme } = useJourney();
  const [selectedNarrative, setSelectedNarrative] = React.useState(0);
  const narrative = wineNarratives[selectedNarrative];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Narrative Selector */}
        <div className="lg:col-span-1 space-y-3">
          {wineNarratives.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedNarrative(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedNarrative === idx
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              <h4 className="font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-white/50">{item.era}</p>
              <div className="mt-3 flex items-center gap-2">
                <BarChart3 className="w-3 h-3" style={{ color: theme.palette.light }} />
                <span className="text-xs font-semibold">GTM Score: {item.gtmScore}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Narrative Details */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="p-6 lg:p-8 rounded-3xl border"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
              borderColor: `${theme.palette.primary}30`,
            }}
          >
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Era & Location</p>
                <p className="text-white/60 text-sm">{narrative.era} • {narrative.location}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Crime Context</p>
                <p className="text-white/80">{narrative.crimeContext}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Cultural Transformation</p>
                <p className="text-white/80">{narrative.cultureTransformation}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest">GTM Score</span>
                  <span className="text-2xl font-black" style={{ color: theme.palette.light }}>
                    {narrative.gtmScore}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FREEDOM TRAILS VIEW
// ============================================================================

const FreedomTrailsView: React.FC = () => {
  const { theme } = useJourney();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div className="space-y-4">
        <div
          className="p-6 lg:p-8 rounded-3xl border"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
            borderColor: `${theme.palette.primary}30`,
          }}
        >
          <h3 className="text-xl font-bold mb-3">Underground Railroad Heritage Trails</h3>
          <p className="text-white/70 leading-relaxed">
            Map narrative paths from enslavement to freedom. Document safe house networks, guide systems, and community resilience stories across the USA250 corridors.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { title: 'Northern Routes', routes: 42, active: 'Live' },
            { title: 'Southern Networks', routes: 38, active: 'Research' },
            { title: 'Coastal Passages', routes: 28, active: 'Planning' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-2xl border border-white/10 bg-white/5"
            >
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-white/60 mb-3">{item.routes} documented routes</p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${theme.palette.primary}20`,
                  color: theme.palette.light,
                }}
              >
                {item.active}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SOUND CLASH VIEW
// ============================================================================

const SoundClashView: React.FC = () => {
  const { theme, audioPlaying, setAudioPlaying } = useJourney();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div
        className="p-8 rounded-3xl border"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
          borderColor: `${theme.palette.primary}30`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Carnival Heritage Audio Experience</h3>
          <button
            onClick={() => setAudioPlaying(!audioPlaying)}
            className="p-4 rounded-2xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.secondary})`,
              boxShadow: `0 4px 14px ${theme.palette.primary}40`,
            }}
          >
            {audioPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
        </div>

        <p className="text-white/70 leading-relaxed mb-6">
          Experience the embodied memory of Carnival traditions through sonic documentation. Heritage sounds, music, and oral histories preserved and spatially deployed.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Samba Rhythms', duration: '3:45', recorded: 'Rio de Janeiro' },
            { title: 'Calypso Stories', duration: '4:12', recorded: 'Trinidad' },
            { title: 'Parade Marches', duration: '5:30', recorded: 'New Orleans' },
            { title: 'Call & Response', duration: '3:20', recorded: 'Haiti' },
          ].map((track) => (
            <div key={track.title} className="p-3 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{track.title}</h4>
                <span className="text-xs text-white/50">{track.duration}</span>
              </div>
              <p className="text-xs text-white/50">{track.recorded}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// GTM VIEW
// ============================================================================

const GTMView: React.FC = () => {
  const { theme } = useJourney();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div className="space-y-6">
        {gtmMarketNodes.map((node) => (
          <div
            key={node.id}
            className="p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary}15, ${theme.palette.secondary}15)`,
              borderColor: `${theme.palette.primary}30`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{node.territory}</h3>
                <p className="text-sm text-white/60">{node.coordinates.join(', ')}</p>
              </div>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-bold mt-2 md:mt-0"
                style={{
                  background: `${theme.palette.primary}30`,
                  color: theme.palette.light,
                }}
              >
                {node.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">GTM Score</p>
                <p className="text-3xl font-black" style={{ color: theme.palette.light }}>
                  {node.gtmScore}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Growth Propensity</p>
                <p className="text-3xl font-black" style={{ color: theme.palette.accent }}>
                  {node.growth}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// GUILD ACADEMY VIEW
// ============================================================================

const GuildAcademyView: React.FC = () => {
  const { theme } = useJourney();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div className="space-y-4">
        {guildTracks.map((track) => (
          <div
            key={track.id}
            className="p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
              borderColor: `${theme.palette.primary}30`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white mb-1">{track.name}</h3>
                <p className="text-sm text-white/60">{track.members} members</p>
              </div>
              <span
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: `${theme.palette.primary}20`,
                  color: theme.palette.light,
                }}
              >
                {track.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// FELT INTEGRATION VIEW
// ============================================================================

const FeltIntegrationView: React.FC = () => {
  const { theme } = useJourney();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{theme.name}</h2>
        <p className="text-lg text-white/60">{theme.subtitle}</p>
      </div>

      <div
        className="p-8 rounded-3xl border"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.primary}20, ${theme.palette.secondary}20)`,
          borderColor: `${theme.palette.primary}30`,
        }}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">GeoJSON Deployment</h3>
            <p className="text-white/70 mb-4">
              Transform spatial heritage data into collaborative mapping layers. Deploy narrative geometries, heritage corridors, and cultural impact zones to Felt.com.
            </p>
            <button
              className="px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.secondary})`,
                boxShadow: `0 4px 14px ${theme.palette.primary}40`,
              }}
            >
              <Upload className="w-4 h-4" />
              Deploy to Felt.com
            </button>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold mb-3">Active Deployments</h3>
            <div className="space-y-3">
              {[
                { name: 'Wine Heritage Network', features: 147, status: 'Active' },
                { name: 'Freedom Trails Map', features: 89, status: 'Pipeline' },
                { name: 'Guild Academies', features: 34, status: 'Active' },
              ].map((deploy) => (
                <div key={deploy.name} className="p-3 rounded-lg bg-white/10 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{deploy.name}</h4>
                      <p className="text-xs text-white/50">{deploy.features} features</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${theme.palette.primary}20`,
                        color: theme.palette.light,
                      }}
                    >
                      {deploy.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
