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

### Resolved, 7 Nov 2026 — Google Drive search finds both, and corrects how USVI should be framed

User's instinct to check Drive, not just Linear, was right — both were sitting in documents never indexed in Linear search.

**Correction — "HAR" is a standard technical term, Human Activity Recognition, not a project codename.** HAR is the established field: sensor/camera-based classification of physical movement and gesture. This re-reads HOW-178's title correctly: **"HAR Dance Epistemology"** is Human Activity Recognition *applied to* dance epistemology (the Elder + Apprentice archetype), not an opaque internal name — and it explains exactly why that issue names a "shared MediaPipe stack" (MediaPipe is a real, widely-used pose/gesture-tracking library, the standard substrate for doing HAR). Found in `okrf-001-v03.docx` ("Oral-Kinetic Research Framework," Stadium Soundwave v0.2) — a pattern-library seed document naming a **kernel-and-domain-skins structure**: one portable method kernel (knowledge transmission through simultaneous oral narrative + embodied movement) expressed as different "skins" per domain, with **HAR as the underlying technical discipline all the skins sit on**, not one skin among equals. The linked-issues table names the skins: **HOW-178 HAR Dance Epistemology** (Elder + Apprentice pair archetype), **HOW-191 Sound Clash USVI** (carnival oral-kinetic), and **HOW-72** naming **PROOF DRINKER as the reference implementation** of the same kernel.

**This reframes the user's original phrase once more, more precisely.** "Virgin Islands, HAR, with a camera tipper" names three layers, not three parallel things: USVI is a **cultural domain** (Caribbean carnival), HAR is the **technical discipline** (gesture/activity recognition) the domain-skin pattern runs on, and "camera tipper" is the **specific product implementation** (OPS-37's camera-tip button) built on that discipline. Worth noting HAR as a field has its own academic/conference literature entirely separate from USITT — a possible fourth, distinct venue angle (sensor/HCI research, not theatre technology) if this gesture-capture work is ever written up on its technical merits rather than its dramaturgical ones.

**This corrects, more precisely than the last turn's correction, how USVI should be read.** It's not "USVI is an unrelated vertical that happens to share a business model" — it's one of (at least) three named **domain skins of the same oral-kinetic kernel**: USVI/Sound Clash (Caribbean carnival), HAR (dance, Elder+Apprentice), and PROOF DRINKER (wine tasting, already the subject of this whole document). The user's original phrase — "Virgin Islands, HAR, with a camera tipper" — now reads exactly right: three things under one framework, with camera-tip/gesture capture (MediaPipe) as the shared capture substrate across all three skins. **Worth naming as another independent sighting of the kit pattern** (one kernel, swappable domain-skin axis) already flagged multiple times elsewhere in this engagement.

**NYWGF is real, live, and far more concrete than "adjacent work."** Found the actual submission: `Sub NYwsg.docx` / `NYWGF_PROOF_DRINKER_Budget.xlsx` — a **$100,000 research proposal submitted to the New York Wine & Grape Foundation Research Program, FY 2026-27**, titled *"PROOF DRINKER: Heritage Commerce for New Demographics — A Media-Led Market Education & Experience Activation Pilot."* Principal Experiential Designer: Chef Martha. Co-Collaborator: Kudzi Mudimu, Spatial Studio. Category: Business Development. Tests a narrative-positioning strategy for NY wines targeting Gen Z/Millennial consumers via a cannabis→wine translation throughline (terpenes/strain-lineage language mapped onto wine chemistry/storytelling) — plus an actual pitch script ("Hello, I'm Chef Martha...") and a video asset. **A live shared folder — "NYWGF Research 27-28," owned by `nywgf1@gmail.com` — was last modified 2026-11-06, yesterday relative to today.** This is an active, ongoing collaboration with the real foundation, not a filed-and-forgotten application. "NYwsg" in the user's phrasing turns out to be the literal filename abbreviation used in this workspace's own docs, not a typo of NYWGF — both point at the same real thing.

**One adjacent-but-distinct thread surfaced, not yet reconciled with Bard and Cork:** `VanWineFest_MoU_2027_Spatial_Studio.docx` — a real Memorandum of Understanding between the Vancouver International Wine Festival Society and Spatial Studio for 2027. This is **not** the same as RES-55's Bard on the Beach target — both are Vancouver-based, both wine/culture institutions, but they're two separate partnership threads under the same BC/Okanagan lane. Worth keeping distinct rather than assuming either stands in for the other.

---

## Staged, 7 Nov 2026 — Linear updates + CUL team ownership check

**Asked:** push the accumulated corrections into Linear, and check which CUL team could hold all the poster work. Linear is down on this retry — staged below, fires once reachable.

**Planned Linear updates (one comment per issue, correcting/cross-linking):**
- **RES-55** — comment noting it's confirmed as Bard and Cork's landscape document, now cited from this workspace's local synthesis.
- **OPS-42** — comment correcting/refining the earlier "unrelated vertical" read: it's one domain skin of OKRF-001's shared oral-kinetic kernel, sibling to PROOF DRINKER, not standalone.
- **HOW-178** — comment confirming HAR = Human Activity Recognition (not a codename), and cross-linking to OPS-42/the wine work as sibling domain skins.
- **A new NYWGF-adjacent issue, if none exists** — the live $100K NY Wine & Grape Foundation collaboration (`Sub NYwsg.docx`) has no Linear issue at all currently, only Drive documents. Worth creating one so it's tracked alongside everything else, rather than leaving a live, actively-updated external relationship untracked in the system of record.

**CUL team ownership check — not yet run.** `list_teams` for "CUL"/"Cultural" once reachable, to see whether a single Cultural Governance-family team (CUL-87 already sits on "Cultural Governance") could reasonably hold the whole poster effort — Kitchen as Stage, Bard and Cork, and the OKRF-001 kernel/skins material — under one roof, rather than scattered across COR/RES/OPS/HOW as it currently is.

**Resolved — "xAI" was a mis-transcription, not a reference to Elon Musk's company.** User confirmed directly: "xAI circles" meant the **AI + sports + dance research circles** the HAR explanation covers — movement computing, sports analytics, somatic-computing venues (e.g. MOCO, the International Conference on Movement and Computing), not xAI the company. **The fourth angle, now named precisely:** HAR/movement-computing research venues, pitched on the technical merits of this engagement's gesture-capture work (PROOF DRINKER's embodied-knowledge framing, closer to dance/somatic-HAR than sports-performance-HAR) — a genuinely different audience from USITT's theatre-technology community, not a variant of it.

### Cheerleading as the fourth angle's sharpest example — and a parallel to K-pop

**Cheerleading sits precisely at the sports/dance intersection HAR research cares about**: it's a judged sport (synchrony and execution scored against technical rubrics — literally a motion-quality-classification problem) and a genuine dance discipline (choreographed, team-synchronized, performative). It also carries real research funding weight for a concrete reason: cheerleading has the highest rate of catastrophic injury among female youth sports in the US, which has driven a real body of biomechanics/injury-epidemiology literature — meaning actual funding and publication appetite exists here, not just theoretical interest.

**A real lead already in this workspace, not yet read:** **HOW-8, "CheerSquad Gaming League,"** surfaced earlier in a Drive search ("Quest → Story Gem → Voice Message" — the same Moment+Mood→Audio Story mechanic as USVI Sound Clash and PROOF DRINKER). Queued, not guessed at.

**The K-pop parallel, offered as analysis, not yet grounded against anything found in this workspace:**
- Both are **synchronized-group-as-the-unit genres** — precision-in-unison is the valued achievement, not individual virtuosity (the opposite of most Western sport/dance culture's soloist framing).
- Both are **camera-native choreography** — built to be watched mediated, not live (K-pop's formation-angle practice videos and fancams; cheer's competition-broadcast framing and the stunt "money shot") — the same underlying HAR problem (formation/pose tracking, individual-identification-within-group-movement) as this workspace's own camera-capture work, not just an analogy.
- Both have **distributed labor serving one visible peak** — cheer's bases/spotters supporting a flyer; K-pop's line/center system — structurally identical logic, different vocabulary.
- Both are the **industrialized end** of the HAR-relevant movement spectrum (codified training pipelines, institutional backing) — worth naming as the explicit opposite pole from HOW-178's Elder+Apprentice dance epistemology (informal, lineage-based transmission). Same technical substrate, opposite cultural register — a real spread to show if this gets pitched as one body of work.

**Staged, not yet done:** read **RES-16** directly and fold its actual content into this analysis, rather than let the K-pop parallel stand as my own unsourced reasoning. Linear down on two retries this turn — queued for reconnection.
