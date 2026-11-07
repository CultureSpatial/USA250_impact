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

## Correction, 26 Oct 2026 — this was framed around the wrong NSF program alone

Everything above and below was written against **PART-85 (NSF SBIR Phase I)** as the sole trigger. That's an incomplete frame, and the gap matters because of what this artifact actually is, not just where it gets cited.

`FUNDING_PATHWAYS_UPDATED.md` (v2.1, Aug 2026) already corrected this exact category of program-fit error once, for the whole Guild Academy/SCID line, not just this artifact: it explicitly names **NSF ATE (Advanced Technological Education)** as the *better-fitting* program for DACUM/SCID vocational-technician work — "Skilled technical workforce (exactly Guild Academy)," "Community colleges + industry partnerships," "Curriculum/materials development — SCID competency schemas, mobile-first training materials" — and frames SBIR as the separate, parallel company-commercialization angle (validation study, Blaze/GMI Cloud alliance), not a substitute. Both are live Tier 2 pathways in that doc, pursued differently, not one superseding the other.

Two issues already exist that this candidate WO should have cited and didn't:
- **PART-139** — "NSF ATE institutional routing — who holds the accounting?" South Seattle College's PNW Wine Education Collaborative as lead applicant vs. us as lead, open and unresolved (Phase 0 per `CROSS_TEAM_OPERATING_PLAN.md`). This determines who this artifact's induction-mode demo is actually produced *for* — a subawardee's proof artifact for the lead institution's ATE application reads differently than a company's own SBIR validation artifact.
- **PART-98** — "DACUM Competency Mapping — Culinary & Wine Steward Micro-Credential." This is the **real DACUM duty map already in flight** for exactly the South Seattle College channel this Candidate WO cites: D1 Terroir Narrative Design, D2 Digital Spatial Navigation, D3 Culinary & Wine Stewardship, D4 Compliance & Guest Protection, D5 Pop-Up Event Hosting. "DACUM-mapped competency" in this doc's OBJECTIVE row was written generically, as if the competency still needed choosing. It doesn't — PART-98's D1–D5 is the concrete candidate.

**Update, 27 Oct 2026 — FRM-48 has since named the duty and surfaced a bigger caveat.** The pedagogical content described (pour technique, tasting-note vocabulary) already maps to **D3 (Culinary & Wine Stewardship)** specifically — proposed on PART-98 for owner confirmation, no longer a genuinely open choice among five. More importantly, **this artifact is not the org's canonical DACUM home.** A separate, already in-progress, Urgent/High-priority production track exists — `DacumViewModel` + 11 artboards (ENG-418–422), with `CompetencyAtlas` (ENG-419) purpose-built for DACUM duty/task navigation. This Candidate WO's AC-1/AC-2 reuse WO-009's commerce `VesselData` contract deliberately, as a **Phase-I-speed tradeoff** to get an NSF demonstrable fast without waiting on that cluster — a legitimate choice, but one that must be stated explicitly wherever this artifact is described, including in any eventual NSF-facing narrative (AC-TBD below, "the actual CEP-routed content deliverable"). Citing this lookup table as if it were the production competency system, rather than a fast parallel path, would overstate what it is in a federal submission.

**Corrected positioning:** the artifact serves both tracks without forking — it's one `.riv`/`VesselData` primitive in induction mode either way. But it should be named, from the start, as potentially **the ATE-track's own curriculum/materials deliverable** (PART-139's institution being the one that benefits most directly, since ATE explicitly funds "curriculum/materials development"), with the SBIR framing (PART-85, Rive-as-substrate, this doc's own non-negotiable line above) as the secondary, commercialization-facing use of the same build. Whoever picks up COR-43 should resolve with PART-139's owner which program this artifact is actually being produced to serve before assuming PART-85 is the only audience — the answer changes who the "one working proof artifact" needs to look legible to.

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
| TRIGGER | Dual: (1) NSF SBIR Phase I (PART-85) needs "one working proof artifact" — the named Phase 1 readiness exit criterion in `CROSS_TEAM_OPERATING_PLAN.md`, currently unmet; (2) NSF ATE's "curriculum/materials development" priority (`FUNDING_PATHWAYS_UPDATED.md`), where PART-139's institutional-routing question (SSC/PNW Collaborative as lead vs. us) decides who this artifact is actually produced for. Which trigger is primary is **open — see correction above**, not assumed to be (1) |
| PREMISE | AC-1's `glass-swirl.riv` / `VesselData` primitive is reused in induction mode, not rebuilt — **explicitly as a Phase-I-speed artifact on the commerce surface, not the org's canonical DACUM home.** A separate, already in-progress, Urgent/High-priority production track exists (`DacumViewModel` + 11 artboards, ENG-418–422, with `CompetencyAtlas`/ENG-419 purpose-built for DACUM duty/task navigation) — this primitive does not supersede or consolidate with it. One `.riv`, one contract, a second lookup table (pedagogical cues keyed to a real DACUM duty, not commerce liquid parameters), selected by mode — per `WO009_PRESENTATION_LAYER_CONTRIBUTION.md` §4 |
| OBJECTIVE | A demonstrable, RML-auditable artifact rendering SCID's Guided → Assisted → Autonomous scaffolding against **PART-98's D3 (Culinary & Wine Stewardship)** — proposed and content-matched (pour technique, tasting-note vocabulary), pending PART-98 owner confirmation rather than genuinely open among all five duties — matching the South Seattle College PNW Wine Education Collaborative channel already established in `FUNDING_PATHWAYS_UPDATED.md` |

**Candidate acceptance criteria (draft, not filed):**

| AC | Description | Depends on |
|---|---|---|
| AC-1 | Second `contentCategory`-keyed lookup table on existing `VesselData` ViewModel: pedagogical cues keyed to **PART-98's D3 (Culinary & Wine Stewardship — pour technique, tasting-note vocabulary prompts)**, proposed and content-matched, pending PART-98 owner's confirmation. **Explicit non-goal, stated plainly:** no new `.riv` primitive; this is a Phase-I-speed reuse of the commerce surface, not a claim that `VesselData` is where DACUM content canonically lives — ENG-418–422's `DacumViewModel`/`CompetencyAtlas` is the production track for that | WO-009 AC-1 (consumes, does not fork); PART-98 (duty-map source) |
| AC-2 | Mode flag selecting commerce vs. induction lookup table on the same artboard. **Validate against the current Rive web runtime (`@rive-app/canvas` ^4.16.1)** before this reaches Discord (WO-009 AC-9) or Reddit/Devvit (AC-12) — FRM-30's data-binding concern on sandboxed webviews was raised and then walked back as tested on a different, older runtime (2.39.0), so it's a direct-test item, not an inherited blocker | AC-1 above |
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
4. Confirm D3 with PART-98's owner (proposed, not yet locked), and resolve with PART-139's owner whether ATE (SSC/Collaborative-led) or SBIR (PART-85) is the primary audience for this artifact — both can be served by one build, but the demo's framing differs by which is primary.
5. **New, 27 Oct 2026, from FRM-48's own thread:** state explicitly, in any NSF-facing material this artifact feeds, that it is a Phase-I-speed reuse of WO-009's commerce surface — **not** the org's production DACUM competency system (that's ENG-418–422's `DacumViewModel`/`CompetencyAtlas`, already in progress at Urgent/High priority). Omitting this caveat risks an NSF narrative overstating a fast parallel path as the real infrastructure.
