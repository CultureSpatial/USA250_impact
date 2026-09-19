# Confluence Activity Feedback Loop Synthesis

**Version:** 1.0
**Date:** August 2026
**Analysis Period:** Last 2 months (June-August 2026)
**Pages Analyzed:** 7 key Confluence pages

---

## Executive Summary

This synthesis maps 2 months of Confluence activity against the newly documented Strategic Framework and B2B Vocational Training Model. The feedback loop reveals **strong convergence** on organizational species positioning, modular components, and human capacity building—but surfaces **critical gaps** in multi-stance governance UI, mobile deployment for field practitioners, and the need to avoid stalled institutional partnership patterns.

**Key Finding:** The organizational species model is not theoretical—it's already being enacted through discrete architectural decisions (Digital Salon, SCiPE/DACUM bridge, stance lens gap analysis) that validate the strategic framework's core thesis.

---

## I. REVEALS — Patterns That Validate & Extend the Strategic Framework

### Reveal 1: Digital Salon as Organizational Species Manifestation

**Source:** Digital Salon: 18th-Century Café as Organizing Metaphor (61800450)

**What It Reveals:**
The Digital Salon architectural pattern is a **concrete instantiation** of the organizational species model's "category-encompassing" approach:

- **Not a platform, but a species of interaction** — seven near-term motions (structured micro-conversations, moment-to-prompt engagement, curated producer feedback, etc.) operate across Discord, QR codes, Touchstone dashboards
- **Discord as formative execution surface** — explicit architectural decision (CEAZ-193, GSBF-34) to use Discord Activities/Social SDK rather than Spatial Studio/AR (which is sequenced later, not abandoned)
- **Lightweight identity vs. heavy IAM** — provisional roles, social norms, consent-first governance rather than Terms of Service enforcement

**Convergence with Strategic Framework:**
- Validates "component modular build" (§Architecture) — each motion is independently deployable
- Confirms "distribution strategy" (§Distribution) — conference appearances, pop-up events, domain workshops are the actual deployment channels
- Proves "selective partiality to breakthrough" (§Distribution) — Discord-first is the breakthrough-enabling choice (speed over AR perfection)

**Extension Beyond Framework:**
The Digital Salon's **seven motions** are the **missing operational layer** between the strategic framework's high-level positioning and the B2B service packages. These motions should be incorporated into:
- B2B Foundation Cohort deliverables (Motion #2: QR moment-to-prompt as tangible pilot output)
- Guild Academy PBL projects (Motion #6: Producer facilitation training as first cohort skill)

---

### Reveal 2: DACUM/SCiPE Connection Validates Vocational Training Legitimacy

**Source:** DACUM × SCiPE Conceptual Bridge (160956442)

**What It Reveals:**
The SCID/DACUM vocational training model is **not an invention**—it's an alignment with **active NSF federal policy** (SCiPE program: UMCES, CU Boulder, Hawaii Data Science Institute):

- **NSF already formalizes "cyberinfra facilitator" as legitimate occupational role** — not "support staff," but technical contributor
- **Lived/facilitated expertise has institutional precedent** — University of Guam CS student's CI-SIP showcase (2025) demonstrated facilitation/practice role as legitimate research output
- **DACUM's throughline (GSBF-50/48/49)** makes identical argument for viticulture roles (grower, enologist, program instructor)

**Convergence with Strategic Framework:**
- Validates "SCID/DACUM vocational training model" (§Pivot) as institutionally defensible, not aspirational
- Confirms "B2B focus" (§Core Thesis) — formalizing lived expertise as technical contribution is what businesses buy (reduces time-to-contribution, validates infrastructure with hardest-case users)

**Extension Beyond Framework:**
The **SCiPE precedent** strengthens B2B sales positioning:
- **Package 1 pitch** (Foundation Cohort) can cite NSF's CIP framing as institutional validation ("your vineyard workers/growers are CIPs in your domain")
- **Package 2 pitch** (Infrastructure Co-Design) can reference Hawaii DSI's CI-SIP model (student immersion → production contribution in 12 weeks)

**New B2B Value Proposition:**
Add to B2B_VOCATIONAL_TRAINING.md §Value Propositions:
> "NSF Institutional Precedent: The SCiPE (Strengthening Cyberinfrastructure Professionals Ecosystem) program demonstrates that facilitation/practice roles are federally recognized technical contributions. Your domain experts are CIPs—we formalize what they already know into portable credentials."

---

### Reveal 3: Mobile as Field-Training Deployment Surface Addresses Real Gap

**Source:** Mobile as the Field-Training Deployment Surface (161316876)

**What It Reveals:**
Current SCiPE/CI-SIP tooling is **structurally exclusive** of field practitioners:

- **Confirmed desktop/notebook-bound constraint** — 7 of UMCES's recent repos are Jupyter Colab tutorials; Hawaii DSI CI-SIP's Streamlit dashboard failed to host publicly
- **Field practitioners excluded from their own data capture** — vineyard worker, oyster farmer, viticulture student cannot participate where the work happens
- **Mobile is not UX preference, it's accessibility requirement** — only surface where practitioner and work are co-located

**Convergence with Strategic Framework:**
- Validates "accessibility" focus (§Intellectual Honesty: Actually New) — Guild Academy must reach practitioners where they are
- Confirms "B2B value proposition: Infrastructure Validation" (§B2B Focus) — co-design with hardest-case users requires mobile deployment

**Extension Beyond Framework:**
Mobile deployment is the **missing technical specification** for Guild Academy infrastructure:
- **PBL Phase 1-3** (Guild_Academy_Charter.tsx) should specify mobile-first AI copilot tooling (not desktop-bound Jupyter)
- **Pattern Module publication** should include mobile deployment guides (sensor placement protocols, field data capture)

**New Risk to Mitigate:**
Add to B2B_VOCATIONAL_TRAINING.md §Risk Mitigation:
> **Risk 5: Desktop-Bound Tooling Excludes Field Practitioners**  
> **Mitigation:** Mobile-first deployment for AI copilot, sensor protocols, and field data capture. Vineyard/oyster farm/environmental monitoring work happens on-site, not at a laptop.

---

### Reveal 4: Stance Lens Gap = Governance Architecture Requirement

**Source:** Signal Operate Stack (152535045)

**What It Reveals:**
The **stance lens (GUEST/OPERATOR/VENUE/PROTOCOL) is missing from every current artifact**, despite being named in data models:

- **Unmarked stances in all surfaces** — Jira issues, Port.io blueprints, Obsidian traces, Attio records are written from an implicit OPERATOR-only viewpoint
- **Multi-stance UI is not a feature, it's a doctrine requirement** — under "sovereignty as social practice," practitioners cannot exercise sovereignty if they can't see which parts address their stance
- **Stance lens gap indexed across four tools** — Jira (no board filter), Obsidian (traces lack stance suffix), Attio (no primaryStance field), Port.io (grammarState exists but needs per-stance interpretation)

**Convergence with Strategic Framework:**
- Validates "externalities-cognizant" (§Core Thesis) — stance lens is the architectural expression of acknowledging different stakeholder positions
- Confirms "human sovereignty over AI assistance" (§Pivot) — practitioners need stance-aware interfaces to maintain agency

**Extension Beyond Framework:**
The stance lens is the **governance layer missing from Guild Academy Charter**:
- **Constitutional bounds (Charter §Constitutional AI Bounds)** should specify stance-aware approval gates (GUEST contributions reviewed by PROTOCOL stance, not just OPERATOR)
- **Revenue model (B2B_VOCATIONAL_TRAINING.md §Revenue Center)** should differentiate VENUE partners (hospitality groups), PROTOCOL stewards (tribal/disability communities), OPERATOR clients (enterprise tech)

**New Component to Document:**
Create `STANCE_LENS_ARCHITECTURE.md` specifying:
- Four stances (GUEST/OPERATOR/VENUE/PROTOCOL) with use cases
- Multi-stance UI requirements (ENG-389 design as canonical reference)
- Governance flow per stance (GUEST → mod.io, OPERATOR → approval, PROTOCOL → SOP-18 write)

---

### Reveal 5: Walla Walla CC as Prioritized Partnership Validates Local Strategy

**Source:** Academic Landing — UMCES Crosswalk (161087500), DACUM × SCiPE Bridge (160956442)

**What It Reveals:**
**Walla Walla Community College** selected over Napa Valley College and Geisenheim (Germany) for Priority 3 wine school partnership:

- **Local, accessible, low-friction** against Dec 31 letter deadline
- **Viticulture/enology program** aligns with Guild Academy's first domain pilot
- **No contact identified yet** — realistic about partnership being proposal-stage, not executed

**Convergence with Strategic Framework:**
- Validates "non-linear progression" (§Non-Linear Progression) — partnership-dependent scaling, not speculative timelines
- Confirms "near-term focus: establish first B2B pilot partnerships" (§Next Steps)

**Extension Beyond Framework:**
Walla Walla CC is the **first concrete B2B pilot target**:
- **Package 1: Foundation Cohort ($75K)** should be tailored to Walla Walla CC's viticulture program (10 students, 12 weeks, sensor deployment or vineyard data capture as first Pattern Module)
- **Case study template** (B2B_VOCATIONAL_TRAINING.md §Case Studies) should be prepped for Walla Walla CC as first real deployment (not Fort Vancouver or Royal Sonesta, which are "proposed")

**Immediate Action:**
Update B2B_VOCATIONAL_TRAINING.md §Case Studies to add:
> ### Walla Walla CC Viticulture Training (In Development)
> **Partner:** Walla Walla Community College (Priority 3, identified Aug 2026)  
> **Challenge:** Train viticulture students to contribute vineyard sensor data to production cyberinfrastructure  
> **Guild Members:** 10 viticulture students  
> **Outcome (projected):**  
> - Vineyard sensor deployment with DACUM-formalized competency map  
> - Pattern Module published (vineyard data capture protocol)  
> - 10 Technical VCs issued (viticulture + cyberinfra skills)  
> **Revenue:** $75,000 Foundation Cohort  
> **Status:** Contact identification in progress (no outreach sent as of Aug 2026)

---

## II. WARNINGS — Gaps, Tensions, Risks Identified

### Warning 1: GSBF-38 Stalled Pattern — Institutional Data Licensing as Recurring Blocker

**Source:** DACUM × SCiPE Conceptual Bridge (160956442), Academic Landing (161087500)

**What It Warns:**
GSBF-38 (Yakima Valley College DACUM data access) **blocked 127+ days on data-sharing MOU**:

- **Institutional data licensing is external blocker, not technical** — real cautionary data point before assuming Walla Walla CC DACUM thread moves faster
- **GSBF-38's LinkML/PlacePacketRecord architecture is superseded** — current org rails are ATProto, not LinkML
- **Risk of over-committing to schema before data-sharing conversation** — GSBF-38's mistake was committing to LinkML plumbing before institutional agreement

**Tension with Strategic Framework:**
Strategic Framework assumes B2B partnerships activate on **feedback-driven iteration** and **partnership-dependent scaling** — but GSBF-38 shows institutional friction can stall technical work for months.

**Direction to Take:**
- **GSBF-79 (Walla Walla CC DACUM Pass)** should avoid GSBF-38's pattern: describe DACUM output narratively (competency map, duties/tasks), not commit to schema upfront
- **B2B sales process** (B2B_VOCATIONAL_TRAINING.md §Sales Process) should add **institutional data-sharing MOU** as qualification criteria — red flag if partner resists transparent data access before contract
- **Near-term focus** should prioritize partnerships with **lowest institutional friction** (Walla Walla CC local/accessible, not international/complex like Geisenheim)

---

### Warning 2: Stance Lens Gap Blocks Multi-Stakeholder B2B Sales

**Source:** Signal Operate Stack (152535045)

**What It Warns:**
**No current artifact differentiates VENUE, PROTOCOL, and OPERATOR stances** — all documentation is written from implicit OPERATOR viewpoint:

- **VENUE partners (hospitality groups)** cannot see what applies to them in current docs
- **PROTOCOL stewards (tribal nations, disability communities)** have no reading surface showing governance obligations
- **GUEST contributors** have no visibility into their own contribution status

**Tension with Strategic Framework:**
Strategic Framework positions organization as **B2B focused** with **multi-channel distribution** (conference, pop-ups, hospitality, domain workshops) — but if each channel serves a different stance, current single-stance documentation creates friction.

**Direction to Take:**
- **B2B service packages** should be **stance-differentiated**:
  - **Package 1 for VENUE partners** (hospitality groups): emphasize accessibility validation, real-world pop-up testing
  - **Package 2 for PROTOCOL partners** (tribal/disability communities): emphasize co-design, governance validation, cultural stewardship
  - **Package 3 for OPERATOR partners** (enterprise tech): emphasize infrastructure licensing, Pattern Module access
- **Sales collateral** should include stance-specific one-pagers (not one generic pitch deck)

---

### Warning 3: Mobile Deployment Gap in Current Guild Academy Architecture

**Source:** Mobile as Field-Training Deployment Surface (161316876)

**What It Warns:**
Guild Academy Charter (Guild_Academy_Charter.tsx) does **not specify mobile-first tooling** — PBL phases reference AI copilot but don't address deployment surface:

- **Desktop-bound AI copilot excludes field practitioners** (vineyard workers, oyster farmers, environmental monitors)
- **Current SCiPE/CI-SIP tooling is Jupyter/Streamlit** — confirmed notebook-bound, not field-accessible

**Tension with Strategic Framework:**
Strategic Framework emphasizes **co-design with hardest governance cases** (tribal sovereignty, wheelchair accessibility) — but if tooling excludes field practitioners, co-design promise is hollow.

**Direction to Take:**
- **Update Guild_Academy_Charter.tsx** to specify mobile deployment:
  - **PBL Phase 1 (Conceptual Grounding)** — add mobile-first AI copilot requirement
  - **PBL Phase 2 (Scaffolded Contribution)** — add mobile sensor protocol training
  - **PBL Phase 3 (Autonomous Production)** — add mobile field data capture as acceptance criterion
- **Package 1: Foundation Cohort deliverables** should include mobile deployment guide as tangible output

---

### Warning 4: Academic Partnership Pipeline vs. B2B Revenue Timeline Misalignment

**Source:** Academic Landing — UMCES Crosswalk (161087500)

**What It Warns:**
Academic partnerships (UVA, MITH, LoC, Walla Walla CC) are **"In review"** with **Dec 31 letter deadline** — but B2B revenue model assumes **Year 1 (2026) $225K revenue from 3 cohorts**:

- **No B2B contracts signed** — all partnerships are proposal-stage
- **Academic timelines are slower than commercial** — MOU negotiation, IRB review, grant cycles
- **Walla Walla CC has no identified contact yet** — most concrete partnership is still pre-outreach

**Tension with Strategic Framework:**
Strategic Framework deliberately avoids **speculative linear timelines** — but B2B_VOCATIONAL_TRAINING.md includes **Year 1/2/3 financial projections** that assume partnership activation velocity not yet demonstrated.

**Direction to Take:**
- **Reframe B2B financial projections** as **scenario-based, not timeline-commitments**:
  - **Scenario A (Optimistic):** 3 cohorts Year 1 if Walla Walla CC + 2 hospitality partners sign by Q4 2026
  - **Scenario B (Realistic):** 1 pilot cohort Year 1, scale to 3 in Year 2 after feedback loop validation
  - **Scenario C (Conservative):** Year 1 is R&D investment only, revenue ramp begins Year 2
- **Sales cycle estimate (12-24 weeks)** should be flagged as unvalidated — no cohort has closed yet to confirm timing

---

### Warning 5: LinkML/PlacePacketRecord Architecture Superseded — Documentation Debt

**Source:** Academic Landing — UMCES Crosswalk (161087500)

**What It Warns:**
GSBF-15 (Viticulture Cyberinfra Crosswalk) describes **LinkML/Provider Slot Index** as the canonical architecture — but **banner dated 2026-07-27 states it's superseded** by ATProto (`did:web:atproto.humancode.codes`):

- **External-facing pitches citing GSBF-15 are citing outdated architecture** — risks credibility if partner asks technical follow-up
- **No ATProto-equivalent documentation exists in docs/ folder** — LinkML references in codebase may confuse new contributors

**Tension with Strategic Framework:**
Strategic Framework assumes **technical validation first** (§Non-Linear Progression: Milestones) — but if internal architecture has shifted without updating documentation, validation is built on stale foundation.

**Direction to Take:**
- **Create `docs/ATPROTO_ARCHITECTURE.md`** documenting current data model (replace LinkML references)
- **Update B2B pitch decks** to remove GSBF-15 citations, reference ATProto as current rails
- **Guild Academy Charter** should specify ATProto Verifiable Credentials as canonical (not generic "VCs")

---

## III. DIRECTIONS — Next Steps and Strategic Pivots

### Direction 1: Multi-Stance UI as Q4 2026 Priority (ENG-389)

**Why:**
Stance lens gap blocks:
- Multi-stakeholder B2B sales (VENUE/PROTOCOL/OPERATOR partners need different views)
- Guild member sovereignty (GUEST contributors need visibility into their status)
- Governance compliance (PROTOCOL stewards need SOP-18 obligation tracking)

**Action:**
- **Prioritize ENG-389 (three-role operator variant)** over new feature work
- **Scope as doctrine requirement, not UX polish** — sovereignty-as-practice depends on stance-aware interfaces
- **Deliverable:** Operator shell with `?role=venue-manager|cultural-steward|technical-editor` parameter (maps to VENUE/PROTOCOL/OPERATOR stances)

---

### Direction 2: Mobile-First AI Copilot as Guild Academy Technical Specification

**Why:**
Desktop-bound tooling excludes field practitioners (vineyard workers, oyster farmers) — contradicts "co-design with hardest governance cases" promise.

**Action:**
- **Update Guild_Academy_Charter.tsx** to specify mobile deployment requirements
- **First Pattern Module: Mobile Vineyard Sensor Protocol** (Walla Walla CC pilot)
- **AI copilot tooling evaluation:** prioritize mobile-accessible interfaces over Jupyter/desktop-only

**Deliverable:**
Mobile deployment guide as Foundation Cohort Package 1 tangible output.

---

### Direction 3: Walla Walla CC as First Real B2B Pilot (Deprioritize Fort Vancouver/Royal Sonesta)

**Why:**
- **Walla Walla CC is identified, local, low-friction** (vs. Fort Vancouver/Royal Sonesta which are "proposed" but no active conversation)
- **Dec 31 letter deadline creates urgency** — real external constraint drives execution
- **Viticulture aligns with DACUM/SCiPE bridge** — NSF CIP precedent strengthens pitch

**Action:**
- **Identify Walla Walla CC viticulture program director** (GSBF-79 first acceptance criterion)
- **Tailor Package 1: Foundation Cohort to viticulture** ($75K, 10 students, 12 weeks, vineyard sensor deployment)
- **Prepare one-pager citing NSF SCiPE precedent** (GSBF-80)

**Deprioritize:**
Fort Vancouver and Royal Sonesta remain in case studies as "aspirational" but Walla Walla CC gets operational focus.

---

### Direction 4: Stance-Differentiated B2B Sales Collateral

**Why:**
Current B2B_VOCATIONAL_TRAINING.md is OPERATOR-stance-only — VENUE partners (hospitality) and PROTOCOL partners (tribal/disability communities) cannot see value proposition clearly.

**Action:**
Create three one-pagers:
- **VENUE Partner One-Pager:** emphasize real-world pop-up testing, accessibility validation, FIFA World Cup case study
- **PROTOCOL Partner One-Pager:** emphasize tribal sovereignty protocols, cultural stewardship, FPIC governance
- **OPERATOR Partner One-Pager:** emphasize Pattern Module licensing, AI copilot infrastructure, workforce development ROI

**Format:**
2-page max, stance-specific value props, relevant case studies only.

---

### Direction 5: ATProto Documentation as Technical Foundation Update

**Why:**
LinkML/GSBF-15 architecture is superseded but no ATProto-equivalent docs exist — creates confusion for partners/contributors.

**Action:**
- **Create `docs/ATPROTO_ARCHITECTURE.md`** documenting:
  - ATProto DID system (`did:web:atproto.humancode.codes`)
  - Verifiable Credentials issuance flow
  - Portable attribution records (replacement for LinkML lore schema)
- **Update B2B pitch decks** to reference ATProto as current rails
- **Update Guild_Academy_Charter.tsx** to specify ATProto VCs (not generic "credentials")

**Deliverable:**
ATProto architecture doc ready before next academic partnership outreach (UVA, MITH, LoC).

---

### Direction 6: Reframe Financial Projections as Scenario-Based, Not Timeline-Commitments

**Why:**
B2B_VOCATIONAL_TRAINING.md Year 1/2/3 projections assume partnership velocity not yet demonstrated — contradicts Strategic Framework's "non-linear progression" stance.

**Action:**
- **Replace timeline-based projections** with **scenario-based revenue models**:
  - **Optimistic Scenario:** 3 cohorts Year 1 ($225K) if Walla Walla CC + 2 hospitality partners close Q4 2026
  - **Realistic Scenario:** 1 pilot Year 1 ($75K), 3 cohorts Year 2 ($225K) after feedback loop
  - **Conservative Scenario:** Year 1 R&D only (-$75K), revenue begins Year 2
- **Flag sales cycle (12-24 weeks) as unvalidated** — no cohort closed yet to confirm

**Deliverable:**
Updated B2B_VOCATIONAL_TRAINING.md §Financial Projections with scenario table.

---

### Direction 7: Digital Salon Seven Motions as Operational Playbook

**Why:**
Digital Salon's seven near-term motions (structured micro-conversations, moment-to-prompt, curated feedback, etc.) are the **missing operational layer** between strategic positioning and B2B deliverables.

**Action:**
- **Incorporate seven motions into B2B service packages:**
  - **Package 1: Foundation Cohort** — Motion #2 (QR moment-to-prompt) as tangible pilot output
  - **Package 2: Infrastructure Co-Design** — Motion #6 (Producer facilitation training) as first cohort skill
  - **Package 3: Continuous Capacity** — Motion #5 (Follow-up continuity) as ongoing engagement mechanism
- **Document Digital Salon as Pattern Module** (not just Confluence page) — reusable across hospitality/tourism/cultural heritage deployments

**Deliverable:**
`DIGITAL_SALON_PATTERN.md` as publishable Pattern Module.

---

## IV. Cross-Document Convergence — The Recurring Primitives

Across all 7 Confluence pages, **three primitives recur independently**, validating the organizational species model:

### Primitive 1: Depth/Pulse Value (0→1 continuous measure)

| Instance | Where it appears | Status |
|----------|------------------|--------|
| Swirly Pulse (60 BPM) | Digital Salon, Ceviche Corridor | Documented ancestor |
| cipDepth (surface/deep/benthic) | Signal Operate Stack, PLAC Pipeline | Live, unbuilt for FWG |
| presenceDepth | Rive Gaming Substrate | Live, different engine |
| noseDepth (0→1 over 1.5s hold) | Football World Glass build | Built, v0.0.1.130 |

**Convergence:** Every surface independently reconstructs the same 0→1 depth primitive — validates that **engagement depth measurement** is core to organizational species, not surface-specific.

**Direction:** Formalize depth/pulse as **canonical Pattern Module** — reusable across voice interaction, AR navigation, sensor deployment.

### Primitive 2: Stance Lens (GUEST/OPERATOR/VENUE/PROTOCOL)

| Instance | Where it appears | Status |
|----------|------------------|--------|
| Digital Salon stance roles | Provisional Discord identities | Named, not surfaced |
| Signal Operate Stack stance field | Jira labels, Port.io grammarState | Data exists, UI missing |
| vj-bot stance param | PacketVersionWorkflow | Passed, not displayed |

**Convergence:** Every governance surface names stances — but **none render them as a lens** for practitioners to navigate.

**Direction:** Multi-stance UI (ENG-389) is not a feature request — it's **architectural debt resolution**.

### Primitive 3: SOP-18 Episodic Traces (Cultural Memory as Obligation)

| Instance | Where it appears | Status |
|----------|------------------|--------|
| Obsidian vault-mcp | SOP-18 CO_SIGN writes | Live, vault writes firing |
| Story Gem (Place Packet) | Named in 6 docs, built zero times | Documented twice, never built |
| ATProto lore record | CEAZ-243, MDP-106 | Real, gated/parked |

**Convergence:** Every surface assumes **cultural memory is recorded as obligation, not logged as event** — but SOP-18 vault writes are the only live instance.

**Direction:** Story Gem should be **scoped as SOP-18 extension** (audio+text trace), not separate feature.

---

## V. Final Synthesis — Organizational Species Model Is Real, Not Aspirational

### The Strategic Framework predicted:
- Component modular build
- Multi-channel distribution
- Organizational species (category-encompassing, externalities-cognizant)
- Human capacity building as both revenue and cost center
- Non-linear progression, feedback-driven

### The Confluence activity confirms:
- **Digital Salon = component modular build in action** (seven motions, independently deployable)
- **DACUM/SCiPE = human capacity building with institutional precedent** (NSF CIP model)
- **Stance lens gap = externalities made visible** (VENUE/PROTOCOL/OPERATOR stances require different surfaces)
- **Walla Walla CC = partnership-dependent scaling, not speculative timeline** (Dec 31 deadline is real external constraint)
- **Mobile deployment = co-design with hardest cases requires field accessibility** (desktop-bound tooling excludes practitioners)

### What Changes Next:
1. **Multi-stance UI (ENG-389)** becomes Q4 2026 priority — governance architecture requirement
2. **Walla Walla CC** becomes first real B2B pilot — deprioritize Fort Vancouver/Royal Sonesta
3. **Mobile-first AI copilot** becomes Guild Academy technical specification
4. **ATProto documentation** replaces LinkML references — current architecture made explicit
5. **Scenario-based financial projections** replace timeline commitments — align with non-linear progression stance
6. **Stance-differentiated sales collateral** — VENUE/PROTOCOL/OPERATOR partners get tailored one-pagers
7. **Digital Salon seven motions** become operational playbook — bridge strategic positioning to B2B deliverables

---

## Appendix: Confluence Pages Cross-Reference

| Page ID | Title | Key Contribution to Synthesis |
|---------|-------|-------------------------------|
| 61800450 | Digital Salon: 18th-Century Café | Organizational species as architectural philosophy; seven near-term motions |
| 161316876 | Mobile as Field-Training Deployment Surface | Desktop-bound SCiPE tooling excludes field practitioners; mobile is accessibility requirement |
| 160956442 | DACUM × SCiPE Conceptual Bridge | NSF CIP model as institutional precedent; GSBF-38 stalled pattern warning |
| 161087500 | Academic Landing — UMCES Crosswalk | Walla Walla CC as prioritized partnership; ATProto supersedes LinkML |
| 152535045 | Signal Operate Stack | Stance lens gap across all four tools; sovereignty as social practice |
| 88899585 | Target state of Ceviche corridor | Wine/book swirly expression; genre test for induction prompts |
| 90964082 | ewe Home — Operating Documentation Index | Strategic/operating documentation structure; doctrine registration |

---

**This synthesis is a living document.** As partnerships activate and components deploy, we update our understanding of the feedback loop's revelations.
