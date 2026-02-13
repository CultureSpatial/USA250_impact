'use client'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  sortBy: 'name' | 'usage' | 'updated'
  onSortChange: (sort: 'name' | 'usage' | 'updated') => void
  resultCount: number
}

export function SearchBar({
  value,
  onChange,
  sortBy,
  onSortChange,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search components..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 neo-surface px-4 py-3 rounded-neo text-earth-dark placeholder-earth-slate/50 focus:outline-none focus:shadow-neo-large transition"
        />
        <select
          suppressHydrationWarning
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'name' | 'usage' | 'updated')}
          className="neo-surface px-4 py-3 rounded-neo text-earth-dark focus:outline-none focus:shadow-neo-large transition"
        >
          <option value="name">Sort by Name</option>
          <option value="usage">Sort by Usage</option>
          <option value="updated">Sort by Updated</option>
        </select>
      </div>

      <div className="text-sm text-earth-slate">
        Showing {resultCount} component{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
