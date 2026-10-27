# WO-009 — Presentation Layer Contribution, AC-13 Fallback, AC-1 Elaboration, EDU/DACUM Forward-Link

**Date:** 26–27 October 2026
**Status:** Posted, and merged into WO-009's own page body (not just comment/child-page). Published as a child page under WO-009 (Confluence 192774145), with a short reply pointer on footer comment 192380929 (comment 192806913). AC-13 and AC-1's own cells on WO-009 (147390466, now version 9) carry a fallback-clause note and an elaboration pointer respectively, plus a new 2026-10-27 AGENT_LOG entry — matching the page's own house style for prior revisions (e.g. "AC-9 | Corrected 2026-10-25") rather than leaving the content comment-only. Content includes both the 26 Oct (ATE/PART-98) and 27 Oct (D3/ENG-418–422) corrections.
**Caveat:** AC-1's elaboration below reads from WO-009's own Confluence description of AC-1, not from FRM-23 (its canonical Linear tracker) directly. Flag anything here that conflicts with FRM-23's actual text if it's ever checked directly.

---

## 1. The presentation layer, as it's currently defined, given to WO-009

This engagement's Layer 4 (Runtime Presentation, `STRATEGIC_FRAMEWORK.md`) names three presentation styles. Giving WO-009 the actual framing, not just the Rive-specific slice of it:

| Style | Mechanism | Role in WO-009 |
|---|---|---|
| **Rive 2D + CSS tokens** | `emotionTokenMap.ts`, state-machine-driven artboards | **The constant.** Every WO-009 surface — `glass-swirl`, PriceTag, OfferPanel, WineStoriesFrame, WineFeedCard, VideoOverlay — is a Rive 2D artboard. This layer is never swapped out; it's the base every deployment runs on. |
| **Premium/volumetric tier** | ActiveFrame/Rootcheck (ENG-500–503, ENG-92, ENG-417) **or** Rive's own GPU Canvas | **The swappable axis.** Sits on top of the Rive 2D base; which compositor runs it is the interchangeable part. |
| **Supersplat + TRELLIS** | Photoreal reconstruction | Not currently in WO-009's scope (no field documentation / environmental use case here) — named for completeness, not proposed as relevant to this WO. |

**The probability claim, stated precisely:** because Rive 2D is the artboard substrate for all of AC-1 through AC-4, **every deployment of WO-009's premium tier runs in conjunction with Rive by construction** — Rive is never replaced, only added to. The open question was never "Rive or not." It's which compositor sits on top of it, and that's exactly a swappable axis in RES-131's sense ("one contract, independently swappable axes") — the contract here is the Rive artboard + `VesselData` ViewModel; the axis is the premium-tier renderer.

This also means AC-13 and AC-1 aren't separate concerns — AC-13 is a layer *on* AC-1's primitive, not a parallel build.

---

## 2. GPU Canvas as AC-13's fallback, not a competing proposal

**Corrected framing from the prior turn.** AC-13's primary path (ActiveFrame/Rootcheck, consuming ENG-500–503/ENG-92/ENG-417) is right as specified — it reuses infrastructure that's already tracked and already established the Universal/Premium tier split in the PLAC architecture. No competing path proposed against it.

**Proposed addition to AC-13 — a named fallback clause:**

> If the ActiveFrame/Rootcheck binding is unavailable or blocked for a given surface or deployment target, bind **Rive's native GPU Canvas** (`enableGPUCanvas` flag, requires `@rive-app/webgl2` 2.42+) directly on the same artboard instead. Same goal — the Universal/Premium tier split — different compositor, invoked only when the primary path can't be.

**Why this is a legitimate fallback and not a second build track:**

- It stays inside the Rive file — no new authoring surface beyond what AC-1 through AC-12 already use (`Agent (Rive MCP)`), and it's RML/CLI-compatible (see AC-1 elaboration below), so it doesn't fork the project's agentic authoring workflow the way adopting a wholly separate 3D pipeline would.
- Its known limitation is already named plainly: GPU Canvas is editor-ready but the vendor's own documentation says runtimes are "still catching up" — which is exactly the shape of thing a *fallback* is allowed to be weaker on, where a *primary* path isn't.
- It costs nothing to specify now and nothing to build until invoked — it's a documented contingency, not parallel work in progress.

---

## 3. AC-1 elaboration

AC-1 (`glass-swirl.riv` / `VesselData`) has already been revised twice: the original `WineData` ViewModel (region/varietal/cityId/seasonLabel) was generalized to `VesselData` with an open `contentCategory` field and a category-keyed lookup table, modeled explicitly on `CorridorAtmosphere`'s `cityRegister` TARGETS pattern (FRM-28). Glass geometry itself stayed fixed by deliberate choice.

**Three things worth adding:**

**a) AC-1 is already a working instance of RES-131's "kit" pattern — worth naming as precedent, not just consuming doctrine.** One contract (the `VesselData` ViewModel), one swappable axis (the per-`contentCategory` lookup table), one fixed element (glass geometry, explicitly out of scope). That's the exact shape RES-131 is trying to generalize for co-sign elsewhere, via FRM-30's glass-kit. AC-1 is a *second* real instance of the same discipline succeeding, independently, in a completely different domain (commerce primitive, not consent). Worth surfacing to whoever's tracking RES-131/FRM-30 as corroborating evidence — three independent arrivals at the same shape is the kind of thing that pattern-document explicitly looks for.

**b) RML/CLI as the authoring discipline for the next revision.** AC-1 has been revised twice by an agent (`Agent (Rive MCP)`), and the lookup-table structure is exactly the kind of thing that benefits from being diffable text rather than inferred from Rive Desktop GUI state plus AGENT_LOG prose. If a third revision happens — a new content category, or the vessel-geometry question AC-1's own text flags as "a possible future AC" — recommend authoring that revision via RML/CLI so the lookup table's structure is reviewable as a diff, not reconstructed from narrative.

**c) Dual-purpose hook for the upcoming EDU/DACUM AC (see §4).** Because `contentCategory` is already open-ended rather than a locked enum, `glass-swirl.riv` is a plausible rendering primitive for an induction/education surface, not only the shoppable surface it's built for today — same `.riv`, same `VesselData` contract, a second lookup table keyed to pedagogical content instead of commerce parameters, selected by mode rather than built as a separate artboard. Flagged here so AC-1 is positioned for that reuse before the EDU AC is written, not retrofitted after.

---

## 4. Forward-link — the upcoming EDU/DACUM-directional AC, dual purpose as product and induction

This engagement already has the doctrine this upcoming AC would plug into: `SCID_ARCHITECTURE.md`'s four-layer model — Competency Schema (ATProto records, DACUM-derived duties/tasks), Scaffolded Execution (mobile-first PBL in three phases: Guided → Assisted → Autonomous), Evidence Capture, Credential Issuance — plus `SWIRLY_EATS_SYNTHESIS.md`'s "Locale Storyteller" micro-credential recommendation, which already proposed routing staff training through SCID/ATProto VC issuance rather than a bespoke credentialing system.

**The dual-purpose framing, made concrete against AC-1 specifically:**

| Mode | What `glass-swirl.riv` renders | Lookup table content | Governs |
|---|---|---|---|
| **Product** (current) | Shoppable commerce surface — Wine Flies Free, FIFA social surfaces | Liquid color/viscosity/pour-speed per `contentCategory` | AC-1 as specified |
| **Induction** (upcoming) | DACUM task-analysis walkthrough against PART-98's **D3 (Culinary & Wine Stewardship)** — proposed and content-matched, pending PART-98 owner confirmation | Pedagogical cues per competency stage, same `contentCategory` axis repurposed | FRM-48 / COR-43, filed 26 Oct 2026 |

One primitive, one contract, two lookup tables selected by mode — not two builds. The EDU/DACUM AC has since been filed, not just forward-flagged: **FRM-48** (Form) carries the design (second lookup table + mode flag on this same `VesselData` contract) and **COR-43** (Corridor) coordinates it as the NSF-facing deliverable. Credential issuance on completion should route through SCID's ATProto VC path, consistent with the Swirly Eats recommendation, not a parallel induction-tracking system.

**Correction, 26 Oct 2026, after this was first written:** the generic "competency stage" language above understated what's already real. PART-98 already carries the actual DACUM duty map (D1–D5) for the South Seattle College channel this induction mode targets. And the audience isn't only PART-85 (NSF SBIR) as first assumed: `FUNDING_PATHWAYS_UPDATED.md` names NSF **ATE** as the better-fitting program for exactly this kind of curriculum/materials deliverable, with PART-139 (SSC/PNW Collaborative as lead applicant vs. us) the open question deciding who this artifact is actually produced for.

**Second correction, 27 Oct 2026, from FRM-48's own thread.** Two things settled since the correction above: (1) the duty is D3 specifically, not an open pick among five — the lookup content (pour technique, tasting-note vocabulary) already matches it. (2) More importantly: **this induction mode is explicitly not the org's canonical DACUM home.** A separate, already in-progress, Urgent/High-priority production track — `DacumViewModel` + 11 artboards (ENG-418–422), with `CompetencyAtlas` (ENG-419) purpose-built for DACUM duty/task navigation — already exists for this content. Reusing `glass-swirl`/`VesselData` here is a deliberate **Phase-I-speed tradeoff** (ship an NSF demonstrable fast on a live artifact, rather than wait on that cluster), not a claim that this is where DACUM content belongs long-term. That tradeoff needs to be stated plainly in any NSF-facing material this feeds, not left implicit. Full detail: `docs/NSF_RIVE_VIABILITY_AND_CANDIDATE_WO.md`.

**This is forward-positioning, not a claim the AC's scope is settled.** AC-1 itself, as specified, doesn't need to change to support the induction mode — that part holds. Which NSF program is primary (ATE vs. SBIR) is still open, pending PART-139's owner.

---

## Posting plan — executed

Posted as a child Confluence page under WO-009 (147390466): [page 192774145](https://interest-time-happiness.atlassian.net/wiki/spaces/ikb/pages/192774145/WO-009+Presentation+Layer+AC-13+Fallback+AC-1+Elaboration+EDU+DACUM+Forward-Link), with a short reply pointer on footer comment 192380929 (comment 192806913), 27 Oct 2026.
