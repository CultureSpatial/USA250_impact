# GrammarActor × Axis Model — Reconciliation

**Version:** 1.0
**Date:** 19 September 2026
**Sources:** ENG-111 (full, incl. five comments), FRM-6 (full, incl. two comments)
**Resolves:** the open question from `AXIS_PACKET_COMPARISON.md` §6.7 — does grammar actor predate Axis 4, and does the dependency invert?

---

## 1. The answer: yes, and by more than a date

**ENG-111 and FRM-6 were both created 2026-05-10. CEP-29 — which carries the 5-axis model including Axis 4 — was created 2026-05-19.** GrammarActor predates the axis model by nine days.

The date is the weaker half of the argument. The stronger half:

| | GrammarActor (ENG-111) | Axis 4 as originally written |
|---|---|---|
| Status | **Done** | Never implemented |
| Artifact | `@vinejocket/grammar-actor` scaffolded; XState v5 machine; Zustand `RoomStore` bridge | — |
| Runtime | `theatre-worker` v0.2.0, smoke-tested: `POST /grammar-event`, `GET /grammar-state` | — |
| Gate mechanism | `hold` is a first-class state | "no share without explicit gate" — gate unnamed for four months |

One of these shipped. The other resisted implementation, which is the tell `AXIS_4_REDRESS.md` already named. **The dependency runs from GrammarActor to the axes, not the reverse.**

---

## 2. Correction to my own hypothesis

Two turns ago I proposed `actor = f(register, terms, occasion)` — an **occasioned selector**. That was wrong in a way worth stating plainly.

GrammarActor is not a selector. It is a **statechart with history**. The difference is not cosmetic:

- A selector is stateless — same inputs, same output, no memory
- A statechart has *position*. Where you are constrains where you can go. `verified` is only reachable through `hold` and `carry`.

"Occasion" is therefore not an input to a function. It is a **position in a machine**. That distinction is what makes graduated accession expressible at all — a selector cannot express "you may only grant this after having held."

I also had the event mapping wrong. I had called `CO_SIGN` the initial-cooperation primitive. It is not — it is the **terminal** grant:

```
TRIGGER        → induction
HOLD           → hold
CARRY_FORWARD  → carry
CO_SIGN        → verified
RESET          → idle
```

`TRIGGER` is first contact. `CO_SIGN` is the governed relation at the end.

---

## 3. The guest ladder already exists, shipped

`GUEST_TRACK_AND_UGC.md` proposed a six-rung ladder for graduated accession. ENG-111 shipped five of those rungs in May as machine states.

| Proposed rung | GrammarActor state | Event |
|---|---|---|
| Presence — nothing granted | `idle` | — |
| Initial cooperation | `induction` | `TRIGGER` |
| **The pause before commitment** | **`hold`** | `HOLD` |
| Material moves beyond the moment | `carry` | `CARRY_FORWARD` |
| Terms granted, record owned by participant | `verified` | `CO_SIGN` |

I proposed "exit-time licensing" as the calm moment where a guest decides whether their contribution travels. **The machine already calls it `hold`, and `hold` is a better name** — it is a pause, not an exit, and it can be entered more than once.

### What `verified` already does

From ENG-111's RES-72 integration comment:

> **AT Protocol Social Emission**: The `verified` state (**Governed Relation**) should trigger the emission of an AT Protocol social record… This ensures the **participant owns the interaction record natively**.

And: every event carries the `traceId` from BOT-31 for OTW carry-over across corridor surfaces.

So `verified` is: a governed relation, emitting a participant-owned ATProto record, with a trace. **That is Transmission Terms — as a state transition rather than a classification.**

---

## 4. The inversion, stated

**Transmission Terms should be the payload `verified` emits, not a parallel system.**

| Transmission Terms field | Where it belongs |
|---|---|
| `steward` | Context on the machine — known at `induction`, required before `hold` can be exited |
| `grantedFor[]` | **What `CO_SIGN` writes** into the ATProto record |
| `attribution` | Machine context, carried into the emitted record |
| `conditions[]` | Guards on the `hold → carry` and `carry → verified` transitions |
| `withdrawal` | An event the machine must accept **after** `verified` — currently absent |
| `openQuestion` | A guard that can refuse the transition and return to `hold` |

This is strictly better than the standalone model in `AXIS_4_REDRESS.md`, because guards and transitions are **executable**. A condition expressed as an XState guard either permits the transition or does not. A condition expressed as a document field is a hope.

**Axis 4 becomes a projection of GrammarActor.** Update CEP-29 accordingly: Axis 4 is not a dimension of the content, it is the record the machine emits at `verified`.

### The one field the machine lacks

**`withdrawal` has no event.** The machine has `RESET` (returns to `idle`), but reset is not retraction — it clears the session, it does not recall an emitted ATProto record. A `WITHDRAW` event and a post-`verified` state are missing, and this is the highest-value addition to a package that is otherwise Done.

---

## 5. `data-state` is carrying three orthogonal dimensions

FRM-6 shows the CSS contract has accumulated three unrelated vocabularies in one attribute:

| Vocabulary | Values | Actual dimension |
|---|---|---|
| Machine state | `idle`, `induction`, `hold`, `carry`, `verified` | Grammar position |
| Emotion tokens | `elated` → `--kinetic-intensity: 0.85` (5 tokens, `emotionTokenMap.ts`) | Affective register |
| Fenceless / VPS | `pose-matching`, `pose-verified`, `proto-resolving` | Spatial resolution |

**This is the CIP depth error recurring** — independent dimensions collapsed into a single attribute. A surface can simultaneously be in `hold`, `elated`, and `pose-matching`; one attribute cannot express that.

**Recommendation:** split into `data-grammar-state`, `data-emotion`, `data-spatial`.

One nuance: `proto-resolving` is described as "the moment the `at://` venue record is being co-signed." That is **grammar-tier**, not spatial — it is the transitional state between `carry` and `verified`. It belongs in `data-grammar-state` as an explicit transient, which also gives the co-sign a visible in-flight state rather than an instant flip.

---

## 6. FRM-6 findings

**It is the critical path for compliance, and it is in Backlog.** FRM-4 (Pencil reference frames) depends on FRM-6's `data-state` spec to know what correct output looks like; FRM-4 → SIG-1 is the compliance chain. FRM-6 unblocks both and is itself blocked by ENG-392 (dtc-component-library sync).

**Its title is stale.** "Nordcraft Package CSS State Contract" — the migration to Rive + Bit.dev WCs (ENG-396) has already moved the target. The body acknowledges this; the title has not caught up.

**A naming hazard worth pre-empting.** ENG-111 defines GrammarActor as "the pattern that replaces **Rive's state machine** at the interaction grammar tier." FRM-6's migration target is **Rive + Bit.dev**. Rive returns as a *rendering* substrate while GrammarActor keeps the *logic* tier. Both statements are true and together they read as a contradiction. Say it explicitly in both tickets: **Rive renders; GrammarActor decides.**

---

## 7. Provenance: the ams-host gap and the AMS pipeline gap are one gap

ENG-111 has exactly one unchecked acceptance criterion:

> **Provenance Integration**: Ensure each transition emits a telemetry event compatible with the Console Relay (ENG-89). *(Implementation bridge to `ams-host` pending.)*

Everything else is checked. And ENG-111 states that every transition is a **Founding Trace for the EBPI Stack**, treated as **funder evidence for EIC ACCESS+ (PART-35)**, recorded in Vespa (ENG-115) via Console Relay (ENG-89).

So the single open item on a Done ticket is the `ams-host` bridge — which is the same surface as `ams-pipeline-gap-map.html`, the file raised earlier in this thread. **The GrammarActor provenance gap and the AMS pipeline gap are the same gap**, approached from two directions. Worth treating as one work item rather than two.

It also means the evidence chain for three separate things — SCID competency evidence, GSBF governance trail, and PART-35 funder evidence — all terminate at the same unbuilt bridge.

---

## 8. The governance line, now concrete

Last turn I argued some grammar events must never be agent-emittable, because an agent that can emit `CO_SIGN` makes consent synthetic. ENG-111's event list does not restrict actorhood, and the machine now accepts `INTENT_IDENTIFIED` and `SENTIMENT_SHIFT` from the voice layer — so **machine-originated events already enter the machine**.

That makes the guard concrete and urgent:

| Event | Agent may emit? | Rationale |
|---|---|---|
| `TRIGGER` | Yes | Entry can be system-initiated |
| `HOLD` | **Yes — and should** | An agent noticing a terms violation and pausing is exactly the right use |
| `INTENT_IDENTIFIED` / `SENTIMENT_SHIFT` | Yes | Sensing, not deciding |
| `CARRY_FORWARD` | **No** | Moves material beyond the room |
| `CO_SIGN` | **No** | Consent becomes synthetic; voids the Guild Academy constitutional bound |
| `WITHDRAW` *(to add)* | **Human only** | Retraction is the participant's |
| `RESET` | Operator | Session control |

This should be an actor guard in `@vinejocket/grammar-actor`, enforced in the machine, not a convention.

---

## 9. On the GTM revision

The PART-25 regrounding is right, and the correction from brand-to-consumer framing to participation governance is the correct one. `verified` as attribution event rather than badge is directly supported by ENG-111's own text ("Governed Relation", participant owns the record). Anchoring the token layer in CEP-25 Ensemble rather than generic CSS is also correct and matches FRM-6's `emotionTokenMap.ts` contract.

Three places I would push back:

**The five states are not a funnel.** The GTM table reads as a linear arc — ambient → induction → hold → carry → verified. But this is a statechart: `RESET` exists, and `hold` is a genuine gate that can fail. Presenting it as an arc quietly re-imports the conversion-funnel thinking PART-25 rejects. The honest framing: **a machine with a refusal path, where refusal is a feature**. "Doesn't broadcast — participates" is undercut if the states are drawn as a funnel.

**"Every co-sign is an attribution event" needs the withdrawal half.** If the participant owns the record, they must be able to retract it. Until `WITHDRAW` exists (§4), co-sign is a one-way door, and saying the participant "owns" it overstates what the machine currently supports.

**The pitch omits who may co-sign.** "Witnessed co-sign" carries weight only if a machine cannot perform the witnessing. Add the actor guard before the language ships externally, or the claim is not yet true.

---

## 10. Recommendations

1. **Invert the dependency in CEP-29.** Axis 4 is not a content dimension; it is the record GrammarActor emits at `verified`. Update the epic.
2. **Add `WITHDRAW`** and a post-`verified` state to `@vinejocket/grammar-actor`. Highest-value addition to an otherwise-complete package.
3. **Express `conditions[]` as XState guards**, not document fields. Executable beats declarative.
4. **Split `data-state`** into `data-grammar-state`, `data-emotion`, `data-spatial`; move `proto-resolving` into grammar-tier as an explicit transient.
5. **Add the actor guard** on `CO_SIGN` and `CARRY_FORWARD` in the machine.
6. **Unblock FRM-6** — it gates FRM-4 → SIG-1, the compliance chain. Retitle it off Nordcraft.
7. **Treat the `ams-host` bridge as one work item** with the AMS pipeline gap map, since SCID, GSBF and PART-35 evidence all terminate there.
8. **State "Rive renders; GrammarActor decides"** in both ENG-111 and FRM-6 to pre-empt the migration confusion.
