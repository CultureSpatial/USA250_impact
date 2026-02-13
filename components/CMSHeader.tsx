'use client'

import { useState } from 'react'

export function CMSHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold earth-text-primary">Content Manager</h1>
            <p className="text-earth-slate text-sm mt-1">Manage pages and components for Sanity</p>
          </div>
          <button className="neo-button-primary">
            + New Content
          </button>
        </div>
      </div>
    </header>
  )
}
