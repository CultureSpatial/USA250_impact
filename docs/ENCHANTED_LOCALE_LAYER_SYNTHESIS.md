# Enchanted Locale Layer — Synthesis & Salvage

**Date:** 24 October 2026
**Source:** "How to fold the 'Enchanted Locale Layer' into the v2 Human-Experience Playbook" (Human_Experience_Playbook_v2.md, Human-Experience-Playbook-Revised.tsx, Jira HOW-221–225)
**Status:** First-pass synthesis. Connectors reconnected under new names this turn (`Atlassian_MCP`, `Linear` replacing the prior `Atlassian`/`Linear-941466c9` tool namespaces) — not yet exercised; HOW-### cross-reference below is a flag to verify, not a confirmed fact.

---

## The headline finding

**This document is written one layer above the machinery that already exists to run it — and in one place, against machinery that no longer exists.** Almost every "new functional element" it proposes building has a real, already-specified counterpart elsewhere in this engagement. The highest-value move here isn't engineering the Enchanted Locale Layer from scratch; it's **wiring this plan into the GrammarActor / Transmission Terms / token-ledger substrate that's already been built**, which would turn most of the P0/P1 tasks from new systems into integration work.

One correction matters more than the rest and should be made before anything else in this plan gets built against it.

---

## The correction that has to happen first

**"Campfire" is named in this document as a live, current system — Phase 2 is literally titled "Gathering / Campfire Live."**

RES-121 (the fire-runtime crosswalk this entire engagement has treated as authoritative) is explicit on this point: *"GSBF-54 was written against the Discord Activities SDK + Campfire product shape (Growth Circle / May 24 broadcast era). **That runtime is deprecated.** The current production collective layer is PartyKit Terroir + grammar events + mediabunny/ams-host render dispatch."*

This is the same shape of error as Postiz-in-an-API-contract and CIP-depth surviving in CEP-29's description after the Axis 4 redress: a still-circulating document using a name for a system that's been replaced. **"Campfire Live" should be read as PartyKit Terroir + GrammarActor**, not as a separate thing to build or integrate with. Everywhere this document says "Campfire," substitute the grammar event layer. This matters immediately because Phase 2's AR unlock logic needs to attach to the *real* runtime, not a deprecated one — see below.

---

## Phase-by-phase: what already exists underneath this

### Phase 1 — Invitation / Pre-Session

**"Blueprint's Locale Story-Anchor Scan"** and **"ACL prepares atmosphere"** map onto two different states of readiness, and it matters which:

- The Story-Anchor Registry's proposed fields (GPS/image marker, lore snippet, **consent flags**, revenue-sharing ratio) are **Transmission Terms with the serial numbers filed off.** "Consent flags" is exactly the placeholder `AXIS_4_REDRESS.md` replaced with `steward` + `grantedFor[]` + `conditions[]`. **HOW-221 should not invent a new consent model** — it should use the `TransmissionTerms` type directly, per locale object instead of per packet. This is a smaller spec than currently scoped, not a larger one.
- **"ACL prepares atmosphere" may be assuming infrastructure that isn't built yet.** RES-121 §02 lists "Room Atmosphere — Persistent sensory identity" explicitly under **NOT RUNTIME — DESIGN-GATED**, blocked on FRM-12. If ACL is a different, already-live system, fine — but if "atmosphere" here means the same thing RES-121 flagged as backlog, this phase is specced against something that doesn't exist yet. Worth a direct check before HOW-223 proceeds.

### Phase 2 — Gathering / "Campfire Live"

**This is where the richest convergence is, and it's precise enough to change the actual engineering plan.**

"When Ruby senses a Locale Story-Anchor nearby it unlocks an AR Mise-en-Scène moment" — three real systems, already specified, doing exactly this:

1. **Ruby is a real, already-building agent** — `ENG-11` (Ruby Discord bot, Vintage & Voice continuity), `BOT-4` (RubyAgent: StoryGem confidence gate → fanout), `ENG-324` (Ruby conversational endpoint, Vercel AI SDK + CF AI Gateway, live at `api.humancode.codes`). Not a name to introduce — a system to call into.
2. **"AR Mise-en-Scène Director (Niantic Lightship scene manifest)" is the same Niantic VPS integration already named in FRM-6**: *"New `data-state='pose-matching'` and `data-state='pose-verified'`... to support Niantic VPS 2.0 integration."* `GRAMMAR_ACTOR_RECONCILIATION.md` already reclassified these as **grammar-tier states** — specifically the transient between `carry` and `verified` — not a spatial/VPS-only concern. **This means the "AR Trigger" unlock this document proposes is already a GrammarActor transition.** HOW-222's `source=AR` flag on `emitNarrativeNode()` should fire from inside that transition, gated by the same actor guard (ENG-475) and, critically, the same **venue-authority resolver (ENG-482)** — a Story-Anchor is a sub-venue authority question (does this specific antique key, mural, or tree have a co-signed `at://` record authorizing AR activation here?), not a new authority model.
3. **"Emotionally-Intelligent Avatar Pack (Hume-AI)... avatars react to guest emotion scores"** is **`SENTIMENT_SHIFT`**, the voice-layer sensing event already in the actor guard table — explicitly agent-permitted because it senses rather than decides. The "Emotion-Match Score ≥ 0.7 Pearson corr." metric is a good, concrete way to validate that the sensing stays sensing and doesn't drift into deciding.

**"Narrative Nodes tagged source=AR"** — plausibly the same primitive as `storyGemSeed`/`StoryGem` (the carry-forward unit emitted at `verified`) under a different name. Worth confirming before building a parallel node table: if `emitNarrativeNode()` and the StoryGem emission path are the same thing, HOW-222 is a one-field addition to an existing call, not a new SDK method.

### Phase 3 — Crystallisation / Palimpsest

**"AU tokens split... AU split includes local-partner share"** — `AU` is not a new abbreviation. `substrate/packages/shared/tokens.ts` already defines the canonical chain `MagnetEvent → UnitAward → LedgerEntry → LedgerEvent` with symbols **PU/MU/AU/PRU**. This document's "Economic Resonance Ledger" is an extension of that existing ledger, not a new one.

**The proposed 60/20/10/10 split (Guest/Partner/Community/Platform) is the single most useful concrete artifact in this whole document.** The Swirly Eats synthesis (two weeks prior) flagged the Economic angle's `no-commercial-adjacency` condition as awkward and recommended an explicit `commercial-licensed` occasion with its own `conditions[]` for lineage-royalty splits — **but left the actual split numbers unspecified.** This document supplies them. Recommend lifting the 60/20/10/10 ratio directly into that occasion's condition spec rather than treating it as a separate AR-only economic model — it's the same open design question, now with a proposed answer.

### Phase 4 — Intelligence / Pattern-Emergence

"Dekart" — plausibly the real open-source geospatial/SQL-to-map tool of that name, not an internal codename; flagged as uncertain rather than asserted. If so, the "Enchanted Objects" density-heatmap toggle (HOW-225) is a visualization layer on top of the Story-Anchor Registry and the venue-authority data already specified — a dashboard feature, not new data modeling.

---

## The CSS-token collision, again

**"AR Trigger ↔ ACL hand-shake... picks colour-grading + dialogue variant based on `formality`, `heritage_presence`"** describes the same job `emotionTokenMap.ts`'s five tokens already do (`--kinetic-intensity`, `--key-light-kelvin`, `--fov-delta`, etc. — "colour-grading" is literally `--key-light-kelvin`). This is the same pattern `GRAMMAR_ACTOR_RECONCILIATION.md` found with `data-state` carrying three orthogonal dimensions in one attribute: a new, undocumented parameter set (`formality`, `heritage_presence`) describing the same job as an existing, documented one.

**Recommendation:** either `formality` and `heritage_presence` map onto the existing five emotion tokens and should be named as such in HOW-223, or they're genuinely new dimensions that belong in `emotionTokenMap.ts` as additions — not as a third, parallel, undocumented vocabulary.

---

## Two naming collisions worth a one-line fix each

1. **"Blueprint™"** (this document's venue-scanning/atmosphere product) and **Sanity's Blueprints** (deploy-config mechanism, `docs/SANITY_WORKFLOWS_TERMS_PLAN.md` §build order) are unrelated systems sharing a name inside the same ecosystem. Same hazard class as "Rive renders; GrammarActor decides" flagged earlier for FRM-6/ENG-111. Worth one line in both documents' glossaries so nobody debugs the wrong "Blueprint."
2. **"Experience Architect (staff)"** as joint owner of the Story-Anchor Registry most likely names a human delegate acting under the **VENUE stance** (ENG-389) — venue-as-steward is already established (`BOT1_ADAPTIVE_SUBSTRATE.md`). Worth confirming this is a role *within* VENUE rather than a fifth stance ENG-389 needs to grow to accommodate.

---

## One genuinely new, good idea with no prior counterpart

**The `source=AR` vs `source=Live` node-diversity target (min 30% AR / 70% Live)** is a real, useful addition — it's a *measurable* version of the Accompanist AI principle from the Swirly Eats synthesis ("AI supports but never overrides... analytics prioritize belonging and dialogue over engagement metrics"). Swirly Eats named the principle; this document gives it a number. Worth keeping as the first concrete KPI for that principle, and worth telling whoever owns Swirly Eats' Theme 3 that it now has a target attached.

---

## Routing and credentialing, briefly

- **"Locale Storyteller" micro-credential** should issue through the **SCID engine as an ATProto Verifiable Credential** (`SCID_ARCHITECTURE.md`), not a bespoke staff-training record. This gives Guild Academy a second DACUM-analyzable occupation (AR story-anchor logging and guiding) alongside viticulture.
- **The "Voice to Stakeholders" paragraph is a CEP content deliverable**; the Story-Anchor Registry's consent/revenue-split specification, once wired to real Transmission Terms, produces a **GSBF governance trace**. Same split as established in `CROSS_TEAM_OPERATING_PLAN.md` — don't let the two live in one document going forward.
- **"Local-Partner Uplift +15% sales... first 90 days"** is a projection. If this metric appears in anything partner-facing, it needs the "model, not actual" framing the standing rules already require — actuals-only in partner-facing and governance surfaces.

---

## Revised action-sheet reading

| Task | As written | What it actually is, given what exists |
|---|---|---|
| HOW-221 — `enchanted_objects` schema | New CRUD system | `TransmissionTerms` applied per-locale-object; smaller than scoped |
| HOW-222 — `source=AR` flag on `emitNarrativeNode()` | New SDK flag | Confirm whether this *is* the StoryGem emission path first; if so, one-field addition |
| HOW-223 — AR Trigger ↔ ACL hand-shake | New parameter negotiation | Either reuses `emotionTokenMap.ts`'s five tokens, or extends that map — not a third vocabulary |
| HOW-224 — AU ledger revenue-share extension | New ledger logic | Extension of the existing `PU/MU/AU/PRU` chain; 60/20/10/10 split feeds the open `commercial-licensed` occasion design |
| HOW-225 — Dekart "Enchanted Objects" layer | New analytics layer | Dashboard feature over already-specified data, pending confirmation Dekart is the real tool |

**Before any of the above starts:** confirm against Linear whether `HOW-192` (the existing AR epic — Meta glasses pairing, AR label scan, social-cut delivery) is the parent these five tasks should file under, rather than a second, disconnected AR workstream. Confirmed `HOW` is a Linear team prefix. **Access is deliberately not being extended for this check** — not a connector gap. The cross-reference stays an open flag for whoever does have Linear access to resolve, not something this engagement will verify directly.

---

## Recommendation

Treat this plan's five P0/P1 tasks as **integration specs against GrammarActor, Transmission Terms, and the `PU/MU/AU/PRU` ledger**, not as five new systems. The 45-minute alignment huddle this document proposes (Product + Creative + Partner Ops) should have an engineer from the GrammarActor/substrate side in the room — the "Campfire" correction and the Niantic/pose-verified convergence are exactly the kind of thing that's invisible from the brand side and obvious from the runtime side, and this plan currently has neither.
