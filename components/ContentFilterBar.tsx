'use client'

interface ContentFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  resultCount: number
}

export function ContentFilterBar({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedTags,
  onTagToggle,
  resultCount,
}: ContentFilterBarProps) {
  const statusOptions = ['all', 'draft', 'published', 'archived']
  const tagOptions = ['hero', 'form', 'navigation', 'card', 'modal', 'interactive', 'accessible', 'responsive']

  return (
    <div className="bg-white border-b border-gray-200 p-8 space-y-4">
      <div className="flex gap-4">
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search content by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 neo-surface px-4 py-3 rounded-neo text-earth-dark placeholder-earth-slate/50 focus:outline-none focus:shadow-neo-large transition"
        />
        <select
          suppressHydrationWarning
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="neo-surface px-4 py-3 rounded-neo text-earth-dark focus:outline-none focus:shadow-neo-large transition"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-sm earth-text-primary font-semibold">Filter by tags:</p>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <button
              suppressHydrationWarning
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                selectedTags.includes(tag)
                  ? 'bg-earth-primary text-white'
                  : 'bg-gray-100 text-earth-dark hover:bg-earth-primary/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-earth-slate">
        Showing {resultCount} item{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
