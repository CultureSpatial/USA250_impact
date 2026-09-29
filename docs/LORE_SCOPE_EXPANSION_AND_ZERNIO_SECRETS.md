# Lore Scope Expansion (Circuits + Ceremonies) & Zernio Secrets Checklist

**Date:** 29 September 2026
**Status:** Directional — connectors (Linear, Atlassian, Claude_Code_Remote) are down again, so this is reasoned from your description, not read from the updated docs. Reconcile against the actual Card Schema / Opportunity Radar / Outlet Strategy content once Linear reconnects.
**Repo work dropped per your instruction** — GrammarActor/BasePacket/`resolve()` stay fully specced (`SANITY_WORKFLOWS_TERMS_PLAN.md`, ENG-475/481/482) and ready for whoever has repo access; not tracked as a blocker here anymore.

---

## Part 1 — What "state fair circuit" and "harvest rituals and ceremonies" actually add

Two new content shapes, and they land on different parts of the machinery already built.

### State fair circuit → this is a `routeGraph`, and it makes the unbuilt edge-conditions gap concrete

A "circuit" is inherently multi-stop and multi-locale — several fairgrounds, likely sequenced across a season. That is exactly `placePacket.routeGraph` from the Ritual angle (`routeGraph`, `stops[]`, `afSequence`), and exactly the case `AXIS_PACKET_COMPARISON.md` §3 and `PACKET_ANGLE_ANALYSIS.md` §Ritual flagged as the **longest pole** in the whole terms model: *"routeGraph edges are governed content... a route asserts something no individual item's terms would catch."*

This was theoretical when written. It isn't anymore — a state fair circuit is precisely the object that needs it:

- **Packet-level steward for the circuit itself**, distinct from each fair's item-level steward. A state fair association or state department of agriculture is the natural candidate — this is the place-level steward pattern from `AXIS_PACKET_COMPARISON.md` §3 (mirroring PART-25's WGBC structure), now with a concrete first instance.
- **Edge conditions between stops.** Which fair leads to which, and in what order, is an editorial claim — sponsorship adjacency, competing-county sensitivities, and commercial-vendor placement all live in the edges, not the venue cards themselves.
- **Venue authority per stop** (ENG-482). Fairgrounds are exactly the venue-as-steward case from `BOT1_ADAPTIVE_SUBSTRATE.md` — each stop on the circuit should have its own co-signed `at://` venue record before it dispatches, not just a Foursquare/Plus Code location.

**Recommendation:** don't build the state fair circuit as a stack of independent Place-angle cards. Build it as one packet with a `routeGraph`, and treat it as the forcing function for the edge-conditions design that's been named but never scoped. If ENG-482 (venue-authority resolver) gets picked up, write it against this real case rather than a hypothetical one.

### Harvest rituals and ceremonies → Ritual angle content, and it exposes a specific leak in the "Seasonal is safe" assumption

This is the more urgent one.

`ZERNIO_DISPATCH_STATUS.md` rated the **Seasonal angle as zero governance risk** — "dates only, no practitioner content" — and recommended it as the angle to widen first (Rung 1, full platform fan-out, no terms gate needed). That rating assumed Seasonal's projected fields (`effectiveDates.from`, `.to`, `.seasonalContext`) never carry anything beyond scheduling metadata.

**Harvest rituals and ceremonies break that assumption if they get described in `seasonalContext`.** That field reads exactly like where an author would naturally write "this is our autumn harvest period — we hold [ritual name], practiced by [community]." If that happens, ceremony content — potentially practitioner-governed, potentially sacred, exactly the material Transmission Terms exists to gate — would ship through the one angle explicitly chosen because it needed no gate, to all five platforms, on the strength of a field that was never meant to carry anything sensitive.

This is a **new, concrete finding**, not a restatement of the general provenance-without-permission problem. It's specific: one field, on one angle, that was rated safe by assumption rather than by construction.

**Recommendation, before ENG-481 (Zernio Rung 1) proceeds:**
1. **Constrain `seasonalContext`** to a short enum or a small controlled vocabulary (e.g. `spring | summer | harvest | winter-holiday`) rather than free text — removes the leak path structurally rather than relying on editorial discipline
2. **If free text must stay**, add a content check: any packet whose `seasonalContext` references a named ritual, ceremony, or practice-specific term routes through the same terms gate as the Ritual angle, regardless of which angle is nominally dispatching
3. **Harvest ceremony content itself belongs on the Ritual angle**, with its own steward and `grantedFor`, not folded into Seasonal metadata — the Card Schema and Outlet Strategy patches already promote consent fields to governing status; this is the concrete case that makes "why" legible

This doesn't block Rung 1 — Seasonal-as-dates-only is still fine to widen. It blocks *assuming* Seasonal stays dates-only as scope grows, which is exactly what just happened.

---

## Part 2 — Numerous locales: the sequencing tension, restated concretely

`AMERICAN_LORE_CANOPY.md` recommendation 5 said pick the Wave 1 territory deliberately (one state, one territory, one non-state locale) specifically to prove the model before scaling, and flagged unstarted backlog volume (~55 CEP tickets, nearly all "To Do") as a Medium risk *already*, before this expansion.

"Numerous locale" is the opposite move from what Wave 1 was designed to test. That's not necessarily wrong — a state fair circuit is inherently multi-locale by definition, so some of this expansion is structural rather than scope creep — but it does mean:

- **Archive rights clearance (CEP-88) scales with locale count.** Each new locale is a new archive source with its own rights status. This was already going to block LOC-sourced cards; more locales means more instances of the same blocking question, not a new kind of problem.
- **Steward identification scales too**, and steward-naming is the harder bottleneck — clearance is paperwork, a named living steward is a relationship. Numerous locales means numerous relationships to establish before Wave 1 can ship a single card under the new required-steward rule (Card Schema v1 patch, applied this session).

**Recommendation:** if the circuit and ceremony content are structurally multi-locale, let Wave 1 prove the model on **one circuit and one ceremony**, not many of each — the same discipline as "one state, one territory, one non-state locale," applied to the new content types rather than abandoned because the shape changed.

---

## Part 3 — Zernio: CF Secrets Store vs GSM, checked

**I have no Cloudflare or GSM tool in this environment** — confirmed via search this turn, nothing matches. This can't be verified directly from here; it has to be a checklist for whoever holds dashboard/CLI access. Making it explicit and checkable:

### What "correct" looks like, per the Packet Publishing Layer's own security model (§6, quoted verbatim earlier in this engagement)

| Secret | Correct home | Explicitly wrong |
|---|---|---|
| `ZERNIO_API_KEY` | **CF Secrets Store**, bound as `Zernio_ApiKey` | Hardcoded in `wrangler.toml`; fetched from GSM at request time |
| `ZERNIO_WEBHOOK_SECRET` | **CF Secrets Store** | Same as above |
| CF Account ID | Static in `wrangler.toml` | **Never** fetched from GSM at runtime — this is stated as a rule in the source design, not a preference |

**GSM's role is origin, not runtime.** If GSM holds the master copy, that's fine — the rule is that Cloudflare Workers read from CF Secrets Store, not from GSM directly on each request. The design doc's own §6 draws this line explicitly.

### The checklist to run against the live account

1. `wrangler secret list` (or the CF dashboard Secrets Store view) on `vj-bot` — confirm `Zernio_ApiKey` and `ZERNIO_WEBHOOK_SECRET` are present as **Secrets Store bindings**, not plaintext `[vars]`
2. Grep `wrangler.toml` for `ZERNIO_API_KEY` — it should **not** appear as a literal value anywhere, only as a binding reference
3. Confirm no code path calls out to GSM's API at request time — the design intent is GSM (if used at all) populates CF Secrets Store at deploy/rotation time, not on every dispatch
4. If GSM **is** the current live source at runtime (contradicting the design), that's the finding — flag it as a drift between documented security model and actual deployment, the same shape as every other tracker-lags-reality case this engagement has found

**This belongs in the Rung 0 acceptance checklist** (`ZERNIO_DISPATCH_STATUS.md` §1) alongside "temporary diagnostic route removed" — same category of item: cheap to check, expensive to discover wrong after dispatch is live.

---

## Recommendations, in order

1. **Constrain or gate `seasonalContext`** before Rung 1 widens — the concrete new risk, cheapest to fix now
2. **Build the state fair circuit as one `routeGraph` packet**, not independent cards — forces the edge-conditions design to get real scope instead of staying hypothetical
3. **Route harvest ceremony content through the Ritual angle** with its own steward, not through Seasonal metadata
4. **Add the CF Secrets Store checklist to Rung 0's acceptance gate** — someone with dashboard access runs the four checks above
5. **Prove Wave 1 on one circuit and one ceremony**, not many — same grounding discipline as the original one-state/one-territory/one-non-state-locale design, applied to the new shapes rather than dropped
