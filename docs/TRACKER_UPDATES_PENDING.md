# Tracker Updates — Pending Apply

**Date:** 17 September 2026
**Blocker:** Atlassian (Jira + Confluence), Linear, Attio and Sanity MCP servers all failed to connect this session (400 / `CLIENT_HTTP_NOT_IMPLEMENTED`). Connection failure, not a permissions problem — retry or reconnect and these apply as written.

Everything below is decided and ready to post. Local docs are already updated and pushed.

---

## JIRA

### CEP-75 — close as decided
**Transition:** → Done / Decided
**Comment:**
> Decision: **Brightbean**. Postiz is moot as of September 2026. This unblocks CEP-72 and the American Lore Wave 2 publishing rhythm, and removes the BC Tourism FC dependency. Follow-on cleanup tracked below.

### CEP-72 — retitle and rescope
**Current title:** `[CO][E] OPS-156 — Postiz Publishing Seam Architecture: Platform Runbook + DM Routing`
**New title:** `[CO][E] OPS-156 — Brightbean Publishing Seam Architecture: Platform Runbook + DM Routing`
**Comment:**
> Retitled per CEP-75. Seam is Brightbean; Postiz references in the description and in OPS-156 need scrubbing.

### CEP-29 — replace Axis 4 in the epic description
**Replace:**
> **Axis 4**: Surface CIP (public lore) → Deep CIP (oral tradition with contributor consent) → Benthic CIP (sacred/protected knowledge — no share without explicit gate)

**With:**
> **Axis 4 — Transmission Terms** (redressed Sept 2026, replaces CIP depth): `steward` · `grantedFor[]` (occasions: in-session, locale-card-public, open-social-carryforward, classroom-k12, archive-deposit, partner-institutional) · `attribution` · `conditions[]` (incl. `no-commercial-adjacency`) · `withdrawal` · `openQuestion`. Default is that **nothing circulates without named terms**; absence of a steward is a blocker, not a green light.

**Also update the success criterion:**
> …each expression carries correct **transmission terms**, and no commercial overlay is applied to material whose conditions include `no-commercial-adjacency`.

**Comment:**
> Axis 4 redressed — the CIP depth scale was abstract and out of line with the social practice model (PART-57 Adaptation crosswalk; PART-25 June rebase). Depth treats sensitivity as a property of content and locates authority in whoever classifies; transmission terms locate it with the steward. Full argument, migration table and open questions: `docs/AXIS_4_REDRESS.md`.
> The unimplemented "benthic gate" is **obsolete by redesign** rather than outstanding: nothing circulates without a named steward and a grant for that specific occasion.
> Epic also refreshed against the July foundational docs and the America250 premise verification (see below) — it had been four months behind its own strategy.

### NEW — CEP: Transmission Terms implementation
**Type:** Story · **Parent:** CEP-28 (execution layer) · **Labels:** `content-os`, `governance`, `civic-memory`
**Summary:** `[CO][E] Transmission Terms — Axis 4 implementation as shared primitive`
**Description:**
> Implements the Axis 4 replacement specified in `docs/AXIS_4_REDRESS.md`.
> Fields: `steward` (required, blocking) · `grantedFor[]` (multi-select occasions, not a ladder) · `attribution` · `conditions[]` · `withdrawal` (required — retraction path for already-distributed ATProto traces) · `openQuestion` (narrower terms govern where stewards disagree).
> Build **once** as a shared primitive across three threads that are the same shape — a claim, its steward, and the terms under which it circulates:
> • CEP-29 American Lore (lore circulation)
> • PART-25 attribution routing (value distribution)
> • PART-137 provenance / truth-in-labelling (origin disclosure)
> Promotes the Card Schema v1 invitation-path consent fields (attribution preference, consent requirements, governance flags) from metadata to governing status.
> `cipDepth` may survive only as a derived, non-authoritative display hint. It must not gate anything.
> **Do not fix the occasion vocabulary before validating against three real cases** — one state, one territory, one tribal nation locale.

### NEW — CEP: Archive rights clearance practice
**Type:** Story · **Parent:** CEP-29 · **Labels:** `civic-memory`, `governance`
**Summary:** `[CO] Archive rights clearance practice for LOC/AFC-sourced cards`
**Description:**
> Card Schema v1 requires an archive trace per card with a rights/usage note. LOC and American Folklife Center rights status varies per item. Needs a standing clearance practice, not per-card improvisation.
> **Critical distinction (see `AXIS_4_REDRESS.md` open question 4):** an archive citation is **not** a transmission grant. `archiveTrace` and `steward` are separate fields and must not be conflated. Institutional archive material may have clear rights and still have no living steward — that combination needs its own rule.

---

## CONFLUENCE

### New page — "Cross-Team Operating Plan — Phase 0 → 2"
**Space:** governance/ops space · **Body:** `docs/CROSS_TEAM_OPERATING_PLAN.md`
Canonical home for the phase model, the procurement glossary and gate decision rights — reaches partners and academic collaborators who are not in Linear. The glossary is the part worth circulating widest.

### New page — "American Lore Canopy — Directional Cluster Switch"
**Space:** same · **Body:** `docs/AMERICAN_LORE_CANOPY.md`
Records the FIFA → American Lore switch, the absorption of FIFA assets under CEP-29, and the America250 premise verification.

### New page — "Axis 4 Redress — Transmission Terms"
**Space:** same · **Body:** `docs/AXIS_4_REDRESS.md`
Child of the canopy page. This is the one to put in front of Cultural Governance.

### Update existing — funding pathways page (if mirrored)
Add §XI Public Humanities Pathway from `docs/FUNDING_PATHWAYS_UPDATED.md`.

---

## LINEAR

### CUL-80 — comment (foundational doc anchor)
> **Axis 4 redressed (Sept 2026).** CIP depth (Surface/Deep/Benthic) is replaced by **Transmission Terms** — steward, granted-for occasions, attribution, conditions, withdrawal, open question. Reason: the depth scale is abstract and misaligned with the social practice model; it treats sensitivity as a property of content and puts authority with the classifier rather than the steward. See `docs/AXIS_4_REDRESS.md`.
> Consequence for the **Card Schema v1** doc: the invitation-path fields (attribution preference, consent requirements, governance flags) are promoted from metadata to governing status, and a `withdrawal` field is added. Minimum-viable v1 card gains one required element: **named steward**.
> Consequence for the **Outlet Strategy** doc: the outlet matrix must check `grantedFor` per occasion. A card granted for `locale-card-public` is not thereby granted for `open-social-carryforward` — primer, live witness and return signal are three distinct grants, not one.

### Foundational docs — edits to apply
1. **American Lore Civic Memory Card Schema v1** — add `steward` as required; add `withdrawal`; promote consent fields to governing; note that archive trace ≠ transmission grant.
2. **American Lore Outlet Strategy** — replace Postiz references with Brightbean; add the per-occasion `grantedFor` check to the outlet matrix.
3. **American Lore Opportunity Radar** — replace OPS-156/Postiz references with Brightbean; add §XI public humanities funders (Federation of State Humanities Councils, LOC/AFC, Smithsonian CFCH, IMLS) to the external lanes; record the America250 "After the Fireworks" verification and its closing window.

### OPS-156 — comment
> Publishing seam is **Brightbean**; Postiz is moot (CEP-75 decided, Sept 2026). Scrub Postiz from this issue and from the two American Lore foundational docs that reference it.

### PART-137 — comment (Canada provenance thesis)
> Third sighting of the same primitive. Transmission Terms (CEP-29 Axis 4), attribution routing (PART-25) and provenance labelling (this issue) are all **a claim, its steward, and the terms under which it circulates**. Recommend building once rather than three times — spec in `docs/AXIS_4_REDRESS.md`.

### PART-25 — comment
> The June 2026 sovereignty rebase is the direct precedent for the Axis 4 redress: it replaced "practitioners as validation subjects" with practitioners who configure their own participation. Axis 4's CIP depth had reintroduced exactly the pattern this rebase removed. Now corrected — see `docs/AXIS_4_REDRESS.md`.

### NEW issue — Partnerships: public humanities pathway
**Team:** Partnerships · **Priority:** High · **Related:** PART-58, PART-137, CUL-80
**Title:** `Public humanities funding pathway — Federation of State Humanities Councils + By the People`
**Description:**
> New funding circuit, added as §XI of `FUNDING_PATHWAYS_UPDATED.md` at Tier 1. Distinct from the NSF technical-education circuit in funder, scale, cadence and review culture — typically $2K–$75K on weeks-to-months cycles, which is the only pathway that can fund **Wave 1 grounding** inside the current quarter.
> **Entry point:** "By the People: Conversations Beyond 250" — Federation of State Humanities Councils + Smithsonian Center for Folklife. 51 councils including DC and **four U.S. territories**. Themes explicitly include cooks alongside storytellers, so foodways is in scope by name.
> **Territory councils are the shortest path from the canopy to USVI Sound Clash**, whose replicability framework already names Hawaii, Puerto Rico, Guam and American Samoa.
> **Timing:** America250's "After the Fireworks" runs through the remainder of 2026 — roughly one quarter. Do not queue Wave 1 behind other threads.
> **Do not** route this through the NSF narrative. Different circuit, different language; conflating them weakens both.
> Study first: Illinois Voices 250, Alaska Humanities Forum Storytelling Fellowship, Alabama "Share Your Story".

### NEW issue — Cultural Governance: transmission terms as veto test
**Team:** Cultural Governance · **Priority:** Urgent · **Related:** CUL-80
**Title:** `Transmission Terms — operationalize the Phase 2 activation veto`
**Description:**
> `CROSS_TEAM_OPERATING_PLAN.md` gives Cultural Governance veto authority at Phase 2 activation but no concrete test. Under Transmission Terms the test becomes mechanical and record-answerable:
> 1. Is there a named steward?
> 2. Are terms granted for **this specific** occasion?
> 3. Is attribution honored as specified?
> 4. Are conditions satisfied (incl. `no-commercial-adjacency`)?
> 5. Is the withdrawal path live?
> Also owns open questions 2–4 in `docs/AXIS_4_REDRESS.md`: steward succession; honest scoping of withdrawal reach across ATProto (and disclosing that limit to stewards **before** they grant, not after); and institutional stewards where archive material has rights but no living steward.
