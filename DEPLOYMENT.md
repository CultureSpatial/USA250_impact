## Deployment & Scaling Guide

### Vercel Deployment Strategy

#### Option 1: Single Domain Deployment (Recommended)
Deploy shell to main Vercel project, MFEs as separate projects behind reverse proxy:
```bash
# Shell (Main)
cd apps/shell && vercel deploy --prod

# MFE 1
cd apps/products-mfe && vercel deploy --prod

# MFE 2
cd apps/blog-mfe && vercel deploy --prod
```

#### Option 2: Airops Multi-Service Orchestration
Use Airops for coordinated multi-service deployments:

1. **Install Airops CLI**
```bash
npm install -g @airops/cli
airops login
```

2. **Configure services**
```yaml
# airops.yaml
services:
  shell:
    build: ./apps/shell
    port: 3000
    environment:
      - PRODUCTS_MFE_URL=services.products.internal
      - BLOG_MFE_URL=services.blog.internal
      
  products-mfe:
    build: ./apps/products-mfe
    port: 3001
    
  blog-mfe:
    build: ./apps/blog-mfe
    port: 3002
    
  sanity-studio:
    build: ./studio
    port: 3000
    publicUrl: /studio
```

3. **Deploy all services**
```bash
airops deploy --config airops.yaml
```

#### Option 3: Vercel Workflows (Cutting Edge)
Use Vercel Workflows for orchestrated deployments:

```javascript
// vercel.json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": {
      "value": "@sanity-project-id"
    },
    "NEXT_PUBLIC_SANITY_DATASET": {
      "value": "production"
    }
  },
  "deploymentIntegrations": {
    "sanity": {
      "enabled": true,
      "webhookPath": "/api/webhooks/sanity"
    }
  }
}
```

### Environment-Specific Configurations

#### Development
```bash
NODE_ENV=development
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_TOKEN=dev_token
```

#### Staging
```bash
NODE_ENV=production
NEXT_PUBLIC_SANITY_DATASET=staging
VERCEL_ENV=preview
```

#### Production
```bash
NODE_ENV=production
NEXT_PUBLIC_SANITY_DATASET=production
VERCEL_ENV=production
ENABLE_MONITORING=true
```

### CI/CD Pipeline Setup

#### GitHub Actions Example
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: pnpm install
        
      - name: Run tests
        run: pnpm test
        
      - name: Build
        run: pnpm build
        
      - name: Deploy to Vercel
        run: vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Performance Optimization

1. **Image Optimization**
   - Use Sanity image pipeline
   - Enable WebP format conversion
   - Implement responsive images

2. **Code Splitting**
   - Dynamic imports for MFE modules
   - Route-based code splitting
   - Component lazy loading

3. **Caching Strategy**
   - Browser cache: 1 year for assets
   - CDN cache: 60 seconds for pages
   - Sanity cache: Invalidate on content changes

### Monitoring & Analytics

1. **Error Tracking**
   - Sentry integration
   - Error boundaries on shell
   - Error logs in MFEs

2. **Performance Metrics**
   - Web Vitals tracking
   - Core Web Vitals monitoring
   - Lighthouse CI

3. **Content Updates**
   - Sanity webhook to trigger revalidation
   - ISR for static content
   - Real-time updates via live queries

### Scaling Considerations

- **Database**: Sanity handles scaling automatically
- **CDN**: Vercel/Cloudflare automatic caching
- **Compute**: Serverless scaling with Vercel
- **Storage**: Use Sanity asset pipeline for media
- **Bandwidth**: Monitor and optimize images

### Disaster Recovery

1. **Backup Strategy**
   - Sanity automatic backups
   - GitHub version control
   - Database snapshots

2. **Rollback Procedure**
   - Git revert for code
   - Sanity content versioning
   - Vercel instant rollback

### Cost Optimization

- Use Vercel free tier for development
- Sanity usage-based pricing
- CDN caching reduces bandwidth
- Serverless pay-per-use model
