import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const JourneyAppComponent = dynamic(() => import('./JourneyApp').then(mod => ({ default: mod.JourneyApp })), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export function JourneyAppWrapper() {
  return <JourneyAppComponent />;
}

function LoadingScreen() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>
        <h1 className="text-white font-bold text-xl">Loading Journey...</h1>
        <p className="text-white/60 text-sm mt-2">Initializing USA250 Experience</p>
      </div>
    </div>
  );
}
