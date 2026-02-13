export interface ContentItem {
  id: string
  type: 'page' | 'component'
  title: string
  slug: string
  description: string
  status: 'draft' | 'published' | 'archived'
  publishedAt: string
  updatedAt: string
  tags: string[]
  author?: { name: string; email?: string }
  category?: string
  featured?: boolean
}

export const PAGE_TYPES = ['Landing Page', 'Blog Post', 'Documentation', 'Product', 'About']
export const COMPONENT_TYPES = ['UI Component', 'Layout', 'Module', 'Feature']
export const STATUSES = ['all', 'draft', 'published', 'archived']
export const COMMON_TAGS = [
  'hero',
  'form',
  'navigation',
  'card',
  'modal',
  'interactive',
  'accessible',
  'responsive',
  'sanity',
]

// Mock content data for development
export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    type: 'page',
    title: 'Homepage',
    slug: 'home',
    description: 'Main landing page for Stadium Soundwave',
    status: 'published',
    publishedAt: '2026-02-01',
    updatedAt: '2026-02-10',
    tags: ['hero', 'interactive'],
    author: { name: 'Jane Doe' },
    featured: true,
  },
  {
    id: '2',
    type: 'component',
    title: 'Hero Section',
    slug: 'hero-section',
    description: 'Responsive hero section with gradient background',
    status: 'published',
    publishedAt: '2026-01-25',
    updatedAt: '2026-02-08',
    tags: ['hero', 'responsive'],
    author: { name: 'John Smith' },
    category: 'UI Component',
  },
  {
    id: '3',
    type: 'component',
    title: 'Navigation Bar',
    slug: 'nav-bar',
    description: 'Sticky navigation with dropdown menus',
    status: 'draft',
    publishedAt: '2026-02-12',
    updatedAt: '2026-02-12',
    tags: ['navigation', 'accessible'],
    author: { name: 'Alice Johnson' },
    category: 'UI Component',
  },
  {
    id: '4',
    type: 'page',
    title: 'Content Strategy',
    slug: 'content-strategy',
    description: 'Documentation for content management workflow',
    status: 'published',
    publishedAt: '2026-02-03',
    updatedAt: '2026-02-11',
    tags: ['documentation'],
    author: { name: 'Bob Wilson' },
  },
  {
    id: '5',
    type: 'component',
    title: 'Contact Form',
    slug: 'contact-form',
    description: 'Reusable contact form with validation',
    status: 'published',
    publishedAt: '2026-01-15',
    updatedAt: '2026-02-09',
    tags: ['form', 'interactive'],
    author: { name: 'Sarah Lee' },
    category: 'UI Component',
  },
]
