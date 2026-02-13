'use client'

import { CATEGORIES, STATUSES, TAGS } from '@/lib/components-registry'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedTags,
  onTagToggle,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 space-y-6">
      <div>
        <h3 className="earth-text-primary font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              suppressHydrationWarning
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-md transition ${
                selectedCategory === cat
                  ? 'bg-earth-primary text-white'
                  : 'hover:bg-earth-light text-earth-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="earth-text-primary font-semibold mb-3">Status</h3>
        <div className="space-y-2">
          {STATUSES.map((status) => (
            <button
              suppressHydrationWarning
              key={status}
              onClick={() => onStatusChange(status)}
              className={`w-full text-left px-3 py-2 rounded-md transition ${
                selectedStatus === status
                  ? 'bg-earth-secondary text-white'
                  : 'hover:bg-earth-light text-earth-dark'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="earth-text-primary font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              suppressHydrationWarning
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                selectedTags.includes(tag)
                  ? 'bg-earth-primary text-white'
                  : 'bg-earth-light text-earth-dark hover:bg-earth-primary/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
