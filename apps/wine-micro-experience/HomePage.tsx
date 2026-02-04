'use client';

import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <header className="bg-blue-900 text-white p-6">
        <h1 className="text-4xl font-bold leading-tight">
          Wine Micro-Experience
        </h1>
      </header>
      
      <main className="p-6">
        <section className="mb-6 flex gap-4">
          <button className="bg-blue-900 text-white px-6 h-11 rounded-md hover:bg-blue-800 transition font-medium">
            Primary Action
          </button>

          <button className="bg-white border-2 border-blue-900 text-blue-900 px-6 h-11 rounded-md hover:bg-gray-100 transition font-medium">
            Secondary Action
          </button>
        </section>

        <section className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-700 leading-relaxed">
              This is your Wine Micro-Experience application. Start building your interface here with a working foundation.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Getting Started</h2>
            <p className="text-gray-700 leading-relaxed">
              The app is now configured with Next.js App Router, Tailwind CSS, and TypeScript. You can now develop your features.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

