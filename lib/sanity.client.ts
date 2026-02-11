import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Check if Sanity is configured
const isSanityConfigured = !!projectId

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    })
  : null

export async function fetchSanityData<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured) {
    console.warn('[Sanity] Not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.')
    return null
  }

  try {
    if (!sanityClient) return null
    const data = await sanityClient.fetch<T>(query)
    return data
  } catch (error) {
    console.error('[Sanity] Fetch error:', error)
    return null
  }
}

export async function fetchSanityDataWithParams<T>(
  query: string,
  params: Record<string, unknown>
): Promise<T | null> {
  if (!isSanityConfigured) {
    console.warn('[Sanity] Not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.')
    return null
  }

  try {
    if (!sanityClient) return null
    const data = await sanityClient.fetch<T>(query, params)
    return data
  } catch (error) {
    console.error('[Sanity] Fetch error with params:', error)
    return null
  }
}

export { isSanityConfigured }

