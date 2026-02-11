/**
 * USA250 Impact: Vintage & Voice (CEP-23)
 *
 * Place Packet implementation demonstrating design evolution:
 * - Layer 1: Spatial Studio core (stable layout, structure, brand mark)
 * - Layer 2: Wine Heritage context (adaptive colors, gradients, emotional tone)
 *
 * @see PLACE_PACKET_DESIGN_EVOLUTION.md
 * @see design-tokens.md
 */

import React, { useState } from 'react';
import { Wine, Zap, Users, TrendingUp, ChevronRight, MapPin, Palette, LayoutDashboard } from 'lucide-react';

// ============================================================================
// DESIGN TOKENS - PLACE PACKET SYSTEM
// ============================================================================

const designSystem = {
  // Layer 1: Spatial Studio Core (Stable)
  core: {
    brand: '#10B981',      // emerald-600
    dark: '#0F172A',       // slate-900
  },
  // Layer 2: Wine Heritage Context (Adaptive)
  wine: {
    primary: '#9333EA',    // purple-600
    secondary: '#DB2777',  // pink-600
    accent: '#F87171',     // red-400
    light: '#E9D5FF',      // purple-200
    lighter: '#F3E8FF',    // purple-100
    gradient: 'from-purple-900 via-pink-900 to-slate-900',
  },
};

const IndexPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'components' | 'system'>('overview');

  return (
    <div className={`min-h-screen bg-gradient-to-br ${designSystem.wine.gradient} font-sans`}>
      {/* ========================================================================
          NAVIGATION (Spatial Studio structure + Wine Heritage colors)
          ======================================================================== */}
      <nav className="border-b border-purple-600/20 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo with Wine Heritage styling */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-lg shadow-purple-600/50">
              <Wine className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Vintage & Voice</h1>
              <p className="text-xs text-purple-200">Wine Heritage Edition</p>
            </div>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-200 rounded-full text-xs font-bold border border-purple-600/50">
            <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
            CEP-23 Place Packet
          </div>
        </div>
      </nav>

      {/* ========================================================================
          MAIN LAYOUT: SIDEBAR + CANVAS (Spatial Studio Pattern)
          ======================================================================== */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* SIDEBAR (Spatial Studio Structure) - Hidden on mobile */}
        <div className="hidden lg:flex flex-col w-96 bg-black/20 backdrop-blur-xl border-r border-purple-600/20 p-8 overflow-y-auto">
          <div className="space-y-8">
            {/* Navigation Sections */}
            <div className="space-y-3">
              <p className="text-xs uppercase font-bold text-purple-300 tracking-widest">Sections</p>
              <div className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: Wine },
                  { id: 'components', label: 'Components', icon: LayoutDashboard },
                  { id: 'system', label: 'Design System', icon: Palette },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50'
                          : 'text-purple-200 hover:bg-purple-600/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design System Info */}
            <div className="pt-8 border-t border-purple-600/20 space-y-4">
              <p className="text-xs uppercase font-bold text-purple-300 tracking-widest">Design System</p>
              <div className="space-y-3 text-sm text-purple-100">
                <div>
                  <p className="font-bold text-purple-300 text-xs">Layer 1: Core</p>
                  <p className="text-xs mt-1 text-purple-200">Spatial Studio (stable infrastructure)</p>
                </div>
                <div>
                  <p className="font-bold text-purple-300 text-xs">Layer 2: Context</p>
                  <p className="text-xs mt-1 text-purple-200">Wine Heritage (adaptive theme)</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-xl p-4">
              <p className="text-xs uppercase font-bold text-purple-300 tracking-widest">Value Drivers</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-purple-600/20">
                  <span className="text-purple-200">Throughput</span>
                  <span className="font-bold text-pink-300">+25%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-purple-600/20">
                  <span className="text-purple-200">QR Speed</span>
                  <span className="font-bold text-pink-300">{`<`}3 sec</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Wine Tribes</span>
                  <span className="font-bold text-pink-300">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CANVAS (Main Content Area) */}
        <div className="flex-1 overflow-y-auto">
          {/* OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <div className="min-h-full flex flex-col justify-center px-6 lg:px-12 py-20">
              <div className="max-w-4xl">
                {/* Context Badge */}
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-600/50 rounded-full">
                  <Wine className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-bold text-purple-200">Wine Heritage Place Packet</span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
                  Bottleneck to<br />Breakthrough
                </h1>

                {/* Hero Subheading */}
                <p className="text-lg lg:text-xl text-purple-100 mb-8 leading-relaxed max-w-3xl">
                  We traded trunk unlocking for bottle unlocking. Same 30-second loop, now in service of terroir.
                  A digital-first wine tasting experience that increases booth throughput by 25% while deepening
                  engagement through tribal storytelling.
                </p>

                {/* Value Proposition Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {[
                    { label: 'Throughput', value: '+25%', icon: TrendingUp },
                    { label: 'QR Speed', value: '<3 sec', icon: Zap },
                    { label: 'Wine Tribes', value: '6', icon: Users },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-600/50 rounded-xl p-6 hover:from-purple-600/30 hover:to-pink-600/30 transition-all"
                      >
                        <Icon className="w-6 h-6 text-purple-300 mb-3" />
                        <p className="text-xs uppercase font-bold text-purple-300 tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setActiveSection('components')}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-600/50 transform hover:-translate-y-0.5"
                >
                  Explore Components
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          )}

          {/* COMPONENTS SECTION */}
          {activeSection === 'components' && (
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
              <h2 className="text-4xl font-bold text-white mb-4 text-balance">Component Library</h2>
              <p className="text-lg text-purple-100 mb-12 max-w-3xl">
                Built with responsive design across mobile, tablet, and desktop. All components use the
                Place Packet design system combining Spatial Studio structure with Wine Heritage theming.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    title: 'Pre-Selection UI',
                    desc: 'Queue-time wine selection interface with tribal filtering. Increases booth throughput by 25%.',
                    stats: ['+25% throughput', 'Mobile-optimized', 'Tribal filtering'],
                  },
                  {
                    title: 'Operator Dashboard',
                    desc: 'Real-time booth metrics showing pour history, TQ safety gate status, and tribal analytics.',
                    stats: ['Real-time metrics', 'TQ status tracking', 'Tribal breakdown'],
                  },
                  {
                    title: 'Digital Tasting Ticket',
                    desc: 'QR-based pour authorization with performance monitoring and TQ guidance.',
                    stats: ['QR validation <3 sec', 'Performance logging', 'TQ guidance'],
                  },
                  {
                    title: 'Service Layer',
                    desc: 'Complete business logic with 9 core functions for validation, metrics, and wine tribe management.',
                    stats: ['9 functions', 'Type-safe', 'Performance optimized'],
                  },
                ].map((component, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-600/40 rounded-2xl p-6 lg:p-8 hover:border-purple-600/60 hover:from-purple-600/20 hover:to-pink-600/20 transition-all group"
                  >
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
                      {component.title}
                    </h3>
                    <p className="text-purple-100 mb-6 text-sm leading-relaxed">{component.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {component.stats.map((stat, i) => (
                        <span
                          key={i}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/30 text-purple-200 border border-purple-600/50"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/40 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4">Responsive Design</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-purple-100">
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Mobile</p>
                    <p className="text-xs">{`<`} 640px - Single column, touch-optimized</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Tablet</p>
                    <p className="text-xs">640-1024px - Two column adaptive</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Desktop</p>
                    <p className="text-xs">{`>`} 1024px - Full sidebar + canvas</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DESIGN SYSTEM SECTION */}
          {activeSection === 'system' && (
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
              <h2 className="text-4xl font-bold text-white mb-4 text-balance">Design System</h2>
              <p className="text-lg text-purple-100 mb-12 max-w-3xl">
                Place Packet design evolution: Spatial Studio core + Wine Heritage context
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Layer 1: Core */}
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-600/40 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Layer 1: Spatial Studio Core</h3>
                  <div className="space-y-4 text-sm text-purple-100">
                    <div>
                      <p className="font-bold text-purple-300 mb-1">Stable Elements</p>
                      <ul className="text-xs space-y-1 ml-2">
                        <li>✓ Sidebar navigation structure</li>
                        <li>✓ Canvas main content area</li>
                        <li>✓ Brand mark and wordmark</li>
                        <li>✓ Interaction patterns</li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-purple-600/20">
                      <p className="font-bold text-purple-300 mb-2">Brand Color</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-emerald-600 border border-emerald-400" />
                        <span className="text-xs font-mono">#10B981 emerald-600</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 2: Context */}
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-600/40 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Layer 2: Wine Heritage Context</h3>
                  <div className="space-y-4 text-sm text-purple-100">
                    <div>
                      <p className="font-bold text-purple-300 mb-1">Adaptive Elements</p>
                      <ul className="text-xs space-y-1 ml-2">
                        <li>✓ Color palette (purple, pink, red)</li>
                        <li>✓ Gradient backgrounds</li>
                        <li>✓ Emotional tone (mysterious, transformative)</li>
                        <li>✓ Heritage context imagery</li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-purple-600/20 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-purple-600 border border-purple-400" />
                        <span className="text-xs font-mono">#9333EA purple-600</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-pink-600 border border-pink-400" />
                        <span className="text-xs font-mono">#DB2777 pink-600</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-red-400 border border-red-300" />
                        <span className="text-xs font-mono">#F87171 red-400</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-600/40 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Implementation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-purple-100">
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Files Created</p>
                    <ul className="text-xs space-y-1">
                      <li>• vintage-voice.ts (types)</li>
                      <li>• vintage-voice.service.ts</li>
                      <li>• PreSelectionUI.tsx</li>
                      <li>• OperatorDashboard.tsx</li>
                      <li>• DigitalTastingTicket.tsx</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Tech Stack</p>
                    <ul className="text-xs space-y-1">
                      <li>• Next.js 14</li>
                      <li>• React 18</li>
                      <li>• TypeScript</li>
                      <li>• Tailwind CSS</li>
                      <li>• Lucide Icons</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-purple-300 mb-2">Value Metrics</p>
                    <ul className="text-xs space-y-1">
                      <li>• +25% throughput</li>
                      <li>• {`<`}3 sec QR speed</li>
                      <li>• 6 Wine Tribes</li>
                      <li>• 14 types</li>
                      <li>• 9 services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
