# Sanity Studio Startup Guide

## Quick Start Commands

```bash
cd studio-project-bottleneck
npm install
npm run dev
```

The studio will open at `http://localhost:3333`

## What Happens When Running `npm run dev`

The Sanity CLI starts a local development server that:

1. **Connects to Your Project** - Links to `vtm50qra` project, `production` dataset
2. **Loads Schemas** - Initializes Post, Product, and Author content types
3. **Starts Dev Server** - Runs on `http://localhost:3333` with hot reload
4. **Syncs with Next.js** - Changes immediately available to your frontend via GROQ queries

## Studio Features Available

- **Content Editor** - Create and edit posts, products, and author profiles
- **Vision Tool** - Query and test GROQ queries directly (`/vision`)
- **Structure Tool** - Organize content hierarchy in sidebar
- **Real-time Preview** - See changes instantly
- **Media Management** - Upload and optimize images

## Directory Structure

```
studio-project-bottleneck/
├── sanity.config.ts          # Studio configuration
├── schemas/
│   ├── index.ts              # Schema exports
│   ├── post.ts               # Blog post content type
│   ├── product.ts            # Product content type
│   └── author.ts             # Author content type
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

## Available Commands

```bash
npm run dev       # Start development server on port 3333
npm run build     # Build for production
npm run deploy    # Deploy to Sanity hosting
npm start         # Start production server
npm run preview   # Preview production build
```

## Environment Configuration

The studio connects using credentials in `sanity.config.ts`:
- **Project ID**: `vtm50qra`
- **Dataset**: `production`
- **Plugins**: Structure Tool, Vision Tool

No additional environment variables needed for local development.

## Content Models Available

### Post Schema
- Title, slug, excerpt
- Rich text content
- Author reference
- Publication date
- Featured image
- Tags

### Product Schema
- Name, slug, description
- Price and stock tracking
- Category classification
- Product image
- Availability status
- Metadata

### Author Schema
- Name, email, bio
- Avatar image
- Social media links
- Publication history

## Next.js Integration

Your Next.js app queries this content using:

```typescript
// lib/sanity.queries.ts
export const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)`
export const PRODUCTS_QUERY = `*[_type == "product"] | order(name asc)`
```

The frontend automatically displays content created in the studio.

## Troubleshooting

### Port 3333 Already in Use
```bash
npm run dev -- --port 3334
```

### Authentication Issues
```bash
sanity logout
sanity login
npm run dev
```

### Build or Installation Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS or Connection Issues
- Verify project ID is correct in `sanity.config.ts`
- Check that dataset exists in Sanity project
- Ensure you're logged in: `sanity cli`

## Next Steps

1. Start the studio: `npm run dev`
2. Navigate to `http://localhost:3333`
3. Create sample posts and products
4. View content in Next.js app at `http://localhost:3000`
5. Use Vision Tool to test GROQ queries

## Documentation

- [Sanity Documentation](https://www.sanity.io/docs)
- [Content Lake Guide](https://www.sanity.io/docs/content-lake)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
