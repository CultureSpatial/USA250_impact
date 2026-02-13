'use client'

import { ContentItem } from '@/lib/content.registry'

interface ContentPreviewModalProps {
  isOpen: boolean
  content: ContentItem | null
  onClose: () => void
  onEdit?: (content: ContentItem) => void
}

export function ContentPreviewModal({ isOpen, content, onClose, onEdit }: ContentPreviewModalProps) {
  if (!isOpen || !content) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-neo max-w-2xl w-full max-h-[90vh] overflow-y-auto neo-card">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold earth-text-primary">{content.title}</h2>
          <button
            onClick={onClose}
            className="text-earth-slate hover:text-earth-dark text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="earth-text-primary font-semibold mb-2">Description</h3>
            <p className="text-earth-slate">{content.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="earth-text-primary font-semibold mb-2">Type</h3>
              <p className="text-earth-slate capitalize">{content.type}</p>
            </div>
            <div>
              <h3 className="earth-text-primary font-semibold mb-2">Status</h3>
              <p className="text-earth-slate capitalize">{content.status}</p>
            </div>
          </div>

          {content.tags && content.tags.length > 0 && (
            <div>
              <h3 className="earth-text-primary font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-earth-light rounded text-earth-dark text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {content.author && (
            <div>
              <h3 className="earth-text-primary font-semibold mb-2">Author</h3>
              <p className="text-earth-slate">{content.author.name}</p>
            </div>
          )}

          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="neo-button flex-1"
            >
              Close
            </button>
            <button
              onClick={() => onEdit?.(content)}
              className="neo-button-primary flex-1"
            >
              Edit in Sanity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
