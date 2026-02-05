## Next.js Microfrontend Architecture with Sanity.io - Comprehensive Setup Guide

### Part 1: Essential Tools & Dependencies

#### Core Framework
- `next@16.0.7` - Next.js framework with App Router
- `react@^19` - React library
- `react-dom@^19` - React DOM rendering
- `typescript@5.7.3` - TypeScript support

#### Content Management
- `@sanity/client@^6.0.0` - Sanity.io client library
- `@sanity/image-url@^1.0.0` - Image URL builder for Sanity
- `groq@^3.0.0` - GROQ query language for Sanity
- `sanity@^3.0.0` - Sanity Studio (CMS interface)
- `@sanity/vision@^3.0.0` - Query builder for Sanity Studio

#### Styling & UI
- `tailwindcss@^3.4.17` - Utility-first CSS framework
- `postcss@^8.5` - CSS processor
- `autoprefixer@^10.4.20` - Autoprefixer plugin
- `lucide-react@^0.544.0` - Icon library
- `clsx@^2.1.1` - Conditional class names
- `tailwind-merge@^2.5.5` - Tailwind class merging

#### Microfrontend Architecture
- `@module-federation/nextjs-mf@^7.0.0` - Module Federation for Next.js
- `webpack@^5.94.0` - Bundler for module federation

#### Utilities & Helpers
- `date-fns@^4.1.0` - Date formatting
- `zod@^3.24.1` - Schema validation
- `react-hook-form@^7.54.1` - Form state management

#### Optional Deployment
- `vercel@^39.0.0` - Vercel CLI for deployments
- `dotenv@^16.0.0` - Environment variable management

---

### Part 2: Recommended Folder Structure

```
project-root/
├── apps/
│   ├── shell/                          # Main host application (shell)
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   └── dashboard/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   └── shared/
│   │   ├── next.config.mjs             # Module federation config
│   │   └── tsconfig.json
│   │
│   ├── products-mfe/                   # Micro Frontend 1
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── next.config.mjs             # MFE export config
│   │   └── tsconfig.json
│   │
│   ├── blog-mfe/                       # Micro Frontend 2
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── next.config.mjs
│   │   └── tsconfig.json
│   │
│   └── admin-mfe/                      # Micro Frontend 3
│       ├── app/
│       ├── components/
│       ├── pages/
│       ├── next.config.mjs
│       └── tsconfig.json
│
├── studio/                             # Sanity Studio folder
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── blog.ts
│   │   ├── product.ts
│   │   └── author.ts
│   └── structure.ts                    # Studio structure
│
├── lib/
│   ├── sanity.client.ts               # Sanity client config
│   ├── sanity.queries.ts              # GROQ queries
│   ├── types.ts                       # TypeScript types
│   └── utils.ts                       # Shared utilities
│
├── packages/
│   ├── config/                        # Shared configs
│   ├── ui/                            # Shared UI components
│   └── types/                         # Shared TypeScript types
│
├── .env.local                         # Local environment variables
├── .env.example                       # Example environment file
├── package.json                       # Monorepo root
├── pnpm-workspace.yaml               # Workspace config (if using pnpm)
├── turbo.json                        # Turbo repo config (optional)
├── SETUP.md                          # This file
└── README.md                         # Project overview
```

---

### Part 3: Core Configuration Files

#### 1. Root package.json (Monorepo)
```json
{
  "name": "nextjs-mfe-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*",
    "studio"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "start": "turbo run start",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "5.7.3"
  }
}
```

#### 2. Shell App next.config.mjs (Host with Module Federation)
```javascript
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          products: isServer
            ? `next-${require("path").resolve(
                __dirname,
                "../products-mfe/.next/server"
              )}`
            : "products@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          blog: isServer
            ? `next-${require("path").resolve(
                __dirname,
                "../blog-mfe/.next/server"
              )}`
            : "blog@http://localhost:3002/_next/static/chunks/remoteEntry.js",
          admin: isServer
            ? `next-${require("path").resolve(
                __dirname,
                "../admin-mfe/.next/server"
              )}`
            : "admin@http://localhost:3003/_next/static/chunks/remoteEntry.js",
        },
        exposes: {
          "./layout": "./components/layout/index.ts",
          "./header": "./components/layout/header.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;
```

#### 3. MFE next.config.mjs (Micro Frontend Export)
```javascript
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "products-mfe",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./pages": "./pages/index.ts",
          "./components": "./components/index.ts",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;
```

#### 4. Sanity Configuration
```typescript
// studio/sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemaTypes from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

#### 5. Sanity Client Setup
```typescript
// lib/sanity.client.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

export async function fetchSanityData(query: string) {
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
```

---

### Part 4: Environment Variables Setup

Create `.env.example`:
```bash
# Sanity.io
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Deployment - Vercel
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_TOKEN=your_vercel_token

# Deployment - Airops (optional)
AIROPS_API_KEY=your_airops_key
AIROPS_ORG_ID=your_airops_org_id

# MFE Ports (Development)
SHELL_PORT=3000
PRODUCTS_MFE_PORT=3001
BLOG_MFE_PORT=3002
ADMIN_MFE_PORT=3003
```

---

### Part 5: Development Commands & Scripts

```bash
# Install dependencies
pnpm install

# Development mode (all MFEs + shell)
pnpm dev

# Build all applications
pnpm build

# Production start
pnpm start

# Type checking
pnpm type-check

# Deploy shell to Vercel
cd apps/shell && vercel deploy

# Deploy individual MFE
cd apps/products-mfe && vercel deploy

# Sanity CMS development
cd studio && pnpm dev
```

---

### Part 6: Deployment Options

#### Option A: Vercel + Workflows (Recommended)
- Deploy shell app to Vercel main domain
- Deploy each MFE as separate Vercel project
- Use Vercel Workflows for orchestration
- Environment variables synced via Vercel dashboard

#### Option B: Airops Deployment
- Use Airops for multi-service orchestration
- Configure CI/CD pipelines for each MFE
- Monitor deployments across microservices
- Centralized logging and monitoring

---

### Part 7: TypeScript Types & Shared Packages

```typescript
// packages/types/index.ts
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: Author;
  publishedAt: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

export interface Author {
  _id: string;
  name: string;
  email: string;
  bio?: string;
}
```

---

### Part 8: Essential GROQ Queries

```typescript
// lib/sanity.queries.ts
export const BLOG_QUERY = `
  *[_type == "blog" && defined(slug.current)] {
    _id,
    title,
    slug,
    content,
    author->,
    publishedAt,
    image {
      asset -> { _id, url }
    }
  }
`;

export const PRODUCT_QUERY = `
  *[_type == "product" && defined(slug.current)] {
    _id,
    name,
    slug,
    price,
    description,
    image {
      asset -> { _id, url }
    }
  }
`;
```

---

### Part 9: Initial Setup Steps

1. **Create monorepo workspace**
   - Initialize root `package.json`
   - Configure `pnpm-workspace.yaml`

2. **Set up Sanity Studio**
   - Run `sanity init` in studio directory
   - Define schema types
   - Configure API access

3. **Initialize shell application**
   - Create `apps/shell` Next.js app
   - Configure Module Federation as host
   - Set up routing

4. **Initialize MFE applications**
   - Create `apps/products-mfe`, `apps/blog-mfe`, `apps/admin-mfe`
   - Configure each as remote in Module Federation
   - Export components/pages

5. **Configure environment variables**
   - Copy `.env.example` to `.env.local`
   - Add Sanity credentials
   - Add deployment tokens

6. **Test locally**
   - Run `pnpm dev`
   - Verify all MFEs load in shell
   - Test Sanity integration

7. **Deploy**
   - Deploy shell to primary domain
   - Deploy MFEs to separate Vercel projects
   - Configure DNS/proxy for unified domain

---

### Part 10: Best Practices for Scaling

- **Code Sharing**: Use `packages/ui` and `packages/types` for shared code
- **Performance**: Lazy load MFEs, implement code splitting
- **State Management**: Consider Context API or Zustand for shared state
- **Error Handling**: Implement error boundaries in shell
- **Monitoring**: Use Sentry for error tracking across MFEs
- **Testing**: Unit test MFEs independently, integration tests for shell
- **Documentation**: Keep README in each MFE with deployment instructions
