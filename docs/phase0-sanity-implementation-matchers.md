# Phase 0 Sanity Implementation — Design Artifact Matchers v1.0

**Date**: 2026-03-26
**Status**: Backstage Utility Phase (v0.1)
**Scope**: Producer Seeding Portal + Temporal Co-Design Fora + Ripple Validation

---

## 1. Martha's Calling Card → Producer Profile Workflow

### Mapping: 6-Phase Practitioner Credentialing Framework

**Martha's 6 Phases** (Practitioner-Led Credentialing):
1. **Invitation** → `producerProfile.translationStatus = 'submitted'`
2. **Practice Documentation** → `producerProfile.dacumProfile` (DACUM submission form)
3. **Cultural Review** → `producerProfile.translationNotes.culturalClearance = true`
4. **Articulation** → `producerProfile.translationStatus = 'articulated'`
5. **Session Integration** → `ancestralStitch.sessionReadiness.status = 'ready'`
6. **Credential Signoff** → `producerProfile.translationStatus = 'published'`

### Schema Implementation

**Producer Seeding Portal** (`/api/seed` endpoint):
- Accepts raw DACUM submission (primarySkill, localIngredientSignature, gestureDescription, sourceLanguage)
- Creates `producerProfile` with `translationStatus = 'submitted'`
- Stores consent scope and knowledge protection restrictions

**Translation Workflow** (Sanity Studio operations):
- Translator reviews submission in Studio
- Sets `translationNotes.translatedAt`, `translatedBy`
- Advances `translationStatus → 'translated'`
- Curator articulates voice to corridor collective voice
- Sets `translationNotes.articulatedAt`, advances → `'articulated'`
- Cultural reviewer clears for publication (if needed)
- Final publish: `translationStatus → 'published'`

### Credential Gate: Sovereignty Flags

```typescript
producerProfile.translationNotes.sovereigntyFlags[]
// ["CIP_REQUIRED", "CASL_CONSENT", "SEASONAL_GATE", "SACRED_KNOWLEDGE"]
```

Only `translationStatus = 'published'` documents visible on public corridor page.

---

## 2. Indigenous Tourism Sovereignty Radar → 8-Lane Tracking

### Mapping: CARE Principles + CIP Overlay

**8 Lanes** of Sovereignty Tracking:

| Lane | Sensor | Source | Implementation |
|------|--------|--------|-----------------|
| **Knowledge Control** | Who owns the information? | Consent scope | `consentRecord.consentScope[]` in producerProfile |
| **Cultural Clearance** | Who cleared it? | Knowledge holders | `ancestralStitch.sessionReadiness.culturalClearance` + `clearedBy` |
| **Seasonal Timing** | Can it be shared this season? | Indigenous calendar | `ancestralStitch.ingredientPacket.season` enum |
| **Sacred Boundaries** | Is it restricted? | Articulation notes | `ancestralStitch.sessionReadiness.restrictions` (text field) |
| **Revenue Attribution** | DtC revenue share? | Engagement data | `corridorActivation.rippleTracking.auTrailId` |
| **Language Purity** | What's the source language? | Original submission | `producerProfile.dacumProfile.sourceLanguage` + translation chain |
| **Sponsorship Proxy** | Is sponsor using our content? | Proof generation | `corridorActivation.rippleTracking.sponsorProofGenerated` (boolean) |
| **Temporal Coherence** | Is this the right moment? | Seasonal + FIFA calendar | `corridorActivation.proposedDate` + `fifaMatchDay` + `seasonalLogic` |

### Implementation Detail

Each `ancestralStitch` carries explicit restrictions:

```yaml
sessionReadiness:
  status: ready  # draft | review | ready | restricted
  culturalClearance: true
  clearedBy: "Coastal Knowledge Keeper"
  restrictions: |
    Do not record this session.
    Do not share step-by-step preparation outside this territory.
    Oral transmission only — no video.
```

The `corridorActivation.nodeSpecificContext` prevents normalization:

```typescript
nodeSpecificContext: {
  spatialContext: "Waterfront tidal zone", // Not "coastal"
  seasonalLogic: "When silver springs return",
  requiresMarthaSession: true
}
```

---

## 3. Concept Scaffolding Playground → 5 Stakeholder Perspectives

### Mapping: Backstage Utility for Multi-Perspective Testing

**5 Perspectives** in Phase 0:

| Perspective | Stakeholder | Entry Point | Test Surface |
|-------------|-------------|------------|--------------|
| **Producer Voice** | Chef, Fisher, Custodian | Producer Seeding Portal (`/api/seed`) | Raw DACUM submission (gestureDescription, localIngredientSignature) |
| **Curator Eye** | Translation workflow operators | Sanity Studio (producerProfile desk) | translationNotes field (review, cultural flags, articulation) |
| **Martha's Lens** | Oral-kinetic session practitioner | Ancestral Stitch repository | sessionReadiness gates (culturalClearance, restrictions) |
| **Node Coordinator** | Corridor node lead | Temporal Co-Design Fora | corridorActivation.proposalStatus + syncedNodes[] cross-node view |
| **Ripple Validator** | Engagement analyst | Sanity dashboard (rippleTracking) | auTrailId, engagementVelocity, sponsorProofGenerated |

### Testing Surface: Each perspective has distinct read/write boundaries

**Producer**: Write-only (seed submission). Read: confirmation + translation status.

**Curator**: Read/write DACUM profile + articulation. Advance translationStatus. Add sovereigntyFlags.

**Martha**: Read-only access to ancestralStitch library. Filter by `sessionReadiness.status = 'ready'`. See restrictions.

**Node Lead**: Read/write corridorActivation proposals. Propose new activations. Sync with other nodes (record in syncedNodes[]).

**Ripple Validator**: Read rippleTracking metrics. Generate auTrail reports. Track sponsorProof status.

### Playground Staging

Each perspective gets a read-only sandboxed view in Phase 0 (no write access except curators + node leads):
- Producer sees their own submission status
- Martha sees published + cleared stitches only
- Validators see aggregated engagement metrics

---

## 4. Terminology Cross-Walk → Vocabulary Alignment

### Key Terms + Implementation

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|----------------|--------------|-------------|-------|
| Practitioner | Producer | `producerProfile.producerType` | ProducerTypeEnum | chef \| fisher \| cultural_custodian \| winemaker \| venue_operator \| agricultural |
| Competency | DACUM profile | `producerProfile.dacumProfile` | DACUMProfile | primarySkill + localIngredientSignature + yearsOfPractice + gestureDescription |
| Gesture Expression | Oral-kinetic vocabulary | `ancestralStitch.gesturePacket.gestureDescription` | GesturePacket | Translated but not sanitized |
| Ingredient Essence | Local name (terroir-bound) | `ancestralStitch.ingredientPacket.localName` | IngredientPacket | "Not normalized across nodes" |
| Activation | Temporal proposal | `corridorActivation` | CorridorActivation | Producer proposes date+format+context |
| Sync Type | Cross-node participation | `corridorActivation.syncedNodes[].syncType` | SyncTypeEnum | full \| echo \| relay |
| Clearance | Knowledge holder approval | `ancestralStitch.sessionReadiness.culturalClearance` | SessionReadiness | Boolean gate before session use |
| Restriction | Sacred boundaries | `ancestralStitch.sessionReadiness.restrictions` | SessionReadiness | Text field — no normalization |
| Translation Status | Workflow state | `producerProfile.translationStatus` | TranslationStatusEnum | submitted → translated → articulated → published |
| Consent Scope | Sharing permission | `producerProfile.consentRecord.consentScope` | ConsentScopeEnum | collective_page \| sponsor_surface \| martha_session \| dtc_attribution |

### Translation Paths

```
Raw Producer Voice (sourceLanguage)
  ↓ [Translation Workflow]
Translated Text (English + metadata)
  ↓ [Articulation]
Collective Corridor Voice (published)
  ↓ [Martha Integration]
Session-Ready Stitch (restricted view)
```

---

## 5. MDP-89 Full Deployment → Phase 0 Coordination Hub

### Mapping: Producer Seeding Portal as Hub

**MDP-89 Core Concept**: Indigenous Tourism BC coordination hub connecting producers to Martha.

**Phase 0 Implementation**:
- **Producer Seeding Portal** (`/api/seed`) = Intake valve for new producers
- **Temporal Co-Design Fora** (`/api/activations`) = Async multi-node coordination
- **Ripple Validator** (dashboard TBD) = Engagement + AU attribution tracking

### Hub Responsibilities

1. **Onboarding** (`/api/seed`)
   - Collect DACUM profile from producers
   - Store consent scope + knowledge protections
   - Trigger translation workflow notification

2. **Coordination** (`/api/activations`)
   - Producers propose activations (date, node, format)
   - Other nodes see proposals and sync asynchronously (no real-time coordination)
   - Track sync decisions (full | echo | relay)

3. **Validation** (rippleTracking + AU trails)
   - Monitor engagement velocity per activation
   - Generate Attribution Unit (AU) trails for revenue share
   - Prove sponsor content usage (sponsorProof)

### Anti-Maximalism Constraint

Phase 0 delivers **backstage utility only**:
- No public-facing activations page yet
- No live engagement dashboard
- No sponsor surface HTML rendering
- No full translation UI (Studio operations only)
- No Martha session scheduling system

These arrive in Phase 1+ once producers + nodes + Martha feedback stabilizes.

---

## Design Principles Encoded

### 1. Anti-Universality
Each node has its own activation format vocabulary. `nodeSpecificContext` prevents normalized templates.
```yaml
# Coastal node doesn't use "market demo" — uses "live catch demo"
activationFormat: live_catch_demo
nodeSpecificContext:
  spatialContext: "Waterfront tidal zone"
  localIngredientFocus: "Dungeness crab"
```

### 2. Liminality
Producer Seeding Portal as liminal threshold (submitted → articulated → published).
Translation workflow tracks each crossing: `translationNotes.translatedAt`, `articulatedAt`.

### 3. Async Coordination
Temporal Co-Design Fora allows producers to sync proposals without real-time central coordination.
```typescript
syncedNodes: [
  { node: ref, syncingProducer: ref, syncType: "full", syncedAt: datetime }
]
```

### 4. CARE as Code
Sovereignty flags + cultural clearance gates embedded in schema:
```yaml
sovereigntyFlags: ["CIP_REQUIRED", "CASL_CONSENT"]
culturalClearance: true
clearedBy: "Knowledge Holder Name"
restrictions: "Sacred knowledge — oral only"
```

### 5. Federated Epistemologies
Multiple knowledge systems coexist without normalization:
- Ingredient taxonomy is node-specific (Dungeness ≠ aguachile)
- Gesture vocabulary is producer-specific (in source language until articulated)
- Seasonal logic is territory-specific (not calendar-fixed)

---

## Phase 0 → Phase 1 Transition

### Ready for Phase 1 Implementation

Once Phase 0 stabilizes with real producer + node + Martha feedback:

**Phase 1 Priorities**:
1. Build public-facing corridors pages (render Place Packets)
2. Implement Martha's session scheduler (calendar + participant management)
3. Launch live engagement dashboard (realtime rippleTracking metrics)
4. Render sponsor surface (CollectiveIdentityShell HTML from corridorNode)
5. Implement full translation UI (not just Studio operations)

### Feedback Loops

Phase 0 design intentionally captures:
- Producer language (sourceLanguage field)
- Curator notes (translationNotes.culturalReviewNotes)
- Martha's session observations (session feedback TBD Phase 1)
- Node coordinator sync decisions (syncNote in NodeSync)

These inform Phase 1 feature design — no premature abstraction.

---

## Implementation Checklist

- [x] 4 Sanity schemas created (corridorNode, producerProfile, ancestralStitch, corridorActivation)
- [x] 4 LinkML YAML sources (schema-as-code for reference)
- [x] 2 API routes (/api/seed, /api/activations) with validation + Sanity persistence
- [ ] Producer Seeding Form component (React)
- [ ] Temporal Co-Design Form component (React)
- [ ] Sanity Studio desks + workflows (translation workflow visual)
- [ ] Ripple Validator dashboard (TBD)
- [ ] Real producer + node testing (Phase 0 pilot)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-26 | Initial Phase 0 matcher documentation. Schemas + API routes implemented. Forms + Studio workflows TBD. |
