# USA250 Impact - Cultural Current Mesh

**Content apparatus for USA250 Story Trails with after-event impact and infrastructure** (FDAGI format) - A voice-driven, location-based cultural storytelling platform for heritage tourism and sovereign narrative preservation.

[![Repository](https://img.shields.io/badge/GitHub-CultureSpatial%2FUSA250__impact-blue)](https://github.com/CultureSpatial/USA250_impact)
[![Branch](https://img.shields.io/badge/branch-claude%2Fseed--prohibition--artifacts-green)](#)
[![License](https://img.shields.io/badge/license-See%20LICENSE-orange)](./LICENSE)

---

## 🎯 Project Vision

**Cultural Current Mesh (CCM)** is a peer-to-peer infrastructure for voice-driven, location-based storytelling that prioritizes **cultural sovereignty** over platform centralization. Built for the USA250 (2026) heritage tourism initiative, starting with **10 Chicago Prohibition-era artifacts** (1920-1933).

### Core Principles

1. **Governance First** - IGNIS-ADAPT constitutional substrate with Tier 1 veto power prevents institutional capture
2. **Mesh Topology** - OCAI is ONE node in CCM, not the center. Communities self-host their cultural infrastructure.
3. **B2B Focus** - Institutional partnerships (museums, venues, tribal councils), NOT consumer direct
4. **Human Capacity Building** - SCID/DACUM vocational training as pivotal revenue AND cost center
5. **Component Modular** - NOT timeline-based deployment. Sliced versions for conferences, pop-ups, workshops, commercial engagements.

**"New Organizational Species"** - Cognizant of externalities (institutional capture, cultural appropriation, economic extraction), governed by constitutional constraints (CFI, SSI, MVR).

---

## 📚 Documentation Cross-Reference

### Current Branch: `claude/seed-prohibition-artifacts-0p840`

This branch contains the **core architecture** and **Prohibition artifacts implementation**.

#### 🏗️ Architecture Documents (`/docs/`)

| Document | Purpose | Size | Status |
|----------|---------|------|--------|
| [**COMPONENT_SLICING_ARCHITECTURE.md**](./docs/COMPONENT_SLICING_ARCHITECTURE.md) | Modular deployment framework - 5 slices (Conference, Pop-Up, Dev Post, Workshop, Commercial) | 33KB | ✅ Core Framework |
| [**CONVEX_VS_SUPABASE_EVALUATION.md**](./docs/CONVEX_VS_SUPABASE_EVALUATION.md) | Database comparison - **Decision: Retain Supabase** (9.3/10 vs 6.4/10) | 23KB | ✅ Decision Rationale |
| [**VERCEL_TOOLCHAIN_INTEGRATION.md**](./docs/VERCEL_TOOLCHAIN_INTEGRATION.md) | Inngest + Sanity + Descope + Felt integration architecture | 21KB | ✅ Stack Integration |
| [**VESPA_GROWTHBOOK_EVALUATION.md**](./docs/VESPA_GROWTHBOOK_EVALUATION.md) | Semantic search (Vespa.ai) + Feature flags (GrowthBook) evaluation | 31KB | ✅ Phase 2 Tools |
| [**VOICE_INTERACTION_SPEC.md**](./docs/VOICE_INTERACTION_SPEC.md) | Hume.ai voice synthesis + proximity detection system | 12KB | ✅ Voice UX Design |
| [**RECONCILIATION_FOOTNOTE.md**](./docs/RECONCILIATION_FOOTNOTE.md) | TURBO-c warnings vs current implementation - What we solved/avoided | 29KB | ✅ Design Learnings |

#### 🗄️ Database & Data (`/supabase/`, `/seeds/`)

| File | Purpose | Size | Status |
|------|---------|------|--------|
| [**supabase/migrations/001_create_narratives_schema.sql**](./supabase/migrations/001_create_narratives_schema.sql) | PostgreSQL + PostGIS schema for geospatial narratives | 5.7KB | ✅ Production Ready |
| [**supabase/seeds/002_seed_prohibition_artifacts.sql**](./supabase/seeds/002_seed_prohibition_artifacts.sql) | 10 Chicago Prohibition artifacts with historical verification | 28KB | ✅ Production Ready |
| [**seeds/prohibition-artifacts.ts**](./seeds/prohibition-artifacts.ts) | TypeScript/JSON format with helper functions | 29KB | ✅ Production Ready |
| [**README_PROHIBITION_ARTIFACTS.md**](./README_PROHIBITION_ARTIFACTS.md) | Setup guide for Prohibition artifacts implementation | - | ✅ Setup Guide |

#### 📊 Capability Analysis

| File | Purpose | Size | Status |
|------|---------|------|--------|
| [**docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv**](./docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv) | 22 capability gaps with priority/complexity matrix | 5.6KB | ✅ Active Roadmap |

**Note:** Row 10 (Proof-of-Visit NFT Minting) **cancelled** - "we donot do web3"

---

### Other Branches

#### Branch: `claude/gtm-strategy-dashboard-qx0dJ`

**GTM Accelerator Components** - Market strategy visualization, guild management, Atlassian Compass integration

**Key Documents:**
- `COMPASS_CROSSWALK.md` - Atlassian Compass integration
- `COMPASS_SETUP_GUIDE.md` - Setup for Compass API connection
- `COMPONENT_LIBRARY_SUMMARY.md` - React component library overview
- `INTEGRATION_GUIDE.md` - Implementation patterns
- Components: GTM Dashboard, Guild Charter, Humancode Wine (Crime-to-Culture narrative engine)

**View Branch:**
```bash
git checkout claude/gtm-strategy-dashboard-qx0dJ
```

#### Branch: `cultura-d-content-arch`

**Foundation Branch** - Original Guild Academy Charter

**Key Files:**
- `Guild_Academy_Charter.tsx` - Technical infrastructure R&D framework

**View Branch:**
```bash
git checkout cultura-d-content-arch
```

#### Branch: `main`

**Production Branch** - Merged work from other branches

**View Branch:**
```bash
git checkout main
```

---

## 🏛️ Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js)                      │
│  Deployment + Edge Functions + GrowthBook SDK            │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────────────┐
        ↓                   ↓                           ↓
┌───────────────┐  ┌────────────────┐  ┌────────────────────┐
│   INNGEST     │  │   SANITY.IO    │  │   DESCOPE          │
│  Workflows    │  │   Content CMS  │  │   Auth             │
│               │  │                │  │                    │
│ • Orchestrate │  │ • Narratives   │  │ • Passwordless     │
│ • CFI calc    │  │ • GROQ queries │  │ • Steward roles    │
│ • Durable exec│  │ • Workflow     │  │ • RLS tokens       │
└───────────────┘  └────────────────┘  └────────────────────┘
        ↓                   ↓                           ↓
        └───────────────────┼───────────────────────────┘
                            ↓
        ┌───────────────────┴───────────────────────────┐
        ↓                                               ↓
┌────────────────┐                            ┌─────────────────┐
│   FELT.COM     │                            │   SUPABASE      │
│   Mapping      │                            │   Database      │
│                │                            │                 │
│ • Real-time    │                            │ • PostgreSQL    │
│ • Collab       │◄───geospatial queries─────►│ • PostGIS       │
│ • API          │                            │ • Storage       │
│ • Webhooks     │                            │ • Real-time     │
└────────────────┘                            │ • RLS           │
                                              └─────────────────┘
                                                       ↓
        ┌──────────────────────────────────────────────┴────┐
        ↓                                                   ↓
┌────────────────┐                              ┌──────────────────┐
│  VESPA.AI      │                              │  GROWTHBOOK      │
│  Semantic      │                              │  Experiments     │
│                │                              │                  │
│ • Embeddings   │                              │ • Feature flags  │
│ • Hybrid search│                              │ • A/B testing    │
│ • Patterns     │                              │ • Progressive    │
│ (Phase 2)      │                              │   complexity     │
└────────────────┘                              └──────────────────┘
```

### Data Flow: User Creates Narrative at Workshop

1. **Authentication (Descope)** - User signs in with passkey
2. **Content Creation (Sanity)** - Historian authors narrative with rich editor
3. **Workflow Triggered (Inngest)** - Multi-step orchestration:
   - Calculate CFI (Cultural Fidelity Index)
   - Check Tier 1 threshold (< 0.50 = project termination)
   - Geocode location
   - Store in Supabase (PostGIS for geospatial queries)
   - Update Felt map (real-time update for all workshop participants)
   - Notify stewards
4. **Real-Time Updates** - All workshop participants see new point on Felt map
5. **Governance Check** - Cultural Memory steward approves via Sanity workflow

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account (or self-hosted instance)
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/CultureSpatial/USA250_impact.git
cd USA250_impact

# Checkout Prohibition artifacts branch
git checkout claude/seed-prohibition-artifacts-0p840

# Install dependencies (if Next.js app exists)
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase, Sanity, Descope, Felt, Inngest credentials
```

### Database Setup

```bash
# Initialize Supabase (if using Supabase CLI)
supabase init
supabase db reset  # Runs migrations + seeds

# Or manually run SQL files:
# 1. Run supabase/migrations/001_create_narratives_schema.sql
# 2. Run supabase/seeds/002_seed_prohibition_artifacts.sql
```

**See [README_PROHIBITION_ARTIFACTS.md](./README_PROHIBITION_ARTIFACTS.md) for detailed setup.**

---

## 🗺️ Component Slicing: Deployment Strategies

### What is Component Slicing?

**NOT a linear timeline** (Phase 1 → Phase 2 → Phase 3). Instead, **modular components** deployed in different configurations for different contexts.

### 5 Deployment Slices

| Slice | Components Active | Governance Level | Use Case |
|-------|------------------|------------------|----------|
| **Conference** | Sanity (read-only) + Felt (static map) | Documentation only | Academic presentations, tech showcases |
| **Pop-Up Event** | Descope + Felt + Inngest + Sanity + Supabase | Informal stewards | Digital Campfire at Green Mill, scavenger hunts |
| **Dev Post** | Full stack (open-source) | Framework docs | Blog posts, GitHub showcases, dev community |
| **Workshop** | Descope + Sanity + Inngest + Felt + Supabase | Active role assignment | 20 participants creating narratives, live collab |
| **Commercial** | Full stack + Governance | Constitutional substrate | Museum partnerships, tourism boards, licensing |

**Control via GrowthBook Feature Flags:**

```typescript
const features = {
  "governance-tier1-veto": {
    conference: false,
    popup: false,
    workshop: true,
    commercial: true
  },
  "hume-voice-synthesis": {
    conference: false,  // Pre-recorded audio
    popup: true,        // Live synthesis
    workshop: true,
    commercial: true
  }
}
```

**See [COMPONENT_SLICING_ARCHITECTURE.md](./docs/COMPONENT_SLICING_ARCHITECTURE.md) for full details.**

---

## 🛡️ Governance: IGNIS-ADAPT Framework

### Three-Tier Constitutional Substrate

**Tier 1: VETO** (Project Termination)
- **CFI (Cultural Fidelity Index)** < 0.50 → Project ends (no exceptions, no board vote)
- **SSI (Sovereign Stewardship Index)** < 0.50 → Project ends
- **MVR (Minimum Viable Revenue)** not met by SRL 3 → Project ends

**Tier 2: RECERTIFICATION** (Hard Pause)
- Governance review required before proceeding
- Steward approval needed

**Tier 3: ENHANCEMENT** (Optimization)
- Recommendations for improvement
- Not blocking

### Modular Stewardship Councils

Communities select which modules to activate:

1. **Cultural Memory** - Historians, community elders (validate narratives)
2. **Boundary & Access** - Ethics, sensitive stories (sacred content protection)
3. **Technical Infrastructure** - Developers, spatial UX (maintain systems)
4. **Economic Sustainability** - Financial stewards (regenerative revenue model)
5. **Movement & Innovation** - Experimentation within bounds (balance tradition/innovation)

**Current Gap:** Prohibition project has **SSI ~0.30** (below 0.50 threshold). Need to assign stewards before Workshop/Commercial slices can deploy.

**See [COMPONENT_SLICING_ARCHITECTURE.md](./docs/COMPONENT_SLICING_ARCHITECTURE.md) for governance details.**

---

## 📊 Capability Gaps & Roadmap

### From `docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv`

**22 capabilities analyzed** with priority/complexity matrix. Key gaps:

| Capability | Status | Priority | Phase |
|-----------|--------|----------|-------|
| Geospatial Coordinate Anchoring | ⚠️ PARTIAL | Critical | **Phase 1** (PostGIS implemented) |
| Perspective Classification (SYSTEMIC/PERSONAL/COLLECTIVE) | ❌ NO | High | **Phase 2** (Vespa.ai) |
| Collective vs Personal Pattern Detection | ⚠️ PARTIAL | High | **Phase 2** (Vespa.ai) |
| Shadow Layer / Dark Nodes (Graduated Visibility) | ❌ NO | Critical | **Phase 1.5** (GrowthBook) |
| Geofence-Triggered Narrative Revelation | ❌ NO | Critical | **Phase 2** (Mobile app) |
| Metadata Decay Warnings | ❌ NO | High | **Phase 2** (Temporal urgency) |
| AT Protocol Integration (Federated Sovereignty) | ❌ NO | Medium | **Phase 3** (Mesh federation) |
| ~~Proof-of-Visit NFT Minting~~ | ❌ **CANCELLED** | Low | ~~Phase 3~~ (No Web3) |

**Full analysis:** [docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv](./docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv)

---

## 🧩 10 Chicago Prohibition Artifacts (1920-1933)

### Implemented Narratives

1. **Green Mill Cocktail Lounge** (41.9692°, -87.6592°) - Still standing
   - Al Capone's booth, secret tunnels, jazz atmosphere
2. **St. Valentine's Day Massacre Site** (41.9205°, -87.6378°) - Demolished
   - Gang violence, historical trauma, neighborhood impact
3. **Lexington Hotel / Capone's HQ** (41.8520°, -87.6233°) - Demolished
   - Power center of Chicago's underworld
4. **Holy Name Cathedral** (41.8959°, -87.6276°) - Still standing
   - Hymie Weiss shooting, sanctuary violence
5. **Colosimo's Cafe** (41.8527°, -87.6262°) - Demolished
   - Johnny Torrio's rise, organized crime origins
6. **Twin Anchors Restaurant** (41.9116°, -87.6367°) - Still standing
   - Sinatra's favorite, speakeasy survivor
7. **Green Door Tavern** (41.8946°, -87.6374°) - Still standing
   - Tilted building, Chicago Fire survivor
8. **Schofield's Flower Shop** (41.8960°, -87.6276°) - Demolished
   - Dion O'Banion murder, bootlegger territory
9. **The Four Deuces** (41.8531°, -87.6260°) - Demolished
   - Capone's first headquarters, brothel + speakeasy
10. **The 226 Club / Exchequer** (41.8798°, -87.6265°) - Still standing
    - Underground passages, Loop speakeasy network

**Each narrative includes:**
- 2-3 paragraph historical storytelling (voice-optimized)
- GPS coordinates (verified)
- Historical sources (National Trust, Chicago Architecture Center)
- Voice narration notes (Hume.ai atmospheric configuration)
- CFI (Cultural Fidelity Index) score
- Proximity trigger radius (50m default)

**Full data:** [supabase/seeds/002_seed_prohibition_artifacts.sql](./supabase/seeds/002_seed_prohibition_artifacts.sql)

---

## 💰 Cost Analysis

### Current Stack (Phase 1 - MVP)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Hobby | $0 |
| Supabase | Free | $0 (500MB DB, 1GB storage) |
| Inngest | Free | $0 (100K executions/month) |
| Sanity | Free | $0 (3 users, unlimited API) |
| Descope | Free | $0 (7,500 MAU) |
| Felt | TBD | TBD |
| **Total** | | **$0-25** |

### Phase 1.5 (+ GrowthBook - Immediate)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| + GrowthBook | Cloud Free | $0 (3 users, unlimited experiments) |
| **Total** | | **$0-25** |

### Phase 2 (+ Vespa.ai - Semantic Search)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| + Vespa.ai | Cloud Dev | $0 (limited scale) |
| **OR** pgvector in Supabase | Included | $0 |
| **Total** | | **$0-25** (with pgvector alternative) |

### Phase 3 (Production - Full Scale)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Sanity | Growth | $99 |
| Vespa.ai | Cloud Production | $500-2000 |
| Others | Free tiers | $0 |
| **Total** | | **$644-2144** |

**See [VERCEL_TOOLCHAIN_INTEGRATION.md](./docs/VERCEL_TOOLCHAIN_INTEGRATION.md) for detailed cost breakdown.**

---

## 🔍 Technology Decisions & Rationale

### Database: Supabase vs Convex

**Decision: Supabase** (Score: 9.3/10 vs 6.4/10)

**Why:**
- ✅ PostGIS is production-ready (Convex geospatial is beta)
- ✅ Native file storage for audio (Convex requires external S3)
- ✅ Database-level governance (SQL constraints enforce IGNIS-ADAPT Tier 1 veto)
- ✅ B2B ecosystem maturity (SQL compatibility, institutional familiarity)
- ✅ Self-hosting battle-tested (mesh sovereignty)

**See [CONVEX_VS_SUPABASE_EVALUATION.md](./docs/CONVEX_VS_SUPABASE_EVALUATION.md) for full analysis.**

---

### Vercel-Native Toolchain vs Custom Build

**Decision: Vercel-Native (Inngest + Sanity + Descope + Felt)**

**Why:**
- ✅ Inngest replaces Convex's workflow orchestration (more powerful, durable execution)
- ✅ Sanity replaces document store (superior CMS for narratives)
- ✅ Descope handles auth (passwordless, visual workflows)
- ✅ Felt provides mapping (no custom infrastructure)
- ✅ Supabase remains essential (PostGIS + governance)

**Result:** Convex now redundant. All advantages covered by Vercel-native tools.

**See [VERCEL_TOOLCHAIN_INTEGRATION.md](./docs/VERCEL_TOOLCHAIN_INTEGRATION.md) for integration architecture.**

---

### Semantic Search: Vespa.ai vs pgvector

**Decision: Start with pgvector, migrate to Vespa.ai in Phase 2**

**Why:**
- ✅ pgvector in Supabase: $0, simpler, adequate for MVP
- ✅ Vespa.ai: More powerful (hybrid search, pattern classification) but $500+/month
- ✅ Validate semantic search need with pgvector before committing to Vespa

**Use Cases for Vespa:**
- "Find narratives about resistance" (semantic, not keyword)
- "Show me places like Green Mill" (vibe matching)
- Cultural pattern classification (SYSTEMIC/PERSONAL/COLLECTIVE)

**See [VESPA_GROWTHBOOK_EVALUATION.md](./docs/VESPA_GROWTHBOOK_EVALUATION.md) for evaluation.**

---

### Feature Flags: GrowthBook vs LaunchDarkly

**Decision: GrowthBook** (Open source, warehouse-native, $0)

**Why:**
- ✅ Essential for Component Slicing (control features per deployment slice)
- ✅ A/B testing for stewardship UX optimization
- ✅ Warehouse-native (tracks to Supabase, no vendor lock-in)
- ✅ Self-hostable (mesh sovereignty)
- ✅ Free tier sufficient (3 users, unlimited experiments)

**See [VESPA_GROWTHBOOK_EVALUATION.md](./docs/VESPA_GROWTHBOOK_EVALUATION.md) for evaluation.**

---

## 🤝 Contributing

### Current Status: **Active Development**

**Primary Branch:** `claude/seed-prohibition-artifacts-0p840`

### Contribution Guidelines

1. **Read Architecture Docs First:**
   - [COMPONENT_SLICING_ARCHITECTURE.md](./docs/COMPONENT_SLICING_ARCHITECTURE.md) - Overall framework
   - [VERCEL_TOOLCHAIN_INTEGRATION.md](./docs/VERCEL_TOOLCHAIN_INTEGRATION.md) - Technology stack

2. **Understand Governance:**
   - All contributions subject to IGNIS-ADAPT Tier 1 veto (CFI < 0.50 = rejected)
   - Cultural Memory steward approval required for narrative content
   - Technical Infrastructure steward approval for architecture changes

3. **Follow Component Modularity:**
   - Changes should support multiple deployment slices (Conference, Pop-Up, Workshop, Commercial)
   - Feature flags control (GrowthBook) for progressive complexity activation

4. **No Web3/Blockchain:**
   - Proof-of-Visit NFT Minting **cancelled** (see capability gaps CSV row 10)
   - Focus on B2B model, not tokenization

### Branching Strategy

- `main` - Production releases (merged from feature branches)
- `claude/seed-prohibition-artifacts-0p840` - Core architecture + Prohibition artifacts
- `claude/gtm-strategy-dashboard-qx0dJ` - GTM components + Compass integration
- `cultura-d-content-arch` - Foundation (Guild Academy Charter)

---

## 📞 Contact & Resources

### Repository
- **GitHub:** https://github.com/CultureSpatial/USA250_impact
- **Organization:** CultureSpatial (moved from cultura-d)

### Documentation
- **Architecture:** See `/docs/` directory
- **Capability Gaps:** [CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv](./docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv)
- **Setup Guide:** [README_PROHIBITION_ARTIFACTS.md](./README_PROHIBITION_ARTIFACTS.md)

### External Resources
- **Felt.com:** [Collaborative mapping platform](https://felt.com)
- **Inngest:** [Workflow orchestration](https://www.inngest.com)
- **Sanity.io:** [Content Operating System](https://www.sanity.io)
- **Descope:** [Authentication platform](https://www.descope.com)
- **Vespa.ai:** [Vector search](https://vespa.ai)
- **GrowthBook:** [Feature flags](https://www.growthbook.io)

---

## 📜 License

See [LICENSE](./LICENSE) file for details.

---

## 🗂️ Quick Navigation

### By Topic

**Architecture & Framework:**
- [Component Slicing](./docs/COMPONENT_SLICING_ARCHITECTURE.md)
- [Technology Stack](./docs/VERCEL_TOOLCHAIN_INTEGRATION.md)
- [Database Decision](./docs/CONVEX_VS_SUPABASE_EVALUATION.md)

**Implementation:**
- [Prohibition Artifacts Setup](./README_PROHIBITION_ARTIFACTS.md)
- [Database Schema](./supabase/migrations/001_create_narratives_schema.sql)
- [Seed Data](./supabase/seeds/002_seed_prohibition_artifacts.sql)
- [Voice Interaction](./docs/VOICE_INTERACTION_SPEC.md)

**Phase 2 Planning:**
- [Vespa.ai + GrowthBook Evaluation](./docs/VESPA_GROWTHBOOK_EVALUATION.md)
- [Capability Gaps Analysis](./docs/CRD_Prohibition_Analysis.xlsx.-.Capability.Gaps.csv)

**Design Process:**
- [TURBO-c Reconciliation](./docs/RECONCILIATION_FOOTNOTE.md)

### By Branch

**Current Branch (`claude/seed-prohibition-artifacts-0p840`):**
- Architecture documents (6 files)
- Database schema + 10 Prohibition artifacts
- Voice interaction specification
- Capability gaps analysis

**GTM Strategy Branch (`claude/gtm-strategy-dashboard-qx0dJ`):**
- GTM Accelerator Dashboard
- Atlassian Compass integration
- React component library
- Integration examples

**Foundation Branch (`cultura-d-content-arch`):**
- Guild Academy Charter

**Production Branch (`main`):**
- Merged releases

---

**Last Updated:** 2026-01-24
**Current Focus:** Phase 1.5 - GrowthBook integration for Component Slicing deployment
**Next Milestone:** Workshop Slice deployment with active stewardship governance
