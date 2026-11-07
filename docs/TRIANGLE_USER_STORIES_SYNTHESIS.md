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

This document is a *different* part of the same broader system, and it's not clear which is newer or which should govern. Not resolved here — worth checking dates/authorship against `AXIS_4_REDRESS.md`'s original redress before assuming either vocabulary should yield to the other.

---

## Relevance to the USITT poster specifically

This is a stronger, more concrete source for "dining as theatre" than the abstracted Room-primitive framing used in the first draft:

- **AudioStory Architect's four experience types, each bound to a fixed voice and narrative function**, is literally a cast-and-scene-type system — not unlike a director's shot list or a radio-drama voice chart.
- **PROOF DRINKER's gesture capture** (*"hands pressing dough, seed bite gesture, tannin texture demonstration"* as *"named stops"*, timestamped, estate-reviewed) is blocking notation for a tasting session — the same discipline a stage manager applies to a performer's physical marks.
- **The chef-accompanist role itself**, facilitating a live multi-party session while structurally forbidden from dominating it (Foodie Globe), is a named theatrical role with an enforced performance constraint, not just a job title.

The poster abstract (`docs/USITT_POSTER_ABSTRACT_DRAFT.md`) should be revised to ground its claims in this material rather than the more abstract Room-primitive language — see that file for the update.
