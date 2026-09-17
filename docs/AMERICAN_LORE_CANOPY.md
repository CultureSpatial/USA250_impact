# American Lore Canopy — Directional Cluster Switch

**Version:** 1.0
**Date:** 17 September 2026
**Supersedes:** the FIFA 2026 directional cluster as the organizing frame
**Sources:** CEP-29 (Jira epic + cluster), three Linear foundational documents, external premise verification

---

## What changed

The directional cluster switches from **FIFA 2026** to **American Lore × Civic Memory** as the canopy.

This is the right move and it is better-timed than the Canada thread. Critically, it is **absorption, not closure** — the FIFA material becomes source input under the new canopy rather than being written off.

---

## The canopy: CEP-29 and the CEP epic structure

Jira CEP (Content Enable and Process) carries four epics:

| Epic | Scope |
|---|---|
| **CEP-28** | Content OS Execution Layer — 5-Axis Pipeline to Tenant Output |
| **CEP-29** | **American Lore × Civic Memory — Content Pipeline Instances** ← the canopy |
| **CEP-30** | Organizational Species — Content OS as Multi-Tenant Backbone Proof |
| **CEP-86** | Martha live-surface capability build (CF resource-native) |

CEP-29's stated purpose: American lore and civic memory are "the highest-signal content cluster in the current Linear foreground," representing "Axis 3 (civic memory register) at its most loaded — content that carries cultural sovereignty pressure and cannot be collapsed into marketing copy."

**CEP-30 is worth noting separately:** it names the Organizational Species thesis as a *multi-tenant backbone proof*. The strategic framework's core claim now has a Jira epic testing it as an engineering property, not just a positioning statement.

### The FIFA absorption

The FIFA work is now **children of CEP-29**:

- **CEP-74** — FIFA Host City Brand Book Network, "Let's Play X" Co-Brand Activation Layer
- **CEP-70** — RES-63 FWC ritual translation patterns
- **CEP-71** — RES-65 Football translation prompt library

This resolves the open question flagged in `CROSS_TEAM_OPERATING_PLAN.md`, which held the FIFA cluster as un-phaseable pending a reframe. The reframe exists: **FIFA becomes translation-pattern and co-brand source material feeding the civic memory canopy.** Ritual translation patterns and a football prompt library are reusable assets regardless of whether the tournament is ahead or behind us. That is a better outcome than the closure path.

### CEP-29 cluster (18 children)

Civic memory core: CEP-54 (CUL-84 USA250 Cultural Dossier — "Is Apple Pie Still the American Taste?"), CEP-55 (CUL-80 Literacy Progression + American Lore Civic Memory).

Grammar and register: CEP-43 (COR-1 Affective Interaction Grammar), CEP-44 (COR-5 Zone Register Map), CEP-46 (COR-7 Theatre of the Mind hold sequence), CEP-48 (COR-15 Game Night Locale-Sync), CEP-50 (FRM-1 Ritual + Threshold), CEP-63 (CUL-77 Theatre of the Mind canonical term), CEP-64 (CUL-79 Corridors & Champions), CEP-65 (RES-68 first-surface interaction grammar).

Corridor and activation: CEP-47 (COR-13 wine radar / Wine Flies Free), CEP-61 (CUL-87 Wine Flies Free National Wine Day), CEP-62 (RES-59 PNW Food Story one-pager — WSWC/Alaska corridor).

---

## The 5-axis Content OS model

CEP-29 maps American lore content across five axes. This is the operative content architecture:

| Axis | Dimension | Values for American Lore |
|---|---|---|
| **1** | Source type | `loreEntry`, `storyGem`, `audioNarrative` |
| **2** | Output shape | OTW carry-forward record, `dtc-host-letter` web component, AT Protocol record |
| **3** | Register | Civic memory / American foodways / cultural heritage — *and* K-12 educational as a distinct register |
| **4** | **CIP depth** | **Surface** (public lore) → **Deep** (oral tradition, contributor consent) → **Benthic** (sacred/protected — no share without explicit gate) |
| **5** | Delivery | DOM (web component) → AT Protocol (OTW record as cultural carry-forward) |

**Axis 4 is the governance spine.** CIP depth is a graduated disclosure model, and it is what makes this content cluster different from marketing copy. CEP-29's success criterion states it plainly: two distinct output shapes from one `loreEntry`, each carrying correct `cipDepth` metadata, with **no commercial overlay applied to benthic-CIP content**.

The CUL-84 / CUL-80 tension named in the epic is the multi-tenant test: the same lore content must generate different output shapes for civic-memory register versus K-12 educational register.

---

## Foundational documents (Linear, all anchored to CUL-80)

### 1. American Lore Civic Memory Card Schema v1

The source object. A **portable public memory object**, explicitly "not a tourism card and not only an archive citation," letting a participant encounter a locale, learn one grounded thing, understand continuity and change, connect food heritage to ecology, carry a memory trace forward, and contribute back.

Ten field groups: locale identity, archive trace, food heritage signal, ecology link, then→now continuity, contemporary expression, anthropological sound bite, invitation path, continuity/measurement hooks, publishing hooks.

**Locale types include `territory` and `tribal nation / Indigenous homeland`** alongside state, city, region, watershed and corridor node. That is load-bearing — see below.

Two rules worth carrying into every downstream artifact:
- *"If the card cannot produce one clear sound bite in everyday language, it is not yet ready for public mobile release."*
- Governance: distinguish archive record from editorial interpretation from community contribution; allow uncertainty to remain visible; do not flatten contested or plural histories into one voice.

### 2. American Lore Outlet Strategy

Maps each card through a three-phase **continuity choreography**: **primer** (seeds context before encounter) → **live witness** (makes the locale socially present) → **return signal** (carries memory back after encounter). Each outlet expression is a transformed view of one source object, not a divergent asset.

Outlet matrix assigns Bluesky/ATProto to primer + return signal (best open-social continuity surface), Instagram to primer, Discord to live witness + return, web editorial as canonical home. **LinkedIn is assigned to public-humanities and partner surfaces** — relevant to the funding lane below.

### 3. American Lore Opportunity Radar — the strategic thesis

Five external opportunity lanes: America250 storytelling surface; state and territory humanities councils; Library of Congress / American Folklife Center; Smithsonian food-history programs; open social / portable record layer (ATProto).

Three waves: **Wave 1** grounding (3–5 starter cards from Library of Congress foodways/folklife sources; **one state, one territory, one non-state locale frame**); **Wave 2** publishing rhythm via OPS-156; **Wave 3** partner radar.

Thesis: American Lore as a **state-and-territory civic memory program** that begins with archive cards and grows into a contributor-fed continuity network.

---

## Premise test: is America250 still live?

Given that this engagement has now hit three stale premises (NSF SCiPE closed, FIFA concluded, BC standing offers likely closed to entry), the canopy's central external dependency was tested before adoption rather than after.

**It passes, and more strongly than expected.**

- **America250 continues past 4 July 2026.** Its **"After the Fireworks"** initiative explicitly sustains national momentum for civic participation, service, innovation and education **through the remainder of 2026**.
- **"By the People: Conversations Beyond 250"** — a joint initiative of the **Federation of State Humanities Councils** and the **Smithsonian Center for Folklife and Cultural Heritage**. This collapses *two* of the Opportunity Radar's five lanes into one addressable program.
- **51 humanities councils participate, including DC and four U.S. territories.** This validates the Wave 1 "one state, one territory" design directly.
- Program themes: *remembering together, harmonizing together, moving together, building together*. Participants explicitly include **cooks** alongside musicians, artists, poets, craftspeople and storytellers — foodways is in scope by name, not by stretch.
- Live precedents to study: **Illinois Voices 250** (Illinois Humanities + StoryCorps Studios), **Alaska Humanities Forum** Storytelling Fellowship, **Alabama "Share Your Story"** oral history.

**Timing caveat, stated honestly:** "After the Fireworks" is scoped to the remainder of 2026 — roughly 3.5 months from today. "Conversations Beyond 250" implies continuation past that, but the *national organizing intensity* is a closing window, not an open-ended one. This argues for Wave 1 grounding now rather than sequentially after other work.

---

## What the canopy resolves

**1. The FIFA cluster.** Absorbed as translation patterns and co-brand layers under CEP-29, not closed.

**2. USVI Sound Clash revives.** The card schema's `territory` locale type, Wave 1's explicit "one state, one territory" design, and America250's four participating territory humanities councils together give `USVI_SOUND_CLASH_STRATEGY.md` a live national program to attach to. The replicability framework in that document (Hawaii, Puerto Rico, Guam, American Samoa) maps onto the territory council network. **Note the earlier instinct was right in a specific way:** USA250 was correctly removed as a *deadline*; it returns here as a *canopy*, which is a different role.

**3. Mobile-first convergence.** The card schema is explicitly mobile-first with layered reveal, swipeable timeline, audio-first where possible. This is the same Layer 3 mobile deployment surface as the SCID engine. One infrastructure investment, two products.

**4. CIP depth ↔ BC provenance convergence.** Axis 4 (Surface → Deep → Benthic) is a graduated disclosure system over claims about origin. The BC "Crafted in BC" truth-in-labelling problem (PART-137) is also a graduated disclosure system over claims about origin. **These are the same machine pointed at different objects** — the third instance of this pattern, after PART-25's attribution routing. Worth treating as a shared primitive rather than three implementations.

**5. Indigenous content pathway.** `tribal nation / Indigenous homeland` as a first-class locale type, plus benthic CIP, plus the CARE/OCAP work already done, plus PART-58's Indigenous creator thread. These should be one governed pathway, not parallel efforts.

---

## New funding surface — a real gap in current documentation

`FUNDING_PATHWAYS_UPDATED.md` covers NSF (ATE, Regional Innovation Engines, SBIR) and EU rails. It does **not** cover public humanities, which is the canopy's natural funding home:

- **State and territory humanities councils** (NEH-affiliated) — 51 of them, already organized around this exact content
- **Library of Congress / American Folklife Center** — source base and legitimacy layer
- **Smithsonian Center for Folklife and Cultural Heritage** — already co-running By the People
- **IMLS** — has a standing America250 partnership program (and already appears in the USVI strategy)
- **Federation of State Humanities Councils** — the network-level entry point

This is a **different review culture, different grant scale, and different institutional fit** from NSF technical-education money. Humanities council grants are typically smaller and faster than NSF awards, which suits Wave 1 grounding. It is a genuine pathway gap and should be added rather than assumed covered.

---

## Risks and gaps

| Risk | Severity | Note |
|---|---|---|
| **CEP-75 blocks the publishing seam** | **High** | "[DECISION] Brightbean vs Postiz — publishing seam reconciliation (blocks CEP-72 + BC Tourism FC)." Both the Outlet Strategy and Opportunity Radar depend on OPS-156 as the publishing runtime, and the CEP tickets are inconsistent — CEP-72 says Postiz, CEP-76/77/78 say Brightbean. **Wave 2 cannot proceed until this decision lands.** This is the critical path item and it is not currently flagged as such. |
| **Benthic CIP has no named gate mechanism** | **High** | Axis 4 specifies "no share without explicit gate" but the gate is unimplemented. Publishing sacred/protected material without it is the highest-consequence failure available here. Cultural Governance veto territory — must be closed before any Wave 1 card touching protected knowledge. |
| **Epic/doc drift** | Medium | CEP-29 created and last updated 19 May 2026 — untouched for four months. The Opportunity Radar was updated 30 July. The strategy is newer than the epic that carries it. |
| **Unstarted backlog volume** | Medium | ~55 CEP tickets, nearly all "To Do". The canopy is well-specified and barely executed. Wave 1 is 3–5 cards; resist expanding scope before one card ships end-to-end. |
| **America250 window closing** | Medium | National organizing intensity is scoped to the remainder of 2026. Wave 1 should not queue behind other threads. |
| **Archive rights and usage** | Medium | Card schema includes rights/usage note per archive trace. LOC materials vary in rights status. Needs a standing clearance practice, not per-card improvisation. |

---

## Phase mapping (per `CROSS_TEAM_OPERATING_PLAN.md`)

| Work | Effort phase | Note |
|---|---|---|
| America250 premise verification | **0 — complete** | Passed, documented above |
| Humanities council funding pathway scan | **0** | New; not yet in funding documentation |
| CEP-75 publishing seam decision | **1** | **Blocks Wave 2 — highest priority in the cluster** |
| Benthic CIP gate mechanism | **1** | Blocks any protected-knowledge card. CUL owns. |
| Archive rights clearance practice | **1** | Blocks LOC-sourced cards |
| Wave 1 — 3–5 starter cards | **2** | One state, one territory, one non-state locale |
| Wave 2 — primer/live/return rhythm | **2** | Blocked on CEP-75 |
| Wave 3 — partner radar | **2** | By the People is the identified entry point |

---

## Recommendations

1. **Resolve CEP-75 first.** A publishing-seam decision blocking both Wave 2 and BC Tourism FC is the cheapest high-leverage unblock available. It is a decision, not a build.
2. **Name the benthic CIP gate before any card ships.** This is the one failure mode here that cannot be walked back.
3. **Add public humanities to the funding pathways document.** Federation of State Humanities Councils, LOC/AFC, Smithsonian CFCH, IMLS. Different scale and cadence from NSF; suits Wave 1.
4. **Target "By the People" as the Wave 3 entry point** — it already combines two of the five opportunity lanes and includes territory councils.
5. **Pick the Wave 1 territory deliberately.** USVI has an existing strategy document and a territory humanities council. That is the shortest path from canopy to shipped artifact.
6. **Refresh CEP-29** to reflect the July strategy documents and the America250 verification, so the epic stops being four months behind its own foundational docs.
7. **Treat graduated disclosure as a shared primitive** across CIP depth (lore), attribution routing (PART-25), and provenance labelling (PART-137) — one design, three applications.

---

## Sources

- CEP-29 and cluster — Jira, Content Enable and Process project
- [American Lore Civic Memory Card Schema v1](https://linear.app/aria-x/document/american-lore-civic-memory-card-schema-v1-50732c45f89b)
- [American Lore Outlet Strategy](https://linear.app/aria-x/document/american-lore-outlet-strategy-mapping-civic-memory-cards-to-primer-6296779bbf54)
- [American Lore Opportunity Radar](https://linear.app/aria-x/document/american-lore-opportunity-radar-usa250-foodways-civic-memory-and-open-faf388677779)
- [America250](https://america250.org/) · [America250 — IMLS](https://www.imls.gov/our-work/partnerships/america250)
- [By the People: Conversations Beyond 250 — Federation of State Humanities Councils](https://www.statehumanities.org/bythepeople/)
- [51 Humanities Councils Join National Initiative](https://www.statehumanities.org/by-the-people-announcement/)
- [Illinois Voices 250](https://thelansingjournal.org/2026/04/15/join-statewide-storytelling-initiative-illinois-voices-250-with-illinois-humanities-storycorps-studios/)
