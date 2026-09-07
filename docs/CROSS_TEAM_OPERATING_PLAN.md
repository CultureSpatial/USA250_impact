# Cross-Team Operating Plan — Phase 0 → 2

**Version:** 1.0
**Date:** August 2026
**Purpose:** Get the current effort into cross-team participation with a shared vocabulary, explicit phase gates, and named decision rights.

---

## How to use this document

This is the **coordination layer** between strategy documents and Linear issues. It does not restate strategy (see `STRATEGIC_FRAMEWORK.md`, `CANADA_STRATEGIC_LENS.md`) and it does not duplicate issue detail (see Linear). It answers three questions the other artifacts leave open:

1. **What stage is a given thread actually in**, and what has to be true before it advances
2. **Which team owns which concern** at that stage
3. **Where the output goes** — Linear, Jira CEP, or Jira GSBF

Read the glossary first if you are not on Partnerships. Half the coordination failures in this effort trace to procurement vocabulary that one team uses fluently and another has never seen.

---

## Glossary — procurement terms in active use

| Term | Meaning | Why it matters here |
|---|---|---|
| **SOA — Standing Offer Agreement** | A pre-negotiated arrangement where a supplier agrees to provide defined goods/services at prearranged prices, terms, and conditions, for a set period. **It is not a contract.** | PART-57's MID funnel stage is entirely SOA-based. Being on one unlocks work; it does not guarantee revenue. |
| **Call-up** | The instrument that turns an SOA into an actual contract. The buyer issues a call-up against pre-set terms — **no further competition**. | This is where money actually moves. PART-57 estimates SOA placement unlocks <$500K of call-ups. |
| **Task order** | Practical equivalent of a call-up — a specific piece of work drawn down against the standing arrangement. | PART-57's BOTTOM funnel stage ("Digital Terroir Workshop", $60K). |
| **RFSO / RFSA** | Request for Standing Offer / Supply Arrangement — the competitive posting through which suppliers get *onto* an SOA. | **The critical constraint:** you generally cannot join an existing standing offer between competitions unless a refresh window is open. |
| **Refresh window** | A periodic re-opening that lets new suppliers join an existing SOA mid-term. | If the RFQ24 family has no refresh window, PART-57's MID stage is unreachable until re-compete. This is PART-135's core question. |
| **Pre-qualification** | Getting onto a buyer's evaluated supplier list ahead of specific opportunities. | PART-57's TOP funnel stage. One-time admin that creates "no-bid runway". |
| **RFI** | Request for Information — market scan, not a purchase. Often precedes an RFQ/RFP. | PART-58 (RFI26DBC68) is the most recent-vintage Canada item. |
| **BC Bid** | British Columbia's procurement marketplace — where solicitations post and suppliers register. | PART-136. Canadian analogue of SAM.gov. |
| **SAM.gov** | US federal entity registration. Mandatory, annual renewal, blocks award if lapsed. | OPS-210. |
| **Uniform Guidance (2 CFR 200)** | The rules governing US federal **grants** (as distinct from FAR, which governs contracts). | OPS-211. NSF SBIR is a grant — this is why we do not need DCAA-grade accounting at Phase I. |
| **Indirect rate** | The negotiated percentage covering overhead not chargeable as a direct cost. | Must be settled *before* budget submission. Changes depending on PART-139's answer. |

### The SOA finding, stated plainly

**Standing Offer Agreements are the highest-leverage position in BC provincial procurement, and they are also the hardest to enter off-cycle.** PART-57 built its entire mid-funnel on three SOAs. If those were awarded in 2024 on three-year terms with no refresh window, the funnel's middle is closed until roughly 2027 — and the 2027–2028 dates sitting on PART-59/60/61 are term-end markers, not deadlines. That single question gates four issues, which is why PART-135 is Urgent.

---

## Phase model

> **Disambiguation — read this before using the word "phase" in a cross-team channel.**
> RES-121 uses Phase 1/2/3 for the **runtime** (PartyKit Phase 1 live; Phase 2 gated on ENG-15 tokens; Phase 3 gated on FRM-12 Room spec). This document uses Phase 0/1/2 for **effort stage**. They are unrelated scales. Always qualify: "runtime Phase 2" or "effort Phase 1".

| Phase | Name | Question it answers | Failure if skipped |
|---|---|---|---|
| **0** | Premise Validity | Is this still real? | Effort spent against closed programs and dead framings — the NSF SCiPE failure, repeated |
| **1** | Readiness | Can we actually transact if it is real? | Award blocked by a lapsed registration or an unshaped ledger |
| **2** | Activation | Are we delivering and capturing evidence? | Work done that cannot be reported, credentialed, or audited |

Phases are **gates, not a schedule.** A thread can sit in Phase 0 for two quarters. Nothing advances on elapsed time.

---

## Phase 0 — Premise Validity

**Owner: Partnerships (PART), with Research & Participation (RES) on evidence.**

### Concerns

1. **Is the program/solicitation open?** Status, closing date, award state, refresh window. Never author proposal content against an unverified solicitation.
2. **Is there a budget holder, by name?** Not an institution — a person or office that controls the money.
3. **Is the buyer solvent?** A distressed sector does not buy discretionary pilots at list price.
4. **Is the framing politically viable?** Cross-border, sovereignty, and trade exposure change faster than our documents do.
5. **Has the premise been re-tested in the last two quarters?** If not, it is presumed stale.

### Exit criteria

- Every named program/solicitation has a verified status with a source link
- A budget holder is identified, or the thread is explicitly marked speculative
- Framing risks are recorded, not just felt
- A written go / no-go / re-point decision exists

### Kill criteria — say no here, cheaply

Kill or park in Phase 0 when: the solicitation is closed with no refresh window; no budget holder can be named; the political framing is untenable; or the premise depends on a recovery timeline beyond our runway. **Killing in Phase 0 costs a conversation. Killing in Phase 2 costs a quarter.**

### Currently in Phase 0

PART-135 (RFQ family currency), PART-137 (provenance thesis validation), PART-139 (ATE institutional routing).

---

## Phase 1 — Readiness

**Owner: ARIA-Operations (OPS), with Partnerships on institutional questions.**

### Concerns

1. **Registrations current and calendared.** SAM.gov, Grants.gov/Research.gov, BC Bid, extra-provincial, GST/HST, WorkSafeBC, insurance. Each with an expiry and an owner.
2. **Accounting shaped before award, not after.** Direct/indirect separation, unallowable segregation, timekeeping with time-and-effort records, indirect rate decided.
3. **Institutional routing settled.** Who is lead applicant, whose ledger carries the award, what subaward reporting we owe.
4. **Intelligence layer alerting.** Free baseline live on both sides of the border so deadlines surface without manual sweeps.
5. **One working proof artifact exists** in the relevant domain — something demonstrable, not a deck.

### Exit criteria

- No registration is expired or unverified
- Chart of accounts and timekeeping would survive a Uniform Guidance review today
- Lead-applicant question answered for each active funding path
- Tooling decisions recorded with reversal conditions, not re-litigated ad hoc

### Currently in Phase 1

OPS-210 (registration currency), OPS-211 (accounting readiness), PART-136 (BC Bid profile), OPS-212 (intelligence layer), PART-138 (GMI Cloud Ambassador). Deferred with recorded triggers: OPS-213 (Deltek).

---

## Phase 2 — Activation

**Owner: shared. Partnerships on the transaction, Engineering on delivery, Cultural Governance on consent gates.**

### Concerns

1. **The actual submission, pilot, or contract** — with real deadlines, not placeholders
2. **Delivery capacity honestly assessed** — including the stance-lens gap (ENG-389) on multi-stakeholder engagements
3. **Evidence capture running from day one** — field artifacts, competency records, credential issuance
4. **Consent and sovereignty gates cleared *before* activation**, not reviewed after
5. **Content routed to CEP, governance traces to GSBF** — separated at creation
6. **Actuals-only reporting.** No revenue projections in partner-facing or governance surfaces.

### Exit criteria

- Deliverable shipped and reported with actuals
- Evidence chain intact and queryable (vault trace → operator memory)
- Governance record complete in GSBF
- Case study or content deliverable routed through CEP

### Currently in Phase 2 or blocked on entry

PART-85 (NSF SBIR Phase I submission) — blocked on Phase 1. PART-58 (RFI26DBC68) — blocked on Phase 0 resolution.

---

## Cross-team participation map

| Team | Phase 0 | Phase 1 | Phase 2 |
|---|---|---|---|
| **Partnerships (PART)** | **Owns.** Buyer conversations, solicitation verification, budget-holder identification | Institutional routing, lead-applicant determination | Owns the transaction; partner comms |
| **ARIA-Operations (OPS)** | Supplies market/tooling context | **Owns.** Registrations, accounting, tooling, renewal calendar | Operational delivery support |
| **Research & Participation (RES)** | **Co-owns.** Premise evidence, blueprints, method validation | DACUM/SCID artifacts, competency schemas | Measurement, actuals addenda, dissemination |
| **Cultural Governance (CUL)** | Flags sovereignty/consent risk early | CARE/OCAP protocol readiness | **Gate authority.** Consent routing must clear *before* activation |
| **Engineering (ENG)** | Feasibility read only — do not build in Phase 0 | Proof artifact, runtime readiness | **Owns delivery.** Mobile PWA, SCID engine, evidence capture |
| **Form (FRM)** | — | Design tokens, scenography readiness (note runtime Phase 2/3 gates) | Surface authoring |
| **Corridor (COR)** | — | Register governance, content shape | **Owns CEP deliverables.** Copy, dossiers, archetype-bound editorial |
| **Bot and Git (BOT)** | — | Agent substrate, vault write paths | SOP-18 traces, automation |
| **Signal** | — | — | Agentic CI inspection, multimodal compliance checks |

### Decision rights at gates

| Gate | Who decides | Who must be consulted |
|---|---|---|
| **0 → 1** | Partnerships | RES (evidence), CUL (if sovereignty-adjacent) |
| **1 → 2** | ARIA-Operations | PART (transaction readiness), ENG (delivery capacity) |
| **Phase 2 activation** | **Cultural Governance holds veto** on consent/sovereignty grounds | PART, ENG |
| **Kill / park** | Whoever owns the current phase | Named in the issue before closing |

The CUL veto at activation is deliberate. It is cheaper to stop at the gate than to unwind a deployed surface.

---

## Routing discipline

Established in RES-121 §08b. Applies to every phase.

| Output type | Routes to | Examples |
|---|---|---|
| **Engineering work** | **Linear** | Build tickets, wiring, refactors, infrastructure |
| **Content deliverables** | **Jira CEP** (Content Enable and Process) | Copy, dossiers, curriculum, sales collateral, ceremony language, case studies |
| **Governance traces** | **Jira GSBF** | Sovereignty decisions, tier advancement, compliance evidence, consent records, audit trail |

Split at creation, not in cleanup. A storyGem's *content* goes to CEP; its *governance trace* goes to GSBF — both, not either.

**Known provisioning gap:** the `jira:project:content-ops` KV key is unprovisioned and `jira-review.ts` hardcodes `DEFAULT_JIRA_PROJECT = 'GSBF'`, so content work currently defaults into the governance trail. Until fixed, route CEP items manually.

---

## Execution paths

How work actually gets done (RES-121 §08):

- **Path A — Linear Agent Coding Session.** Well-scoped single-worker tickets. ~30% first-pass resolution. Reads Linear context natively.
- **Path B — Claude Code CLI.** Multi-file, cross-worker, MCP-heavy. Architecture work, strategy documents, anything spanning repos or systems.
- **Path C — Linear Loops → vault-mcp.** Constrained automation. Governance-event vault writes, SOP-18 traces. No arbitrary HTTP.

Match the path to the shape of the work. Phase 0 and Phase 1 coordination work is mostly Path B; Phase 2 delivery is mostly A and C.

---

## Standing rules

1. **Premise re-test at two quarters.** Any thread open longer gets its premises re-tested, not just its status checked. The question is not "is this record current" but "is the world this record assumed still there."
2. **No proposal content against an unverified solicitation.**
3. **Actuals only** in partner-facing and governance surfaces. Projections stay in internal strategy documents, labelled as models.
4. **Consent gates precede activation.** Never retrofit.
5. **Qualify the word "phase."** Runtime phase or effort phase — say which.
6. **Decisions carry reversal conditions.** A deferral without a named trigger is an unmade decision.

---

## Current state snapshot

| Thread | Effort phase | Blocked on |
|---|---|---|
| Canada RFQ family (PART-135) | 0 | Nothing — this is the unblock |
| Provenance thesis (PART-137) | 0 | WGBC conversation |
| ATE institutional routing (PART-139) | 0 | Collaborative conversation |
| Registration currency (OPS-210) | 1 | Nothing |
| Accounting readiness (OPS-211) | 1 | PART-139 answer for indirect rate |
| BC Bid profile (PART-136) | 1 | PART-135 (do not perfect a profile for a closed SOA) |
| Intelligence layer (OPS-212) | 1 | Nothing |
| GMI Cloud Ambassador (PART-138) | 1 | Nothing |
| NSF SBIR Phase I (PART-85) | 2 | OPS-210, OPS-211, PART-138 |
| RFI26DBC68 (PART-58) | 2 | PART-135 — lapsed date needs explanation |
| Deltek adoption (OPS-213) | Deferred | Named triggers |

**Needs reframing before it can be phased at all:** the FIFA 2026 cluster — OPS-57, OPS-98, OPS-176, PART-96, PART-102, PART-103, PART-121, PART-63/64, PART-70/71, RES-58. The tournament concluded 19 July 2026. These are legacy artifacts or closures, and the legacy window is already about a month into its useful life.

---

## Circulating this document

For cross-team participation, this needs to live where non-Linear participants can reach it:

1. **Confluence page** — canonical home for the phase model and glossary; reaches partners and academic collaborators who are not in Linear
2. **Linear project document** — attached to the relevant project so issue-level work links back to the phase definition
3. **GSBF** — the phase-gate decision rights and CUL veto are governance decisions and belong in the audit trail
4. **CEP** — any partner-facing derivative (a one-page version for institutional partners) is a content deliverable

The glossary is the part most worth circulating early and widely. It is short, it is the cheapest fix for the most common coordination failure, and it costs nothing to be wrong about.
