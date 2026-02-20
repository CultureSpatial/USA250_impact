# Vespa.ai & GrowthBook Evaluation
## Cultural Current Mesh — Phase 2 Search + Progressive Complexity

**Version:** 1.0
**Vespa Score:** 77% (108/140) — Phase 2
**GrowthBook Score:** 91% (182/200) — Immediate

---

## Summary

| Tool | Decision | Timeline | Trigger |
|------|----------|----------|---------|
| GrowthBook | IMMEDIATE | Phase 1.5 (now) | Feature flags for sovereignty levels |
| Vespa.ai | PHASE 2 | After pgvector validation | If semantic queries > 50% of search volume |

---

## GrowthBook — Feature Flags & Progressive Complexity

### Why Immediate

GrowthBook solves the component slicing problem: how do you ship the same codebase to Conference (Level 0), Pop-Up (Level 1), Workshop (Level 2), and Commercial (Level 3) contexts without branching code?

Feature flags. Named configurations. Sovereignty levels as preset flag bundles.

### Sovereignty Level Configurations

```typescript
// src/config/growthbook-sovereignty.ts
export const SOVEREIGNTY_CONFIGS = {
  level0: {
    "governance-tier1-veto": false,
    "hume-voice-synthesis": false,
    "community-memory-layer": false,
    "tend-action-enabled": false,
    "transmit-action-enabled": true,
    "scid-dacum-mode": false,
    "mvr-tracking": false,
    "ecp-distribution": false,
  },
  level1: {
    "governance-tier1-veto": false,
    "hume-voice-synthesis": true,
    "community-memory-layer": true,
    "tend-action-enabled": false,
    "transmit-action-enabled": true,
    "scid-dacum-mode": false,
    "mvr-tracking": false,
    "ecp-distribution": false,
  },
  level2: {
    "governance-tier1-veto": true,
    "hume-voice-synthesis": false,
    "community-memory-layer": true,
    "tend-action-enabled": true,
    "transmit-action-enabled": true,
    "scid-dacum-mode": true,
    "mvr-tracking": false,
    "ecp-distribution": false,
  },
  level3: {
    "governance-tier1-veto": true,
    "hume-voice-synthesis": true,
    "community-memory-layer": true,
    "tend-action-enabled": true,
    "transmit-action-enabled": true,
    "scid-dacum-mode": true,
    "mvr-tracking": true,
    "ecp-distribution": true,
  }
}
```

### IGNIS-ADAPT Integration

GrowthBook flag `governance-tier1-veto` maps to the Tier 1 gate:
- When true: CFI/SSI < 0.50 triggers hard block in `narrativeLifecycle` Inngest function
- When false (Level 0/1): Governance runs in "monitor" mode — records but does not block

This enables Conference demos without SSI overhead while preserving the constitutional architecture.

### Scoring

| Criterion | Score (out of 20) |
|-----------|-------------------|
| Vercel integration | 19 |
| Feature flag granularity | 18 |
| Named experiment configs | 20 |
| A/B testing capability | 17 |
| Open source (self-hostable) | 20 |
| SDK support (Next.js) | 18 |
| Analytics integration | 18 |
| Team collaboration | 18 |
| Documentation quality | 17 |
| SSI/sovereignty mapping | 17 |
| **Total** | **182/200 (91%)** |

---

## Vespa.ai — Semantic Search & Cultural Pattern Detection

### What Vespa Solves

The capability gaps CSV (row 4, row 12, row 14, row 15) identified:
- "Evaluate against current centralized Vespa NMR-lite" — AT Protocol Phase 3
- Perspective classification (Historical / Community / Sensory)
- Cultural pattern detection across narrative corpus
- Juxtaposition: surfacing contrasting narratives about the same site

These are **Phase 2** requirements — not needed until the narrative corpus is large enough to benefit from semantic search.

### Phase Decision Criteria

**Stay on pgvector (Supabase) if:**
- Corpus < 1,000 narratives
- Semantic queries < 50% of total query volume
- Search latency SLA > 200ms (acceptable)
- Team size < 5 engineers

**Migrate to Vespa if:**
- Corpus > 10,000 narratives across multiple trails
- Pattern detection queries become primary use case
- AT Protocol federation (Phase 3) requires distributed semantic index
- Real-time ranking of cultural relevance scores needed

### Current Assessment: Stay on pgvector

The Chicago Prohibition Trail has 10 sites, 3 layers each = 30 narrative units maximum. pgvector in Supabase handles this trivially.

```sql
-- pgvector: enable and create index
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE narratives ADD COLUMN embedding vector(1536);

CREATE INDEX narratives_embedding_idx ON narratives
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Semantic similarity query
SELECT id, site_name, 1 - (embedding <=> $1::vector) AS similarity
FROM narratives
WHERE sovereignty_level <= $2
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

### Vespa Architecture (When Phase 2 Is Triggered)

```yaml
# vespa.yaml — schema for cultural narratives (Phase 2)
schema: cultural_narrative
  document:
    field site_id type string
    field narrative_text type string
    field layer_type type string  # historical | community | sensory
    field cfi_score type float
    field coordinates type position
    field embedding type tensor<float>(x[1536])

  rank-profile: cultural_relevance_default
    first-phase:
      expression: nativeRank(narrative_text) * attribute(cfi_score)
```

### Scoring

| Criterion | Score (out of 20) |
|-----------|-------------------|
| Geospatial-semantic fusion | 16 |
| Cultural pattern detection | 18 |
| AT Protocol federation readiness | 15 |
| Vercel integration | 12 |
| Team setup complexity | 10 |
| Open source | 20 |
| pgvector migration path | 17 |
| **Total** | **108/140 (77%)** |

---

## Roadmap

```
Phase 1 (Now):
  GrowthBook → sovereignty level flags
  pgvector in Supabase (extension enabled, embeddings nullable)

Phase 1.5 (After Conference Slice):
  GrowthBook → A/B test narrative layer engagement (historical vs community)
  GrowthBook → Validate sovereignty level 1 vs 0 conversion

Phase 2 (After pgvector validation):
  Evaluate: is semantic search > 50% of queries?
  If yes → Vespa migration
  If no → extend pgvector with more indices

Phase 3 (AT Protocol Federation):
  Vespa → multi-node cultural pattern detection across CCM nodes
  "NMR-lite" — Narrative Memory Retrieval across federated mesh
```
