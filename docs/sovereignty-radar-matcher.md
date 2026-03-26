# Indigenous Tourism Sovereignty Radar → Phase 0 Implementation

**Matcher v1.0** | 2026-03-26

---

## Sovereignty Radar: 8-Lane Tracking System

The Sovereignty Radar monitors Indigenous knowledge and cultural control across 8 dimensions. Phase 0 embeds these as schema fields + workflow gates.

---

## Lane 1: Knowledge Control

**Concept**: Who owns the information and decides where it travels?

**Phase 0 Implementation**:
```yaml
consentRecord:
  consentScope:
    - "collective_page"      # Can appear on corridor map
    - "martha_session"       # Can use in Martha sessions
    - "sponsor_surface"      # Can appear in sponsor branding
    - "dtc_attribution"      # Can track revenue attribution
```

**Workflow**:
- Producer selects scope during seeding submission
- Translator cannot expand scope
- Curator cannot expand scope
- Only producer + knowledge holder can modify

**Sanity Field**: `producerProfile.consentRecord.consentScope` (enum array, immutable after creation)

---

## Lane 2: Cultural Clearance

**Concept**: Who validated this knowledge is appropriate to share?

**Phase 0 Implementation**:
```yaml
ancestralStitch:
  sessionReadiness:
    culturalClearance: true
    clearedBy: "Rosa Martinez (Knowledge Holder)"
    clearanceDate: "2026-03-28T10:00:00Z"
```

**Workflow**:
- Translator flags if review needed (`sovereigntyFlags`)
- Knowledge holder explicitly clears (or withholds clearance)
- Martha cannot use stitch until `culturalClearance = true`

**Sanity Field**: `ancestralStitch.sessionReadiness.{culturalClearance, clearedBy}`

---

## Lane 3: Seasonal Timing

**Concept**: Can this knowledge be shared right now? Or must we wait for the right season?

**Phase 0 Implementation**:
```yaml
ancestralStitch:
  ingredientPacket:
    season: "summer"  # spring | summer | autumn | winter | year_round | ceremonial

corridorActivation:
  proposedDate: "2026-06-15T14:00:00Z"
  seasonalLogic: "When the silver springs return and water is cold"
```

**Workflow**:
- Ingredient carries `season` field (enum)
- Activation proposes a specific date + narrative reason
- Martha validates: "Is today the right moment to activate this stitch?"
- If `season = "ceremonial"`, only knowledge holder decides timing

**Sanity Fields**:
- `ancestralStitch.ingredientPacket.season`
- `corridorActivation.seasonalLogic` (narrative)
- `corridorActivation.proposedDate`

**Decision Gate**:
```
if stitch.season == "ceremonial":
  activation.proposedDate must be approved by clearedBy knowledge holder
```

---

## Lane 4: Sacred Boundaries

**Concept**: What parts of this knowledge are NOT for public sharing?

**Phase 0 Implementation**:
```yaml
ancestralStitch:
  sessionReadiness:
    restrictions: |
      Do not record video.
      Do not share the water source geolocation.
      Oral transmission only — no written recipe.
      This is part of a living ceremony — cannot be performed outside that context.
```

**Workflow**:
- Producer (or knowledge holder) specifies restrictions during submission
- Translator preserves restrictions in notes
- Martha reads restrictions before every session
- Restrictions are NON-NEGOTIABLE by curator or Martha

**Sanity Field**: `ancestralStitch.sessionReadiness.restrictions` (text)

**Martha's Constraint**:
```typescript
// Before confirming session with this stitch:
if (stitch.sessionReadiness.restrictions.length > 0) {
  martha.readAndAcknowledge(stitch.sessionReadiness.restrictions)
  martha.confirmUnderstanding() // Explicit checkbox
}
```

---

## Lane 5: Revenue Attribution

**Concept**: If this knowledge creates value, who gets paid?

**Phase 0 Implementation**:
```yaml
corridorActivation:
  rippleTracking:
    auTrailId: "AU-2026-03-15-ROSA-AGUACHILE-001"
    engagementVelocity: 0.42
    sponsorProofGenerated: true
```

**Workflow**:
- Activation creates unique Attribution Unit (AU) trail ID
- Engagement metrics tracked (Phase 0: mocked; Phase 1: live social API)
- Sponsor content usage recorded (sponsorProofGenerated boolean)
- AU trails feed into DtC revenue distribution model (TBD)

**Sanity Fields**:
- `corridorActivation.rippleTracking.auTrailId`
- `corridorActivation.rippleTracking.engagementVelocity`
- `corridorActivation.rippleTracking.sponsorProofGenerated`

**Decision Gate**:
```
if producerProfile.consentScope includes "dtc_attribution":
  Activation automatically generates AU trail
  Revenue share model applies
```

---

## Lane 6: Language Purity

**Concept**: Is original language preserved? Or lost in translation?

**Phase 0 Implementation**:
```yaml
producerProfile:
  dacumProfile:
    sourceLanguage: "hul'q'umi'num'"  # Original language preserved
    gestureDescription: "[preserved in source language]"

  translationNotes:
    translatedBy: "Maria Lopez (Indigenous language specialist)"
    languagePreservationNote: "Gesture names kept in original language with English description below"
```

**Workflow**:
- Producer submits in their source language
- Translator preserves original language in dacumProfile
- articulatedVoice uses English for public corridor page
- Archive preserves source language side-by-side

**Sanity Fields**:
- `producerProfile.dacumProfile.sourceLanguage`
- `producerProfile.translationNotes.languagePreservationNote`

**Decision Gate**:
```
if sourceLanguage != "English":
  Translator MUST preserve original language in audit trail
  Curator must acknowledge language preservation in articulatedVoice
```

---

## Lane 7: Sponsorship Proxy

**Concept**: Is a sponsor using our knowledge/image/name? Is that approved?

**Phase 0 Implementation**:
```yaml
corridorActivation:
  rippleTracking:
    sponsorProofGenerated: true
    sponsorUsageRecord: |
      [TBD Phase 1: Tracking proof]
      - Sponsor name: [brand]
      - Content used: [description]
      - Usage date: [timestamp]
      - Producer approval: [yes/no]
```

**Workflow**:
- Activation generates unique auTrailId for sponsor tracking
- When sponsor uses content, sponsorProofGenerated = true (Phase 1: automated)
- Producer + knowledge holder can review sponsor usage
- Consent scope gates whether sponsor is allowed at all

**Sanity Field**: `corridorActivation.rippleTracking.sponsorProofGenerated` (boolean)

**Decision Gate**:
```
if consentScope DOES NOT include "sponsor_surface":
  sponsorProofGenerated must remain false
  Sponsor cannot use this producer's content
```

---

## Lane 8: Temporal Coherence

**Concept**: Is this the right moment for this activation? Does it align with FIFA calendar + seasonal logic + node readiness?

**Phase 0 Implementation**:
```yaml
corridorActivation:
  proposedDate: "2026-06-15T14:00:00Z"
  fifaMatchDay: "Group Stage D · June 15"

  nodeSpecificContext:
    seasonalLogic: "When silver springs return and the water is cold"
    spatialContext: "Waterfront tidal zone at low tide"
    audienceSize: 30
    requiresMarthaSession: true
```

**Workflow**:
- Producer proposes activation aligned to FIFA 2026 calendar
- Seasonal logic explains WHY this moment is right for this node
- Node coordinator reviews alignment with other activations
- Martha validates if session facilitation is needed

**Sanity Fields**:
- `corridorActivation.proposedDate`
- `corridorActivation.fifaMatchDay`
- `corridorActivation.nodeSpecificContext.seasonalLogic`
- `corridorActivation.nodeSpecificContext.spatialContext`
- `corridorActivation.nodeSpecificContext.requiresMarthaSession`

**Decision Gate**:
```typescript
// Temporal coherence check:
if (activation.requiresMarthaSession == true) {
  if (Martha.available(activation.proposedDate) == false) {
    activation.proposalStatus = "pending_martha"
    notify: "Awaiting Martha session availability"
  }
}
```

---

## 8-Lane Interaction Matrix

Some lanes depend on others:

| Lane | Depends On | Conflict Resolution |
|------|------------|-------------------|
| Knowledge Control | — | Primary decision authority |
| Cultural Clearance | Knowledge Control | Clearance cannot override producer consent |
| Seasonal Timing | Cultural Clearance | If sacred (ceremonial), clearance determines timing |
| Sacred Boundaries | Knowledge Control | Cannot be overridden; Martha must acknowledge |
| Revenue Attribution | Knowledge Control | Only applies if `dtc_attribution` in consent scope |
| Language Purity | — | Orthogonal to all other lanes |
| Sponsorship Proxy | Knowledge Control | Cannot be overridden if `sponsor_surface` not in scope |
| Temporal Coherence | Cultural Clearance, Seasonal Timing | Must pass both before activation confirmed |

---

## Real-World Scenario: Rosa's Aguachile Activation

```
Lane 1: Knowledge Control
  Rosa selected: ["collective_page", "martha_session"]
  NOT "sponsor_surface" or "dtc_attribution"
  → Sponsor cannot use her profile/image

Lane 2: Cultural Clearance
  Coastal Knowledge Keeper cleared for public sharing
  clearedBy: "Coastal Knowledge Keeper"
  → Can proceed

Lane 3: Seasonal Timing
  Aguachile season: "summer"
  Proposed date: June 15, 2026 (Group Stage D)
  seasonalLogic: "When water is coldest and fish are fullest"
  → Aligned

Lane 4: Sacred Boundaries
  Restrictions: "Do not share water source geolocation"
  → Martha must read and acknowledge

Lane 5: Revenue Attribution
  consentScope DOES NOT include "dtc_attribution"
  → No AU trail generated
  → No revenue share for Rosa

Lane 6: Language Purity
  sourceLanguage: "es-MX"
  Original Spanish preserved in archive
  → Preserved

Lane 7: Sponsorship Proxy
  consentScope DOES NOT include "sponsor_surface"
  → Sponsor CANNOT use Rosa's name or profile
  sponsorProofGenerated: false (enforced)

Lane 8: Temporal Coherence
  Proposed: June 15, 2026 (FIFA match day)
  Martha available: Yes (confirmed)
  Node readiness: Waterfront venue ready
  requiresMarthaSession: true (Martha confirmed)
  → Activation can proceed

RESULT: Rosa's aguachile activation approved for Martha session
        Coastal Knowledge Keeper + Rosa maintain full control
        Sponsor cannot brand around it
        Language preserved in archive
```

---

## Phase 0 Radar Status

**Fully Implemented (Schema + Validation)**:
- ✅ Lane 1: Knowledge Control (consentScope enum)
- ✅ Lane 2: Cultural Clearance (culturalClearance boolean + clearedBy)
- ✅ Lane 3: Seasonal Timing (season enum + seasonalLogic narrative)
- ✅ Lane 4: Sacred Boundaries (restrictions text field)
- ✅ Lane 5: Revenue Attribution (auTrailId + sponsorProofGenerated)
- ✅ Lane 6: Language Purity (sourceLanguage + archive preservation)
- ✅ Lane 7: Sponsorship Proxy (consentScope gates)
- ✅ Lane 8: Temporal Coherence (proposedDate + fifaMatchDay + requiresMarthaSession)

**Requires Phase 1 Implementation**:
- [ ] Sanity Studio workflow visualization (8-lane dashboard)
- [ ] Lane monitoring alerts (when restrictions violated)
- [ ] Sponsor proof tracking API (automatic sponsorProofGenerated capture)
- [ ] Radar analytics dashboard (aggregate sovereignty metrics)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-26 | Mapped 8-lane Sovereignty Radar to Phase 0 Sanity schema. All lanes documented with decision gates and interaction matrix. |
