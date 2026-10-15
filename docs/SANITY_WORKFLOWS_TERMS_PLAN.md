# Transmission Terms — Sanity Workflows + Substrate Binding Build Plan

**Date:** 23 September 2026
**Supersedes:** the sketch in `AXIS_4_REDRESS.md` and the recommendation in `SANITY_PLATFORM_REVIEW_2026.md` §4
**Status:** Design-complete, unimplemented. Ready to hand to Engineering.

---

## 0. The constraint this plan is built around

**Workflows is beta.** Don't build the only gate between practitioner material and publication on a beta feature with capped, partly-unpublished limits. So: **one terms model, two bindings.**

```
                    ┌─────────────────────────┐
                    │   Terms Model (shared)   │   ← single source of truth
                    │  steward · grantedFor[]  │
                    │  attribution · conditions │
                    │  withdrawal · openQ       │
                    └───────────┬──────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              ▼                                    ▼
   ┌───────────────────────┐         ┌──────────────────────────────┐
   │  Sanity Workflow stage │         │ substrate/packages/shared     │
   │  (content tier, beta)  │         │ resolve() (runtime tier, GA)  │
   │  gates Sanity publish  │         │ gates dispatch/render/co-sign │
   └───────────────────────┘         └──────────────────────────────┘
```

If Workflows changes shape or limits before GA, the runtime-tier binding still holds. Neither binding is optional — the content tier stops ungoverned material from leaving Sanity; the runtime tier stops it from being dispatched even if it somehow got out.

---

## 1. The shared type (do this first — it's GA, no beta risk)

Add to `substrate/packages/shared/packets.ts`, alongside the already-required `provenance`:

```ts
export interface TransmissionTerms {
  steward: DID | CommunityBodyRef          // required — absence blocks, not defaults to permissive
  grantedFor: Occasion[]                    // multi-select, NOT a ladder
  attribution: AttributionPreference
  conditions: Condition[]                   // e.g. { type: 'no-commercial-adjacency' } | economic-specific variants
  withdrawal: WithdrawalPolicy | null        // null = not yet exercisable; see §4
  openQuestion?: { note: string; narrowerTermsGovern: true }
}

export type Occasion =
  | 'in-session'
  | 'locale-card-public'
  | 'open-social-carryforward'
  | 'classroom-k12'
  | 'archive-deposit'
  | 'partner-institutional'

export interface BasePacket {
  // ...existing 7-layer stack...
  provenance: Provenance      // already required
  terms: TransmissionTerms    // NEW — required, same weight as provenance
}
```

**`terms` is required, not optional.** A packet with `provenance` and no `terms` currently type-checks; after this change it won't. That's deliberate — it's the type-level fix named in `BOT1_ADAPTIVE_SUBSTRATE.md` §0's "provenance-without-permission" finding.

**Validate the vocabulary before fixing the `Occasion` enum.** `AXIS_4_REDRESS.md` §Open Questions already flags this — the six values are a starting set, not a spec. Run them against three real cases (one state, one territory, one tribal nation locale via the American Lore canopy) before treating the enum as closed.

---

## 2. Runtime-tier gate — `substrate/packages/shared/resolve.ts` (GA, build this second)

```ts
export type ResolveResult =
  | { ok: true; stance: Stance; venueAuthority: VenueRecord; grammarState: GrammarState; grant: Occasion }
  | { ok: false; reason: RefusalReason }

export type RefusalReason =
  | 'no-steward'
  | 'no-grant-for-occasion'
  | 'venue-not-cosigned'          // fsqPlaceId/plusCode/VPS present, at:// record absent
  | 'stance-lacks-capability'     // e.g. GUEST attempting CO_SIGN on another's behalf
  | 'grammar-state-forbids'       // e.g. CO_SIGN attempted outside carry→verified transition

export function resolve(
  packet: BasePacket,
  requestedOccasion: Occasion,
  actor: { stance: Stance; did?: DID },
): ResolveResult {
  // 1. steward check
  if (!packet.terms.steward) return { ok: false, reason: 'no-steward' }
  // 2. grant check — per-angle, not per-packet (PACKET_ANGLE_ANALYSIS.md §sequencing)
  if (!packet.terms.grantedFor.includes(requestedOccasion)) {
    return { ok: false, reason: 'no-grant-for-occasion' }
  }
  // 3. venue authority — only for occasions that publish location (Place angle)
  // 4. actor guard — GUEST/OPERATOR/VENUE/PROTOCOL capability check (ENG-475 table)
  // 5. grammar state — cross-check against GrammarActor position if a session traceId is present
  // ...
}
```

**Call sites, in priority order** (each is a place that currently dispatches with no check):

1. `vj-bot` `dispatchZernioDistribution()` — before the per-angle Zernio fan-out. This is what unblocks Rungs 2–5 in `ZERNIO_DISPATCH_STATUS.md`.
2. `apps/ams-host` `VENUES` direct-bind call sites (`/registry/readiness`, `/sync/fibery`) — per `BOT1_ADAPTIVE_SUBSTRATE.md`, this path bypasses the Router entirely, so it must call `resolve()` itself rather than trust an upstream check.
3. GrammarActor's `CO_SIGN`/`CARRY_FORWARD` transition guards (ENG-475) — `resolve()` backs the guard rather than duplicating its logic.

**A refusal is a typed value, not a thrown error.** Every call site handles `{ ok: false, reason }` as an expected branch. This is the "refusal as first-class outcome" requirement from `BOT1_ADAPTIVE_SUBSTRATE.md` §4, made concrete.

---

## 3. Content-tier gate — Sanity Workflow (beta, build this third, non-blocking)

**Workflow stages**, modeled after Sanity's own documented pattern (person submits → agent checks → advances or returns):

```
draft
  → pending-steward-grant     [blocks here if terms.steward is empty]
  → granted                   [terms.grantedFor is non-empty; corresponds to
                                GrammarActor's `verified` state per
                                GRAMMAR_ACTOR_RECONCILIATION.md §4]
  → published
```

**Function config, given the constraints found in `SANITY_PLATFORM_REVIEW_2026.md` §1.7:**

```
executionTimeout: 30s   // NOT the 10s default — the venue-authority check
                        // makes an external call to resolve the at:// record
```

**Mutation-chain awareness:** if the `pending-steward-grant → granted` transition mutates the document (stamping resolution metadata), track the chain depth. A publish → Function → mutate → Function loop reaches the 16-deep cap faster than it looks like it would, especially once retries are involved.

**This stage is what Agent Actions' approval already does NOT cover.** Per `SANITY_PLATFORM_REVIEW_2026.md` §2.3: approving a draft edit is content-integrity review, not a terms grant. The `pending-steward-grant` stage is the thing that's actually missing from the existing Changes-panel flow — don't mistake one for the other when this ships.

---

## 4. Withdrawal — scope it honestly before building it

Per `AXIS_4_REDRESS.md` open question 3 and `GRAMMAR_ACTOR_RECONCILIATION.md` §4: ATProto records propagate. A `WITHDRAW` event (ENG-475) can:

- Remove the Sanity document from the `granted` workflow stage (stops future dispatch)
- Mark `ACTIVITY_KV` entries for withdrawal (stops campfire correlation from surfacing it)
- Request retraction on the emitted `at://` record (may not fully propagate — federated copies may persist)

**Disclose exactly this list to a steward before they grant, not after.** `withdrawal: WithdrawalPolicy | null` in the type above is deliberately not a boolean — it should carry which of the three actually applies for a given occasion, since e.g. `archive-deposit` may not support any of them.

---

## 5. Build order

1. **`TransmissionTerms` type + required `terms` field on `BasePacket`** — GA, no dependencies, unblocks nothing by itself but is the foundation everything else needs
2. **`resolve()` in `substrate/packages/shared`**, wired into `vj-bot` dispatch first (highest-traffic path, unblocks Rung 2 of the Zernio ladder)
3. **Venue-authority sub-check** — smallest standalone piece, ships Rung 2 (Place angle) on its own before the rest of `resolve()` is complete
4. **Wire `resolve()` into the `ams-host` direct `VENUES` bind** — closes the bypass BOT-1's own audit found
5. **`WITHDRAW` event + guard table in GrammarActor** (ENG-475) — needs `resolve()`'s refusal types to be stable first
6. **Sanity Workflow stages** — beta, lowest urgency of the six, but cheapest to prototype since it doesn't touch the runtime path

---

## 6. Cross-references

- `docs/AXIS_4_REDRESS.md` — original Transmission Terms vocabulary
- `docs/GRAMMAR_ACTOR_RECONCILIATION.md` — why `verified` ↔ `granted` stage is the tier join
- `docs/BOT1_ADAPTIVE_SUBSTRATE.md` — why `substrate/packages/shared`, not the Router
- `docs/PACKET_ANGLE_ANALYSIS.md` — per-angle risk that drives the widening sequencing
- `docs/ZERNIO_DISPATCH_STATUS.md` — the ladder this plan unblocks
- `docs/SANITY_PLATFORM_REVIEW_2026.md` — maturity/limits/Resonance findings this plan incorporates
- Linear **ENG-475** (staged edit pending connector) — should be re-scoped to reference this plan directly rather than describing the runtime gate in isolation
