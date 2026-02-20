# Convex vs. Supabase Evaluation for Cultural Current Mesh

**Document Purpose:** Comparative analysis of Convex.dev vs. Supabase for our infrastructure needs, evaluating whether Convex should supplant our current Supabase architecture.

**Date:** 2026-01-23
**Status:** Technical Evaluation

---

## Executive Summary

**Recommendation:** **Retain Supabase** for Prohibition Artifacts and near-term Cultural Current Mesh infrastructure. **Monitor Convex** for future mesh node implementations where real-time reactivity is primary requirement.

**Rationale:** Supabase's mature PostGIS geospatial capabilities, native file storage for audio, and SQL power align better with our current component architecture. Convex's geospatial component is in beta (limited to ~1M points), and document store architecture doesn't serve our relational stewardship data model.

However, Convex's recent self-hosting capabilities (PostgreSQL/MySQL/SQLite backends) and reactive architecture make it compelling for **future mesh nodes** where real-time coordination is critical.

---

## I. Platform Architecture Comparison

### Convex Architecture

**Core Model:** Reactive document store with TypeScript-native functions

**Components:**
- **Database Layer:** Document store (now supports PostgreSQL, MySQL, SQLite backends as of Feb 2025)
- **Server Functions:** TypeScript queries/mutations with strong consistency
- **Real-time Engine:** Automatic reactivity—queries re-run and push updates to all clients
- **Deployment:** Cloud-hosted OR self-hosted (Docker, Fly.io, Coolify)

**Primary Language:** Rust (50.8%) + TypeScript (40.2%)

**Strengths:**
- ✅ Real-time reactivity is default, not opt-in
- ✅ TypeScript-native (developer experience)
- ✅ Strong consistency guarantees
- ✅ Recently made self-hosting fully open source (FSL Apache 2.0, Jan 2026)
- ✅ Document store flexibility (schema-less evolution)

**Weaknesses:**
- ❌ Geospatial component in **BETA** (limited to ~1M points, "missing some functionality")
- ❌ Document store less optimal for relational data (stewardship roles, attribution flows)
- ❌ No native file storage mentioned (unclear how to handle audio assets)
- ❌ Newer platform (less mature ecosystem than PostgreSQL)

---

### Supabase Architecture

**Core Model:** PostgreSQL-based backend-as-a-service with extensions ecosystem

**Components:**
- **Database Layer:** PostgreSQL (industry-standard relational DB since 1996)
- **PostGIS Extension:** Mature geospatial capabilities (industry standard since 2005)
- **File Storage:** Native object storage (S3-compatible)
- **Real-time:** WebSocket-based real-time subscriptions (opt-in)
- **Deployment:** Cloud-hosted OR self-hosted (Docker)

**Primary Language:** PostgreSQL (SQL) + JavaScript/TypeScript client libraries

**Strengths:**
- ✅ PostGIS is **mature, battle-tested** geospatial standard (20+ years)
- ✅ Native file storage for audio assets
- ✅ SQL power for complex relational queries (stewardship, attribution)
- ✅ 50+ Postgres extensions (pgvector for future semantic search, pgrouting, etc.)
- ✅ Self-hostable (mesh topology compatible)
- ✅ Proven at scale (millions of production apps)

**Weaknesses:**
- ❌ Real-time requires configuration (not automatic like Convex)
- ❌ SQL-first (less developer-friendly than TypeScript-native for some teams)
- ❌ Less "reactive" paradigm (must explicitly subscribe to changes)

---

## II. Geospatial Capabilities Analysis

### Our Requirements (Prohibition Artifacts Use Case):

1. **Proximity Queries:** Find narratives within 50m, 100m, 500m radius
2. **Spatial Indexing:** Fast queries as dataset grows (10 artifacts → 100s → 1000s)
3. **Distance Calculations:** Sort by distance from user location
4. **Point-in-Polygon:** Future requirement for neighborhood boundaries, historical district overlays
5. **Multi-geometry Support:** Points (artifacts), Polygons (districts), LineStrings (routes)

---

### Convex Geospatial Component

**Status:** Beta (as of Jan 21, 2026 update)

**Capabilities:**
- ✅ Store and query points on Earth's surface
- ✅ Query points within rectangle on sphere
- ✅ Custom sort order and equality/IN filters
- ✅ Automatic consistency, reactivity, caching
- ✅ Tested up to ~1,000,000 points

**Limitations:**
- ❌ **Beta status** - "missing some functionality"
- ❌ Rectangle queries only (no circular radius queries like ST_DWithin)
- ❌ Points only (no Polygon, LineString, MultiPolygon support mentioned)
- ❌ Limited to ~1M points (may not scale for mesh with many cultural domains)
- ❌ Less mature than PostGIS (launched 2023 vs. 2005)

**Verdict for Our Use Case:** 🟡 **Functional but limited**. Can handle basic proximity queries for Prohibition artifacts, but beta status and lack of multi-geometry support are risks.

---

### Supabase PostGIS

**Status:** Production-ready (PostGIS since 2005, integrated into Supabase since 2020)

**Capabilities:**
- ✅ Full geometry support: Point, Polygon, LineString, MultiPolygon, GeometryCollection
- ✅ Spatial indexing (GiST, BRIN)
- ✅ `ST_DWithin` for circular radius queries (native proximity detection)
- ✅ `<->` operator for nearest-neighbor sorting (uses spatial index)
- ✅ Advanced functions: ST_Buffer, ST_Intersection, ST_Union, ST_Contains, etc.
- ✅ 3D geometry support (if needed for AR spatial anchors)
- ✅ Coordinate system transformations (SRID 4326 WGS84 → local projections)
- ✅ pgRouting extension for path finding (future: walking tour routes)
- ✅ Vector tile generation (Mapbox MVT format)

**Limitations:**
- ❌ SQL syntax learning curve (vs. TypeScript functions)
- ❌ Not reactive by default (must explicitly subscribe to changes)

**Verdict for Our Use Case:** ✅ **Exceeds requirements**. Production-ready, mature, supports all geometry types, proven at scale.

---

## III. Component-Specific Evaluation

### Component 1: Content Layer (Narratives)

**Requirements:**
- Store 10 Prohibition artifacts → scale to 100s of cultural domains (10,000+ narratives)
- Text content (title, body, tags, era)
- Metadata (sources, historical accuracy, crown status)
- Spatial location (GPS coordinates)

**Convex Approach:**
```typescript
// Document store
{
  _id: "narrative_123",
  title: "Green Mill Cocktail Lounge",
  body: "Step into the Green Mill...",
  tags: ["prohibition", "speakeasy"],
  location: { lat: 41.969153, lng: -87.659167 },
  metadata: { historicalAccuracy: "verified", ... }
}
```
**Strengths:** Flexible schema, easy to add fields
**Weaknesses:** No spatial indexing on nested `location` object (requires separate geospatial component)

**Supabase Approach:**
```sql
CREATE TABLE narratives (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT[],
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  metadata JSONB
);
CREATE INDEX ON narratives USING GIST(location);
```
**Strengths:** Native spatial type, spatial index, JSONB for flexible metadata
**Weaknesses:** Schema changes require migrations

**Verdict:** **Supabase better** for geospatial-primary data model. Spatial indexing on `location` column is critical for performance.

---

### Component 2: Voice Generation Layer (Audio Assets)

**Requirements:**
- Store audio files (MP3, WAV) for voice narration
- Metadata (duration, artist, transcript)
- CDN delivery for low-latency playback
- Future: multi-language audio variants

**Convex Approach:**
- No native file storage mentioned in documentation
- Likely requires external storage (S3, Cloudflare R2) + metadata in Convex
- Additional integration complexity

**Supabase Approach:**
```sql
-- Metadata in database
CREATE TABLE narratives (
  audio_url TEXT,  -- Points to Supabase Storage
  audio_duration_seconds INT
);
```
- Native Supabase Storage (S3-compatible)
- Automatic CDN integration
- Access control policies integrated with database auth

**Verdict:** **Supabase significantly better**. Native file storage is critical for audio assets. Convex would require external integration.

---

### Component 3: Governance Layer (Stewardship)

**Requirements:**
- Store stewardship roles (Cultural Memory, Technical Infrastructure, etc.)
- Track steward assignments per project
- Record governance decisions (CFI/SSI scores, Tier 1 veto events)
- Relational data (stewards → projects → decisions)

**Convex Approach:**
```typescript
// Document references
{
  _id: "steward_alice",
  role: "Cultural Memory",
  projects: ["prohibition_chicago", "civil_rights_atlanta"]
}
{
  _id: "prohibition_chicago",
  stewards: ["steward_alice", "steward_bob"]
}
```
**Strengths:** Flexible document structure
**Weaknesses:** No foreign key constraints, manual consistency management, less optimal for relational data

**Supabase Approach:**
```sql
CREATE TABLE stewards (id UUID PRIMARY KEY, name TEXT, role TEXT);
CREATE TABLE projects (id UUID PRIMARY KEY, name TEXT);
CREATE TABLE project_stewards (
  project_id UUID REFERENCES projects(id),
  steward_id UUID REFERENCES stewards(id),
  PRIMARY KEY (project_id, steward_id)
);
```
**Strengths:** Foreign key constraints, relational integrity, SQL joins for complex queries
**Weaknesses:** Less flexible for schema evolution

**Verdict:** **Supabase better** for relational stewardship data. Governance requires data integrity guarantees that SQL provides.

---

### Component 4: Real-time & Reactivity

**Requirements:**
- Proximity triggers (user approaches artifact, audio plays)
- Live updates (if narrative content changes, update all connected clients)
- Future: multi-user coordination (workshop participants see each other's contributions)

**Convex Approach:**
- ✅ **Automatic reactivity** - queries re-run when data changes, push to all clients
- ✅ Strong consistency (all clients see same state)
- ✅ TypeScript-native subscriptions
- No polling required

**Supabase Approach:**
- 🟡 **Opt-in real-time** - requires explicit subscription to tables/rows
- ✅ PostgreSQL LISTEN/NOTIFY for change notifications
- ✅ Row-level security policies apply to real-time subscriptions
- Requires configuration for each real-time table

**Verdict:** **Convex better** for real-time-first applications. If live multi-user coordination becomes primary requirement, Convex has architectural advantage.

---

## IV. Mesh Topology Compatibility

### Requirement: Self-Hosting for Mesh Nodes

**Cultural Current Mesh Principle:** OCAI is ONE node, communities should be able to self-host their cultural infrastructure.

**Convex Self-Hosting (as of Feb 2025):**
- ✅ Fully open source (FSL Apache 2.0 license)
- ✅ Docker deployment
- ✅ Can use PostgreSQL, MySQL, or SQLite backends
- ✅ Deploy to Fly.io, Coolify, Vercel, etc.
- 🟡 Recent feature (Feb 2025) - less mature than Supabase self-hosting

**Supabase Self-Hosting:**
- ✅ Open source (Apache 2.0)
- ✅ Docker Compose deployment (mature, well-documented)
- ✅ PostgreSQL native (no backend abstraction)
- ✅ Community-tested at scale

**Verdict:** **Both support self-hosting**, but Supabase has more mature self-hosting ecosystem (deployed since 2020 vs. 2025).

---

## V. Strategic Fit Analysis

### A. Component Slicing Architecture Compatibility

**Question:** Does Convex or Supabase better support our modular deployment slices?

| Slice | Geospatial | Audio Storage | Real-time | Self-hosting | Convex Fit | Supabase Fit |
|-------|-----------|--------------|-----------|-------------|-----------|-------------|
| Conference | Static map | Pre-recorded | Not needed | Not needed | ✅ | ✅ |
| Dev Post | Proximity queries | Spec only | Not needed | Not needed | 🟡 (beta geo) | ✅ |
| Pop-Up | Live proximity | Live audio | Optional | Optional | 🟡 | ✅ |
| Workshop | Multi-user | Live audio | **Required** | Optional | ✅ | 🟡 |
| Commercial | Production geo | CDN audio | Optional | **Required** | 🟡 | ✅ |

**Analysis:**
- **Conference/Dev Post:** Both work, but Supabase's mature PostGIS is safer
- **Pop-Up:** Supabase better (native audio storage critical)
- **Workshop:** Convex better (real-time multi-user collaboration)
- **Commercial:** Supabase better (production-ready geospatial + self-hosting maturity)

**Verdict:** **Supabase better for 4/5 slices**. Convex has advantage for Workshop slice (real-time collaboration).

---

### B. IGNIS-ADAPT Governance Compatibility

**Question:** Does the database architecture support constitutional substrate enforcement?

**Tier 1 Veto Implementation:**

**Convex Approach:**
```typescript
// Server function with CFI check
export const createNarrative = mutation({
  handler: async (ctx, args) => {
    const cfi = await calculateCFI(args);
    if (cfi < 0.50) {
      throw new Error("TIER 1 VETO: CFI threshold violated");
    }
    return await ctx.db.insert("narratives", args);
  }
});
```
**Strengths:** TypeScript logic, easy to implement
**Weaknesses:** Application-level enforcement (can be bypassed if DB accessed directly)

**Supabase Approach:**
```sql
-- Database-level constraint
CREATE OR REPLACE FUNCTION enforce_cfi_threshold()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.metadata->>'cfi')::NUMERIC < 0.50 THEN
    RAISE EXCEPTION 'TIER 1 VETO: CFI threshold violated';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cfi_enforcement
  BEFORE INSERT OR UPDATE ON narratives
  FOR EACH ROW EXECUTE FUNCTION enforce_cfi_threshold();
```
**Strengths:** Database-level enforcement (cannot be bypassed)
**Weaknesses:** Requires SQL knowledge

**Verdict:** **Supabase better** for constitutional enforcement. Database-level constraints are more robust than application-level checks.

---

### C. B2B Model & Feedback Loop Support

**Question:** Which platform better supports institutional partnerships and feedback collection?

**Convex:**
- ✅ Real-time analytics (automatic query re-runs capture usage patterns)
- ✅ TypeScript-native (easier for dev partners to integrate)
- 🟡 Less mature ecosystem for BI tools

**Supabase:**
- ✅ SQL-based analytics (mature BI tool ecosystem: Metabase, Redash, etc.)
- ✅ PostgreSQL compatibility (institutions can use existing tools)
- ✅ Connection pooling for B2B scale
- 🟡 Real-time analytics require more configuration

**Verdict:** **Supabase better** for B2B. Institutional partners expect SQL compatibility and mature BI tools.

---

## VI. Cost & Operational Considerations

### Pricing Models (as of 2026):

**Convex:**
- Free tier: Included functionality, reasonable limits
- Pro tier: Usage-based pricing (reads, writes, storage, bandwidth)
- Self-hosted: Free (open source, you manage infrastructure)

**Supabase:**
- Free tier: 500MB database, 1GB file storage, 2GB bandwidth
- Pro tier: $25/month base + usage
- Self-hosted: Free (open source, you manage infrastructure)

**Operational Complexity:**

**Convex:**
- Simpler for real-time-first apps (less configuration)
- TypeScript-native reduces context switching
- Newer platform (less Stack Overflow answers, fewer tutorials)

**Supabase:**
- More complex for real-time (explicit subscriptions)
- SQL learning curve
- Mature ecosystem (abundant tutorials, community support)

**Verdict:** **Depends on team skills**. If team is TypeScript-heavy, Convex is simpler. If team has SQL/PostgreSQL experience, Supabase leverages existing knowledge.

---

## VII. Future-Proofing Analysis

### Scenario 1: Spatial Computing Layer (Meta IWSDK, Mapillary)

**Requirement:** Store 3D spatial anchors, AR content positions, historical overlays

**Convex:** Document store could handle JSON spatial data, but no native 3D geometry support

**Supabase:** PostGIS supports 3D geometries (PointZ, PolygonZ), proven for AR applications

**Verdict:** **Supabase better** for spatial computing future.

---

### Scenario 2: Semantic Search (Vespa.ai, pgvector)

**Requirement:** "Find narratives similar to this one" (vector embeddings)

**Convex:** No native vector search (would require external Vespa.ai integration)

**Supabase:** pgvector extension available, native similarity search in PostgreSQL

**Verdict:** **Supabase better** for semantic search future.

---

### Scenario 3: Multi-User Workshop Real-Time Collaboration

**Requirement:** 20 workshop participants create artifacts simultaneously, see each other's work live

**Convex:** Automatic reactivity shines here—all clients update instantly, strong consistency

**Supabase:** Requires real-time subscriptions + manual conflict resolution logic

**Verdict:** **Convex significantly better** for real-time collaboration.

---

### Scenario 4: Mesh Node Federation (Cross-Institution Coordination)

**Requirement:** Museum's cultural graph connects to Tribe's cultural graph, queries span both

**Convex:** Can federate via HTTP APIs, but no native federation protocol

**Supabase:** PostgreSQL Foreign Data Wrappers (FDW) allow querying remote databases as local tables

**Verdict:** **Supabase better** for federated queries. FDW is mature SQL federation mechanism.

---

## VIII. Hybrid Architecture Consideration

### Possibility: Use BOTH

**Architecture:**
```
Primary Database: Supabase (PostgreSQL + PostGIS)
├─ Narratives (geospatial data)
├─ Audio metadata (links to Supabase Storage)
├─ Stewardship (relational governance data)
└─ Historical records (immutable audit log)

Real-Time Coordination: Convex (for specific use cases)
├─ Workshop multi-user collaboration
├─ Live event coordination (pop-ups)
└─ Admin dashboard live updates
```

**Sync Strategy:**
- Supabase is source of truth
- Convex replicates relevant data for real-time features
- Write back to Supabase periodically

**Strengths:**
- ✅ Best of both worlds (mature geospatial + real-time reactivity)
- ✅ Use each tool for its strength

**Weaknesses:**
- ❌ Operational complexity (two databases to manage)
- ❌ Sync logic complexity (eventual consistency challenges)
- ❌ Increased cost (two platforms)

**Verdict:** **Viable for future, premature for MVP**. Start with Supabase, add Convex later if Workshop slice demands real-time collaboration.

---

## IX. Recommendation Matrix

### For Prohibition Artifacts (Current Implementation):

| Criterion | Weight | Convex Score | Supabase Score | Rationale |
|----------|--------|-------------|---------------|-----------|
| Geospatial Maturity | **Critical** | 🟡 Beta (6/10) | ✅ Production (10/10) | PostGIS is industry standard, Convex geo is beta |
| Audio Storage | **Critical** | ❌ External (3/10) | ✅ Native (10/10) | Supabase Storage native, Convex requires external |
| Governance Enforcement | **Critical** | 🟡 App-level (6/10) | ✅ DB-level (10/10) | SQL constraints enforce Tier 1 veto at DB level |
| Real-time Reactivity | Important | ✅ Automatic (10/10) | 🟡 Opt-in (7/10) | Convex wins, but not critical for Prohibition artifacts |
| Self-Hosting Maturity | Important | 🟡 New (7/10) | ✅ Mature (10/10) | Supabase self-hosting battle-tested since 2020 |
| B2B Ecosystem | Important | 🟡 Growing (6/10) | ✅ Mature (9/10) | SQL compatibility, BI tools, institutional familiarity |
| Developer Experience | Moderate | ✅ TypeScript (9/10) | 🟡 SQL (7/10) | Convex more modern DX, but SQL is well-known |
| **Total Weighted Score** | | **6.4/10** | **9.3/10** | **Supabase wins for Prohibition artifacts** |

**Recommendation:** **Retain Supabase** for Prohibition Artifacts implementation.

---

### For Future Mesh Nodes (Other Cultural Domains):

**Recommendation:** **Evaluate per use case**

**Use Convex when:**
- ✅ Real-time collaboration is **primary requirement** (workshop multi-user, live events)
- ✅ Team is TypeScript-heavy, minimal SQL experience
- ✅ Geospatial needs are simple (points only, <1M records)
- ✅ Audio assets stored externally anyway (CDN, external storage)

**Use Supabase when:**
- ✅ Geospatial queries are **primary use case** (proximity detection, routing)
- ✅ Audio/media storage required
- ✅ Relational governance data (stewardship, attribution)
- ✅ Institution partners expect SQL compatibility
- ✅ Need mature self-hosting (mesh node sovereignty)

---

## X. Action Items

### Immediate (Prohibition Artifacts):

1. ✅ **Retain Supabase architecture** - No changes required
2. ✅ **Document decision rationale** - This document serves as record
3. 🟡 **Monitor Convex geospatial maturity** - Re-evaluate when geospatial component exits beta

### Short-Term (Workshop Slice):

1. 🔴 **Evaluate Convex for Workshop real-time collaboration** - If multi-user live editing becomes requirement
2. 🔴 **Prototype hybrid architecture** - Supabase as source of truth + Convex for real-time layer (optional)

### Long-Term (Mesh Federation):

1. 🟡 **Document mesh node database requirements** - Allow each node to choose (Supabase, Convex, self-hosted PostgreSQL)
2. 🟡 **Design FSLS (Federated Semantic Layer Specification)** - Protocol for mesh nodes to query each other regardless of underlying database
3. 🟡 **Evaluate PostgreSQL Foreign Data Wrappers** - For federated queries across mesh nodes

---

## XI. Conclusion

**For our current needs (Prohibition Artifacts, Cultural Current Mesh infrastructure), Supabase remains the correct choice.**

**Key Reasons:**
1. **Mature PostGIS** - Production-ready geospatial is critical (Convex geo is beta)
2. **Native file storage** - Audio assets require integrated storage (Convex lacks this)
3. **SQL governance** - Database-level constraints enforce IGNIS-ADAPT Tier 1 veto
4. **B2B ecosystem** - Institutional partners expect SQL compatibility
5. **Self-hosting maturity** - Mesh node sovereignty requires proven self-hosting

**However, Convex is compelling for future use cases:**
1. **Workshop multi-user collaboration** - Real-time reactivity is architectural advantage
2. **TypeScript-native teams** - Better developer experience than SQL for some teams
3. **Mesh node diversity** - Allowing nodes to choose databases increases ecosystem resilience

**Hybrid approach is viable for future:** Supabase as primary database + Convex for specific real-time collaboration features. But this adds operational complexity that's premature for MVP.

**Decision:** **Retain Supabase, monitor Convex, re-evaluate for Workshop slice if real-time collaboration becomes critical requirement.**

---

## XII. Sources

- [Convex.dev Platform Overview](https://www.convex.dev/)
- [Convex Geospatial Component](https://www.convex.dev/components/geospatial)
- [Convex GitHub Repository](https://github.com/get-convex/convex-backend)
- [Convex vs Supabase Comparison 2025 - Makers' Den](https://makersden.io/blog/convex-vs-supabase-2025)
- [Convex vs Supabase: The Definitive Comparison (2026) - ScratchDB](https://scratchdb.com/compare/convex-vs-supabase/)
- [Convex vs Supabase Detailed Comparison - OpenAlternative](https://openalternative.co/compare/convex/vs/supabase)
- [Supabase PostGIS Documentation](https://supabase.com/docs/guides/database/extensions/postgis)
- [Real-Time Database Guide - Convex](https://stack.convex.dev/real-time-database)

---

**END OF EVALUATION**
