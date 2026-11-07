# SCID Architecture: Vocational Training Infrastructure

**Version:** 2.0 (Revised)
**Date:** August 2026
**Status:** Architectural Integration (Replaces Theoretical Model)

---

## Executive Summary

**SCID (Systematic Curriculum and Instructional Development)** is no longer a theoretical methodology—it's the **architectural backbone** of Guild Academy's technical infrastructure. This document integrates SCID with the current deploy shape: mobile-first AI copilot, multi-stance UI, ATProto credentials, and Digital Salon operational motions.

**Key Shift:** SCID is not a curriculum design process happening *outside* the technical system. It's the **schema layer** that structures how competencies, tasks, and learning outcomes are captured, validated, and issued as portable credentials.

---

## I. SCID as Schema Layer (Not Just Methodology)

### Traditional SCID (What We Started With)

**Systematic Curriculum and Instructional Development** (SCID) is a workforce training methodology:
1. **Analyze occupation** → identify duties, tasks, knowledge, skills
2. **Design curriculum** → map learning activities to competencies
3. **Deliver instruction** → scaffolded training with measurable outcomes
4. **Evaluate competency** → assessment against industry standards

**Problem:** This describes a *process* but not a *system architecture*. It doesn't specify:
- Where competency data is stored
- How tasks are tracked during training
- How AI copilot assistance is bounded by competency level
- How credentials are issued and verified

### SCID 2.0: Architectural Integration

**SCID as Schema Layer** means:
- **Competencies are data objects** (not just curriculum design artifacts)
- **Tasks are tracked in execution** (not just listed in syllabi)
- **Assessment is event-driven** (not just administered at course end)
- **Credentials are cryptographically verifiable** (not just PDF certificates)

---

## II. The Four-Layer SCID Architecture

### Layer 1: Competency Schema (DACUM → ATProto)

**What It Is:**
Competency definitions stored as **ATProto records** (not LinkML, which is superseded):

```typescript
// ATProto SCID Competency Record
interface CompetencyRecord {
  $type: 'codes.humancode.scid.competency'
  did: string  // Learner DID
  competencyId: string  // e.g., "viticulture.sensor-deployment"
  duties: Duty[]  // DACUM-defined occupational duties
  tasks: Task[]  // Specific tasks within each duty
  knowledge: KnowledgeArea[]  // Required knowledge domains
  skills: Skill[]  // Required technical/practical skills
  assessmentCriteria: AssessmentCriterion[]
  issuedAt: string  // ISO timestamp
  issuer: string  // Guild Academy DID
}

interface Duty {
  id: string
  title: string  // e.g., "Deploy Environmental Sensors"
  description: string
  tasks: string[]  // Task IDs
}

interface Task {
  id: string
  dutyId: string
  title: string  // e.g., "Calibrate soil moisture sensor"
  scaffoldLevel: 'guided' | 'assisted' | 'autonomous'  // PBL phase
  aiCopilotBounds: CopilotBounds  // What AI can/cannot do
  mobileDeployment: boolean  // Is this field task?
  evidenceType: 'observation' | 'artifact' | 'demonstration'
}
```

**Storage:**
- **ATProto PDS (Personal Data Server)** for learner competency records
- **Sanity CMS** for curriculum design templates (OPERATOR stance authoring)
- **Obsidian vault** for DACUM analysis artifacts (SOP-18 episodic traces)

**Why This Matters:**
Competencies aren't static curriculum documents—they're **queryable, versionable data** that AI copilot and mobile UI can read to determine what assistance is appropriate for learner's current level.

---

### Layer 2: Scaffolded Learning Execution (PBL Phases → Mobile UI)

**What It Is:**
The three PBL (Project-Based Learning) phases from Guild Academy Charter are **UI states** in the mobile-first deployment:

| PBL Phase | Scaffolding Level | AI Copilot Behavior | Mobile UI State | Example (Viticulture) |
|-----------|-------------------|---------------------|-----------------|------------------------|
| **Phase 1: Conceptual Grounding** | Guided | AI generates code, learner validates against domain requirements | Tutorial mode, step-by-step prompts | "Sensor placement: AI suggests locations based on vineyard map, you validate based on soil variability you observe" |
| **Phase 2: Scaffolded Contribution** | Assisted | AI assists on request, learner drives | Co-pilot mode, learner initiates requests | "Data upload: You write upload script, AI helps debug connection errors" |
| **Phase 3: Autonomous Production** | Autonomous | AI available as reference only, no auto-generation | Expert mode, AI is lookup tool | "Sensor maintenance: You troubleshoot independently, AI provides docs on request" |

**Technical Implementation:**

```typescript
// Mobile UI reads learner's current PBL phase from ATProto record
async function getCopilotBehavior(learnerId: string, taskId: string) {
  const competencyRecord = await atproto.getRecord(learnerId, 'scid.competency')
  const task = competencyRecord.tasks.find(t => t.id === taskId)
  const scaffoldLevel = task.scaffoldLevel
  
  switch(scaffoldLevel) {
    case 'guided':
      return { mode: 'tutorial', aiInitiates: true, stepByStep: true }
    case 'assisted':
      return { mode: 'copilot', aiInitiates: false, onRequest: true }
    case 'autonomous':
      return { mode: 'expert', aiInitiates: false, referenceOnly: true }
  }
}
```

**Why Mobile-First:**
Field tasks (vineyard sensor deployment, oyster farm monitoring) cannot wait for desktop access. Mobile UI must:
- Display current task from competency record
- Adjust AI copilot behavior based on scaffolding level
- Capture evidence (photos, sensor readings, voice notes) in-field
- Sync to ATProto record when connectivity available

---

### Layer 3: Evidence Capture & Assessment (Mobile → ATProto → VC Issuance)

**What It Is:**
Assessment is **event-driven** (not batch-administered):

```typescript
// Evidence capture flow (mobile field task)
interface EvidenceEvent {
  learnerId: string
  taskId: string
  evidenceType: 'observation' | 'artifact' | 'demonstration'
  timestamp: string
  location?: GeoCoordinates  // If field task
  artifacts: {
    photos?: string[]  // B2 URLs
    sensorReadings?: Record<string, number>
    voiceNotes?: string[]  // Transcribed via Whisper
  }
  assessorDid?: string  // If observed by instructor
  selfAssessment?: string  // Learner reflection
  aiCopilotLog?: CopilotInteraction[]  // What AI assistance was used
}

// Assessment triggers VC issuance when competency complete
async function assessCompetency(learnerId: string, competencyId: string) {
  const evidenceEvents = await atproto.query({
    learnerId,
    competencyId,
    type: 'scid.evidence'
  })
  
  const assessmentCriteria = await getCompetencyCriteria(competencyId)
  const meetsAllCriteria = assessmentCriteria.every(criterion => 
    evidenceEvents.some(e => satisfiesCriterion(e, criterion))
  )
  
  if (meetsAllCriteria) {
    await issueVerifiableCredential(learnerId, competencyId)
  }
}
```

**Storage:**
- **Evidence artifacts** → Backblaze B2 (photos, sensor data, voice recordings)
- **Evidence metadata** → ATProto records (timestamps, task IDs, assessor signatures)
- **Assessment decisions** → Obsidian vault (SOP-18 episodic trace: "Learner X achieved competency Y on date Z")
- **Verifiable Credentials** → ATProto PDS (portable, cryptographically signed)

**Why This Matters:**
Traditional SCID assessment happens at *course completion* (batch testing). Guild Academy assessment is **continuous, in-field, evidence-based**—aligned with how work actually happens.

---

### Layer 4: Credential Issuance & Verification (ATProto VCs)

**What It Is:**
Verifiable Credentials (VCs) issued as ATProto records:

```typescript
interface GuildAcademyVC {
  $type: 'codes.humancode.credential.technical'
  issuer: 'did:web:atproto.humancode.codes'  // Guild Academy DID
  subject: string  // Learner DID
  competencyId: string
  competencyTitle: string  // e.g., "Viticulture Sensor Deployment"
  issuedAt: string
  evidenceSummary: {
    tasksCompleted: number
    fieldHours: number
    artifactsProduced: string[]  // URLs to B2 artifacts
  }
  assessor: string  // Instructor/mentor DID
  expiresAt?: string  // If time-limited (e.g., safety certifications)
  signature: string  // Cryptographic proof
}
```

**Verification Flow:**
1. **Employer requests credential** → learner shares ATProto DID
2. **Employer queries ATProto PDS** → retrieves VC
3. **Employer verifies signature** → confirms Guild Academy issued it
4. **Employer inspects evidence** → can drill down to specific artifacts (sensor data, photos)

**Why Portable:**
- **No platform lock-in** — learner owns DID, can move to any ATProto-compatible system
- **Employer-verifiable** — no need to contact Guild Academy for confirmation
- **Evidence-linked** — not just "completed course X," but "deployed 12 sensors across 3 vineyards with these data outputs"

---

## III. Integration with Current Deploy Shape

### Deploy Shape Components (As Built)

From Confluence synthesis and current codebase:

| Component | Status | SCID Integration Point |
|-----------|--------|------------------------|
| **Digital Salon (Discord Activities)** | Live (CEAZ-193) | Salon rooms = cohort coordination; Motion #6 (Producer facilitation training) = first SCID competency |
| **Mobile deployment surface** | Architected (161316876) | Field task execution UI; AI copilot scaffolding |
| **ATProto DIDs** | Live (`did:web:atproto.humancode.codes`) | Competency records + VC issuance |
| **Stance lens (GUEST/OPERATOR/VENUE/PROTOCOL)** | Data exists, UI missing (ENG-389) | GUEST = learner view; OPERATOR = instructor view; PROTOCOL = assessor view |
| **Obsidian vault (SOP-18)** | Live (vault-mcp) | DACUM analysis artifacts; assessment episodic traces |
| **Backblaze B2** | Live | Evidence artifact storage (photos, sensor data) |
| **Sanity CMS** | Live | Curriculum template authoring (OPERATOR stance) |

### Integration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   SCID ARCHITECTURE LAYERS                   │
└─────────────────────────────────────────────────────────────┘

Layer 1: COMPETENCY SCHEMA
┌────────────────┐         ┌────────────────┐
│ ATProto PDS    │◄────────│ Sanity CMS     │
│ (learner VCs)  │         │ (templates)    │
└────────┬───────┘         └────────────────┘
         │
         │ Query competency → determine scaffolding
         ▼
Layer 2: SCAFFOLDED EXECUTION
┌────────────────────────────────────────┐
│   Mobile UI (Field Task Interface)    │
│                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────┐│
│  │ Guided   │  │ Assisted │  │ Auto ││
│  │ (AI gen) │  │ (AI help)│  │ (ref)││
│  └──────────┘  └──────────┘  └──────┘│
└────────┬───────────────────────────────┘
         │
         │ Capture evidence during task
         ▼
Layer 3: EVIDENCE CAPTURE
┌────────────────┐         ┌────────────────┐
│ Backblaze B2   │◄────────│ Mobile Camera  │
│ (artifacts)    │         │ (field photos) │
└────────┬───────┘         └────────────────┘
         │
         │ Evidence → assessment → VC issuance
         ▼
Layer 4: CREDENTIAL ISSUANCE
┌────────────────┐         ┌────────────────┐
│ ATProto VC     │─────────│ Employer       │
│ (signed)       │  verify │ (query DID)    │
└────────────────┘         └────────────────┘

Cross-Cutting:
┌────────────────┐  Episodic traces (assessment decisions)
│ Obsidian Vault │  DACUM artifacts (competency definitions)
└────────────────┘

┌────────────────┐  GUEST (learner), OPERATOR (instructor),
│ Stance Lens    │  PROTOCOL (assessor) views into all layers
└────────────────┘
```

---

## IV. Example: Walla Walla CC Viticulture Pilot

### Competency: Vineyard Sensor Deployment

**DACUM Analysis (Layer 1):**

**Duty:** Deploy environmental sensors in vineyard settings
**Tasks:**
1. Site assessment (soil variability, sun exposure, water access)
2. Sensor selection (moisture, temperature, pH)
3. Installation (placement, calibration, power)
4. Data validation (initial readings, connectivity test)
5. Maintenance protocol (battery check, cleaning, troubleshooting)

**Knowledge Areas:**
- Vineyard phenology (growth stages, environmental needs)
- Sensor technology (IoT protocols, data transmission)
- Data sovereignty (CARE Principles, tribal land considerations)

**Skills:**
- Field observation (soil assessment, microclimate analysis)
- Technical installation (hardware setup, calibration)
- Data interpretation (reading sensor outputs, identifying anomalies)

---

### Scaffolded Execution (Layer 2)

**Phase 1: Guided (Weeks 1-4)**

**Task 1.1: Site Assessment**
- **Mobile UI:** Camera overlay shows vineyard map with AI-suggested sensor locations
- **AI Copilot:** "Based on this vineyard's slope and irrigation layout, I recommend 6 sensors at these coordinates. You validate by walking the site and checking soil by hand."
- **Learner Action:** Walks vineyard, uses mobile app to confirm/adjust suggested locations based on actual soil feel, shade patterns
- **Evidence Capture:** Photos of each proposed site, voice note explaining adjustments

**Phase 2: Assisted (Weeks 5-8)**

**Task 2.1: Sensor Installation**
- **Mobile UI:** Step-by-step installation guide, learner initiates each step
- **AI Copilot:** Available on request for troubleshooting ("Why isn't sensor connecting?" → AI suggests common connectivity issues)
- **Learner Action:** Installs sensors independently, consults AI only when stuck
- **Evidence Capture:** Sensor serial numbers logged, calibration readings, connectivity test screenshot

**Phase 3: Autonomous (Weeks 9-12)**

**Task 3.1: Maintenance Protocol**
- **Mobile UI:** Maintenance checklist, no AI prompts
- **AI Copilot:** Reference docs only ("Show me battery replacement procedure")
- **Learner Action:** Conducts monthly sensor check independently, troubleshoots issues without AI code generation
- **Evidence Capture:** Maintenance log (dates, actions taken, sensor status)

---

### Assessment & VC Issuance (Layers 3-4)

**Assessment Criteria:**
- ✅ 6 sensors deployed across 2 vineyard blocks
- ✅ All sensors transmitting valid data for 30+ days
- ✅ Learner can troubleshoot connectivity issue without AI assistance (Phase 3 demonstration)
- ✅ Maintenance protocol documented in field log

**Evidence Collected:**
- 18 site assessment photos (B2 storage)
- Sensor calibration data (CSV files, B2 storage)
- Maintenance log (Obsidian vault trace)
- Instructor observation (assessor DID signature on Phase 3 demonstration)

**VC Issued:**
```json
{
  "$type": "codes.humancode.credential.technical",
  "issuer": "did:web:atproto.humancode.codes",
  "subject": "did:plc:student123walla",
  "competencyId": "viticulture.sensor-deployment",
  "competencyTitle": "Vineyard Environmental Sensor Deployment",
  "issuedAt": "2026-12-15T00:00:00Z",
  "evidenceSummary": {
    "tasksCompleted": 5,
    "fieldHours": 36,
    "artifactsProduced": [
      "https://b2.humancode.codes/walla-walla/student123-site-assessment.zip",
      "https://b2.humancode.codes/walla-walla/student123-sensor-data.csv"
    ]
  },
  "assessor": "did:web:instructor.wallawalla.edu",
  "signature": "..."
}
```

**Employer Verification:**
Winery hiring manager queries `did:plc:student123walla` → sees VC → clicks evidence links → reviews actual sensor data student collected → confident in competency, not just certification claim.

---

## V. Differences from Traditional SCID

| Traditional SCID | Guild Academy SCID 2.0 |
|------------------|------------------------|
| **Curriculum document** (PDF, LMS module) | **Data schema** (ATProto records) |
| **Batch assessment** (final exam) | **Continuous evidence** (field artifacts) |
| **Desktop-bound** (classroom, computer lab) | **Mobile-first** (field deployment surface) |
| **Instructor-only view** | **Multi-stance** (GUEST learner, OPERATOR instructor, PROTOCOL assessor) |
| **PDF certificate** (not verifiable) | **Verifiable Credential** (cryptographic signature, evidence-linked) |
| **AI prohibited** (academic integrity) | **AI bounded by scaffold level** (Phase 1 AI generates, Phase 3 AI references only) |
| **Platform-captured** (LMS vendor lock-in) | **Portable** (learner owns DID, takes credentials anywhere) |

---

## VI. B2B Integration Points

From B2B_VOCATIONAL_TRAINING.md, SCID architecture enables:

### Service Package Deliverables

**Package 1: Foundation Cohort ($75K)**
- **Deliverable:** "1 Pattern Module published to library"
  - **SCID Implementation:** Pattern Module = DACUM competency schema + mobile UI scaffold + assessment criteria
  - **Example:** "Vineyard Sensor Deployment" competency record + mobile field task UI + evidence capture flow

**Package 2: Infrastructure Co-Design ($150K)**
- **Deliverable:** "Production code contributions (measured in commits, PRs merged)"
  - **SCID Implementation:** Phase 3 autonomous contributions tracked via git commits, linked to learner DID in VC evidence
  - **Example:** Student's sensor data processing script merged to production repo, commit hash included in VC

**Package 3: Continuous Capacity Building ($200K/year)**
- **Deliverable:** "Pattern Library access for all employees"
  - **SCID Implementation:** Pattern Library = searchable competency schemas (ATProto query interface)
  - **Example:** Hospitality staff query "accessibility.wheelchair-navigation" competency, see tasks/evidence required

---

### Revenue Model Enhancement

**New Revenue Stream: SCID Schema Licensing**
- **What:** Competency schemas (DACUM analysis + mobile UI scaffold + assessment criteria) licensed to other vocational training providers
- **Pricing:** $5K-15K per competency schema
- **Example:** Walla Walla CC's "Vineyard Sensor Deployment" competency licensed to Napa Valley College, Oregon State University viticulture programs

**Why This Works:**
SCID schemas are **portable, reusable infrastructure** — not custom one-off curricula. Other institutions can adopt Guild Academy competency definitions without rebuilding from scratch.

---

## VII. Risks & Mitigations

### Risk 1: SCID Schema Overhead (Too Complex for Small Cohorts)

**Risk:** Defining competency schemas, building mobile UI scaffolds, and setting up ATProto infrastructure is heavy lift for 10-person pilot cohort.

**Mitigation:**
- **Start with 3 high-value competencies** (sensor deployment, spatial visualization, data governance) that apply across multiple domains (viticulture, hospitality, environmental monitoring)
- **Reuse schemas across cohorts** — Walla Walla CC viticulture competency becomes template for Oregon vineyard training, Napa enology program
- **Schema library grows incrementally** — not all competencies need full mobile UI in Year 1

---

### Risk 2: Mobile Deployment Technical Debt

**Risk:** Building mobile-first UI for field tasks is expensive (iOS + Android, offline sync, camera/sensor integration).

**Mitigation:**
- **Start with Progressive Web App (PWA)** — mobile-responsive web app, works offline via service workers, camera API access without app store distribution
- **Defer native apps to Year 2** — PWA covers 80% of field task use cases (photo capture, form submission, GPS tagging)
- **Leverage existing infrastructure** — Backblaze B2 already handles artifact storage, ATProto already handles credential issuance

**Technical Spec:**
- **Framework:** SvelteKit PWA (fast, small bundle size, offline-first)
- **Offline sync:** IndexedDB for local storage, background sync when connectivity available
- **Camera:** WebRTC getUserMedia API (works in mobile browsers)
- **Cost:** $15K-30K development (vs. $50K-100K for native iOS+Android apps)

---

### Risk 3: Assessor Availability (Who Signs VCs?)

**Risk:** Traditional SCID requires trained assessors to evaluate competency. Guild Academy model assumes instructor/mentor can cryptographically sign VCs — but what if instructor lacks ATProto DID?

**Mitigation:**
- **Instructor onboarding includes DID setup** — part of Package 1/2 deliverables is setting up institutional DIDs (`did:web:instructor.wallawalla.edu`)
- **Peer assessment layer** — Phase 3 autonomous tasks can be validated by peer review (guild master model from Charter Phase 4)
- **Automated evidence validation** — some tasks (sensor data transmission for 30 days, git commits merged) don't require human assessor signature, just verifiable timestamps

---

## VIII. Implementation Roadmap

### Q4 2026: Foundation Layer

**Deliverables:**
1. **ATProto competency schema** (TypeScript definitions, sample records)
2. **3 pilot competency schemas** (vineyard sensor deployment, accessible AR navigation, economic sovereignty API)
3. **DACUM analysis artifacts** (Obsidian vault templates for duties/tasks/knowledge/skills)
4. **Sanity CMS competency authoring UI** (OPERATOR stance template builder)

**Timeline:** 8 weeks
**Cost:** $25K (engineering) + $10K (DACUM facilitation with Walla Walla CC)

---

### Q1 2027: Mobile Execution Surface

**Deliverables:**
1. **SvelteKit PWA** (mobile field task UI)
2. **Scaffolding logic** (Phase 1/2/3 AI copilot behavior switching)
3. **Evidence capture flow** (camera, GPS, sensor data upload to B2)
4. **Offline sync** (IndexedDB local storage, background sync)

**Timeline:** 12 weeks
**Cost:** $30K (PWA development) + $5K (B2 infrastructure scaling)

---

### Q2 2027: Assessment & VC Issuance

**Deliverables:**
1. **Evidence assessment logic** (query ATProto evidence events, match against criteria)
2. **VC issuance flow** (cryptographic signing, ATProto record creation)
3. **Instructor DID onboarding** (institutional DID setup for Walla Walla CC)
4. **Employer verification demo** (query DID, retrieve VC, drill down to evidence artifacts)

**Timeline:** 8 weeks
**Cost:** $20K (VC infrastructure) + $5K (instructor onboarding materials)

---

### Q3 2027: Multi-Stance UI (ENG-389)

**Deliverables:**
1. **GUEST stance** (learner view: current tasks, progress toward competency, evidence submitted)
2. **OPERATOR stance** (instructor view: cohort progress, evidence review queue, VC issuance dashboard)
3. **PROTOCOL stance** (assessor view: governance obligations, SOP-18 trace requirements, cultural stewardship flags)
4. **Role-filtered operator shell** (`?role=venue-manager|cultural-steward|technical-editor`)

**Timeline:** 10 weeks
**Cost:** $25K (multi-stance UI implementation)

---

**Total Year 1 Cost:** $120K (infrastructure build)
**Revenue Offset:** Package 1 Foundation Cohort ($75K) + SCID schema licensing ($15K) = $90K
**Net Investment:** $30K (well within B2B financial projections)

---

## IX. Success Metrics

### Technical Metrics

- **Competency schemas deployed:** 3 (Year 1) → 10 (Year 2) → 25 (Year 3)
- **VCs issued:** 10 (pilot cohort) → 50 (Year 2) → 150 (Year 3)
- **Evidence artifacts captured:** 500+ (photos, sensor data, voice notes in B2)
- **Mobile PWA uptime:** 99%+ (offline-first architecture)
- **Employer verification queries:** 20+ (Year 1) → 100+ (Year 2)

### Educational Metrics

- **Competency completion rate:** 80%+ (learners complete all tasks, receive VC)
- **Time to competency:** 12 weeks (Foundation Cohort) vs. 2-5 years (traditional degree)
- **Field task completion:** 100% mobile (no desktop-bound barriers)
- **AI copilot progression:** 90%+ learners reach Phase 3 autonomous by cohort end

### Business Metrics

- **SCID schema licensing revenue:** $15K (Year 1) → $75K (Year 2, 5 schemas licensed to 3 institutions)
- **Pattern Module reuse:** 3 schemas used across 2+ cohorts (Walla Walla CC + hospitality partner)
- **Employer adoption:** 10+ employers query VCs for hiring decisions (Year 2)

---

## X. Conclusion: SCID as Infrastructure, Not Curriculum

**Old Model:** SCID = curriculum design methodology (process document, training for instructors)

**New Model:** SCID = vocational training infrastructure (data schema, mobile deployment surface, credential issuance system)

**Why This Matters:**
- **Scalability:** Competency schemas are reusable across cohorts, domains, institutions
- **Portability:** Learners own DIDs, take credentials anywhere (no platform lock-in)
- **Verifiability:** Employers see evidence, not just certification claims
- **AI-bounded:** Copilot behavior adapts to scaffolding level (guided → assisted → autonomous)
- **Mobile-first:** Field practitioners included, not excluded by desktop-bound tooling

The organizational species model (Strategic Framework §Core Thesis) claimed we **encompass categories rather than being contained by them**. SCID 2.0 proves it: we're not a "vocational training provider" (contained by education category) or a "credentialing platform" (contained by HR-tech category). We're infrastructure that **enables vocational training, credentialing, workforce development, and cultural stewardship** to coexist in one system.

---

**Next Actions:**
1. **Finalize 3 pilot competency schemas** (vineyard sensor deployment, accessible AR navigation, economic sovereignty API) by Sept 2026
2. **Kickoff PWA development** (SvelteKit mobile UI) Oct 2026
3. **Walla Walla CC institutional DID setup** (instructor onboarding) Nov 2026
4. **First VC issued** Dec 2026 (pilot cohort completion)

SCID is no longer theoretical. It's the schema layer that makes Guild Academy technically credible, not just pedagogically sound.
