import { createClient, type SanityClient } from '@sanity/client'
import { sanityConfig, isSanityConfigured, getSanityEnvironmentInfo } from './sanity.config'

/**
 * Sanity Client Instance
 * Only initialized if projectId is available
 */
let sanityClientInstance: SanityClient | null = null

function initializeSanityClient(): SanityClient | null {
  // Return null if Sanity is not configured
  if (!sanityConfig.isConfigured || !sanityConfig.projectId) {
    return null
  }

  try {
    return createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: sanityConfig.useCdn,
      token: sanityConfig.token,
    })
  } catch (error) {
    console.error('[Sanity] Failed to initialize client:', error)
    return null
  }
}

// Initialize client on first access
function getSanityClient(): SanityClient | null {
  if (sanityClientInstance === null && sanityConfig.isConfigured) {
    sanityClientInstance = initializeSanityClient()
  }
  return sanityClientInstance
}

/**
 * Fetch data from Sanity with error handling
 */
export async function fetchSanityData<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured()) {
    console.debug(
      '[Sanity] Skipping fetch - not configured. ' +
      'Set NEXT_PUBLIC_SANITY_PROJECT_ID to enable Sanity integration.'
    )
    return null
  }

  const client = getSanityClient()
  if (!client) {
    console.error('[Sanity] Client initialization failed')
    return null
  }

  try {
    console.debug('[Sanity] Fetching data...', { environment: sanityConfig.environment })
    const data = await client.fetch<T>(query)
    console.debug('[Sanity] Data fetched successfully')
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[Sanity] Fetch failed:', {
      error: errorMessage,
      environment: sanityConfig.environment,
      query: query.substring(0, 100), // Log only first 100 chars of query
    })
    return null
  }
}

/**
 * Fetch data with parameters
 */
export async function fetchSanityDataWithParams<T>(
  query: string,
  params: Record<string, unknown>
): Promise<T | null> {
  if (!isSanityConfigured()) {
    console.debug('[Sanity] Skipping fetch - not configured')
    return null
  }

  const client = getSanityClient()
  if (!client) {
    console.error('[Sanity] Client initialization failed')
    return null
  }

  try {
    console.debug('[Sanity] Fetching data with params...', {
      paramKeys: Object.keys(params),
      environment: sanityConfig.environment,
    })
    const data = await client.fetch<T>(query, params)
    console.debug('[Sanity] Data fetched successfully')
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[Sanity] Fetch with params failed:', {
      error: errorMessage,
      environment: sanityConfig.environment,
    })
    return null
  }
}

/**
 * Batch fetch multiple queries
 */
export async function fetchSanityBatch<T extends Record<string, unknown>>(
  queries: Record<string, string>
): Promise<T | null> {
  if (!isSanityConfigured()) {
    console.debug('[Sanity] Skipping batch fetch - not configured')
    return null
  }

  const client = getSanityClient()
  if (!client) {
    console.error('[Sanity] Client initialization failed')
    return null
  }

  try {
    const queryKeys = Object.keys(queries)
    console.debug('[Sanity] Fetching batch...', {
      queryCount: queryKeys.length,
      environment: sanityConfig.environment,
    })

    const result = await client.fetch<T>(
      `{
        ${queryKeys.map((key) => `${key}: ${queries[key]}`).join(',\n')}
      }`
    )

    console.debug('[Sanity] Batch fetch completed')
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[Sanity] Batch fetch failed:', {
      error: errorMessage,
      environment: sanityConfig.environment,
      queryCount: Object.keys(queries).length,
    })
    return null
  }
}

/**
 * Get Sanity configuration status (for debugging)
 */
export function getSanityStatus(): {
  configured: boolean
  environment: string
  info: string
} {
  return {
    configured: isSanityConfigured(),
    environment: sanityConfig.environment,
    info: getSanityEnvironmentInfo(),
  }
}

/**
 * Export client instance and configuration flag
 */
export { isSanityConfigured }
export { sanityConfig }

