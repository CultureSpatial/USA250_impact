# Component Slicing Architecture
## Cultural Current Mesh: Modular Deployment Framework

**Version:** 1.0
**Date:** 2026-01-10
**Status:** Active Development

---

## Executive Summary

This document defines the **component modular build** approach for the Cultural Current Mesh (CCM) infrastructure, specifically the Prohibition Artifacts voice-driven cartography implementation. This is NOT a linear timeline-based roadmap, but rather a **modular component inventory** that can be **sliced and recombined** for different deployment contexts.

### Strategic Approach

**Core Principle:** "New organizational species" cognizant of externalities, not merely a new internal category.

**Deployment Model:**
```
Component Inventory → Sliced Versions → Feedback Loop → Recurring Revenue Ramp
         ↑                                    ↓
         └────────────────────────────────────┘
              (Continuous Refinement)
```

**Key Differentiators:**
- **B2B focused** (not consumer direct)
- **Human capacity building** as pivotal revenue AND cost center (SCID/DACUM vocational training)
- **Preliminary setup + feedback loop** before revenue ramp
- **NOT speculative linear progression** - modular components deployed contextually

---

## I. Component Inventory

### 1. Content Layer
**Status:** ✅ Complete (Prohibition Artifacts)

**Components:**
- 10 historically verified Chicago Prohibition narratives (1920-1933)
- 2-3 paragraph voice-optimized storytelling format
- GPS-verified locations with proximity triggers
- Historical source attribution (National Trust, Chicago Architecture Center, etc.)
- Mixed status (5 still standing, 5 demolished - requires historical overlay)

**Files:**
- `/supabase/seeds/002_seed_prohibition_artifacts.sql` (production SQL)
- `/seeds/prohibition-artifacts.ts` (TypeScript/JSON format)
- `/README_PROHIBITION_ARTIFACTS.md` (documentation)

**Reusability:** Template for ANY cultural narrative domain (civil rights, labor history, Indigenous sites, etc.)

---

### 2. Data Infrastructure
**Status:** ✅ Complete (Schema Design)

**Components:**
- Supabase (PostgreSQL + PostGIS) geospatial database
- `narratives` table with location-based queries
- Audio metadata management (duration, artist, transcript)
- Historical metadata (era, sources, verification status)
- Spatial indexing (`ST_DWithin` proximity queries)
- Helper functions (`get_narratives_within_radius()`)

**Files:**
- `/supabase/migrations/001_create_narratives_schema.sql`

**Reusability:** Generic schema for ANY voice-driven, location-based cultural content

---

### 3. Voice Generation Layer
**Status:** 🟡 Specification Complete (Implementation Pending)

**Components:**
- **Hume.ai** emotional voice synthesis (not just TTS)
- **ACL (Atmosphere Configuration Layer)** - culture configures AI atmosphere
- Voice style specifications (documentary, narrative, first-person)
- Narrator notes for emotional prosody
- Audio duration estimates (90-180 seconds per artifact)

**Files:**
- `/docs/VOICE_INTERACTION_SPEC.md` (29-page specification)

**Key Insight:** Culture executes as computational protocol via ACL

**Reusability:** Voice synthesis for ANY cultural content with atmospheric configuration

---

### 4. Governance Infrastructure
**Status:** ✅ Documented (Implementation Pending)

**Components:**
- **IGNIS-ADAPT Constitutional Substrate**
  - **Tier 1 Veto:** CFI + SSI thresholds (project termination if crossed)
  - **Tier 2 Recertification:** Hard pause for governance review
  - **Tier 3 Enhancement:** Optimization recommendations
  - **MVR Constraint:** Minimum Viable Revenue by SRL 3

- **Modular Stewardship Councils**
  - Cultural Memory (historians, community elders)
  - Economic Sustainability (financial stewards)
  - Technical Infrastructure (developers, spatial UX)
  - Boundary & Access (ethics, sensitive stories)
  - Movement & Innovation (experimentation within bounds)

**Current Gap:** Prohibition project lacks stewardship assignments (SSI ~0.30, below 0.50 threshold)

**Reusability:** Constitutional substrate for ANY cultural project preventing institutional capture

---

### 5. Mapping & Proximity Layer
**Status:** 🟡 Specification Complete (Implementation Pending)

**Components:**
- **Felt.com** collaborative mapping platform (frontend)
- **Upstash Redis** geo-caching (`GEORADIUS` for sub-10ms proximity checks)
- Multi-zone proximity triggers:
  - 500m: Ambient awareness
  - 100m: Location highlight
  - 50m: Voice trigger eligible
  - <10m: Auto-play + AR overlay eligible

**Files:**
- `/docs/VOICE_INTERACTION_SPEC.md` (proximity detection section)

**Reusability:** Proximity system for ANY location-based experience

---

### 6. Phygital Integration Layer (Enchanted Locale)
**Status:** 🟡 Framework Documented (Implementation Pending)

**Components:**
- **Digital Campfire:** Ritual structure (90-120 min scavenger hunts) = Write Head
- **Dynamic Guidebook:** Persistence layer + pattern intelligence = Accumulation
- **Ruby NPC:** Atmosphere-adaptive AI character (Hume.ai backend)
- **Guest Stories Wall:** Palimpsest visualization (UGC + historian narratives)
- **Personal Atlas:** Returning user narrative trail visualization

**Three Phases:**
1. **Blueprint:** Discovery (scavenger hunt structure)
2. **Augment:** Staff training (venue owners as guides)
3. **Orchestrate:** Integration (venue operations + guest experience)

**Reusability:** Hospitality integration template for ANY cultural venue

---

### 7. Spatial Computing Layer
**Status:** 🟡 Evaluated (Production Readiness TBD)

**Components:**
- **Meta IWSDK:** Hand tracking, spatial anchors, haptic feedback, passthrough AR
- **Mapillary:** Street-level imagery + historical overlays for demolished sites
- **SAM3D:** 3D scene understanding, intelligent AR placement (evaluation pending)
- **Quest 3 (2026) → AR glasses (2027-2028)** platform sequencing

**Key Use Case:** Historical overlay for demolished sites (St. Valentine's Day Massacre, Lexington Hotel, Colosimo's Cafe)

**Reusability:** Wearable spatial compute for ANY historical site with physical/digital overlay

---

### 8. Intelligence Layer (Culture Current 7-Vector)
**Status:** ✅ Complete Framework

**Components:**
- **25 Poles → 7 Vectors** hierarchical compression
- **L1 Core Foundation:** Coordination Architecture (score 3 - hybrid), Composability (score 5 - modular)
- **L2 Value Creation:** Economic Model (score 5 - regenerative), Value Proposition (score 4 - transformational)
- **L3 Community Interaction:** Governance (score 4 - decentralized), Interaction (score 5 - co-creative)
- **L4 Operational:** Pacing (score 4 - deliberate)

**Cascade Effects:** Changes to one vector affect others (e.g., Composability < 4 → Governance cannot maintain 4)

**Reusability:** Diagnostic scorecard for ANY cultural project to assess alignment with regenerative principles

---

### 9. Economic Model
**Status:** 🟡 Framework Designed (MVR Targets TBD)

**Components:**
- **ECP (Embedded Cultural Provisioning):** Automated value flows to source communities
- **Attribution Units (AU):** 70% creators, 20% community, 10% platform
- **MVR Targets:** Prohibition ~$70K annual (to be validated)
- **Revenue Streams:**
  - Premium experiences (phygital integration)
  - Coordination fees (B2B venue partnerships)
  - Content licensing (educational, media)
  - Template licensing (other cultural domains)

**B2B Model Focus:** NOT consumer direct - venue partnerships, institutional licensing

**Reusability:** Regenerative revenue model for ANY cultural content project

---

### 10. Human Capacity Building (SCID/DACUM)
**Status:** 🔴 Not Yet Designed

**Components:**
- **SCID (Systematic Curriculum and Instructional Development):** Competency-based training design
- **DACUM (Developing A Curriculum):** Task analysis methodology for vocational skills
- **Pivotal Role:** Both revenue center (training fees) AND cost center (delivery infrastructure)
- **Target Skills:**
  - Cultural storytelling + voice narration
  - Geospatial data management (PostGIS)
  - Voice AI configuration (Hume.ai ACL)
  - Hospitality integration (venue staff training)
  - AR content creation (Meta IWSDK)

**Critical Gap:** This component is PIVOTAL but not yet designed

**Reusability:** Vocational training template for cultural technology stewardship

---

## II. Deployment Slices

### Slice A: Conference Version
**Context:** Academic conferences, tech showcases, cultural heritage symposia

**Minimum Components:**
1. ✅ **Content Layer:** 3-5 demo artifacts (not all 10)
2. ✅ **Data Infrastructure:** Read-only Supabase instance
3. 🟡 **Voice Generation:** Pre-recorded audio (not live Hume.ai synthesis)
4. ✅ **Mapping:** Static Felt.com map with markers
5. ❌ **Governance:** Documentation only (no active stewardship)
6. ❌ **Phygital:** Documentation/mockups only
7. ❌ **Spatial Compute:** Video demo or mockup
8. ✅ **Intelligence Layer:** 7-vector scorecard presentation
9. ❌ **Economic Model:** Slide deck only
10. ❌ **Human Capacity:** Overview presentation only

**Feedback Loop Metrics:**
- Audience questions (unmet needs, confusion points)
- Spatial UX reactions (if AR demo shown)
- Governance questions (institutional capture concerns)
- Revenue model viability questions

**Success Criteria:**
- 3+ follow-up conversations with potential partners
- 1+ domain expert collaboration interest
- 1+ venue partner expression of interest

---

### Slice B: Pop-Up Event (Hospitality Venue)
**Context:** Physical installation at Green Mill, Twin Anchors, or similar venue

**Minimum Components:**
1. ✅ **Content Layer:** 1-2 venue-specific artifacts (Green Mill + 1 nearby)
2. ✅ **Data Infrastructure:** Live Supabase with proximity queries
3. 🟡 **Voice Generation:** Pre-recorded OR live Hume.ai (depends on budget)
4. ✅ **Mapping:** Interactive Felt.com map with proximity triggers
5. 🟡 **Governance:** Venue owner as Boundary & Access steward (informal)
6. ✅ **Phygital:** Digital Campfire scavenger hunt (90 min ritual)
7. 🟡 **Spatial Compute:** QR codes for AR overlays (Quest 3 optional)
8. ❌ **Intelligence Layer:** Background measurement only
9. ✅ **Economic Model:** Test premium experience pricing ($20-40/person)
10. 🟡 **Human Capacity:** Staff training (venue employees as guides)

**Feedback Loop Metrics:**
- Guest engagement duration (target: 90-120 min)
- UGC contributions (Guest Stories Wall)
- Premium experience conversion rate
- Staff ease of use (training effectiveness)
- Venue owner operational integration

**Success Criteria:**
- 70%+ guests complete full experience
- 20%+ guests contribute UGC
- Venue owner requests ongoing partnership
- Staff can operate without technical support after 2 sessions

---

### Slice C: Dev Post Submission
**Context:** Technical blog posts, open-source showcases, dev community sharing

**Minimum Components:**
1. ✅ **Content Layer:** Full 10 artifacts (showcase completeness)
2. ✅ **Data Infrastructure:** Open-source schema + SQL seeds
3. 🟡 **Voice Generation:** Hume.ai integration code (documented API calls)
4. ✅ **Mapping:** Felt.com integration tutorial
5. ✅ **Governance:** IGNIS-ADAPT framework documentation (novel contribution)
6. 🟡 **Phygital:** Architecture diagram + pseudocode
7. 🟡 **Spatial Compute:** Meta IWSDK integration examples
8. ✅ **Intelligence Layer:** 7-vector scorecard (methodology)
9. ❌ **Economic Model:** Brief mention only
10. ❌ **Human Capacity:** Not relevant for dev audience

**Feedback Loop Metrics:**
- GitHub stars/forks (if open-sourced)
- Developer questions (implementation blockers)
- Alternative tech stack suggestions
- Governance framework citations/adaptations

**Success Criteria:**
- 100+ GitHub stars (if open-sourced)
- 5+ developers fork and adapt for own cultural projects
- 1+ academic citation of IGNIS-ADAPT framework
- 3+ blog posts/tutorials referencing the work

---

### Slice D: Domain Workshop
**Context:** Cultural institutions, tribal councils, community organizations learning the methodology

**Minimum Components:**
1. ✅ **Content Layer:** Template + facilitated exercise (participants create 3 artifacts for their domain)
2. ✅ **Data Infrastructure:** Live Supabase sandbox (workshop environment)
3. ❌ **Voice Generation:** Concept only (too technical for 2-hour workshop)
4. ✅ **Mapping:** Felt.com collaborative exercise (participants plot their sites)
5. ✅ **Governance:** Modular stewardship role-play (assign stewards)
6. ❌ **Phygital:** Concept overview only
7. ❌ **Spatial Compute:** Future state discussion only
8. ✅ **Intelligence Layer:** 7-vector self-assessment (participants score their project)
9. ✅ **Economic Model:** MVR calculation exercise
10. ✅ **Human Capacity:** SCID/DACUM methodology introduction (meta-level)

**Feedback Loop Metrics:**
- Participant creation output (3 artifacts per team)
- Governance role assignment clarity
- 7-vector scorecard self-assessment accuracy
- Post-workshop implementation rate (30-day follow-up)

**Success Criteria:**
- 80%+ participants create 3 functional artifacts
- 100% participants assign all stewardship roles
- 50%+ participants begin implementation within 30 days
- 1+ participant becomes domain ambassador (teaches others)

---

### Slice E: Commercial Engagement (Other Contexts)
**Context:** Museum partnerships, tourism boards, educational licensing, media production

**Minimum Components:** (Varies by context - examples below)

#### Museum Partnership:
1. ✅ Content Layer (institution's collection)
2. ✅ Data Infrastructure (institution hosts)
3. ✅ Voice Generation (professional narration)
4. ✅ Mapping (institution's geography)
5. ✅ Governance (institution = Cultural Memory steward)
6. ✅ Phygital (in-gallery AR overlays)
7. 🟡 Spatial Compute (Quest 3 loaners for visitors)
8. ✅ Intelligence Layer (assess institutional alignment)
9. ✅ Economic Model (admission premium or membership tier)
10. ✅ Human Capacity (docent training program)

#### Tourism Board:
1. ✅ Content Layer (regional heritage sites)
2. ✅ Data Infrastructure (tourism board hosts)
3. ✅ Voice Generation (multi-language support)
4. ✅ Mapping (regional map integration)
5. 🟡 Governance (tourism board + community co-stewardship)
6. ✅ Phygital (visitor center integration)
7. ❌ Spatial Compute (mobile-first, no AR)
8. ✅ Intelligence Layer (economic impact measurement)
9. ✅ Economic Model (visitor fees + hotel partnerships)
10. ✅ Human Capacity (tour guide certification program)

**Feedback Loop Metrics:** (Context-specific)

---

## III. Feedback Loop Architecture

### Preliminary Setup Phase
**Objective:** Establish functional components + stewardship structure BEFORE revenue ramp

**Activities:**
1. Deploy minimum viable slice (Conference or Dev Post)
2. Assign stewardship roles (even if informal)
3. Establish feedback collection mechanisms
4. Document first-use blockers and failures
5. Iterate components based on feedback

**Duration:** NOT timeline-based - continues until feedback loops stabilize

**Key Insight:** This is NOT "alpha testing" - it's **constitutional substrate establishment**

---

### Feedback Collection Mechanisms

#### Technical Feedback:
- **Data Infrastructure:** Query performance, schema gaps, spatial index accuracy
- **Voice Generation:** Hume.ai emotional prosody quality, cultural fidelity
- **Mapping:** Proximity trigger accuracy, false positives/negatives
- **Spatial Compute:** AR placement quality, hand tracking accuracy

#### Cultural Feedback:
- **Content Accuracy:** Historian verification, community voice authenticity
- **Governance:** Stewardship role clarity, decision-making authority
- **Boundary & Access:** Sensitive content handling, consent protocols
- **Attribution:** Source community recognition, value flows

#### Economic Feedback:
- **Pricing:** Willingness to pay (premium experiences)
- **Value Perception:** Experience value vs. price
- **Revenue Attribution:** Which components drive revenue
- **Cost Structure:** Human capacity building cost vs. revenue

#### Human Capacity Feedback:
- **Training Effectiveness:** Staff/participant skill acquisition
- **Operational Integration:** Can venues operate without ongoing support?
- **Knowledge Transfer:** Can trained individuals train others?
- **Vocational Outcomes:** Job creation, income generation for participants

---

### Feedback Integration Process

```
Feedback → Component Refinement → Re-deployment → New Feedback
    ↓                                                   ↑
    └───────────────────────────────────────────────────┘
              (Continuous Improvement Cycle)
```

**NOT a linear roadmap:** Feedback may reveal need for NEW components not yet identified, or eliminate components thought essential.

**Example Scenarios:**

1. **Conference Feedback:** "How do you prevent institutional capture?"
   - **Action:** Strengthen Governance documentation, create visual diagram of IGNIS-ADAPT Tier 1 veto
   - **Component Update:** Add governance visualization to Conference Slice

2. **Pop-Up Feedback:** "Staff couldn't operate the system after training"
   - **Action:** Simplify technical interface, create step-by-step checklist
   - **Component Update:** Enhance Human Capacity component with operational guides

3. **Dev Post Feedback:** "Your schema doesn't support multi-language content"
   - **Action:** Add `language` field to narratives table, create translation workflow
   - **Component Update:** Data Infrastructure schema migration

4. **Workshop Feedback:** "7-vector scorecard too complex for 2-hour session"
   - **Action:** Create simplified 3-question assessment for workshops, full scorecard for advanced users
   - **Component Update:** Intelligence Layer now has tiered complexity

---

### Recurring Revenue Ramp

**Trigger Conditions:** (NOT timeline-based)
- ✅ Feedback loops stabilized (low variability in responses)
- ✅ Stewardship structure assigned and functioning
- ✅ MVR path validated (revenue model proven at small scale)
- ✅ Human capacity building infrastructure operational
- ✅ At least 2 deployment slices proven successful

**Revenue Streams Activated:**
1. **Template Licensing:** Other cultural projects license component architecture
2. **Training Programs:** SCID/DACUM vocational training (revenue center)
3. **Venue Partnerships:** Ongoing phygital integration subscriptions
4. **Content Licensing:** Educational institutions, media production
5. **Spatial Compute Services:** AR content creation for institutions

**B2B Focus:** ALL revenue streams are B2B (institutions, venues, organizations) NOT consumer direct

---

## IV. Component Dependencies & Cascade Effects

### Critical Path Dependencies:

1. **Data Infrastructure → ALL other components**
   - Nothing functions without geospatial database
   - Highest priority for stability and performance

2. **Governance → Economic Model**
   - MVR constraint enforced by IGNIS-ADAPT
   - Cannot activate revenue ramp without stewardship structure

3. **Human Capacity → Revenue Ramp**
   - Training infrastructure must exist before scaling
   - Vocational outcomes are both cost center (delivery) AND revenue center (fees)

4. **Content Layer → Voice Generation → Phygital**
   - Sequential dependency (cannot generate voice without content)
   - Cannot create phygital experience without voice

5. **Mapping → Spatial Compute**
   - 2D proximity detection must work before adding AR layer
   - Mobile-first, AR-optional architecture

---

### Cascade Effects (7-Vector Intelligence Layer):

**If Composability Score < 4:**
- Governance cannot maintain score of 4 (decentralized)
- Interaction limited to score of 3 (consultative, not co-creative)
- IMPACT: Modular deployment slices become rigid, feedback loops constrained

**If Economic Model Score < 4:**
- Pacing forced to score 2 (rushed to generate revenue)
- MVR constraint violated (institutional capture risk)
- IMPACT: Governance Tier 1 veto triggered, project termination

**If Governance Score < 3:**
- Cultural Fidelity Index (CFI) drops below threshold
- IGNIS-ADAPT Tier 1 veto triggered
- IMPACT: Project termination to prevent institutional capture

---

## V. "New Organizational Species" Framing

### What This Is NOT:

❌ **New Category:** "We're creating a new market category for voice-driven cultural cartography"
- **Why NOT:** Assumes category is internally contained, ignores externalities
- **Example of failure:** EdTech "disruption" that displaced teachers, ignored educational philosophy

❌ **Blue Ocean Strategy:** "We're finding uncontested market space"
- **Why NOT:** Implies competition-free zone, ignores existing cultural stewardship relationships
- **Example of failure:** "Cultural tourism" that extracted value without community consent

❌ **Platform Play:** "We're building a two-sided marketplace for cultural content"
- **Why NOT:** Centralized platform logic, hub-and-spoke topology (we're MESH, not platform)
- **Example of failure:** Airbnb "experience" platform that commodified Indigenous ceremonies

---

### What This IS:

✅ **New Organizational Species:** "We're a mesh node cognizant of externalities, enabling peer-to-peer cultural coordination"

**Characteristics:**
1. **Encompasses categories** (tech startup, nonprofit, cultural institution, vocational training) **but is not defined by any single category**
2. **Cognizant of externalities:** Institutional capture, cultural appropriation, economic extraction, knowledge displacement
3. **Constitutional substrate:** IGNIS-ADAPT veto power prevents mission drift
4. **Mesh topology:** OCAI is ONE node in CCM, not the center
5. **B2B focused:** Human capacity building (SCID/DACUM) as pivotal revenue AND cost center
6. **Feedback-driven evolution:** NOT speculative linear progression

**Operational Implications:**
- **Decisions:** Not "What maximizes growth?" but "What maintains constitutional alignment?"
- **Partnerships:** Not "Who can we scale with?" but "Who shares mesh topology values?"
- **Revenue:** Not "How fast can we monetize?" but "Does MVR path maintain sovereignty?"
- **Technology:** Not "What's the cutting edge?" but "What serves cultural protocols?"

---

## VI. Current Status & Next Actions

### Component Status Summary:

| Component | Status | Blocker | Next Action |
|-----------|--------|---------|-------------|
| Content Layer | ✅ Complete | None | Template for other domains |
| Data Infrastructure | ✅ Complete | None | Performance testing |
| Voice Generation | 🟡 Spec Complete | Hume.ai API access | Integration implementation |
| Governance | 🟡 Documented | Stewardship assignments | Assign roles for Prohibition |
| Mapping | 🟡 Spec Complete | Felt.com API integration | Build proximity trigger system |
| Phygital | 🟡 Framework | Venue partnership | Pilot at Green Mill |
| Spatial Compute | 🟡 Evaluated | SAM3D production readiness | Evaluate alternatives |
| Intelligence Layer | ✅ Complete | None | Apply to other projects |
| Economic Model | 🟡 Designed | MVR validation | Small-scale revenue test |
| Human Capacity | 🔴 Not Designed | SCID/DACUM expertise | Design vocational curriculum |

---

### Immediate Priorities (NOT timeline-based):

#### Priority 1: Human Capacity Building Design
**Why Critical:** This is PIVOTAL - both revenue AND cost center, but currently undesigned

**Actions:**
1. Research SCID/DACUM methodology for cultural technology stewardship
2. Identify vocational skills (voice narration, geospatial data, AR content creation)
3. Design training delivery infrastructure (online? in-person? hybrid?)
4. Define revenue model for training (per-participant fees? institutional licensing?)
5. Pilot with 5-10 participants (collect feedback before scaling)

**Success Metric:** Can trained participants operate a deployment slice independently?

---

#### Priority 2: Stewardship Assignment (Prohibition)
**Why Critical:** SSI currently ~0.30 (below 0.50 Tier 1 threshold) - governance gap

**Actions:**
1. Identify Cultural Memory steward (historian? Chicago Heritage Alliance?)
2. Identify Technical Infrastructure steward (developer? Supabase admin?)
3. Identify Economic Sustainability steward (financial oversight)
4. Identify Boundary & Access steward (sensitive content review)
5. Document stewardship decision-making protocols

**Success Metric:** SSI > 0.50 (above Tier 1 threshold)

---

#### Priority 3: Conference Slice Deployment
**Why Critical:** Fastest feedback loop, lowest resource requirement

**Actions:**
1. Select 3-5 demo artifacts (Green Mill, St. Valentine's, Holy Name Cathedral)
2. Create static Felt.com map
3. Record voice narration (pre-Hume.ai)
4. Build presentation deck (7-vector scorecard, IGNIS-ADAPT, component architecture)
5. Identify 2-3 target conferences (cultural heritage? spatial computing? AI ethics?)

**Success Metric:** 3+ follow-up partnership conversations

---

#### Priority 4: MVR Validation
**Why Critical:** IGNIS-ADAPT MVR constraint requires validation before revenue ramp

**Actions:**
1. Define MVR target for Prohibition ($70K annual? validate or revise)
2. Map revenue sources to target (premium experiences? venue partnerships? licensing?)
3. Test pricing at small scale (pop-up event at Green Mill?)
4. Document cost structure (human capacity delivery? technical infrastructure?)
5. Validate regenerative model (70% creators, 20% community, 10% platform)

**Success Metric:** Proven revenue model at small scale ($5K-10K test)

---

## VII. Reusability Matrix

**Key Principle:** Every component should be **domain-agnostic** and **reusable** for other cultural projects.

| Component | Reusable For | Customization Required |
|-----------|-------------|------------------------|
| Content Layer | ANY cultural narrative domain | Domain-specific research + writing |
| Data Infrastructure | ANY geospatial + voice project | None (generic schema) |
| Voice Generation | ANY cultural audio | Culture-specific ACL configuration |
| Governance | ANY cultural project | Community-specific steward assignments |
| Mapping | ANY location-based experience | Geographic region |
| Phygital | ANY hospitality venue | Venue-specific ritual design |
| Spatial Compute | ANY historical site | Site-specific 3D models |
| Intelligence Layer | ANY cultural project | Project-specific 7-vector scoring |
| Economic Model | ANY cultural project | Community-specific value flows |
| Human Capacity | ANY cultural tech project | Domain-specific skill curriculum |

---

## VIII. Anti-Patterns to Avoid

### Anti-Pattern 1: Linear Timeline Thinking
❌ **Wrong:** "Phase 1: Build prototype (3 months) → Phase 2: Pilot (6 months) → Phase 3: Scale (12 months)"

✅ **Right:** "Deploy Conference Slice + Dev Post Slice in parallel → Collect feedback → Refine components → Deploy Pop-Up Slice → Iterate"

---

### Anti-Pattern 2: Consumer Direct Pivot
❌ **Wrong:** "We should build a consumer app to reach more people faster"

✅ **Right:** "We're B2B focused - partner with institutions/venues who serve end users, we enable their capacity"

---

### Anti-Pattern 3: Platform Centralization
❌ **Wrong:** "All cultural projects should use our platform for discoverability"

✅ **Right:** "We're a mesh node in CCM - cultural projects connect peer-to-peer, we provide infrastructure components they can self-host"

---

### Anti-Pattern 4: Premature Revenue Ramp
❌ **Wrong:** "We need to hit revenue targets by Q3 to prove viability"

✅ **Right:** "Feedback loops must stabilize + stewardship structure must function BEFORE revenue ramp, regardless of timeline"

---

### Anti-Pattern 5: Feature Creep Without Governance
❌ **Wrong:** "Users want social sharing, let's add Facebook integration"

✅ **Right:** "Does social sharing maintain Cultural Fidelity Index? If CFI drops below threshold, Tier 1 veto triggered - feature rejected regardless of user demand"

---

## IX. Appendix: Deployment Checklist Template

### Pre-Deployment Checklist (Use for ANY slice):

**Technical Readiness:**
- [ ] Data infrastructure tested (query performance, spatial accuracy)
- [ ] Voice generation functional (pre-recorded OR live Hume.ai)
- [ ] Mapping system tested (proximity triggers, false positive rate < 5%)
- [ ] Backup/recovery procedures documented

**Governance Readiness:**
- [ ] Stewardship roles assigned (minimum: Cultural Memory + Technical Infrastructure)
- [ ] Decision-making protocols documented
- [ ] Tier 1 veto thresholds defined (CFI, SSI, MVR)
- [ ] Conflict resolution process established

**Cultural Readiness:**
- [ ] Content reviewed by Cultural Memory steward
- [ ] Source attribution verified
- [ ] Sensitive content protocols defined (Boundary & Access steward)
- [ ] Community consent obtained (if applicable)

**Economic Readiness:**
- [ ] Pricing defined (if revenue-generating slice)
- [ ] Value flows mapped (ECP attribution to sources)
- [ ] Cost structure documented
- [ ] MVR path validated (if required for this slice)

**Human Capacity Readiness:**
- [ ] Staff/participants trained
- [ ] Operational guides documented
- [ ] Training effectiveness measured (can they operate independently?)
- [ ] Feedback collection mechanisms established

**Feedback Loop Readiness:**
- [ ] Metrics defined (technical, cultural, economic, human capacity)
- [ ] Collection mechanisms implemented (surveys? analytics? interviews?)
- [ ] Integration process documented (how does feedback refine components?)
- [ ] Iteration budget allocated (time, resources)

---

### Post-Deployment Review Template:

**What Worked:**
- [Technical successes]
- [Governance clarity]
- [Cultural fidelity maintained]
- [Revenue/cost metrics]

**What Didn't Work:**
- [Technical failures, performance issues]
- [Governance confusion, decision-making delays]
- [Cultural fidelity concerns, attribution gaps]
- [Revenue below projections, cost overruns]

**Component Refinements Required:**
- [Which components need updates?]
- [What new components were revealed as necessary?]
- [What components can be simplified or removed?]

**Stewardship Adjustments:**
- [Were roles clear and functional?]
- [Do we need additional stewards?]
- [Are decision-making protocols working?]

**Next Deployment Recommendations:**
- [Which slice should be deployed next?]
- [What dependencies must be resolved first?]
- [What feedback must be integrated before next deployment?]

---

## X. Glossary

**ACL (Atmosphere Configuration Layer):** Culture configures AI atmosphere (emotional prosody, pacing, tone) rather than AI enforcing cultural rules

**Attribution Units (AU):** Token economy for value distribution (70% creators, 20% community, 10% platform)

**B2B (Business-to-Business):** Revenue model focused on institutional partnerships (venues, museums, schools) NOT consumer direct

**CCM (Cultural Current Mesh):** Peer-to-peer coordination topology, NOT hub-and-spoke platform

**CFI (Cultural Fidelity Index):** Metric measuring alignment with source culture protocols (Tier 1 veto if threshold crossed)

**Component Modular Build:** Architecture approach where components can be recombined for different deployment contexts (NOT linear phases)

**DACUM (Developing A Curriculum):** Task analysis methodology for vocational skills training

**ECP (Embedded Cultural Provisioning):** Automated value flows to source communities (embedded in transaction logic)

**IGNIS-ADAPT:** Constitutional substrate with three-tier constraints (Tier 1 veto, Tier 2 recertification, Tier 3 enhancement)

**MVR (Minimum Viable Revenue):** Required revenue threshold by SRL 3 to maintain sovereignty (prevent dependency on extractive funding)

**Mesh Node:** Peer entity in CCM (OCAI, museums, community organizations, Prohibition artifacts, etc.)

**New Organizational Species:** NOT a new internal category, but an entity cognizant of externalities and constitutional bounds

**SCID (Systematic Curriculum and Instructional Development):** Competency-based training design methodology

**SSI (Sovereign Stewardship Index):** Metric measuring governance structure functionality (Tier 1 threshold: 0.50)

**SRL (Sovereignty Readiness Level):** Maturity scale for cultural project sovereignty (analogous to NASA's Technology Readiness Levels)

---

**END OF DOCUMENT**

---

**Document Control:**
- **Version:** 1.0
- **Date:** 2026-01-10
- **Status:** Active Development
- **Next Review:** After first deployment slice feedback integration
- **Maintained By:** Technical Infrastructure Steward (TBD - current gap)
