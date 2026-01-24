# Vespa.ai & GrowthBook Evaluation for Cultural Current Mesh

**Document Purpose:** Technical evaluation of Vespa.ai (vector search/semantic retrieval) and GrowthBook (feature flags/experimentation) in the context of Cultural Current Mesh architecture and capability gaps analysis.

**Date:** 2026-01-24
**Status:** Architecture Evaluation
**Context:** Linear issues mention Vespa.ai; capability gaps CSV references "centralized Vespa NMR-lite"

---

## Executive Summary

### Vespa.ai - Semantic Search & Vector Database
**Recommendation:** ✅ **Add to architecture for Phase 2** - Semantic narrative search, cultural pattern detection, "vibe matching"

**Use Case:** When users ask "Find narratives about resistance" or "Show me places like this," Vespa provides semantic retrieval across cultural content where PostGIS provides geospatial proximity.

### GrowthBook - Feature Flags & Experimentation
**Recommendation:** ✅ **Add to architecture for Component Slicing** - Progressive complexity activation, A/B testing governance UX, workshop experiments

**Use Case:** Deploy different features to different deployment slices (Conference vs Workshop vs Commercial), experiment with stewardship workflows, measure CFI calculation effectiveness.

---

## I. Vespa.ai Evaluation

### What is Vespa.ai?

Vespa is **the world's most capable vector database** with hybrid search combining:
- Vector embeddings (semantic search)
- Full-text search (keyword matching)
- Structured data filtering (metadata queries)
- Machine-learned ranking (multi-phase ranking)
- Real-time updates (no rebuilds, no downtime)

**Scale:** Proven at hundreds of billions of documents, hundreds of thousands of queries/second, <100ms latency

---

### How Vespa Fits Our Architecture

**From Capability Gaps CSV (Row 4):**
> "Phase 2 feature - Federated narrative sovereignty model. Evaluate against current centralized Vespa NMR-lite"

**NMR = Narrative Mapping Registry** (inferred)

**Question:** Should we use **centralized Vespa** for semantic search OR **federated AT Protocol** for narrative sovereignty?

**Answer:** **Both - they serve different purposes:**

```
Supabase (PostgreSQL + PostGIS)
├─ Geospatial proximity ("narratives within 100m")
├─ Governance data (stewardship, CFI scores)
└─ Relational integrity (foreign keys, constraints)

Vespa.ai
├─ Semantic search ("narratives about resistance", "places like this")
├─ Cultural pattern detection (SYSTEMIC vs PERSONAL perspectives)
├─ Hybrid queries ("speakeasies near me with jazz atmosphere")
└─ Vector embeddings (narrative similarity, vibe matching)

AT Protocol (Future - Phase 2+)
├─ Federated narrative sovereignty (tribes control their PDSs)
├─ Cross-institutional discovery (museum ↔ tribe connections)
└─ Mesh node independence (self-hosting narratives)
```

---

### Vespa Use Cases in Cultural Current Mesh

#### Use Case 1: Semantic Narrative Discovery

**User Query:** "Show me narratives about economic resistance in Chicago"

**Without Vespa (Current - PostGIS only):**
```sql
-- Can only search by tags, keywords in text
SELECT * FROM narratives
WHERE tags @> ARRAY['resistance', 'economics', 'chicago'];
```
**Problem:** Misses narratives that don't use exact keywords. Prohibition speakeasies were economic resistance but may not be tagged as such.

**With Vespa:**
```python
# Semantic search using embeddings
query = "economic resistance chicago"
results = vespa.query({
  "yql": "select * from narratives where semantic(embedding) contains nearestNeighbor(query_embedding)",
  "input.query(query_embedding)": embed(query),
  "ranking": "semantic_similarity"
})
```
**Result:** Finds Prohibition narratives, labor organizing, Black economic empowerment, informal economies - all semantically related even without exact keyword matches.

---

#### Use Case 2: Cultural Pattern Classification (Capability Gap Row 14)

**Capability Gap:**
> "Collective vs Personal Pattern Detection - Extend VIIBe to classify network patterns vs individual meaning"

**Pattern Types:**
- NETWORK_LOGISTICS (trade routes, distribution systems)
- NODE_IDENTITY (individual stories, personal meaning)
- THRESHOLD_RITUAL (ceremonial spaces, cultural transitions)
- RESOURCE_FLOW (economic patterns, mutual aid)

**Vespa Solution:**
```python
# Multi-vector search with pattern classification
vespa_schema = {
  "fields": {
    "narrative_embedding": "tensor<float>(x[768])",  # Semantic meaning
    "pattern_embedding": "tensor<float>(x[128])",    # Pattern type
    "perspective_type": "string",  # SYSTEMIC, PERSONAL, COLLECTIVE
    "location": "position",  # Geospatial
  },
  "rank-profile": {
    "cultural_pattern_match": {
      # Combine semantic similarity + pattern type + geospatial
      "first-phase": "closeness(narrative_embedding) * 0.5 + closeness(pattern_embedding) * 0.3 + proximity(location) * 0.2"
    }
  }
}
```

**Query Example:**
```python
# Find COLLECTIVE patterns about RESOURCE_FLOW near Maxwell Street
results = vespa.query({
  "yql": "select * from narratives where perspective_type='COLLECTIVE' AND geoRadius(location, 41.8646, -87.6475, 1000m)",
  "ranking.features.query(narrative_embedding)": embed("resource sharing mutual aid"),
  "ranking.features.query(pattern_embedding)": embed("RESOURCE_FLOW")
})
```

---

#### Use Case 3: "Vibe Matching" (Similar Places Discovery)

**User Experience:** User visits Green Mill, listens to narrative, taps "Show me places like this"

**Vespa Hybrid Query:**
```python
# Combine semantic similarity + geospatial proximity + historical era
vespa.query({
  "yql": """
    select * from narratives
    where geoRadius(location, @user_lat, @user_lng, 5000m)
      AND era in ['1920s', '1930s']
      AND ({targetHits:20}nearestNeighbor(vibe_embedding, query_embedding))
  """,
  "ranking": "vibe_match",
  "input.query(query_embedding)": embed(green_mill_narrative.body),
  # Multi-phase ranking:
  # Phase 1: Retrieve candidates (geospatial + era filter)
  # Phase 2: Semantic similarity (vibe matching)
  # Phase 3: Cultural fidelity check (CFI score threshold)
})
```

**Result:** Finds Twin Anchors, Biograph Theater, Aragon Ballroom (similar atmosphere, nearby, same era) even if tags differ.

---

#### Use Case 4: Stack Juxtaposition Analysis (Capability Gap Row 15)

**Capability Gap:**
> "Stack Juxtaposition Analysis - Extend to explicitly compare OCAI (centralized) vs Federated interpretations of same narrative"

**Vespa as Interpretation Index:**

```python
# Store multiple interpretations of same event in Vespa
vespa_doc = {
  "event_id": "stvalentines_1929",
  "interpretations": [
    {
      "source": "OCAI_centralized",
      "perspective": "INSTITUTIONAL",
      "embedding": embed("Gang violence, organized crime, law enforcement failure"),
      "cfi": 0.65
    },
    {
      "source": "Chicago_Heritage_Alliance",
      "perspective": "SYSTEMIC",
      "embedding": embed("Economic prohibition impacts, community survival strategies"),
      "cfi": 0.82
    },
    {
      "source": "Local_Community_Archive",
      "perspective": "PERSONAL",
      "embedding": embed("Neighborhood trauma, families displaced, ongoing fear"),
      "cfi": 0.91
    }
  ]
}

# Query: "How do different sources interpret St. Valentine's Day Massacre?"
results = vespa.query({
  "yql": "select * from interpretations where event_id='stvalentines_1929'",
  "ranking": "cfi_weighted_diversity",  # Rank by CFI but ensure diversity
})
```

**Result:** ContraryEngines can now compare centralized vs. community interpretations, surface tensions, identify institutional blind spots.

---

### Vespa Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  VERCEL (Next.js)                        │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌───────────────┐  ┌────────────────┐  ┌──────────────┐
│   SANITY      │  │   SUPABASE     │  │   VESPA.AI   │
│   Content     │  │   Geospatial   │  │   Semantic   │
│               │  │                │  │              │
│ • Narratives  │  │ • PostGIS      │  │ • Embeddings │
│ • Authoring   │  │ • Proximity    │  │ • Hybrid     │
│ • Workflow    │  │ • Governance   │  │ • Patterns   │
└───────────────┘  └────────────────┘  └──────────────┘
        ↓                   ↓                   ↓
        └───────────────────┼───────────────────┘
                            ↓
                    ┌───────────────┐
                    │   INNGEST     │
                    │   Sync        │
                    │               │
                    │ • Sanity →    │
                    │   Supabase    │
                    │ • Sanity →    │
                    │   Vespa       │
                    │ • Embedding   │
                    └───────────────┘
```

**Data Flow:**
1. Historian authors narrative in **Sanity** (rich editor, workflow)
2. **Inngest** workflow triggered on publish:
   - Calculate CFI
   - Generate embeddings (OpenAI/Anthropic)
   - Store in **Supabase** (geospatial + governance)
   - Index in **Vespa** (semantic search + patterns)
3. User queries:
   - Geospatial: **Supabase** PostGIS ("within 100m")
   - Semantic: **Vespa** hybrid search ("like this vibe")
   - Hybrid: **Vespa** + **Supabase** ("resistance narratives near me")

---

### Vespa Deployment Options

**Option 1: Vespa Cloud (Managed)**
- Hosted by Vespa
- Auto-scaling, monitoring
- $$$$ (enterprise pricing)

**Option 2: Self-Hosted (Docker/Kubernetes)**
- Mesh node sovereignty (aligns with federated model)
- Requires ops expertise
- Free (infrastructure costs only)

**Option 3: Vespa on Neon Postgres (Hybrid)**
- Store vectors in Neon Postgres (via pgvector)
- Use Vespa only for ranking logic
- Reduces infrastructure complexity

**Recommendation:** Start with **pgvector in Supabase** (Phase 1), migrate to **Vespa Cloud** when semantic search becomes primary use case (Phase 2).

---

### Capability Gaps Addressed by Vespa

| Capability Gap (from CSV) | Vespa Solution | Priority |
|--------------------------|----------------|----------|
| Perspective Classification (Row 12) | Multi-vector embeddings (narrative + pattern + perspective) | High |
| Collective vs Personal Pattern Detection (Row 14) | Pattern embedding + classification | High |
| Stack Juxtaposition Analysis (Row 15) | Multi-interpretation indexing with CFI weighting | High |
| Density Mapping (Row 13) | Geospatial clustering + semantic pattern density | Medium |
| Situational Analysis Reports (Row 20) | RAG (Retrieval-Augmented Generation) with Vespa retrieval | Medium |

---

## II. GrowthBook Evaluation

### What is GrowthBook?

GrowthBook is **open-source feature flagging and A/B testing platform** with:
- Feature flags (gradual rollouts, targeting, kill switches)
- A/B testing (Bayesian/Frequentist statistics, CUPED)
- Warehouse-native (analyze in your existing data warehouse)
- Self-hostable (aligns with mesh sovereignty)

**Key Differentiator:** Privacy-first, no vendor lock-in (you own your data).

---

### How GrowthBook Fits Our Architecture

**Use Case:** **Progressive Complexity Activation** from Component Slicing Architecture

**Problem:** We have 5 deployment slices (Conference, Pop-Up, Dev Post, Workshop, Commercial) with different feature requirements. How do we control which features are active per slice?

**Solution:** GrowthBook feature flags

```typescript
// Feature flags per deployment slice
const features = {
  "governance-tier1-veto": {
    enabled: {
      "conference": false,  // No governance for presentations
      "popup": false,       // Informal governance
      "workshop": true,     // Active role assignment
      "commercial": true    // Full constitutional substrate
    }
  },
  "realtime-collaboration": {
    enabled: {
      "conference": false,
      "popup": false,
      "workshop": true,     // Multi-user live editing
      "commercial": true
    }
  },
  "hume-voice-synthesis": {
    enabled: {
      "conference": false,  // Pre-recorded audio
      "popup": true,        // Live synthesis
      "workshop": true,
      "commercial": true
    }
  }
}
```

---

### GrowthBook Use Cases in Cultural Current Mesh

#### Use Case 1: Progressive Complexity Activation

**Scenario:** Workshop participants create narratives. Should we activate CFI calculation immediately or wait for governance maturity?

**GrowthBook Feature Flag:**
```typescript
import { useFeature } from '@growthbook/growthbook-react';

function WorkshopNarrativeForm() {
  const cfiEnabled = useFeature('cfi-calculation-workshop').on;
  const tier1VetoEnabled = useFeature('governance-tier1-veto').on;

  const handleSubmit = async (narrative) => {
    if (cfiEnabled) {
      const cfi = await calculateCFI(narrative);

      if (tier1VetoEnabled && cfi < 0.50) {
        // Tier 1 Veto active - reject narrative
        return { error: 'TIER 1 VETO: CFI below threshold' };
      }
    }

    // Submit narrative
    await inngest.send({ name: 'narrative/created', data: narrative });
  };
}
```

**Benefit:** Can deploy Workshop slice without governance overhead initially, activate CFI calculation when stewards are assigned, activate Tier 1 veto when constitutional substrate is ready.

---

#### Use Case 2: A/B Testing Governance UX

**Hypothesis:** Visual stewardship approval workflow increases Cultural Memory steward participation vs. email-based approval.

**GrowthBook Experiment:**
```typescript
const experiment = useExperiment({
  key: 'steward-approval-ux',
  variations: ['email', 'visual-workflow']
});

// Track conversion: approval completed within 48 hours
growthbook.track('steward_approval_completed', {
  timestamp: Date.now(),
  userId: steward.id,
  narrativeId,
  approvalMethod: experiment.value
});
```

**Analysis in GrowthBook:**
- Conversion rate: Visual workflow 78% vs. Email 42%
- Time to approval: Visual 18hrs vs. Email 52hrs
- **Result:** Deploy visual workflow to all slices

---

#### Use Case 3: Experimentation for IGNIS-ADAPT Thresholds

**Question:** Is CFI threshold of 0.50 too strict? Should we test 0.45 for workshops?

**GrowthBook Experiment:**
```typescript
const cfiThreshold = useExperiment({
  key: 'cfi-threshold-workshop',
  variations: [0.50, 0.45, 0.40]  // Test different thresholds
}).value;

// Apply threshold in governance check
if (cfi < cfiThreshold) {
  await tier1Veto(narrativeId, { cfi, threshold: cfiThreshold });
}

// Track outcomes
growthbook.track('narrative_published', {
  cfi,
  threshold: cfiThreshold,
  participantSatisfaction: survey.rating,
  culturalFidelity: stewardReview.rating
});
```

**Analysis:**
- 0.50 threshold: 12% rejection rate, 4.8 cultural fidelity rating
- 0.45 threshold: 6% rejection rate, 4.5 cultural fidelity rating
- 0.40 threshold: 2% rejection rate, 3.8 cultural fidelity rating

**Result:** Keep 0.50 threshold - maintains cultural fidelity without excessive rejections.

---

#### Use Case 4: Gradual Rollout of Spatial Computing Features

**Scenario:** Meta IWSDK spatial anchors ready for testing. Roll out to 10% of Pop-Up event guests, measure engagement.

**GrowthBook Gradual Rollout:**
```typescript
const spatialAREnabled = useFeature('spatial-ar-overlays', {
  fallbackValue: false
}).on;

// GrowthBook dashboard: Set rollout to 10% of users
// Monitor metrics: engagement time, AR interaction rate, technical issues

if (spatialAREnabled) {
  // Show AR overlay using Meta IWSDK
  await metaIWSDK.placeAnchor(location, narrativeId);
}
```

**Benefit:** Test spatial features without breaking experience for 90% of users. If crash rate >5%, automatic rollback.

---

### GrowthBook Integration Architecture

```typescript
// lib/growthbook.ts
import { GrowthBook } from '@growthbook/growthbook-react';

export const gb = new GrowthBook({
  apiHost: process.env.GROWTHBOOK_API_HOST,
  clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.NODE_ENV === 'development',

  // Track events to Supabase (warehouse-native)
  trackingCallback: (experiment, result) => {
    supabase.from('experiments').insert({
      experiment_key: experiment.key,
      variation: result.value,
      user_id: result.userId,
      timestamp: new Date()
    });
  }
});

// Initialize with deployment slice context
export function initGrowthBook(slice: 'conference' | 'popup' | 'workshop' | 'commercial') {
  gb.setAttributes({
    deployment_slice: slice,
    environment: process.env.NODE_ENV
  });
}

// app/layout.tsx
import { GrowthBookProvider } from '@growthbook/growthbook-react';

export default function RootLayout({ children }) {
  return (
    <GrowthBookProvider growthbook={gb}>
      {children}
    </GrowthBookProvider>
  );
}
```

---

### GrowthBook Deployment

**Self-Hosted (Docker):**
```bash
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://localhost:27017/growthbook \
  growthbook/growthbook
```

**OR**

**GrowthBook Cloud (Free tier: 3 users, unlimited experiments)**

**Recommendation:** Start with **GrowthBook Cloud free tier**, migrate to **self-hosted** if mesh nodes need sovereignty over experimentation data.

---

### Capability Gaps Addressed by GrowthBook

| Capability Gap (from CSV) | GrowthBook Solution | Priority |
|--------------------------|---------------------|----------|
| Progressive Complexity Activation | Feature flags per deployment slice | Critical |
| 'Heist' UX Experimentation (Row 17) | A/B test gamification vs. dashboard | Strategic |
| Metadata Decay Warning Optimization (Row 16) | Test urgency thresholds (30/60/90 days) | Medium |
| Shadow Layer Gradual Rollout (Row 8) | Feature flag for graduated visibility tiers | High |

---

## III. Combined Architecture: Vespa + GrowthBook + Existing Stack

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js)                      │
│                    GrowthBook SDK                        │
│  Feature Flags + Experiments per Deployment Slice       │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────────────┐
        ↓                   ↓                           ↓
┌───────────────┐  ┌────────────────┐  ┌────────────────────┐
│   SANITY      │  │   SUPABASE     │  │   VESPA.AI         │
│   Content     │  │   Geospatial   │  │   Semantic Search  │
│               │  │                │  │                    │
│ • Authoring   │  │ • PostGIS      │  │ • Embeddings       │
│ • Workflow    │  │ • Governance   │  │ • Pattern Class    │
│ • Versions    │  │ • Analytics    │  │ • Hybrid Ranking   │
└───────────────┘  └────────────────┘  └────────────────────┘
        ↓                   ↓                           ↓
        └───────────────────┼───────────────────────────┘
                            ↓
        ┌───────────────────┴───────────────────┐
        ↓                                       ↓
┌────────────────┐                    ┌─────────────────┐
│   INNGEST      │                    │   GROWTHBOOK    │
│   Orchestrate  │                    │   Experiment    │
│                │                    │                 │
│ • Sync Sanity  │                    │ • Track events  │
│   → Supabase   │                    │   → Supabase    │
│ • Generate     │                    │ • Analyze A/B   │
│   embeddings   │                    │ • Feature flags │
│ • Index Vespa  │                    │                 │
└────────────────┘                    └─────────────────┘
```

---

## IV. Implementation Roadmap

### Phase 1: Foundation (Current - MVP)
- ✅ Supabase (PostgreSQL + PostGIS)
- ✅ Sanity (Content authoring)
- ✅ Inngest (Workflow orchestration)
- ✅ Descope (Auth)
- ✅ Felt (Mapping)

### Phase 1.5: Progressive Complexity (Immediate)
- 🔴 **Add GrowthBook** (Feature flags for deployment slices)
- 🔴 Deploy Conference Slice (minimal features)
- 🔴 Deploy Workshop Slice (activate CFI calculation via feature flag)

### Phase 2: Semantic Layer (3-6 months)
- 🟡 **Add pgvector to Supabase** (Vector embeddings in existing DB)
- 🟡 Generate embeddings for 10 Prohibition narratives
- 🟡 Test semantic search ("places like Green Mill")
- 🟡 Experiment: Semantic vs. Keyword search (GrowthBook A/B test)

### Phase 2.5: Pattern Intelligence (6-12 months)
- 🟡 **Migrate to Vespa.ai** (if semantic search becomes primary use case)
- 🟡 Implement pattern classification (SYSTEMIC, PERSONAL, COLLECTIVE)
- 🟡 Build Stack Juxtaposition Analysis (compare interpretations)
- 🟡 Cultural pattern density mapping

### Phase 3: Federated Sovereignty (12+ months)
- ⚪ AT Protocol integration (federated narratives)
- ⚪ Mesh node independence (self-hosted Vespa instances)
- ⚪ Cross-institutional semantic search (federated Vespa queries)

---

## V. Cost Analysis

### Vespa.ai Pricing:

**Vespa Cloud (Managed):**
- Development: $0 (free tier, limited scale)
- Production: ~$500-2000/month (depends on scale)

**Self-Hosted:**
- Infrastructure: ~$100-500/month (AWS/GCP instances)
- Ops time: Significant (monitoring, scaling, backups)

**pgvector in Supabase (Alternative):**
- $0 (included in Supabase, limited scale)
- Migration to Vespa when semantic search becomes primary

**Recommendation:** Start with **pgvector in Supabase** ($0), migrate to **Vespa Cloud** when query volume justifies cost.

---

### GrowthBook Pricing:

**GrowthBook Cloud:**
- Starter: **Free** (3 users, unlimited experiments, cloud hosting)
- Pro: $40/user/month (up to 50 users, advanced stats, managed warehouse)
- Enterprise: Custom (SSO, advanced access control)

**Self-Hosted:**
- Free (open source, Docker deployment)
- Infrastructure: ~$20/month (MongoDB + app server)

**Recommendation:** Start with **GrowthBook Cloud free tier**, migrate to **self-hosted** if mesh sovereignty requires it.

---

### Combined Monthly Cost:

| Phase | Stack | Monthly Cost |
|-------|-------|--------------|
| Phase 1 (Current) | Vercel + Inngest + Sanity + Descope + Felt + Supabase | $0-144 |
| Phase 1.5 (+ GrowthBook) | + GrowthBook Cloud free | $0-144 |
| Phase 2 (+ pgvector) | + Supabase pgvector | $0-144 (no change) |
| Phase 2.5 (+ Vespa) | + Vespa Cloud dev tier | $0-644 |
| Phase 3 (Production) | + Vespa Cloud production | $500-2144 |

---

## VI. Decision Matrix

### Should We Add Vespa.ai?

| Criterion | Weight | Score (1-10) | Weighted | Rationale |
|----------|--------|-------------|----------|-----------|
| Semantic search need | High | 8 | 24 | "Find narratives like this" is core UX |
| Cultural pattern detection | High | 9 | 27 | Capability gap rows 12, 14, 15 |
| Hybrid search (geo + semantic) | Medium | 9 | 18 | "Resistance narratives near me" |
| Cost vs. pgvector alternative | High | 5 | 15 | pgvector cheaper, Vespa more powerful |
| Self-hosting complexity | Medium | 4 | 8 | Requires ops expertise |
| Mesh sovereignty alignment | Medium | 8 | 16 | Self-hostable, aligns with federated model |
| **Total** | | | **108/140** | **77% - RECOMMEND Phase 2** |

**Decision:** ✅ **Add Vespa.ai in Phase 2** after validating semantic search need with pgvector in Phase 1.5.

---

### Should We Add GrowthBook?

| Criterion | Weight | Score (1-10) | Weighted | Rationale |
|----------|--------|-------------|----------|-----------|
| Progressive complexity need | Critical | 10 | 40 | Essential for Component Slicing deployment |
| A/B testing governance UX | High | 8 | 24 | Optimize stewardship workflows |
| Feature flag per slice | Critical | 10 | 40 | Conference vs Workshop vs Commercial |
| Cost (free tier) | High | 10 | 30 | $0 for up to 3 users |
| Self-hosting option | Medium | 9 | 18 | Open source, mesh sovereignty |
| Warehouse-native (Supabase) | High | 10 | 30 | No vendor lock-in, privacy-first |
| **Total** | | | **182/200** | **91% - RECOMMEND Immediate** |

**Decision:** ✅ **Add GrowthBook immediately** (Phase 1.5) for Component Slicing deployment control.

---

## VII. Reconciliation with Linear Issues

**From Capability Gaps CSV Row 4:**
> "Evaluate against current centralized Vespa NMR-lite"

**Interpretation:**
- **NMR = Narrative Mapping Registry** (semantic index of narratives)
- **Centralized Vespa** = Single Vespa instance for all narratives
- **Federated model** = AT Protocol with distributed narrative ownership

**Recommendation:**
- **Phase 2:** Centralized Vespa (simpler, faster to deploy, adequate for MVP)
- **Phase 3:** Federated Vespa (mesh nodes run own Vespa instances, cross-query via federation)

**Why Both:**
- Centralized Vespa provides **semantic search across all narratives** (discovery)
- Federated AT Protocol provides **narrative sovereignty** (ownership, control)
- They complement each other (search vs. storage/governance)

---

## VIII. Integration Examples

### Example 1: Hybrid Geospatial + Semantic Query

**User Query:** "Show me resistance narratives within 1 mile that feel like Green Mill"

```typescript
// Step 1: Geospatial filter (Supabase PostGIS)
const nearbyNarratives = await supabase.rpc('get_narratives_within_radius', {
  lat: 41.9692,
  lon: -87.6592,
  radius_meters: 1609  // 1 mile
});

// Step 2: Semantic ranking (Vespa)
const greenMillEmbedding = await generateEmbedding(greenMillNarrative.body);

const rankedResults = await vespa.query({
  yql: `select * from narratives where id in (${nearbyNarratives.map(n => n.id).join(',')})`,
  ranking: 'semantic_similarity',
  'input.query(embedding)': greenMillEmbedding
});

// Step 3: Apply CFI threshold (governance filter)
const culturallyValid = rankedResults.filter(n => n.metadata.cfi >= 0.50);

return culturallyValid;
```

---

### Example 2: GrowthBook-Controlled Feature Rollout

```typescript
// Feature: Tier 1 Veto active only for Commercial slice
const tier1VetoEnabled = useFeature('governance-tier1-veto').on;

// GrowthBook dashboard configuration:
// - Conference slice: OFF (no governance)
// - Pop-Up slice: OFF (informal governance)
// - Workshop slice: ON (active stewardship)
// - Commercial slice: ON (full constitutional substrate)

async function publishNarrative(narrative) {
  const cfi = await calculateCFI(narrative);

  if (tier1VetoEnabled && cfi < 0.50) {
    // Tier 1 Veto fires - terminate
    await supabase.from('narratives')
      .update({ status: 'rejected_tier1', veto_reason: `CFI ${cfi}` })
      .eq('id', narrative.id);

    // Track veto event for analysis
    growthbook.track('tier1_veto_fired', { narrativeId: narrative.id, cfi });

    throw new Error('TIER 1 VETO: Cultural Fidelity Index below threshold');
  }

  // Publish narrative
  await inngest.send({ name: 'narrative/published', data: narrative });
}
```

---

## IX. Next Actions

### Immediate (Phase 1.5):

1. 🔴 **Set up GrowthBook Cloud** (free tier)
   - Create account
   - Install SDK in Next.js app
   - Define feature flags for deployment slices

2. 🔴 **Create deployment slice feature flags:**
   - `governance-tier1-veto` (OFF for Conference/Pop-Up, ON for Workshop/Commercial)
   - `cfi-calculation` (OFF for Conference, ON for others)
   - `realtime-collaboration` (OFF for Conference/Pop-Up, ON for Workshop)
   - `hume-voice-synthesis` (OFF for Conference, ON for others)

3. 🔴 **Track to Supabase:**
   - Configure GrowthBook to send experiment events to Supabase
   - Create `experiments` table for warehouse-native analytics

### Short-Term (Phase 2):

4. 🟡 **Enable pgvector in Supabase:**
   ```sql
   CREATE EXTENSION vector;
   ALTER TABLE narratives ADD COLUMN embedding vector(768);
   CREATE INDEX ON narratives USING ivfflat (embedding vector_cosine_ops);
   ```

5. 🟡 **Generate embeddings for Prohibition narratives:**
   - Use OpenAI `text-embedding-3-small` or Anthropic embeddings
   - Store in `narratives.embedding` column
   - Create Inngest workflow for automatic embedding on publish

6. 🟡 **Test semantic search:**
   - Query: "Find narratives about economic resistance"
   - Compare results: Keyword (tags) vs. Semantic (embeddings)
   - A/B test with GrowthBook: Which performs better?

### Long-Term (Phase 2.5):

7. ⚪ **Evaluate Vespa migration:**
   - If semantic queries >50% of total queries, migrate to Vespa
   - If pattern classification becomes critical, migrate to Vespa
   - Otherwise, continue with pgvector (simpler, cheaper)

8. ⚪ **Implement pattern classification:**
   - Train or fine-tune model for SYSTEMIC/PERSONAL/COLLECTIVE
   - Add pattern embeddings to Vespa schema
   - Test Stack Juxtaposition Analysis

---

## X. Sources

- [Vespa.ai Platform](https://vespa.ai/)
- [Vespa.ai Why Vespa](https://vespa.ai/why-vespa/)
- [Vespa RAG Solutions](https://vespa.ai/solutions/retrieval-augmented-generation/)
- [Vespa Use Cases](https://vespa.ai/use-cases/)
- [Vespa Hybrid Search Features](https://vespa.ai/features/)
- [How Perplexity Beat Google with Vespa](https://blog.vespa.ai/perplexity-show-what-great-rag-takes/)
- [GrowthBook Platform](https://www.growthbook.io/)
- [GrowthBook GitHub](https://github.com/growthbook/growthbook)
- [GrowthBook Feature Flag Experiments](https://docs.growthbook.io/feature-flag-experiments)
- [GrowthBook Running Experiments](https://docs.growthbook.io/experiments)

---

**END OF DOCUMENT**
