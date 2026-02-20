# USA 250 Impact — Cultural Current Mesh

**Branch:** `claude/seed-prohibition-artifacts-0p840`
**Pilot:** Chicago Prohibition Resistance Trail (7 stops, 1920-1933)
**Model:** B2B | Place Packet | Component Modular Build

---

## Quick Navigation

| What | Where |
|------|-------|
| Architecture docs | [`docs/`](#architecture-docs) |
| Database schema | [`supabase/migrations/`](#database) |
| 10 Prohibition site seeds | [`supabase/seeds/`](#database) |
| TypeScript seed data | [`seeds/prohibition-artifacts.ts`](seeds/prohibition-artifacts.ts) |
| React components | [`components/`](#components) |
| Design tokens | [`src/tokens/`](src/tokens/) |
| GrowthBook sovereignty flags | [`src/config/growthbook-sovereignty.ts`](src/config/growthbook-sovereignty.ts) |
| Deployment slices (5) | [COMPONENT_SLICING_ARCHITECTURE.md](docs/COMPONENT_SLICING_ARCHITECTURE.md) |

---

## Branch Crosswalk

| Branch | Purpose | Key Files |
|--------|---------|-----------|
| `claude/seed-prohibition-artifacts-0p840` (this) | Prohibition Trail pilot + architecture docs | `supabase/`, `seeds/`, `docs/`, `src/config/`, `components/place-packet/ProhibitionTrailPacket.tsx` |
| `claude/gtm-strategy-dashboard-qx0dJ` | GTM Component Library (merged into this branch) | `components/`, `src/tokens/`, `apps/wine-micro-experience/` |
| `cultura-d-content-arch` | Foundation — Guild Academy Charter | `Guild_Academy_Charter.tsx` |

---

## Architecture Docs

| Doc | Purpose |
|-----|---------|
| [COMPONENT_SLICING_ARCHITECTURE.md](docs/COMPONENT_SLICING_ARCHITECTURE.md) | 10 components × 5 deployment slices (Conference / Pop-Up / Workshop / Commercial / Dev Post) |
| [VOICE_INTERACTION_SPEC.md](docs/VOICE_INTERACTION_SPEC.md) | 4-zone proximity model, Hume.ai atmospheric config, Inngest event triggers |
| [VERCEL_TOOLCHAIN_INTEGRATION.md](docs/VERCEL_TOOLCHAIN_INTEGRATION.md) | Inngest + Sanity + Descope + Felt integration map + data flow |
| [CONVEX_VS_SUPABASE_EVALUATION.md](docs/CONVEX_VS_SUPABASE_EVALUATION.md) | ADR: Supabase retained (9.3/10 vs Convex 6.4/10) |
| [VESPA_GROWTHBOOK_EVALUATION.md](docs/VESPA_GROWTHBOOK_EVALUATION.md) | GrowthBook: immediate; Vespa: Phase 2 after pgvector validation |
| [RECONCILIATION_FOOTNOTE.md](docs/RECONCILIATION_FOOTNOTE.md) | TURBO-c vs Digital Campfire v3.0 — what we solved, avoided, what remains |

---

## Database

**Stack:** Supabase (PostgreSQL + PostGIS + pgvector)

```
supabase/
├── migrations/
│   └── 001_create_narratives_schema.sql   PostGIS schema, RLS, proximity functions
└── seeds/
    └── 002_seed_prohibition_artifacts.sql  10 Chicago sites (7 trail stops + 3 supporting)
```

**Tables:**
- `sites` — geographic anchor points (`GEOGRAPHY(Point, 4326)`)
- `narratives` — 3 layers per site (historical / community_memory / sensory_atmosphere)
- `sovereignty_rules` — IGNIS-ADAPT governance hooks (ECP 70/20/10 auto-inserted)
- `governance_events` — audit log (CFI/SSI changes, tier events)
- `contribution_queue` — Tend loop steward submissions
- `share_events` — Transmit loop tracking

**Key functions:**
- `sites_within_radius(lat, lng, radius_meters)` — proximity query
- `get_proximity_zone(user_lat, user_lng, site_id)` — returns zone 0-3

---

## Components

| Component | File | Purpose |
|-----------|------|---------|
| PlacePacketShell | `components/place-packet/PlacePacketShell.tsx` | Base render container (stable layout, adaptive theme) |
| **ProhibitionTrailPacket** | `components/place-packet/ProhibitionTrailPacket.tsx` | Heritage Trail pilot — 7 stops, 3 layers, sovereignty gates |
| GTMAcceleratorDashboard | `components/gtm/GTMAcceleratorDashboard.tsx` | Spatial intelligence dashboard |
| GuildAcademyCharter | `components/guild/GuildAcademyCharter.tsx` | SCID/DACUM vocational training scaffold |
| HumancodeWine | `components/narrative/HumancodeWine.tsx` | Crime→Culture narrative engine (wine pilot template) |
| FeltIntegration | `src/examples/FeltIntegration.tsx` | Felt.com collaborative map example |

### Using ProhibitionTrailPacket

```tsx
import { ProhibitionTrailPacket } from "@components/place-packet/ProhibitionTrailPacket"

// Conference Slice (Level 0 — read-only, no governance overhead)
<ProhibitionTrailPacket sovereigntyLevel={0} proximityZone={2} />

// Pop-Up Slice (Level 1 — community memory + Hume.ai + share)
<ProhibitionTrailPacket sovereigntyLevel={1} proximityZone={3} />

// Workshop Slice (Level 2 — full governance + SCID mode)
<ProhibitionTrailPacket sovereigntyLevel={2} initialStopIndex={0} />
```

---

## Approved Technology Stack

| Tool | Role | Decision |
|------|------|----------|
| **Supabase** | PostGIS geospatial + pgvector + audio storage + RLS governance | Retained over Convex (9.3 vs 6.4) |
| **Inngest** | Tend & Transmit event workflows | Replaces Convex real-time |
| **Sanity.io** | Narrative CMS + palimpsest versioning | Content source of truth |
| **Descope** | Passwordless auth + steward roles | Passkeys + magic links |
| **Felt.com** | Collaborative map layer | Real-time multiplayer |
| **GrowthBook** | Sovereignty level feature flags | Immediate — Phase 1.5 |
| **Hume.ai** | Atmospheric voice (Layer 3 sensory) | Pre-recorded default; live = Pop-Up only |
| **Vespa.ai** | Semantic cultural search | Phase 2 — after pgvector validation |

---

## Chicago Prohibition Resistance Trail — 10 Artifacts

| Stop | Site | Era | CFI |
|------|------|-----|-----|
| 1 (Trailhead) | Green Mill Cocktail Lounge | 1907–1933 | 0.72 |
| 2 | St. Valentine's Day Massacre Site | 1929 | 0.85 |
| 3 | Holy Name Cathedral | 1926 | 0.80 |
| 4 | Schofield's Flower Shop | 1926 | 0.78 |
| 5 | The Four Deuces (2222 S. Wabash) | 1920–1923 | 0.82 |
| 6 | Colosimo's Cafe | 1910–1920 | 0.79 |
| 7 (Trail End) | Metro Theatre / Aragon Ballroom | 1926–1933 | 0.75 |
| — | Lexington Hotel (Capone HQ) | 1928–1931 | 0.80 |
| — | Chicago Cultural Center | 1920–1933 | 0.77 |
| — | Bronzeville / Pullman Porter Community | 1920–1933 | 0.85 |

---

## IGNIS-ADAPT Governance

| Tier | Threshold | Action |
|------|-----------|--------|
| 1 | CFI or SSI < 0.50 | Hard veto — project termination |
| 2 | CFI or SSI < 0.65 | Recertification required |
| 3 | Both >= 0.80 | Enhancement eligible |

**Current SSI for Prohibition Trail: ~0.30** (below Tier 1 threshold)
- Conference Slice deployable at Level 0 (governance in monitor mode)
- Pop-Up requires: Narrative Editor + Boundary & Access Steward assigned (SSI -> 0.50+)

**ECP Distribution:** 70% creators / 20% community / 10% platform (auto-inserted via DB trigger)

---

## Installation

```bash
npm install
npm run dev        # Next.js dev server
npm run build      # Production build
npm run lib:build  # Component library build (Vite)
```

See [docs/VERCEL_TOOLCHAIN_INTEGRATION.md](docs/VERCEL_TOOLCHAIN_INTEGRATION.md) for environment variables.

## License

MIT
