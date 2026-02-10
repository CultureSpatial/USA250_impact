#!/bin/bash

# Place Packet Design Evolution - GitHub Issues Import Script
# Run from repo root: bash .github/import-issues.sh

set -e

echo "🚀 Creating GitHub Issues for Place Packet Design Evolution"
echo "============================================================"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found."
    echo "   Install from: https://cli.github.com/"
    echo "   Or create issues manually from: .github/GITHUB_ISSUES_TEMPLATE.md"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub."
    echo "   Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI ready"
echo ""

# Create milestones
echo "📋 Creating milestones..."
gh api repos/:owner/:repo/milestones -f title="Phase 1: Token System" -f due_on="2026-02-24T00:00:00Z" -f description="Design token system and theme provider" 2>/dev/null || echo "  ⚠️  Milestone 'Phase 1' may already exist"
gh api repos/:owner/:repo/milestones -f title="Phase 2: Component Library" -f due_on="2026-03-10T00:00:00Z" -f description="Build Place Packet React components" 2>/dev/null || echo "  ⚠️  Milestone 'Phase 2' may already exist"
gh api repos/:owner/:repo/milestones -f title="Phase 3: Wine Pilot" -f due_on="2026-03-14T00:00:00Z" -f description="NYWGF Wine Heritage pilot implementation" 2>/dev/null || echo "  ⚠️  Milestone 'Phase 3' may already exist"
gh api repos/:owner/:repo/milestones -f title="Phase 4: Smithsonian Theme" -f due_on="2026-03-31T00:00:00Z" -f description="Institutional theme for museum partnerships" 2>/dev/null || echo "  ⚠️  Milestone 'Phase 4' may already exist"
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

# Get milestone numbers
echo "🔍 Fetching milestone numbers..."
PHASE1_MILESTONE=$(gh api repos/:owner/:repo/milestones --jq '.[] | select(.title=="Phase 1: Token System") | .number')
PHASE2_MILESTONE=$(gh api repos/:owner/:repo/milestones --jq '.[] | select(.title=="Phase 2: Component Library") | .number')
PHASE3_MILESTONE=$(gh api repos/:owner/:repo/milestones --jq '.[] | select(.title=="Phase 3: Wine Pilot") | .number')
PHASE4_MILESTONE=$(gh api repos/:owner/:repo/milestones --jq '.[] | select(.title=="Phase 4: Smithsonian Theme") | .number')

echo "  Phase 1 milestone: #$PHASE1_MILESTONE"
echo "  Phase 2 milestone: #$PHASE2_MILESTONE"
echo "  Phase 3 milestone: #$PHASE3_MILESTONE"
echo "  Phase 4 milestone: #$PHASE4_MILESTONE"
echo ""

# Create Epic Issue
echo "📝 Creating Epic Issue..."
gh issue create \
  --title "[EPIC] Place Packet Design System Evolution" \
  --label "design-system,place-packet,priority-high" \
  --body "$(cat <<'EOF'
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

**First Pilot**: NYWGF Wine Heritage (March 7-14, 2026)

**Success Metrics**:
- [ ] Color contrast passes WCAG AA (4.5:1)
- [ ] Historical societies report "feels authentic" (>80%)
- [ ] Partners can create contexts in < 1 hour
- [ ] Page load time < 3 seconds
- [ ] Mobile responsive (320px - 2560px)

**Tracking**:
- Phase 1: Token System (2 weeks)
- Phase 2: Component Library (2 weeks)
- Phase 3: Wine Pilot (2 weeks)
- Phase 4: Smithsonian Theme (2 weeks)
EOF
)"

echo "✅ Epic issue created"
echo ""

echo "📝 Creating Phase 1 issues..."

# Issue #2
gh issue create \
  --title "Create Design Token TypeScript Definitions" \
  --label "design-system,component,phase-1,priority-high" \
  --milestone "$PHASE1_MILESTONE" \
  --body "Extract design tokens from existing components and formalize into TypeScript definitions.

**Acceptance Criteria**:
- [ ] \`tokens/spatial-studio-core.ts\` created with brand colors, layout, interaction patterns
- [ ] \`tokens/place-packet-contexts.ts\` created with wine, trails, sound definitions
- [ ] Type definitions exported for use in components
- [ ] Documentation comments added to all tokens
- [ ] Unit tests for token structure

**Reference**: [Design Evolution Doc - Part 3](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-3-design-token-architecture)"

# Issue #3
gh issue create \
  --title "Set Up Theme Context Provider" \
  --label "design-system,component,phase-1,priority-high" \
  --milestone "$PHASE1_MILESTONE" \
  --body "Create React Context for providing theme tokens throughout component tree.

**Acceptance Criteria**:
- [ ] \`ThemeProvider\` component created
- [ ] \`usePlacePacketTheme()\` hook created
- [ ] Runtime theme composition working
- [ ] Context switching tested (wine → trails → sound)
- [ ] TypeScript types properly inferred

**Reference**: [PlacePacketShell.tsx](../components/place-packet/PlacePacketShell.tsx#L112-L125)"

# Issue #4
gh issue create \
  --title "Test Token System with Existing Components" \
  --label "design-system,component,phase-1,priority-medium" \
  --milestone "$PHASE1_MILESTONE" \
  --body "Integrate token system with existing GTMAcceleratorDashboard and HumancodeWine components.

**Acceptance Criteria**:
- [ ] GTMAcceleratorDashboard refactored to use Spatial Studio core tokens
- [ ] HumancodeWine refactored to use wine context tokens
- [ ] No visual regressions (screenshots match)
- [ ] Performance unchanged (Lighthouse score)
- [ ] TypeScript compile errors resolved"

# Issue #5
gh issue create \
  --title "Create Token Documentation Site" \
  --label "documentation,phase-1,priority-medium" \
  --milestone "$PHASE1_MILESTONE" \
  --body "Create a documentation site showing all design tokens with live examples.

**Acceptance Criteria**:
- [ ] Storybook setup (or similar)
- [ ] All color tokens displayed with swatches
- [ ] All typography tokens displayed
- [ ] All spacing/layout tokens documented
- [ ] Interactive token browser
- [ ] Copy-paste code snippets"

# Issue #6
gh issue create \
  --title "Accessibility Audit - Token Contrast" \
  --label "accessibility,phase-1,priority-high" \
  --milestone "$PHASE1_MILESTONE" \
  --body "Audit all color tokens for WCAG AA compliance (4.5:1 contrast ratio).

**Acceptance Criteria**:
- [ ] All text/background combinations tested
- [ ] Wine context passes WCAG AA
- [ ] Freedom Trails context passes WCAG AA
- [ ] Sound Clash context passes WCAG AA
- [ ] Documentation created with passing combinations
- [ ] Failing combinations flagged for redesign

**Deliverable**: \`ACCESSIBILITY_AUDIT.md\` with results"

echo "✅ Phase 1 issues created (5 issues)"
echo ""

echo "🎉 Issue creation complete!"
echo ""
echo "Next steps:"
echo "1. View issues: gh issue list"
echo "2. View milestones: gh api repos/:owner/:repo/milestones"
echo "3. Start work on first issue"
echo ""
echo "To create Phase 2-4 issues, extend this script or create manually from:"
echo "  .github/GITHUB_ISSUES_TEMPLATE.md"
