# Is Rive Viable for the NSF Track — Tangibles and a Candidate WO

**Date:** 26 October 2026
**Status:** Analysis + draft Candidate WO, following the naming convention already in use (`FRM-47 — Candidate WO — Geo-Insights Rive Primitive`, created 2026-10-26). Not filed to Linear/Confluence this turn — connectors still down; staged.

---

## Verdict: viable, with one discipline that must be non-negotiable

**Yes — but Rive itself cannot be the innovation claim.** The same line this engagement already drew for Genblaze and GMI Cloud (`GENBLAZE_PARTNERSHIP_DECISION_MATRIX.md`: *"This SBIR does not propose extending Genblaze SDK itself... Genblaze is the enabling infrastructure, like using TensorFlow"*) applies identically here. Rive is a commercial rendering/state-machine tool. NSF SBIR reviewers fund novel *application*, not use of an existing commercial product. The tangible has to be framed as: **AI-bounded competency scaffolding, rendered via a lightweight, agent-authorable state format** — Rive is the substrate, the SCID-scaffolded pedagogy is the claim.

Get this framing wrong and the application reads as "we bought software," which is the exact failure mode already avoided once in this engagement.

---

## Why it's genuinely viable — the case for

**1. The mobile-first constraint, actually met.** SCID's architecture requires mobile-first deployment for field practitioners (vineyard, not desktop-bound). Rive's runtime is built for exactly this — small `.riv` files, cross-platform (web, native mobile), real-time interactive state machines without a game-engine footprint. This isn't a stretch fit; it's the thing Rive is for.

**2. A demonstrable artifact NSF reviewers can actually open.** AC-1's induction mode (per `WO009_PRESENTATION_LAYER_CONTRIBUTION.md` §4) gives SCID's three-phase scaffolding (Guided → Assisted → Autonomous) a literal, inspectable rendering: state transitions a reviewer can see change in real time, tied to a DACUM-mapped competency. This is stronger than a deck or a narrative description — it's a running artifact.

**3. RML makes the claim auditable, not just demoable.** Since Rive's CLI/RML launch (Sept 2026), the state-machine logic is text — reviewable, diffable, includable as literal source in a grant report. "Here is the human-readable source for the AI-bounded scaffolding logic" is a materially stronger technical-merit section than a video walkthrough.

**4. It's already partially built, not speculative.** AC-1 (`glass-swirl.riv`/`VesselData`) exists, has been revised twice, and runs on an operating agentic workflow (`Agent (Rive MCP)`). An SBIR Phase I that extends real, existing work is a stronger de-risking story than one proposing everything from zero.

**5. Evidence Capture gets a concrete UI surface.** SCID's Evidence Capture layer (field artifact → B2 → assessment → VC issuance) currently has no named rendering surface for the assessment step itself. A Rive-rendered competency-attempt visualization (the same primitive class as `glass-swirl`, repurposed) is a plausible, concrete answer to that gap — not previously named anywhere in this engagement's SCID work.

---

## Named risks — argued honestly, not glossed (one closed below)

**1. GPU Canvas specifically should not be cited as a current capability.** If any NSF narrative reaches for the "premium 3D" framing, GPU Canvas is editor-ready but runtime-incomplete by the vendor's own admission. Cite it as Phase II roadmap if at all — never as a Phase I deliverable. The base 2D Rive layer (mature, in production use in WO-009 already) carries the actual claim.

**2. Licensing cost is a real, small budget line, not a blocker.** WO-009's AC-7 (Rive paid plan) is already `DONE`. An NSF budget should carry this the same way `GMI_CLOUD_PARTNERSHIP_STRATEGY.md` carries the GMI Cloud inference line — named, small, unremarkable if disclosed, a problem only if omitted.

**3. IP/licensing terms for `.riv` artifacts in a federal-grant context — resolved, 26 Oct 2026.** Rive's licensing restrictions are scoped to *publishing* — the paid-plan tier gates, seat terms, and distribution restrictions that apply to a commercially published Rive-driven product — not to build-state use. A Phase I NSF demonstrable artifact is build-state: the `.riv` file, the RML source, and a reviewer-facing demo render are not a published commercial product in Rive's own licensing sense. **No restriction applies to this candidate WO's use case.** This closes the one open item named below — AC-5 is satisfied as a licensing matter, not merely deferred.

---

## The future/possible AC — as a Candidate WO, not a WO-009 line item

**This should not be an AC on WO-009.** WO-009's own TRIGGER row is explicit — FIFA-window-dated, Wine Flies Free social-surface scope. Folding an NSF deliverable into it would be the same scope-blur this engagement has flagged repeatedly elsewhere. The bridge is AC-1's *primitive* (reusable), not AC-1's *work order* (scoped to something else).

Following the convention already in use today (`FRM-47 — Candidate WO — Geo-Insights Rive Primitive`):

---

### Candidate WO — SCID Scaffolding Primitive (NSF Phase I Tangible)

| Field | Value |
|---|---|
| WORK_ORDER_ID | *(unassigned — candidate)* |
| STATUS | Candidate |
| TRIGGER | NSF SBIR Phase I (PART-85) needs "one working proof artifact" — the named Phase 1 readiness exit criterion in `CROSS_TEAM_OPERATING_PLAN.md`, currently unmet |
| PREMISE | AC-1's `glass-swirl.riv` / `VesselData` primitive is reused in induction mode, not rebuilt. One `.riv`, one contract, a second lookup table (pedagogical cues keyed to DACUM competency stage, not commerce liquid parameters), selected by mode — per `WO009_PRESENTATION_LAYER_CONTRIBUTION.md` §4 |
| OBJECTIVE | A demonstrable, RML-auditable artifact rendering SCID's Guided → Assisted → Autonomous scaffolding against one DACUM-mapped competency (viticulture or mixology, matching the South Seattle College PNW Wine Education Collaborative channel already established in `FUNDING_PATHWAYS_UPDATED.md`) |

**Candidate acceptance criteria (draft, not filed):**

| AC | Description | Depends on |
|---|---|---|
| AC-1 | Second `contentCategory`-keyed lookup table on existing `VesselData` ViewModel: pedagogical cues (pour technique, tasting-note vocabulary prompts) per competency stage, not liquid-color parameters | WO-009 AC-1 (consumes, does not fork) |
| AC-2 | Mode flag selecting commerce vs. induction lookup table on the same artboard | AC-1 above |
| AC-3 | RML export of the state-machine + lookup table, committed as literal reviewable text | Rive CLI/RML (available now) |
| AC-4 | Evidence Capture binding: competency-attempt interaction writes to SCID's assessment path (B2 → VC issuance), reusing `ENG-475`'s actor guard so only a human steward's attempt counts as consequence-bearing, never an agent's | `SCID_ARCHITECTURE.md` Evidence Capture layer; `ENG-475` (currently blocked — see below) |
| AC-5 | ~~Licensing confirmation~~ — **resolved 26 Oct 2026**: Rive's licensing restrictions attach to publishing/distribution, not build state; a Phase I demonstrable artifact is build-state use and is unrestricted | Closed — no further action |

**Known blocker inherited, not introduced here:** AC-4's actor-guard dependency (`ENG-475`) is itself currently blocked (package frozen, InterfaceType collision — per `RES-131`). This candidate WO does not need to wait on that resolution to produce AC-1–AC-3 as a demonstrable artifact; AC-4's governance binding can follow once ENG-475 unblocks. Worth sequencing explicitly so the NSF-facing artifact isn't gated on an unrelated package freeze.

**Forward note, not a Phase I concern:** if this primitive ever moves from demonstrable artifact to a publicly distributed product (Phase II or beyond), Rive's publishing-tier terms would then apply — the same paid-plan line WO-009's AC-7 already carries for the commercial Wine Flies Free surface. That's a future budget line, not a gate on Phase I.

**What this candidate WO is not:** not a request to build a second Rive primitive, not a change to WO-009's scope, and not a claim that this satisfies PART-85's readiness gate by itself — only that it's the most concrete path to satisfying it that doesn't require new infrastructure.

---

## Recommendation

1. Treat this as a Candidate WO (same status FRM-47 already carries) rather than filing it as a new AC anywhere today.
2. Licensing is closed (AC-5) — no remaining blocker to naming Rive specifically in NSF-facing material, for build-state/demonstrable use.
3. If PART-85 needs its "one working proof artifact" sooner than a full candidate-WO build cycle allows, AC-1–AC-3 alone (no Evidence Capture binding yet) is enough to demonstrate the scaffolding-rendering claim on its own.
