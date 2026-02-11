import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './sanity.config'
import type { SanityImage } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Create image URL builder on-demand
 * This allows the function to work even if Sanity isn't configured
 */
function getImageBuilder() {
  if (!sanityConfig.isConfigured || !sanityConfig.projectId) {
    return null
  }
  
  return imageUrlBuilder({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  })
}

export function urlFor(source: SanityImage | undefined): string {
  if (!source) return ''
  
  const builder = getImageBuilder()
  if (!builder) {
    console.warn('[Sanity] Image URL builder not available - Sanity not configured')
    return ''
  }
  
  try {
    return builder.image(source).auto('format').fit('max').url()
  } catch (error) {
    console.error('[Sanity] Failed to generate image URL:', error)
    return ''
  }
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    console.error('[Sanity] Failed to format date:', error)
    return date
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

