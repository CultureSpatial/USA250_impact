# Spatial Studio + Vintage & Voice — Revised 30-60-90 Roadmap

**Version:** 1.0 (Repo-Cognizant)
**Date:** January 29, 2026
**Status:** DRAFT — Planning phase

---

## Context: Why This Roadmap Differs from Original

The original 30-60-90 plan assumed starting from zero. Repo analysis reveals:

| Original Assumption | Repo Reality |
|---------------------|--------------|
| "Design specs needed" | 60% infrastructure exists |
| "VanWineFest May" | VanWineFest is March 7-14 |
| "STA-39 ready" | Referenced but not built |
| "Dev resources exist" | No dev assigned |

**This roadmap adjusts for reality.**

---

## Timeline Overview

```
FEBRUARY 2026                 MARCH 2026                  APRIL 2026
├─────────────────────────────├───────────────────────────├─────────────────────────────┤
│                             │                           │                             │
│  PHASE 1                    │  PHASE 2                  │  PHASE 3                    │
│  Adaptation + Prep          │  Content Capture + Build  │  Polish + Pilot Prep        │
│                             │                           │                             │
│  • Data models              │  • VanWineFest recon      │  • Digital-native recording │
│  • Partner briefs           │    (Mar 7-14)             │  • Soft launch              │
│  • Recon planning           │  • MVP development        │  • PROOF-Maker prep         │
│  • Dev resource decision    │  • Discord setup          │  • Go/no-go decision        │
│                             │                           │                             │
└──────── GATE 1 ─────────────└──────── GATE 2 ───────────└──────── GATE 3 ────────────┘
          Feb 28                        Mar 31                      Apr 30
```

---

## Phase 1: Adaptation + Reconnaissance Prep (Feb 1-28)

### Week 1 (Feb 1-7): Data Model Definition

| Task | Owner | Deliverable |
|------|-------|-------------|
| Define `OralKineticDialogue` schema | Product | TypeScript interface |
| Define `VintageVoiceQuest` schema | Product | TypeScript interface |
| Define measurement events | Product | STA-39 event spec |
| Review existing `crownStatus` | Product | Extension proposal |

**Output:** Data model documentation ready for dev

### Week 2 (Feb 8-14): Partner Brief Development

| Task | Owner | Deliverable |
|------|-------|-------------|
| Draft Producer brief | BD | 1-page PDF |
| Draft Venue brief | BD | 1-page PDF |
| Draft Institution brief | BD | 1-page PDF |
| Identify top 10 targets | BD | Partner list with contacts |

**Output:** 3 partner briefs ready for outreach

### Week 3 (Feb 15-21): Reconnaissance Planning

| Task | Owner | Deliverable |
|------|-------|-------------|
| VanWineFest attendance confirmed | BD | Tickets/credentials |
| Content capture checklist | Creative | Recording requirements |
| Equipment list | Ops | Audio gear, consent forms |
| Interview guide | Creative | Questions for incumbents |

**Output:** Reconnaissance kit complete

### Week 4 (Feb 22-28): Scope + Resource Decision

| Task | Owner | Deliverable |
|------|-------|-------------|
| Dev resource identified | Lead | Named developer or descope plan |
| MVP scope finalized | Product | In/out feature list |
| 5 partner conversations | BD | Meeting notes, interest levels |
| Gate 1 review | Lead | Go/no-go decision |

**Output:** Clear scope, resourced plan

---

### Gate 1 Criteria (February 28)

| Criterion | Required | Stretch |
|-----------|----------|---------|
| Data models defined | Yes | — |
| Partner briefs complete | Yes | — |
| VanWineFest recon confirmed | Yes | — |
| Dev resource identified | Yes | — |
| Partner conversations | 5 | 8 |
| Warm leads | 2 | 4 |

**Decision Point:** If no dev by Feb 28, descope to:
- Audio-only landing page (no quest gamification)
- Quest becomes Phase 2 (post-May)
- Focus on content capture + partner development

---

## Phase 2: Content Capture + Build (March 1-31)

### Weeks 5-6 (March 1-14): VanWineFest Reconnaissance

| Day | Activity | Output |
|-----|----------|--------|
| Mar 7 | Bacchanalia Gala | Observe incumbent archetypes |
| Mar 8-9 | Trade Days | Producer introductions |
| Mar 10-11 | Seminars | Content capture opportunities |
| Mar 12-13 | Grand Tasting | Record 6-8 incumbent voices |
| Mar 14 | Partner debrief | Commitment confirmations |

**Output:** 6-8 incumbent audio clips captured

### Week 7 (March 15-21): MVP Development Sprint

| Task | Owner | Deliverable |
|------|-------|-------------|
| Audio player component | Dev | Dual-waveform player |
| Phrase tap interaction | Dev | Gem collection UX |
| Quest progression tracking | Dev | State management |
| Basic analytics | Dev | Event logging |

**Output:** Playable MVP (ugly but functional)

### Week 8 (March 22-31): Discord Setup

| Task | Owner | Deliverable |
|------|-------|-------------|
| Server structure | Ops | Channels by theme |
| Bot configuration | Dev | Invite flow, welcome |
| Moderation rules | Community | Guidelines doc |
| First venue confirmation | BD | Signed commitment |

**Output:** Discord ready for soft launch

---

### Gate 2 Criteria (March 31)

| Criterion | Required | Stretch |
|-----------|----------|---------|
| Incumbent voices captured | 6 | 8 |
| MVP functional | Yes | — |
| Discord live | Yes | — |
| Venue confirmed (May pilot) | 1 | 2 |
| Digital-native recording scheduled | Yes | — |

**Decision Point:** If <4 incumbent voices captured:
- Use archetype narrators (lower authenticity, faster)
- Extend content capture to April events
- Delay launch to June

---

## Phase 3: Polish + Pilot Prep (April 1-30)

### Week 9 (April 1-7): Digital-Native Recording

| Task | Owner | Deliverable |
|------|-------|-------------|
| Identify digital-native speakers | Creative | 6-8 matched to incumbents |
| Recording sessions | Creative | Completed audio files |
| Phrase extraction | Creative | Collectable phrases marked |
| Bias reveal design | Creative | Reframe prompts written |

**Output:** 6-8 complete dialogue pairs

### Week 10 (April 8-14): Soft Launch

| Task | Owner | Deliverable |
|------|-------|-------------|
| Friends & family invites | Community | 50 beta users |
| Feedback capture | Product | Survey + interview notes |
| Bug tracking | Dev | Issue list prioritized |
| Analytics validation | Product | Events flowing correctly |

**Output:** Validated MVP with real user feedback

### Week 11 (April 15-21): Iteration

| Task | Owner | Deliverable |
|------|-------|-------------|
| Critical bug fixes | Dev | Stable build |
| UX improvements | Dev | Top 3 feedback items |
| Content adjustments | Creative | Edited audio if needed |
| Performance optimization | Dev | Mobile-ready |

**Output:** Polished experience

### Week 12 (April 22-30): PROOF-Maker Prep

| Task | Owner | Deliverable |
|------|-------|-------------|
| Booth design kit | Ops | Signage, layout, equipment list |
| Facilitation guide | Creative | Script, scenarios |
| Staff training | Ops | Video module + quiz |
| Venue coordination | BD | May event logistics |
| Go/no-go review | Lead | Final decision |

**Output:** PROOF-Maker toolkit complete, launch ready

---

### Gate 3 Criteria (April 30)

| Criterion | Required | Stretch |
|-----------|----------|---------|
| Dialogue pairs complete | 6 | 8 |
| Soft launch feedback incorporated | Yes | — |
| PROOF-Maker toolkit complete | Yes | — |
| Venues confirmed (May/June) | 2 | 3 |
| Staff trained | 2 | 4 |
| Discord members (pre-launch) | 30 | 50 |

**Go/No-Go Decision:**
- **Go:** Launch Vintage & Voice at May venue event
- **Conditional Go:** Launch with reduced scope (fewer dialogues)
- **No-Go:** Delay to June, continue content development

---

## Resource Requirements

### People

| Role | Commitment | Notes |
|------|-----------|-------|
| **Creative Lead** | 50% | Content direction, partner relationships |
| **Developer** | 100% Mar-Apr | Frontend + measurement |
| **BD/Partnerships** | 30% | Partner conversations, venue recruitment |
| **Ops/Community** | 25% | Discord, event logistics |

### Budget

| Category | Estimate | Notes |
|----------|----------|-------|
| Development | $8-12K | Contract or internal allocation |
| Content recording | $3-5K | Studio time, travel |
| Discord bot | $1-2K | Bot hosting, integrations |
| Event materials | $1-2K | Signage, equipment |
| **Total** | $13-21K | Anti-maximalist range |

### Dependencies

| Dependency | Risk | Mitigation |
|------------|------|------------|
| VanWineFest access | Medium | Backup: other March events |
| Dev availability | High | Descope if not secured by Feb 28 |
| Incumbent cooperation | Medium | Have backup speakers identified |
| Venue commitments | Medium | Start outreach Week 2 |

---

## Contingency Plans

### If VanWineFest Access Falls Through
- Attend as public (reduced access)
- Use backup events (Okanagan Wine Festivals)
- Delay content capture to April

### If Dev Not Secured
- Descope to audio-only landing page
- Use no-code tools (Webflow + podcast embed)
- Quest gamification becomes Phase 2

### If Content Quality Low
- Re-record with professional narrators
- Use fewer but higher-quality pairs
- Extend timeline for polish

### If Partner Interest Low
- Reduce venue target from 3 to 1
- Focus on single proof case
- Adjust revenue expectations

---

## Success Definition

### Minimum Viable Success (May Launch)
- 4+ complete dialogue pairs
- 1 venue activation
- 100+ quest interactions
- 20+ Discord joins
- Measurement flowing

### Target Success (May Launch)
- 6+ complete dialogue pairs
- 2 venue activations
- 300+ quest interactions
- 50+ Discord joins
- Partner repeat interest

### Stretch Success (May Launch)
- 8+ complete dialogue pairs
- 3 venue activations
- 500+ quest interactions
- 100+ Discord joins
- 2+ partners asking for PROOF-Maker

---

## Weekly Check-In Template

**Week of: [DATE]**

| Area | Status | Blockers | Next Actions |
|------|--------|----------|--------------|
| Content | | | |
| Development | | | |
| Partnerships | | | |
| Operations | | | |

**Decisions Needed:**
- [ ]

**Risks Surfaced:**
- [ ]

---

*Roadmap Version: 1.0*
*Last Updated: January 29, 2026*
*Next Review: February 7, 2026*
