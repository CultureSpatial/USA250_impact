'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";

const GuildAcademyCharter = () => {
  const [activeTab, setActiveTab] = useState("mandate");

  const charter = {
    title: "Guild Academy Technical Infrastructure Charter",
    version: "1.0",
    effective: "January 6, 2026",
    authority: "ARIA-X Technical Council + OTEC Constitutional Framework",
    foundation: "UMCES-CGC (University of Maryland Center for Environmental Science - Chesapeake Global Collaboratory)"
  };

  const departmentMandateComparison = {
    notThisDepartment: {
      title: "NOT: HR/DEI Training Department",
      characteristics: [
        "Teaches cultural sensitivity workshops",
        "Recruits based on demographic quotas",
        "Measures success via representation percentages",
        "Treats diversity as separate initiative",
        "Assumes infrastructure exists, trains people to use it"
      ],
      ownership: "VP of Diversity, HR, Compliance"
    },
    thisDepartment: {
      title: "IS: Technical Infrastructure R&D Department",
      characteristics: [
        "Builds infrastructure with co-designers from inception",
        "Recruits based on technical expertise (lived experience as qualification)",
        "Measures success via infrastructure performance validation",
        "Treats inclusive design as engineering requirement",
        "Assumes infrastructure cannot exist without special interest expertise"
      ],
      ownership: "Engineering + Community Stewards + UMCES-CGC Research Partners"
    }
  };

  const umcesCgcFoundation = {
    overview: "Guild Academy is grounded in UMCES-CGC technical capacity model. Not theoretical; operationalized at Chesapeake Bay scale.",
    keyPrograms: [
      {
        program: "AI/ML Workshop (WORKSHOP-CGC-SCIPE-AI-ML-2025)",
        guildApplication: "Sensor Deployment Guild uses CGC ML models for environmental telemetry. Indigenous monitors trained on these models via PBL.",
        articulationLiteracy: "AI copilots help non-coders articulate sensor needs in natural language, which compile to Python/Jupyter."
      },
      {
        program: "Learning Resources (Learning-Resources repo)",
        guildApplication: "Pattern Library Guild curates CGC learning pathways. Multilingual technical writers adapt for cross-cultural contexts.",
        articulationLiteracy: "AI translation of technical docs enables Coast Salish language preservation in documentation."
      },
      {
        program: "Data Intern Projects (Data-Intern-Projects)",
        guildApplication: "Curriculum Steward track adapted from CGC intern model. PBL: Interns build real projects (oyster monitoring, water quality).",
        articulationLiteracy: "Interns use AI pair programming to bridge skill gaps (learn Python while contributing to production code)."
      },
      {
        program: "Chesapeake Bay Program Water Quality Modeling (CBP-CDF)",
        guildApplication: "Data Governance Guild uses CBP multi-stakeholder data model as blueprint for tribal + municipal + federal data commons.",
        articulationLiteracy: "AI query interfaces allow non-technical stakeholders to extract insights without SQL expertise."
      }
    ],
    sovereignty: "UMCES-CGC model proves technical rigor + community co-design coexist. Guild Academy replicates this for viticulture/hospitality."
  };

  const articulationLiteracy = {
    definition: "The ability to express technical needs/constraints in domain language, supported by AI that compiles to code.",
    problem: "Traditional barrier: 'I know what sensor data I need (Indigenous ecological knowledge) but I cannot code the pipeline.'",
    solution: "AI copilot: 'Describe the data you need.' → Auto-generates Python ETL pipeline → Tribal monitor reviews/approves.",
    examples: [
      {
        role: "Indigenous Environmental Monitor (Sensor Deployment Guild)",
        traditionalBarrier: "Requires CS degree to deploy sensors + write data pipelines.",
        aiAssistedPath: "Uses natural language to specify: 'I need water temp every 15min during salmon run season.' AI generates sensor config + data pipeline. Monitor validates against TEK (Traditional Ecological Knowledge).",
        pblProject: "Fort Vancouver Sensor Network Pilot: Monitor deploys 5 sensors, AI assists with data QA, publishes findings to Pattern Library."
      },
      {
        role: "Wheelchair User (Spatial Viz Guild)",
        traditionalBarrier: "Requires Unity/Unreal Engine expertise to design accessible AR navigation.",
        aiAssistedPath: "Uses conversational interface: 'Show me obstacles wheelchair users face in this fan zone.' AI generates 3D heatmap from crowd telemetry. User validates against lived navigation experience.",
        pblProject: "FIFA World Cup Accessibility Audit: User tests AR navigation at stadium, AI logs pain points, venue adjusts layout."
      },
      {
        role: "BIPOC Restaurant Owner (Hospitality Integration Guild)",
        traditionalBarrier: "Requires API expertise to integrate Resy with POS system.",
        aiAssistedPath: "Uses dashboard: 'Show me real-time revenue split.' AI queries API, renders transparency dashboard. Owner validates economic sovereignty (seeing exact 70/20/10 splits).",
        pblProject: "Royal Sonesta Revenue Audit: Owner reviews weekly splits, flags discrepancies, AI adjusts allocation logic."
      },
      {
        role: "Multilingual Technical Writer (Pattern Library Guild)",
        traditionalBarrier: "Requires CS + linguistics expertise to document code in multiple languages.",
        aiAssistedPath: "Uses AI translation: 'Translate this sensor deployment guide to Coast Salish.' AI generates draft, writer validates cultural nuance (e.g., traditional terms for water quality).",
        pblProject: "Fort Vancouver Documentation: Writer publishes bilingual guide (English + Coast Salish), becomes Pattern Module in library."
      }
    ]
  };

  const pblMethodology = {
    principle: "Learn by Building Real Infrastructure (Not Simulations)",
    contrast: {
      traditional: "Classroom: Learn Python → Graduate → Hope to find job → Contribute to real project (5+ years)",
      pbl: "Guild: Join project needing your lived expertise → AI assists with technical gaps → Contribute to production code (6-12 weeks)"
    },
    phases: [
      {
        phase: "Phase 1: Induction (Week 1-2)",
        activity: "New guild member joins active project (e.g., Fort Vancouver sensor deployment). AI onboarding: 'Here is the codebase. Here is your first task.'",
        outcome: "Member understands project context, identifies where their expertise is critical."
      },
      {
        phase: "Phase 2: Assisted Contribution (Week 3-6)",
        activity: "Member works on real task (e.g., validating sensor placement against TEK). AI copilot fills technical gaps (generates Python scripts, explains code).",
        outcome: "Member makes first commit to production. AI explains what the code does, member validates it meets domain requirements."
      },
      {
        phase: "Phase 3: Autonomous Contribution (Week 7-12)",
        activity: "Member leads sub-project (e.g., designing tribal data sovereignty protocol). AI becomes tool (not crutch). Member reviews AI-generated code, accepts/rejects.",
        outcome: "Member publishes Pattern Module to library. Receives 'Technical Architect' VC credential."
      },
      {
        phase: "Phase 4: Mentorship (Ongoing)",
        activity: "Member onboards next cohort. AI assists with curriculum generation (e.g., 'Explain tribal sovereignty protocols to new member').",
        outcome: "Member becomes guild master. Pattern replicates to new regions."
      }
    ],
    validation: "UMCES-CGC Data Intern model proves this works. Interns with minimal coding background contribute to Chesapeake Bay research within weeks."
  };

  const constitutionalBounds = [
    {
      bound: "AI Transparency Requirement",
      rule: "All AI-generated code must be explainable to guild member. 'Black box' tools prohibited.",
      rationale: "Member must understand what the code does to validate it respects domain constraints (e.g., tribal sovereignty)."
    },
    {
      bound: "Human Approval Gate",
      rule: "AI cannot auto-commit to production. Guild member reviews/approves all code.",
      rationale: "Sovereignty: Member owns the infrastructure, not the AI."
    },
    {
      bound: "Lived Expertise Primacy",
      rule: "When AI recommendation conflicts with member's domain expertise, member wins.",
      rationale: "AI knows code patterns; member knows cultural protocols. Culture > Code."
    },
    {
      bound: "Pattern Ownership",
      rule: "Guild members own Pattern Modules they create (AT Protocol portable VCs).",
      rationale: "Knowledge sovereignty: Contributions are not platform-captured."
    },
    {
      bound: "Economic Floor",
      rule: "If training is ever monetized: Member ≥30%, Platform ≤50%, Trainers 20-30%.",
      rationale: "No extraction of training labor. Members are producers, not products."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-indigo-600">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <div>
              <CardTitle className="text-2xl">{charter.title}</CardTitle>
              <p className="text-muted-foreground">Version {charter.version} | Effective: {charter.effective}</p>
              <p className="text-sm text-muted-foreground mt-1">Foundation: {charter.foundation}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-red-50 dark:bg-red-950">
              <CardHeader>
                <Badge variant="destructive" className="w-fit">NOT This</Badge>
                <CardTitle className="text-lg">{departmentMandateComparison.notThisDepartment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {departmentMandateComparison.notThisDepartment.characteristics.map((item, i) => (
                    <li key={i} className="text-red-600">✗ {item}</li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">Ownership: {departmentMandateComparison.notThisDepartment.ownership}</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950">
              <CardHeader>
                <Badge variant="default" className="w-fit">IS This</Badge>
                <CardTitle className="text-lg">{departmentMandateComparison.thisDepartment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {departmentMandateComparison.thisDepartment.characteristics.map((item, i) => (
                    <li key={i} className="text-green-600">✓ {item}</li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">Ownership: {departmentMandateComparison.thisDepartment.ownership}</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mandate">Department Mandate</TabsTrigger>
          <TabsTrigger value="umces">UMCES-CGC Foundation</TabsTrigger>
          <TabsTrigger value="articulation">Articulation Literacy</TabsTrigger>
          <TabsTrigger value="pbl">PBL Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="mandate" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Definition: Technical Infrastructure R&D</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-bold mb-2">Core Mission</div>
                <p className="text-sm">Build infrastructure that validates with the hardest governance cases (tribal sovereignty, disability accessibility) by recruiting technical specialists with lived expertise to co-design from inception.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                <div className="font-bold mb-2">Why Not HR/DEI Department?</div>
                <p className="text-sm">HR/DEI assumes infrastructure exists and trains people to use it. We assume infrastructure cannot exist without co-design. This is an engineering mandate, not a cultural initiative.</p>
              </div>
              <div>
                <div className="font-bold mb-2">5 Guild Technical Authorities</div>
                <ul className="space-y-1 text-sm">
                  <li>• Sovereignty & Sensor Architect (CGC-grade environmental telemetry + Tribal protocols)</li>
                  <li>• Spatial & Accessibility Architect (AR/VR + Disability UX)</li>
                  <li>• Economic Sovereignty Architect (API integration + BIPOC revenue equity)</li>
                  <li>• Narrative Governance Architect (Multi-Ontology + OHI monitoring)</li>
                  <li>• Pattern Architect (Cross-Cultural Knowledge Transfer)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="umces" className="space-y-4 mt-6">
          <Card className="bg-purple-50 dark:bg-purple-950">
            <CardHeader>
              <CardTitle>UMCES-CGC: The Technical Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{umcesCgcFoundation.overview}</p>
            </CardContent>
          </Card>

          {umcesCgcFoundation.keyPrograms.map((program, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{program.program}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Guild Application</div>
                  <div className="text-sm bg-muted p-2 rounded">{program.guildApplication}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                  <div className="text-sm font-medium mb-1">Articulation Literacy Integration</div>
                  <div className="text-sm">{program.articulationLiteracy}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-indigo-50 dark:bg-indigo-950">
            <CardContent className="pt-4">
              <div className="font-bold mb-2">Sovereignty Validation</div>
              <p className="text-sm">{umcesCgcFoundation.sovereignty}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articulation" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Articulation Literacy: AI-Assisted Technical Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-bold mb-1">Definition</div>
                <p className="text-sm">{articulationLiteracy.definition}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                  <div className="text-sm font-bold mb-1">Traditional Barrier</div>
                  <div className="text-xs">{articulationLiteracy.problem}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                  <div className="text-sm font-bold mb-1">AI-Assisted Solution</div>
                  <div className="text-xs">{articulationLiteracy.solution}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {articulationLiteracy.examples.map((example, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{example.role}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-red-500 line-through">Barrier: {example.traditionalBarrier}</div>
                <div className="bg-green-50 dark:bg-green-950 p-2 rounded text-sm">AI Path: {example.aiAssistedPath}</div>
                <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-sm">
                  <strong>PBL Project:</strong> {example.pblProject}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pbl" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project-Based Learning (PBL) Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="font-bold mb-2">Principle</div>
                <p className="text-sm">{pblMethodology.principle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                  <div className="text-sm font-bold mb-1">Traditional Path</div>
                  <div className="text-xs">{pblMethodology.contrast.traditional}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                  <div className="text-sm font-bold mb-1">PBL Path</div>
                  <div className="text-xs">{pblMethodology.contrast.pbl}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {pblMethodology.phases.map((phase, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>{phase.phase.split(":")[0]}</Badge>
                  <CardTitle className="text-base">{phase.phase.split(": ")[1]}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm bg-muted p-2 rounded">{phase.activity}</div>
                <div className="text-sm bg-green-50 dark:bg-green-950 p-2 rounded">
                  <strong>Outcome:</strong> {phase.outcome}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-purple-50 dark:bg-purple-950">
            <CardContent className="pt-4">
              <div className="font-bold mb-2">Validation</div>
              <p className="text-sm">{pblMethodology.validation}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-2 border-orange-600">
        <CardHeader>
          <CardTitle>Constitutional Bounds (AI + Human Partnership)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {constitutionalBounds.map((item, idx) => (
              <Card key={idx}>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{item.bound}</div>
                    <Badge variant="outline">Constitutional</Badge>
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">{item.rule}</div>
                  <div className="text-xs text-muted-foreground italic">Rationale: {item.rationale}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-indigo-600">
        <CardHeader>
          <CardTitle>Next Steps: Operationalizing the Charter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded">
              <div className="font-bold mb-2">Immediate (This Week)</div>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Update OTEC-22 (Jira) to reference this Charter as source of truth</li>
                <li>Update CUL-19 (Linear) agent directive to enforce Constitutional Bounds</li>
                <li>Publish Charter to Pattern Library (becomes Pattern Module)</li>
              </ol>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
              <div className="font-bold mb-2">Near-Term (Q1 2026)</div>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Deploy first PBL cohort: Fort Vancouver Sensor Deployment (5 Indigenous monitors)</li>
                <li>Integrate UMCES-CGC AI/ML workshop materials into Sensor Deployment curriculum</li>
                <li>Test articulation literacy with wheelchair user (Spatial Viz Guild)</li>
              </ol>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
              <div className="font-bold mb-2">Long-Term (Q2+ 2026)</div>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Scale to BC Canada (UMCES-CGC partnership for viticulture sensors)</li>
                <li>Publish 'Articulation Literacy Framework' as academic paper (validate methodology)</li>
                <li>Issue first 'Technical Architect' VCs (5 credentials per guild)</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuildAcademyCharter;
