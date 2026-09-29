# Axis 4 Redress — From CIP Depth to Transmission Terms

> **SUPERSEDED IN PART — 19 Sept 2026.** The diagnosis below stands. The *implementation* does not: GrammarActor (ENG-111, created 2026-05-10, **Done**) predates the axis model (CEP-29, 2026-05-19) and already implements graduated accession as a shipped XState statechart — `idle → induction → hold → carry → verified`, with `verified` emitting a participant-owned ATProto record.
>
> **Transmission Terms should be the payload `verified` emits, not a standalone model.** `conditions[]` become XState guards; `hold` is the pause this document proposed building. One field is genuinely missing from the machine: `withdrawal` has no event. See `GRAMMAR_ACTOR_RECONCILIATION.md`.

**Version:** 1.0
**Date:** 17 September 2026
**Status:** Proposed replacement for Axis 4 of the Content OS 5-axis model (CEP-29)
**Reason:** CIP depth is abstract and does not align with the social practice model

---

## The instruction

Axis 4 as written is:

> **Surface CIP** (public lore) → **Deep CIP** (oral tradition with contributor consent) → **Benthic CIP** (sacred/protected knowledge — no share without explicit gate)

This is a depth scale. It is being replaced because it is abstract and out of line with the social practice model the rest of the work runs on.

---

## Diagnosis: why the depth metaphor fails

### 1. It treats sensitivity as a property of content

Surface / deep / benthic describes the *material*, as if sensitivity were intrinsic — discoverable by inspection, fixed once assigned. That is a **classification model**: look at a thing, assign a tier, let the tier govern.

But sensitivity is not a property of content. It is a property of **a relationship under conditions**. The same story told at a family table, in a K-12 classroom, and on open social has three different permission states — not because the story changed, but because the relationship, the audience, and the occasion changed.

Axis 3 already knows this: it carries civic-memory register *and* K-12 register as distinct outputs from one source. Axis 4 contradicts Axis 3 by fixing a single sensitivity value on material that Axis 3 explicitly expects to move between contexts.

### 2. It locates authority in the classifier

Under CIP depth, someone inspects content and assigns `cipDepth`. The community's role reduces to being consulted about a tier that someone else assigns. That is extraction with a consent step bolted on.

The rebase in PART-25 (June 2026) rejected exactly this move. It replaced "BC practitioners as validation subjects" with practitioners who **configure their own participation**, and WGBC as an **anchor participant who governs how knowledge enters circulation** — not a validation partner, not a credibility provider. Axis 4 reintroduces the pattern PART-25 spent a rebase removing.

It also fails **CARE**: *Authority to Control* is not expressible in a depth scale. A number cannot say who decides.

### 3. Depth is monotonic; practice is not

A single scale can only say "more restricted" or "less restricted." Real transmission terms are shaped, not ranked:

- freely shared **within** a community, never outside it — not "deeper," differently bounded
- public **but** must carry attribution
- shareable **now**, not in perpetuity
- shareable as **audio**, not as text
- shareable **only** alongside specific framing

None of these are points on a ladder. Forcing them onto one produces either over-restriction (everything contested becomes benthic and never ships) or under-restriction (nuance is lost in rounding).

### 4. The unimplemented gate is a symptom, not an oversight

CEP-29 specifies "no share without explicit gate" and names no gate. Four months on, there is still no mechanism. **An abstraction that resists implementation usually is not describing anything actionable.** "Benthic" is a mood, not a mechanism — an aestheticized borrowing that does no work at the point where work is required.

---

## What the social practice model actually says

This is already documented; Axis 4 simply did not inherit it.

**PART-57, Adaptation crosswalk v1.0 (Discipline: Articulation):**
> Prefer **social practices** framing over sovereignty-first framing... Use **stewardship, transmission, practitioner attribution, and public/shareable vs community-held boundaries** as the main explanatory language.

**Card Schema v1, governance rules:**
> Distinguish archive record from editorial interpretation from community contribution · preserve attribution where known · allow uncertainty to remain visible · do not flatten contested or plural histories into one voice.

**Card Schema v1, invitation path** already carries the seed fields: *attribution preference, consent requirements, governance flags*.

The vocabulary is stewardship, transmission, attribution, boundaries. Not depth.

---

## The replacement: Axis 4 = Transmission Terms

Axis 4 becomes a small set of **relational fields** recording who governs circulation and on what terms — mirroring how transmission actually works, and promoting fields the card schema already half-contains.

### Field specification

**1. Steward** *(required — blocking)*
Who holds authority over this material's circulation. A named person, family, community body, or institution. Not "who owns it" — **who governs its transmission**.

> If no steward can be named, the material is not ready to publish. This is the field the depth model omits entirely, and it is the one that carries CARE's *Authority to Control*.

**2. Granted for** *(required — multi-select, not a ladder)*
The specific circulations the steward has agreed to, expressed as **occasions**:
`in-session` · `locale-card-public` · `open-social-carryforward` · `classroom-k12` · `archive-deposit` · `partner-institutional`

Multi-select composes directly with Axis 3's register plurality and with the primer / live witness / return signal rhythm. A card may be granted for `locale-card-public` and `classroom-k12` but not `open-social-carryforward` — a distinction depth cannot express.

**3. Attribution** *(required)*
How the steward wishes to be named: full name · community only · role only · anonymous · deferred-to-steward-at-publish. Promotes the card schema's existing attribution preference from metadata to governing term.

**4. Conditions** *(optional, structured + free text)*
Constraints that do not fit a scale: time-bounded · season-bounded · medium-bounded (audio yes / text no) · context-required (must appear with specific framing) · no-commercial-adjacency · revocable-on-request.

`no-commercial-adjacency` preserves CEP-29's success criterion — "no commercial overlay applied to benthic-CIP content" — as an explicit term rather than an inference from tier.

**5. Withdrawal** *(required)*
How the steward retracts, and what happens to traces already distributed. Given ATProto carry-forward, traces travel; a retraction path must be **designed**, not assumed. This is the field that makes consent real rather than ceremonial.

**6. Open question** *(optional, and encouraged)*
Recorded disagreement or uncertainty about terms. Where stewards differ, both positions are recorded and **the narrower terms govern**. This operationalizes "allow uncertainty to remain visible" and "do not flatten contested or plural histories."

---

## What changes in practice

### The default inverts

| | CIP depth | Transmission terms |
|---|---|---|
| Default posture | Publishable unless classified deep | **Nothing circulates without named terms** |
| Missing data means | Assume surface, proceed | **Blocked** — absence of steward is a stop |
| Authority sits with | Whoever classifies | **The steward** |
| Expressiveness | One ranked scale | Occasions, conditions, attribution, withdrawal |
| Contested material | Rounds to most restrictive, or ships flattened | Recorded as open question; narrower terms govern |

### The gate disappears — correctly

There is no separate "benthic gate" to build, because circulation is permission-gated by construction. Nothing moves without a steward and a grant for that specific occasion. The gate that was never implemented turns out to have been an artifact of a model that let material flow by default.

### Cultural Governance gets something checkable

The CUL veto in `CROSS_TEAM_OPERATING_PLAN.md` currently has no concrete test. Under transmission terms it becomes mechanical:

1. Is there a named steward?
2. Are terms granted for **this specific occasion**?
3. Is attribution honored as specified?
4. Are conditions satisfied?
5. Is the withdrawal path live?

Five checks, each answerable from a record. No judgment call about how deep a thing is.

---

## Migration from cipDepth

Existing references map without loss of intent:

| Old | New |
|---|---|
| Surface CIP | Steward named; granted for `locale-card-public` + `open-social-carryforward`; attribution as specified |
| Deep CIP | Steward named; granted for a **narrower** occasion set; conditions likely include `context-required`; withdrawal path exercised more actively |
| Benthic CIP | Steward named; granted for **few or no** public occasions — often `in-session` or `archive-deposit` only; `no-commercial-adjacency`; withdrawal immediate |

Nothing that CIP depth intended is lost. The intent — that some material must not be commercially overlaid, that consent matters, that sacred knowledge exists — is **relocated from classification to relationship**, which is where the social practice model already put it.

`cipDepth` may be retained as a *derived, non-authoritative* display hint if a UI needs a coarse badge. It must not gate anything.

---

## What this unlocks

**The shared primitive becomes explicit.** Three threads now visibly have the same shape:

| Thread | Claim | Steward | Terms |
|---|---|---|---|
| **American Lore** (Axis 4) | This lore is from this locale | Community / practitioner | Occasions of circulation |
| **PART-25** attribution routing | This knowledge entered corridor flow | WGBC / BC practitioners | Value-distribution terms |
| **PART-137** provenance labelling | This wine is from this fruit | Producer, governed by WGBC | Disclosure terms |

All three are: **a claim, its steward, and the terms under which it circulates.** One design, three applications — worth building once. This is the third sighting of the pattern and the point at which it should stop being re-derived.

**It composes with ATProto natively.** Terms travel with the record rather than living in a separate classification table. A carry-forward trace arrives carrying its own permission state.

**It reads correctly to humanities partners.** Federation of State Humanities Councils, Smithsonian CFCH and LOC/AFC work in stewardship and attribution vocabulary already. "Who is the steward and what did they agree to" is a question those institutions can answer. "What is the cipDepth" is not.

---

## Open questions

1. **Occasion vocabulary** — the six values above are a starting set. They should be validated against real transmission cases before being fixed, not designed in advance.
2. **Steward succession** — what happens when a steward dies, or a community body reconstitutes? Terms need a continuity rule.
3. **Withdrawal reach** — ATProto records propagate. Honest scoping is required on what retraction can and cannot recall, and that limit must be disclosed to stewards *before* they grant, not after.
4. **Institutional stewards** — LOC/AFC archive material has rights status but no living steward in this sense. Archive trace and steward are different fields and should not be conflated; an archive citation is not a grant.

---

## Recommendation

1. Replace Axis 4 in CEP-29 with Transmission Terms; retitle the axis.
2. Promote the card schema's invitation-path consent fields to governing status.
3. Close the "benthic gate" work item as **obsolete by redesign**, not as done.
4. Build transmission terms once, as the shared primitive across CEP-29, PART-25 and PART-137.
5. Validate the occasion vocabulary against three real cases — ideally one state, one territory, one tribal nation locale — before fixing the enum.
