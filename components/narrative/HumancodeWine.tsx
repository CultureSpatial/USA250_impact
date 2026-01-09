import React, { useState } from 'react';
import { Rocket, MapPin, Wine, Zap, ShoppingCart, Play, Volume2 } from 'lucide-react';

/**
 * Humancode Wine - Crime-to-Culture Narrative Engine
 *
 * A narrative-driven component that transforms crime prohibition stories
 * into cultural heritage experiences for USA250 Story Trails.
 *
 * Integrates with GTM strategy for tourist consumption and impact tracking.
 *
 * @component
 * @example
 * ```tsx
 * <HumancodeWine />
 * ```
 */
const HumancodeWine = () => {
  const [activeStory, setActiveStory] = useState('prohibition-cellar');
  const [gtmPhase, setGtmPhase] = useState('pilot');

  // Crime-to-Culture Narrative Nodes
  const narrativeNodes = [
    {
      id: 'prohibition-cellar',
      title: 'Prohibition Cellar',
      era: '1920-1933',
      location: 'Willamette Valley',
      crimeContext: 'Bootlegging operations during Prohibition',
      cultureTransformation: 'Historic winery restoration & heritage tourism',
      gtmScore: 92,
      status: 'Active'
    },
    {
      id: 'bordeaux-mirror',
      title: 'Bordeaux Wine Route',
      era: '1940-1945',
      location: 'Burgundy, France',
      crimeContext: 'Resistance wine smuggling networks',
      cultureTransformation: 'Liberation trail wine tourism',
      gtmScore: 88,
      status: 'Pipeline'
    },
    {
      id: 'chinese-gardens',
      title: 'Chinese Gardens Underground',
      era: '1882-1943',
      location: 'Portland Chinatown',
      crimeContext: 'Exclusion Act resistance networks',
      cultureTransformation: 'Cultural preservation & food heritage',
      gtmScore: 85,
      status: 'Research'
    }
  ];

  const selectedNarrative = narrativeNodes.find(n => n.id === activeStory);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans text-white overflow-hidden">
      {/* Narrative Control Panel */}
      <div className="w-96 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg shadow-purple-500/50">
            <Wine className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight">Humancode Wine</h1>
            <p className="text-[10px] text-purple-300 uppercase tracking-[0.1em] font-bold">
              Crime-to-Culture Engine
            </p>
          </div>
        </div>

        {/* GTM Phase Selector */}
        <section className="mb-8">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4 block">
            Story Arc Phase
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            {['Research', 'Pilot', 'Scale'].map((phase) => (
              <button
                key={phase}
                onClick={() => setGtmPhase(phase.toLowerCase())}
                className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                  gtmPhase === phase.toLowerCase()
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </section>

        {/* Narrative Selection */}
        <section className="flex-1 space-y-4">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">
            Narrative Threads
          </label>

          <div className="space-y-3">
            {narrativeNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveStory(node.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group ${
                  activeStory === node.id
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30 ring-1 ring-purple-500'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${activeStory === node.id ? 'text-purple-300' : 'text-white/80'}`}>
                    {node.title}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    node.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                    node.status === 'Pipeline' ? 'bg-indigo-500/20 text-indigo-300' :
                    'bg-slate-500/20 text-slate-300'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <p className="text-[10px] text-white/50 mb-1">{node.era} • {node.location}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-white/40">GTM Score:</span>
                  <span className="text-xs font-black text-purple-300">{node.gtmScore}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Story Trail CTA */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl p-4 relative overflow-hidden group cursor-pointer shadow-lg shadow-pink-500/30">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
              <MapPin className="w-12 h-12" />
            </div>
            <p className="text-[10px] font-bold text-pink-200 uppercase mb-1">USA250 Integration</p>
            <h4 className="text-sm font-bold mb-3 italic">Deploy Story Trail</h4>
            <button className="w-full bg-white text-purple-900 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors shadow-lg">
              <Play className="w-3 h-3" />
              Launch Experience
            </button>
          </div>
        </div>
      </div>

      {/* Narrative Visualization */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-10 shadow-lg z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-[10px] font-bold border border-purple-500/30">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              NARRATIVE SYNC ACTIVE
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-semibold text-white/60">
              Story: <span className="text-white">{selectedNarrative?.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                Cultural Impact Score
              </span>
              <span className="text-xl font-black text-purple-400 leading-none">
                {selectedNarrative?.gtmScore}%
              </span>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50">
              Export Story Package
            </button>
          </div>
        </header>

        {/* Story Canvas */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
          {/* Background Texture */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20 mix-blend-overlay" />

          {/* Narrative Content */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="max-w-4xl">
              {/* Story Header */}
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedNarrative?.title}
                </h2>
                <p className="text-xl text-white/60 italic">{selectedNarrative?.era}</p>
              </div>

              {/* Crime Context Card */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-red-300">Crime Context (Historical)</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {selectedNarrative?.crimeContext}
                </p>
              </div>

              {/* Cultural Transformation Card */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Wine className="w-5 h-5 text-purple-300" />
                  <h3 className="text-lg font-bold text-purple-200">Cultural Transformation (Today)</h3>
                </div>
                <p className="text-white/90 leading-relaxed mb-6">
                  {selectedNarrative?.cultureTransformation}
                </p>

                {/* Interactive Elements */}
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">Audio Tour</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">Visit Site</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-semibold">Shop Local</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Pin */}
          <div className="absolute bottom-12 left-12">
            <div className="bg-black/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-xs text-white/50">Story Location</p>
                  <p className="text-sm font-bold">{selectedNarrative?.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumancodeWine;
