# Strategic Corrections (August 2026)

**Version:** 2.2
**Date:** August 2026
**Status:** Critical Clarifications + Stack Architecture Update

---

## I. Educational Institution Corrections

### A. South Seattle College: Pacific Northwest Wine Education Collaborative

**Previous Assumption (Incomplete):**
- Documents referenced "Walla Walla Community College" as primary wine education partner

**Correction:**
**South Seattle College's Pacific Northwest Wine Education Collaborative** is the actual/initial scope:
- **URL:** https://southseattle.edu/programs/wine-studies/pacific-northwest-wine-education-collaborative
- **Scope:** Collaborative encompasses multiple institutions across Pacific Northwest
- **Distinction:** Walla Walla CC may be one partner within this collaborative, not the exclusive target

**Action Required:**
- Update all NSF ATE proposals to reference South Seattle College's PNW Wine Education Collaborative as lead institution
- Walla Walla CC repositioned as collaborative member (if confirmed) or separate parallel track
- B2B service packages should reflect collaborative structure (multi-institution deployment)

**Impact on Funding Pathways:**
- NSF ATE application: South Seattle College as PI institution (community college requirement met)
- Collaborative structure strengthens proposal (multi-institution validation, not single-campus pilot)
- Replicability argument enhanced (collaborative model already proven across PNW)

---

## II. Blaze/Genblaze Technical Role Clarification

### A. What Genblaze Actually Is

**From Confluence pages 161316907 + 160989185:**

**Genblaze = Backblaze's open-source Python SDK** for chained generative-media pipelines:
- **Announced:** 2026-06-11
- **Pipeline pattern:** `.step()` chained across multiple inference providers
- **Supported providers:** 
  - GMI Cloud (Seedream, Kling, Veo, MiniMax)
  - Google (Imagen, Gemini, Veo)
  - Replicate, OpenAI, ElevenLabs, Stability, NVIDIA Magpie
- **Formats:** Image, video, audio generation, upscaling, TTS, vision-based tagging
- **Storage:** B2 as default `ObjectStorageSink`
- **Current gap:** No 3D/splat output type exists (proposed extension for environmental monitoring)

### B. Genblaze as Transport Layer (Not Just "Company Partner")

**Architectural Role:**

```
Desktop/Notebook Analytical Surfaces (Lab-Based)
  ├─ Observable Framework (DuckDB WASM, embedding topology)
  ├─ Hex.tech (retrospective interpretation, institutional oversight)
  └─ Streamlit (real-time monitoring, operator console)
           ↓
    [GENBLAZE TRANSPORT LAYER]
     - Researcher workflow → generates media artifact
     - Writes to B2 with stable URL
     - Decouples analysis from field deployment
           ↓
Mobile Deployment Surface (Field-Based)
  ├─ Mobile PWA (field practitioners)
  ├─ SCID AI Copilot (scaffolded learning)
  └─ Evidence capture (photos, sensor data, voice)
```

**Key Insight:**
Genblaze **bridges the desktop/field gap** identified in:
- Mobile field-training page (161316876)
- SCID_ARCHITECTURE.md mobile deployment requirement
- Confluence synthesis finding: "desktop-bound SCiPE tooling excludes field practitioners"

**Mechanism:**
1. Faculty/researcher analyzes in Observable/Hex/Streamlit (desktop)
2. Genblaze pipeline generates output artifact (image, video, processed data)
3. Artifact stored in B2 with stable URL
4. Mobile UI consumes B2 URL (not notebook session)
5. Field practitioner accesses on-site without desktop dependency

### C. Genblaze in NSF SBIR Context

**Previous framing (incomplete):**
"Blaze provides AI infrastructure"

**Corrected framing:**
**Genblaze = transport layer connecting analytical surfaces (Observable/Hex/Streamlit) to mobile deployment**

**SBIR Phase I Innovation Claim:**
> "Genblaze-mediated mobile deployment for competency-based vocational training: Desktop-based faculty analysis (Observable, Hex, Streamlit) generates B2-hosted learning artifacts consumed by mobile AI copilot, enabling field practitioners to receive scaffolded instruction without desktop dependency."

**Research Questions:**
1. How should Genblaze pipelines adapt faculty-generated analytical outputs (data visualizations, model predictions) into mobile-consumable learning artifacts?
2. What evidence types captured in-field (via mobile) should trigger upstream Genblaze pipeline regeneration (adaptive learning loop)?
3. How can Genblaze's B2 storage layer ensure CARE Principles compliance when artifacts contain Indigenous/cultural knowledge?

**Company Alliance Roles (CORRECTED):**

| Company | Technical Contribution | SBIR Innovation Component |
|---------|------------------------|---------------------------|
| **Stadium Soundwave** (lead applicant) | SCID competency schemas, pedagogical scaffolding logic, cultural data stewardship | AI-bounded copilot behavior (Phase 1 → 2 → 3 progression) |
| **GMI Cloud** | **LLM Backbone** — exclusive inference compute provider (TRELLIS v1, image generation, LLM queries) | On-demand generative media for field training scenarios |
| **Genblaze SDK** (open-source, no formal partnership) | Pipeline orchestration layer (`.step()` chaining, B2 storage sink) | Desktop-to-mobile artifact generation workflow |

**Critical Correction:**
- **GMI Cloud is THE LLM backbone** (primary/exclusive inference provider), NOT a gateway to other providers
- **Genblaze is an open-source tool/SDK** (orchestration layer), NOT a company partner requiring formal agreement
- Clean two-party relationship: Stadium Soundwave + GMI Cloud (Genblaze = enabling infrastructure)

**Next Action:**
- Clarify with Backblaze: Is Genblaze SDK partnership available for SBIR proposal, or is it open-source (no formal partnership needed)?
- Confirm GMI Cloud's role: Inference provider within Genblaze pipelines (not separate infrastructure)

---

## III. Stack Architecture Beyond Discord

### A. Correction: Discord Is One Component Among Many

**Previous Oversimplification:**
- Some documents positioned Discord as "the" Digital Salon execution surface
- Implied Discord = only pillar

**Actual Stack (From Confluence + RES-121 Context):**

#### Layer 1: Analytical Surfaces (Desktop/Notebook)
- **Observable Framework:** Researcher workbench (DuckDB WASM, Vespa embedding topology, Inngest event logs)
- **Hex.tech:** Collaborative interpretation, institutional funder oversight (EU Horizon, MERL reporting)
- **Streamlit:** Academic demos (CGC-UMCES/TEK convergence), real-time operator monitoring (M1-M14 metrics)

**Status:** All lab-based, desktop-bound, do not reach field practitioners

---

#### Layer 2: Transport & Storage
- **Genblaze:** Pipeline orchestration (generates artifacts from analytical surfaces)
- **Backblaze B2:** Stable URL storage (SPZ→SOG→B2 pipeline for splats, image/video artifacts)
- **ATProto PDS:** Credential storage (Verifiable Credentials, competency records)

**Status:** Transport decouples analysis (Layer 1) from deployment (Layer 3)

---

#### Layer 3: Coordination & Social
- **Discord Activities/Social SDK:** Salon rooms, cohort coordination, producer facilitation (Digital Salon Motion #6)
- **Obsidian Vault:** SOP-18 episodic traces, DACUM artifacts, agent knowledge base
- **Attio:** Relationship context (VENUE contacts, PROTOCOL stewards, OPERATOR coordinators)
- **Port.io:** Operational telemetry (governance queue depth, salon activation state, scorecard readiness)

**Status:** Discord is **one coordination surface among four** (Obsidian, Attio, Port.io being the others)

---

#### Layer 4: Mobile Deployment (Field)
- **Mobile PWA (SvelteKit):** Field task UI, AI copilot scaffolding, evidence capture
- **SCID Competency Engine:** Reads ATProto records → determines scaffolding level → adjusts AI behavior
- **Evidence Capture:** Camera (photos), GPS (location), sensor data (vineyard, oyster farm), voice notes (Whisper transcription)

**Status:** Consumes Layer 2 artifacts (B2 URLs), Layer 3 coordination (Discord salon membership, Obsidian DACUM schemas)

---

#### Layer 5: Runtime Presentation
- **Supersplat Viewer (PlayCanvas):** 3D/splat visualization (SOG assets from B2)
- **dtc-* Web Components:** Structured data display (hotspot, capture cards, registry badges)
- **Phaser AE Spike:** Discovery/browse UI (card-grid over capture entities)
- **Rive (deferred):** 2D corridor-native casual games (COR-33 scope, not this build's surfaces)

**Status:** Multiple runtime surfaces (splat viewer, web components, Phaser) — not Rive-exclusive

---

### B. Digital Salon Motions Mapped to Stack

**From Digital Salon Confluence page (61800450), corrected mapping:**

| Motion | Primary Stack Component | Secondary Components |
|--------|-------------------------|----------------------|
| **#1: Structured Micro-Conversations** | Discord (salon rooms) | Obsidian (conversation templates) |
| **#2: Moment-to-Prompt Engagement** | Mobile PWA (QR triggers, camera) | B2 (artifact storage), Discord (prompt delivery) |
| **#3: Curated Producer Feedback** | Port.io (governance queue), Obsidian (SOP-18 traces) | Discord (producer notifications) |
| **#4: Leverage Existing Platform Features** | Discord Activities/Social SDK | — |
| **#5: Follow-Up Continuity** | Discord (post-event threads) | Obsidian (cultural memory traces) |
| **#6: Producer Facilitation Training** | SCID competency schema (first Guild Academy competency) | Mobile PWA (training delivery) |
| **#7: Basic Taxonomy & Flow Mapping** | Obsidian (V&V Log tags), Port.io (grammarState) | — |

**Key Insight:**
Discord hosts Motion #1, #4, #5 (coordination/conversation). Mobile PWA hosts Motion #2 (field triggers). SCID/Obsidian host Motion #6, #7 (training, taxonomy). **Not all motions run through Discord.**

---

### C. CGC-UMCES Infrastructure Precedent (Analytical Surface Context)

**From Genblaze Confluence page (161316907):**

**CGC-UMCES Current State (Confirmed via GitHub):**
- 12 of 15 repos are workshop/tutorial material (Apr-Jul 2026)
- Jupyter-notebook LLM-assisted-coding tutorials (NAIRR-tied)
- **Gap:** Notebook-bound pedagogy, nothing persists past session
- **Backblaze/B2 = missing persistence layer for CGC-UMCES workflows**

**Observable/Hex/Streamlit Usage:**
- Observable: Below-the-floor researcher workbench (DuckDB, Vespa, Inngest)
- Hex: Institutional oversight (EU Horizon/ECCCH MERL reporting)
- Streamlit: Low-effort academic surface (CGC-UMCES/TEK demos, operator monitoring)

**Why This Matters:**
- NSF ATE proposal can cite CGC-UMCES as precedent for **analytical surfaces** (Observable, Hex, Streamlit)
- Guild Academy adds **mobile deployment layer** CGC-UMCES lacks (via Genblaze transport)
- Complementary, not competitive: CGC-UMCES = research analysis, Guild Academy = vocational field training

**Position:**
> "Guild Academy extends CGC-UMCES's proven analytical infrastructure (Observable, Hex, Streamlit) to field practitioners via Genblaze-mediated mobile deployment. Where CGC-UMCES trains faculty to analyze data in notebooks, Guild Academy trains technicians to apply insights in vineyards, oyster farms, and environmental monitoring sites."

---

## IV. RES-121 Position File (Awaiting User Input)

**User Reference:**
`file:///Users/spatialstdio/vinejocket/RES-121-gsbf54-fire-runtime-crosswalk.html`

**Status:** Local file not accessible from this environment

**Action Required:**
User to provide:
1. Key learnings from RES-121 position file
2. Stack evolution traceability points
3. Additional reflections beyond Discord/salon framing

**Placeholder for User Input:**
_[User: Please provide key points from RES-121-gsbf54-fire-runtime-crosswalk.html that should inform strategic positioning]_

---

## V. Updated Document Cross-References

### Documents Requiring Updates

#### A. FUNDING_PATHWAYS_UPDATED.md

**Section II.A (NSF ATE):**
- **Change:** "Walla Walla Community College" → "South Seattle College's Pacific Northwest Wine Education Collaborative"
- **Add:** Collaborative structure as competitive advantage (multi-institution validation)

**Section III (NSF SBIR Company Alliance):**
- **Change:** "Blaze role TBD" → "Genblaze = transport layer connecting Observable/Hex/Streamlit to mobile deployment"
- **Add:** Research questions on desktop-to-mobile artifact generation, adaptive learning loop, CARE Principles compliance

#### B. SCID_ARCHITECTURE.md

**Section II (Four-Layer Architecture):**
- **Add:** Layer 0 (Analytical Surfaces): Observable, Hex, Streamlit for faculty/researcher workflows
- **Clarify:** Layer 2 (Scaffolded Execution) consumes Genblaze-generated artifacts from Layer 0 via B2 URLs

**Section IX (Walla Walla CC Example):**
- **Update:** "Walla Walla CC as pilot within South Seattle College's PNW Wine Education Collaborative"
- **Add:** Collaborative governance model (multiple institutions adopt same SCID competency schemas)

#### C. USVI_SOUND_CLASH_STRATEGY.md

**Section IV (SCID Integration):**
- **Add:** Genblaze transport layer for movement documentation artifacts
- **Clarify:** Sound Clash analytical work (Observable/Hex) generates artifacts → Genblaze → B2 → mobile consumption

**Section VII (Replicability):**
- **Add:** Genblaze transport layer as reusable infrastructure across territories (Hawaii, Puerto Rico, Guam)

#### D. CONFLUENCE_FEEDBACK_SYNTHESIS.md

**Section I (Reveal 3: Mobile Deployment):**
- **Add:** Genblaze as the technical solution to desktop/field gap
- **Update:** "Desktop-bound SCiPE tooling" → "Desktop-bound analytical surfaces (Observable, Hex, Streamlit) require Genblaze transport to reach field"

---

## VI. Genblaze Environmental Monitoring Extension (Proposed)

### A. Current Genblaze Capabilities

**From Rootcheck Confluence page (160989185):**

**Supported Formats:**
- Image generation (GMI Cloud, Google Imagen, Replicate, OpenAI, Stability)
- Video generation (GMI Cloud Kling/Veo, Google Veo, NVIDIA Magpie)
- Audio generation (ElevenLabs TTS)
- Upscaling, vision-based tagging/classification

**Current Gap:**
- **No 3D/splat output type** in Genblaze SDK
- **No prior art found** for splat/point-cloud/environmental-monitoring extensions (checked `backblaze-labs/genblaze` repo, 54 issues, zero matches on "splat," "SOG," "SPZ," "gaussian," "3D")

### B. Proposed Extension for NSF SBIR

**Innovation Claim:**
> "First extension of Genblaze's generative-media pipeline pattern to spatial/volumetric formats for environmental monitoring and vocational training"

**Mechanism:**
1. **Upstream Genblaze pipeline:** Generate conditioning image/video (stylized vineyard, soil cross-section) → B2 storage
2. **Splat generation step:** TRELLIS v1 (GMI Cloud compute) consumes B2 conditioning asset → generates splat (SPZ/SOG format)
3. **Downstream Genblaze sink:** Write splat to B2 with provenance manifest (same `.step()` orchestration as image/video)

**Environmental Monitoring Use Cases:**
- Vineyard canopy monitoring (SCID viticulture sensor deployment competency)
- Soil cross-section analysis (Rootcheck pipeline, already working)
- Watershed/coastal monitoring (USVI/Hawaii environmental partnerships)
- Oyster farm habitat mapping (Pacific Northwest aquaculture training)

**SBIR Pitch:**
> "Genblaze currently supports 2D media (image, video, audio). This SBIR extends its pipeline orchestration to 3D/spatial formats, enabling environmental monitoring datasets to flow through the same B2-backed provenance infrastructure. A vineyard sensor deployment becomes: sensor reading → Genblaze image generation → TRELLIS splat generation → B2 storage → mobile field technician views 3D canopy model on-site."

### C. Next Action: GitHub Issue Proposal

**Proposed GitHub issue on `backblaze-labs/genblaze`:**

**Title:** "Support for 3D/splat output formats (environmental monitoring & spatial capture use cases)"

**Body:**
```markdown
## Use Case
Environmental monitoring and vocational training workflows (vineyard sensor deployment, 
soil analysis, watershed mapping) generate spatial/volumetric datasets that don't fit 
Genblaze's current 2D media pipeline (image, video, audio).

## Proposed Extension
Add support for 3D/point-cloud/splat output types (SPZ, SOG, PLY formats), allowing 
Genblaze's `.step()` orchestration and B2 provenance tracking to handle spatial captures 
the same way it handles images/videos.

## Example Pipeline
1. Generate conditioning image (stylized vineyard canopy) → B2 storage
2. Splat generation step (TRELLIS v1 or similar) consumes conditioning asset → SPZ/SOG output
3. B2 sink writes splat with provenance manifest

## Prior Art Search
Searched genblaze repo (54 issues) for "splat," "point cloud," "SOG," "SPZ," "gaussian," 
"3D" — no matches found. This appears to be first proposal for spatial/volumetric extension.

## Reference Implementation
Working SPZ→SOG→B2 pipeline (Rootcheck hackathon submission) demonstrates B2 storage 
feasibility for splat assets: https://s3.us-west-004.backblazeb2.com/RootCheck/rootcheck/soil-cross-section.sog
```

**Decision:** File this issue **after** clarifying with user whether it strengthens or complicates NSF SBIR positioning (does "proposed extension" read as innovation, or as feature request to existing product?).

---

## VII. Immediate Correction Actions

### Priority 1: Update Educational Institution References (Immediate)

**Files to Update:**
- FUNDING_PATHWAYS_UPDATED.md (NSF ATE section)
- SCID_ARCHITECTURE.md (Walla Walla CC example)
- USVI_SOUND_CLASH_STRATEGY.md (any Walla Walla CC references)

**Change:**
```
Old: "Walla Walla Community College as primary wine education partner"
New: "South Seattle College's Pacific Northwest Wine Education Collaborative 
     (collaborative structure, multiple institutions)"
```

### Priority 2: Clarify Genblaze Role in SBIR Proposal (This Week)

**Questions for User:**
1. Is Genblaze SDK partnership formal (requires Backblaze co-applicant), or open-source (Stadium Soundwave uses SDK independently)?
2. Should NSF SBIR position Genblaze as:
   - **Option A:** Existing infrastructure we're extending (3D/splat output types)
   - **Option B:** Transport layer we're integrating (desktop analytical surfaces → mobile deployment)
   - **Option C:** Both (extension + integration as dual innovation claims)

### Priority 3: Obtain RES-121 Position File Content (Awaiting User)

**User Action Required:**
Provide key learnings/stack evolution points from:
`file:///Users/spatialstdio/vinejocket/RES-121-gsbf54-fire-runtime-crosswalk.html`

### Priority 4: Map Stack Architecture to B2B Service Packages (Next Week)

**Integration Point:**
B2B_VOCATIONAL_TRAINING.md should reflect multi-layer stack:
- **Package 1 deliverables:** Include Genblaze transport layer setup (not just SCID schemas)
- **Package 2 deliverables:** Include Observable/Hex analytical surface training for faculty (not just student training)
- **Package 3 deliverables:** Include B2 infrastructure + mobile PWA deployment (not just Pattern Library access)

---

## VIII. Strategic Position Update

### Before Corrections:

**Oversimplified Stack:**
- Guild Academy = SCID competency training + Discord coordination + mobile deployment
- Walla Walla CC = sole wine education partner
- Blaze/GMI Cloud = "companies we're partnering with" (undefined roles)

### After Corrections:

**Multi-Layer Ecosystem:**

```
Layer 0: Analytical Surfaces (Desktop/Notebook)
  ├─ Observable, Hex, Streamlit (faculty/researcher workflows)
  └─ CGC-UMCES precedent (notebook pedagogy, needs persistence layer)

Layer 1: Transport & Storage
  ├─ Genblaze (pipeline orchestration, desktop → mobile)
  ├─ Backblaze B2 (stable URL storage)
  └─ ATProto PDS (credential storage)

Layer 2: Coordination & Social
  ├─ Discord (salon rooms, one component among many)
  ├─ Obsidian (DACUM artifacts, SOP-18 traces)
  ├─ Attio (relationship context)
  └─ Port.io (operational telemetry)

Layer 3: Mobile Deployment (Field)
  ├─ Mobile PWA (SvelteKit)
  ├─ SCID Competency Engine
  └─ Evidence Capture (camera, GPS, sensors, voice)

Layer 4: Runtime Presentation
  ├─ Supersplat Viewer (3D/splats)
  ├─ dtc-* Web Components
  ├─ Phaser AE (browse UI)
  └─ Rive (deferred, 2D corridor games only)
```

**Educational Partners:**
- **South Seattle College's Pacific Northwest Wine Education Collaborative** (lead institution, multi-institution structure)
- Walla Walla CC (collaborative member, or separate parallel track)

**Company Alliance:**
- **Stadium Soundwave:** SCID pedagogy, AI copilot scaffolding, cultural data stewardship
- **Genblaze/Backblaze:** Transport layer (desktop → mobile), B2 storage, pipeline SDK
- **GMI Cloud:** Inference compute within Genblaze pipelines (TRELLIS v1, image/video generation)

---

## IX. Updated Funding Narrative (NSF SBIR Example)

**Old Narrative (Incomplete):**
> "Guild Academy trains technicians using AI copilot and mobile deployment. Blaze provides infrastructure. GMI Cloud provides compute."

**New Narrative (Multi-Layer Ecosystem):**
> "Guild Academy extends proven analytical infrastructure (Observable, Hex, Streamlit) from desktop-bound research workflows to field-based vocational training via Genblaze transport layer. 
> 
> Faculty analyze vineyard data in Observable notebooks. Genblaze pipelines generate mobile-consumable artifacts (visualizations, model predictions) stored in Backblaze B2. Field technicians access these artifacts via mobile PWA with AI-bounded scaffolding (SCID Phase 1 → 2 → 3 progression). GMI Cloud provides on-demand inference compute (TRELLIS v1 splat generation, image/video generation) within Genblaze pipelines.
> 
> This innovation addresses a confirmed gap: CGC-UMCES's current notebook pedagogy (12 of 15 repos, Apr-Jul 2026) produces analysis that doesn't persist beyond the session. Genblaze + B2 becomes the persistence layer. Guild Academy's SCID competency engine ensures AI assistance adapts to learner skill level, preventing AI from replacing human expertise.
> 
> Partnership with South Seattle College's Pacific Northwest Wine Education Collaborative validates multi-institution adoption (not single-campus pilot). NSF ATE funding supports curriculum development; NSF SBIR funds AI copilot innovation."

---

## X. Conclusion: From Oversimplified to Architecturally Precise

**What Changed:**
1. **Educational partner:** Walla Walla CC → South Seattle College's PNW Wine Education Collaborative (collaborative structure)
2. **Blaze/Genblaze role:** "Company partner" → Transport layer connecting desktop analytical surfaces to mobile deployment
3. **Stack architecture:** Discord-only → Five-layer ecosystem (Analytical, Transport, Coordination, Mobile, Runtime)
4. **CGC-UMCES precedent:** Research university comparison → Analytical surface precedent + persistence gap Guild Academy fills

**What Stays:**
- SCID competency-based training (core pedagogy)
- Mobile-first deployment (field practitioner accessibility)
- ATProto VCs (portable credentials)
- Multi-layered funding strategy (federal + corporate + earned revenue)

**Next Milestone:**
- Obtain RES-121 position file content from user
- Clarify Genblaze partnership structure (formal vs. open-source SDK usage)
- Update all documents with South Seattle College collaborative framing
- Finalize NSF SBIR company alliance roles (Stadium Soundwave, Genblaze/Backblaze, GMI Cloud)

---

**Pending User Input:**
1. RES-121 position file key learnings
2. Genblaze partnership clarification (formal co-applicant or independent SDK usage?)
3. GMI Cloud SBIR role confirmation (inference provider within Genblaze, or separate infrastructure?)

---

**This document supersedes incomplete/oversimplified framing in earlier strategic documents. All future proposals should reference this corrected multi-layer ecosystem architecture.**
