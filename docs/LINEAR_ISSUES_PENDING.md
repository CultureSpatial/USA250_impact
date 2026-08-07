# Pending Linear Issues — ready to post

**Created:** August 2026
**Reason:** Linear MCP connection dropped partway through issue creation. Four issues landed; these four are drafted and ready to create when the connection is restored.

**Already created:** PART-135, PART-136, OPS-210, OPS-211 (see summary at bottom).

---

## 1. Opportunity intelligence layer — free baseline now, HigherGov at trigger, GovWin deferred

**Team:** ARIA-Operations · **Priority:** Medium · **Related:** PART-135, PART-85, OPS-112, OPS-210

### Decision to record

Deltek **GovWin IQ** runs **$15K–$29K+/year** on a quote-only annual contract. That is a meaningful fraction of an NSF SBIR Phase I award for a capability we can substitute almost entirely at our stage. Defer it.

### Adopt now — free baseline

- **SAM.gov** — mandatory registration regardless (tracked in OPS-210)
- **Grants.gov** — the actual submission surface for NSF ATE and SBIR
- **USAspending** — award history and competitor intelligence
- **BC Bid** — Canadian equivalent, already in scope via PART-136
- **CanadaBuys** — federal Canadian procurement, not yet checked

### Adopt at trigger — when the pipeline is active enough that missed-deadline risk exceeds subscription cost

- **HigherGov** — free tier available; ~$500/yr single user, ~$2,500/yr up to 10. Cited as the most common landing spot for teams leaving GovWin; best price-to-coverage.
- **GovTribe** — from ~$1,350/yr; aggregates SAM.gov, USASpending, Grants.gov and state sources

### Defer

- **GovWin IQ** — revisit only at multi-bid federal/SLED volume, and quote it against HigherGov + GovTribe combined first

### Canadian gap to close

The Canadian side has no equivalent intelligence layer identified yet. Scope: whether **MERX**, **BidsandTenders**, or **Biddingo** is worth a subscription, or whether BC Bid + CanadaBuys alerts suffice. Cross-reference OPS-112 (CAD-FUND-001 Canadian incubator/program landscape) and the **PacifiCan** federal top-up path named in PART-57.

### Acceptance criteria

- Free baseline is registered and alerting on both sides of the border
- HigherGov adoption has a named trigger condition, not a date
- GovWin IQ deferral is recorded with the condition that would reverse it
- Canadian intelligence gap has a decision (subscribe / suffice with free)

### Context

`docs/OPERATIONAL_TOOLING_DELTEK_ASSESSMENT.md` — "Alternative Providers for Our Current Stage", Layer 1

---

## 2. Deltek adoption trigger ladder — deferred decision record

**Team:** ARIA-Operations · **Priority:** Low · **Related:** OPS-211, PART-85

### Decision

**Do not enroll with Deltek at this stage.** Deltek is the right destination at the wrong time: the DCAA audit pressure that justifies Costpoint's cost is a *contract-side* requirement, and NSF's grant instrument removes it at Phase I.

This issue exists so the decision is recorded with its reversal conditions, rather than being re-litigated from scratch each time procurement tooling comes up.

### Trigger ladder

| Trigger | Action | Approx. annual cost |
|---|---|---|
| **Now (pre-award)** | Free baseline; chart of accounts shaped; timekeeping discipline (OPS-211) | ~$0 |
| **Active NSF pipeline** | Add HigherGov single-user | ~$500 |
| **Phase I award executes** | Formalize timekeeping + time-and-effort; accounting advisor review | Low four figures |
| **Phase II award, or first DoD/prime subcontract** | Evaluate PROCAS / JAMIS / Unanet / Costpoint Essentials head-to-head | $4K–$15K |
| **Multi-cohort delivery + multi-entity, or 25+ users** | Costpoint Essentials → Costpoint path; consider partner-led implementation | $10K+ |
| **Multi-bid federal/SLED volume** | Reconsider GovWin IQ vs HigherGov + GovTribe | $15K–$29K+ |

### Enrollment mechanics, for when a trigger fires

- Deltek publishes **no list price** above the Essentials line — everything is quote-per-deal
- **Ask for "Costpoint Essentials" by name.** Under ~25 users, single legal entity, no manufacturing. Asking generically routes to enterprise sales and an enterprise quote.
- Reported entry ~$800/month for 10 users with implementation included, ~60-day go-live — **third-party figure, verify with vendor**
- Run a certified partner/reseller quote (e.g. NeoSystems, CRI) in parallel; partners absorb implementation, which otherwise becomes an unbudgeted consulting line
- Quote Deltek against **Unanet, PROCAS, JAMIS** rather than treating it as the default

### Do not

Buy a Deltek PSA product (Maconomy, Vantagepoint, Replicon). That layer is already covered by Linear / Jira CEP+GSBF / Attio / Obsidian+vault-mcp / Port.io. GSBF in particular is an asset for grant compliance — a governance audit trail is exactly what a Uniform Guidance reviewer wants to see.

### Context

`docs/OPERATIONAL_TOOLING_DELTEK_ASSESSMENT.md`

---

## 3. GMI Cloud Ambassador Program application

**Team:** Partnerships · **Priority:** High · **Related:** PART-85

### Why

GMI Cloud is the **LLM backbone** for the SCID platform — exclusive inference compute (TRELLIS v1 splat generation, image generation, AI copilot LLM queries), coupled with Genblaze SDK as the open-source orchestration layer.

Beyond the technical role, GMI Cloud runs an influence/solution advocacy campaign, and their **Ambassador Program** → **Partnership Program** pathway is an accelerator for NSF reach. They want success stories in education and workforce development — an underserved vertical for them. An NSF-backed vocational training platform using GMI Cloud as backbone is a high-value case study on their side, which is the leverage.

### Scope — Ambassador application (target: August 2026)

1. Prepare the use case: SCID vocational training platform, mobile-first AI copilot for viticulture / aquaculture / environmental monitoring
2. Submit the NSF SBIR draft as proof of use case
3. Name the domain we can advocate in: NSF ATE community colleges, vocational training sector
4. Request early access to TRELLIS v1 improvements

### Then — letter of support for the SBIR

If Ambassador status lands by ~Oct 2026, request a GMI Cloud letter of support committing inference compute for the NSF SBIR Phase I application (PART-85). That letter is the credibility mechanism: it converts "we'll use cloud inference" into "an established AI infrastructure provider is committed to this project."

### Then — Partnership Program (Q1 2027, conditional)

Only if SBIR Phase I is awarded. Ask: volume pricing (20–30% on the ~$50K inference budget), dedicated engineer for TRELLIS v1 optimization, co-development on mobile PWA inference patterns.

### Note on provider flexibility

Architecture supports alternates (Cloudflare AI incl. Replicate). This is a stack note, not a hedge to raise with GMI Cloud — the coupled GMI Cloud + Genblaze approach is the committed primary.

### Acceptance criteria

- Ambassador application submitted with use case and SBIR draft
- Decision recorded by Oct 2026
- If accepted: letter of support requested and received before SBIR submission
- If rejected: SBIR pivots to generic cloud inference framing, no schedule slip

### Context

`docs/GMI_CLOUD_PARTNERSHIP_STRATEGY.md`

---

## 4. NSF ATE institutional routing — who holds the accounting?

**Team:** Partnerships · **Priority:** High · **Related:** PART-85, PART-96, PART-98, PART-90, OPS-211

### The open question

NSF **ATE** (Advanced Technological Education) typically routes through a **community college as lead institution**. Our educational channel is **South Seattle College's Pacific Northwest Wine Education Collaborative** — a multi-institution structure, not a single-college relationship.

If the college is lead applicant, the college's accounting system carries the award and we are a subawardee. If we are lead, our accounting system carries it. **This materially changes what OPS-211 needs to build.**

This question has to be settled before the ATE budget is drafted, not after.

### Scope

1. Determine whether South Seattle College (or another Collaborative member) would be lead applicant on an ATE proposal, with us as subawardee — or whether we lead
2. Establish which entity's indirect rate applies, and at what level
3. Confirm what subaward reporting the lead institution would require of us
4. Feed the answer into OPS-211's chart-of-accounts and indirect-rate decisions
5. Clarify how the **Collaborative's multi-institution structure** affects lead-institution selection — this is the part that differs from a conventional single-college ATE application

### Related context to reconcile

- PART-46 marks South Seattle College framing as "superseded consortium framing" (status Frozen) — determine whether that supersession is still accurate given the Collaborative is now the primary channel
- PART-96 (SSC FIFA Workforce Activation), PART-98 (DACUM Competency Mapping — Culinary & Wine Steward Micro-Credential), PART-90 (USDA NIFA — SSC Viticulture Workforce Readiness) are all SSC-facing and should share one institutional-relationship answer rather than three

### Acceptance criteria

- Lead applicant is determined and recorded
- Indirect rate treatment is settled for whichever structure applies
- OPS-211's scope is updated to reflect the answer
- The SSC-facing issues above point at one consistent institutional relationship

### Context

`docs/B2B_VOCATIONAL_TRAINING.md` (Educational Channel), `docs/FUNDING_PATHWAYS_UPDATED.md`, `docs/OPERATIONAL_TOOLING_DELTEK_ASSESSMENT.md` (Open Items)

---

## Already created

| ID | Title | Team | Priority |
|---|---|---|---|
| **PART-135** | Canada RFQ family currency check — all five DBC solicitations (RFQ23/24, RFI26) | Partnerships | Urgent |
| **PART-136** | BC Bid supplier profile — verify completion and registration currency | Partnerships | High |
| **OPS-210** | Procurement registration currency — SAM.gov (US) + BC Bid (CA) status and renewal calendar | ARIA-Operations | Urgent |
| **OPS-211** | NSF Uniform Guidance accounting readiness — chart of accounts, timekeeping, indirect rate | ARIA-Operations | High |
