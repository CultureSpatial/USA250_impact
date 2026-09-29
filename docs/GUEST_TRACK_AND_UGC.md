# Guest Track, Initial Cooperation, and UGC — Directional

**Version:** 1.0 (directional draft)
**Date:** 17 September 2026
**Status:** Track-laying. Written ahead of `ams-pipeline-gap-map.html`, which is on a local machine and not reachable from this environment.

---

## The load-bearing problem

Transmission Terms (`AXIS_4_REDRESS.md`) requires a **named steward** before anything circulates. That resolves cleanly for practitioners, community bodies and institutions.

**It does not yet resolve for guests.** A visitor who contributes a memory at a venue has no prior relationship with us, no standing in a community body, and thirty seconds of attention. Who is the steward of that contribution?

This is the hardest case for the model we just adopted, and it is currently unanswered. Any guest/UGC track has to answer it first, because every downstream question — publishing, carry-forward, attribution, withdrawal — depends on it.

### Three wrong answers

1. **We are the steward.** Extraction with a consent step attached — the exact pattern PART-25's June rebase spent a rebase removing. Rejected.
2. **Nobody is, so nothing circulates.** Kills UGC outright and makes the guest track pointless.
3. **The guest is, by clicking a checkbox.** Consent theatre. A person cannot meaningfully steward something they contributed in half a minute at a noisy venue, and a checkbox does not make them able to.

---

## Proposal: graduated accession

Transmission Terms is a **graduated disclosure** model — how widely does an existing grant reach. The guest case needs its complement:

> **Graduated accession** — how a contribution *acquires* terms over time, starting from the narrowest possible grant and widening only through deliberate, unhurried, later acts.

**First contact grants almost nothing.** A guest contribution enters at `in-session` only. It is present in the room, it is not published, it does not carry forward, it does not leave. No steward decision is required at the moment of contribution, because nothing is circulating yet.

**Widening is a separate act, at a calmer moment.** Each subsequent occasion — `locale-card-public`, `open-social-carryforward`, `classroom-k12`, `archive-deposit` — requires its own deliberate grant, made later, when the guest has time and context to decide. The guest becomes steward of their own contribution *progressively*, as their relationship to it deepens.

This inverts the usual consent pattern. Instead of asking for maximal rights at the moment of lowest understanding, it asks for minimal rights at first contact and earns the rest.

### Why this is the right shape

- It matches how the material actually moves — most contributions never need to leave the room
- It removes the impossible ask (informed consent under venue conditions)
- It makes withdrawal cheap, because little has travelled
- It gives the guest a reason to return — the widening moment *is* the return signal

---

## The architecture already contains most of this

This is the useful finding: **the pieces exist and are not connected to each other.**

| Existing piece | Role in the guest track |
|---|---|
| **Fire 7 — Exploratory Permission** (RES-121) | `swirly.quest` open entry, no login, no account, `phigitalSession` **Track 0**. This *is* the guest track's front door, and RES-121 calls it the most resolved fire in the crosswalk. |
| **PART-64** — Fire 7 recovery surface | Already specifies **"hospitality-safe explainability"** and **"exit-time licensing."** |
| **Fire 9 — Relational Continuity** | `CO_SIGN` → `storyGemSeed` carry-forward. A deliberate act that moves something beyond the room. |
| **Card Schema v1 — invitation path** | Already lists `visitor` as a contributor role, with consent requirements, attribution preference and governance flags. |
| **CEP-29 `[CC]` Community Config** | "Community-contributed lore expressions within CIP boundaries" — now within transmission terms. |
| **Grammar events** | `CO_SIGN`, `TRIGGER`, `HOLD`, `CARRY_FORWARD`, `RESET` — the vocabulary of participation already exists. |
| **ENG-389 multi-stance lens** | GUEST / OPERATOR / VENUE / PROTOCOL. The GUEST stance is the unbuilt piece. |

### The missing link, named

**PART-64's "exit-time licensing" is the graduated accession moment.** It was designed as a hospitality nicety — what you say to a guest on the way out. Under Transmission Terms it becomes the mechanism: exit is the calmer moment at which a guest decides whether their contribution travels, and on what terms.

That single connection does a lot of work:
- `CO_SIGN` becomes the **initial cooperation** primitive — the first mutual act between guest and room
- `CARRY_FORWARD` becomes the **first widening** — it already means "this leaves the room"
- Exit-time licensing becomes the **terms-granting** surface
- `steward-obsi` vault traces become the record of what was granted, queryable later

Nothing new needs inventing. It needs wiring, and it needs the transmission-terms fields attached to Track 0 sessions.

---

## The guest ladder

A concrete track, using occasions already defined:

| Rung | Moment | Grant | Grammar |
|---|---|---|---|
| **0 — Presence** | Open entry, no account | Nothing. Not a contribution. | — |
| **1 — Initial cooperation** | Guest acts with the room | `in-session` only | `CO_SIGN` |
| **2 — Carry** | Guest chooses to keep it | `in-session` + personal retention | `CARRY_FORWARD` |
| **3 — Exit-time licensing** | Calm moment, on the way out | Guest grants specific further occasions, with attribution preference | *(PART-64 surface)* |
| **4 — Return** | Later, unhurried | Widen, narrow, or withdraw | *(return signal)* |
| **5 — Standing** | Repeat contributor | Guest becomes a named steward with continuity | — |

**Rung 3 is the one to build first.** Rungs 0–2 largely exist. Rung 3 is where UGC becomes publishable, and it is currently absent.

**Withdrawal must be live from rung 1**, not added at rung 4. A guest who cannot retract at the moment they change their mind has not been given terms, only a form.

---

## "Other not named activities"

The instinct to leave activities unnamed is correct and should be protected architecturally.

**Do not enumerate activities. Define the grammar any activity emits.**

An unnamed activity is fully supported if it produces known grammar events — `CO_SIGN`, `TRIGGER`, `HOLD`, `CARRY_FORWARD`, `RESET` — and attaches transmission terms at the right rung. A tasting, a listening session, a walk, a kitchen, a game night, something nobody has run yet: all are the same to the system if they speak the grammar.

This is the modular philosophy from `STRATEGIC_FRAMEWORK.md` applied to participation rather than components: sliced deployment, composite integration, domain specificity preserved. It also means the activity taxonomy can stay open indefinitely without the governance layer needing to be reopened each time.

**Corollary:** resist any request to add an activity *type* to the schema. If an activity needs a new type, that usually means it needs a new grammar event — a much higher bar, and the right place for the scrutiny.

---

## Directorial pointers

1. **Answer the guest-steward question before building any UGC surface.** Graduated accession is the proposed answer; it needs a decision, not just a document. This gates everything else here.
2. **Wire PART-64 exit-time licensing to Transmission Terms.** This is the highest-value single connection available in the guest track — an existing designed surface becomes the terms-granting mechanism.
3. **Attach transmission-terms fields to `phigitalSession` Track 0.** Today Track 0 is deliberately identity-free. It needs to carry terms without acquiring identity — those are different things, and conflating them would break Fire 7's open entry, which is the most resolved thing we have.
4. **Build withdrawal at rung 1.** Not later. Cheap while little has travelled; near-impossible once ATProto carry-forward has propagated.
5. **Treat the GUEST stance (ENG-389) as the guest track's dependency**, not a parallel workstream. The stance lens gap is already flagged as blocking multi-stakeholder B2B; it blocks this too.
6. **Do not let UGC into Wave 1.** Wave 1 is 3–5 archive-grounded cards with named stewards — the easy stewardship case, deliberately. Guest contribution enters at Wave 2 or later, after the terms model has been exercised on material where stewardship is unambiguous.
7. **Keep the activity taxonomy closed and the grammar open.** New activity types are a smell; new grammar events are a decision.
8. **`no-commercial-adjacency` needs a default for guest contributions.** A guest contributing in a commercial venue has not agreed to their memory appearing beside a purchase prompt. Default it on; let widening turn it off explicitly.

---

## What I would look for in the gap map

When `ams-pipeline-gap-map.html` is available, the questions I would bring to it:

- **Where does guest-originated media enter the pipeline**, and does it enter before or after any terms are attached? (If before, that is the gap.)
- **The `#docker` section** — containerized render workers relative to GMI Cloud inference and Genblaze orchestration. Does a guest contribution get rendered before it is licensed?
- **Does `ams-host` render dispatch carry provenance**, or only codec and job parameters? RES-121 established `RenderJobRequest.codec` (`h264 | h265 | activeframe`) and `GET /capabilities`; if the render job has no terms field, rendered artifacts lose their terms at the pipeline boundary.
- **Where the gap map's gaps overlap the guest ladder** — specifically whether rung 3 has a pipeline representation at all.
- **Whether the pipeline assumes one-way flow.** Withdrawal requires reverse reach; a pipeline built as a one-way fan-out cannot honour retraction.

Upload it and I will mark this draft up against it.
