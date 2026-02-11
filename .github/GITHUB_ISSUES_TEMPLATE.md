# GITHUB ISSUES - PLACE PACKET DESIGN EVOLUTION

**Project**: Place Packet Design System Evolution
**Epic**: USA250 Civic Memory Infrastructure
**First Pilot**: NYWGF Wine Heritage (March 7-14, 2026)

---

## HOW TO CREATE THESE ISSUES

### Option 1: Manual Creation (GitHub Web UI)
1. Go to: https://github.com/CultureSpatial/USA250_impact/issues
2. Click "New Issue"
3. Copy/paste each issue below
4. Add labels as specified
5. Link to milestone as specified

### Option 2: GitHub CLI (if available)
```bash
# Install GitHub CLI if not available
# Then run from repo root:
gh issue create --title "TITLE" --body "BODY" --label "LABELS" --milestone "MILESTONE"
```

### Option 3: Import Script (provided below)
```bash
# Run the import script (see end of this file)
bash .github/import-issues.sh
```

---

## MILESTONE STRUCTURE

Create these milestones first:

1. **Phase 1: Token System** (Due: Feb 24, 2026)
2. **Phase 2: Component Library** (Due: Mar 10, 2026)
3. **Phase 3: Wine Pilot** (Due: Mar 14, 2026)
4. **Phase 4: Smithsonian Theme** (Due: Mar 31, 2026)

---

## LABEL STRUCTURE

Create these labels:

| Label | Color | Description |
|-------|-------|-------------|
| `design-system` | #7C3AED | Design token and component work |
| `place-packet` | #EC4899 | Place Packet specific features |
| `wine-pilot` | #9333EA | NYWGF Wine Heritage pilot |
| `documentation` | #3B82F6 | Docs, guides, tutorials |
| `component` | #10B981 | React component development |
| `accessibility` | #F59E0B | A11y compliance work |
| `phase-1` | #6B7280 | Phase 1 work |
| `phase-2` | #6B7280 | Phase 2 work |
| `phase-3` | #6B7280 | Phase 3 work |
| `phase-4` | #6B7280 | Phase 4 work |
| `priority-high` | #DC2626 | High priority |
| `priority-medium` | #F59E0B | Medium priority |
| `priority-low` | #10B981 | Low priority |

---

## EPIC ISSUE

### Issue #1: [EPIC] Place Packet Design System Evolution

**Labels**: `design-system`, `place-packet`, `priority-high`
**Milestone**: None (tracks all phases)

**Description**:

This epic tracks the complete evolution of Spatial Studio brand into the Place Packet design system, enabling context-adaptive heritage experiences for USA250 civic memory infrastructure.

**Goal**: Create a design system where Spatial Studio provides stable infrastructure and Place Packets honor heritage authenticity without extraction.

**Core Principle**:
```
Place Packet = Spatial Studio Architecture (stable) + Heritage Context (adaptive)
```

**Documentation**:
- [Design Evolution Index](../DESIGN_EVOLUTION_INDEX.md)
- [Design Evolution Strategy](../PLACE_PACKET_DESIGN_EVOLUTION.md)
- [Developer Quick Start](../HOW_TO_ADD_NEW_CONTEXT.md)
- [Visual Boilerplate SVGs](../)

**First Pilot**: NYWGF Wine Heritage (March 7-14, 2026)

**Success Metrics**:
- [ ] Color contrast passes WCAG AA (4.5:1)
- [ ] Historical societies report "feels authentic" (>80%)
- [ ] Partners can create contexts in < 1 hour
- [ ] Page load time < 3 seconds
- [ ] Mobile responsive (320px - 2560px)

**Related Work**:
- NYWGF bifurcation strategy
- USA250 Story Trail integration
- Smithsonian partnerships
- Place Packet distribution mechanism

**Tracking**:
- Phase 1: Issues #2-#6
- Phase 2: Issues #7-#11
- Phase 3: Issues #12-#17
- Phase 4: Issues #18-#21

---

## PHASE 1: TOKEN SYSTEM (Weeks 1-2)

### Issue #2: Create Design Token TypeScript Definitions

**Labels**: `design-system`, `component`, `phase-1`, `priority-high`
**Milestone**: Phase 1: Token System

**Description**:

Extract design tokens from existing components and formalize into TypeScript definitions.

**Acceptance Criteria**:
- [ ] `tokens/spatial-studio-core.ts` created with brand colors, layout, interaction patterns
- [ ] `tokens/place-packet-contexts.ts` created with wine, trails, sound definitions
- [ ] Type definitions exported for use in components
- [ ] Documentation comments added to all tokens
- [ ] Unit tests for token structure

**Reference**:
- [Design Evolution Doc - Part 3](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-3-design-token-architecture)
- [PlacePacketShell.tsx lines 28-110](../components/place-packet/PlacePacketShell.tsx)

**Files to Create**:
```
src/tokens/
  ├── spatial-studio-core.ts
  ├── place-packet-contexts.ts
  ├── types.ts
  └── index.ts
```

**Dependencies**: None

---

### Issue #3: Set Up Theme Context Provider

**Labels**: `design-system`, `component`, `phase-1`, `priority-high`
**Milestone**: Phase 1: Token System

**Description**:

Create React Context for providing theme tokens throughout component tree.

**Acceptance Criteria**:
- [ ] `ThemeProvider` component created
- [ ] `usePlacePacketTheme()` hook created
- [ ] Runtime theme composition working
- [ ] Context switching tested (wine → trails → sound)
- [ ] TypeScript types properly inferred

**Reference**:
- [PlacePacketShell.tsx lines 112-125](../components/place-packet/PlacePacketShell.tsx)

**Files to Create**:
```
src/context/
  ├── ThemeContext.tsx
  ├── ThemeProvider.tsx
  └── hooks/
      └── usePlacePacketTheme.ts
```

**Dependencies**: Issue #2 (tokens)

---

### Issue #4: Test Token System with Existing Components

**Labels**: `design-system`, `component`, `phase-1`, `priority-medium`
**Milestone**: Phase 1: Token System

**Description**:

Integrate token system with existing GTMAcceleratorDashboard and HumancodeWine components.

**Acceptance Criteria**:
- [ ] GTMAcceleratorDashboard refactored to use Spatial Studio core tokens
- [ ] HumancodeWine refactored to use wine context tokens
- [ ] No visual regressions (screenshots match)
- [ ] Performance unchanged (Lighthouse score)
- [ ] TypeScript compile errors resolved

**Reference**:
- [GTMAcceleratorDashboard.tsx](../components/gtm/GTMAcceleratorDashboard.tsx)
- [HumancodeWine.tsx](../components/narrative/HumancodeWine.tsx)

**Files to Update**:
```
components/gtm/GTMAcceleratorDashboard.tsx
components/narrative/HumancodeWine.tsx
```

**Dependencies**: Issue #2 (tokens), Issue #3 (provider)

---

### Issue #5: Create Token Documentation Site

**Labels**: `documentation`, `phase-1`, `priority-medium`
**Milestone**: Phase 1: Token System

**Description**:

Create a documentation site showing all design tokens with live examples.

**Acceptance Criteria**:
- [ ] Storybook setup (or similar)
- [ ] All color tokens displayed with swatches
- [ ] All typography tokens displayed
- [ ] All spacing/layout tokens documented
- [ ] Interactive token browser
- [ ] Copy-paste code snippets

**Reference**:
- [Design Tokens Visual SVG](../design-tokens-visual.svg)

**Files to Create**:
```
.storybook/
  ├── main.ts
  └── preview.ts
stories/
  ├── Tokens/
  │   ├── Colors.stories.tsx
  │   ├── Typography.stories.tsx
  │   └── Layout.stories.tsx
  └── Welcome.stories.tsx
```

**Dependencies**: Issue #2 (tokens)

---

### Issue #6: Accessibility Audit - Token Contrast

**Labels**: `accessibility`, `phase-1`, `priority-high`
**Milestone**: Phase 1: Token System

**Description**:

Audit all color tokens for WCAG AA compliance (4.5:1 contrast ratio).

**Acceptance Criteria**:
- [ ] All text/background combinations tested
- [ ] Wine context passes WCAG AA
- [ ] Freedom Trails context passes WCAG AA
- [ ] Sound Clash context passes WCAG AA
- [ ] Documentation created with passing combinations
- [ ] Failing combinations flagged for redesign

**Tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)

**Reference**:
- [Design Evolution Doc - Part 7](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-7-accessibility--performance)

**Deliverable**: `ACCESSIBILITY_AUDIT.md` with results

**Dependencies**: Issue #2 (tokens)

---

## PHASE 2: COMPONENT LIBRARY (Weeks 3-4)

### Issue #7: Build PlacePacketShell Component

**Labels**: `component`, `place-packet`, `phase-2`, `priority-high`
**Milestone**: Phase 2: Component Library

**Description**:

Refactor existing PlacePacketShell.tsx into production-ready component.

**Acceptance Criteria**:
- [ ] Component moved to `src/components/place-packet/`
- [ ] Props properly typed
- [ ] Error boundaries added
- [ ] Loading states implemented
- [ ] Unit tests (Jest + RTL)
- [ ] Storybook stories created

**Reference**:
- [PlacePacketShell.tsx](../components/place-packet/PlacePacketShell.tsx)
- [Layout Structure Diagram](../layout-structure-diagram.svg)

**Files to Create**:
```
src/components/place-packet/
  ├── PlacePacketShell.tsx
  ├── PlacePacketShell.test.tsx
  └── PlacePacketShell.stories.tsx
```

**Dependencies**: Issue #2 (tokens), Issue #3 (provider)

---

### Issue #8: Build PlacePacketSidebar Component

**Labels**: `component`, `place-packet`, `phase-2`, `priority-high`
**Milestone**: Phase 2: Component Library

**Description**:

Extract sidebar into standalone component with stable structure.

**Acceptance Criteria**:
- [ ] Sidebar component created
- [ ] Logo area with context icon
- [ ] Phase selector (Pilot/Scale/Global)
- [ ] Place Packet card list
- [ ] Felt.com CTA footer
- [ ] Responsive (collapsible on mobile)
- [ ] Unit tests and stories

**Reference**:
- [PlacePacketShell.tsx lines 179-280](../components/place-packet/PlacePacketShell.tsx)
- [Layout Structure Diagram](../layout-structure-diagram.svg)

**Files to Create**:
```
src/components/place-packet/
  ├── PlacePacketSidebar/
  │   ├── index.tsx
  │   ├── PlacePacketSidebar.tsx
  │   ├── PlacePacketSidebar.test.tsx
  │   └── PlacePacketSidebar.stories.tsx
```

**Dependencies**: Issue #7 (shell)

---

### Issue #9: Build PlacePacketCard Component

**Labels**: `component`, `place-packet`, `phase-2`, `priority-high`
**Milestone**: Phase 2: Component Library

**Description**:

Create reusable card component for Place Packet list items.

**Acceptance Criteria**:
- [ ] Card component created
- [ ] Context-themed styling
- [ ] Status badges (Active/Pipeline/Research)
- [ ] GTM score display
- [ ] Hover states
- [ ] Active state (selected)
- [ ] Unit tests and stories

**Reference**:
- [PlacePacketShell.tsx lines 282-345](../components/place-packet/PlacePacketShell.tsx)
- [Place Packet Card Examples SVG](../place-packet-card-examples.svg)

**Files to Create**:
```
src/components/place-packet/
  ├── PlacePacketCard/
  │   ├── index.tsx
  │   ├── PlacePacketCard.tsx
  │   ├── PlacePacketCard.test.tsx
  │   └── PlacePacketCard.stories.tsx
```

**Dependencies**: Issue #7 (shell)

---

### Issue #10: Build PlacePacketCanvas Component

**Labels**: `component`, `place-packet`, `phase-2`, `priority-high`
**Milestone**: Phase 2: Component Library

**Description**:

Create main canvas area with context-adaptive theme and texture support.

**Acceptance Criteria**:
- [ ] Canvas component created
- [ ] Header bar with status badge
- [ ] Context gradient background
- [ ] Texture overlay support
- [ ] Content area with proper z-index
- [ ] Responsive layout
- [ ] Unit tests and stories

**Reference**:
- [PlacePacketShell.tsx lines 347-380](../components/place-packet/PlacePacketShell.tsx)
- [Layout Structure Diagram](../layout-structure-diagram.svg)

**Files to Create**:
```
src/components/place-packet/
  ├── PlacePacketCanvas/
  │   ├── index.tsx
  │   ├── PlacePacketCanvas.tsx
  │   ├── PlacePacketCanvas.test.tsx
  │   └── PlacePacketCanvas.stories.tsx
```

**Dependencies**: Issue #7 (shell)

---

### Issue #11: Component Library Integration Tests

**Labels**: `component`, `phase-2`, `priority-medium`
**Milestone**: Phase 2: Component Library

**Description**:

Create integration tests for complete Place Packet component system.

**Acceptance Criteria**:
- [ ] Shell → Sidebar → Card flow tested
- [ ] Shell → Canvas → Content flow tested
- [ ] Context switching tested (wine → trails → sound)
- [ ] Responsive breakpoints tested
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Performance tested (render time < 100ms)

**Files to Create**:
```
src/components/place-packet/__tests__/
  ├── integration.test.tsx
  ├── responsive.test.tsx
  └── accessibility.test.tsx
```

**Dependencies**: Issues #7-#10 (all components)

---

## PHASE 3: WINE PILOT (Weeks 5-6) - NYWGF First Implementation

### Issue #12: Refine Wine Heritage Color Palette

**Labels**: `wine-pilot`, `design-system`, `phase-3`, `priority-high`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Refine wine heritage color palette based on actual cellar photos and practitioner feedback.

**Acceptance Criteria**:
- [ ] Extract colors from 5+ real wine cellar photos
- [ ] Test palette with Chef Martha content
- [ ] Validate contrast ratios (WCAG AA)
- [ ] Document emotional tone rationale
- [ ] Update token definitions
- [ ] Get approval from NYWGF partners

**Reference**:
- [Design Evolution Doc - Part 2](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-2-place-packet-contextual-themes)
- Existing wine context in tokens

**Deliverable**: `wine-heritage-palette-final.md`

**Dependencies**: Issue #2 (tokens)

---

### Issue #13: Create Wine Cellar Texture Assets

**Labels**: `wine-pilot`, `design-system`, `phase-3`, `priority-high`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Source and optimize wine cellar texture images for background overlays.

**Acceptance Criteria**:
- [ ] 3-5 cellar texture photos sourced (licensed or original)
- [ ] Images optimized to < 100KB each
- [ ] Images resized to 1920x1080
- [ ] Opacity tested (0.15, 0.2, 0.25)
- [ ] Text readability verified on all textures
- [ ] Added to public/textures/ directory

**Files to Create**:
```
public/textures/
  ├── wine-cellar-01.jpg
  ├── wine-cellar-02.jpg
  ├── wine-cellar-03.jpg
  └── wine-texture-catalog.md
```

**Dependencies**: None

---

### Issue #14: Build Prohibition Cellar Place Packet

**Labels**: `wine-pilot`, `component`, `phase-3`, `priority-high`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Create first production Place Packet: Prohibition Cellar in Willamette Valley.

**Acceptance Criteria**:
- [ ] Component created with crime→culture narrative
- [ ] Audio tour placeholder (30-90 sec)
- [ ] Felt.com map layer integrated (47 cellar sites)
- [ ] Quiz/reflection prompt (1-3 questions)
- [ ] Discord conversation plugout
- [ ] Mobile responsive
- [ ] Accessibility tested

**Content from**: Chef Martha PROOF DRINKER research

**Reference**:
- [PlacePacketShell.tsx lines 382-460](../components/place-packet/PlacePacketShell.tsx)
- PROOF_DRINKER_Video_Script.md

**Files to Create**:
```
src/content/wine/
  ├── prohibition-cellar/
  │   ├── ProhibitionCellarPacket.tsx
  │   ├── narrative.md
  │   ├── audio-script.md
  │   └── quiz.json
```

**Dependencies**: Issues #7-#10 (components), #12 (palette), #13 (textures)

---

### Issue #15: Build Finger Lakes Speakeasy Place Packet

**Labels**: `wine-pilot`, `component`, `phase-3`, `priority-medium`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Create second Place Packet: Finger Lakes speakeasy circuit.

**Acceptance Criteria**:
- [ ] Component created with speakeasy network narrative
- [ ] Audio tour placeholder
- [ ] Felt.com map layer (speakeasy routes + modern AVA overlap)
- [ ] Quiz on signaling systems
- [ ] Discord conversation plugout
- [ ] Accessibility tested

**Files to Create**:
```
src/content/wine/
  ├── finger-lakes-speakeasy/
  │   ├── FingerLakesSpeakeasyPacket.tsx
  │   ├── narrative.md
  │   ├── audio-script.md
  │   └── quiz.json
```

**Dependencies**: Issue #14 (first packet pattern)

---

### Issue #16: Build Craft Wine Economy Place Packet

**Labels**: `wine-pilot`, `component`, `phase-3`, `priority-medium`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Create third Place Packet: From prohibition to modern craft wine economy.

**Acceptance Criteria**:
- [ ] Component showing historical→modern transformation
- [ ] Audio tour with Chef Martha voiceover
- [ ] Map showing historical cellars → modern wineries overlap
- [ ] Quiz on knowledge preservation
- [ ] Discord conversation plugout
- [ ] Accessibility tested

**Files to Create**:
```
src/content/wine/
  ├── craft-wine-economy/
  │   ├── CraftWineEconomyPacket.tsx
  │   ├── narrative.md
  │   ├── audio-script.md
  │   └── quiz.json
```

**Dependencies**: Issue #14 (first packet pattern)

---

### Issue #17: NYWGF Pilot Testing & Feedback

**Labels**: `wine-pilot`, `phase-3`, `priority-high`
**Milestone**: Phase 3: Wine Pilot

**Description**:

Test wine heritage Place Packets with NYWGF partners and gather feedback.

**Acceptance Criteria**:
- [ ] Booth QR codes deployed (3 locations)
- [ ] Analytics tracking setup (completion rate, opt-in rate)
- [ ] User testing with 10+ participants
- [ ] Practitioner feedback collected (Chef Martha + 2 others)
- [ ] Accessibility tested with screen reader users
- [ ] Performance tested on 3G connection
- [ ] Feedback synthesized into improvement backlog

**Timeline**: March 7-14, 2026 (VanWineFest dates)

**Deliverable**: `NYWGF_PILOT_FEEDBACK.md`

**Dependencies**: Issues #14-#16 (all three packets)

---

## PHASE 4: SMITHSONIAN THEME (Week 7-8)

### Issue #18: Design Smithsonian Institutional Theme

**Labels**: `design-system`, `phase-4`, `priority-high`
**Milestone**: Phase 4: Smithsonian Theme

**Description**:

Create institutional/archival aesthetic for Smithsonian partnerships.

**Acceptance Criteria**:
- [ ] Color palette: Burgundy/navy with scholarly tones
- [ ] Gradient tested (light backgrounds, not dark)
- [ ] Typography: More formal/academic
- [ ] Texture: Parchment, archival stamps, museum lighting
- [ ] Emotional tone: Authoritative, scholarly, curatorial
- [ ] Token definitions added
- [ ] Storybook stories created

**Reference**:
- [Design Evolution Doc - Part 2](../PLACE_PACKET_DESIGN_EVOLUTION.md#5-smithsonian-collections-context-institutional-authority)

**Files to Create**:
```
src/tokens/contexts/smithsonian.ts
public/textures/archival-parchment.jpg
```

**Dependencies**: Issue #2 (tokens)

---

### Issue #19: Create Civil Rights Collection Place Packet

**Labels**: `component`, `phase-4`, `priority-high`
**Milestone**: Phase 4: Smithsonian Theme

**Description**:

Create Place Packet using Smithsonian civil rights collection content.

**Acceptance Criteria**:
- [ ] Component using Smithsonian theme
- [ ] Scholarly content (curator-vetted)
- [ ] Community perspectives included
- [ ] Map layer showing historical sites
- [ ] Audio from oral histories
- [ ] Citations and sources documented
- [ ] Accessibility tested

**Partnership**: Smithsonian National Museum of African American History and Culture

**Files to Create**:
```
src/content/smithsonian/
  ├── civil-rights-trail/
  │   ├── CivilRightsTrailPacket.tsx
  │   ├── narrative.md
  │   ├── sources.md
  │   └── curator-notes.md
```

**Dependencies**: Issue #18 (Smithsonian theme)

---

### Issue #20: Create Place Packet Toolkit for Partners

**Labels**: `documentation`, `phase-4`, `priority-high`
**Milestone**: Phase 4: Smithsonian Theme

**Description**:

Create comprehensive toolkit for historical societies and museums to create Place Packets.

**Acceptance Criteria**:
- [ ] Toolkit document (20+ pages)
- [ ] Color extraction tutorial (with tools)
- [ ] Texture preparation guide
- [ ] Content template (crime→culture narrative)
- [ ] Accessibility checklist
- [ ] Video tutorials (5-10 min each)
- [ ] Example Place Packet repository

**Reference**:
- [How to Add New Context](../HOW_TO_ADD_NEW_CONTEXT.md)

**Deliverable**: `PLACE_PACKET_TOOLKIT.pdf`

**Dependencies**: Issues #14-#16 (wine examples), #19 (Smithsonian example)

---

### Issue #21: USA250 Story Trail Integration Planning

**Labels**: `documentation`, `phase-4`, `priority-medium`
**Milestone**: Phase 4: Smithsonian Theme

**Description**:

Document how Place Packets integrate with USA250 Story Trail infrastructure.

**Acceptance Criteria**:
- [ ] USA250 integration architecture documented
- [ ] National packet clusters defined (prohibition, resilience, freedom trails)
- [ ] Partnership model documented (Smithsonian, NPS, historical societies)
- [ ] Timeline for national rollout (through July 4, 2026)
- [ ] Funding pathways identified
- [ ] Governance model proposed

**Reference**:
- USA250_Story_Trail_Integration.md
- PLACE_PACKET_Definition_Origins_NYWGF.md

**Deliverable**: `USA250_PLACE_PACKET_INTEGRATION.md`

**Dependencies**: All phases complete

---

## IMPORT SCRIPT

Save this as `.github/import-issues.sh`:

```bash
#!/bin/bash

# Place Packet Design Evolution - GitHub Issues Import Script
# Run from repo root: bash .github/import-issues.sh

set -e

echo "🚀 Creating GitHub Issues for Place Packet Design Evolution"
echo "============================================================"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated. Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI ready"
echo ""

# Create milestones
echo "📋 Creating milestones..."
gh api repos/:owner/:repo/milestones -f title="Phase 1: Token System" -f due_on="2026-02-24T00:00:00Z" || true
gh api repos/:owner/:repo/milestones -f title="Phase 2: Component Library" -f due_on="2026-03-10T00:00:00Z" || true
gh api repos/:owner/:repo/milestones -f title="Phase 3: Wine Pilot" -f due_on="2026-03-14T00:00:00Z" || true
gh api repos/:owner/:repo/milestones -f title="Phase 4: Smithsonian Theme" -f due_on="2026-03-31T00:00:00Z" || true
echo "✅ Milestones created"
echo ""

# Create labels
echo "🏷️  Creating labels..."
gh label create "design-system" --color "7C3AED" --description "Design token and component work" --force
gh label create "place-packet" --color "EC4899" --description "Place Packet specific features" --force
gh label create "wine-pilot" --color "9333EA" --description "NYWGF Wine Heritage pilot" --force
gh label create "documentation" --color "3B82F6" --description "Docs, guides, tutorials" --force
gh label create "component" --color "10B981" --description "React component development" --force
gh label create "accessibility" --color "F59E0B" --description "A11y compliance work" --force
gh label create "phase-1" --color "6B7280" --description "Phase 1 work" --force
gh label create "phase-2" --color "6B7280" --description "Phase 2 work" --force
gh label create "phase-3" --color "6B7280" --description "Phase 3 work" --force
gh label create "phase-4" --color "6B7280" --description "Phase 4 work" --force
gh label create "priority-high" --color "DC2626" --description "High priority" --force
gh label create "priority-medium" --color "F59E0B" --description "Medium priority" --force
gh label create "priority-low" --color "10B981" --description "Low priority" --force
echo "✅ Labels created"
echo ""

echo "📝 Ready to create issues!"
echo "Note: Copy/paste issue content from GITHUB_ISSUES_TEMPLATE.md"
echo "Or extend this script with gh issue create commands"
```

Make it executable:
```bash
chmod +x .github/import-issues.sh
```

---

## ISSUE SUMMARY

| Phase | Issues | Priority | Estimated Effort |
|-------|--------|----------|------------------|
| Epic | #1 | High | Ongoing tracking |
| Phase 1 | #2-#6 (5 issues) | High | 2 weeks |
| Phase 2 | #7-#11 (5 issues) | High | 2 weeks |
| Phase 3 | #12-#17 (6 issues) | High | 2 weeks |
| Phase 4 | #18-#21 (4 issues) | High | 2 weeks |
| **Total** | **21 issues** | - | **8 weeks** |

---

## TRACEABILITY MAP

```
Design Evolution Docs → GitHub Issues → Implementation → NYWGF Pilot → USA250 Scale

PLACE_PACKET_DESIGN_EVOLUTION.md
├── Part 1: Definition → Issue #1 (Epic)
├── Part 2: Contexts → Issues #12, #18 (Wine, Smithsonian)
├── Part 3: Tokens → Issues #2-#6 (Phase 1)
├── Part 4: Components → Issues #7-#11 (Phase 2)
├── Part 5: Implementation → All phases
├── Part 6: Boilerplate → Issues #14-#16 (Wine packets)
├── Part 7: Accessibility → Issues #6, #11 (Audits)
└── Part 8-10: Strategy → Issue #21 (USA250 integration)

HOW_TO_ADD_NEW_CONTEXT.md
└── Referenced in Issues #12, #18, #20 (Partner toolkit)

PlacePacketShell.tsx
└── Refactored in Issues #7-#10 (Component library)

Visual SVGs
├── design-tokens-visual.svg → Issue #5 (Token docs)
├── logo-evolution.svg → Issue #20 (Partner toolkit)
├── card-examples.svg → Issue #9 (Card component)
└── layout-diagram.svg → Issues #7-#8 (Shell, Sidebar)
```

---

## NEXT STEPS

1. **Create milestones** in GitHub (4 total)
2. **Create labels** in GitHub (13 total)
3. **Create Issue #1** (Epic) first
4. **Create Phase 1 issues** (#2-#6)
5. **Start with Issue #2** (Token definitions)

**Once Phase 1 is complete**, create Phase 2 issues, and so on.

---

**Questions?** Reference: `DESIGN_EVOLUTION_INDEX.md`
