'use client';

import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-sand font-sans">
      <header className="bg-studio-blue text-white p-6">
        <h1 className="text-4xl font-bold leading-tight">
          Wine Micro-Experience
        </h1>
      </header>
      
      <main className="p-6">
        <section className="mb-6 flex gap-4">
          <button
            className="bg-studio-blue text-white px-6 h-11 rounded-md hover:bg-opacity-90 transition font-medium"
          >
            Primary Action
          </button>

          <button
            className="bg-transparent border-2 border-studio-blue text-studio-blue px-6 h-11 rounded-md hover:bg-opacity-5 transition font-medium"
          >
            Secondary Action
          </button>
        </section>

        <section className="space-y-6">
          <div
            className="bg-white shadow-sm rounded-md p-6 mb-6"
          >
            <h2 className="text-2xl font-semibold text-slate-dark mb-2">Card 1</h2>
            <p className="text-slate leading-relaxed">
              Example content for the first card.
            </p>
          </div>

          <div
            className="bg-white shadow-sm rounded-md p-6 mb-6"
          >
            <h2 className="text-2xl font-semibold text-slate-dark mb-2">Card 2</h2>
            <p className="text-slate leading-relaxed">
              Example content for the second card.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
