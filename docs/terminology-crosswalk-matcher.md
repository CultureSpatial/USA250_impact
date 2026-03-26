# Terminology Cross-Walk → Phase 0 Schema Vocabulary

**Matcher v1.0** | 2026-03-26

---

## Purpose

This document aligns terminology across:
- **Martha's Calling Card** (practitioner-first framework)
- **Indigenous Tourism Sovereignty** (knowledge control)
- **Corridor B2B2C Network** (producer coordination)
- **Sanity CMS Schema** (implementation)
- **LinkML** (schema-as-code reference)

Goal: Ensure no terminology slippage as we move from concept to implementation.

---

## Core Terminology Map

### 1. Practitioner ↔ Producer

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Practitioner role | Producer | `producerProfile.producerType` | ProducerTypeEnum | chef \| fisher \| cultural_custodian \| winemaker \| venue_operator \| agricultural |
| Not an Author | Not a "content creator" | — | — | Producer doesn't write copy; translator does |
| Not a Practitioner | Martha-credentialed person | — | — | A Producer becomes Martha-credentialed after Phase 5 |

**In Use**: "Rosa is a producer (chef). Martha is a practitioner (facilitator). Producer submissions feed into practitioner sessions."

---

### 2. Competency ↔ DACUM Profile

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Competency documentation | DACUM profile submission | `producerProfile.dacumProfile` | DACUMProfile | primarySkill, yearsOfPractice, localIngredientSignature, gestureDescription |
| Raw submission | Unedited producer voice | `dacumProfile.*` fields | — | Preserved as-is in archive |
| Gesture expression | Oral-kinetic vocabulary | `dacumProfile.gestureDescription` | text | "How they physically make their signature dish — in their own words" |
| Signature ingredient | Local name (terroir-bound) | `dacumProfile.localIngredientSignature` | string | "The one ingredient that defines their practice in this place" |

**In Use**: "Rosa's DACUM profile includes her gesture for selecting fish (hand movement in water) and her signature ingredient (Dungeness crab from cold deep water)."

---

### 3. Knowledge Holder ↔ Cultural Reviewer

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Authority figure | Knowledge holder / Steward | `ancestralStitch.sessionReadiness.clearedBy` | string | Named individual with cultural authority |
| Review decision | Cultural clearance | `ancestralStitch.sessionReadiness.culturalClearance` | boolean | Gate for session use |
| Review notes | Sovereignty flags | `ancestralStitch.translationNotes.sovereigntyFlags` | array | CIP_REQUIRED, CASL_CONSENT, SEASONAL_GATE, SACRED_KNOWLEDGE, etc. |

**In Use**: "The Coastal Knowledge Keeper (knowledge holder) cleared Rosa's aguachile stitch for Martha sessions, but flagged the water source as sacred (sovereigntyFlags: [TERRITORIAL_WATER_SACRED])."

---

### 4. Gesture ↔ Oral-Kinetic Vocabulary

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Gesture expression | Oral-kinetic vocabulary | `ancestralStitch.gesturePacket.gestureDescription` | text | Translated but not sanitized |
| Gesture components | Physical vocabulary | `ancestralStitch.gesturePacket.bodyParts` | array | hands, knife, water, fire, etc. (TBD Phase 1) |
| Sound signature | Sonic vocabulary | `ancestralStitch.gesturePacket.soundSignature` | string | "Water running, fish gasping, blade on board" |
| Duration | Session length | `ancestralStitch.gesturePacket.durationMinutes` | integer | 14 minutes for Rosa's demo |

**In Use**: "Martha facilitates Rosa's gesture — water, knife, hands moving. The sound signature (gasping fish, blade) cues Martha to adjust tempo."

---

### 5. Ingredient ↔ Stitch Packet

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Ingredient packet | Stitch packet (compiled) | `ancestralStitch.ingredientPacket` | IngredientPacket | Central ingredient + supporting ingredients + context |
| Primary ingredient | Central species/cultivar | `ingredientPacket.primaryIngredient` | string | "Wild Pacific catch" (not normalized) |
| Local name | Territory language | `ingredientPacket.localName` | string | "Recorded as pronounced, not normalized" |
| Acid profile | Flavor foundation | `ingredientPacket.acidProfile` | string | Citrus, ferment, brine, smoke, age |
| Terroir | Place character | `ingredientPacket.terroir` | text | "Where it comes from — the water, soil, or sky that made it" |
| Season | Harvest window | `ingredientPacket.season` | SeasonEnum | spring \| summer \| autumn \| winter \| ceremonial |
| Supporting ingredients | Complementary elements | `ingredientPacket.supportingIngredients[]` | SupportingIngredient[] | ingredient, localName, role (acid \| fat \| heat \| sweet \| bitter \| textural \| ceremonial) |

**In Use**: "Rosa's ingredient packet: primary = wild Pacific catch, local name = 'pescado recién sacado', acid profile = lime from ceremonies, terroir = cold deep water, season = summer, supporting = chiles (heat), avocado (fat)."

---

### 6. Activation ↔ Proposal

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Activation proposal | Temporal co-design proposal | `corridorActivation` | CorridorActivation | Producer proposes date + node + format |
| Proposal status | ProposalStatus state | `proposalStatus` | ProposalStatusEnum | draft \| open \| synced \| confirmed \| live \| complete \| withdrawn |
| Proposed date | Temporal anchor | `proposedDate` | datetime | ISO 8601 timestamp |
| FIFA calendar alignment | Match day reference | `fifaMatchDay` | string | "Group Stage D · June 15" |
| Node context | Location + logistics | `nodeSpecificContext` | NodeSpecificContext | localIngredientFocus, spatialContext, seasonalLogic, audienceSize, requiresMarthaSession |

**In Use**: "Rosa proposes an aguachile activation on June 15 (Group Stage D), at the waterfront tidal zone. It requires a Martha session because the gesture is the knowledge (not just the product)."

---

### 7. Sync ↔ Cross-Node Participation

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Sync | Cross-node coordination | `corridorActivation.syncedNodes[]` | NodeSync[] | Other nodes participate in activation |
| Sync type | Participation mode | `syncedNodes[].syncType` | SyncTypeEnum | full (parallel same date) \| echo (complementary same week) \| relay (sequential next day) |
| Syncing producer | Node representative | `syncedNodes[].syncingProducer` | reference | ProducerProfile from syncing node |
| Sync note | Contribution description | `syncedNodes[].syncNote` | text | "What the syncing node is contributing — in their own words" |

**In Use**: "Ucluelet fishing node syncs with Rosa's activation (full sync). Their fishers participate in the waterfront demo. They contribute their cold-water harvesting gesture."

---

### 8. Translation Workflow

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Translation status | Workflow state | `producerProfile.translationStatus` | TranslationStatusEnum | submitted \| translated \| articulated \| published |
| Translator role | Language specialist | `translationNotes.translatedBy` | string | Name of translator (audit trail) |
| Articulation | Voice weaving | `translationNotes.articulatedAt` | datetime | Curator weaves into collective voice |
| Articulated voice | Final public text | `articulatedVoice` | Portable Text array | Block-rich "corridor voice" for public page |
| Cultural review | Knowledge gating | `translationNotes.sovereigntyFlags[]` | array | Gates publication (Phase 4 → 5 transition) |

**In Use**: "Juan (Spanish translator) documented Rosa's submission (translated). Maria (curator) wove Rosa's story into corridor voice (articulated). Coastal Knowledge Keeper cleared for public (culturalClearance). Rosa's biography now live (published)."

---

### 9. Consent & Protection

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Consent scope | Usage permission | `consentRecord.consentScope` | ConsentScopeEnum[] | collective_page \| sponsor_surface \| martha_session \| dtc_attribution |
| Knowledge protection | Exclusion statement | `consentRecord.knowledgeProtections` | text | "What this producer has explicitly asked NOT to be shared publicly" |
| Sacred boundary | Restriction | `ancestralStitch.sessionReadiness.restrictions` | text | Non-negotiable constraints on session use |

**In Use**: "Rosa consents to collective_page and martha_session, but NOT sponsor_surface. She protects the water source geolocation. Martha must read restrictions before every session."

---

### 10. Engagement & Attribution

| Concept | Martha's Term | Sanity Field | LinkML Type | Notes |
|---------|---|---|---|---|
| Attribution Unit | AU trail | `rippleTracking.auTrailId` | string | Generated on activation confirmation |
| Engagement Velocity | Interaction intensity | `rippleTracking.engagementVelocity` | float | 0–1 score (mocked Phase 0, live Phase 1) |
| Sponsor proof | Usage documentation | `rippleTracking.sponsorProofGenerated` | boolean | Did sponsor use this content? |

**In Use**: "Rosa's aguachile activation generated AU trail AU-2026-06-15-ROSA-001. Engagement velocity hit 0.68 (high). Sponsor proof = false (Rosa didn't consent to sponsor_surface)."

---

## Anti-Universality Vocabulary

These terms are deliberately used to signal "do not normalize":

| Term | Meaning | Example |
|------|---------|---------|
| **Node-specific** | Unique to this territory | "Aguachile is node-specific to Ensenada" |
| **Local name** | Territory language, not scientific | "Dungeness" vs "Metacarcinus productus" |
| **Terroir** | Place-specific character | "Cold deep water makes this crab unique" |
| **Gesture vocabulary** | Producer's physical language | "Rosa's hand angle matters" |
| **Seasonallogic** | Why now, not calendar-driven | "When water is coldest, not December 21" |
| **Sacred boundary** | Cannot be normalized/generalized | "This water is ceremonial — cannot be replicated elsewhere" |

---

## Liminality Vocabulary

These terms signal threshold-crossing moments:

| Term | Meaning | Transition |
|------|---------|-----------|
| **Submitted** | Invitation acknowledged | Producer enters system |
| **Translated** | Language documented | Raw voice preserved + English created |
| **Articulated** | Voice woven into collective | Individual becomes community asset |
| **Published** | Live in public spaces | Crossing into corridor page |
| **Ready** | Martha-approved for sessions | Stitch cleared for facilitation |

---

## Federated Epistemology Vocabulary

These terms signal multiple knowledge systems at work:

| Term | Meaning | In Use |
|------|---------|--------|
| **Sovereignty flag** | Knowledge system gate | "CIP_REQUIRED prevents publication without CIP review" |
| **Knowledge holder** | Authority in their system | "Coastal Knowledge Keeper has authority over water sources" |
| **Oral transmission** | Knowledge mode (not written) | "Cannot record this gesture" |
| **Cultural clearance** | System-specific approval | "Cleared by Indigenous knowledge protocol, not Western credentialing" |
| **Source language** | Original knowledge language | Preserved in archive, not erased by translation |

---

## Terminology Discipline Rules

### Rule 1: Producer ≠ Author
- Producer: Submits DACUM profile via seeding portal
- Author: Writes content for publication
- In Phase 0: Producers submit, curators author (become authors)

### Rule 2: Gesture ≠ Recipe
- Gesture: Physical vocabulary (how body moves)
- Recipe: Written instructions
- In Phase 0: Gestures preserved in gestureDescription, recipes NOT created

### Rule 3: Stitch ≠ Template
- Stitch: Specific producer's ingredient + gesture + terroir
- Template: Generic category for replication
- In Phase 0: Stitches are non-normalizable (Dungeness ≠ aguachile)

### Rule 4: Sync ≠ Duplicate
- Sync: Node coordinates with another's activation (sync type: full | echo | relay)
- Duplicate: Copy of activation at another node
- In Phase 0: Syncing preserves each node's context (anti-universality)

### Rule 5: Sovereignty Flag ≠ Warning Label
- Sovereignty flag: Decision authority gate (CIP review required before publication)
- Warning label: Informational only
- In Phase 0: Flags are GATING mechanisms, not just labels

---

## Vocabulary Consistency Checklist

When writing new features or documentation, verify:

- [ ] Use "producer" (not "content creator" or "contributor")
- [ ] Use "DACUM profile" (not "bio submission" or "questionnaire")
- [ ] Use "gesture" (not "technique" or "method")
- [ ] Use "terroir" (not "origin" or "sourcing")
- [ ] Use "stitch" (not "template" or "recipe")
- [ ] Use "sync" (not "duplicate" or "mirror")
- [ ] Use "sovereignty flag" (not "warning" or "note")
- [ ] Use "knowledge holder" (not "expert" or "authority")
- [ ] Use "oral transmission" (not "secret" or "password")
- [ ] Use "node-specific" (not "customized" or "localized")
- [ ] Use "articleinated voice" (not "edited biography" or "marketing copy")
- [ ] Use "cultural clearance" (not "approval" or "sign-off" without context)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-26 | Initial terminology cross-walk. 10 concept maps + vocabulary discipline rules. Spans Martha's, Sovereignty, Corridor, Sanity, LinkML. |
