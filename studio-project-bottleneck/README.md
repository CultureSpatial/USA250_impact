# Studio Project Bottleneck

A Sanity CMS studio for managing blog posts, products, and authors for your Next.js microfrontend application.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Sanity account (free at sanity.io)

### Setup Instructions

1. **Navigate to studio directory**
   ```bash
   cd studio-project-bottleneck
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   The `.env.local` will use:
   - Project ID: `vtm50qra`
   - Dataset: `production`

4. **Start development server**
   ```bash
   npm run dev
   ```

   The studio will be available at `http://localhost:3333`

## Project Configuration

- **Project ID**: vtm50qra
- **Dataset**: production
- **Template**: clean
- **Language**: TypeScript

## Available Schemas

### Post
Blog posts with rich text content, images, authors, and tags.

**Fields:**
- Title (required)
- Slug (auto-generated)
- Excerpt
- Body (with blocks and images)
- Featured Image
- Author (reference)
- Published At
- Tags

### Product
Products with inventory management and categorization.

**Fields:**
- Product Name (required)
- Slug (auto-generated)
- Description
- Price (required, positive number)
- Product Image
- Category (select list)
- In Stock (boolean)
- Featured Product (boolean)
- Published At

### Author
Content creators with social media and contact information.

**Fields:**
- Name (required)
- Slug (auto-generated)
- Biography
- Profile Image
- Email (validated)
- Website (URL)
- Social Media (Twitter, LinkedIn, GitHub)

## Commands

```bash
# Start development server
npm run dev

# Start production build
npm run start

# Build for deployment
npm run build

# Deploy to Sanity
npm run deploy

# Open preview/preview mode
npm run preview
```

## Integration with Next.js App

The Next.js app in the parent directory is configured to fetch content from this Sanity studio using:

```typescript
// Credentials needed in .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=vtm50qra
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

## Documentation

- [Sanity Documentation](https://www.sanity.io/docs)
- [Content Studio Guide](https://www.sanity.io/docs/content-studio)
- [Schema Types](https://www.sanity.io/docs/schema-types)

## Project Structure

```
studio-project-bottleneck/
├── sanity.config.ts       # Sanity configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── schemas/               # Content schemas
│   ├── index.ts          # Schema exports
│   ├── post.ts           # Blog post schema
│   ├── product.ts        # Product schema
│   └── author.ts         # Author schema
├── .env.example          # Environment template
└── README.md             # This file
```

## Troubleshooting

**Port 3333 already in use:**
```bash
npm run dev -- --port 3334
```

**Missing environment variables:**
Ensure `.env.local` is created from `.env.example` with valid Sanity credentials.

**Connection issues:**
Verify your internet connection and that the Sanity project exists at sanity.io/manage/vtm50qra

## Support

For issues or questions about Sanity, visit:
- [Sanity Support](https://www.sanity.io/support)
- [Sanity Community](https://www.sanity.io/community)
- [GitHub Issues](https://github.com/sanity-io/sanity/issues)
