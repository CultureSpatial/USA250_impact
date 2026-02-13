import { Component } from '@/lib/components-registry'

interface ComponentCardProps {
  component: Component
  onSelect?: (component: Component) => void
}

export function ComponentCard({ component, onSelect }: ComponentCardProps) {
  const statusColors: Record<string, string> = {
    active: 'bg-earth-primary/10 text-earth-primary',
    draft: 'bg-earth-secondary/10 text-earth-secondary',
    inactive: 'bg-earth-slate/10 text-earth-slate',
    deprecated: 'bg-red-100 text-red-700',
  }

  return (
    <div
      onClick={() => onSelect?.(component)}
      className="neo-card cursor-pointer group hover:shadow-neo-large transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold earth-text-primary group-hover:text-earth-secondary">
          {component.name}
        </h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[component.status]}`}>
          {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
        </span>
      </div>

      <p className="text-earth-slate text-sm mb-4">
        {component.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {component.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs bg-earth-light rounded text-earth-dark">
            {tag}
          </span>
        ))}
        {component.tags.length > 3 && (
          <span className="px-2 py-1 text-xs text-earth-slate">
            +{component.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-earth-slate">
        <span>v{component.version}</span>
        <span>{component.usage} uses</span>
        <span>{new Date(component.lastUpdated).toLocaleDateString()}</span>
      </div>
    </div>
  )
}
