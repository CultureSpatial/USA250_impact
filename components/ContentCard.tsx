'use client'

import { ContentItem } from '@/lib/content.registry'

interface ContentCardProps {
  content: ContentItem
  onPreview?: (content: ContentItem) => void
  onEdit?: (content: ContentItem) => void
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${month}/${day}/${year}`
}

export function ContentCard({ content, onPreview, onEdit }: ContentCardProps) {
  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  }

  const typeIcons: Record<string, string> = {
    page: '📄',
    component: '🧩',
  }

  return (
    <div className="neo-card hover:shadow-neo-large transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[content.type]}</span>
          <div>
            <h3 className="text-lg font-semibold earth-text-primary">
              {content.title}
            </h3>
            <p className="text-sm text-earth-slate">{content.slug}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[content.status]}`}>
          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
        </span>
      </div>

      <p className="text-earth-slate text-sm mb-4 line-clamp-2">
        {content.description}
      </p>

      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {content.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-earth-light rounded text-earth-dark">
              {tag}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-earth-slate">
              +{content.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-xs text-earth-slate space-y-1">
          <p>Updated: {formatDate(content.updatedAt)}</p>
          {content.author && <p>By: {content.author.name}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPreview?.(content)}
            className="px-3 py-1 text-sm bg-earth-light text-earth-primary rounded hover:bg-earth-primary hover:text-white transition"
          >
            Preview
          </button>
          <button
            onClick={() => onEdit?.(content)}
            className="px-3 py-1 text-sm bg-earth-primary text-white rounded hover:bg-earth-secondary transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
