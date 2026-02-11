# Full Stack Setup: Next.js + Sanity CMS

## Overview

This is a complete microfrontend application combining:
- **Next.js 16 (canary)** - Frontend framework on port 3000
- **Sanity CMS Studio** - Content management on port 3333
- **TypeScript** - Full type safety
- **Tailwind CSS** - Styling

## Architecture

```
┌─────────────────────────────────────────┐
│          Your Browser                    │
└───────────────┬─────────────────────────┘
                │
      ┌─────────┴─────────┐
      │                   │
   ┌──▼──┐            ┌──▼──────┐
   │ Dev │            │  Admin  │
   │3000 │            │  3333   │
   └──┬──┘            └──┬──────┘
      │                   │
  ┌───▼───────────┐  ┌────▼────────────┐
  │ Next.js App   │  │ Sanity Studio    │
  │ - Page Router │  │ - Content Editor │
  │ - Auth Config │  │ - Vision Tool    │
  │ - Components  │  │ - Schemas        │
  └───┬───────────┘  └────┬────────────┘
      │                   │
      └───────────┬───────┘
                  │
            ┌─────▼──────┐
            │   Sanity   │
            │   Backend  │
            │ vtm50qra   │
            └────────────┘
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or pnpm
- Sanity account (free at sanity.io)

### Step 1: Clone/Setup Project

```bash
git clone <your-repo>
cd <project-root>
```

### Step 2: Install Dependencies

```bash
# Install main app dependencies
npm install

# Install studio dependencies
cd studio-project-bottleneck
npm install
cd ..
```

### Step 3: Configure Environment

Copy environment template and add credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=vtm50qra
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_LOGIN_PATH=/auth/login
```

### Step 4: Start Development Servers

**Terminal 1 - Next.js App:**
```bash
npm run dev
# Open http://localhost:3000
```

**Terminal 2 - Sanity Studio:**
```bash
cd studio-project-bottleneck
npm run dev
# Open http://localhost:3333
```

## What You Can Do Now

### In Next.js (Port 3000)
- View published content from Sanity
- Test authentication flows
- View login URL at http://localhost:3000/auth/login
- See real-time content updates
- Debug Sanity queries

### In Sanity Studio (Port 3333)
- Create and edit blog posts
- Create and edit products
- Manage authors
- Use Vision tool to test GROQ queries
- Upload and optimize media
- Preview how content appears

## File Structure

### Main App
```
project-root/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with content
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/                   # Utilities & config
│   ├── auth.config.ts     # Authentication setup
│   ├── sanity.client.ts   # Sanity client
│   ├── sanity.config.ts   # Sanity configuration
│   ├── sanity.queries.ts  # GROQ queries
│   └── types.ts           # TypeScript types
├── components/            # React components
│   └── AuthDebug.tsx      # Auth debugging
├── .env.example          # Environment template
└── README.md             # Project docs
```

### Sanity Studio
```
studio-project-bottleneck/
├── sanity.config.ts      # Studio config (vtm50qra)
├── schemas/
│   ├── index.ts          # Export schemas
│   ├── post.ts           # Blog post schema
│   ├── product.ts        # Product schema
│   └── author.ts         # Author schema
├── package.json          # Studio dependencies
└── README.md             # Studio docs
```

## Key Integration Points

### Content Flow
1. **Create in Studio** → Write content at http://localhost:3333
2. **Store in Sanity** → Saved to `vtm50qra` project
3. **Query from App** → Next.js fetches via GROQ at http://localhost:3000
4. **Display to Users** → Content rendered on page

### Authentication
- Login URL: http://localhost:3000/auth/login
- Config: `lib/auth.config.ts`
- Debug info visible in development mode

### Real-time Updates
- Changes in studio immediately available to Next.js
- Uses Sanity's real-time listener
- No manual refresh needed

## Available Scripts

### Next.js App
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # Check TypeScript
```

### Sanity Studio
```bash
cd studio-project-bottleneck
npm run dev          # Start studio (port 3333)
npm run build        # Build studio
npm run deploy       # Deploy to Sanity hosting
```

## Debugging

### Check Sanity Configuration
Open http://localhost:3000 and look for the yellow warning banner if Sanity isn't configured.

### View Auth Configuration
In development, http://localhost:3000 shows authentication status and login URLs.

### Test GROQ Queries
Navigate to http://localhost:3333/vision to test queries before using them.

### Check Console Logs
Both apps log configuration and issues to the browser console:
```javascript
[Auth] Configuration initialized: ...
[Sanity] Fetch error: ...
```

## Production Deployment

### Vercel (Recommended)

**Next.js App:**
```bash
vercel deploy --prod
```

Set environment variables in Vercel dashboard.

**Sanity Studio:**
```bash
cd studio-project-bottleneck
sanity deploy
```

### Environment Variables Required
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_BASE_URL` (production domain)
- `SANITY_API_TOKEN` (server-side only)

## Troubleshooting

### Studio Won't Start
```bash
cd studio-project-bottleneck
rm -rf node_modules
npm install
npm run dev
```

### Port Conflicts
```bash
npm run dev -- -p 3001    # Use different port
cd studio-project-bottleneck
npm run dev -- --port 3334
```

### Can't Login to Studio
```bash
sanity logout
sanity login
npm run dev
```

### Content Not Showing in Next.js
1. Check environment variables are set
2. Verify project ID matches: `vtm50qra`
3. Test GROQ query in Vision tool
4. Check browser console for errors

## Next Steps

1. Start both servers (see Step 4 above)
2. Create sample content in studio
3. View content in Next.js app
4. Customize schemas for your needs
5. Deploy to production

## Resources

- [Next.js Documentation](https://nextjs.org)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Vercel Deployment](https://vercel.com/docs)
- [Our Setup Docs](./SETUP.md)
- [Auth Configuration](./AUTH_CONFIG.md)
- [Environment Variables](./ENV_CONFIG.md)
