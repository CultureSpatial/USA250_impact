import React, { useState, createContext, useContext } from 'react';
import { GTMAcceleratorDashboard } from '../../components/gtm/GTMAcceleratorDashboard';
import { GuildAcademyCharter } from '../../components/guild/GuildAcademyCharter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn';
import { BarChart3, Users, Map, Settings } from 'lucide-react';

/**
 * GTM Context for cross-component communication
 */
interface GTMContextType {
  selectedMarket: string | null;
  setSelectedMarket: (market: string | null) => void;
  activeGuild: string | null;
  setActiveGuild: (guild: string | null) => void;
  gtmPhase: 'pilot' | 'scale' | 'global';
  setGtmPhase: (phase: 'pilot' | 'scale' | 'global') => void;
}

const GTMContext = createContext<GTMContextType | undefined>(undefined);

export const useGTMContext = () => {
  const context = useContext(GTMContext);
  if (!context) {
    throw new Error('useGTMContext must be used within GTMProvider');
  }
  return context;
};

/**
 * GTM Provider Component
 * Manages shared state across GTM and Guild components
 */
export const GTMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [activeGuild, setActiveGuild] = useState<string | null>(null);
  const [gtmPhase, setGtmPhase] = useState<'pilot' | 'scale' | 'global'>('pilot');

  return (
    <GTMContext.Provider
      value={{
        selectedMarket,
        setSelectedMarket,
        activeGuild,
        setActiveGuild,
        gtmPhase,
        setGtmPhase,
      }}
    >
      {children}
    </GTMContext.Provider>
  );
};

/**
 * Unified GTM Dashboard
 *
 * Integration Pattern #2: Unified GTM Dashboard
 * Combines GTM Accelerator with Guild Academy for comprehensive operational oversight
 *
 * Features:
 * - Tabbed navigation between GTM Strategy, Guild Management, and Analytics
 * - Shared state via GTMContext for cross-component communication
 * - Real-time sync between market nodes and guild activation
 * - Integrated analytics and reporting
 *
 * @example
 * ```tsx
 * <UnifiedGTMDashboard />
 * ```
 */
const UnifiedGTMDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gtm');
  const { selectedMarket, setSelectedMarket, activeGuild, setActiveGuild } = useGTMContext();

  // Analytics mock data
  const analytics = {
    totalMarkets: 7,
    activeGuilds: 5,
    gtmScore: 89.4,
    growthRate: '+12%',
    deployedSensors: 47,
    trainedMembers: 23,
  };

  return (
    <div className="h-screen bg-neutral-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Map className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg">USA250 Impact GTM Center</h1>
            <p className="text-xs text-slate-500">Unified Strategy & Operations Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {selectedMarket && (
            <div className="px-4 py-2 bg-emerald-100 rounded-lg">
              <p className="text-xs text-emerald-600 font-bold">Selected Market</p>
              <p className="text-sm font-semibold text-emerald-900">{selectedMarket}</p>
            </div>
          )}
          {activeGuild && (
            <div className="px-4 py-2 bg-indigo-100 rounded-lg">
              <p className="text-xs text-indigo-600 font-bold">Active Guild</p>
              <p className="text-sm font-semibold text-indigo-900">{activeGuild}</p>
            </div>
          )}
        </div>
      </header>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-64px)]">
        <TabsList className="w-full bg-white border-b border-slate-200 px-8">
          <TabsTrigger value="gtm" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            GTM Strategy
          </TabsTrigger>
          <TabsTrigger value="guild" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guild Academy
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* GTM Strategy Tab */}
        <TabsContent value="gtm" className="h-full m-0 p-0">
          <GTMAcceleratorDashboard />
        </TabsContent>

        {/* Guild Academy Tab */}
        <TabsContent value="guild" className="h-full overflow-y-auto p-8">
          <GuildAcademyCharter />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="h-full overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">GTM Performance Analytics</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Total Markets</p>
                <p className="text-3xl font-black text-slate-900">{analytics.totalMarkets}</p>
                <p className="text-xs text-emerald-600 mt-1">↑ 2 new this quarter</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Active Guilds</p>
                <p className="text-3xl font-black text-slate-900">{analytics.activeGuilds}</p>
                <p className="text-xs text-indigo-600 mt-1">5 technical authorities</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">GTM Score</p>
                <p className="text-3xl font-black text-emerald-600">{analytics.gtmScore}%</p>
                <p className="text-xs text-slate-500 mt-1">Aggregate propensity</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Growth Rate</p>
                <p className="text-3xl font-black text-emerald-600">{analytics.growthRate}</p>
                <p className="text-xs text-slate-500 mt-1">Year over year</p>
              </div>
            </div>

            {/* Infrastructure Metrics */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Infrastructure Deployment</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Deployed Sensors</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-black">{analytics.deployedSensors}</p>
                    <p className="text-sm text-slate-500 mb-2">across 7 markets</p>
                  </div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-2">Trained Guild Members</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-black">{analytics.trainedMembers}</p>
                    <p className="text-sm text-slate-500 mb-2">technical architects</p>
                  </div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '62%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Market Performance Table */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Market Performance</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-xs font-bold text-slate-500 uppercase">Territory</th>
                    <th className="text-left py-3 text-xs font-bold text-slate-500 uppercase">GTM Score</th>
                    <th className="text-left py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="text-left py-3 text-xs font-bold text-slate-500 uppercase">Growth</th>
                    <th className="text-left py-3 text-xs font-bold text-slate-500 uppercase">Active Guild</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 font-semibold">Willamette (PNW)</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-bold">94</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Active</span>
                    </td>
                    <td className="py-4 text-emerald-600 font-semibold">+12%</td>
                    <td className="py-4 text-sm">Sensor Deployment</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 font-semibold">Burgundy (EU-West)</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm font-bold">88</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">Pipeline</span>
                    </td>
                    <td className="py-4 text-emerald-600 font-semibold">+8%</td>
                    <td className="py-4 text-sm">Pattern Library</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="h-full overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Settings</h2>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold mb-4">Integration Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Felt.com API Integration</p>
                    <p className="text-xs text-slate-500">Enable map deployment to Felt</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold">
                    Connected
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">UMCES-CGC API</p>
                    <p className="text-xs text-slate-500">Environmental telemetry data source</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold">
                    Connected
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Real-time GTM Sync</p>
                    <p className="text-xs text-slate-500">30-second data refresh interval</p>
                  </div>
                  <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold">
                    Enabled
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/**
 * App wrapper with provider
 */
export const UnifiedGTMApp: React.FC = () => {
  return (
    <GTMProvider>
      <UnifiedGTMDashboard />
    </GTMProvider>
  );
};

export default UnifiedGTMApp;
