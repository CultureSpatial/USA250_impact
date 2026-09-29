# Axis Model × Packet Angle — Comparison, Learning Diff, and Sanity Reproducibility

**Version:** 1.0
**Date:** 19 September 2026
**Status:** Analytical. Linear and Sanity connectors are down this session, so "packet angle" is reconstructed from `placePacket` references across the thread rather than read from its own definition. Flagged inline where that matters.

**Reconstruction basis:** `placePacket.routeGraph` (RES-121 Fire 2) · OPS-80 / CEP-66 Place Packet Induction Surface — affinity routing + contributor node seeding · PART-122 Spatial Passport · CEP-37 placePacket authoring (city nodes) · CEP-42 visitor-journey content matrix from Place Packet metadata · CEP-52 / FRM-9 authoring register labels for `loreEntry` **and** `placePacket`.

---

## 1. The two models

### Axis model (Content OS, CEP-29)

Per-item and **analytic**. It decomposes one content object along five dimensions.

| Axis | Dimension |
|---|---|
| 1 | Source type — `loreEntry`, `storyGem`, `audioNarrative` |
| 2 | Output shape — OTW record, `dtc-host-letter` component, ATProto record |
| 3 | Register — civic memory / foodways / heritage; K-12 educational |
| 4 | **Transmission terms** — steward, grantedFor[], attribution, conditions, withdrawal, openQuestion *(redressed; see `AXIS_4_REDRESS.md`)* |
| 5 | Delivery — DOM → ATProto |

### Packet angle (`placePacket`)

Per-place and **synthetic**. It composes many items around a locale, and adds two things no single item has:

- **Adjacency** — `routeGraph`: which item leads to which
- **Induction** — how someone enters the place at all, plus affinity routing and contributor node seeding

### The structural relation

> **A placePacket is a set of axis-tuples plus a route graph plus an induction surface.**

The packet does not replace the axes. Every item inside it still has axis coordinates. What the packet contributes is everything *between* items — sequence, adjacency, entry — which the axis model has no vocabulary for at all.

---

## 2. Comparison

| | Axis model | Packet angle |
|---|---|---|
| Unit | One content item | One place / locale |
| Operation | Decompose | Compose |
| Core question | What is this, and under what terms does it move? | What travels together here, in what order, and how do you enter? |
| Governance locus | Per-item terms (Axis 4) | **Undefined** — see §3 |
| Editorial act | Authoring a piece | Authoring a route |
| Blind spot | Adjacency, sequence, entry | Per-item terms |
| Existing bridge | Card Schema "next suggested card / route"; "route adjacency model" and "state / territory starter pack template" listed as next design extensions | — |

**A "starter pack" is a placePacket.** The Card Schema already anticipated the packet angle in its own future-work list without naming it as such. That is the cleanest available seam between the two models.

---

## 3. The gap the comparison exposes

This is the substantive finding, and it is currently unsolved.

> **Axis 4 defines transmission terms per item. A packet bundles many items. What are the terms of a packet?**

Four candidate answers:

1. **Intersection — narrowest governs.** Safe, but one community-held item makes the whole packet unpublishable. Over-restricts into uselessness.
2. **Union.** Leaks. Rejected outright.
3. **Per-item, evaluated at render time.** Correct, but the packet then has no stable terms of its own, and the intersection logic must live in exactly one place or it will drift per surface.
4. **Packet carries its own steward**, distinct from item stewards.

**Proposed: 3 + 4 together.** A packet has a **place-level steward** governing the bundle and the route graph; each item retains its own terms; rendering intersects them per occasion.

**This is not a new invention — it is PART-25's structure.** WGBC governs how BC wine knowledge enters circulation (packet level) while practitioners hold their own terms (item level). The rebased five-step corridor flow is a packet-level governance model that already exists and was arrived at independently. That convergence is strong evidence the shape is right.

### The sub-gap nobody has named

**Route graph edges are governed content.**

Which items sit adjacent to which is an editorial claim about a place. A route leading from a sacred site to a commercial venue asserts something, and asserts it without any item's terms being violated — because the claim lives in the *edge*, not the nodes.

So `routeGraph` edges need their own terms, minimally `no-commercial-adjacency` at edge level. Item-level terms cannot catch this class of harm. Nothing in the current model addresses it.

---

## 4. Learning diff

**What the axis work taught us** (`AXIS_4_REDRESS.md`):
- Sensitivity is relational, not intrinsic — a property of a relationship under conditions, not of content
- Authority belongs with stewards, not classifiers
- An abstraction that resists implementation is usually not describing anything actionable

**What the packet angle adds:**
- Adjacency is an editorial act and therefore governable
- Terms must **aggregate**, and aggregation is not obvious
- Place-level stewardship is a distinct role from item-level stewardship
- Induction — how someone enters — is a first-class concern the axis model omits entirely

**What neither model has: time.**

Neither axes nor packets express *when*. Season appears inside the Card Schema (associated season, seasonal rhythm) as content, but there is no temporal dimension in either model. Yet the entire publishing rhythm — primer → live witness → return signal — is temporal, and the guest ladder (`GUEST_TRACK_AND_UGC.md`) is explicitly about grants widening *over time*.

**Recommendation:** do not add a time axis. Time belongs in `grantedFor` occasions (which are already temporal — `in-session` is a moment) and in packet-level cadence. Adding a sixth axis would repeat the CIP depth error of inventing a scale where a relation belongs.

---

## 5. Reproducibility with Sanity-powered processes

Sanity is already the authoring and schema home in this stack: CEP-31 (Sanity webhook → Workers AI → KV shape store), CEP-32 (Sanity document → DTC web component attribute bridge), ENG-89 (Studio Console Relay), RES-111 (Sanity input/intake spec), RES-71 (Sanity entity types before mod.io).

> **Connector caveat:** Sanity MCP is down this session, so the schema shapes below are proposals against the documented pipeline, not reads of deployed schemas. Verify `get_schema` before implementing.

### What gets stored vs derived

| Axis | Sanity treatment |
|---|---|
| **1 — source type** | The document type itself (`loreEntry`, `storyGem`, `audioNarrative`) |
| **2 — output shape** | **Derived.** A GROQ projection, not a stored field |
| **3 — register** | Reference to a register taxonomy document |
| **4 — transmission terms** | Embedded object: `steward` (**reference**), `grantedFor[]`, `attribution`, `conditions[]`, `withdrawal`, `openQuestion` |
| **5 — delivery** | **Derived.** Projection target |
| **packet** | Document type with `items[]` (references), `routeGraph` (edge array, each edge carrying its own `conditions[]`), own `transmissionTerms`, own `steward` |

**Axes 2 and 5 must not be stored.** They are projections. Storing them duplicates truth and guarantees drift — and CEP-29's success criterion ("two distinct output shapes from one `loreEntry`") is precisely a statement that they are derived.

### The five properties that make it reproducible

1. **Schema-as-code.** Sanity schemas live in a repo, versioned. The axis model becomes a deployable artifact rather than a document — the same model deploys to any dataset or tenant. This is what makes CEP-30's multi-tenant backbone claim testable.
2. **GROQ projections as output shapes.** One source document, many outputs, no duplication. Projections are diffable and reviewable like any code.
3. **Validation rules as governance.** `steward` required → publish blocked without it. The Transmission Terms default inversion ("nothing circulates without named terms") stops being a policy statement and becomes a **write-time constraint**. This is the single highest-value implementation detail here: governance enforced at write, not at review.
4. **References, not copies.** Steward is a linked entity, so "what does this steward govern" is one query, and a withdrawal is one document edit that cascades rather than an audit across copies.
5. **Existing webhook pipeline.** Sanity → Workers AI → KV already exists. Terms travel inside the document payload, so the pipeline needs no separate permission channel.

### Reproducibility test

Run **one card** through the full path in **three registers × two occasions** and verify the outputs differ correctly:

- civic memory × `locale-card-public`
- civic memory × `open-social-carryforward`
- K-12 × `classroom-k12`
- K-12 × `open-social-carryforward` *(should be refused unless explicitly granted)*
- foodways × `locale-card-public`
- foodways × `archive-deposit`

This is CEP-29's own multi-tenant expression test (CUL-84 civic memory vs CUL-80 K-12) made concrete. If the K-12 × open-social case does not refuse by default, the terms model is not actually wired — it is decorative.

### Where this breaks — known limits

- **Terms intersection has no native Sanity concept.** Custom projection logic, and it must live in exactly one place. If each surface implements its own intersection, the model is gone within two surfaces.
- **Withdrawal across ATProto.** Sanity can unpublish; already-federated records do not retract. This is open question 3 in `AXIS_4_REDRESS.md`, and the limit must be disclosed to stewards *before* they grant.
- **Edge-level terms on `routeGraph`** are unusual in a CMS and need deliberate design. Do not defer this — §3 shows item-level terms cannot catch adjacency harm.
- **`cipDepth` must not survive as a field**, not even as a display hint. If it exists, something will gate on it.

---

## 6. Recommendations

1. **Adopt packet-level stewardship** (place steward + item stewards + render-time intersection), explicitly modeled on PART-25's existing WGBC structure rather than designed fresh.
2. **Add edge-level conditions to `routeGraph`.** Adjacency is an editorial claim and needs terms. Currently unaddressed anywhere.
3. **Keep Axes 2 and 5 derived.** Store nothing that a projection can produce.
4. **Implement the steward requirement as a Sanity validation rule**, not a review step. Governance at write time is the difference between a model and a memo.
5. **Do not add a time axis.** Put time in occasions and packet cadence.
6. **Run the 3×2 reproducibility test before Wave 1 ships**, and treat the K-12 × open-social refusal as the pass/fail case.
7. **Reconcile against ENG-111, FRM-6 and the grammar actor definition** when Linear returns — §3's per-occasion evaluation is likely where grammar actor attaches, since choosing who may emit an event in a packet context is exactly an occasioned selector.
