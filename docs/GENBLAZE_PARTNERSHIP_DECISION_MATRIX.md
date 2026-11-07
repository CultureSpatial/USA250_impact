# Genblaze Partnership Decision Matrix

**Version:** 1.0
**Date:** August 2026
**Status:** Strategic Decision Framework

---

## Decision Context

Two distinct approaches to positioning Genblaze in NSF SBIR Phase I proposal:

1. **Formal Partnership Approach** — Backblaze as co-applicant/partner company
2. **Open-Source SDK Approach** — Stadium Soundwave innovates independently using Genblaze SDK

---

## Comparison Matrix

| Dimension | Formal Partnership | Open-Source SDK Usage | Recommendation |
|-----------|-------------------|----------------------|----------------|
| **NSF SBIR Eligibility** | ✅ Allowed (partner companies permitted) | ✅ Allowed (no partnership required) | **Tie** |
| **Application Complexity** | ❌ Higher (requires Backblaze commitment letter, budget coordination) | ✅ Lower (Stadium Soundwave solo applicant) | **Open-Source** |
| **Credibility Signal** | ✅ Strong (Backblaze endorsement adds legitimacy) | ⚠️ Moderate (using existing tool, not inventing) | **Partnership** |
| **IP/Revenue Sharing** | ❌ May require Backblaze rev share on commercialization | ✅ No revenue sharing (open-source license) | **Open-Source** |
| **Innovation Framing** | ⚠️ "Extension of Genblaze" (may read as feature request) | ✅ "Innovation built on Genblaze" (novel application) | **Open-Source** |
| **Timeline to Submit** | ❌ Slower (requires Backblaze coordination, ~2-3 months) | ✅ Faster (can submit next SBIR deadline, ~1 month) | **Open-Source** |
| **Technical Flexibility** | ❌ Must align with Backblaze roadmap (they may reject 3D/splat extension) | ✅ Full flexibility (fork/extend SDK as needed) | **Open-Source** |
| **Long-Term Scalability** | ✅ Strong (Backblaze maintains SDK, we benefit from updates) | ⚠️ Moderate (if SDK diverges, we maintain fork) | **Partnership** |
| **GMI Cloud Integration** | ⚠️ Unclear (Genblaze supports multiple providers; Backblaze may prefer their own inference) | ✅ Clear (GMI Cloud = LLM backbone, Genblaze = orchestration layer) | **Open-Source** |
| **Funding Amount** | ⚠️ $300K split (Stadium Soundwave + Backblaze subcontract, ~$225K + $75K) | ✅ $300K full (Stadium Soundwave retains all SBIR funds) | **Open-Source** |

---

## Detailed Analysis

### Formal Partnership Approach

**Mechanism:**
- Stadium Soundwave = primary applicant (51%+ small business requirement)
- Backblaze = partner company (subcontract for Genblaze SDK extension work)
- Joint innovation claim: "Extending Genblaze to support 3D/splat formats for environmental monitoring"

**Strengths:**
- **NSF credibility:** Backblaze name adds legitimacy (established company, proven B2 infrastructure)
- **Ecosystem contribution:** Shows we're collaborating with existing tools, not reinventing
- **SDK maintenance:** Backblaze maintains Genblaze SDK; we benefit from upstream improvements

**Weaknesses:**
- **Coordination overhead:** Requires Backblaze commitment letter, budget negotiation, SOW alignment
- **Revenue sharing risk:** SBIR Phase II commercialization may require Backblaze rev share
- **Technical constraints:** Backblaze may reject 3D/splat extension (not on their roadmap)
- **Timeline delay:** 2-3 months to align with Backblaze; may miss next SBIR deadline
- **Funding split:** $300K SBIR split with Backblaze subcontract (~$75K to them, $225K to us)

**GMI Cloud Conflict:**
- Genblaze SDK supports multiple inference providers (GMI Cloud, Google, OpenAI, Replicate)
- If Backblaze prefers their own inference backend (or has partnerships with Google/OpenAI), GMI Cloud's role as **LLM backbone** may conflict
- Partner coordination becomes: Stadium Soundwave ↔ Backblaze ↔ GMI Cloud (three-party complexity)

---

### Open-Source SDK Approach

**Mechanism:**
- Stadium Soundwave = sole applicant (retains all $300K SBIR Phase I)
- Genblaze SDK = open-source tool we build on (MIT/Apache license, no partnership required)
- Innovation claim: "AI-bounded scaffolding for vocational training using Genblaze transport layer"

**Strengths:**
- **Application speed:** Can submit next SBIR deadline (~1 month prep, no Backblaze coordination)
- **Full funding:** $300K stays with Stadium Soundwave (no subcontract split)
- **Technical flexibility:** Can fork/extend Genblaze SDK as needed (3D/splat, CARE Principles, SCID integration)
- **Clear GMI Cloud role:** GMI Cloud = LLM backbone (primary inference), Genblaze = orchestration (pipeline SDK)
- **No revenue sharing:** SBIR Phase II commercialization doesn't require Backblaze approval/split

**Weaknesses:**
- **Lower credibility signal:** "Using existing tool" vs. "partnering with established company"
- **Maintenance burden:** If Genblaze SDK diverges from our fork, we maintain compatibility
- **Ecosystem perception:** May read as "building on their work" vs. "collaborating with them"

**GMI Cloud Clarity:**
- Genblaze = orchestration layer (`.step()` chaining, B2 storage sink)
- GMI Cloud = LLM backbone (primary inference compute: TRELLIS v1, image generation, LLM queries)
- Clean separation: Genblaze orchestrates, GMI Cloud computes

---

## GMI Cloud Role Correction (Critical)

### Previous Assumption (WRONG)

**From earlier documents:**
> "GMI Cloud provides inference compute **within Genblaze pipelines** (Seedream, Kling, Veo, TRELLIS v1)"

This implied GMI Cloud was one of many providers Genblaze routes to (gateway model).

### Corrected Role (USER CLARIFICATION)

**GMI Cloud = LLM Backbone** (Primary Inference Provider)

**What This Means:**
- GMI Cloud is **THE** primary LLM/inference compute provider for the entire system
- **Not a gateway** to other providers (Google, OpenAI, Replicate are NOT relevant to our use case)
- Genblaze SDK = orchestration layer (pipeline chaining, B2 storage), NOT inference provider switcher

**Architectural Clarification:**

```
WRONG MODEL (Gateway):
Genblaze → routes to → [GMI Cloud OR Google OR OpenAI OR Replicate]
                       (pick one per request)

CORRECT MODEL (Backbone):
Genblaze (orchestration) → GMI Cloud (exclusive LLM/inference)
    ↓
B2 Storage (artifacts)
    ↓
Mobile PWA (consumption)
```

**SBIR Framing (Corrected):**
> "GMI Cloud serves as the LLM backbone, providing all inference compute (TRELLIS v1 splat generation, image generation, LLM-assisted code generation for AI copilot). Genblaze SDK orchestrates multi-step pipelines, with GMI Cloud as the exclusive compute provider and B2 as the storage sink."

**Company Alliance Roles (Corrected):**

| Company | Role | SBIR Innovation Component |
|---------|------|---------------------------|
| **Stadium Soundwave** (lead) | SCID pedagogy, AI copilot scaffolding logic, cultural data stewardship protocols | AI-bounded copilot behavior (Phase 1 → 2 → 3 progression) |
| **GMI Cloud** | **LLM backbone** — exclusive inference compute provider (TRELLIS v1, image gen, LLM queries) | On-demand generative media for field training scenarios |
| **Genblaze SDK** (open-source, no formal partnership) | Pipeline orchestration layer (`.step()` chaining, B2 storage sink) | Desktop-to-mobile artifact generation workflow |

**Key Difference:**
- **GMI Cloud is a company partner** (provides compute, listed as collaborator)
- **Genblaze is a tool/SDK** (open-source, no company partnership required)

---

## Recommendation: Open-Source SDK Approach

### Decision Rationale

**Primary Factors:**
1. **Timeline:** Next SBIR deadline achievable (~1 month) vs. 2-3 months for Backblaze coordination
2. **Funding:** $300K full retention vs. $225K/$75K split
3. **Technical flexibility:** Can extend Genblaze for 3D/splat without Backblaze approval
4. **GMI Cloud clarity:** Clean two-party relationship (Stadium Soundwave + GMI Cloud) vs. three-party (+ Backblaze)

**Trade-off Accepted:**
- Lower credibility signal (using existing tool vs. partnering with established company)
- **Mitigation:** Cite Genblaze SDK as proven infrastructure (Backblaze-maintained, production-ready); innovation is in **application** (AI-bounded scaffolding for vocational training), not **SDK extension**

**NSF SBIR Innovation Framing:**
> "This SBIR does not propose extending Genblaze SDK itself (feature request). It proposes a **novel application** of Genblaze's proven transport-layer pattern to competency-based vocational training:
>
> **Innovation 1:** AI copilot scaffolding that adapts to learner skill level (Guided → Assisted → Autonomous)
> **Innovation 2:** Desktop analytical surfaces (Observable, Hex, Streamlit) generate mobile-consumable learning artifacts via Genblaze orchestration
> **Innovation 3:** CARE Principles compliance layer (cultural data sovereignty) integrated into Genblaze → GMI Cloud → B2 pipeline
>
> Genblaze is the **enabling infrastructure** (like using TensorFlow for ML, not inventing TensorFlow). GMI Cloud is the **LLM backbone** (exclusive compute). Stadium Soundwave's innovation is the **pedagogical application** (SCID competency-based training)."

---

## Action Plan (Open-Source Approach)

### Immediate (This Week)

1. **Confirm Genblaze SDK license** (MIT/Apache? No partnership required for commercial use?)
2. **Draft 2-page NSF SBIR concept** (Stadium Soundwave + GMI Cloud, no Backblaze partnership)
3. **Clarify GMI Cloud commitment** (will they provide inference compute for SBIR project? Letter of support needed?)

### Short-Term (Next 2 Weeks)

1. **NSF SBIR AI topic application** (target next deadline, ~1 month prep)
2. **Technical approach section:**
   - Genblaze SDK = orchestration layer (open-source, proven)
   - GMI Cloud = LLM backbone (TRELLIS v1, image gen, LLM queries)
   - Stadium Soundwave = SCID competency engine + AI copilot logic
3. **Budget:** $300K full retention (no Backblaze subcontract)

### Long-Term (Post-SBIR Phase I)

1. **File Genblaze GitHub issue** (propose 3D/splat extension) AFTER Phase I funded
   - If funded: We have credibility ("NSF-backed innovation")
   - If rejected: Genblaze extension becomes Plan B (not primary innovation claim)
2. **Explore Backblaze partnership** for Phase II commercialization (if Genblaze SDK proves critical)

---

## Alternative: Hybrid Approach (Fallback)

**If GMI Cloud cannot commit to SBIR project:**

Fall back to **formal Genblaze partnership** with modified framing:
- Stadium Soundwave + Backblaze (Genblaze SDK extension for 3D/splat)
- Innovation = SDK extension itself (not just application)
- GMI Cloud downgraded to "optional inference provider" (Genblaze supports multiple)

**Only pursue if:**
- GMI Cloud cannot provide LLM backbone commitment
- Backblaze expresses interest in 3D/splat extension (confirms it's on their roadmap)
- Timeline allows 2-3 month coordination before SBIR deadline

**Otherwise:** Stick with **open-source SDK approach** (Stadium Soundwave + GMI Cloud, Genblaze as tool).

---

## Decision: Open-Source SDK Approach (Recommended)

**Rationale:**
- Faster timeline (1 month to next SBIR deadline)
- Full funding retention ($300K, no split)
- Clean GMI Cloud integration (LLM backbone, exclusive compute)
- Technical flexibility (extend Genblaze as needed, no Backblaze approval gate)

**Next Actions:**
1. Confirm Genblaze SDK license permits commercial use
2. Draft NSF SBIR concept (Stadium Soundwave lead, GMI Cloud LLM backbone)
3. Obtain GMI Cloud letter of support (commitment to provide inference compute)

**Trade-off accepted:** Lower credibility signal mitigated by framing Genblaze as proven infrastructure (like using TensorFlow), not as partnership requirement.

---

## Summary Table: Two Approaches

| Aspect | Formal Partnership | Open-Source SDK | ✅ Recommended |
|--------|-------------------|-----------------|---------------|
| **Lead Applicant** | Stadium Soundwave | Stadium Soundwave | — |
| **Partner Company** | Backblaze (subcontract) | GMI Cloud (compute provider) | **Open-Source** |
| **SBIR Funding Split** | $225K / $75K | $300K full | **Open-Source** |
| **Timeline to Submit** | 2-3 months | 1 month | **Open-Source** |
| **Innovation Claim** | Genblaze SDK extension | Novel application of Genblaze | **Open-Source** |
| **GMI Cloud Role** | Optional provider (Genblaze supports many) | **LLM backbone** (exclusive) | **Open-Source** |
| **Technical Flexibility** | Requires Backblaze approval | Full flexibility (fork if needed) | **Open-Source** |
| **Credibility Signal** | Higher (Backblaze endorsement) | Moderate (using proven tool) | **Partnership** |
| **Revenue Sharing (Phase II)** | May require Backblaze split | No revenue sharing | **Open-Source** |

**Decision:** Pursue **Open-Source SDK Approach** unless GMI Cloud cannot commit (then fallback to formal partnership).

---

**Status:** Ready for NSF SBIR concept draft (Stadium Soundwave + GMI Cloud, Genblaze as open-source orchestration layer).
