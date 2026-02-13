export interface Component {
  id: string
  name: string
  description: string
  category: 'UI' | 'Layout' | 'Content' | 'Schema' | 'Utility'
  status: 'active' | 'inactive' | 'draft' | 'deprecated'
  tags: string[]
  version: string
  author: string
  usage: number
  lastUpdated: string
  preview?: string
}

export const COMPONENTS_REGISTRY: Component[] = [
  {
    id: 'neo-button',
    name: 'Neomorphic Button',
    description: 'Soft shadow button with Earth Motif colors',
    category: 'UI',
    status: 'active',
    tags: ['button', 'interactive', 'neomorphic'],
    version: '1.0.0',
    author: 'Studio Soundwave',
    usage: 234,
    lastUpdated: '2026-02-13',
  },
  {
    id: 'neo-card',
    name: 'Neomorphic Card',
    description: 'Soft UI card component with inset shadows',
    category: 'UI',
    status: 'active',
    tags: ['card', 'container', 'neomorphic'],
    version: '1.0.0',
    author: 'Studio Soundwave',
    usage: 512,
    lastUpdated: '2026-02-12',
  },
  {
    id: 'place-packet-schema',
    name: 'Place Packet Schema',
    description: 'Core Sanity schema for location-based content packages',
    category: 'Schema',
    status: 'active',
    tags: ['sanity', 'schema', 'location', 'content'],
    version: '2.0.0',
    author: 'Studio Soundwave',
    usage: 45,
    lastUpdated: '2026-02-13',
  },
  {
    id: 'stop-schema',
    name: 'Stop Schema',
    description: 'Detailed waypoint definition within Place Packets',
    category: 'Schema',
    status: 'active',
    tags: ['sanity', 'schema', 'waypoint'],
    version: '1.5.0',
    author: 'Studio Soundwave',
    usage: 34,
    lastUpdated: '2026-02-11',
  },
  {
    id: 'narrative-layer-schema',
    name: 'Narrative Layer Schema',
    description: 'Thematic content overlay system',
    category: 'Schema',
    status: 'active',
    tags: ['sanity', 'schema', 'narrative', 'theming'],
    version: '1.2.0',
    author: 'Studio Soundwave',
    usage: 28,
    lastUpdated: '2026-02-10',
  },
  {
    id: 'cip-overlay-schema',
    name: 'CIP Overlay Schema',
    description: 'Compliance integration point for external systems',
    category: 'Schema',
    status: 'draft',
    tags: ['sanity', 'schema', 'compliance', 'integration'],
    version: '0.9.0',
    author: 'Studio Soundwave',
    usage: 12,
    lastUpdated: '2026-02-08',
  },
  {
    id: 'filter-sidebar',
    name: 'Filter Sidebar',
    description: 'Categorized filtering interface for component discovery',
    category: 'Layout',
    status: 'active',
    tags: ['sidebar', 'filter', 'navigation'],
    version: '1.0.0',
    author: 'Studio Soundwave',
    usage: 156,
    lastUpdated: '2026-02-13',
  },
  {
    id: 'search-bar',
    name: 'Search Component',
    description: 'Unified search with real-time filtering',
    category: 'UI',
    status: 'active',
    tags: ['search', 'input', 'interactive'],
    version: '1.1.0',
    author: 'Studio Soundwave',
    usage: 289,
    lastUpdated: '2026-02-09',
  },
  {
    id: 'status-badge',
    name: 'Status Badge',
    description: 'Visual indicator for component lifecycle status',
    category: 'UI',
    status: 'active',
    tags: ['badge', 'status', 'indicator'],
    version: '1.0.0',
    author: 'Studio Soundwave',
    usage: 401,
    lastUpdated: '2026-02-12',
  },
  {
    id: 'magnet-template-schema',
    name: 'Magnet Template Schema',
    description: 'Template system for auto-generating engagement content',
    category: 'Schema',
    status: 'active',
    tags: ['sanity', 'schema', 'template', 'magnet'],
    version: '1.3.0',
    author: 'Studio Soundwave',
    usage: 67,
    lastUpdated: '2026-02-11',
  },
]

export const CATEGORIES = ['All', 'UI', 'Layout', 'Content', 'Schema', 'Utility']
export const STATUSES = ['All', 'active', 'draft', 'inactive', 'deprecated']
export const TAGS = [
  'button',
  'card',
  'schema',
  'sanity',
  'neomorphic',
  'interactive',
  'filter',
  'search',
  'navigation',
  'layout',
  'utility',
]
