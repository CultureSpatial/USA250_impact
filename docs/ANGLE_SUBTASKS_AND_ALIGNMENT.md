# Angle Subtasks & Linear Alignment

**Date:** 23 September 2026
**Status:** Staged — Atlassian and Linear disconnected again after the first batch applied.

---

## Part 1 — Angle impact: yes, and it differentiates sharply

ENG-475 proposes a **required `terms` field on `BasePacket`** beside the already-required `provenance`. That change lands directly on angle, because every angle is a projection *of a packet*. If the packet must carry terms, every angle dispatch must check a grant.

The five angles do **not** carry equal risk, and treating them as one work item hides that.

| Angle | Fields published | Risk | Blocking need |
|---|---|---|---|
| **Seasonal** | `effectiveDates.from/.to/.seasonalContext` | **Low** — dates are not sensitive | None. But routes to **all five platforms**, so widest blast radius if the *packet* is ungoverned |
| **Place** | `fsqPlaceId`, `plusCode`, `mapillarySequenceId`, `siteType`, `physicalLocation`, `terroir` | **Medium** — publishes precise location | Venue authority: the co-signed `at://` record, not `fsqPlaceId` |
| **Maker voice** | `makerVoice`, narrativeLayer refs | **High** — practitioner-governed knowledge, PART-25 doctrine directly | `steward` + `grantedFor` including `open-social-carryforward` |
| **Economic** | `economicDeclaration.amountKey`, `.posture`, commercePacket | **High** — a practitioner's economic posture, auto-published | Explicit grant. Note `no-commercial-adjacency` is awkward here — this angle *is* commercial, so the condition needs a different expression |
| **Ritual** | `routeGraph`, `stops[]`, `afSequence` | **Highest** — publishes **edges** | Edge-level conditions, which do not exist anywhere yet. Longest pole. |

### The sequencing that resolves the tension

There is a real conflict between two true statements: *Spike 0b has been blocked three months on a dashboard login*, and *do not publish practitioner material without terms*.

**Both are satisfiable.** Connect the Zernio accounts and dispatch **Seasonal only** for Spike 2. It proves GROQ fetch, per-angle composition, ACTIVITY_KV correlation, `metadata` round-trip and the Port.io `contextRecord` upsert end-to-end — using the one angle whose payload is dates. Maker voice, Economic and Ritual stay gated behind terms.

This unblocks three months of finished engineering **today** without shipping a single ungoverned practitioner field.

---

## Part 2 — Angle subtasks (draft, parent ENG-358)

**A. `ANGLE_PLATFORMS` is a routing table doing permission's job**
Today it maps angle → platforms with no terms input. Either rename it to reflect that it is routing-only and add a separate grant check before dispatch, or make it terms-aware. Decide which; the current state is the ambiguity.

**B. Per-angle grant check at the vj-bot boundary**
Minimum viable enforcement: before `dispatchZernioDistribution()` fans out, check `grantedFor` includes the occasion implied by the target platforms. Refuse per-angle, not per-packet — a packet may legitimately publish Seasonal and withhold Maker voice.

**C. Seasonal-only dispatch flag for Spike 2**
Ship the sequencing above as a config, not a code fork. `ANGLE_ENABLED` allowlist, default Seasonal.

**D. Venue authority check for the Place angle**
Place publishes location. Gate on the co-signed `at://` venue record. `fsqPlaceId` and `plusCode` locate; they do not authorize.

**E. Edge conditions for the Ritual angle**
`routeGraph` edges carry editorial claims that no node's terms can catch. Needs a conditions model on edges before Ritual dispatches. Blocked on the shared terms primitive; flag as the longest pole so it is not discovered late.

**F. Economic angle — express the commercial condition correctly**
`no-commercial-adjacency` cannot mean "never adjacent to commerce" for an angle whose purpose is economic declaration. Needs its own condition vocabulary — likely "granted for economic disclosure at this amount posture."

**G. Register dimension for angle**
Angle has no Axis 3. A Maker voice angle in civic-memory register and in K-12 register are different posts. Decide whether angle composes with register or replaces it.

---

## Part 3 — Linear issues that can progress now

### Pure status alignment — no engineering, immediate

These are cases where the tracker lags shipped reality. Each is a status change, not work.

| Issue | Current | Reality | Action |
|---|---|---|---|
| **ENG-233** | Backlog | Its exact spec — hourly KV-freshness check, daily CPM rollup — is **implemented and running** in `vj-runner.scheduled()` | **Close as Done** |
| **ENG-184** | Backlog | The `venues` audit-leg contract **shipped**; the `vmfe-events` scaffold did not | **Split** — close the shipped leg, keep the scaffold open |
| **ENG-262 / RES-84** | Flagged by you as the same shape | Unverified | Audit and align |
| **ENG-360** | Open | ACTIVITY_KV binding live, write logic "fully implemented" per the packet design | Verify — likely another stale-status case |
| **BOT-1 deploy checklist** | Almost entirely unchecked | `venues` and `vj-runner` demonstrably have live D1, KV and R2 | Update checklist to provisioned reality |

**Recommend one pass over this class as a single work item.** Five instances found without looking for them means the true count is higher, and every one of them degrades the tracker's usefulness for exactly the request-time reasoning the substrate argument depends on.

### Progressable despite their blockers

| Issue | Blocker | What can still move |
|---|---|---|
| **FRM-6** | ENG-392 (dtc-component-library sync) | The **three-attribute split decision** (`data-grammar-state` / `data-emotion` / `data-spatial`) is a spec decision that does not need ENG-392. Author it now; apply to the Bit.dev shape when ENG-392 lands. Unblocks FRM-4 → SIG-1 thinking in parallel. |
| **BOT-64** | Zernio accounts | The code-complete portion can close. Split the close conditions: implementation vs live validation. |
| **ENG-111** | Done, but one open criterion | The `ams-host` provenance bridge should be its own issue rather than a checkbox on a closed ticket — it is shared with the AMS pipeline gap, SCID evidence and PART-35. |
| **ENG-389** | Framed as UI workstream | **Re-scope to authority model** and reprioritize. It blocks the guest track, multi-stakeholder B2B *and* the substrate — its current framing understates it. |
| **ENG-258** | One item remaining | Small, and unblocks full BrightBean automation. Cheap win. |

### Needs investigation before it can be scheduled

**`ACTIVITY_KV` binding ambiguity.** The name appears in three places — BOT-1's checklist (runner), `venues` ("own KV `ACTIVITY_KV`"), and the packet layer (vj-bot, id `9cc54ccab449415f81c0f6703b81386d`). Whether that is one namespace or three sharing a binding name is load-bearing for the campfire correlation contract in ENG-360. Resolve before ENG-360 is scheduled.

### Unblocked and waiting on nobody

**PART-135** (Canada RFQ family currency check) — Urgent, no dependencies, and the finding it is chasing may close four issues at once.

---

## Part 4 — Still pending on connectors

**Confluence pages** (bodies ready in repo):
1. Cross-Team Operating Plan — Phase 0 → 2 → `docs/CROSS_TEAM_OPERATING_PLAN.md`
2. American Lore Canopy → `docs/AMERICAN_LORE_CANOPY.md`
3. Axis 4 Redress → Transmission Terms → `docs/AXIS_4_REDRESS.md` (child of #2; the one for Cultural Governance)
4. Funding pathways §XI Public Humanities → append to existing page if mirrored

**Retitles:**
- **CEP-72**: `[CO][E] OPS-156 — `~~`Postiz`~~` **Brightbean** Publishing Seam Architecture: Platform Runbook + DM Routing`
- **FRM-6**: drop "Nordcraft" — ENG-396 migration to Rive + Bit.dev has moved the target

**Foundational doc edits (Linear):**
- Card Schema v1 — add `steward` (required), add `withdrawal`, promote consent fields to governing, note archive trace ≠ transmission grant
- Outlet Strategy — Postiz → Brightbean; add per-occasion `grantedFor` check to the outlet matrix
- Opportunity Radar — Postiz → Brightbean; add public-humanities funders; record the America250 "After the Fireworks" verification
