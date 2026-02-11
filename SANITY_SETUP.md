# Sanity Studio Setup Guide

This guide explains how to set up and run the Sanity CMS studio alongside your Next.js application.

## Overview

The project includes a complete Sanity studio configuration in the `studio-project-bottleneck/` directory. This studio connects to your Sanity project (ID: `vtm50qra`, Dataset: `production`) and provides a user-friendly interface for managing content.

## Directory Structure

```
project-root/
├── app/                           # Next.js application
├── lib/                           # Shared utilities
├── components/                    # React components
├── studio-project-bottleneck/     # Sanity CMS Studio
│   ├── sanity.config.ts          # Studio configuration
│   ├── package.json              # Studio dependencies
│   ├── schemas/                  # Content type schemas
│   └── README.md                 # Studio documentation
├── .env.example                  # Environment variables
├── SETUP.md                       # Project setup guide
└── AUTH_CONFIG.md                # Authentication guide
```

## Installation & Setup

### Step 1: Install Studio Dependencies

From the project root:

```bash
cd studio-project-bottleneck
npm install
```

Or with pnpm:

```bash
pnpm install
```

### Step 2: Configure Environment

Copy the environment template:

```bash
cp .env.example .env.local
```

The `.env.local` file uses these credentials:
- **Project ID**: `vtm50qra`
- **Dataset**: `production`

### Step 3: Start the Studio

Run the development server:

```bash
npm run dev
```

The Sanity Studio will be available at: **http://localhost:3333**

## Running Both Apps

You can run the Next.js app and Sanity studio simultaneously from the project root:

```bash
# Terminal 1: Run Next.js app
npm run dev

# Terminal 2: Run Sanity studio
cd studio-project-bottleneck
npm run dev
```

This gives you:
- Next.js App: http://localhost:3000
- Sanity Studio: http://localhost:3333

## Content Management

### Creating Blog Posts

1. Go to **http://localhost:3333**
2. Click "+" next to "Post" in the left sidebar
3. Fill in the post details:
   - Title
   - Excerpt
   - Featured image
   - Body (with rich text editor)
   - Author (reference to Author document)
   - Tags

4. Click "Publish" to make it live

### Creating Products

1. Click "+" next to "Product"
2. Fill in product details:
   - Name
   - Description
   - Price
   - Category
   - Product image
   - Stock status

3. Click "Publish"

### Managing Authors

1. Click "+" next to "Author"
2. Add author information:
   - Name
   - Biography
   - Profile image
   - Email and website
   - Social media links

3. Click "Publish"

## Connecting to Next.js

The Next.js app automatically fetches content from this studio when configured with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vtm50qra
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

See `ENV_CONFIG.md` and `AUTH_CONFIG.md` for complete configuration details.

## Content Queries (GROQ)

The Next.js app uses GROQ (Graph Relational Object Query Language) to fetch content:

```typescript
// From lib/sanity.queries.ts

// Fetch all blog posts
*[_type == "post"] | order(publishedAt desc)

// Fetch all products
*[_type == "product"] | order(publishedAt desc)

// Fetch specific post by slug
*[_type == "post" && slug.current == $slug][0]
```

## Deployment

### Deploy Sanity Changes

When you're ready to deploy:

```bash
cd studio-project-bottleneck
npm run build
npm run deploy
```

This deploys your studio configuration to Sanity's hosting.

### Production Environment

For production, ensure your deployment platform has these environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=vtm50qra`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `SANITY_API_TOKEN=your_production_token`

## Troubleshooting

### Studio won't start

Check if port 3333 is available:
```bash
npm run dev -- --port 3334
```

### Can't connect to Sanity project

Verify credentials:
```bash
cat studio-project-bottleneck/.env.local
```

Ensure the `.env.local` exists and has valid project ID.

### Content not showing in Next.js app

1. Publish content in Sanity Studio first
2. Check network tab in browser DevTools
3. Verify NEXT_PUBLIC_SANITY_PROJECT_ID in app's `.env.local`
4. Check that dataset is set to `production`

## Available Commands

**In studio directory:**

```bash
# Development
npm run dev              # Start studio at http://localhost:3333

# Production
npm run build            # Build studio
npm run start            # Start production build
npm run deploy           # Deploy to Sanity hosting

# Preview
npm run preview          # Open preview mode
```

## Schema Files

All content types are defined in TypeScript:

- **`schemas/post.ts`** - Blog post schema (106 lines)
- **`schemas/product.ts`** - Product schema (102 lines)
- **`schemas/author.ts`** - Author schema (85 lines)
- **`schemas/index.ts`** - Schema exports

To add new content types, create a new file in `schemas/` and export it from `schemas/index.ts`.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Content Modeling Guide](https://www.sanity.io/docs/content-modeling)
- [Sanity CLI Reference](https://www.sanity.io/docs/cli)

## Next Steps

1. Start the studio: `cd studio-project-bottleneck && npm run dev`
2. Create some sample content
3. Check the Next.js app to see content fetched and displayed
4. Customize schemas in `schemas/` directory as needed
5. Deploy when ready

Your Sanity studio is now ready for content management!
