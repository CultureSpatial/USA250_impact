/**
 * Authentication Configuration Module
 * Handles environment-aware login URL generation and logging
 * Supports localhost development and production environments
 */

type Environment = 'development' | 'production' | 'preview'

interface AuthConfig {
  environment: Environment
  baseUrl: string
  loginUrl: string
  isLocalhost: boolean
  port: number | null
  isConfigured: boolean
  debugInfo: string
}

/**
 * Get current environment based on Node.js and Vercel variables
 */
function getEnvironment(): Environment {
  if (process.env.VERCEL_ENV === 'production') return 'production'
  if (process.env.VERCEL_ENV === 'preview') return 'preview'
  return 'development'
}

/**
 * Detect if running on localhost
 */
function isLocalhostEnvironment(): boolean {
  const env = process.env.NODE_ENV
  const vercelEnv = process.env.VERCEL_ENV
  return env === 'development' && !vercelEnv
}

/**
 * Extract port from environment or use default
 */
function getPort(): number {
  if (process.env.PORT) {
    return parseInt(process.env.PORT, 10)
  }
  // Default Next.js dev port
  return 3000
}

/**
 * Get base URL based on environment
 */
function getBaseUrl(): string {
  const env = getEnvironment()
  
  // Production: Use NEXT_PUBLIC_SITE_URL or environment variable
  if (env === 'production') {
    return (
      process.env.NEXT_PUBLIC_PRODUCTION_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://yourdomain.com'
    )
  }

  // Preview: Use Vercel preview URL
  if (env === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development/Localhost
  if (isLocalhostEnvironment()) {
    const port = getPort()
    const host = process.env.NEXT_PUBLIC_DEV_HOST || 'localhost'
    return `http://${host}:${port}`
  }

  // Fallback
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

/**
 * Get authentication provider (can be extended for OAuth, Sanity Auth, etc.)
 */
function getAuthProvider(): string {
  return process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'custom'
}

/**
 * Generate login page URL
 */
function generateLoginUrl(): string {
  const baseUrl = getBaseUrl()
  const loginPath = process.env.NEXT_PUBLIC_LOGIN_PATH || '/auth/login'
  
  // Build full login URL
  const url = new URL(loginPath, baseUrl).toString()
  
  // Add redirect parameter if specified
  const redirectTo = process.env.NEXT_PUBLIC_LOGIN_REDIRECT_TO
  if (redirectTo) {
    return `${url}?redirectTo=${encodeURIComponent(redirectTo)}`
  }

  return url
}

/**
 * Generate signup page URL
 */
function generateSignupUrl(): string {
  const baseUrl = getBaseUrl()
  const signupPath = process.env.NEXT_PUBLIC_SIGNUP_PATH || '/auth/signup'
  
  const url = new URL(signupPath, baseUrl).toString()
  
  const redirectTo = process.env.NEXT_PUBLIC_SIGNUP_REDIRECT_TO
  if (redirectTo) {
    return `${url}?redirectTo=${encodeURIComponent(redirectTo)}`
  }

  return url
}

/**
 * Build debug information string
 */
function buildDebugInfo(): string {
  const env = getEnvironment()
  const isLocal = isLocalhostEnvironment()
  const port = getPort()
  const authProvider = getAuthProvider()
  
  return [
    `Environment: ${env}`,
    `Localhost: ${isLocal}`,
    `Port: ${port}`,
    `Auth Provider: ${authProvider}`,
    `Host: ${process.env.NEXT_PUBLIC_DEV_HOST || 'localhost'}`,
  ].join(' | ')
}

/**
 * Main configuration object
 */
export const authConfig: AuthConfig = {
  environment: getEnvironment(),
  baseUrl: getBaseUrl(),
  loginUrl: generateLoginUrl(),
  isLocalhost: isLocalhostEnvironment(),
  port: isLocalhostEnvironment() ? getPort() : null,
  isConfigured: true,
  debugInfo: buildDebugInfo(),
}

/**
 * Log authentication configuration (development only)
 */
export function logAuthConfiguration(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Auth] Configuration initialized:')
    console.log(`  Base URL: ${authConfig.baseUrl}`)
    console.log(`  Login URL: ${authConfig.loginUrl}`)
    console.log(`  Signup URL: ${generateSignupUrl()}`)
    console.log(`  Environment: ${authConfig.environment}`)
    console.log(`  Debug Info: ${authConfig.debugInfo}`)
  }
}

/**
 * Check if authentication is available
 */
export function isAuthAvailable(): boolean {
  return authConfig.isConfigured
}

/**
 * Get authentication URLs
 */
export function getAuthUrls() {
  return {
    login: authConfig.loginUrl,
    signup: generateSignupUrl(),
    baseUrl: authConfig.baseUrl,
  }
}

/**
 * Get environment information for debugging
 */
export function getAuthEnvironmentInfo(): string {
  return authConfig.debugInfo
}

/**
 * Export all authentication configuration
 */
export { getEnvironment, isLocalhostEnvironment, getPort, getBaseUrl, getAuthProvider }
