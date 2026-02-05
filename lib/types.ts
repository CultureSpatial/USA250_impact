// TypeScript types for Sanity content

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: string
  author: Author
  publishedAt: string
  image?: SanityImage
  tags: string[]
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  description: string
  category: string
  specifications?: string
  image?: SanityImage
  inStock: boolean
}

export interface Author {
  _id: string
  name: string
  email: string
  bio?: string
}

export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface Settings {
  siteName: string
  description: string
  logo?: SanityImage
  socialLinks?: Record<string, string>
  contactEmail: string
}
