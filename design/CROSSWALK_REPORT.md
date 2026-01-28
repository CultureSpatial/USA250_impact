# Spatial Studio Design — Crosswalk & Alignment Report

**Date:** 2026-01-28
**Branches Analyzed:** 6 branches across USA250_impact repository
**Purpose:** Identify alignment opportunities, gaps, and strategic directions between Spatial Studio design system and existing organizational assets.

---

## Executive Summary

The **Spatial Studio** design files I created represent a B2B-focused web app for "learning activities and educational resources → actionable spaces." After analyzing all 6 branches in the repository, I discovered a **rich ecosystem of prior work** that significantly informs and redirects the Spatial Studio concept.

### Key Finding: Spatial Studio Is Part of a Larger Organism

The repository reveals **CultureSpatial / Stadium Soundwave** is building an "**organizational species**" (their term) that encompasses:

1. **USA250 + FIFA 2026** — Civic/cultural commemorations
2. **VineSight Corridor** — Wine tourism + terroir-to-telemetry infrastructure
3. **Story Trails** — Voice-driven, location-based storytelling
4. **Guild Academy** — B2B vocational training with AI-assisted articulation literacy
5. **GTM Strategy** — Spatial intelligence dashboards for go-to-market

**Spatial Studio should not be a standalone product — it should be the B2B-facing interface that partners use to create, deploy, and manage all of the above.**

---

## Branch-by-Branch Analysis

### 1. `main` Branch

| Asset | Description | Alignment with Spatial Studio |
|-------|-------------|-------------------------------|
| **README.md** | VineSight Corridor Execution Hub for USA250/FIFA 2026. References terroir-to-telemetry, DMAC specs, governance planes. | **HIGH** — This is the "why" behind Spatial Studio. Partners deploy experiences for this corridor. |
| **Guild_Academy_Charter.tsx** | React component defining technical infrastructure R&D model with UMCES-CGC foundation, PBL methodology, articulation literacy. | **CRITICAL** — Guild Academy is the human capacity engine. Spatial Studio partners train guild members to create experiences. |

**Strategic Direction:** Spatial Studio's "Studio" (Experience Builder) should be the tool Guild Academy members learn to use. The Platform page should reference Guild Academy as the workforce behind partner deployments.

---

### 2. `claude/gtm-strategy-dashboard-qx0dJ` Branch

| Asset | Description | Alignment with Spatial Studio |
|-------|-------------|-------------------------------|
| **COMPASS_CROSSWALK.md** | Atlassian Compass integration mapping React components to service architecture. | **MEDIUM** — Backend architecture. Spatial Studio frontend connects to these services. |
| **COMPONENT_LIBRARY_SUMMARY.md** | GTM Accelerator Dashboard, Guild Academy Charter, HumancodeWine components. 8 integration patterns. | **HIGH** — These are the dashboards partners see *after* they deploy via Spatial Studio. |
| **INTEGRATION_GUIDE.md** | 10 integration patterns including Felt.com spatial mapping, Narrative Tourism. | **CRITICAL** — Pattern #3 (Felt.com) and Pattern #9 (Narrative Tourism) are exactly what Spatial Studio enables. |
| **GTMAcceleratorDashboard.tsx** | Market mirroring (PNW ↔ EU), growth propensity, node activation. | **HIGH** — This is the analytics layer partners access through Spatial Studio. |
| **FeltIntegration.tsx** | GeoJSON transformation, Felt.com API deployment. | **CRITICAL** — Spatial Studio's Experience Builder likely uses Felt.com under the hood. |

**Strategic Direction:** Spatial Studio's Analytics Dashboard should embed or link to GTMAcceleratorDashboard. The "Deploy" step should use Felt.com integration.

---

### 3. `claude/modular-conference-components-otCib` Branch

| Asset | Description | Alignment with Spatial Studio |
|-------|-------------|-------------------------------|
| **STRATEGIC_FRAMEWORK.md** | "Organizational species" model. B2B focus with human capacity as pivot. Rejects linear timelines. | **FOUNDATIONAL** — This is the brand philosophy. Spatial Studio copy must reflect "organizational species" positioning. |
| **B2B_VOCATIONAL_TRAINING.md** | SCID/DACUM model. Guild membership subscriptions, B2B workforce contracts, pattern module licensing. | **CRITICAL** — This IS the business model. Spatial Studio is the product they're selling. |
| **VOICE_INTERACTION_SPEC.md** | "19 Crimes for Places" — GPS-triggered audio storytelling. Detailed audio production specs. | **HIGH** — This is the end-user experience that partners create through Spatial Studio. |

**Strategic Direction:** Spatial Studio's Solutions pages (Cultural, Education, Civic, Tourism) should use case studies from this spec (Green Mill, Prohibition tours). The B2B pricing model in COPY_BANK.md should align with B2B_VOCATIONAL_TRAINING.md.

---

### 4. `claude/seed-prohibition-artifacts-0p840` Branch

| Asset | Description | Alignment with Spatial Studio |
|-------|-------------|-------------------------------|
| **README_PROHIBITION_ARTIFACTS.md** | 10 Chicago Prohibition-era locations with GPS, audio specs, historical narratives. | **HIGH** — This is a seed content library. Partners would access this through Spatial Studio's Content Library. |
| **prohibition-artifacts.ts** | TypeScript seed data with structured metadata (audio duration, voice style, sources). | **HIGH** — Data model for Spatial Studio's Content Library. |
| **Supabase schema + seeds** | PostGIS-enabled database for location-based narratives. | **MEDIUM** — Backend infrastructure that Spatial Studio connects to. |

**Strategic Direction:** Spatial Studio's Content Library feature should be able to import/manage artifacts like these. The Experience Builder creates tours from these seeds.

---

### 5. `cultura-d-content-arch` Branch

Same files as main — appears to be a stale or parallel branch.

---

## Crosswalk Matrix: Spatial Studio Features ↔ Existing Assets

| Spatial Studio Feature | Existing Asset | Branch | Alignment Status |
|------------------------|----------------|--------|------------------|
| **Experience Builder (Studio)** | Felt.com integration, Voice Interaction Spec | gtm-strategy, modular-conference | ✅ Strong — Felt.com is the deployment target |
| **Content Library** | prohibition-artifacts.ts, Supabase schema | seed-prohibition | ✅ Strong — Data model exists |
| **Analytics Dashboard** | GTMAcceleratorDashboard.tsx | gtm-strategy | ✅ Strong — Component ready |
| **API & Integrations** | COMPASS_CROSSWALK.md, INTEGRATION_GUIDE.md | gtm-strategy | ✅ Strong — Architecture documented |
| **Solutions: Cultural** | Prohibition artifacts, HumancodeWine | multiple | ✅ Strong — Case study ready |
| **Solutions: Education** | Guild Academy Charter, UMCES-CGC | main, modular-conference | ✅ Strong — Framework exists |
| **Solutions: Civic** | USA250/FIFA 2026 README | main | ⚠️ Medium — Needs specific civic examples |
| **Solutions: Tourism** | VineSight Corridor, Story Trails | main, modular-conference | ✅ Strong — Core use case |
| **Partner Program** | B2B_VOCATIONAL_TRAINING.md | modular-conference | ✅ Strong — Full business model |
| **Pricing** | Guild membership tiers, cohort pricing | modular-conference | ⚠️ Medium — Needs Spatial Studio-specific packaging |

---

## Gap Analysis

### Gaps in Spatial Studio Design (vs. Existing Assets)

| Gap | Description | Recommended Action |
|-----|-------------|-------------------|
| **Guild Academy Integration** | My design doesn't reference Guild Academy as the workforce partner | Add "Powered by Guild Academy" to Platform page; explain co-design model |
| **Voice/Audio First** | Existing work is heavily audio-focused (19 Crimes model); my design treats audio as one of many formats | Elevate voice-driven experiences as primary use case |
| **VineSight Corridor** | Wine/hospitality tourism is a major vertical; my design genericizes it | Add specific "For Hospitality & Wine Tourism" solution page |
| **FIFA 2026 Urgency** | Major event in 2026 creating partner urgency; not mentioned | Add USA250/FIFA 2026 as temporal anchor for marketing |
| **Articulation Literacy** | AI-assisted co-design is a key differentiator; not in my copy | Feature "No code required — AI assists your team" messaging |
| **Economic Sovereignty** | 70/20/10 revenue splits, pattern module ownership; absent from my copy | Add transparency/equity messaging to Partner Program |
| **Felt.com** | Primary spatial deployment platform; not named in my design | Name Felt.com as infrastructure partner; show integration |

### Gaps in Existing Assets (vs. Spatial Studio Design)

| Gap | Description | Spatial Studio Contribution |
|-----|-------------|----------------------------|
| **Unified B2B Interface** | Components exist but no unified partner-facing product | Spatial Studio IS this interface |
| **Marketing Copy** | Technical docs heavy; marketing copy sparse | COPY_BANK.md provides ready-to-use B2B messaging |
| **Visual Design System** | No design tokens, colors, typography defined | BRAND_TOKENS.md provides implementation specs |
| **Information Architecture** | Components scattered; no sitemap | SPATIAL_STUDIO_DESIGN.md provides IA |
| **User Journey** | Partner acquisition flow not documented | Design doc includes partner journey |

---

## Terminology Alignment

| My Design Term | Existing Term | Recommendation |
|----------------|---------------|----------------|
| "Spatial Studio" | Not used | ✅ Keep — good brand name |
| "Partners" | "B2B customers", "Domain associations" | ✅ Keep "Partners" |
| "Experiences" | "Narratives", "Story Trails", "Artifacts" | ⚠️ Align — use "Experiences" for the container, "Narratives/Stories" for content |
| "Content Library" | "Pattern Library", "Narrative Assets" | ⚠️ Clarify — Content Library = partner content; Pattern Library = reusable modules |
| "Learning activities" | "PBL", "Articulation literacy" | ⚠️ Merge — Learning activities includes Guild Academy methodology |
| "Educational resources" | "Prohibition artifacts", "UMCES-CGC data" | ✅ Fits — these are educational resources |
| "Actionable spaces" | "Spatial experiences", "Voice-driven cartography" | ✅ Fits — "actionable spaces" is the outcome |

---

## Recommended Design Updates

### Immediate Updates to SPATIAL_STUDIO_DESIGN.md

1. **Add USA250/FIFA 2026 Context to Hero**
   ```
   Before: "Transform Learning Into Actionable Spaces"
   After: "Transform Learning Into Actionable Spaces — Ready for USA250 & FIFA 2026"
   ```

2. **Add Guild Academy to Platform Section**
   ```
   New Section: "Built With Guild Academy"
   - Explain co-design model
   - Highlight articulation literacy
   - Link to training/certification
   ```

3. **Add Voice-First Positioning**
   ```
   Feature: "Voice-Driven Experiences"
   - 19 Crimes-inspired model
   - GPS-triggered audio storytelling
   - Professional narration specs
   ```

4. **Add Felt.com Integration**
   ```
   Feature: "Deploy to Felt"
   - Collaborative spatial mapping
   - Real-time annotation
   - Export-ready maps
   ```

5. **Add Solution Page: Hospitality & Wine Tourism**
   ```
   Based on: VineSight Corridor
   Use Cases: Terroir tours, wine trail apps, hospitality venue guides
   ```

### Updates to COPY_BANK.md

1. Add Guild Academy-specific messaging
2. Add FIFA 2026 urgency copy
3. Add economic sovereignty/transparency messaging
4. Add voice-driven experience copy from VOICE_INTERACTION_SPEC.md

### Updates to BRAND_TOKENS.md

1. Consider alignment with any existing CultureSpatial brand assets
2. Validate colors don't conflict with Guild Academy or VineSight branding

---

## Strategic Recommendations

### 1. Position Spatial Studio as the "Partner Portal"

Spatial Studio is not a standalone product — it's the **B2B interface** through which partners:
- Access the Experience Builder (uses Felt.com)
- Manage their Content Library (narratives, artifacts)
- View Analytics (GTMAcceleratorDashboard)
- Train staff via Guild Academy
- Deploy to USA250/FIFA 2026 initiatives

### 2. Lead with Voice-Driven Experiences

The existing work is heavily invested in **audio-first, location-triggered storytelling** (19 Crimes model). This should be the primary pitch, not a feature buried in a list.

**New tagline option:** *"Your places, speaking their stories."*

### 3. Leverage USA250/FIFA 2026 Urgency

2026 is a temporal forcing function. Partners need to deploy by specific dates. Use this urgency in sales copy.

### 4. Integrate Guild Academy as Differentiator

The **co-design with lived expertise** model is genuinely novel. This is not a feature — it's a positioning statement. Partners don't just get software; they get a workforce trained to build with them.

### 5. Adopt "Organizational Species" Language (Carefully)

The Strategic Framework positions CultureSpatial as a "new type of organizational species" that encompasses categories rather than being contained by them. This is heady but potentially powerful B2B messaging for sophisticated buyers.

---

## Revised Information Architecture

Based on crosswalk, recommended sitemap update:

```
SPATIAL STUDIO
│
├── HOME
│   └── Hero (USA250/FIFA ready) → Voice-Driven Demo → Partner Segments → Guild Academy → CTA
│
├── PLATFORM
│   ├── Experience Builder (Studio) ← Felt.com integration
│   ├── Content Library ← Prohibition artifacts model
│   ├── Analytics Dashboard ← GTMAcceleratorDashboard
│   ├── API & Integrations ← COMPASS architecture
│   └── Powered by Guild Academy ← NEW
│
├── SOLUTIONS
│   ├── For Cultural Institutions
│   ├── For Education
│   ├── For Civic Engagement
│   ├── For Tourism & Destinations
│   └── For Hospitality & Wine ← NEW (VineSight)
│
├── RESOURCES
│   ├── Case Studies (Prohibition trails, Fort Vancouver)
│   ├── Voice Production Guide ← from VOICE_INTERACTION_SPEC
│   ├── Documentation
│   └── Guild Academy Training
│
├── PARTNERS
│   ├── Partner Program Overview
│   ├── Become a Partner
│   ├── Partner Portal (Login)
│   └── Economic Model (70/20/10) ← NEW
│
├── USA250 + FIFA 2026 ← NEW
│   └── Dedicated landing for commemorative initiatives
│
└── [UTILITY]
    ├── Login / Dashboard
    ├── Pricing (aligned with B2B_VOCATIONAL_TRAINING)
    └── Demo Request
```

---

## Conclusion

The Spatial Studio design I created is **directionally correct** but **underspecified** relative to the rich ecosystem already in development. The key insight is:

> **Spatial Studio is the Partner-facing product skin over a sophisticated infrastructure that includes Guild Academy (workforce), VineSight (hospitality), Story Trails (narratives), and GTM Strategy (analytics).**

The design files provide the **marketing and UX layer** that was missing. The existing branches provide the **technical architecture and content model**. Together, they form a complete product.

### Recommended Next Steps

1. **Update design files** with Guild Academy, voice-first, and USA250 context
2. **Create component specs** that map Spatial Studio UI to existing React components
3. **Align pricing page** with B2B_VOCATIONAL_TRAINING.md
4. **Build Felt.com integration demo** for Experience Builder visualization
5. **Seed Content Library** with Prohibition artifacts as proof-of-concept

---

*Crosswalk Version: 1.0*
*Analyzed: 2026-01-28*
*Branches: main, gtm-strategy-dashboard, modular-conference-components, seed-prohibition-artifacts, cultura-d-content-arch, spatial-studio-design*
