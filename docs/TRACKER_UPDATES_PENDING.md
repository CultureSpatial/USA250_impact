# Tracker Updates — Apply Log

**Date:** 17 September 2026 · **Applied:** 23 September 2026 (connectors restored)

## APPLIED ✅

| Target | What | Result |
|---|---|---|
| **CEP-75** (Jira) | Closed as decided — Brightbean, Postiz moot; Postiz-in-API-path cleanup noted | Comment 13929 |
| **CEP-29** (Jira) | Axis 4 redressed **and** dependency inverted to ENG-111 | Comment 13930 |
| **ENG-111** (Linear) | Upstream of Axis 4; `WITHDRAW` missing; actor guard; placement correction; ams-host bridge = AMS gap | Posted |
| **FRM-6** (Linear) | `data-state` carries three orthogonal dimensions; `proto-resolving` reclassified grammar-tier; retitle; critical path | Posted |
| **BOT-1** (Linear) | The call — scaffold → adaptive substrate; venue authority; corrected placement | Posted |
| **ENG-475** (Linear, new) | GrammarActor `WITHDRAW` + actor guard, resolved in `substrate/packages/shared` | Created, Urgent |

## STILL TO APPLY

Confluence pages (operating plan, canopy, Axis 4 redress, funding §XI), the Canada/GMI/ATE issues from the September batch, the Linear foundational-doc edits (Card Schema `steward` + `withdrawal`; Outlet Strategy Brightbean + per-occasion `grantedFor`; Opportunity Radar public-humanities lanes), CEP-72 retitle, and the FRM-6 retitle.

---

The original staged text follows, retained for the entries not yet applied.

---

## JIRA

### CEP-75 — close as decided
**Transition:** → Done / Decided
**Comment:**
> Decision: **Brightbean**. Postiz is moot as of September 2026. This unblocks CEP-72 and the American Lore Wave 2 publishing rhythm, and removes the BC Tourism FC dependency. Follow-on cleanup tracked below.

### CEP-72 — retitle and rescope
**Current title:** `[CO][E] OPS-156 — Postiz Publishing Seam Architecture: Platform Runbook + DM Routing`
**New title:** `[CO][E] OPS-156 — Brightbean Publishing Seam Architecture: Platform Runbook + DM Routing`
**Comment:**
> Retitled per CEP-75. Seam is Brightbean; Postiz references in the description and in OPS-156 need scrubbing.

### CEP-29 — replace Axis 4 in the epic description
**Replace:**
> **Axis 4**: Surface CIP (public lore) → Deep CIP (oral tradition with contributor consent) → Benthic CIP (sacred/protected knowledge — no share without explicit gate)

**With:**
> **Axis 4 — Transmission Terms** (redressed Sept 2026, replaces CIP depth): `steward` · `grantedFor[]` (occasions: in-session, locale-card-public, open-social-carryforward, classroom-k12, archive-deposit, partner-institutional) · `attribution` · `conditions[]` (incl. `no-commercial-adjacency`) · `withdrawal` · `openQuestion`. Default is that **nothing circulates without named terms**; absence of a steward is a blocker, not a green light.

**Also update the success criterion:**
> …each expression carries correct **transmission terms**, and no commercial overlay is applied to material whose conditions include `no-commercial-adjacency`.

**Comment:**
> Axis 4 redressed — the CIP depth scale was abstract and out of line with the social practice model (PART-57 Adaptation crosswalk; PART-25 June rebase). Depth treats sensitivity as a property of content and locates authority in whoever classifies; transmission terms locate it with the steward. Full argument, migration table and open questions: `docs/AXIS_4_REDRESS.md`.
> The unimplemented "benthic gate" is **obsolete by redesign** rather than outstanding: nothing circulates without a named steward and a grant for that specific occasion.
> Epic also refreshed against the July foundational docs and the America250 premise verification (see below) — it had been four months behind its own strategy.

### NEW — CEP: Transmission Terms implementation
**Type:** Story · **Parent:** CEP-28 (execution layer) · **Labels:** `content-os`, `governance`, `civic-memory`
**Summary:** `[CO][E] Transmission Terms — Axis 4 implementation as shared primitive`
**Description:**
> Implements the Axis 4 replacement specified in `docs/AXIS_4_REDRESS.md`.
> Fields: `steward` (required, blocking) · `grantedFor[]` (multi-select occasions, not a ladder) · `attribution` · `conditions[]` · `withdrawal` (required — retraction path for already-distributed ATProto traces) · `openQuestion` (narrower terms govern where stewards disagree).
> Build **once** as a shared primitive across three threads that are the same shape — a claim, its steward, and the terms under which it circulates:
> • CEP-29 American Lore (lore circulation)
> • PART-25 attribution routing (value distribution)
> • PART-137 provenance / truth-in-labelling (origin disclosure)
> Promotes the Card Schema v1 invitation-path consent fields (attribution preference, consent requirements, governance flags) from metadata to governing status.
> `cipDepth` may survive only as a derived, non-authoritative display hint. It must not gate anything.
> **Do not fix the occasion vocabulary before validating against three real cases** — one state, one territory, one tribal nation locale.

### NEW — CEP: Archive rights clearance practice
**Type:** Story · **Parent:** CEP-29 · **Labels:** `civic-memory`, `governance`
**Summary:** `[CO] Archive rights clearance practice for LOC/AFC-sourced cards`
**Description:**
> Card Schema v1 requires an archive trace per card with a rights/usage note. LOC and American Folklife Center rights status varies per item. Needs a standing clearance practice, not per-card improvisation.
> **Critical distinction (see `AXIS_4_REDRESS.md` open question 4):** an archive citation is **not** a transmission grant. `archiveTrace` and `steward` are separate fields and must not be conflated. Institutional archive material may have clear rights and still have no living steward — that combination needs its own rule.

---

## CONFLUENCE

### New page — "Cross-Team Operating Plan — Phase 0 → 2"
**Space:** governance/ops space · **Body:** `docs/CROSS_TEAM_OPERATING_PLAN.md`
Canonical home for the phase model, the procurement glossary and gate decision rights — reaches partners and academic collaborators who are not in Linear. The glossary is the part worth circulating widest.

### New page — "American Lore Canopy — Directional Cluster Switch"
**Space:** same · **Body:** `docs/AMERICAN_LORE_CANOPY.md`
Records the FIFA → American Lore switch, the absorption of FIFA assets under CEP-29, and the America250 premise verification.

### New page — "Axis 4 Redress — Transmission Terms"
**Space:** same · **Body:** `docs/AXIS_4_REDRESS.md`
Child of the canopy page. This is the one to put in front of Cultural Governance.

### Update existing — funding pathways page (if mirrored)
Add §XI Public Humanities Pathway from `docs/FUNDING_PATHWAYS_UPDATED.md`.

---

## LINEAR

### CUL-80 — comment (foundational doc anchor)
> **Axis 4 redressed (Sept 2026).** CIP depth (Surface/Deep/Benthic) is replaced by **Transmission Terms** — steward, granted-for occasions, attribution, conditions, withdrawal, open question. Reason: the depth scale is abstract and misaligned with the social practice model; it treats sensitivity as a property of content and puts authority with the classifier rather than the steward. See `docs/AXIS_4_REDRESS.md`.
> Consequence for the **Card Schema v1** doc: the invitation-path fields (attribution preference, consent requirements, governance flags) are promoted from metadata to governing status, and a `withdrawal` field is added. Minimum-viable v1 card gains one required element: **named steward**.
> Consequence for the **Outlet Strategy** doc: the outlet matrix must check `grantedFor` per occasion. A card granted for `locale-card-public` is not thereby granted for `open-social-carryforward` — primer, live witness and return signal are three distinct grants, not one.

### Foundational docs — edits to apply
1. **American Lore Civic Memory Card Schema v1** — add `steward` as required; add `withdrawal`; promote consent fields to governing; note that archive trace ≠ transmission grant.
2. **American Lore Outlet Strategy** — replace Postiz references with Brightbean; add the per-occasion `grantedFor` check to the outlet matrix.
3. **American Lore Opportunity Radar** — replace OPS-156/Postiz references with Brightbean; add §XI public humanities funders (Federation of State Humanities Councils, LOC/AFC, Smithsonian CFCH, IMLS) to the external lanes; record the America250 "After the Fireworks" verification and its closing window.

### OPS-156 — comment
> Publishing seam is **Brightbean**; Postiz is moot (CEP-75 decided, Sept 2026). Scrub Postiz from this issue and from the two American Lore foundational docs that reference it.

### PART-137 — comment (Canada provenance thesis)
> Third sighting of the same primitive. Transmission Terms (CEP-29 Axis 4), attribution routing (PART-25) and provenance labelling (this issue) are all **a claim, its steward, and the terms under which it circulates**. Recommend building once rather than three times — spec in `docs/AXIS_4_REDRESS.md`.

### PART-25 — comment
> The June 2026 sovereignty rebase is the direct precedent for the Axis 4 redress: it replaced "practitioners as validation subjects" with practitioners who configure their own participation. Axis 4's CIP depth had reintroduced exactly the pattern this rebase removed. Now corrected — see `docs/AXIS_4_REDRESS.md`.

### NEW issue — Partnerships: public humanities pathway
**Team:** Partnerships · **Priority:** High · **Related:** PART-58, PART-137, CUL-80
**Title:** `Public humanities funding pathway — Federation of State Humanities Councils + By the People`
**Description:**
> New funding circuit, added as §XI of `FUNDING_PATHWAYS_UPDATED.md` at Tier 1. Distinct from the NSF technical-education circuit in funder, scale, cadence and review culture — typically $2K–$75K on weeks-to-months cycles, which is the only pathway that can fund **Wave 1 grounding** inside the current quarter.
> **Entry point:** "By the People: Conversations Beyond 250" — Federation of State Humanities Councils + Smithsonian Center for Folklife. 51 councils including DC and **four U.S. territories**. Themes explicitly include cooks alongside storytellers, so foodways is in scope by name.
> **Territory councils are the shortest path from the canopy to USVI Sound Clash**, whose replicability framework already names Hawaii, Puerto Rico, Guam and American Samoa.
> **Timing:** America250's "After the Fireworks" runs through the remainder of 2026 — roughly one quarter. Do not queue Wave 1 behind other threads.
> **Do not** route this through the NSF narrative. Different circuit, different language; conflating them weakens both.
> Study first: Illinois Voices 250, Alaska Humanities Forum Storytelling Fellowship, Alabama "Share Your Story".

### NEW issue — Cultural Governance: transmission terms as veto test
**Team:** Cultural Governance · **Priority:** Urgent · **Related:** CUL-80
**Title:** `Transmission Terms — operationalize the Phase 2 activation veto`
**Description:**
> `CROSS_TEAM_OPERATING_PLAN.md` gives Cultural Governance veto authority at Phase 2 activation but no concrete test. Under Transmission Terms the test becomes mechanical and record-answerable:
> 1. Is there a named steward?
> 2. Are terms granted for **this specific** occasion?
> 3. Is attribution honored as specified?
> 4. Are conditions satisfied (incl. `no-commercial-adjacency`)?
> 5. Is the withdrawal path live?
> Also owns open questions 2–4 in `docs/AXIS_4_REDRESS.md`: steward succession; honest scoping of withdrawal reach across ATProto (and disclosing that limit to stewards **before** they grant, not after); and institutional stewards where archive material has rights but no living steward.

---

## ADDED 19 SEPT 2026 — GrammarActor reconciliation

Source: ENG-111 and FRM-6 read in full. See `docs/GRAMMAR_ACTOR_RECONCILIATION.md`.

### CEP-29 — invert the Axis 4 dependency (revises the entry above)

The Axis 4 replacement text staged earlier still stands as *vocabulary*, but the framing changes: Axis 4 is **not a dimension of the content**. It is the record GrammarActor emits at `verified`.

**Comment:**
> Axis 4 dependency inverted. GrammarActor (ENG-111, created 2026-05-10, Done) predates this epic (2026-05-19) and already implements graduated accession as a shipped XState machine: `idle → induction → hold → carry → verified`. `verified` is a Governed Relation emitting a participant-owned AT Protocol record with a BOT-31 `traceId`.
> Transmission Terms is therefore a **projection of GrammarActor**, not a parallel classification: `grantedFor[]` is what `CO_SIGN` writes; `conditions[]` are XState guards; `hold` is the gate this epic left unnamed for four months. Axis 4 should reference ENG-111 rather than define its own model.

### ENG-111 — comment

> Reconciled against the Content OS axis model (`docs/GRAMMAR_ACTOR_RECONCILIATION.md`).
> **This machine is upstream of CEP-29 Axis 4, not downstream.** Three follow-ons:
> 1. **`WITHDRAW` event missing.** `RESET` returns to `idle` but does not retract an emitted ATProto record. A `WITHDRAW` event plus a post-`verified` state is the highest-value addition to an otherwise-complete package — without it, participant "ownership" of the record overstates what the machine supports.
> 2. **Actor guard needed.** The event list does not restrict actorhood, and `INTENT_IDENTIFIED` / `SENTIMENT_SHIFT` already admit machine-originated events. `CO_SIGN` and `CARRY_FORWARD` must be human-only — an agent that can emit `CO_SIGN` makes consent synthetic and voids the Guild Academy constitutional bound. `HOLD` should be agent-emittable (pausing on a terms violation is the right use). Enforce in the machine, not by convention.
> 3. **The one open acceptance criterion — the `ams-host` provenance bridge — is the same gap as the AMS pipeline gap map.** SCID competency evidence, GSBF governance trail and PART-35 funder evidence all terminate there. Treat as one work item.
> Also: state "Rive renders; GrammarActor decides" here and in FRM-6 — this issue says GrammarActor replaces Rive's state machine while FRM-6 migrates to Rive + Bit.dev, which reads as a contradiction.

### FRM-6 — comment + retitle

**Retitle:** drop "Nordcraft" — the Bit.dev/Rive migration (ENG-396) has moved the target and the body already says so.

**Comment:**
> **`data-state` is carrying three orthogonal dimensions** and needs splitting:
> • machine state (`idle`/`induction`/`hold`/`carry`/`verified`) → `data-grammar-state`
> • emotion tokens (`elated` → `--kinetic-intensity: 0.85`, per `emotionTokenMap.ts`) → `data-emotion`
> • Fenceless/VPS (`pose-matching`, `pose-verified`) → `data-spatial`
> A surface can be in `hold` **and** `elated` **and** `pose-matching` simultaneously; one attribute cannot express that. This is the same collapse-independent-dimensions error the Axis 4 redress corrected.
> **`proto-resolving` is grammar-tier, not spatial** — it is the transient between `carry` and `verified`, and belongs in `data-grammar-state`, which also gives co-sign a visible in-flight state rather than an instant flip.
> **Critical path note:** FRM-6 is in Backlog but gates FRM-4 → SIG-1, the compliance chain. Blocked by ENG-392.

### NEW Linear issue — Engineering

**Title:** `GrammarActor WITHDRAW event + actor guard on CO_SIGN/CARRY_FORWARD`
**Team:** Engineering · **Priority:** High · **Related:** ENG-111, ENG-89, CUL-80
**Description:**
> Two additions to `@vinejocket/grammar-actor`, both governance-bearing:
> 1. **`WITHDRAW` event and post-`verified` state.** `RESET` clears a session; it does not retract an emitted ATProto record. Until this exists, participant ownership of the record is claimed but not supported. Scope honestly: ATProto records propagate, so document what retraction can and cannot recall, and disclose that limit to participants **before** co-sign, not after.
> 2. **Actor guard.** Human-only: `CO_SIGN`, `CARRY_FORWARD`, `WITHDRAW`. Agent-permitted: `TRIGGER`, `HOLD`, `INTENT_IDENTIFIED`, `SENTIMENT_SHIFT`. Operator: `RESET`. Enforce in the machine.

---

## ADDED 23 SEPT 2026 — Zernio widening + Sanity Workflows build plan

Connectors down again for this batch. Staged:

### Linear — ENG-475 revision

**Re-scope** to reference `docs/SANITY_WORKFLOWS_TERMS_PLAN.md` directly rather than describing the runtime gate in isolation. The plan now specifies: `TransmissionTerms` type on `BasePacket` (required, alongside `provenance`) → `resolve()` in `substrate/packages/shared` → wire into `vj-bot` dispatch, then the `ams-host` direct `VENUES` bind, then GrammarActor's guard. Build order and refusal-type contract are in the plan §5.

### Linear — NEW issue: Zernio Seasonal full-platform widening (Rung 1)

**Team:** Engineering · **Priority:** Medium
**Title:** `Zernio Rung 1 — widen Seasonal from Instagram-only to full ANGLE_PLATFORMS fan-out`
**Description:**
> Spike 0b/2 built out for Seasonal/Instagram only (see `docs/ZERNIO_DISPATCH_STATUS.md`). Rung 1 widens Seasonal to its full platform set (Instagram, TikTok, LinkedIn, X, Pinterest) — zero governance risk since Seasonal has no sensitive fields, and it validates fan-out mechanics before any terms-gated angle.
> **Precondition: create `ZERNIO_DELIVERY_QUEUE` (Gap 3) first.** Five platforms without a retry buffer against a free-tier engine with documented sleep cycles multiplies the silent-loss surface by five.
> Remove `ANGLE_PLATFORM_OVERRIDE`; let `ANGLE_PLATFORMS` resolve normally. Connect remaining 4 accounts via the `vj-bot` diagnostic-route pattern (never export `ZERNIO_API_KEY` locally).

### Linear — NEW issue: Venue-authority resolver (unblocks Rung 2 / Place angle)

**Team:** Engineering · **Priority:** High · **Related:** ENG-475, ENG-389
**Title:** `Venue-authority sub-check — at:// co-sign resolver, standalone from full terms model`
**Description:**
> Smallest standalone piece of `resolve()` (see `SANITY_WORKFLOWS_TERMS_PLAN.md` §2, build order item 3). Checks the co-signed `at://` venue record before any Place-angle dispatch; refuses if only `fsqPlaceId`/`plusCode`/VPS pose data is present, since those locate but do not authorize. Ships independently of the full terms model — smallest unit of the substrate resolution work, highest ratio of governance value to build cost.

### Jira — CEP-29 comment

> Transmission Terms build plan finalized: `docs/SANITY_WORKFLOWS_TERMS_PLAN.md`. One model, two bindings — Sanity Workflow stage (beta, content tier) + `substrate/packages/shared resolve()` (GA, runtime tier) — so a beta feature is never the sole gate on practitioner material. Workflow stages proposed: `draft → pending-steward-grant → granted → published`, with `granted` corresponding to GrammarActor's `verified` state. Function timeout should be set to 30s in Blueprint config (not the 10s default) since venue-authority resolution makes an external call.

### Confluence — no change to pages already staged; add cross-reference

When the Cross-Team Operating Plan page is created, add `docs/ZERNIO_DISPATCH_STATUS.md`'s widening ladder as the concrete example under the Phase 2 (Activation) section — it's the clearest illustration of the phase-gate model in the whole doc set.

