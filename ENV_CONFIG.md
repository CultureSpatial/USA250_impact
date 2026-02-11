# Environment Configuration Guide

## Overview

This project uses environment variables to configure Sanity CMS integration and deployment options. The configuration system is designed to work gracefully in development, preview, and production environments.

## Environment Variables

### Required for Sanity CMS Integration

```bash
# Your Sanity project ID (required to fetch content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id

# Sanity dataset name (defaults to 'production')
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity authentication token (required for server-side operations)
SANITY_API_TOKEN=your_sanity_api_token
```

**Note:** `NEXT_PUBLIC_*` variables are exposed to the browser. `SANITY_API_TOKEN` is server-only and never exposed to the client.

### Optional Configuration

```bash
# Deployment - Vercel (optional)
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_TOKEN=your_vercel_token

# Deployment - Airops (optional)
AIROPS_API_KEY=your_airops_api_key
AIROPS_ORG_ID=your_airops_org_id

# Microfrontend URLs (Development)
NEXT_PUBLIC_SHELL_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTS_MFE_URL=http://localhost:3001
NEXT_PUBLIC_BLOG_MFE_URL=http://localhost:3002
NEXT_PUBLIC_ADMIN_MFE_URL=http://localhost:3003

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_PRODUCTS=true
NEXT_PUBLIC_ENABLE_ADMIN=false
```

## Setup Instructions

### Development Environment

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in required variables:**
   - Get `NEXT_PUBLIC_SANITY_PROJECT_ID` from your Sanity project dashboard
   - Get `SANITY_API_TOKEN` from Sanity API tokens page

3. **Start development server:**
   ```bash
   pnpm dev
   ```

The app will work without Sanity configured, but display a helpful warning banner.

### Production Environment

Set these variables in your deployment platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` (public)
3. Add `SANITY_API_TOKEN` (secret)
4. Redeploy

**Airops:**
1. Configure through Airops dashboard
2. Map environment variables to your service
3. Deploy orchestrated services

**Environment detection:**
```
VERCEL_ENV=production  → Production environment
VERCEL_ENV=preview     → Preview deployment
else                   → Development environment
```

## Configuration Behavior

### Sanity Integration Status

The application automatically detects Sanity configuration:

| Scenario | Behavior |
|----------|----------|
| **Development + No Sanity vars** | App runs normally, displays config warning |
| **Development + Sanity vars set** | Fetches from Sanity, uses cache bypass |
| **Production + No Sanity vars** | Logs critical error, CMS disabled |
| **Production + Sanity vars set** | Fetches from Sanity, uses CDN cache |
| **Preview + Sanity vars set** | Fetches from Sanity, cache bypass for fresh content |

### API Version & CDN Usage

```typescript
// Configuration auto-detection:
- API Version: '2024-01-01' (latest stable)
- Development: CDN disabled (fresh data)
- Production/Preview: CDN enabled (cached data)
- Server token: Only used in Next.js API routes
```

## Debugging Configuration

### Check current configuration:

```javascript
import { getSanityStatus } from '@/lib/sanity.client'

const status = getSanityStatus()
console.log(status)
// Output:
// {
//   configured: true,
//   environment: 'production',
//   info: '[Sanity] Environment: production, Configured: true, CDN: true, Dataset: production'
// }
```

### Console logs generated:

**Configuration validation (on app startup):**
```
[Sanity] CRITICAL: NEXT_PUBLIC_SANITY_PROJECT_ID is required in production. Content fetching will be disabled.
```

**During data fetching:**
```
[Sanity] Fetching data... { environment: 'production' }
[Sanity] Data fetched successfully
```

**On errors:**
```
[Sanity] Fetch failed: { error: '...', environment: 'production', query: '...' }
```

## Best Practices

### 1. Use `.env.local` for local development
```bash
# .env.local (git-ignored)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
SANITY_API_TOKEN=xyz789
```

### 2. Never commit `.env.local` or tokens
```bash
# .gitignore already includes:
.env.local
.env.*.local
```

### 3. Security considerations

| Variable | Visibility | Usage |
|----------|-----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Browser | Client-side queries |
| `SANITY_API_TOKEN` | Server only | Server-side operations |
| `VERCEL_TOKEN` | Deployment | CI/CD pipeline |

### 4. Validate in production

Always verify variables are set before deploying:

```bash
# Vercel
vercel env list

# Check critical vars
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_TOKEN  # Should output (secret)
```

## Troubleshooting

### "NEXT_PUBLIC_SANITY_PROJECT_ID is required"

**Solution:** Set the environment variable:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
```

### Content not loading in production

**Checklist:**
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set in production
- [ ] `SANITY_API_TOKEN` set if using authenticated queries
- [ ] Verify dataset name is correct
- [ ] Check Sanity CORS configuration

### Different data in production vs development

**Expected behavior:** Production uses CDN cache for performance. To force fresh data, temporarily set `VERCEL_ENV=preview`.

### Environment variables not picked up

1. Rebuild after changing `.env.local`
2. Restart dev server: `pnpm dev`
3. In production, redeploy after updating environment variables

## Migration Guide

### From hardcoded configuration to environment variables

**Before (hardcoded):**
```typescript
const sanityClient = createClient({
  projectId: 'abc123',
  dataset: 'production',
})
```

**After (environment-based):**
```typescript
// No changes needed - configuration is automatic
import { fetchSanityData } from '@/lib/sanity.client'
const data = await fetchSanityData(query)
```

The client configuration system handles all environment detection automatically.

## Related Files

- `lib/sanity.config.ts` - Configuration validation and environment detection
- `lib/sanity.client.ts` - Client initialization and data fetching
- `.env.example` - Template of required variables
- `.gitignore` - Excludes local environment files
