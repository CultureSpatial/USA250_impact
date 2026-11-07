# Zernio Dispatch — Status & Widening Ladder

**Date:** 23 September 2026
**Status:** Spike 0b/2 (Instagram-only, Seasonal angle) — **built out per the runbook in `SANITY_PLATFORM_REVIEW_2026.md` §3**

---

## 1. What "built out" means here

The operator action from `SANITY_PLATFORM_REVIEW_2026.md` §3 — connect Zernio, resolve account IDs via the temporary `vj-bot` diagnostic route, set `ZERNIO_ACCOUNT_INSTAGRAM` + `ANGLE_ENABLED=seasonal` + `ANGLE_PLATFORM_OVERRIDE=instagram`, deploy — is treated as complete. This document assumes that state and defines what comes next.

**Not independently verified from this environment** — Cloudflare and Zernio dashboards are outside this workspace. Treat the verification checklist below as the acceptance gate before calling Spike 2 closed, not as already-confirmed.

### Acceptance checklist (confirm against the live dashboards)

- [ ] One Zernio post created for a test packet, `status` progressed to `published`
- [ ] `metadata.packetId` + `metadata.angle` survived the round-trip into the Zernio webhook
- [ ] `ACTIVITY_KV` key `zernio:{postId}` → `{packetId, angle:"seasonal"}` written
- [ ] Port.io `contextRecord` upserted with correct `packetId` + `angle` + `channel`
- [ ] Temporary `/internal/zernio/accounts` diagnostic route **removed** from `vj-bot` (it returned account IDs once; leaving it live is an unnecessary exposure of the account list behind the `ZERNIO_API_KEY`-backed lookup)

If any box is unchecked, the widening steps below should not proceed — the chain hasn't yet proven itself even at the narrowest scope.

---

## 2. Widening ladder

Each rung requires the platform/account work on the left and the terms gate on the right. **Do not skip a terms gate to save a rung** — that was the whole point of starting at Seasonal/Instagram instead of all five angles at once.

| Rung | Angle | Platforms to connect | Terms gate required | Ready? |
|---|---|---|---|---|
| **0 (done)** | Seasonal | Instagram | None — dates only, no practitioner content | ✅ |
| **1** | Seasonal | + Pinterest, TikTok, LinkedIn, X (full `ANGLE_PLATFORMS` fan-out) | None | Ready once acceptance checklist above is green |
| **2** | Place | Instagram, Pinterest | **Venue authority** — co-signed `at://` venue record. `fsqPlaceId`/`plusCode` locate, do not authorize (see `BOT1_ADAPTIVE_SUBSTRATE.md` §venue) | Blocked — venue authority check not yet implemented anywhere in the dispatch path |
| **3** | Maker voice | TikTok, Instagram | `steward` + `grantedFor` incl. `open-social-carryforward` (PART-25 doctrine) | Blocked — no terms field on `BasePacket` yet |
| **4** | Economic | LinkedIn, X | `grantedFor` + a **redefined** commercial condition (current `no-commercial-adjacency` wording doesn't fit an angle whose purpose is economic declaration — see `PACKET_ANGLE_ANALYSIS.md` §Economic) | Blocked — condition vocabulary undefined |
| **5** | Ritual | Instagram, X | **Edge-level conditions on `routeGraph`** — no item-level term catches adjacency harm | Blocked — longest pole, no edge conditions model exists |

**Recommendation: stop at Rung 1 until `SANITY_WORKFLOWS_TERMS_PLAN.md`'s Phase 1 ships.** Rung 1 is safe (Seasonal has no sensitive fields) and validates the full fan-out mechanics — five platforms, five `ANGLE_PLATFORMS` entries — without touching governance at all. Rungs 2–5 all require the terms/authority work below.

---

## 3. Immediate next action

Widen Seasonal to its full platform set (Rung 1) — this is pure infrastructure validation, zero governance risk, and it's the cheapest way to prove `ZERNIO_DELIVERY_QUEUE` behavior (still Gap 3, still unbuilt) actually matters once volume is more than one platform.

```
# workers/vj-bot/wrangler.toml [vars]
ANGLE_ENABLED = "seasonal"
# remove ANGLE_PLATFORM_OVERRIDE — let ANGLE_PLATFORMS resolve normally:
#   seasonal → instagram, tiktok, linkedin, x, pinterest
```

Connect the remaining four accounts (TikTok, LinkedIn, X, Pinterest) the same way Instagram was connected. **Still do not export `ZERNIO_API_KEY` locally** — reuse the `vj-bot` diagnostic route pattern, or re-add it temporarily and remove it again after.

**Before widening past Rung 1:** create `ZERNIO_DELIVERY_QUEUE` (Gap 3). Five platforms without a retry buffer against a free-tier engine with documented sleep cycles means five ways to silently lose a post instead of one.

---

## 4. What unblocks Rungs 2–5

See `docs/SANITY_WORKFLOWS_TERMS_PLAN.md` for the concrete build plan. Summary of what each rung needs:

- **Rung 2 (Place)** needs the venue-authority resolver — reads the `at://` venue co-sign, refuses if absent. This is a small, self-contained piece and could ship before the full terms model.
- **Rungs 3–4 (Maker voice, Economic)** need the `terms` field on `BasePacket` plus the `resolve()` gate in `substrate/packages/shared`.
- **Rung 5 (Ritual)** needs edge conditions on `routeGraph`, which nothing in the current plan has designed yet — flag as a distinct design task, not a subtask of the others.
