

# Next.js Microfrontend with Sanity CMS - Quick Start

A production-ready monorepo architecture combining Next.js 16, Sanity.io CMS, and microfrontend capabilities with Tailwind CSS.

## Features

✅ **Next.js 16** - Latest App Router with React 19  
✅ **Sanity.io Integration** - Headless CMS with GROQ queries  
✅ **Microfrontend Ready** - Module Federation setup for scalable architecture  
✅ **TypeScript** - Full type safety across the stack  
✅ **Tailwind CSS** - Utility-first styling framework  
✅ **Vercel Deployment** - Optimized for Vercel with workflows  
✅ **Airops Support** - Multi-service orchestration option  

## Quick Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Sanity
```bash
# Copy environment template
cp .env.example .env.local

# Add your Sanity credentials
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### 3. Development
```bash
# Start dev server
pnpm dev

# Open http://localhost:3000
```

### 4. Build & Deploy
```bash
# Build for production
pnpm build

# Deploy to Vercel
vercel deploy --prod
```

## Project Structure

```
project-root/
├── app/                 # Next.js App Router
├── lib/                 # Sanity client, queries, types
├── components/          # React components
├── public/             # Static assets
├── SETUP.md            # Comprehensive setup guide
├── DEPLOYMENT.md       # Deployment strategies
└── .env.example        # Environment template
```

## Key Files

- **lib/sanity.client.ts** - Sanity client configuration
- **lib/sanity.queries.ts** - GROQ queries for content
- **lib/types.ts** - TypeScript interfaces
- **lib/utils.ts** - Utility functions (image URLs, formatting)
- **app/page.tsx** - Home page with Sanity integration

## Environment Variables

See `.env.example` for all required variables:
- Sanity project credentials
- Vercel deployment tokens (optional)
- Airops configuration (optional)
- MFE URLs (development)

## Documentation

- **SETUP.md** - Comprehensive setup guide with microfrontend architecture
- **DEPLOYMENT.md** - Deployment strategies and scaling considerations

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm type-check   # Run TypeScript check
```

## Deployment Options

1. **Vercel** (Recommended) - Seamless Next.js integration
2. **Airops** - Multi-service orchestration
3. **Docker** - Containerized deployment
4. **Self-hosted** - Full control with custom infrastructure

See DEPLOYMENT.md for detailed instructions.

## Next Steps

1. Read SETUP.md for comprehensive architecture guide
2. Configure your Sanity project and add content
3. Customize components in `/components`
4. Set up deployment with Vercel or Airops
5. Review DEPLOYMENT.md for scaling strategies

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

