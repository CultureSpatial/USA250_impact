# Martha's Calling Card Framework → Phase 0 Sanity Implementation

**Matcher v1.0** | 2026-03-26

---

## Martha's 6-Phase Credentialing Architecture

Martha's Calling Card defines practitioner credentialing as a **6-phase journey from invitation through session mastery**, practitioner-led (not university-dependent).

### Phase 1: Invitation
**Martha's Concept**: Practitioner acknowledges they have knowledge worth documenting.

**Sanity Implementation**:
- Producer submits via Producer Seeding Portal (`/api/seed`)
- Creates `producerProfile` with `translationStatus = 'submitted'`
- Email confirmation: "Your invitation to share has been recorded"

```typescript
// POST /api/seed payload
{
  name: "Rosa Martinez",
  producerType: "chef",
  nodeSlug: "ensenada-gathering",
  primarySkill: "Aguachile preparation from caught fish",
  sourceLanguage: "es-MX",
  gestureDescription: "Hands moving in water to select fish, knife angle matters",
  consentedAt: "2026-03-26T14:22:00Z",
  consentScope: ["collective_page", "martha_session"],
  knowledgeProtections: "Do not share the specific water source"
}

// Creates:
producerProfile: {
  _type: "producerProfile",
  name: "Rosa Martinez",
  slug: "rosa-martinez-xyz123",
  producerType: "chef",
  node: { _ref: "..." }, // resolves ensenada-gathering
  dacumProfile: { ... },
  translationStatus: "submitted", // Phase 1
  consentRecord: { ... }
}
```

### Phase 2: Practice Documentation
**Martha's Concept**: Translator documents the practitioner's process in their own language.

**Sanity Implementation**:
- Translator reviews submission in Sanity Studio
- Reads `producerProfile.dacumProfile` (raw submission)
- Creates `translationNotes.translatedAt`, `translatedBy`
- Advances `translationStatus → 'translated'`
- Does NOT edit gestureDescription — only adds metadata

```yaml
producerProfile:
  translationStatus: "translated"  # Phase 2
  translationNotes:
    translatedAt: "2026-03-27T09:30:00Z"
    translatedBy: "Juan Lopez (Spanish translator)"
    culturalReviewNotes: |
      Rosa's gesture description captures the water movement.
      Knife angle preference indicates 30-year practice mastery.
  dacumProfile:
    sourceLanguage: "es-MX"
    gestureDescription: "Hands moving in water to select fish, knife angle matters"
    # ↑ Original preserved for audit trail
```

### Phase 3: Cultural Review
**Martha's Concept**: Knowledge holder or steward approves content for shared learning.

**Sanity Implementation**:
- Cultural reviewer (distinct role) reads translatedBy work
- Checks if `sovereigntyFlags` require CARE/CIP review
- Approves or flags for restriction
- Sets `ancestralStitch.sessionReadiness.culturalClearance = true`

```yaml
ancestralStitch:
  title: "Rosa's Aguachile"
  sessionReadiness:
    status: "review"  # Not yet ready for Martha
    culturalClearance: false
    restrictions: |
      The specific water source is sacred to our ceremony.
      Martha sessions can proceed without naming the source.
      Geolocation data must remain internal.

  translationNotes:
    sovereigntyFlags: ["CIP_REQUIRED", "TERRITORIAL_WATER_SACRED"]
    culturalReviewNotes: |
      Coastal Knowledge Keeper approval pending.
      Rosa must confirm public-facing description hides source location.
```

Only when `culturalClearance = true` can transition to Phase 4.

### Phase 4: Articulation
**Martha's Concept**: Translator + curator weave practitioner voice into collective corridor narrative.

**Sanity Implementation**:
- Curator re-reads all previous notes
- Writes `articulatedVoice` (Portable Text) — collective voice incorporating producer's language
- Sets `translationNotes.articulatedAt`
- Advances `translationStatus → 'articulated'`

```typescript
producerProfile: {
  translationStatus: "articulated",  // Phase 4
  translationNotes: {
    articulatedAt: "2026-03-28T14:00:00Z",
    culturalReviewNotes: "Approved for public corridor page."
  },
  articulatedVoice: [
    {
      _type: "block",
      _key: "block-001",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Rosa brings thirty years of coastal practice to the table. "
            + "She reads fish the way water reads seasons. "
            + "Her hands know depths that maps cannot chart."
        }
      ]
    }
  ]
}
```

Corridor page now has public biography. Martha can request session with Rosa.

### Phase 5: Session Integration
**Martha's Concept**: Practitioner demonstrates mastery in live oral-kinetic session.

**Sanity Implementation**:
- Martha facilitates session with Rosa
- Records session feedback (TBD Phase 1 feature)
- Updates `ancestralStitch.sessionReadiness.status → 'ready'`
- Marks `sessionReadiness.culturalClearance = true` post-session validation

```yaml
ancestralStitch:
  title: "Rosa's Aguachile"
  sessionReadiness:
    status: "ready"  # Phase 5 complete
    culturalClearance: true
    clearedBy: "Martha (Oral-Kinetic Facilitator)"

  gesturePacket:
    gestureDescription: "Rosa's hands in water, knife at 45 degrees..."
    soundSignature: "Water running, fish gasping, blade on board"
    durationMinutes: 14

  ingredientPacket:
    primaryIngredient: "Wild Pacific catch (unspecified source)"
    acidProfile: "Lime + local chiles + water from ceremony grounds"
    season: "summer"
```

Other Martha facilitators can now use Rosa's stitch in their sessions.

### Phase 6: Credential Signoff
**Martha's Concept**: Practitioner receives formal recognition + appears in public profiles.

**Sanity Implementation**:
- Final publish gate: `translationStatus → 'published'`
- Prodile now appears on public corridor page
- Invitation becomes community asset

```yaml
producerProfile:
  translationStatus: "published"  # Phase 6
  # Now renders on /corridors/[corridor-name]/producers
  # Rosa's name, story, photo, linked stitch visible to public
  # Consent scope controls where else (sponsor_surface, dtc_attribution)
```

---

## Gating Logic: Each Phase is a Threshold

### Explicit Gates by Phase

**Phase 1 → 2**: No gate. Submission auto-triggers notification to translator.

**Phase 2 → 3**: No gate. Translation complete signals cultural reviewer.

**Phase 3 → 4**: `sovereigntyFlags.length === 0 OR culturalClearance === true`
- If flags exist, knowledge holder must explicitly clear
- Curator cannot override cultural decisions

**Phase 4 → 5**: Martha requests session + completes session
- Status update from `articulated` → `ready` happens post-session
- Martha's lived feedback validates mastery

**Phase 5 → 6**: Final publish approval (Sanity Studio button)
- Curator confirms no new sovereignty concerns
- Consent scope verified
- Public profile enabled

### What Martha Gets at Each Phase

| Phase | Martha Sees | Martha Can Do |
|-------|------------|---------------|
| 1: Invitation | Producer submitted | Read-only intake |
| 2: Documentation | Translated DACUM | Request session prep |
| 3: Cultural Review | Flagged restrictions | Coordinate with knowledge holders |
| 4: Articulation | Published voice + image | Schedule session |
| 5: Session Integration | Live demonstration | Record session feedback |
| 6: Credential Signoff | Public profile live | Recommend for other sessions |

---

## Sovereignty Checkpoints

### Built Into Phase 3 Gate

```typescript
// Before advancing to Phase 4 (Articulation):
if (ancestralStitch.sessionReadiness.sovereigntyFlags.length > 0) {
  require: ancestralStitch.sessionReadiness.culturalClearance === true
  AND clearedBy !== null
  // Curator cannot bypass
}
```

### Sovereignty Flags as Vocabulary

```yaml
sovereigntyFlags:
  - "CIP_REQUIRED"        # CIP (Cultural Intellectual Property) review
  - "CASL_CONSENT"        # Canadian CASL email marketing consent
  - "SEASONAL_GATE"       # Cannot share outside specific season
  - "SACRED_KNOWLEDGE"    # Knowledge holder approval required
  - "TERRITORIAL_WATER"   # Geolocation-sensitive water source
  - "CEREMONY_LINKED"     # Part of living ceremony cycle
  - "LANGUAGE_PURITY"     # Original language preservation mandate
  - "REVENUE_SENSITIVE"   # DtC attribution or revenue share restrictions
```

Only knowledge holders can clear these flags.

---

## Production Readiness Checklist

Martha accepts a `producerProfile` for session integration when:

- [x] `translationStatus = "articulated"`
- [x] `ancestralStitch` exists (compiled from producer)
- [x] `ancestralStitch.sessionReadiness.culturalClearance = true`
- [x] `ancestralStitch.sessionReadiness.restrictions` understood (read by Martha)
- [x] `ancestralStitch.gesturePacket.gestureDescription` documented
- [x] `consentRecord.consentScope` includes `"martha_session"`
- [x] No unresolved `sovereigntyFlags`

Once all checkboxes pass, Martha can integrate into schedule.

---

## Example Flow: Rosa's Journey

```
Day 1 (Rosa at seeding event):
  Rosa submits: name, aguachile process, consent scope
  → producerProfile created (submitted)

Day 3 (Juan translator reads):
  Juan documents Rosa's methods in English
  → translationStatus: submitted → translated

Day 5 (Coastal Knowledge Keeper reviews):
  CKP approves for public sharing (but flags geolocation as sacred)
  → sovereigntyFlags: ["TERRITORIAL_WATER_SACRED"]
  → culturalClearance: true (with restrictions noted)

Day 7 (Curator articulates):
  Curator weaves Rosa's biography into corridor narrative
  → translationStatus: translated → articulated
  → articulatedVoice: published prose ready for public page

Week 2 (Martha sessions Rosa):
  Martha guides Rosa through oral-kinetic demonstration
  Post-session validation: "Rosa's mastery confirmed"
  → ancestralStitch.sessionReadiness.status: ready

Week 3 (Publication):
  Final approval button pressed
  → translationStatus: articulated → published
  → producerProfile appears on /corridors/ensenada/producers
  → Martha can cite Rosa in future sessions

Ongoing:
  Rosa's profile is public asset
  Activation proposals mentioning Rosa's stitch (via reference)
  appear in Temporal Co-Design Fora
```

---

## Implementation Gaps (Phase 0 → Phase 1)

**Phase 0 Delivers**:
- [x] API endpoint for submissions
- [x] Translation state machine in schema
- [x] Sovereignty flag vocabulary
- [x] Cultural clearance gates

**Phase 1 Needs**:
- [ ] Sanity Studio workflow UI (visual pipeline)
- [ ] Translator desk (dedicated interface)
- [ ] Cultural reviewer desk (flag management)
- [ ] Martha's session feedback form (post-session capture)
- [ ] Producer profile public template
- [ ] Email notifications between phases
- [ ] Audit trail (who changed what, when)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-26 | Initial mapping of Martha's 6 phases to Sanity workflow. Sovereignty checkpoints documented. Production readiness criteria defined. |
