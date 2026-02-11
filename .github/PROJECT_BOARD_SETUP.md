# GITHUB PROJECT BOARD SETUP

**Project**: Place Packet Design System Evolution
**Board Type**: Roadmap (timeline view)
**Tracking**: Issues across 4 phases (8 weeks)

---

## OPTION 1: CREATE VIA GITHUB WEB UI

### Step 1: Create New Project

1. Go to: https://github.com/CultureSpatial/USA250_impact
2. Click **Projects** tab
3. Click **New Project**
4. Choose template: **Roadmap**
5. Name: **"Place Packet Design Evolution"**
6. Description: **"Design system evolution: Spatial Studio → Place Packets"**
7. Click **Create**

### Step 2: Configure Project Views

#### View 1: Roadmap (Default)
- **Layout**: Roadmap timeline
- **Group by**: Milestone
- **Sort by**: Due date
- **Zoom**: Weeks

#### View 2: Backlog
- **Layout**: Table
- **Filters**: Status = "Todo"
- **Group by**: Phase label
- **Sort by**: Priority

#### View 3: In Progress
- **Layout**: Board (Kanban)
- **Columns**: Todo | In Progress | In Review | Done
- **Filters**: Status != "Done"

#### View 4: Wine Pilot
- **Layout**: Board
- **Filters**: Label = "wine-pilot"
- **Columns**: Todo | In Progress | Testing | Done

### Step 3: Add Custom Fields

Click **⚙️ Settings** → **Custom fields** → Add:

| Field Name | Type | Options |
|------------|------|---------|
| **Priority** | Single select | High, Medium, Low |
| **Effort** | Number | (1-8, representing days) |
| **Status** | Single select | Todo, In Progress, In Review, Blocked, Done |
| **Assignee** | Person | (team members) |
| **Due Date** | Date | (from milestones) |
| **Phase** | Single select | Phase 1, Phase 2, Phase 3, Phase 4 |

### Step 4: Link Issues to Project

1. Go to **Issues** tab
2. Create issues from `.github/GITHUB_ISSUES_TEMPLATE.md`
3. For each issue:
   - Click issue → Right sidebar → **Projects**
   - Select "Place Packet Design Evolution"
   - Set **Priority**, **Effort**, **Status**, **Phase**

---

## OPTION 2: CREATE VIA GITHUB CLI (BETA)

```bash
# Create project
gh project create \
  --owner CultureSpatial \
  --title "Place Packet Design Evolution" \
  --body "Design system evolution: Spatial Studio → Place Packets"

# Get project number (returned from create command)
PROJECT_NUMBER=1

# Add custom fields
gh project field-create $PROJECT_NUMBER --owner CultureSpatial \
  --name "Priority" --data-type "SINGLE_SELECT" \
  --single-select-options "High,Medium,Low"

gh project field-create $PROJECT_NUMBER --owner CultureSpatial \
  --name "Phase" --data-type "SINGLE_SELECT" \
  --single-select-options "Phase 1,Phase 2,Phase 3,Phase 4"

# Link issues to project
gh project item-add $PROJECT_NUMBER --owner CultureSpatial --url https://github.com/CultureSpatial/USA250_impact/issues/1
# Repeat for all issues
```

---

## PROJECT STRUCTURE

### Phases (Milestones)

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROJECT TIMELINE (8 WEEKS)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: Token System          ███████████ (Feb 10-24)         │
│  Issues: #2, #3, #4, #5, #6                                     │
│                                                                  │
│  Phase 2: Component Library         ███████████ (Feb 24-Mar 10) │
│  Issues: #7, #8, #9, #10, #11                                   │
│                                                                  │
│  Phase 3: Wine Pilot                    ██████████ (Mar 10-14)  │
│  Issues: #12, #13, #14, #15, #16, #17                           │
│                                                                  │
│  Phase 4: Smithsonian Theme                 ███████ (Mar 14-31) │
│  Issues: #18, #19, #20, #21                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Board Layout (Kanban View)

```
┌───────────┬───────────┬───────────┬───────────┬───────────┐
│   TODO    │IN PROGRESS│IN REVIEW  │  BLOCKED  │   DONE    │
├───────────┼───────────┼───────────┼───────────┼───────────┤
│           │           │           │           │           │
│  Issue #2 │  (empty)  │  (empty)  │  (empty)  │  (empty)  │
│  Issue #3 │           │           │           │           │
│  Issue #4 │           │           │           │           │
│  Issue #5 │           │           │           │           │
│  Issue #6 │           │           │           │           │
│  Issue #7 │           │           │           │           │
│   ...     │           │           │           │           │
│           │           │           │           │           │
└───────────┴───────────┴───────────┴───────────┴───────────┘
```

### Table View (Backlog)

| Issue | Title | Phase | Priority | Effort | Assignee | Status |
|-------|-------|-------|----------|--------|----------|--------|
| #2 | Create Design Token TypeScript Definitions | Phase 1 | High | 3 days | (TBD) | Todo |
| #3 | Set Up Theme Context Provider | Phase 1 | High | 2 days | (TBD) | Todo |
| #4 | Test Token System with Existing Components | Phase 1 | Medium | 2 days | (TBD) | Todo |
| ... | ... | ... | ... | ... | ... | ... |

---

## AUTOMATION RULES

GitHub Projects supports automation. Configure these:

### Rule 1: Auto-move to "In Progress"
- **Trigger**: Issue assigned
- **Action**: Set Status = "In Progress"

### Rule 2: Auto-move to "In Review"
- **Trigger**: Pull request opened (linked to issue)
- **Action**: Set Status = "In Review"

### Rule 3: Auto-move to "Done"
- **Trigger**: Issue closed
- **Action**: Set Status = "Done"

### Rule 4: Add Phase Label
- **Trigger**: Issue added to milestone "Phase 1"
- **Action**: Add label "phase-1"

### Rule 5: High Priority Alert
- **Trigger**: Issue marked "priority-high" in "Blocked" column
- **Action**: Send notification to team

---

## TRACKING METRICS

### Velocity Chart

Track issues completed per week:

```
Week 1 (Feb 10-17): 3 issues completed
Week 2 (Feb 17-24): 2 issues completed
Week 3 (Feb 24-Mar 3): 5 issues completed
Week 4 (Mar 3-10): ...
```

### Burndown Chart

Track remaining work vs. time:

```
Total issues: 21
Completed: 0
Remaining: 21

Week 1: 21 → 18 (3 completed)
Week 2: 18 → 16 (2 completed)
Week 3: 16 → 11 (5 completed)
...
```

### Phase Progress

```
Phase 1: 0/5 issues complete (0%)
Phase 2: 0/5 issues complete (0%)
Phase 3: 0/6 issues complete (0%)
Phase 4: 0/4 issues complete (0%)
```

---

## ISSUE WORKFLOW

### Workflow Stages

```
1. TODO
   ↓ (Assign to developer)
2. IN PROGRESS
   ↓ (Create PR)
3. IN REVIEW
   ↓ (PR approved & merged)
4. DONE
```

### Issue Lifecycle

1. **Created**: Issue created from template
2. **Triaged**: Priority, effort, assignee set
3. **Assigned**: Developer picks up issue
4. **In Progress**: Development work begins
5. **PR Created**: Code ready for review
6. **In Review**: Team reviews PR
7. **Approved**: PR merged to branch
8. **Closed**: Issue marked Done

### Daily Standup Format

Use project board during standup:

**Yesterday**:
- What did you complete? (check "Done" column)

**Today**:
- What will you work on? (check "In Progress" column)

**Blockers**:
- What's blocking you? (check "Blocked" column)

---

## TRACEABILITY MATRIX

Link issues to documentation:

| Issue | Documentation | Code | Deliverable |
|-------|---------------|------|-------------|
| #2 | [Design Evolution - Part 3](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-3) | `src/tokens/` | Token TypeScript files |
| #3 | [PlacePacketShell.tsx L112-125](../components/place-packet/PlacePacketShell.tsx) | `src/context/` | Theme provider |
| #4 | [GTMAcceleratorDashboard.tsx](../components/gtm/GTMAcceleratorDashboard.tsx) | Refactored components | Updated components |
| #5 | [design-tokens-visual.svg](../design-tokens-visual.svg) | Storybook stories | Token documentation |
| #6 | [Design Evolution - Part 7](../PLACE_PACKET_DESIGN_EVOLUTION.md#part-7) | N/A | `ACCESSIBILITY_AUDIT.md` |
| ... | ... | ... | ... |

---

## REPORTING

### Weekly Status Report (Template)

```markdown
# Week X Status Report - Place Packet Design Evolution

**Date**: YYYY-MM-DD
**Phase**: Phase N
**Overall Progress**: X/21 issues complete (Y%)

## Completed This Week
- [ ] Issue #X: Title
- [ ] Issue #Y: Title

## In Progress
- [ ] Issue #Z: Title (50% complete)

## Blockers
- Issue #A: Waiting on design feedback
- Issue #B: Dependency on external library

## Next Week Goals
- [ ] Complete Issue #X
- [ ] Start Issue #Y

## Risks
- Wine pilot deadline (March 14) at risk due to...

## Metrics
- Velocity: X issues/week
- Burndown: X issues remaining
```

### Phase Completion Report (Template)

```markdown
# Phase N Completion Report

**Phase**: Phase N: Name
**Duration**: Start Date - End Date
**Issues**: X/Y completed

## Success Metrics
- [ ] All issues completed
- [ ] Deliverables shipped
- [ ] Tests passing
- [ ] Documentation updated

## Retrospective
**What went well**:
- ...

**What didn't go well**:
- ...

**Action items for next phase**:
- ...

## Handoff to Next Phase
- Deliverables: [List files/URLs]
- Known issues: [List any outstanding issues]
- Dependencies: [What next phase needs]
```

---

## FIRST WEEK ACTIONS

**Day 1** (Feb 10):
- [ ] Create GitHub Project Board
- [ ] Configure views (Roadmap, Backlog, Kanban, Wine Pilot)
- [ ] Add custom fields (Priority, Effort, Status, Phase)
- [ ] Create milestones (Phase 1-4)
- [ ] Create labels (design-system, place-packet, etc.)

**Day 2** (Feb 11):
- [ ] Run `.github/import-issues.sh` to create Phase 1 issues
- [ ] Link issues to project board
- [ ] Set priority and effort for each issue
- [ ] Assign Issue #2 (first task)

**Day 3** (Feb 12):
- [ ] Start work on Issue #2 (Design Token Definitions)
- [ ] Create branch: `feature/design-tokens`
- [ ] Begin implementation

**Day 4-5** (Feb 13-14):
- [ ] Continue Issue #2
- [ ] Create PR for review
- [ ] Move to "In Review" column

**End of Week 1**:
- [ ] Complete Issue #2 (or close to completion)
- [ ] Review Phase 1 plan
- [ ] Adjust estimates if needed

---

## INTEGRATION WITH EXISTING TOOLS

### GitHub Actions
Automate project updates:

```yaml
# .github/workflows/project-automation.yml
name: Update Project Board

on:
  issues:
    types: [opened, closed, assigned]
  pull_request:
    types: [opened, closed, merged]

jobs:
  update-project:
    runs-on: ubuntu-latest
    steps:
      - name: Add issue to project
        uses: actions/add-to-project@v0.3.0
        with:
          project-url: https://github.com/orgs/CultureSpatial/projects/1
          github-token: ${{ secrets.ADD_TO_PROJECT_PAT }}
```

### Slack Integration
Post project updates to Slack:

1. Install GitHub app in Slack
2. Subscribe to project: `/github subscribe CultureSpatial/USA250_impact projects`
3. Get notifications when issues move columns

---

## TIPS FOR SUCCESS

1. **Update board daily**: Keep status current
2. **Use labels consistently**: Follow label strategy
3. **Link PRs to issues**: Use "Closes #X" in PR description
4. **Document blockers**: Add comments when stuck
5. **Celebrate wins**: Move issues to Done with satisfaction 🎉
6. **Review weekly**: Check burndown, adjust plan
7. **Keep it visible**: Pin project to team dashboard

---

## NEXT STEPS

1. **Create project board** (follow Step 1 above)
2. **Run import script**: `bash .github/import-issues.sh`
3. **Configure views** (Roadmap, Kanban, Backlog)
4. **Start Phase 1** (Issue #2)
5. **Review progress weekly** (Friday standups)

---

**Questions?** See [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
