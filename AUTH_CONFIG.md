# Authentication Configuration Guide

## Overview

This guide explains how to configure environment-aware authentication URLs for localhost development and production environments. The authentication module automatically detects your environment and generates the correct login/signup URLs.

## Quick Start

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Configure Authentication Variables

```env
# Base URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_URL=https://yourdomain.com
NEXT_PUBLIC_DEV_HOST=localhost

# Authentication paths
NEXT_PUBLIC_LOGIN_PATH=/auth/login
NEXT_PUBLIC_SIGNUP_PATH=/auth/signup
NEXT_PUBLIC_LOGIN_REDIRECT_TO=/dashboard
NEXT_PUBLIC_SIGNUP_REDIRECT_TO=/onboarding

# Port (defaults to 3000)
PORT=3000
```

### 3. Start Development Server

```bash
pnpm dev
```

The login URL will be automatically logged to the console:

```
[Auth] Configuration initialized:
  Base URL: http://localhost:3000
  Login URL: http://localhost:3000/auth/login
  Signup URL: http://localhost:3000/auth/signup
  Environment: development
  Debug Info: Environment: development | Localhost: true | Port: 3000 | Auth Provider: custom | Host: localhost
```

## Environment Detection

The authentication module automatically detects your environment based on these variables:

### Development (Localhost)

- **Condition**: `NODE_ENV === 'development'` AND no Vercel environment
- **Base URL**: `http://localhost:{PORT}`
- **Port**: Detected from `PORT` env var (default: 3000)
- **Host**: Configurable via `NEXT_PUBLIC_DEV_HOST` (default: localhost)

**Example**:
```
Login URL: http://localhost:3000/auth/login
```

### Preview (Vercel)

- **Condition**: `VERCEL_ENV === 'preview'`
- **Base URL**: `https://{VERCEL_URL}`
- **Automatically generated**: Uses Vercel's preview URL

**Example**:
```
Login URL: https://my-app-preview.vercel.app/auth/login
```

### Production

- **Condition**: `VERCEL_ENV === 'production'`
- **Base URL**: `NEXT_PUBLIC_PRODUCTION_URL` or `https://yourdomain.com`
- **Must be set**: Explicitly configure for production

**Example**:
```
Login URL: https://yourdomain.com/auth/login
```

## Configuration Variables

### Required Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Base URL for development |
| `NEXT_PUBLIC_LOGIN_PATH` | `/auth/login` | Login page path |
| `NEXT_PUBLIC_SIGNUP_PATH` | `/auth/signup` | Signup page path |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_PRODUCTION_URL` | `https://yourdomain.com` | Production domain |
| `NEXT_PUBLIC_DEV_HOST` | `localhost` | Development host |
| `NEXT_PUBLIC_LOGIN_REDIRECT_TO` | Not set | Redirect after login |
| `NEXT_PUBLIC_SIGNUP_REDIRECT_TO` | Not set | Redirect after signup |
| `NEXT_PUBLIC_AUTH_PROVIDER` | `custom` | Auth provider type |
| `PORT` | `3000` | Development port |

## Usage in Code

### Import Authentication Config

```typescript
import { authConfig, getAuthUrls, logAuthConfiguration } from '@/lib/auth.config'

// Log configuration (development only)
logAuthConfiguration()

// Get URLs
const { login, signup, baseUrl } = getAuthUrls()

console.log(`Login: ${login}`)
console.log(`Signup: ${signup}`)
```

### Use in Components

```tsx
'use client'

import { getAuthUrls } from '@/lib/auth.config'
import Link from 'next/link'

export function LoginButton() {
  const { login } = getAuthUrls()
  
  return (
    <Link href={login} className="btn btn-primary">
      Sign In
    </Link>
  )
}
```

### Server-Side Usage

```typescript
// app/middleware.ts or API routes
import { authConfig } from '@/lib/auth.config'

export function middleware(request: NextRequest) {
  // Use authConfig.loginUrl in server-side logic
  if (needsAuth) {
    return NextResponse.redirect(authConfig.loginUrl)
  }
}
```

## Debugging Login URL

### View Current Configuration

Add this to your page or component:

```tsx
import { authConfig, getAuthEnvironmentInfo } from '@/lib/auth.config'

export default function DebugPage() {
  return (
    <div>
      <h1>Authentication Debug Info</h1>
      <pre>{JSON.stringify(authConfig, null, 2)}</pre>
      <p>{getAuthEnvironmentInfo()}</p>
    </div>
  )
}
```

### Console Logging

The module logs to console in development. Check your terminal:

```
[Auth] Configuration initialized:
  Base URL: http://localhost:3000
  Login URL: http://localhost:3000/auth/login
  Signup URL: http://localhost:3000/auth/signup
  Environment: development
  Debug Info: Environment: development | Localhost: true | Port: 3000 | Auth Provider: custom | Host: localhost
```

### Network Tab

Once login URL is available, you can test it:

```bash
# Test localhost login URL
curl http://localhost:3000/auth/login

# Or visit in browser
http://localhost:3000/auth/login
```

## Environment Setup Examples

### Local Development

**.env.local**:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
PORT=3000
NEXT_PUBLIC_LOGIN_PATH=/auth/login
NEXT_PUBLIC_SIGNUP_PATH=/auth/signup
NEXT_PUBLIC_LOGIN_REDIRECT_TO=/dashboard
NEXT_PUBLIC_SIGNUP_REDIRECT_TO=/onboarding
```

**Login URL**: `http://localhost:3000/auth/login`

### Custom Port

**.env.local**:
```env
PORT=4000
NEXT_PUBLIC_BASE_URL=http://localhost:4000
```

**Login URL**: `http://localhost:4000/auth/login`

### Custom Host

**.env.local**:
```env
NEXT_PUBLIC_DEV_HOST=dev.local
NEXT_PUBLIC_BASE_URL=http://dev.local:3000
```

**Login URL**: `http://dev.local:3000/auth/login`

### Production Setup

**.env.production**:
```env
NEXT_PUBLIC_PRODUCTION_URL=https://myapp.com
NEXT_PUBLIC_LOGIN_PATH=/auth/login
```

**Login URL**: `https://myapp.com/auth/login`

## Integration with Vercel

### Vercel Preview Deployments

Preview URLs are automatically detected from `VERCEL_URL`:

```
Preview URL: https://my-app-git-feature.vercel.app/auth/login
```

No configuration needed for preview!

### Vercel Production

Set in Vercel Dashboard:

**Settings → Environment Variables**

```
NEXT_PUBLIC_PRODUCTION_URL=https://yourdomain.com
```

Or use Vercel's project production domain automatically.

## Troubleshooting

### Login URL Not Logging

**Problem**: No log output in console

**Solution**:
1. Ensure `NODE_ENV=development`
2. Check that you called `logAuthConfiguration()` in your app initialization
3. Verify console is not filtered in browser DevTools

### Incorrect Port Detected

**Problem**: Login URL shows wrong port

**Solution**:
1. Set explicit `PORT` in `.env.local`: `PORT=3001`
2. Check `pnpm dev` output for actual port being used
3. Restart dev server after changing `PORT`

### Production URL Not Working

**Problem**: Production login URL is incorrect

**Solution**:
1. Set `NEXT_PUBLIC_PRODUCTION_URL` in Vercel dashboard
2. Verify domain has correct HTTPS certificate
3. Check for trailing slashes: use `https://yourdomain.com` not `https://yourdomain.com/`

### "Localhost" in Production

**Problem**: Production showing `http://localhost:3000`

**Solution**:
1. Ensure `VERCEL_ENV=production` is set
2. Set `NEXT_PUBLIC_PRODUCTION_URL` explicitly
3. Check no `.env.local` files are being used in production

## Advanced Usage

### Custom Auth Providers

Extend `getAuthProvider()` to support multiple providers:

```typescript
function getAuthProvider(): string {
  const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'custom'
  
  // Map to provider-specific URLs
  if (provider === 'github') {
    return generateGitHubLoginUrl()
  }
  if (provider === 'google') {
    return generateGoogleLoginUrl()
  }
  
  return generateCustomLoginUrl()
}
```

### Dynamic Redirect URLs

Use query parameters for dynamic redirects:

```typescript
export function getLoginUrlWithRedirect(redirectTo: string): string {
  const baseUrl = authConfig.loginUrl
  return `${baseUrl}?redirectTo=${encodeURIComponent(redirectTo)}`
}
```

### Programmatic URL Generation

```typescript
import { getAuthUrls } from '@/lib/auth.config'

async function redirectToLogin() {
  const { login } = getAuthUrls()
  window.location.href = login
}
```

## Testing

### Unit Tests

```typescript
import { getBaseUrl, isLocalhostEnvironment } from '@/lib/auth.config'

describe('Auth Config', () => {
  it('should detect localhost', () => {
    process.env.NODE_ENV = 'development'
    expect(isLocalhostEnvironment()).toBe(true)
  })

  it('should generate correct base URL', () => {
    const url = getBaseUrl()
    expect(url).toContain('localhost')
  })
})
```

## Best Practices

1. **Never hardcode URLs**: Always use `authConfig` or `getAuthUrls()`
2. **Use NEXT_PUBLIC_ prefix**: For client-side accessible URLs
3. **Set production URL explicitly**: Don't rely on defaults in production
4. **Test before deploying**: Verify login URL in staging environment
5. **Log in development**: Use `logAuthConfiguration()` to verify setup
6. **Document custom paths**: If using non-standard auth routes, document in README

## See Also

- [ENV_CONFIG.md](./ENV_CONFIG.md) - Environment variable setup
- [SETUP.md](./SETUP.md) - Overall project setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment strategies
