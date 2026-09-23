# BOT-1 — From Illustrative Scaffold to Adaptive Substrate

**Version:** 1.0
**Date:** 23 September 2026
**Call:** BOT-1 is reflective and illustrative, and has not evolved to be adaptive to current state. This is the juxtaposition that forces the action.

> **Caveat:** Linear is still unreachable, so BOT-1's body has not been read. This works from its title — *Execution Substrate: VMFE greenfield scaffold (Bot/Runner/Voice + Router)* — its architectural parent ENG-22 (*Bot+Runner+Voice — Three-Layer Execution Substrate*), OPS-158 (*BOT/RUNNER/VOICE panels*), and what this thread has established. Correct against the real text when the connector returns.

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
3. **Move the actor guard into the Router** so paths that bypass GrammarActor (notably the packet publishing layer) cannot bypass the guard.
4. **Declare the `at://` venue record the sole venue authority.** FSQ, Plus Code, Mapillary and VPS locate; they do not authorize. Write this down before another surface treats `fsqPlaceId` as sufficient.
5. **Bind ENG-389 to BOT-1** as the authority model rather than a UI workstream, and reprioritize accordingly — it is blocking more than its current framing suggests.
6. **Gate the packet layer on substrate resolution** before Spike 2 dispatches live. A terms check at the vj-bot boundary is the minimum; Router resolution is the correct version.
7. **Reconcile the two ATProto write paths** (ENG-262 OBSERVE vs GrammarActor `verified`) inside the substrate, since both are venue/participant authority claims and currently neither knows about the other.

### What this does not require

Not a rewrite. Bot, Runner, Voice and the Router all stay. The change is that the Router acquires a resolution responsibility it does not currently have — and that responsibility is assembled from work that already exists: the stance lens, the `at://` venue co-sign, GrammarActor's states, and transmission terms. **The parts are built. What is missing is the thing that asks them a question before acting.**
