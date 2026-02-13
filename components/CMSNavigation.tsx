'use client'

interface CMSNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function CMSNavigation({ activeTab, onTabChange }: CMSNavigationProps) {
  const tabs = [
    { id: 'all', label: 'All Content', icon: '📋' },
    { id: 'pages', label: 'Pages', icon: '📄' },
    { id: 'components', label: 'Components', icon: '🧩' },
    { id: 'published', label: 'Published', icon: '✓' },
    { id: 'drafts', label: 'Drafts', icon: '📝' },
  ]

  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="px-8 flex gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            suppressHydrationWarning
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-earth-primary text-earth-primary'
                : 'border-transparent text-earth-slate hover:text-earth-dark'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
