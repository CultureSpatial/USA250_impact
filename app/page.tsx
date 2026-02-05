'use client'

import { useState, useEffect } from 'react'
import { fetchSanityData } from '@/lib/sanity.client'
import { BLOG_POSTS_QUERY, PRODUCTS_QUERY } from '@/lib/sanity.queries'
import type { BlogPost, Product } from '@/lib/types'
import { urlFor, formatDate } from '@/lib/utils'

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true)
        const [posts, prods] = await Promise.all([
          fetchSanityData<BlogPost[]>(BLOG_POSTS_QUERY),
          fetchSanityData<Product[]>(PRODUCTS_QUERY),
        ])
        setBlogPosts(posts || [])
        setProducts(prods || [])
      } catch (err) {
        console.error('[v0] Content load error:', err)
        setError('Failed to load content. Check your Sanity configuration.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Next.js + Sanity CMS
          </h1>
          <p className="text-lg text-slate-600">
            Microfrontend Architecture with Content Management
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading content...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Blog Posts Section */}
            {blogPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Blog Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                      {post.image && (
                        <img
                          src={urlFor(post.image)}
                          alt={post.image.alt || post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            {post.author?.name}
                          </span>
                          <span className="text-slate-400">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Products Section */}
            {products.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                      {product.image && (
                        <img
                          src={urlFor(product.image)}
                          alt={product.image.alt || product.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              product.inStock
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {blogPosts.length === 0 && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 mb-4">
                  No content available yet.
                </p>
                <p className="text-slate-500">
                  Add blog posts or products in your Sanity Studio to see them here.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

