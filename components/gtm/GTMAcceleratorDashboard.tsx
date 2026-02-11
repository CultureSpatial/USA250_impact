import React, { useState } from 'react';
import {
  Rocket,
  Target,
  Map as MapIcon,
  Layers,
  BarChart3,
  ChevronRight,
  Globe,
  TrendingUp,
  Zap,
  MousePointer2
} from 'lucide-react';

/**
 * GTM Accelerator Dashboard
 *
 * A spatial intelligence dashboard for Go-To-Market strategy visualization.
 * Provides market mirroring, growth propensity analysis, and node activation tracking.
 *
 * @component
 * @example
 * ```tsx
 * <GTMAcceleratorDashboard />
 * ```
 */
const GTMAcceleratorDashboard = () => {
  const [gtmPhase, setGtmPhase] = useState('pilot');
  const [activeSegment, setActiveSegment] = useState('synergy');

  // GTM Specific Market Nodes
  const marketNodes = [
    { id: 1, territory: 'PNW (Anchor)', gtmScore: 94, status: 'Active', growth: '+12%' },
    { id: 2, territory: 'EU-West (Mirror)', gtmScore: 88, status: 'Pipeline', growth: '+8%' }
  ];

  return (
    <div className="flex h-screen bg-neutral-50 font-sans text-slate-900 overflow-hidden">
      {/* GTM Control Center (Sidebar) */}
      <div className="w-85 bg-white border-r border-slate-200 flex flex-col p-6 shadow-lg z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">GTM Accelerator</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.1em] font-bold">Spatial Intelligence</p>
          </div>
        </div>

        {/* GTM Launch Phase Selector */}
        <section className="mb-8">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">
            Launch Trajectory
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
            {['Pilot', 'Scale', 'Global'].map((phase) => (
              <button
                key={phase}
                onClick={() => setGtmPhase(phase.toLowerCase())}
                className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                  gtmPhase === phase.toLowerCase()
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </section>

        {/* Market Stratification */}
        <section className="flex-1 space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
            GTM Tactical Layers
          </label>

          <div className="space-y-3">
            {[
              { id: 'synergy', label: 'Market Mirroring', icon: Target, desc: 'Identify PNW/EU counterparties' },
              { id: 'propensity', label: 'Growth Propensity', icon: TrendingUp, desc: 'High-yield ecological corridors' },
              { id: 'activation', label: 'Node Activation', icon: Zap, desc: 'Strategic supply-chain links' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveSegment(layer.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group ${
                  activeSegment === layer.id
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-1 ring-emerald-600'
                  : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <layer.icon className={`w-4 h-4 ${activeSegment === layer.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className={`text-sm font-bold ${activeSegment === layer.id ? 'text-emerald-800' : 'text-slate-700'}`}>
                    {layer.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pl-7 leading-snug">{layer.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Felt.com CTA */}
        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-indigo-900 rounded-2xl p-4 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
              <MapIcon className="w-12 h-12" />
            </div>
            <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">External Deployment</p>
            <h4 className="text-sm font-bold mb-3 italic">"The Felt Protocol"</h4>
            <button className="w-full bg-white text-indigo-900 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
              Deploy to Live Map
              <MousePointer2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Spatial Visualization (The "Felt" Mirror) */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE GTM SYNC
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-sm font-semibold text-slate-500">Asset: <span className="text-slate-900">7.6 Mirror-Node Analysis</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aggregate Market Propensity</span>
              <span className="text-xl font-black text-emerald-600 leading-none">89.4%</span>
            </div>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg">
              Generate Prospectus
            </button>
          </div>
        </header>

        <div className="flex-1 relative bg-slate-100">
          {/* Mock Map with Felt styling (saturated, collaborative feel) */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-60 grayscale-[0.3]" />

          {/* Connection Visuals */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full">
              <path
                d="M 250 500 C 400 200, 800 200, 1100 400"
                stroke="rgba(16, 185, 129, 0.5)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="12 6"
              />
              {/* Tactical Annotation */}
              <text x="50%" y="28%" className="fill-emerald-700 text-[10px] font-bold italic text-center" textAnchor="middle">
                INTER-REGIONAL MIRROR CORRIDOR [ACTIVE]
              </text>
            </svg>
          </div>

          {/* GTM Node: PNW */}
          <div className="absolute top-[60%] left-[20%] group">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping" />
              <div className="bg-white p-4 rounded-2xl shadow-2xl border-2 border-emerald-500 relative z-10 w-48 transition-transform group-hover:-translate-y-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] px-2 py-0.5 rounded-md font-bold">SOURCE</span>
                  <BarChart3 className="w-3 h-3 text-slate-400" />
                </div>
                <h4 className="font-bold text-sm">Willamette Node</h4>
                <p className="text-[10px] text-slate-500 mb-3 italic">Primary Ecological Anchor</p>
                <div className="flex justify-between border-t pt-2 border-slate-100">
                   <div className="text-center flex-1">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">GTM Score</div>
                      <div className="text-xs font-black">94</div>
                   </div>
                   <div className="w-px h-6 bg-slate-100" />
                   <div className="text-center flex-1">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Status</div>
                      <div className="text-xs font-black text-emerald-600">LIVE</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* GTM Node: EU */}
          <div className="absolute top-[35%] right-[20%] group">
            <div className="bg-white p-4 rounded-2xl shadow-2xl border-2 border-slate-200 relative z-10 w-48 transition-transform group-hover:-translate-y-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-indigo-100 text-indigo-700 text-[9px] px-2 py-0.5 rounded-md font-bold">MIRROR</span>
                  <BarChart3 className="w-3 h-3 text-slate-400" />
                </div>
                <h4 className="font-bold text-sm">Burgundy Segment</h4>
                <p className="text-[10px] text-slate-500 mb-3 italic">Identified Counterpart</p>
                <div className="flex justify-between border-t pt-2 border-slate-100">
                   <div className="text-center flex-1">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Match</div>
                      <div className="text-xs font-black">88%</div>
                   </div>
                   <div className="w-px h-6 bg-slate-100" />
                   <div className="text-center flex-1">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Target</div>
                      <div className="text-xs font-black text-indigo-600">Q3-24</div>
                   </div>
                </div>
            </div>
          </div>

          {/* Collaborative Annotation Mockup (Felt Style) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
             <div className="bg-white/90 backdrop-blur px-4 py-3 rounded-full shadow-lg border border-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">JD</div>
                <p className="text-xs font-medium text-slate-700">"Strong correlation in soil minerality profiles here."</p>
                <span className="text-[10px] text-slate-400">2m ago</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTMAcceleratorDashboard;
