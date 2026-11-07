# Materialising the Triangle — Synthesis Against Prior Work

**Date:** 7 November 2026
**Source:** Google Doc `triangle-user-stories-v01.docx`, "STADIUM SOUNDWAVE | USER STORIES | v0.1" — user-supplied as the starting point for the USITT poster work.
**Status:** First-pass synthesis. 19 user stories across four points (PROOF MAKER, PROOF DRINKER, Martha's Swirly Eats, Assemble), each with an "AudioStory Architect" integration hook.

---

## What this document is

A user-story spec for a platform ("Assemble") hosting three related deployments:
- **PROOF MAKER** — a winemaker/estate operator trains a conversational AI on their terroir knowledge through normal seasonal work (no separate curriculum), and that training generates a navigable 3D terroir world guests can explore before tasting.
- **PROOF DRINKER** — a chef-accompanist facilitates live "Digital Salon" tasting sessions (Discord-hosted), capturing gesture and embodied knowledge via Ray-Ban POV capture, timestamped as named stops.
- **Martha's Swirly Eats** — the cultural-contribution/compensation layer (elder/community knowledge holders), already the subject of `SWIRLY_EATS_SYNTHESIS.md`.
- **Assemble** — the shared governance substrate (DC-01 through DC-28 modules) all three deployments configure against, with an "ARIA" governance agent and a "Foodie Globe" behavioral constraint on AI agents.

**AudioStory Architect** is a four-type voice-generation system wired into every story: PODCAST (two-voice dialogue), KEYNOTE (Sinek-style WHY→HOW→WHAT), MONOLOGUE (single-speaker), ANNOUNCEMENT (brief/authoritative, governance-only). Each type has a fixed voice (Kore, Puck, Fenrir, Zephyr, Charon respectively, with Fenrir/Puck/Zephyr/Charon used per-role).

---

## Confirms several things already found, with more concrete detail

- **The "Accompanist" principle is fuller here than anywhere else found so far.** US-AS-04's "Foodie Globe" constraint — *"never centre myself, always orbit and point toward the cultural authority"* — is a named behavioral parameter: agent outputs must reference the cultural authority at least once per exchange, can't exceed 3x the average human response length, can't initiate an un-introduced topic, can't override a declared sacred boundary. This is the actor-guard/Accompanist principle (already confirmed as independently arrived at three times — ENG-475, Sanity's Workflow model, OPS-147's Martha posture) with an actual enforcement spec, not just a name.
- **"Protocol Card" is in live use, not just a concept.** US-MS-01/02 both reference a "Protocol Card interface" for negotiating compensation and declaring consent state before a session begins — confirms `SWIRLY_EATS_SYNTHESIS.md` Theme 6's "fourth sighting of the shared primitive" (claim, steward, terms) as something actually built into an intake flow, not just a naming insight.
- **Walk-away now has the concrete spec Theme 1 said was missing.** `SWIRLY_EATS_SYNTHESIS.md` flagged "export/portability as a second mode alongside `WITHDRAW`" as absent from ENG-475. US-PM-03 and US-MS-03 both specify a named walk-away procedure with scope, a 48-hour timeframe, and named executing responsibility, plus a confirmation artifact. This is still recall/removal, not export — the export half Theme 1 named is still not present here either, worth carrying forward as still-open.
- **Commons-first economics, same shape as Theme 4.** US-MS-02's dual consent states (`commons_delivery: true` default, `commercial_opt_in: false` default, Ubuntu 70/20/10 on the commercial path) is the same model `SWIRLY_EATS_SYNTHESIS.md` Theme 4 described from the Ernest Mudimu document set — independent confirmation, not a new invention.

## One real tension, flagged rather than resolved

**"Red-list" and `sacred_boundary` are used here as live, active schema fields** (US-PM-02: *"estate can mark specific zones as `sacred_boundary: closed`"*; US-PM-03: *"Red-list items are never included in any derivative synthesis even after walk-away"*). `SWIRLY_EATS_SYNTHESIS.md` Theme 2 explicitly said to **retire** "red-listing" and "opaque archives" as vocabulary, translating forward to Transmission Terms' `steward`/`grantedFor` model instead — on the grounds that depth/classification scales put authority with the classifier rather than the steward.

**Resolved by operator ruling, 7 Nov 2026:** Transmission Terms is the current, governing model; Red-list is lineage — vocabulary that predates the redress, not a live alternative to it. This document's active use of `sacred_boundary`/Red-list fields should be read as the pre-redress layer this system is built on top of, not a competing current spec. Nothing in this document's user stories needs to change on that basis — the fields themselves (zone marking, synthesis exclusion) are real content to carry forward; the governing vocabulary around them is Transmission Terms' `steward`/`grantedFor`, not Red-list's classification-tier framing.

---

## Relevance to the USITT poster specifically

This is a stronger, more concrete source for "dining as theatre" than the abstracted Room-primitive framing used in the first draft:

- **AudioStory Architect's four experience types, each bound to a fixed voice and narrative function**, is literally a cast-and-scene-type system — not unlike a director's shot list or a radio-drama voice chart.
- **PROOF DRINKER's gesture capture** (*"hands pressing dough, seed bite gesture, tannin texture demonstration"* as *"named stops"*, timestamped, estate-reviewed) is blocking notation for a tasting session — the same discipline a stage manager applies to a performer's physical marks.
- **The chef-accompanist role itself**, facilitating a live multi-party session while structurally forbidden from dominating it (Foodie Globe), is a named theatrical role with an enforced performance constraint, not just a job title.

The poster abstract (`docs/USITT_POSTER_ABSTRACT_DRAFT.md`) should be revised to ground its claims in this material rather than the more abstract Room-primitive language — see that file for the update.

---

## Three entries — checked against Linear, 7 Nov 2026

User named three candidate regional "entries" (swim lanes for additional poster/involvement rationale). Checked each against real Linear issues rather than taken on description alone:

**1. US Virgin Islands + camera-tip gesture capture**
- **OPS-42** — "EPIC: Sound Clash Virgin Islands Expansion - Cultural Hospitality Lab Model" (Todo). Direct match for "Virgin Islands... Cultural Hospitality Lab."
- **OPS-37** — "[v0.app] Camera Tip Button Component - MoveSign Integration" (Todo), **OPS-32** — "v0.app UI build: Camera tip button + Ubuntu payment flow" (Todo), **OPS-149** — "MoveSign sovereignty layer integration spec — gesture capture → Dify handoff" (Backlog). Direct match for "camera tipper."
- **"HAR"** — no matching issue found under that term. Not guessed at; flag it directly if there's a specific reference meant, and I'll check again.

**2. New York — wine tasting room research**
- **OPS-64** — "NY Wine Research Grant Sprint (DEADLINE: Jan 16)" (Done).
- **OPS-133** — "Adapt OPS-66 match arc into New York wine guidebook edition" (Backlog).
- Direct match for "theoretical studies for better improvement within the wine tasting rooms."

**3. Vancouver/Okanagan — wine identity marketing**
- **PART-47** — "PART-25-B: BC Producer Cohort Identification (VanWineFest Pilot)" (Backlog-Unmapped).
- **PART-57** — "Destination BC Supplier Funnel – Strategic Orchestration" (Outreach Active).
- **RES-30** — "Enablement Blueprint: Destination BC 'Cultivating Experiences' → Vintage & Voice kit" (Useful pullout).
- **PART-25** — "WGBC + BC Tourism — BC Practitioner Participation Governance Layer" (In Progress).
- **OPS-60** — "BC/Okanagan Cross-Border Agreement" (Canceled — historical, not active).
- Direct match for "the appeal by the Vancouver Okanagan area with the marketing for identity around what's happening with their wines."

**All three are real, live tracks** (except the one explicitly Canceled OPS-60), each already a going concern independent of the USITT poster work — not invented to fit the poster, the poster fits an existing pattern across three regions.

## "Bard and cork" — checked, partial answer

Searched Linear for both terms separately.

**"Bard" is a well-established, real, recurring stem** — not a one-off: ENG-123 (BARD/HyperFrames audio-first substrate), RES-55 (Wine & Books Trend Scan → Bard Micro-Pilot), RES-48 (Bard narrative qualifier for wine heritage articulation), RES-52 (DACUM task map: RES vs. Bard vs. co-owned duties), RES-34 (Design Logo System — Bard Theme, Superseded). Confirms what OPS-147 itself already said: Bard supplies the literary/interpretive stem to this whole corridor of work.

**"Cork" returned nothing wine-related** — the search surfaced only loosely-matched camera-tip/gesture content, no issue, document, or project actually named "Cork" or combining it with "Bard." If "Bard and Cork" is meant as a paired name (literary + wine, matching this engagement's existing literary/wine-fusion throughline), it doesn't exist yet in this workspace under that name — worth confirming what was meant before assuming it's an existing reference I missed.

**Answered directly, 7 Nov 2026 — this is why "Cork" found nothing: it's new, not missed.** "Bard and Cork" is the user's own name for **the dramaturgy of wine-varietal presentation** — just now crystallized, not an existing issue to retrieve. Two things place it precisely, not loosely, against what's already established:

- **It rides the earbud/audio-augmentation rail** — this is RES-49 ("Voice direction guidelines: high-fidelity audio for theatre of the mind") and the Triangle doc's AudioStory Architect system (PODCAST/KEYNOTE/MONOLOGUE/ANNOUNCEMENT, each a fixed voice and function) read as one thing: a dramaturgy, not a feature list. Bard and Cork names what those pieces are *for*.
- **It lives under the TOTM canopy, explicitly.** OPS-179 already names **Theatre of the Mind (TOTM)** as "the fenceless museum," a named lever beside PLAC and BARD — so "Bard and Cork" sitting inside TOTM's canopy isn't a new hierarchy, it's locating a specific dramaturgical practice (wine-varietal presentation) within a structure that already has a place for it.

**Correction, 7 Nov 2026 — these are not the same thesis, and should not be merged.** User clarified directly: "Kitchen as Stage" / sound bites is the **foodways** framing (dining and kitchen generally — the current USITT poster angle). **"Bard and Cork" is a separate, narrower lane: viticulture specifically, at public gathering, as literacy edutainment** — the wine-and-books fusion RES-55 names directly ("Wine & Books Trend Scan → Bard Micro-Pilot"). Two parallel framings under the same TOTM canopy, not one thesis with two names. The poster abstract stays as "The Kitchen as Stage" / foodways — **not** retitled to Bard and Cork, which withdraws the suggestion two paragraphs up. Bard and Cork is its own lane, with **RES-55 named as its landscape document** — not yet read directly this session (Linear down on this retry); read it the moment the connector's back before saying more about what that lane actually covers.

### Overlooked, named directly: USVI, HAR, and NYWGF are also their own distinct lanes

Flagged by the user as missed — the "three entries" write-up above treated USVI, New York, and BC/Okanagan as three flattened matches against existing issues, the same error "Kitchen as Stage vs. Bard and Cork" almost repeated: **each of these is plausibly its own lane with its own rationale, not an interchangeable instance of one generic "regional entry" pattern.** Specifically, still unresolved:

- **"HAR"** — not found under that exact term in two search passes. Could be an acronym, a mis-transcription, or a reference to something not yet in Linear at all. Needs the user's clarification or a direct Linear lookup once reachable — not guessed at.
- **NYWGF** — the actual entity (New York Wine & Grape Foundation) was seen only as a named "Anchor corridor participant" inside OPS-57's description, never looked up as its own thing. OPS-64/OPS-133 (NY Wine Research Grant Sprint, NY wine guidebook) are adjacent work, not necessarily NYWGF's own landscape document — same gap RES-55 fills for Bard and Cork, not yet found for this lane.
- **USVI** — OPS-42 was named as the match, but not read in full; whether it functions as USVI's own "landscape" document (the way RES-55 does for Bard and Cork) or is just one adjacent issue among several hasn't been checked.

**Queued, not guessed at:** read OPS-42 in full, search specifically for an NYWGF-named issue or document, and ask the user directly what "HAR" refers to — once Linear reconnects.

### Resolved, 7 Nov 2026 — RES-55, OPS-42 read in full; one correction to a prior finding

**RES-55 confirmed as Bard and Cork's real landscape document**, and it's richer than expected. It's a trend-research issue ("Wine & Books Trend Scan → Bard Micro-Pilot") with five ranked market signals: Wine-as-Memoir (book-launch activations), NA Wine Curiosity, Terroir↔Ecology (anchored on the 2017 smoke vintage — "what does wine remember about what happened to the land"), **Literary Festivals + Embodied Experience** (names **Bard on the Beach**, a real Vancouver festival, as the direct partnership target — "What Does Wine Remember?" as the pitched session), and Wine Tourism + Authenticity Gap. This is concrete, not aspirational — phased execution plan, named next actions, named success metrics (NPS ≥7.5, attendance targets). Bard and Cork isn't a concept needing to be invented; it's naming something RES-55 already scoped.

**OPS-42, read in full, corrects the earlier "three wine entries" framing — USVI isn't a wine lane at all.** OPS-42 ("Sound Clash Virgin Islands Expansion - Cultural Hospitality Lab Model") is a reggae/calypso cultural-hospitality program — Quelbe tradition preservation, emancipation/carnival heritage, hotel-dormancy activation via live music "clash" events, digital scavenger hunts, a mobile "Heritage Box" lobby experience. **No wine content anywhere in it.** It shares the *hospitality-dormancy-activation* economic shape with the NY/BC wine lanes (fill off-season capacity with cultural programming), but it's a parallel vertical, not a third instance of the same wine-identity pattern. My earlier "three entries" framing should be corrected: USVI is a different cultural-hospitality lane (music/heritage) that happens to use the same business model, not a wine lane alongside NY and BC/Okanagan.

**Correction to a prior finding, same document:** OPS-42 uses **"IGNIS-ADAPT sovereignty protocols"** as a real, named governance mechanism ("Governance: IGNIS-ADAPT sovereignty protocols"). Two turns' worth of work ago, the Perplexity-sourced "Swirly Meme and Visual Language" brief was flagged (`TRACKER_UPDATES_PENDING.md`, carried into `DACUM_GESTURE_SYNTHESIS.md` §10) as likely fabricated in part because "IGNIS-ADAPT Protocol" didn't match anything found anywhere in this workspace. **That specific claim was wrong — IGNIS-ADAPT is real, it's just in OPS-42, not anywhere checked at the time.** The rest of that assessment likely still stands (the brief's citations were still generic Linear-API/HR-PDF links, and `HeritageToken`/`IntegrationToken` minting with no steward check still isn't grounded here either), but the specific "IGNIS-ADAPT is invented" claim should be retracted, not left standing uncorrected.

**NYWGF still not found as its own entity.** Additional search surfaced OPS-53 ("Viticulture Conference Band Orchestrator"), OPS-89 ("Kinetic Scavenger Hunt — Oral-Kinetic × Waypoint"), and **OPS-83** ("Seattle SmartVenture Program — Wine and Digital Literature Surface") — the last one worth flagging as possibly Bard-and-Cork-adjacent (wine + literature, again) and not yet checked. NYWGF itself remains only a named participant inside OPS-57's description, not its own tracked issue or document — if there's a reason to believe it should be, that would need a direct ask rather than another search pass.

**"HAR" still unresolved** — not found under that term across three search passes now. Needs direct clarification.
