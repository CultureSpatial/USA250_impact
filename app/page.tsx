'use client'

import { useState } from 'react'
import { CMSHeader } from '@/components/CMSHeader'
import { CMSNavigation } from '@/components/CMSNavigation'
import { ContentBrowser } from '@/components/ContentBrowser'

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <main className="min-h-screen bg-gray-50">
      <CMSHeader />
      <CMSNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <ContentBrowser activeTab={activeTab} />
    </main>
  )
}
