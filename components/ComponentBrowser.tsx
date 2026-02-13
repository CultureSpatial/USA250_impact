'use client'

import { useState, useMemo } from 'react'
import { Component, COMPONENTS_REGISTRY } from '@/lib/components-registry'
import { ComponentCard } from './ComponentCard'
import { FilterSidebar } from './FilterSidebar'
import { SearchBar } from './SearchBar'

export function ComponentBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'updated'>('name')

  const filteredComponents = useMemo(() => {
    let results = COMPONENTS_REGISTRY

    if (selectedCategory !== 'All') {
      results = results.filter((c) => c.category === selectedCategory)
    }

    if (selectedStatus !== 'All') {
      results = results.filter((c) => c.status === selectedStatus)
    }

    if (selectedTags.length > 0) {
      results = results.filter((c) =>
        selectedTags.some((tag) => c.tags.includes(tag))
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    results.sort((a, b) => {
      switch (sortBy) {
        case 'usage':
          return b.usage - a.usage
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return results
  }, [selectedCategory, selectedStatus, selectedTags, searchQuery, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedTags={selectedTags}
        onTagToggle={toggleTag}
      />

      <div className="flex-1">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredComponents.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-earth-slate text-lg">No components found</p>
              <p className="text-earth-slate/60 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
