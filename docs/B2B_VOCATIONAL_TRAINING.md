# B2B Vocational Training Model

**Version:** 2.0
**Date:** August 2026 (revised from v1.0, January 2026)
**Foundation:** SCID/DACUM + UMCES-CGC Technical Capacity Model
**Status:** Grounded revision — v1.0 was initial concept and aspirational; v2.0 reconciles it against the operational deploy shape

---

## Document Lineage

| Version | Date | Character |
|---------|------|-----------|
| **v1.0** | January 2026 | **Initial concept, aspirational.** Service packages, pricing, and financial projections were designed forward from the SCID/DACUM thesis before delivery infrastructure existed. Case studies were proposals. |
| **v2.0** | August 2026 | **Grounded revision.** Delivery infrastructure now partially operational (RES-121 runtime validation); educational channel corrected to South Seattle College's PNW Wine Education Collaborative; SCID elevated to architectural schema layer (`SCID_ARCHITECTURE.md`); funding stack corrected to NSF ATE / SBIR / Regional Innovation Engines; content-vs-governance routing (CEP/GSBF) adopted for all deliverables. |

Pricing, packages, and projections below remain **models, not observed revenue** — retained from v1.0 with v2.0 adjustments, and labeled accordingly.

---

## Executive Summary

**Human capacity building is both the product and the infrastructure.**

We offer B2B workforce development that:
- Trains employees with **lived expertise** to contribute to production code in 6-12 weeks
- Uses **AI-assisted articulation literacy** to bridge technical skill gaps
- Validates infrastructure through **co-design with hardest governance cases**
- Provides **portable credentials** (Verifiable Credentials via AT Protocol)
- Delivers **mobile-first** to field practitioners (vineyard, oyster farm, environmental monitoring) — *v2.0 addition: desktop-bound pedagogy was the identified gap in the CGC-UMCES precedent (12 of 15 repos are Jupyter tutorials with no persistence layer)*
- Generates **recurring revenue** while simultaneously serving as **R&D cost center**

**What changed since v1.0:** the delivery substrate exists. Evidence capture, operator memory (Obsidian vault + steward-obsi ChatAgent), competency-progression visibility (`vj-runner /api/obsidian/feed`), and live participation signals (PartyKit Terroir + grammar events) are deployed infrastructure — the training product now sits on runtime, not on slideware.

---

## Market Position: Not HR/DEI, Not Bootcamp

### What We Are NOT

| Traditional Model | Why We're Different |
|-------------------|---------------------|
| **HR/DEI Training Department** | We don't teach cultural sensitivity workshops. We recruit technical co-designers. |
| **Coding Bootcamp** | We don't teach syntax to build demo apps. We assist domain experts to build production infrastructure. |
| **Consulting Firm** | We don't parachute in, deliver a report, and leave. We embed guild members who own the code. |
| **SaaS Platform** | We don't sell software licenses. We sell capacity-building that produces portable IP. |

### What We ARE

**Technical Infrastructure R&D Department**

- **Engineering mandate**, not cultural initiative
- **Co-design from inception**, not retrofitting for inclusion
- **Lived expertise as technical qualification**, not diversity metric
- **Pattern Module creation**, not software consumption

---

## Educational Channel (v2.0 Correction)

**Primary partner structure: South Seattle College's Pacific Northwest Wine Education Collaborative.**

- The Collaborative is a **multi-institution structure**, not a single-college relationship — this is the correct entry point for the viticulture vertical
- **Walla Walla CC has its own distinction** within the initially scoped landscape; it remains a relationship, but the Collaborative is the channel
- NSF ATE (Advanced Technological Education) is the matched funding vehicle: community college partnerships, technician education, industry co-design — $600K-900K over 3 years
- Cursory leverage channels (do not overweight): Full Sail University alumni access; UW CoMotion via contributor alumni

---

## Revenue Model: Dual Nature

### Revenue Center Components *(pricing = v1.0 models, unvalidated)*

1. **Guild Membership Subscriptions**
   - Tiered access to training cohorts, Pattern Library, AI copilot tooling, credential issuance
   - **Pricing model:** $2,000-5,000/member/quarter

2. **B2B Workforce Development Contracts**
   - Custom cohorts for enterprise partners; domain-specific (hospitality, environmental monitoring, accessibility, viticulture)
   - **Pricing model:** $50,000-200,000/cohort (10-20 participants)

3. **Infrastructure Licensing**
   - Pattern Modules for enterprise use; pre-validated components
   - **SCID schema licensing** *(added v2.0)*: the competency schema layer itself (ATProto competency records, assessment criteria, credential templates) as licensable infrastructure — see `SCID_ARCHITECTURE.md` §B2B Integration
   - **Pricing model:** $10,000-50,000/module/year

4. **Consulting Retainers**
   - Co-design engagement, sovereignty protocol implementation (CARE Principles), accessibility audits
   - **Pricing model:** $150-300/hour or $20,000-50,000/project

5. **Credential Verification Services**
   - Verifiable Credential infrastructure for employers; skills validation for hiring
   - **Pricing model:** $500-2,000/verification + platform fees

### Cost Center Components

1. **R&D Investment**
   - SCID infrastructure build: ~$120K, Q4 2026–Q3 2027 (mobile PWA, evidence capture, VC issuance)
   - Testing with hardest governance cases (tribal sovereignty, wheelchair accessibility)
   - Pattern Library curation and maintenance

2. **Co-Designer Compensation**
   - Guild members are **paid participants**, not students
   - Economic floor: 30% of monetized training value
   - Project completion bonuses

3. **Community Stewardship**
   - Relationship maintenance with tribal nations, disability communities, etc.
   - Cultural protocol advisors
   - Ongoing validation processes

4. **Technical Operations** *(stack corrected v2.0)*
   - **GMI Cloud** — LLM backbone (exclusive inference: TRELLIS v1 splat generation, image generation, copilot queries)
   - **Genblaze SDK** — open-source orchestration/transport layer (desktop analytical surfaces → B2 → mobile)
   - **Backblaze B2** — artifact storage; **ATProto** — credential/identity systems
   - Cloudflare Workers mesh (steward-obsi, vault-mcp, vj-runner) — operator memory and evidence routing
   - Provider flexibility note: Cloudflare AI / Replicate available as alternates; GMI Cloud + Genblaze is the coupled primary approach

---

## Value Proposition: Why Businesses Buy

### Problem 1: Traditional Hiring is Slow

**Traditional path:** post job → filter → interview → hire → onboard → wait 6-12 months for contribution. **Cost:** $50,000-100,000+ before first meaningful output.

**Guild Academy path:** identify domain need → recruit lived expertise → AI-assisted contribution in 6-12 weeks. **Cost:** $5,000-10,000/member training + compensation = faster ROI.

### Problem 2: Inclusive Design is Hard (and Expensive to Fix Later)

**Traditional path:** build → launch → discover accessibility/sovereignty issues → expensive retrofit (e.g., AR navigation fails wheelchair users → $200,000+ redesign).

**Guild Academy path:** co-design with wheelchair users from inception → test at build time → launch validated. **Savings:** 70-80% reduction in post-launch fixes.

### Problem 3: Knowledge is Platform-Captured

**Traditional path:** train employee on proprietary tools → employee leaves → knowledge walks out the door → perpetual retraining.

**Guild Academy path:** issue Verifiable Credentials → portable skills across employers → Pattern Modules stay with company.

### Problem 4: Compliance Theater vs. Real Validation

**Traditional path:** check diversity boxes → pass audits → infrastructure still fails marginalized users.

**Guild Academy path:** infrastructure validated by lived expertise → audits backed by co-designer signatures → regulatory confidence + brand differentiation.

### Problem 5 (added v2.0): Training Evidence Evaporates

**Traditional path:** training happens → completion certificate issued → no artifact trail → employer can't verify what the credential actually attests.

**Guild Academy path:** field evidence captured at task time (mobile PWA → B2), assessed against SCID criteria, chained into the credential. The operator memory layer (vault + ChatAgent) lets an instructor ask "what did this cohort carry forward?" — the RES-121 Fire 9 pattern applied to training. The credential is backed by an evidence chain, not attendance.

---

## Service Packages *(v1.0 models, retained; delivery substrate now partially live)*

### Package 1: Foundation Cohort
**Price model:** $75,000 · **Duration:** 12 weeks
**Deliverables:** 10 guild members trained · 1 Pattern Module published · 5 Verifiable Credentials issued · infrastructure validated against 1 hardest governance case

**Ideal for:** companies launching new product lines; organizations needing accessibility validation; enterprises with diversity hiring mandates.

### Package 2: Infrastructure Co-Design
**Price model:** $150,000 · **Duration:** 24 weeks
**Deliverables:** 20 guild members embedded · 3 Pattern Modules published · production code contributions (commits, PRs merged) · 10 VCs issued · ongoing stewardship plan

**Ideal for:** large enterprises building multi-stakeholder platforms; hospitality groups deploying AR/VR at scale; tech companies needing sovereignty protocol implementation.

**v2.0 caveat:** multi-stakeholder engagements depend on the stance lens (GUEST/OPERATOR/VENUE/PROTOCOL) governance architecture — ENG-389, targeted Q4 2026. Until it ships, scope multi-stakeholder contracts with this gap priced in.

### Package 3: Continuous Capacity Building
**Price model:** $200,000/year (retainer) · **Duration:** ongoing
**Deliverables:** quarterly cohorts (40 members/year) · Pattern Library access · priority AI copilot support · annual infrastructure audit · white-label credential issuance

**Ideal for:** enterprises with ongoing workforce development needs; hospitality chains; government agencies.

### Package 4 (added v2.0): SCID Schema License
**Price model:** $25,000-75,000/year per occupational schema
**Deliverables:** licensed competency schema (DACUM-derived duties/tasks/knowledge/skills as ATProto records) · assessment criteria · credential templates · schema update stream

**Ideal for:** educational collaboratives (PNW Wine Education Collaborative pattern) and workforce boards who run their own delivery but need the competency architecture.

---

## Case Studies *(all remain proposed/aspirational — labeled per v2.0 honesty rule)*

### Fort Vancouver Sensor Deployment — *proposed*
**Partner:** National Park Service (proposed) · **Challenge:** deploy environmental sensors using Indigenous ecological knowledge · **Guild members:** 5 Indigenous monitors · **Projected:** sovereignty-protocol deployment, 1 Pattern Module, 5 Technical Architect VCs · **Revenue model:** $50,000 cohort fee

### Royal Sonesta Revenue Transparency — *proposed*
**Partner:** Royal Sonesta Portland (proposed) · **Challenge:** 70/20/10 revenue split for BIPOC restaurant partners · **Guild members:** 3 restaurant owners, 2 API specialists · **Projected:** real-time revenue-split dashboard, 1 Pattern Module, 5 VCs · **Revenue model:** $75,000 co-design engagement

### Viticulture Pilot via PNW Wine Education Collaborative — *added v2.0, in motion*
**Partner:** South Seattle College's Pacific Northwest Wine Education Collaborative · **Challenge:** mobile-first competency training for vineyard field tasks (pruning, canopy management, harvest assessment) with evidence-backed credentials · **Mechanism:** SCID engine + AI copilot (Guided → Assisted → Autonomous), GMI Cloud inference, Genblaze transport, ATProto VCs · **Funding alignment:** NSF ATE proposal vehicle · **This replaces the aspirational FIFA World Cup accessibility audit as the flagship near-term case** (FIFA entry retired from active pipeline; the accessibility audit pattern itself remains a Package 1/2 offering).

---

## Sales Process

### Lead Generation
1. **Conference presentations** — thought leadership, demo modular components
2. **Pop-up events at hospitality venues** — real-world validation with customers present
3. **Dev post submissions** — developer community engagement drives technical credibility
4. **Domain workshops** — co-design sessions reveal pain points, build trust
5. **Educational collaborative channel** *(added v2.0)* — the PNW Wine Education Collaborative as multi-institution entry point
6. **Partner advocacy** *(added v2.0)* — GMI Cloud Ambassador/Partnership co-marketing as credibility amplifier

### Qualification Criteria

**Green light:** technical capacity gap · faces hardest governance cases · willing to compensate co-designers · seeks validated infrastructure

**Red light:** wants "diversity training" (HR/DEI mandate, not engineering need) · expects cheap labor · refuses AI transparency · resists pattern portability

### Sales Cycle

1. **Discovery Workshop (Week 1-2):** free 2-hour session exploring domain challenges
2. **Pilot Proposal (Week 3-4):** custom cohort design, pricing, deliverables
3. **Contract Negotiation (Week 5-6):** legal review, co-designer agreements
4. **Cohort Launch (Week 7+):** 12-24 week engagement

**Close rate (projected):** 30-40% of qualified leads · **Average deal size (model):** $75,000-150,000

**v2.0 pacing note:** observed partnership reality includes long institutional stalls (a data-sharing MOU stalled 127+ days in the governance trail). Sales projections must assume institutional-partner cycles run 2-4× the modeled sales cycle; the non-linear progression principle applies to revenue, not just product.

### Deliverable Routing (added v2.0)

All engagement outputs route per the CEP/GSBF split (RES-121 §08b):
- **Jira CEP (Content Enable and Process):** sales collateral, case study copy, curriculum content, AI copilot prompt language, graduation/ceremony language
- **Jira GSBF:** governance traces — sovereignty decisions, tier advancement records, compliance evidence (incl. EU/Horizon-track evidence)

This split is contractual hygiene: clients receive content deliverables from CEP; auditors and funders receive governance evidence from GSBF.

---

## Competitive Differentiation

### vs. Coding Bootcamps (General Assembly, Lambda School)
**They:** teach syntax to career switchers → graduates seek jobs.
**We:** teach domain experts to articulate technical needs → AI assists → graduates contribute to existing infrastructure.

### vs. Consulting Firms (McKinsey, Deloitte)
**They:** analyze, recommend, deliver report → client implements.
**We:** embed guild members → co-design → client owns pattern modules.

### vs. DEI Training (Paradigm, Verna Myers)
**They:** cultural competency workshops → hope for behavior change.
**We:** recruit lived expertise → validate infrastructure → measure technical performance.

### vs. SaaS Platforms (Workday, Salesforce)
**They:** license software → lock-in.
**We:** build capacity → portable credentials + pattern modules.

### vs. LMS/EdTech Platforms (added v2.0 — Canvas, Coursera for Business)
**They:** host content, track completion, issue certificates of attendance.
**We:** capture field evidence at task time, assess against occupational schemas, issue verifiable credentials backed by artifact chains — mobile-first, because the learners are in vineyards and on boats, not at desks.

---

## Financial Projections *(v1.0 models retained — unvalidated, non-linear, partnership-dependent)*

### Year 1
- **Cohorts:** 3 (30 members) · **Revenue model:** $225,000 · **Costs:** $300,000 (infrastructure build incl. ~$120K SCID engine, R&D, compensation) · **Net:** -$75,000 (investment phase)
- **v2.0 adjustment:** Year 1 costs are now partially fundable via NSF SBIR Phase I ($300K model: Stadium Soundwave lead, GMI Cloud compute line ~$50K) rather than borne entirely as private cost center

### Year 2
- **Cohorts:** 8 (80 members) · **Revenue model:** $750,000 ($600K cohorts + $150K licensing/credentials) · **Costs:** $500,000 · **Net:** +$250,000 (feedback loop enabled, recurring revenue begins)
- **v2.0 adjustment:** NSF ATE award (if secured) adds $200K-300K/yr institutional-channel revenue not in the v1.0 model

### Year 3
- **Cohorts:** 15 (150 members) · **Revenue model:** $1.8M ($1.2M cohorts + $400K licensing + $200K consulting) · **Costs:** $900,000 · **Net:** +$900,000 (scaling phase)

**Note:** these are non-linear projections dependent on partnership activation, not timeline commitments. The 127-day MOU stall is the calibration reference for institutional cycle time.

---

## SCID/DACUM Integration

**v2.0: SCID is now an architectural schema layer, not only a curriculum method.** Full four-layer specification in `SCID_ARCHITECTURE.md`:

1. **Competency Schema** — DACUM-derived duties/tasks/knowledge/skills as ATProto records
2. **Scaffolded Execution** — mobile-first PBL in three AI-bounded phases (Guided → Assisted → Autonomous)
3. **Evidence Capture** — field artifacts → Genblaze pipeline → B2 → assessment
4. **Credential Issuance** — ATProto Verifiable Credentials, employer-verifiable

### DACUM (Developing A Curriculum)
- **Industry panels** (hospitality, tribal nations, disability advocates, viticulture practitioners via the Collaborative) define needed skills
- **Task analysis** breaks down into teachable units
- **AI-assisted delivery** bridges gaps (copilot generates, member validates against domain requirements)

### UMCES-CGC Validation
- Model proven at Chesapeake Bay scale (Data Intern Projects, AI/ML workshops)
- **v2.0 precision:** the CGC-UMCES repo audit (Apr-Jul 2026) shows 12 of 15 repos are Jupyter notebook tutorials — desktop-bound, no persistence. That is precisely the gap the Genblaze/B2/mobile layer fills. The precedent validates the pedagogy; our infrastructure closes its delivery gap.

### Progression Visibility (added v2.0)
- Competency accumulation follows the RES-121 Fire 13 pattern: weight accumulates → `vj-runner /api/obsidian/feed` surfaces members approaching threshold → instructor identifies graduation candidates **today**, before ceremony automation ships
- Credential issuance ceremony language is a CEP content deliverable, not an engineering ticket

---

## Risk Mitigation

### Risk 1: Co-Designers Feel Exploited
**Mitigation:** constitutional economic floor (30% of training revenue) · Pattern Module ownership (portable IP via VCs) · human approval gates (AI cannot auto-commit)

### Risk 2: Partners Want Cheap Labor, Not Co-Design
**Mitigation:** qualify leads rigorously · public charter (Guild Academy Charter visible to partners) · refuse contracts that violate constitutional bounds

### Risk 3: Scaling Dilutes Quality
**Mitigation:** guild master mentorship model (Phase 4 PBL) · Pattern Library as quality control · regional partnerships (UMCES-CGC model; PNW Wine Education Collaborative as the multi-institution template)

### Risk 4: AI Replaces Human Expertise
**Mitigation:** constitutional bounds enforce human sovereignty · lived expertise primacy rule · articulation literacy (AI assists, does not replace)

### Risk 5 (added v2.0): Single-Provider Compute Dependency
**Mitigation:** GMI Cloud is the coupled primary (with Genblaze), but the orchestration layer is provider-agnostic — Cloudflare AI (incl. Replicate) is the documented alternate. Genblaze SDK is open-source; no partnership gate on our roadmap.

### Risk 6 (added v2.0): Institutional Cycle Stalls
**Mitigation:** multi-channel funding stack (ATE + SBIR + Engines + private contracts) so no single MOU blocks the pipeline · governance traces in GSBF make stalls visible early (127-day MOU is the named precedent).

---

## Next Steps

### Immediate (This Quarter)
1. Advance PNW Wine Education Collaborative engagement toward NSF ATE proposal vehicle
2. GMI Cloud Ambassador application; SBIR Phase I concept draft (Stadium Soundwave + GMI Cloud)
3. Provision CEP routing for content deliverables (KV key + slot scoping)

### Near-Term (Next 2 Quarters)
1. Land mobile-first SCID engine build (Layer 3)
2. First paid cohort (10 members, 12 weeks) through the Collaborative channel
3. Issue first Verifiable Credentials; publish first Pattern Module

### Long-Term (12+ Months)
1. Scale to 3 domains (viticulture/hospitality, environmental monitoring, accessibility)
2. Replicate collaborative-structure partnerships (UMCES-CGC model; USVI Sound Clash territories)
3. Demonstrate recurring revenue (licensing + credentials + schema licenses)

---

## Contact & Engagement

**For partnership inquiries:**
- Domain workshops: 2-hour free discovery sessions
- Pilot cohort proposals: custom pricing based on scope
- Pattern Module / SCID schema licensing: contact for enterprise terms

**This is not a product pitch. This is an invitation to co-design infrastructure that cannot exist without your domain expertise.**
