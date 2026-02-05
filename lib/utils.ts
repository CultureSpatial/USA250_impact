import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'
import type { SanityImage } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage | undefined) {
  if (!source) return ''
  return builder.image(source).auto('format').fit('max').url()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

