# BOT-1 — From Illustrative Scaffold to Adaptive Substrate

**Version:** 1.0
**Date:** 23 September 2026
**Call:** BOT-1 is reflective and illustrative, and has not evolved to be adaptive to current state. This is the juxtaposition that forces the action.

> **Updated 23 Sept 2026 — BOT-1 read in full.** The thesis below holds. Three things sharpen it, and **one recommendation was wrong and is corrected in §7**. BOT-1 already carries two self-audits (2026-08-19, `venues` and `vj-runner`) that independently found the scaffold stale — in *both* directions. See §0.

---

## 0. What BOT-1 actually says — and what its own audits found

The scaffold is what the title promises: `vinejocket-router` as substrate entry, with Service Bindings to `vj-bot` (PII boundary, tokens, ATProto PDS), `vj-runner` (SPA surface, PlacePackets, Sanity), `vj-voice` (V&V prompts, Story Gems, Felt), and `venues`. Shared package carries `domain.ts`, `tokens.ts`, `packets.ts`, `b-r-v.ts`, `vv-themes.ts`, `ensemble.ts`, `slots.ts`.

**BOT-1 has already audited itself twice, and both audits found drift — in opposite directions:**

| Worker | Scaffold said | Reality (2026-08-19, checked directly) |
|---|---|---|
| `venues` | Workers-for-Platforms **dispatch namespace** — dynamic multi-tenant plugout | **Never built.** Shipped as a standard Hono Worker, a peer Service Binding. The abstract WFP model was abandoned in practice. |
| `vj-runner` | "stub — PlacePacket KV→Sanity, webhook, R2 stream, Phaser/Meta Horizon ingest" | **Massively understated.** 15+ live routes, 2 running crons, 3 R2 buckets, 2 Vectorize indexes, a Queue producer, Workers AI. Phaser/Meta Horizon ingest has *no trace in code* — abandoned, not built. |

So the scaffold is not merely behind. It **over-specifies what was never built and under-specifies what shipped**, simultaneously. That is the strongest possible case that a component scaffold cannot track a living system: it describes parts, and parts drift silently in both directions.

### The stale-status pattern is systemic

BOT-1's own audit names it: *"Same stale-status shape found earlier with ENG-262/RES-84."* Two more instances are in the same text — **ENG-233 is marked Backlog while its exact spec (hourly KV-freshness check, daily CPM rollup) is already implemented and running**, and ENG-184's `venues` audit leg shipped ahead of the rest of that issue.

This is the same failure this thread has hit repeatedly from the other side: Postiz living on in an API path, FIFA pre-activation framing surviving the tournament, RFQ24 dates outliving their solicitations, CIP depth specified but never implemented. **The tracker cannot be used to reason about what exists.** That is not a hygiene problem; it is an observability problem, and it is the reason a substrate has to resolve state at request time rather than trust a declared topology.

### Two details that matter more than they look

**`BasePacket` requires `provenance`. It has no terms or steward field.** `packets.ts` is described as "Multi-interface `BasePacket` (7-layer stack); **required** `provenance`; `EconomicDeclaration` with `amountKey`". The provenance-without-permission finding from `PACKET_ANGLE_ANALYSIS.md` §4 is not a pipeline oversight — **it is encoded in the shared type system.** Provenance is mandatory at the type level; permission is absent from it.

**`venues` and `vj-runner` share one D1 database** (`vinejocket-db`, same `database_id`). Peer workers isolated by Service Bindings, with a shared-state backdoor underneath. The substrate boundary is porous by construction, which means a guard at any single binding does not hold.

Also worth resolving: `ACTIVITY_KV` appears as a binding name in three places — the BOT-1 deploy checklist (runner), `venues` ("own KV `ACTIVITY_KV`"), and the packet publishing layer (vj-bot, id `9cc54ccab449415f81c0f6703b81386d`). Whether that is one namespace or three sharing a name is unclear and load-bearing for the campfire correlation contract.

### `b-r-v.ts` is the multi-interface canonical definition

`InterfaceType` (T/CC/CO/E/A), `MetabolicMode`, `INTERFACE_RATIOS` live in `shared`. The CEP tickets already use `[CO]` and `[CC]` and `[E]` as interface tags, so this vocabulary is in active editorial use.

**Interface type and stance are orthogonal and both are needed.** `InterfaceType` answers *what kind of surface this is*; the stance lens (GUEST/OPERATOR/VENUE/PROTOCOL) answers *who may act here*. Neither substitutes for the other, and only the first currently exists in code.

---

## 1. What "illustrative" means here, precisely

BOT-1 names **parts**: Bot, Runner, Voice, and a Router between them. That is a component decomposition. It answers *what exists*.

Everything discovered in this thread says the hard problems are not in the components. They are in the **seams** — and a component scaffold has no vocabulary for a seam:

| Discovery | Where the problem actually lives |
|---|---|
| Packet angle (`PACKET_ANGLE_ANALYSIS.md`) | Between projection and dispatch — five angles publish with no terms check |
| GrammarActor (`GRAMMAR_ACTOR_RECONCILIATION.md`) | Between event and transition — no actor guard on `CO_SIGN` |
| Transmission terms (`AXIS_4_REDRESS.md`) | Between steward and occasion |
| Packet governance (`AXIS_PACKET_COMPARISON.md`) | Between items — `routeGraph` edges carry ungoverned editorial claims |
| Multi-stance lens (ENG-389) | Between actor and surface — four stances, unbuilt |

A scaffold that lists Bot / Runner / Voice cannot express any of these, because each of them is a **decision made at request time**, not a component that exists at rest. That is the gap between illustrative and adaptive.

---

## 2. Multi-interface venue/location access — five identity systems, one authority

The recall about venue/location access is the sharpest case, because the fragmentation is already visible in shipped fields.

At least five venue identity systems are in play:

| System | Field / state | Question it answers |
|---|---|---|
| FSQ / Overture | `fsqPlaceId` | Where is this place in a commercial POI graph? |
| Plus Code | `plusCode` | Where is this on a geographic grid? |
| Mapillary | `mapillarySequenceId` | What does this place look like? |
| Niantic VPS 2.0 | `pose-matching` → `pose-verified` | Am I physically here, right now? |
| **AT Protocol** | `proto-resolving` → co-signed `at://` venue record | **Who governs this place?** |

**Only the last one carries authority.** The first four carry location — they are increasingly precise ways of saying *where*, and none of them says *whether*.

FRM-6 describes `proto-resolving` as "the moment the `at://` venue record is being co-signed." That is the same primitive as GrammarActor's `verified` — a co-sign that establishes a governed relation.

### The consequence: venue is a steward

> A venue that co-signs its `at://` record is exercising **Authority to Control** over what circulates from its space. That is the steward role from Transmission Terms, at place scale.

This resolves something that has been circling this thread. `AXIS_PACKET_COMPARISON.md` §3 proposed a **place-level steward** governing a packet while items retain their own terms, and noted it was PART-25's structure arrived at independently. The `at://` venue record is that steward, and it already exists as a state in the CSS contract.

---

## 3. The stance lens is the authority model, not a UI feature

With venue-as-steward established, the four stances (ENG-389) stop looking like view modes and resolve onto the terms model:

| Stance | Authority | Grammar capability |
|---|---|---|
| **GUEST** | Steward of own contribution only, acquired by graduated accession | May `TRIGGER`; may `CO_SIGN` own contribution; never on another's behalf |
| **OPERATOR** | Facilitation, no claim on material | May `HOLD`, `RESET`; **may not** `CO_SIGN` for a guest or venue |
| **VENUE** | Steward of place; co-signs the `at://` venue record | Governs what may circulate *from here*; can withhold regardless of item terms |
| **PROTOCOL** | The terms themselves | Enforced regardless of the other three; the floor nobody can lower |

This explains why ENG-389 keeps surfacing as a blocker across unrelated work — B2B multi-stakeholder contracts, the guest track, the packet layer. **It is not a UI gap. It is the missing authority model**, and every surface that needs to know "who may do what here" is blocked on the same thing.

---

## 4. What "adaptive" requires: the Router becomes a resolution layer

A Router that dispatches by message type is illustrative. An adaptive substrate resolves, **per request**, four things before anything executes:

| Resolution | Question | Source of truth |
|---|---|---|
| **Stance** | Who is acting? | ENG-389 stance lens |
| **Venue** | Where, and has this place co-signed? | `at://` venue record — *not* FSQ/plusCode/VPS, which locate but do not authorize |
| **Grammar state** | Where are we in the machine? | GrammarActor (`idle`/`induction`/`hold`/`carry`/`verified`) |
| **Terms** | What is granted for *this* occasion? | Transmission terms — `grantedFor[]` |

Only then does it dispatch to Bot, Runner or Voice.

**The Router is where the actor guard belongs.** `GRAMMAR_ACTOR_RECONCILIATION.md` §8 put it in the machine. That is right but insufficient — the packet publishing layer reaches Zernio without passing through GrammarActor at all. If the guard lives only in the machine, every path that bypasses the machine bypasses the guard. Putting it in the Router makes it unbypassable, which is the difference between a rule and a constraint.

### Concretely, the substrate must be able to refuse

An adaptive substrate has a **refusal path as a first-class outcome**, not an error case:

- Venue has not co-signed → refuse, do not degrade to FSQ identity
- Stance lacks capability → refuse, name which stance would be required
- Terms not granted for this occasion → refuse, and record the refusal
- Grammar state does not permit this transition → return to `hold`

A scaffold has no refusal semantics because nothing in it decides. That single addition is most of what separates illustrative from adaptive.

---

## 5. Why now — the cost of leaving BOT-1 illustrative

This is the force behind the call.

**Three local solutions to one problem are already in flight.** `data-state` accumulated three orthogonal dimensions in one attribute. `ANGLE_PLATFORMS` became a permission table by accident while being written as a routing table. Postiz got baked into a live API path and outlived the decision that retired it. Each was a locally reasonable choice made without a substrate to resolve against.

**The packet layer is about to dispatch.** Spike 0b needs only a dashboard login, at which point five angles begin publishing practitioner-governed material to five platforms with no terms check and no venue authority check. Once that is live, retrofitting authority means recalling published material rather than gating it.

**The evidence axis has outrun the permission axis.** `packetProvenanceToken`, OBSERVE, `contextRecord`, ACTIVITY_KV, EBPI founding traces — all mature. Nothing answers *was this allowed*. A substrate that resolves terms at request time is the only place that question gets asked once instead of five times inconsistently.

---

## 6. The action

**Evolve BOT-1 from component scaffold to substrate specification**, with the Router as resolution layer.

1. **Re-scope BOT-1** from "what parts exist" to "what the substrate resolves before dispatch" — stance, venue, grammar state, terms.
2. **Specify refusal as a first-class outcome**, with a recorded reason, not an exception.
3. **~~Move the actor guard into the Router~~ — corrected.** Putting the guard in the Router is **insufficient**, and BOT-1 says why: `apps/ams-host` binds `VENUES` **directly**, not via `vinejocket-router`, across three real proxy call sites — with a local-JSON-store fallback when the binding is absent. A live, shipped consumption path already bypasses the Router, and its fallback *degrades to local state rather than refusing*, which is a second hole in the same path.
   **Correct placement: resolution belongs in `substrate/packages/shared`**, called by every entry point, not chokepointed at one. That fits the existing architecture rather than fighting it — `shared` already owns `domain`, `tokens`, `packets`, `b-r-v` and `slots`, and every worker depends on it. Concretely: **add a required `terms` field to `BasePacket` alongside the already-required `provenance`**, and a `resolve()` function in `shared` that returns stance, venue authority, grammar state and grant — or a typed refusal. Type-level enforcement reaches paths a Router never sees.
4. **Declare the `at://` venue record the sole venue authority.** FSQ, Plus Code, Mapillary and VPS locate; they do not authorize. Write this down before another surface treats `fsqPlaceId` as sufficient.
5. **Bind ENG-389 to BOT-1** as the authority model rather than a UI workstream, and reprioritize accordingly — it is blocking more than its current framing suggests.
6. **Gate the packet layer on substrate resolution** before Spike 2 dispatches live. A terms check at the vj-bot boundary is the minimum; Router resolution is the correct version.
7. **Reconcile the two ATProto write paths** (ENG-262 OBSERVE vs GrammarActor `verified`) inside the substrate, since both are venue/participant authority claims and currently neither knows about the other.

### What this does not require

Not a rewrite. Bot, Runner, Voice and the Router all stay. The change is that the Router acquires a resolution responsibility it does not currently have — and that responsibility is assembled from work that already exists: the stance lens, the `at://` venue co-sign, GrammarActor's states, and transmission terms. **The parts are built. What is missing is the thing that asks them a question before acting.**
