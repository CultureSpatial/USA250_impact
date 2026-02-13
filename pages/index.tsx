// pages/index.tsx

import React, { useState } from 'react';
import { GTMAcceleratorDashboard, GuildAcademyCharter, HumancodeWine } from '../components';
import { Rocket, BookOpen, Wine, Menu } from 'lucide-react';

const IndexPage: React.FC = () => {
    const [activeView, setActiveView] = useState<'gtm' | 'guild' | 'narrative'>('gtm');

    const views = [
        {
            id: 'gtm' as const,
            label: 'GTM Accelerator',
            description: 'Spatial Intelligence Dashboard',
            icon: Rocket,
            color: 'emerald'
        },
        {
            id: 'guild' as const,
            label: 'Guild Academy',
            description: 'Technical Infrastructure Charter',
            icon: BookOpen,
            color: 'indigo'
        },
        {
            id: 'narrative' as const,
            label: 'Humancode Wine',
            description: 'Crime-to-Culture Engine',
            icon: Wine,
            color: 'purple'
        }
    ];

    const renderActiveComponent = () => {
        switch (activeView) {
            case 'gtm':
                return <GTMAcceleratorDashboard />;
            case 'guild':
                return <GuildAcademyCharter />;
            case 'narrative':
                return <HumancodeWine />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Navigation Bar */}
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-emerald-600 to-purple-600 p-2 rounded-xl shadow-lg">
                            <Menu className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">USA250 Impact</h1>
                            <p className="text-xs text-slate-400">Component Library</p>
                        </div>
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1">
                        {views.map((view) => {
                            const Icon = view.icon;
                            return (
                                <button
                                    key={view.id}
                                    onClick={() => setActiveView(view.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold text-sm ${
                                        activeView === view.id
                                            ? view.color === 'emerald'
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                                : view.color === 'indigo'
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                                : 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden md:inline">{view.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active View Description */}
                <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Current View:</span>
                    <span className="text-white font-semibold">
                        {views.find(v => v.id === activeView)?.label}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 italic">
                        {views.find(v => v.id === activeView)?.description}
                    </span>
                </div>
            </nav>

            {/* Component Display Area */}
            <main className="w-full">
                {renderActiveComponent()}
            </main>
        </div>
    );
};

export default IndexPage;
