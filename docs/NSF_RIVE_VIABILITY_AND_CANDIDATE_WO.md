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

## Named risks — argued honestly, not glossed (one corrected and closed-with-residual-uncertainty below)

**1. GPU Canvas specifically should not be cited as a current capability.** If any NSF narrative reaches for the "premium 3D" framing, GPU Canvas is editor-ready but runtime-incomplete by the vendor's own admission. Cite it as Phase II roadmap if at all — never as a Phase I deliverable. The base 2D Rive layer (mature, in production use in WO-009 already) carries the actual claim.

**2. Licensing cost is a real, small budget line, not a blocker.** WO-009's AC-7 (Rive paid plan) is already `DONE`. An NSF budget should carry this the same way `GMI_CLOUD_PARTNERSHIP_STRATEGY.md` carries the GMI Cloud inference line — named, small, unremarkable if disclosed, a problem only if omitted.

**3. IP/licensing terms for `.riv` artifacts in a federal-grant context — corrected 26 Oct 2026, closed with residual uncertainty, not cleanly resolved.** The mechanism first written here (26 Oct) was wrong in a specific way worth naming rather than quietly fixing: it framed Rive's gate as "build-state free, publish-state restricted *by audience*" (commercial vs. non-commercial, public vs. demo). A follow-up check against Rive's own vocabulary (via search of Rive's Masterclass/CLI docs — the actual `rive.app` ToS/pricing pages were unreachable from this session, host not on the egress allowlist, so this is secondary-source-verified, not primary-source-verified) shows the real gate is different: Rive's own term **"publish" means the export action** — turning editor work into a `.riv` file at all — not "ship to the public." Exporting a `.riv`, for any audience, now requires the **Cadet plan or higher**; the free tier cannot export, period. Once exported, the **runtime that renders a `.riv` is MIT-licensed** — loading/rendering is unrestricted for personal or commercial use, with no distribution gate found there.
> **Practical conclusion is unchanged, for a reason that has nothing to do with the corrected mechanism being favorable: WO-009's AC-7 (Rive paid plan) is already `DONE`.** The org can already export `.riv` files regardless of audience, so this candidate WO's demonstrable artifact is not blocked. But the *reasoning* should not be cited anywhere NSF-facing as "build-state use is exempt from Rive's licensing" — that claim isn't supported by what was actually found. The accurate claim is narrower: "exporting requires a paid seat we already hold; once exported, use of the runtime carries no additional restriction we found evidence of."
> **Not closed outright** — the primary ToS/pricing pages should still be opened directly by a human with access before this is cited in an actual NSF submission; flagged as the one remaining real due-diligence step, smaller in scope than before (confirm export-gate wording and check for any grant/federal/nonprofit clause specifically, which the search pass found no evidence of either way) but not eliminated.

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
| AC-5 | Licensing confirmation — **corrected + practically closed, 26 Oct 2026, residual uncertainty flagged**: the gate is export ("publish" in Rive's own vocabulary), not audience; export already requires the paid plan WO-009's AC-7 holds regardless of who sees the result. No blocker found for this candidate WO's use case, but primary ToS/pricing pages were not directly readable this session (host not reachable) — recommend one human-performed direct check before NSF submission, not before Phase I build | Practically closed; one direct-read verification still recommended before submission, see risk #3 above |

**Known blocker inherited, not introduced here:** AC-4's actor-guard dependency (`ENG-475`) is itself currently blocked (package frozen, InterfaceType collision — per `RES-131`). This candidate WO does not need to wait on that resolution to produce AC-1–AC-3 as a demonstrable artifact; AC-4's governance binding can follow once ENG-475 unblocks. Worth sequencing explicitly so the NSF-facing artifact isn't gated on an unrelated package freeze.

**Forward note, not a Phase I concern:** AC-7's paid plan already covers export regardless of future scale. If licensing terms or pricing tiers change by the time this moves toward Phase II or any wider distribution, re-check then — but nothing here indicates a step-change gate tied specifically to "going public" the way the first draft of this doc assumed.

**What this candidate WO is not:** not a request to build a second Rive primitive, not a change to WO-009's scope, and not a claim that this satisfies PART-85's readiness gate by itself — only that it's the most concrete path to satisfying it that doesn't require new infrastructure.

---

## Recommendation

1. Treat this as a Candidate WO (same status FRM-47 already carries) rather than filing it as a new AC anywhere today.
2. Licensing is practically closed (AC-5) — no blocker found to naming Rive specifically in NSF-facing material for this Phase I use case, since export (Rive's real gate) is already paid for via AC-7. One direct read of Rive's actual ToS/pricing pages by a human is still worth doing before anything is formally submitted, as the final confirmation — cheap, not urgent, not a build blocker.
3. If PART-85 needs its "one working proof artifact" sooner than a full candidate-WO build cycle allows, AC-1–AC-3 alone (no Evidence Capture binding yet) is enough to demonstrate the scaffolding-rendering claim on its own.
