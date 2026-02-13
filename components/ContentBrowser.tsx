'use client'

import { useState, useMemo } from 'react'
import { ContentItem, MOCK_CONTENT } from '@/lib/content.registry'
import { ContentCard } from './ContentCard'
import { ContentFilterBar } from './ContentFilterBar'
import { ContentPreviewModal } from './ContentPreviewModal'

interface ContentBrowserProps {
  activeTab: string
}

export function ContentBrowser({ activeTab }: ContentBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Filter content based on active tab
  const contentByTab = useMemo(() => {
    switch (activeTab) {
      case 'pages':
        return MOCK_CONTENT.filter((item) => item.type === 'page')
      case 'components':
        return MOCK_CONTENT.filter((item) => item.type === 'component')
      case 'published':
        return MOCK_CONTENT.filter((item) => item.status === 'published')
      case 'drafts':
        return MOCK_CONTENT.filter((item) => item.status === 'draft')
      default:
        return MOCK_CONTENT
    }
  }, [activeTab])

  // Filter content based on search, status, and tags
  const filteredContent = useMemo(() => {
    return contentByTab.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

      return matchesSearch && matchesStatus && matchesTags
    })
  }, [contentByTab, searchQuery, selectedStatus, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <>
      <ContentFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        resultCount={filteredContent.length}
      />

      <div className="p-8 bg-gray-50 min-h-[60vh]">
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-earth-slate text-lg mb-2">No content found</p>
            <p className="text-earth-slate/70 text-sm">
              Try adjusting your search filters or create new content
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onPreview={(content) => {
                  setSelectedContent(content)
                  setPreviewOpen(true)
                }}
                onEdit={(content) => {
                  console.log('Edit content:', content)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <ContentPreviewModal
        isOpen={previewOpen}
        content={selectedContent}
        onClose={() => setPreviewOpen(false)}
        onEdit={(content) => {
          console.log('Edit in Sanity:', content)
          setPreviewOpen(false)
        }}
      />
    </>
  )
}
