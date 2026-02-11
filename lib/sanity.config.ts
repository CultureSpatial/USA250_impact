/**
 * Sanity Environment Configuration
 * Handles environment variable validation and provides fallbacks
 * Works seamlessly in both development and production environments
 */

type Environment = 'development' | 'production' | 'preview'

interface SanityConfig {
  projectId: string | null
  dataset: string
  apiVersion: string
  useCdn: boolean
  token: string | undefined
  isConfigured: boolean
  environment: Environment
}

/**
 * Get current environment
 */
function getEnvironment(): Environment {
  if (process.env.VERCEL_ENV === 'production') return 'production'
  if (process.env.VERCEL_ENV === 'preview') return 'preview'
  return 'development'
}

/**
 * Validate environment variables
 */
function validateEnvironment(): void {
  const env = getEnvironment()
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (env === 'production' && !projectId) {
    console.error(
      '[Sanity] CRITICAL: NEXT_PUBLIC_SANITY_PROJECT_ID is required in production. ' +
      'Content fetching will be disabled.'
    )
  }

  if (!projectId && env !== 'development') {
    console.warn(
      '[Sanity] WARNING: NEXT_PUBLIC_SANITY_PROJECT_ID not configured. ' +
      `Running in ${env} without Sanity CMS integration.`
    )
  }
}

/**
 * Build Sanity configuration object with safe defaults
 */
function buildSanityConfig(): SanityConfig {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  const environment = getEnvironment()
  const isConfigured = !!projectId

  // Use CDN in production/preview, disable in development for fresh data
  const useCdn = environment !== 'development' && isConfigured

  return {
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn,
    token,
    isConfigured,
    environment,
  }
}

// Initialize configuration on module load
validateEnvironment()

export const sanityConfig = buildSanityConfig()

/**
 * Export configuration for debugging/logging
 */
export function getSanityConfig(): Partial<SanityConfig> {
  return {
    isConfigured: sanityConfig.isConfigured,
    environment: sanityConfig.environment,
    dataset: sanityConfig.dataset,
    useCdn: sanityConfig.useCdn,
    // Don't export sensitive data like tokens or projectId
  }
}

/**
 * Check if Sanity is properly configured
 */
export function isSanityConfigured(): boolean {
  return sanityConfig.isConfigured
}

/**
 * Get environment details for logs
 */
export function getSanityEnvironmentInfo(): string {
  const config = getSanityConfig()
  return `[Sanity] Environment: ${config.environment}, Configured: ${config.isConfigured}, CDN: ${config.useCdn}, Dataset: ${config.dataset}`
}
