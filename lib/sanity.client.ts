import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

export async function fetchSanityData<T>(query: string): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query)
    return data
  } catch (error) {
    console.error('[Sanity] Fetch error:', error)
    throw error
  }
}

export async function fetchSanityDataWithParams<T>(
  query: string,
  params: Record<string, unknown>
): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params)
    return data
  } catch (error) {
    console.error('[Sanity] Fetch error with params:', error)
    throw error
  }
}
