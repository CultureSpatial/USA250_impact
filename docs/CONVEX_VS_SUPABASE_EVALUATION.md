# Architecture Decision Record: Convex vs Supabase
## Cultural Current Mesh — Database & Backend Choice

**Decision Date:** February 2026
**Status:** DECIDED — Supabase retained
**Scores:** Supabase 9.3/10 | Convex 6.4/10

---

## Decision

**Retain Supabase (PostgreSQL + PostGIS).** Convex is redundant given the Vercel-native toolchain (Inngest handles workflows, Sanity handles content reactivity, Descope handles auth).

---

## Evaluation Criteria

| Criterion | Weight | Supabase | Convex | Notes |
|-----------|--------|----------|--------|-------|
| Geospatial (PostGIS) | 25% | 10 | 4 | PostGIS is 30+ year mature; Convex geo in beta |
| Native audio file storage | 15% | 10 | 2 | Supabase Storage built-in; Convex has no native file storage |
| DB-level governance (RLS) | 20% | 10 | 3 | Supabase Row Level Security = IGNIS-ADAPT enforcement layer |
| Real-time reactivity | 10% | 7 | 10 | Convex wins; irrelevant — Inngest replaces this need |
| Vector embeddings (pgvector) | 10% | 9 | 5 | pgvector extension available in Supabase; Convex no native vector |
| Vercel integration | 10% | 9 | 8 | Both integrate well; Supabase has Vercel Marketplace listing |
| Migration path | 10% | 9 | 5 | PostgreSQL = universal; Convex = proprietary query language |

**Weighted Totals:** Supabase 9.3 | Convex 6.4

---

## Why Convex Was Considered

The Convex.dev pitch is compelling for reactive apps:
- Functions-as-database (queries, mutations, actions in TypeScript)
- Real-time subscriptions without websocket management
- Optimistic UI updates built-in
- TypeScript-native schema

For a consumer app with collaborative live state, Convex would be competitive.

---

## Why Convex Was Rejected

**1. Geospatial is non-negotiable**
The CCM is fundamentally location-based. PostGIS (Supabase) provides:
- `geography(Point, 4326)` — WGS84 coordinate storage
- `ST_DWithin()` — proximity radius queries
- `ST_Distance()` — distance calculations
- `ST_MakeEnvelope()` — bounding box queries

Convex geospatial support is beta-grade and does not approach PostGIS maturity.

**2. File storage for audio**
10 Chicago Prohibition sites × 3 audio layers × 7 stops = 210 audio assets minimum.
Supabase Storage handles binary assets natively with CDN delivery.
Convex has no native file storage — requires external S3/R2 with manual integration.

**3. Governance is DB-level, not app-level**
IGNIS-ADAPT Tier 1 (CFI/SSI < 0.50 = veto) must be enforced at the data layer, not application code. Supabase Row Level Security (RLS) policies enforce this:

```sql
-- RLS: Only activate narratives with CFI >= 0.50
CREATE POLICY "cfi_activation_gate" ON narratives
  FOR UPDATE USING (cfi_score >= 0.50);
```

Convex governance would require application-level enforcement — bypassable, not constitutional.

**4. Convex advantages are now covered**
- Real-time reactivity → Inngest event workflows (async is appropriate for cultural stewardship)
- TypeScript-native → Supabase has full TypeScript client
- Optimistic UI → Not required for heritage trail (deliberate pace is appropriate)

**5. Migration risk**
Convex uses a proprietary query model. PostgreSQL (Supabase) is the universal standard. Future migration off Supabase = standard SQL dump. Future migration off Convex = full rewrite.

---

## Final Stack Rationale

```
Supabase does:          What Convex would have added:
- Geospatial queries    - Real-time (→ Inngest covers this)
- Audio file storage    - TypeScript schema (→ Supabase TS client covers)
- RLS governance        - Optimistic UI (→ unnecessary for use case)
- pgvector (Phase 2)
- Auth integration (via Descope)
```

Convex is not superior — it is redundant.
