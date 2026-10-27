# Martha's Swirly Eats — Synthesis & Absorption

**Date:** 15 October 2026
**Source:** Ernest Mudimu, document-set proposal (24 Sept 2025) + ten-theme elaboration
**Status:** First-pass synthesis. Written fresh in current repo state — see the repository-state note above; this doc doesn't depend on the vanished corpus, but several cross-references below point at decisions made in Linear/Jira (CEP-29, PART-25, ENG-475, etc.) that remain real and current regardless of this repo's git history.

---

## The headline finding

**This is not a new initiative to spec from scratch. It's the brand and narrative identity for surfaces that already exist, under names that already exist, without anyone having written down that they're the same thing.**

"Martha" and "Swirl/Swirly" are not fresh names Ernest is introducing. Both are already live, named surfaces in the engineering substrate this engagement has been building on:

| Already-named engineering surface | Swirly Eats document |
|---|---|
| `apps/ams-host`, internally nicknamed "martha" | **Martha Swirly** — the Culinary Fusion Visionary persona |
| `swirly.quest` — the open-entry Spline induction surface (RES-121 Fire 7, "most resolved fire in the crosswalk") | **Swirly Eats** — the brand the surface is named after |
| GrammarActor's `theatre-worker` + "Theatre of the Mind" (CUL-77, COR-7) | **Kitchen theatre**, **Chef-Story duets** |
| `glass-swirl.riv`, SwirlPixi render components | The visual/rendering layer **Swirl Festivals** would actually run on |

**Reading this document set is reading the missing brand layer for infrastructure that has otherwise only ever had technical names.** That's the main reason this is worth absorbing carefully rather than treating as a parallel brand exercise: every theme below either names something already built, or names a real gap in what's built.

---

## Theme-by-theme: what converges, what's genuinely new

### 1. Governance and Sovereignty

**Converges directly with Transmission Terms** (the Axis 4 redress: steward, `grantedFor[]`, attribution, conditions, withdrawal, openQuestion).

- "Consent embedded at every stage: contribution, plating, publication" is, almost exactly, GrammarActor's state sequence: `induction` (contribution) → `hold` → `carry` (plating/circulation) → `verified` (publication, `CO_SIGN`).
- "Contributors retain the right to revoke **and export** their recipes" — **this is new and matters.** The `WITHDRAW` event spec (ENG-475) only covers retraction/recall. **Export/portability is a separate capability** not currently in that spec. A contributor should be able to pull a full, usable copy of their own contribution, independent of whether they're also revoking it. Add this as a second mode alongside `WITHDRAW`, not folded into it — recall and export have different failure consequences (recall fails safe by over-retracting; export fails unsafe by under-delivering).
- "Polyphonic governance replaces static elder veto with rotating councils and fairness metrics" — **this is a real refinement to the `steward` field**, not just color. Transmission Terms currently models `steward` as a named entity (person, family, community body). "Rotating councils" suggests `steward` sometimes needs to be a **set with a rotation schedule**, not a fixed singleton. Worth a follow-up to the Transmission Terms spec: does `steward` need a `rotation` sub-field, or is a rotating council itself just a particular kind of "community body" steward that handles its own internal rotation invisibly to the schema? Lean toward the latter — don't let the schema know about rotation mechanics, let the steward-body manage that internally and simply *be* the named steward at any given moment. Keeps the primitive clean.

### 2. Multi-Ontology Culinary Modeling

- "Contributors define their own culinary categories, including ritual, seasonal rites, and diaspora tweaks" — **this directly validates a risk flagged two documents ago.** `seasonalContext` was identified as a leak path where harvest-ritual content could slip through the Seasonal angle's zero-governance-risk dispatch. This theme confirms the instinct: rites are their own ontological category and should route through Ritual (steward-gated), not Seasonal (dates-only, ungated). Treat this as independent corroboration, not just my own earlier inference.
- "Sensitive traditions protected through opaque archives and red-listing" — **this is the predecessor vocabulary to CIP depth**, which was itself already replaced by Transmission Terms for exactly the reasons documented in the Axis 4 redress (depth scales treat sensitivity as a property of content rather than a property of a steward relationship). **Do not resurrect "red-listing" or "opaque archives" as active vocabulary.** Translate it forward: a "red-listed" tradition is simply one where `grantedFor` is narrow (perhaps just `in-session`) and `steward` is a tightly-held community body — the same outcome, reached through the terms model instead of a classification tier.

### 3. Accompanist AI

**This is the best available brand name for the actor-guard principle** already specified in ENG-475 and corroborated independently by Sanity's own Workflow stage model (agent checks and advances-or-returns; human submits). "Accompanist" is a better word than anything in the engineering docs for *why* the guard exists: an accompanist supports a performance without becoming its author. Recommend adopting "Accompanist AI" as the external-facing name for the `TRIGGER`/`HOLD`-yes, `CO_SIGN`/`CARRY_FORWARD`-no guard table, rather than leaving it as an unnamed internal rule.

### 4. Commons-First Economic Model

**This resolves a naming problem flagged in the packet-angle analysis.** The Economic angle's `no-commercial-adjacency` condition was awkward — a condition that negates commerce on an angle whose entire purpose is economic declaration. Swirly Eats' framing clarifies it: **the default is Commons (non-commercial); commercialization is an explicit opt-in grant.**

Practically: stop trying to make `no-commercial-adjacency` do double duty. Instead:
- Default `grantedFor` scope excludes any commercial occasion
- Add an explicit occasion, e.g. `commercial-licensed`, that must be separately granted, with its own `conditions[]` for lineage royalty splits
- "Lineage royalties" and "community-managed fund" are the economic-declaration posture already modeled in the packet schema (`economicDeclaration.posture`) — this theme gives that field real semantic content instead of a placeholder

### 5. Co-Creation and Community Rituals

- **"Swirl Studio kits"** — a named product surface with no current engineering ticket. Worth scoping as a CEP content deliverable (the kit's instructional/branding content) plus whatever minimal tooling turns a Card/Protocol object into something a community can co-edit together in a session.
- **"Protocol Clinics... set remix rules with community elders"** — this is the single most useful addition in this document set, because it names the **missing human process** that the entire Transmission Terms engineering spec assumes exists but never describes. `SANITY_WORKFLOWS_TERMS_PLAN.md` specifies *what* `steward` and `grantedFor` are; it never specifies *how a steward actually arrives at a decision about what to grant*. "Protocol Clinic" is that process. Recommend formalizing it as the standard onboarding ritual before any new steward populates their first Transmission Terms object — this is cheap to do and closes a real gap between the schema and the practice.

### 6. Provenance and Lineage

**"Protocol cards... communicate remix boundaries and credit requirements."**

This is a **fourth sighting of the shared primitive** — "a claim, its steward, and the terms under which it circulates" — previously sighted in CEP-29 American Lore, PART-25 attribution routing, and PART-137 provenance labelling. A "Protocol card" here is structurally identical to the American Lore **Civic Memory Card**: both are the human-readable, presentational rendering of a Transmission Terms object. Worth stating plainly: **this is the same object with a fourth name.** If a card-shaped UI component gets built for one, it should be built once and skinned for context, not built twice under two names by two different teams who don't know they're solving the same problem.

### 7. Spectacle and Storytelling

"Kitchen theatre," "Chef-Story duets," short-form video over heroism — maps onto the existing Theatre of the Mind work (CUL-77, COR-7 canonical hold sequence) and the Maker Voice angle (practitioner narrative). "Chef-Story duets" specifically resembles the paired-perspectives format already named elsewhere (RES-19 Format Kit, "Paired Perspectives, Pacific Food Memory"). Likely the same content pattern, different cuisine.

### 8. Safeguards and Ethics

Same translation note as Theme 2: "red-listing and elder veto" is pre-redress vocabulary. "Consent scopes and deletion protocols" reinforces the export-vs-retraction distinction from Theme 1 — "deletion" leans toward retraction/recall; "consent scopes" is `grantedFor`.

### 9. Expanded Modes of Engagement — the one worth acting on soonest

- **"Sports-Inspired Live Tasting: real-time flavor pairings and commentary synced with sporting events"** — this is a direct, concrete application of the FIFA cluster that was absorbed (not closed) under CEP-29: CEP-74 (Host City Brand Book co-brand layer), CEP-70 (ritual translation patterns), CEP-71 (football prompt library). Those were absorbed as reusable *source material* with no stated downstream use yet. **This is the downstream use.** A live match's `HOLD`/`CARRY`/`VERIFIED` cadence synced to real-time commentary is exactly the kind of time-bound, high-tempo application GrammarActor's state machine was built for, paired with Maker Voice content for the commentary itself. Worth flagging to whoever owns CEP-70/71/74 that this theme gives them a concrete product to build toward, not just translation-pattern inventory sitting idle.
- "Culinary Heritage Journeys" and "Travel-Infused Culinary Discovery" map onto the American Lore locale types (`territory`, `tribal nation / Indigenous homeland`) and the corridor geography work (USVI, BC/PNW) already underway.
- "Interactive recipe maps" is `routeGraph` again, generalized beyond the state fair circuit case.

### 10. Waste Rituals and Circular Engagements

**A genuinely new partnership thread**: a named corporate partner category (waste management / sustainability), structured the same way GMI Cloud's Ambassador Program was — a corporate partner gets positive brand association and ESG narrative; the project gets funding, infrastructure, or distribution reach in return. Worth a short standalone scoping note the same shape as `GMI_CLOUD_PARTNERSHIP_STRATEGY.md`, if and when this becomes active — not urgent, but worth naming as a pattern match rather than treating as a one-off idea.

---

## What this changes, concretely

1. **Add export/portability as a second mode alongside `WITHDRAW`** in the GrammarActor spec (ENG-475's successor work) — recall and export are not the same capability and shouldn't be collapsed into one event.
2. **Resolve the `no-commercial-adjacency` awkwardness** using the commons-first/opt-in-commercial framing: default-excluded commercial occasion, explicit `commercial-licensed` grant, lineage-royalty conditions attached there instead of negated on the Economic angle generally.
3. **Name "Protocol Clinic" as the standard process** for a new steward's first Transmission Terms decision — closes the schema-to-practice gap.
4. **Recognize the Protocol Card / Civic Memory Card convergence explicitly** before anyone builds a presentational component for either — fourth sighting of the same primitive, build once.
5. **Route CEP-70/71/74 (FIFA translation assets) toward live sports-synced tasting** as their first concrete downstream application, rather than leaving them as unused inventory.
6. **Retire "red-listing," "opaque archives," and "elder veto" as active vocabulary** — translate forward to Transmission Terms' steward/grantedFor/conditions model, which already does what those terms were reaching for.
7. **Adopt "Accompanist AI" as the external name** for the existing agent actor-guard principle.
8. **Scope "Swirl Studio kits"** as a CEP content deliverable once there's bandwidth; not urgent, but now named and placed.
9. **Note the Waste Management partnership pattern** for later, same shape as the GMI Cloud playbook, not active work now.

---

## What I'd ask Ernest, if useful

- Is "rotating councils" meant to be visible in the data model (a literal rotation schedule the schema tracks), or is it purely an internal practice of whichever community body holds the steward role at a given time? This decides whether Transmission Terms needs a new field or stays as-is.
- Is there an existing owner for the sports-live-tasting idea, or is this the first time it's been connected to the FIFA-cluster assets specifically? If nobody's holding it, it's a clean pickup.
