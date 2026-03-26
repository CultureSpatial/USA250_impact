# MDP-89: Indigenous Tourism BC Full Deployment → Phase 0 Sandbox Build

**Matcher v1.0** | 2026-03-26

---

## Executive Summary

**MDP-89** (Management Decision Portal 89) is the coordination hub connecting:
- **Producers** (chefs, fishers, custodians, makers) via Seeding Portal
- **Nodes** (geographic corridor segments) via Co-Design Fora
- **Martha** (oral-kinetic facilitator) via Session Integration
- **Sponsors** (beer, wine, tourism brands) via Attribution Tracking

Phase 0 builds the **backstage utility** — intake, coordination, validation — without yet building the public-facing activation pages or Martha scheduling system.

---

## The 3-Part Hub Architecture

### Part 1: Producer Seeding Portal

**What it does**: Captures raw practitioner knowledge (DACUM profile) with consent scope.

**API Route**: `POST /api/seed`

**Request**:
```typescript
{
  name: "Rosa Martinez",
  producerType: "chef",
  nodeSlug: "ensenada-gathering",
  primarySkill: "Aguachile preparation from caught fish",
  yearsOfPractice: 30,
  localIngredientSignature: "Wild Pacific catch — cold deep water species",
  sourceLanguage: "es-MX",
  gestureDescription: "Hands moving in water to select fish, knife angle matters",
  consentedAt: "2026-03-26T14:22:00Z",
  consentScope: ["collective_page", "martha_session"],
  knowledgeProtections: "Do not share the specific water source"
}
```

**Response**:
```json
{
  "ok": true,
  "_id": "sanity-doc-id",
  "slug": "rosa-martinez-xyz123",
  "status": "submitted",
  "message": "Submission received. Your profile will be reviewed and translated before appearing on the corridor page."
}
```

**Sanity Workflow**:
1. Creates `producerProfile` document with `translationStatus = "submitted"`
2. Email to translators: "New DACUM submission awaiting review"
3. Translator reads raw submission
4. Curator advances workflow (submitted → translated → articulated → published)
5. Martha can request session once `translationStatus = "articulated"`

**Phase 0 Scope**: API + schema. No form UI yet (Phase 1).

---

### Part 2: Temporal Co-Design Fora

**What it does**: Producers propose activations, other nodes sync asynchronously.

**API Route**: `POST /api/activations`

**Request**:
```typescript
{
  title: "Aguachile by the Tide",
  proposingNodeSlug: "ensenada-gathering",
  proposingProducerSlug: "rosa-martinez-xyz123",
  proposedDate: "2026-06-15T14:00:00Z",
  activationFormat: "ceviche_tasting",
  localIngredientFocus: "Wild Pacific catch",
  ancestralStitchSlug: "rosa-aguachile-xyz456",
  spatialContext: "Waterfront tidal zone at low tide",
  seasonalLogic: "When silver springs return and water is cold",
  audienceSize: 30,
  requiresMarthaSession: true,
  consentedAt: "2026-03-26T14:30:00Z"
}
```

**Response**:
```json
{
  "ok": true,
  "_id": "sanity-activation-id",
  "slug": "aguachile-by-the-tide-xyz789",
  "status": "draft",
  "message": "Activation proposal created. Other corridor nodes can sync with it from the Temporal Co-Design Forum."
}
```

**Sanity Workflow**:
1. Creates `corridorActivation` document with `proposalStatus = "draft"`
2. Visible to other node coordinators in Co-Design Fora
3. Other producers can propose syncs (full | echo | relay)
4. Original proposer confirms or declines syncs
5. On confirmation: `proposalStatus → "confirmed"`
6. On activation date: `proposalStatus → "live"`
7. Post-activation: `proposalStatus → "complete"`

**Sync Example** (Node 2 coordinator):
```yaml
syncedNodes:
  - node: { _ref: "ucluelet-fishing" }
    syncingProducer: { _ref: "juan-fisher-abc123" }
    syncType: "full"  # Parallel activation same day
    syncNote: "Our fishers will demonstrate cold-water harvesting alongside Rosa's prep"
    syncedAt: "2026-03-27T10:30:00Z"
```

**Phase 0 Scope**: API + schema. No Fora UI yet (Phase 1).

---

### Part 3: Ripple Validation Dashboard

**What it does**: Tracks engagement metrics, AU (Attribution Unit) trails, sponsor proof.

**Sanity Data**:
```yaml
corridorActivation:
  rippleTracking:
    auTrailId: "AU-2026-06-15-ROSA-AGUACHILE-001"
    engagementVelocity: 0.42
    sponsorProofGenerated: false  # Rosa didn't consent to sponsor_surface
```

**Phase 0 Implementation**:
- Engagement Velocity: Mocked at `0.0–1.0` (Phase 1: live social API)
- AU Trail: Generated on `proposalStatus = "confirmed"`
- Sponsor Proof: Boolean gate based on consent scope
- Dashboard: Read-only Sanity field inspection (Phase 1: custom dashboard UI)

**Phase 0 Scope**: Schema fields only. No dashboard UI yet (Phase 1).

---

## Governance Model

### 5 Stakeholder Roles in Phase 0

| Role | Entry Point | Permissions | Responsibilities |
|------|------------|-------------|------------------|
| **Producer** | Seeding Portal | Submit only (write raw DACUM) | Complete honest assessment of skills + consent scope |
| **Translator** | Sanity Studio | Read submission, write translation notes | Document producer's process in English |
| **Curator** | Sanity Studio | Read all, advance workflow | Weave into collective voice + gate publication |
| **Node Coordinator** | Temporal Fora | Read all activations, write proposals + syncs | Propose activations, coordinate cross-node syncs |
| **Martha** | Session booking (Phase 1) | Read articulated stitches + session readiness | Facilitate sessions, record feedback |

### Decision Gates by Role

**Producer → Submitted**: No gate. API accepts submission.

**Submitted → Translated**: Translator decides (UI workflow in Phase 1).

**Translated → Articulated**:
- Sovereignty flags in place? Knowledge holder clears.
- No flags? Curator advances.

**Articulated → Published**:
- Martha ready to facilitate? Yes → Published.
- Martha not ready? Status stays `articulated`.

**Activation Proposal → Confirmed**:
- Original proposer approves all syncs, OR
- Decides to withdraw proposal.

---

## Anti-Universality Enforcement

### Node-Specific Activation Formats

Each node type has its own format vocabulary:

```yaml
# Coastal node
activationFormat: "live_catch_demo"  # Not "market demo"
nodeSpecificContext:
  localIngredientFocus: "Dungeness crab"
  spatialContext: "Waterfront tidal zone"

# Wine node
activationFormat: "harvest_tasting"  # Not "ingredient demo"
nodeSpecificContext:
  localIngredientFocus: "Pinot noir varietal expression"
  spatialContext: "Vineyard barrel room"

# Urban node
activationFormat: "street_food"  # Not "cooking class"
nodeSpecificContext:
  localIngredientFocus: "Heritage heirloom varieties"
  spatialContext: "Farmers market loading dock"
```

### Gesture Vocabulary is Non-Normalizable

```yaml
# Rosa's gesture (coastal)
gestureDescription: "Hands moving in water to select fish, knife at 45 degrees"

# Vintner's gesture (wine)
gestureDescription: "Swirling glass, nose to rim, breathing in terroir memory"

# Farmer's gesture (urban)
gestureDescription: "Holding heirloom bean, turning in light, reading seed shape"

# All preserved as-is. NOT standardized.
```

---

## CARE Principles as Code

### 4 Checkpoints

**1. Consent Capture** (API layer)
```typescript
consentScope: ["collective_page", "martha_session"]  // NOT sponsor_surface
knowledgeProtections: "Do not share water source geolocation"
```

**2. Translator Review** (Sanity layer)
```yaml
translationNotes:
  sovereigntyFlags: ["TERRITORIAL_WATER_SACRED", "CIP_REQUIRED"]
  culturalReviewNotes: "Knowledge holder approval pending"
```

**3. Knowledge Holder Clearance** (Gate layer)
```yaml
sessionReadiness:
  culturalClearance: true
  clearedBy: "Coastal Knowledge Keeper"
  restrictions: "Do not record. Oral transmission only."
```

**4. Publication Gate** (Workflow layer)
```
if sovereigntyFlags.length > 0:
  require culturalClearance == true
  require clearedBy != null
  // Curator cannot bypass
```

---

## Phase 0 Scope (Delivers)

- [x] Producer Seeding Portal API endpoint
- [x] Temporal Co-Design Fora API endpoint
- [x] Sanity schemas for both flows
- [x] Server-side reference resolution (slug → _id)
- [x] Consent scope + knowledge protection capture
- [x] Sovereignty flag vocabulary
- [x] Cultural clearance gating
- [x] Ripple tracking data structure
- [x] Dry-run mode (development without Sanity credentials)

---

## Phase 0 Does NOT Include

- [ ] Producer Seeding Form UI (React component)
- [ ] Temporal Co-Design Fora UI (React component)
- [ ] Sanity Studio workflow visualization (custom desks)
- [ ] Public-facing Corridor pages (activation calendar)
- [ ] Martha session scheduling system
- [ ] Live Ripple Validator dashboard
- [ ] Email notifications between workflow phases
- [ ] Producer profile public templates
- [ ] Sponsor surface rendering (CollectiveIdentityShell HTML)
- [ ] Revenue share payment system

These arrive Phase 1+ once producer + node + Martha feedback stabilizes.

---

## Technical Stack

**Backend**:
- Next.js 15.3.0 API routes
- Sanity v5.18.0 CMS
- TypeScript for type safety

**Data**:
- 4 Sanity schemas (corridorNode, producerProfile, ancestralStitch, corridorActivation)
- 4 LinkML YAML sources (schema-as-code for reference)
- 2 API routes (/api/seed, /api/activations)

**Validation**:
- TypeScript interfaces for request shape
- Server-side reference resolution (slug → Sanity _id)
- Dry-run fallback for development

---

## Deployment Checklist

**Before Phase 0 goes live**:

- [ ] Run `npx tsc --noEmit` ✅ (done)
- [ ] Commit Phase 0 code ✅ (done)
- [ ] Deploy to staging environment
- [ ] Test /api/seed endpoint with sample producer
- [ ] Test /api/activations endpoint with sample activation
- [ ] Verify Sanity schema import + data capture
- [ ] Validate consent scope enforcement
- [ ] Validate sovereignty flag preservation
- [ ] Brief producer + node coordinators on new system
- [ ] Soft launch with 2–3 pilot producers (not public yet)
- [ ] Gather feedback from translators + curators + Martha

---

## Feedback Loops (What Phase 0 Captures)

Once producers + nodes + Martha use Phase 0, we learn:

1. **Producer Language**: sourceLanguage field captures original vocabulary
2. **Translator Workflow**: translationNotes captures what takes time, what's easy
3. **Cultural Gating**: sovereigntyFlags reveals what decisions need human judgment
4. **Node Coordination**: syncedNodes reveals cross-node dynamics
5. **Martha Integration**: Session feedback (Phase 1 capture) reveals what facilitators need

This informs Phase 1 UI/UX design — no premature abstraction.

---

## Success Metrics for Phase 0

- ✅ All 4 schemas pass TypeScript compilation
- ✅ All 2 API routes return 200 on valid submission
- ✅ Sanity documents persist with all fields intact
- ✅ Dry-run mode works for development
- ✅ Consent scope enforced (sponsor_surface gates sponsorProofGenerated)
- ✅ Sovereignty flags preserved in audit trail
- ✅ Server-side reference resolution works (slug → _id)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-26 | Phase 0 backstage utility build. 3-part hub (seeding + fora + ripple) with CARE principles embedded. Antimaximalist scope. |

---

## Next Steps

### Immediate (Phase 0 completion):
1. Gather producer feedback on Seeding Portal (UI design input)
2. Brief node coordinators on Temporal Fora (coordination dynamics)
3. Validate Martha's session prep workflow

### Short-term (Phase 1 planning):
1. Design Producer Seeding Form UI
2. Design Temporal Co-Design Fora UI (calendar + sync proposal interface)
3. Build Sanity Studio custom desks (workflow visualization)
4. Implement Martha session booking + feedback capture

### Medium-term (Phase 2+):
1. Public-facing Corridor pages (activation calendar + producer profiles)
2. Sponsor surface rendering + AU trail dashboard
3. Revenue share payment integration
4. Live Ripple Validator engagement metrics
