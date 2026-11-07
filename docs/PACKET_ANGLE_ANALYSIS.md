# Packet Angle — What It Is, and the Lagging Reference

**Version:** 1.0
**Date:** 19 September 2026
**Source:** Packet Publishing Layer system design v1.6 (2026-06-21), parent ENG-358
**Answers:** (a) is *angle* differentiated editorial output, refinement, or something beyond editorial — and what is the TBD; (b) what is the lagging reference position

---

## 1. Angle is a projection, not an editorial output

The five angles — **Place, Maker voice, Ritual, Economic, Seasonal** — are each defined as a **field subset of one `placePacket` document**:

| Angle | Sanity fields |
|---|---|
| Place | `fsqPlaceId`, `plusCode`, `mapillarySequenceId`, `siteType`, `physicalLocation`, `terroir` |
| Maker voice | `layers[]` → narrativeLayer refs, `makerVoice` |
| Ritual | `routeGraph`, `stops[]`, `afSequence` |
| Economic | `ambientCommerce` → commercePacket, `economicDeclaration.amountKey`, `economicDeclaration.posture` |
| Seasonal | `effectiveDates.from`, `.to`, `.seasonalContext` |

That is a GROQ projection. The doc says so plainly: vj-bot "fetches packet content from Sanity via GROQ, composes per-angle copy."

**So the editorial act is downstream of the angle, not the angle itself.** The angle is the *selection*; the composed copy is the *expression*. Calling angle an editorial output puts the label on the wrong object — and that mislabel is what lets the governance gap in §3 stay invisible.

This is the same finding as `AXIS_PACKET_COMPARISON.md` §5: **projections are derived, never stored.** Angle is that species of thing.

---

## 2. Angle is a bundled traversal of Axes 1 → 2 → 5

Mapped against the Content OS axes, an angle does three things at once:

| Step | Axis | What angle does |
|---|---|---|
| Field selection | **Axis 1** (source) | Picks which `placePacket` fields participate |
| Composed copy | **Axis 2** (output shape) | Produces one post per angle |
| `ANGLE_PLATFORMS` routing | **Axis 5** (delivery) | place → instagram+pinterest; economic → linkedin+x; seasonal → all five |

> **Angle is a pre-composed path through axis space** — a named, reusable traversal from source fields to delivered surface.

That is genuinely useful, and it is why the packet publishing layer works at all: five paths, authored once, reused per packet.

**It is a refinement in that sense** — a hardening of routes that would otherwise be decided per post. But it is not *only* a refinement, because of what it leaves out.

---

## 3. The TBD: angle has no Axis 3 and no Axis 4

**Angle carries no register (Axis 3) and no transmission terms (Axis 4).**

`ANGLE_PLATFORMS` is **hardcoded**. There is no register consideration, no steward check, and no per-occasion grant anywhere between Sanity publish and Zernio dispatch. The only gate is the Taskade Genesis operator review (§2.8) — a human approving *drafts*, which is not the same as a terms check. An operator can approve what a steward never granted.

### Three concrete exposures

**Maker voice → TikTok + Instagram.** This angle publishes `makerVoice` text and narrativeLayer refs. Under PART-25's rebased doctrine that is **practitioner-governed knowledge**, and the practitioner configures the terms on which it enters circulation. The pipeline has no field for those terms and no check against them.

**Economic → LinkedIn + X.** This publishes `economicDeclaration.amountKey` and `economicDeclaration.posture`. A practitioner's economic posture, auto-routed to two public platforms. Nothing in the pipeline asks whether that was granted for `open-social-carryforward`.

**Ritual → Instagram + X.** This publishes `routeGraph` and `stops[]` — which is exactly the adjacency-as-editorial-claim problem named in `AXIS_PACKET_COMPARISON.md` §3. **A route from a sacred site to a commercial venue asserts something no individual item's terms would catch**, because the claim lives in the edge. This angle publishes edges, automatically, to two public platforms.

### So: beyond editorial

**Angle is a governance surface, and it is currently ungoverned.** That is the answer to the question. Not editorial output, not merely refinement — a projection that determines what leaves the room, and it currently makes that determination without reference to who permitted it.

### The TBD, stated precisely

1. **Does angle compose with register, or replace it?** A Maker voice angle in civic-memory register and in K-12 register are different posts. Currently angle has no register dimension at all.
2. **Where do terms attach — packet, angle, or edge?** §3 argues all three: packet-level steward, angle-level grant (`grantedFor` per occasion), edge-level conditions on `routeGraph`.
3. **Is `ANGLE_PLATFORMS` a routing table or a permission table?** Today it is routing. It is doing permission's job by accident.

---

## 4. The lagging reference position

### The surface-level lag: Postiz is still in the API path

The doc is v1.6 (2026-06-21). §1 already says the stack "must not require Postiz as the primary execution engine," and you confirmed Postiz is moot. But:

- §2.9: `POST /postiz/publish-webhook`
- §4.5: `POST /postiz/publish-webhook`
- Related synthesis: "Postiz Shape doc"

**This is worse than a stale title — it is a stale reference baked into an API contract.** Something will be implemented against that path. Rename before §10's "Zernio webhook handler location" decision closes, not after.

Also naming: this doc says **BrightBean**; the CEP tickets say **Brightbean**. Normalize.

### The deeper lag: provenance without permission

This is the real finding.

The pipeline is rigorous about **provenance**. `packetProvenanceToken` is minted by the ENG-262 relay, stored in `SHAPE_STORE`, persisted in the BrightBean draft, forwarded by Taskade at approval, and guarded at the vj-bot boundary. Leg 2 writes an OBSERVE record to `atproto-dock`. Port.io upserts a `contextRecord` per angle × channel. ACTIVITY_KV maps `zernio:{postId}` → `{packetId, angle}` for sub-second campfire correlation.

**Every one of those answers "where did this come from." None answers "was this allowed to go."**

A provenance token proves origin. It does not carry a grant. The entire publishing layer can prove the chain of custody of something it had no recorded permission to publish.

That is the lag: **the pipeline matured on the evidence axis and did not move on the permission axis.**

### Two ATProto write paths that do not know about each other

- **ENG-262 Leg 2** — `OBSERVE → atproto-dock /internal/observe`, a system observation record
- **ENG-111 `verified`** — a **participant-owned** ATProto social record emitted on `CO_SIGN`, described as a Governed Relation

Both write to ATProto. One is the system observing; the other is the participant owning. Nothing reconciles them, and they mean opposite things about authority. If the packet publishing layer emits OBSERVE records for content whose participant-owned `verified` record was never created, ATProto carries the system's account of an encounter that the participant never co-signed.

**GrammarActor does not appear anywhere in this document.** For a publishing layer moving practitioner knowledge to public platforms, that absence is the structural gap.

### `ams-host` is absent too

`GRAMMAR_ACTOR_RECONCILIATION.md` §7 found that ENG-111's one open acceptance criterion — the `ams-host` provenance bridge — is the same gap as the AMS pipeline gap map. This document describes a parallel publishing path (Sanity → Daytona → BrightBean → vj-bot → Zernio) with no reference to `ams-host` at all.

Whether these are two stages of one pipeline or two pipelines is genuinely unclear from the material, and it should be resolved explicitly rather than discovered later.

### The operational lag that costs the most

**Spike 0b has been "OPERATOR ACTION REQUIRED" since 21 June.** `accounts: []` — no social accounts connected in the Zernio dashboard.

The dispatch code is complete (`zernio-distribution.ts`, payload shape corrected and confirmed). ACTIVITY_KV is live. The relay is deployed. **A fully-implemented publishing layer has been blocked for three months on a dashboard login.** Nothing in this analysis is worth more than that: it is a ten-minute task gating Spike 2 and every downstream spike.

Secondary: `ZERNIO_DELIVERY_QUEUE` (Gap 3) does not exist, so there is currently no retry buffer in front of a free-tier engine with documented sleep cycles. Any Zernio downtime is lost posts, not delayed ones.

---

## 5. Recommendations

1. **Connect the Zernio accounts.** Three months of finished engineering is parked behind it.
2. **Rename the `/postiz/publish-webhook` route** before the §10 handler-location decision closes.
3. **Add terms to the angle contract.** Minimum viable: a `grantedFor[]` check per angle before dispatch, and a steward reference on the packet. Without it, Maker voice and Economic angles publish practitioner-governed material on an operator's say-so.
4. **Add edge-level conditions to `routeGraph`** before the Ritual angle dispatches. Adjacency harm cannot be caught at item level.
5. **Reconcile the two ATProto write paths.** Decide whether OBSERVE may precede a participant `verified` record, and say so explicitly.
6. **Decide whether `ams-host` and the Zernio path are one pipeline or two.**
7. **Create `ZERNIO_DELIVERY_QUEUE` before first live dispatch**, not after — a free-tier engine without a retry buffer will lose posts, and lost posts in this layer are unrecoverable practitioner content.
8. **Re-baseline the doc to v1.7** with Postiz removed, Brightbean normalized, and a Permission section added alongside the existing Security and Observability sections. The absence of that section is the lag in a sentence.
