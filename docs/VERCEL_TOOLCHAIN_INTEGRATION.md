# Vercel-Native Toolchain Integration Architecture

**Document Purpose:** Impact analysis and integration architecture for Vercel-native toolchain (Inngest, Sanity, Descope, Felt) with Cultural Current Mesh infrastructure.

**Date:** 2026-01-24
**Status:** Architecture Design
**Decision:** Retain Supabase + Integrate Vercel-native tools

---

## Executive Summary

**Critical Finding:** Your Vercel-native toolchain **significantly strengthens the case for Supabase** while eliminating the use cases where Convex had advantages.

### Recommended Architecture:

```
Frontend/Orchestration: Vercel (Next.js)
├─ Workflows: Inngest (event-driven orchestration, 100K executions/month free)
├─ CMS: Sanity.io (Content Operating System, GROQ queries)
├─ Auth: Descope (passwordless, visual workflows)
└─ Maps: Felt.com (collaborative mapping, real-time multiplayer)

Backend/Data: Supabase (PostgreSQL + PostGIS)
├─ Geospatial narratives (PostGIS industry standard)
├─ Audio metadata (Supabase Storage)
├─ Stewardship governance data (relational integrity)
└─ Real-time subscriptions (WebSocket-based)
```

**Key Insight:** Inngest handles workflow orchestration (the use case where Convex excelled), Sanity provides superior content management, Descope eliminates auth complexity, and Felt provides mapping infrastructure. This makes **Convex redundant** while keeping Supabase essential for geospatial and governance.

---

## I. Impact on Convex vs Supabase Decision

### Original Convex Advantage #1: Real-Time Reactivity

**Previous Assessment:** Convex's automatic reactivity was advantage for Workshop multi-user collaboration

**Impact of Inngest:**
- ✅ **Inngest handles workflow orchestration** at 100M+ executions/day
- ✅ **Event-driven architecture** for multi-user coordination
- ✅ **Flow control**: Multi-tenant prioritization, concurrency, throttling, batching
- ✅ **Durable execution** with built-in retries, error handling, state management

**Verdict:** ✅ **Inngest eliminates Convex's real-time advantage.** Workflows are more powerful than reactive queries for coordination.

---

### Original Convex Advantage #2: TypeScript-Native Experience

**Previous Assessment:** Convex's TypeScript functions vs. SQL learning curve

**Impact of Sanity + Inngest:**
- ✅ **Sanity provides TypeScript SDK** for content operations (no SQL required for narratives)
- ✅ **Inngest is TypeScript-native** for all workflow logic
- ✅ **Supabase has TypeScript client** for data operations
- ✅ **Only complex geospatial queries require SQL** (PostGIS functions), which we encapsulate

**Verdict:** ✅ **TypeScript-native across the stack.** SQL only for advanced geospatial queries.

---

### Original Convex Advantage #3: Automatic Caching

**Previous Assessment:** Convex's automatic caching was simpler than manual configuration

**Impact of Vercel + Inngest:**
- ✅ **Vercel Edge Network** provides automatic caching at CDN layer
- ✅ **Inngest memoization** for workflow steps
- ✅ **Sanity Content Lake** has built-in caching and CDN
- ✅ **Felt API** has automatic consistency and caching

**Verdict:** ✅ **Caching handled by platform layers.** No manual configuration needed.

---

### Revised Supabase Advantages (Strengthened):

1. **PostGIS Maturity** - Irreplaceable for geospatial (Felt uses it, Sanity doesn't have it)
2. **Database-Level Governance** - SQL constraints enforce IGNIS-ADAPT Tier 1 veto
3. **B2B Ecosystem** - Vercel is enterprise-focused, Supabase fits perfectly
4. **Self-Hosting** - Critical for mesh node sovereignty
5. **Clear Separation of Concerns** - Sanity (content) + Supabase (geospatial/governance) + Inngest (workflows) is cleaner than Convex (tries to do everything)

---

## II. Tool-Specific Integration Designs

### A. Inngest: Workflow Orchestration

**Purpose:** Event-driven coordination, durable execution, background jobs

**Use Cases:**
1. Workshop Collaboration - Multi-user narrative creation
2. Audio Processing - Hume.ai voice synthesis on narrative creation
3. CFI Calculation - Automated governance checks
4. Stewardship Notifications - Alert stewards when action required
5. Batch Operations - Nightly sync Sanity → Supabase
6. Revenue Attribution - Calculate ECP splits

**Example Workflow:**

```typescript
// app/inngest/functions/narrative-workflow.ts
export const narrativeWorkflow = inngest.createFunction(
  { id: "narrative-lifecycle", retries: 3 },
  { event: "narrative/created" },
  async ({ event, step }) => {
    // Step 1: Calculate CFI (Cultural Fidelity Index)
    const cfi = await step.run("calculate-cfi", async () => {
      return await calculateCFI(event.data.narrativeId);
    });

    // Step 2: Tier 1 Veto Check
    if (cfi < 0.50) {
      await step.run("tier1-veto", async () => {
        await supabase.from("narratives")
          .update({
            status: 'rejected',
            veto_reason: 'TIER 1 VETO: CFI < 0.50'
          })
          .eq("id", event.data.narrativeId);
      });
      return { vetoed: true, cfi };
    }

    // Step 3: Geocode location
    const geocoded = await step.run("geocode", async () => {
      return await geocodeLocation(narrative.location);
    });

    // Step 4: Store in Supabase (geospatial database)
    await step.run("store-geospatial", async () => {
      return await supabase.from("narratives").insert({
        sanity_id: narrative._id,
        location: `SRID=4326;POINT(${geocoded.lng} ${geocoded.lat})`,
        metadata: { cfi }
      });
    });

    // Step 5: Synthesize voice (can take 30-60 seconds)
    const audioUrl = await step.run("synthesize-voice", async () => {
      return await humeAI.synthesize({
        text: narrative.body,
        atmosphere: narrative.voiceStyle
      });
    });

    // Step 6: Update Felt map
    await step.run("update-map", async () => {
      return await felt.addLayer(mapId, {
        type: 'point',
        coordinates: [geocoded.lng, geocoded.lat]
      });
    });
  }
);
```

**Deployment:**
- Install via Vercel Marketplace (one-click)
- Environment variables auto-synced
- Functions auto-deploy with Vercel
- 100K executions/month free tier

---

### B. Sanity.io: Content Operating System

**Purpose:** Structured content management for narratives, editorial workflows, versioning

**Use Cases:**
1. Narrative Authoring - Historians write with rich editor
2. Content Versioning - Track edits, historical accuracy updates
3. Editorial Workflow - Draft → Review → Published states
4. Multi-Language - Narrative translations
5. Media Management - Historical photos, maps, documents
6. GROQ Queries - Flexible content retrieval

**Schema Design:**

```javascript
// sanity/schemas/narrative.js
export default {
  name: 'narrative',
  title: 'Cultural Narrative',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'location',
      type: 'geopoint',  // Sanity native geopoint
      validation: Rule => Rule.required()
    },
    {
      name: 'era',
      type: 'string',
      options: { list: ['1920s', '1930s', '1940s'] }
    },
    {
      name: 'stewardshipStatus',
      type: 'object',
      fields: [
        { name: 'culturalMemoryApproval', type: 'boolean' },
        { name: 'boundaryAccessApproval', type: 'boolean' },
        {
          name: 'cfi',
          type: 'number',
          validation: Rule => Rule.min(0).max(1)
        }
      ]
    },
    {
      name: 'workflow',
      type: 'string',
      options: {
        list: [
          'draft',
          'review_cultural',
          'review_boundary',
          'approved',
          'published',
          'rejected_tier1'
        ]
      }
    }
  ]
}
```

**Sync to Supabase:**

```typescript
// Inngest function: Sync Sanity → Supabase when published
export const syncToSupabase = inngest.createFunction(
  { id: "sync-sanity-to-supabase" },
  { event: "sanity/narrative.published" },
  async ({ event, step }) => {
    const narrative = await step.run("fetch", async () => {
      return await sanity.fetch(`*[_id == "${event.data.id}"][0]`);
    });

    // Tier 1 Veto Check
    if (narrative.stewardshipStatus.cfi < 0.50) {
      throw new Error("TIER 1 VETO: Cannot sync CFI < 0.50");
    }

    await step.run("upsert", async () => {
      return await supabase.from("narratives").upsert({
        sanity_id: narrative._id,
        title: narrative.title,
        location: `SRID=4326;POINT(${narrative.location.lng} ${narrative.location.lat})`,
        metadata: {
          cfi: narrative.stewardshipStatus.cfi,
          sources: narrative.sources
        }
      });
    });
  }
);
```

---

### C. Descope: Authentication & Access Control

**Purpose:** Passwordless authentication, steward role management, row-level security

**Use Cases:**
1. User Authentication - Workshop participants, venue staff, historians
2. Steward Roles - Cultural Memory, Boundary & Access, Technical Infrastructure
3. Organization Management - Museums, tribes, community groups (multi-tenant)
4. Passkeys - Modern, secure, passwordless auth
5. Magic Links - Email-based auth for non-technical users

**Setup:**

```typescript
// lib/descope.ts
import { Descope } from '@descope/nextjs-sdk';

export const descope = new Descope({
  projectId: process.env.DESCOPE_PROJECT_ID!
});

export enum StewardRole {
  CulturalMemory = 'cultural_memory_steward',
  BoundaryAccess = 'boundary_access_steward',
  TechnicalInfra = 'technical_infrastructure_steward',
  EconomicSustainability = 'economic_sustainability_steward'
}

// middleware.ts (Vercel Edge Middleware)
import { getSession } from '@descope/nextjs-sdk/server';

export async function middleware(req: NextRequest) {
  const session = await getSession(req);

  // Protect steward routes
  if (req.nextUrl.pathname.startsWith('/steward')) {
    if (!session?.user?.roles?.some(r => r.includes('steward'))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
```

**Supabase RLS Integration:**

```sql
-- Row-Level Security: Only Cultural Memory stewards can approve
CREATE POLICY "cultural_memory_approval"
  ON narratives
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' = 'cultural_memory_steward'
  );

-- Workshop participants can only edit their own drafts
CREATE POLICY "own_drafts_only"
  ON narratives
  FOR UPDATE
  USING (
    auth.jwt() ->> 'sub' = author_id
    AND status = 'draft'
  );
```

---

### D. Felt.com: Collaborative Mapping

**Purpose:** Interactive maps, real-time collaboration, spatial visualization

**Use Cases:**
1. Narrative Discovery - Users explore artifacts on map
2. Workshop Collaboration - Participants see contributions live
3. Steward Review - Cultural Memory steward reviews locations
4. Route Planning - Digital Campfire scavenger hunt paths
5. Historical Overlays - Compare 1920s maps to modern streets

**API Integration:**

```typescript
// lib/felt.ts
export class FeltClient {
  async createMap(data: { title: string }) {
    return await axios.post(
      'https://felt.com/api/v1/maps',
      data,
      { headers: { 'Authorization': `Bearer ${FELT_API_KEY}` } }
    );
  }

  async addLayer(mapId: string, layer: {
    name: string;
    type: 'point';
    features: GeoJSON.Feature[];
  }) {
    return await axios.post(
      `https://felt.com/api/v1/maps/${mapId}/layers`,
      layer,
      { headers: { 'Authorization': `Bearer ${FELT_API_KEY}` } }
    );
  }
}

// Inngest function: Update map when narrative created
export const updateWorkshopMap = inngest.createFunction(
  { id: "update-felt-map" },
  { event: "workshop/narrative.created" },
  async ({ event, step }) => {
    await step.run("add-to-map", async () => {
      return await felt.addLayer(event.data.mapId, {
        name: narrative.title,
        type: 'point',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          properties: { title, narrativeId, cfi }
        }]
      });
    });
  }
);
```

---

## III. Complete Integration Flow Example

### Scenario: User Creates Narrative at Workshop

**Step 1: Authentication (Descope)**
```typescript
const { user } = await descope.passkey.signIn();
```

**Step 2: Content Creation (Sanity)**
```typescript
const narrative = await sanity.create({
  _type: 'narrative',
  title: "Maxwell Street Market",
  body: "In the 1920s...",
  author: user.id,
  location: { lat: 41.8646, lng: -87.6475 }
});
```

**Step 3: Workflow Triggered (Inngest)**
```typescript
await inngest.send({
  name: "workshop/narrative.created",
  data: { narrativeId: narrative._id, userId: user.id }
});

// Inngest orchestrates:
// 1. Calculate CFI
// 2. Check Tier 1 threshold
// 3. Geocode location
// 4. Store in Supabase (PostGIS)
// 5. Update Felt map
// 6. Notify participants
```

**Step 4: Real-Time Updates**
- All workshop participants see new point on Felt map (real-time)
- Vercel SSE updates UI with narrative card

---

## IV. Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js)                      │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌───────────────┐  ┌────────────────┐  ┌──────────────┐
│   INNGEST     │  │   SANITY.IO    │  │   DESCOPE    │
│  Orchestrate  │  │   Content      │  │   Auth       │
│               │  │                │  │              │
│ • Workflows   │  │ • Narratives   │  │ • Passkeys   │
│ • CFI calc    │  │ • GROQ         │  │ • Roles/JWT  │
│ • Sync        │  │ • Versions     │  │ • RLS tokens │
└───────────────┘  └────────────────┘  └──────────────┘
        ↓                   ↓                   ↓
        └───────────────────┼───────────────────┘
                            ↓
        ┌───────────────────┴───────────────────┐
        ↓                                       ↓
┌────────────────┐                    ┌─────────────────┐
│   FELT.COM     │                    │   SUPABASE      │
│   Mapping      │                    │   Database      │
│                │                    │                 │
│ • Real-time    │                    │ • PostgreSQL    │
│ • Collab       │◄───geospatial─────►│ • PostGIS       │
│ • API          │    queries         │ • Storage       │
│ • Webhooks     │                    │ • RLS           │
└────────────────┘                    └─────────────────┘
```

---

## V. Deployment Configuration

### Environment Variables (Vercel):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...

# Descope
NEXT_PUBLIC_DESCOPE_PROJECT_ID=P...
DESCOPE_API_KEY=K...

# Felt
FELT_API_KEY=felt_...

# Inngest
INNGEST_EVENT_KEY=evt_...
INNGEST_SIGNING_KEY=sig_...

# Hume.ai
HUME_API_KEY=hume_...
```

### Installation Steps:

1. **Vercel Marketplace:**
   - Install Inngest (one-click)
   - Install Descope (one-click)
   - Environment variables auto-sync

2. **Sanity Setup:**
   ```bash
   npm create sanity@latest
   # Choose: Next.js app, prohibition-artifacts dataset
   ```

3. **Felt API:**
   - Request API key from Felt
   - Create "Prohibition Chicago" map
   - Add artifact points programmatically

4. **Supabase:**
   - Use existing schema (already designed)
   - Configure Descope JWT for RLS

---

## VI. Cost Analysis

### Free Tiers:

| Service | Free Tier | Sufficient For |
|---------|-----------|----------------|
| Vercel | Hobby (personal projects) | Conference, Dev Post |
| Inngest | 100K executions/month | Pop-Up events (5K/event) |
| Sanity | 3 users, unlimited API | MVP, workshops |
| Descope | 7,500 MAU | Pop-Up events, workshops |
| Felt | TBD | Demo maps, small workshops |
| Supabase | 500MB DB, 1GB storage | 10-100 narratives |

### Estimated Monthly Costs:

**MVP/Conference:** $0 (all free tiers)

**Pop-Up Event:**
- Vercel Pro: $20 (if Hobby insufficient)
- Sanity: $0-99 (Growth if >3 users)
- Others: $0 (within free tiers)
- **Total:** $0-$119/month

**Production (Multiple Workshops):**
- Vercel: $20
- Inngest: $0 (likely under 100K)
- Sanity: $99
- Descope: $0 (likely under 7,500 MAU)
- Felt: TBD
- Supabase: $25
- **Total:** $144+/month

---

## VII. Migration Path

### From Current State:

**Current:**
- Supabase schema designed ✅
- 10 Prohibition artifacts in SQL ✅
- Voice spec designed (Hume.ai) ✅
- Felt.com selected ✅

**Next Steps:**

1. **Set up Sanity** (Priority 1)
   ```bash
   npm create sanity@latest
   # Migrate narratives from SQL → Sanity documents
   ```

2. **Set up Inngest** (Priority 2)
   - Install via Vercel Marketplace
   - Create CFI calculation workflow
   - Create Sanity → Supabase sync workflow

3. **Set up Descope** (Priority 3)
   - Install via Vercel Marketplace
   - Create steward roles
   - Configure Supabase RLS

4. **Set up Felt API** (Priority 4)
   - Request API key
   - Create Prohibition map
   - Add 10 artifact points

---

## VIII. Component Slicing (Revised)

### Conference Slice:
- ✅ Sanity (narrative CMS, read-only)
- ✅ Felt (static map embed)
- ❌ Inngest (not needed)
- ❌ Descope (public presentation)
- ❌ Supabase (data from Sanity)

### Pop-Up Event Slice:
- ✅ Descope (guest magic link auth)
- ✅ Felt (interactive map, real-time)
- ✅ Inngest (proximity, voice, ECP)
- ✅ Sanity (narratives, UGC)
- ✅ Supabase (geospatial queries)

### Workshop Slice:
- ✅ Descope (participants + stewards)
- ✅ Sanity (collaborative authoring)
- ✅ Inngest (CFI calc, notifications)
- ✅ Felt (real-time map collab)
- ✅ Supabase (governance, stewardship)

---

## IX. Final Recommendation

### Architecture Decision:

**Supabase + Vercel-Native Toolchain**

**Why:**
1. ✅ **Sanity replaces document store** for narratives (better CMS than Convex)
2. ✅ **Inngest replaces Convex workflows** (more powerful orchestration)
3. ✅ **Descope eliminates auth complexity** (no custom logic)
4. ✅ **Felt provides mapping** (no custom infrastructure)
5. ✅ **Supabase remains essential** for PostGIS + governance

**Convex is now redundant:**
- Real-time workflows → Inngest ✅
- TypeScript content → Sanity ✅
- Reactive queries → Sanity real-time + Felt ✅
- Document store → Sanity Content Lake ✅

**Supabase is irreplaceable:**
- PostGIS geospatial (Felt needs it, Sanity doesn't have it) ✅
- Database-level governance (SQL constraints) ✅
- B2B ecosystem (Vercel enterprise focus) ✅
- Self-hosting (mesh sovereignty) ✅

---

## X. Next Actions

1. ✅ **Decision Made:** Retain Supabase architecture
2. 🔴 **Set up Sanity:** Migrate Prohibition narratives
3. 🔴 **Set up Inngest:** Create workflow functions
4. 🔴 **Set up Descope:** Configure steward roles
5. 🔴 **Set up Felt API:** Create Prohibition map
6. 🟡 **Design sync workflow:** Sanity → Supabase (Inngest)

---

## XI. Sources

- [Vercel + Inngest Integration](https://www.inngest.com/blog/vercel-integration)
- [Inngest for Vercel Marketplace](https://vercel.com/marketplace/inngest)
- [Sanity Content Operating System](https://www.sanity.io)
- [Sanity Next.js CMS](https://www.sanity.io/nextjs-cms)
- [Descope Authentication Platform](https://www.descope.com/)
- [Descope for Vercel Marketplace](https://www.descope.com/blog/post/vercel-marketplace-integrations)
- [Felt Collaborative Mapping](https://felt.com)
- [Felt API Reference](https://developers.felt.com/rest-api/api-reference/maps)

---

**END OF DOCUMENT**
