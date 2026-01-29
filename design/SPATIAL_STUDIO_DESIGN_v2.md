# Spatial Studio — Design System v2.0

> **Updated:** Integrates Oral-Kinetic method, Vintage & Voice campaign, and PROOF-Maker activation framework.

---

## Architecture Overview: Dual-Interface Model

Spatial Studio operates as **two complementary interfaces** sharing a common backend:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SPATIAL STUDIO ECOSYSTEM                        │
│                                                                         │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐   │
│  │   B2B PARTNER PORTAL        │    │   CONSUMER EXPERIENCES      │   │
│  │   spatialstud.io            │    │   (Campaign-Specific)       │   │
│  │                             │    │                             │   │
│  │   • Experience Builder      │    │   vintageandvoice.com       │   │
│  │   • Content Library         │    │   (Oral-Kinetic Quest)      │   │
│  │   • Analytics Dashboard     │    │                             │   │
│  │   • Partner Portal          │    │   [future campaigns]        │   │
│  │   • PROOF-Maker Toolkit     │    │   prohibition-trails.com    │   │
│  │                             │    │   bc-wine-explorer.com      │   │
│  └──────────────┬──────────────┘    └──────────────┬──────────────┘   │
│                 │                                   │                   │
│                 └───────────────┬───────────────────┘                   │
│                                 │                                       │
│                    ┌────────────▼────────────┐                         │
│                    │   SHARED BACKEND        │                         │
│                    │                         │                         │
│                    │   • Content Library     │                         │
│                    │   • Measurement (STA-39)│                         │
│                    │   • Unlock System       │                         │
│                    │   • Quest Progression   │                         │
│                    │   • Discord Integration │                         │
│                    └─────────────────────────┘                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Part 1: B2B Partner Portal (spatialstud.io)

### Brand Position
> **Spatial Studio transforms learning activities and educational resources into actionable spaces that partners deploy to their customers.**

### Information Architecture

```
SPATIAL STUDIO (B2B)
│
├── HOME
│   └── Hero → Value Prop → Partner Types → How It Works → CTA
│
├── PLATFORM
│   ├── Experience Builder (Studio)
│   ├── Content Library
│   ├── Analytics Dashboard
│   ├── API & Integrations
│   └── PROOF-Maker Toolkit ← NEW
│
├── SOLUTIONS
│   ├── For Cultural Institutions
│   ├── For Education
│   ├── For Civic Engagement
│   ├── For Tourism & Destinations
│   └── For Hospitality & Wine ← NEW
│
├── CAMPAIGNS ← NEW
│   ├── Vintage & Voice (Oral-Kinetic)
│   ├── Story Trails (Voice-Driven Cartography)
│   └── Custom Campaign Development
│
├── RESOURCES
│   ├── Case Studies
│   ├── Documentation
│   ├── PROOF-Maker Activation Guide ← NEW
│   └── Guild Academy Training
│
├── PARTNERS
│   ├── Partner Program Overview
│   ├── Become a Partner
│   ├── Partner Portal (Login)
│   └── Economic Model (70/20/10) ← NEW
│
└── [UTILITY]
    ├── Login / Dashboard
    ├── Pricing
    └── Demo Request
```

### New Section: PROOF-Maker Toolkit

**Purpose:** Enable partners to run Spatial Studio activations at their venues without SWF becoming the event producer.

**Components:**
1. **Booth Design Kit** — Spatial footprint, audio setup, signage templates
2. **Facilitation Script** — How to invite, guide, and honor multiplicity
3. **Measurement Dashboard** — Per-event view (completion, depth, bias)
4. **Staff Training Module** — 1-hour video + docs
5. **Discord Continuity Flow** — Post-event community handoff

**PROOF-Maker Pricing:**
| Tier | Investment | Includes |
|------|-----------|----------|
| **Event Kit** | $2,500 | Single activation, basic dashboard |
| **Season Pass** | $8,000 | Unlimited activations, full analytics |
| **Anchor Partner** | $15,000 | White-label, custom patterns, revenue share |

---

## Part 2: Consumer Experience — Vintage & Voice

### Campaign Identity

**Name:** Vintage & Voice
**Method:** Oral-Kinetic (generational dialogue + embodied learning)
**Domain:** vintageandvoice.com (or spatialstud.io/vintage-and-voice)

### Brand Position
> **"Two perspectives on wine, told side-by-side. Witness, don't judge."**

### Core Principle: Comfort with Multiplicity

| Traditional Approach | Oral-Kinetic Approach |
|---------------------|----------------------|
| Debate (winner/loser) | Paired perspectives (both valid) |
| Passive consumption | Kinetic participation (tap, collect, guess) |
| Generational conflict | Generational dialogue |
| Entertainment | Witnessing |

### Consumer Experience Architecture

```
VINTAGE & VOICE
│
├── LANDING
│   ├── Hero: "Two perspectives, side-by-side"
│   ├── Visual: Wineglasses → splitting audio waveforms
│   ├── Promise: "Comfort with multiplicity, not winner selection"
│   ├── CTA: "Explore Paired Perspectives" / "Run PROOF-Maker"
│   └── Trust: Partner logos (BCWI, museums, etc.)
│
├── DIALOGUE EXPLORER (Quest)
│   ├── Paired Perspectives Player
│   │   ├── 90-sec Incumbent Voice (left channel)
│   │   ├── 90-sec Digital-Native Voice (right channel)
│   │   └── Dual waveform visualization
│   │
│   ├── Quest Progression
│   │   ├── "You've witnessed 3 of 12 perspectives"
│   │   ├── Completion badge (not rank/score)
│   │   └── Depth options: explore more OR zoom deep
│   │
│   └── Themes
│       ├── Climate & Technique
│       ├── Accessibility & Inclusion
│       ├── Heritage Routes
│       └── [Expandable]
│
├── STORY COLLECTOR
│   ├── Phrase Tap → "My Gem Bag"
│   ├── After 12 gems → Blind Pairing Challenge
│   ├── Guess speaker archetype (bias reveal)
│   └── Non-punitive: "Both carry truth; notice assumptions"
│
├── BLIND PAIRING CHALLENGE
│   ├── Listen to clip (no label)
│   ├── Guess: Incumbent or Digital-Native?
│   ├── Reveal: "You assumed X. The speaker was Y."
│   └── Insight: Personal bias visualization
│
└── DISCORD CONTINUITY
    ├── Quest completion → Discord invite
    ├── Channels by theme (#climate-technique, etc.)
    ├── Weekly prompts: "Which perspective shifted you?"
    └── Story gem submissions
```

### Visual Design — Vintage & Voice Adaptation

**Color Palette Extension:**
```
VINTAGE & VOICE SPECIFIC
┌──────────────┐
│ Incumbent    │  #722F37  — Deep wine red (tradition)
│ Burgundy     │
└──────────────┘
┌──────────────┐
│ Digital      │  #0D9488  — Action Teal (from base palette)
│ Native Teal  │
└──────────────┘
┌──────────────┐
│ Waveform     │  #F5F0E8  — Warm Sand (visualization bg)
│ Background   │
└──────────────┘
┌──────────────┐
│ Gem Gold     │  #D97706  — Civic Gold (collected phrases)
└──────────────┘
```

**Typography:**
- Inherit base system (Inter)
- Audio player: Monospace for timestamps
- Gem bag: Handwritten accent font for collected phrases

**Iconography:**
- Paired waveforms (not versus/battle)
- Gem/crystal (collected phrases)
- Path/journey (not ladder/ranking)
- Ear/witness (not gavel/judge)

### Data Models

**Oral-Kinetic Dialogue:**
```typescript
interface OralKineticDialogue {
  id: string;
  theme: "climate_technique" | "accessibility" | "heritage_routes" | string;
  incumbent: {
    audioUrl: string;
    durationSeconds: number;
    speakerArchetype: string;
    speakerContext: string;  // "30 years in Okanagan viticulture"
    collectablePhrases: string[];
  };
  digitalNative: {
    audioUrl: string;
    durationSeconds: number;
    speakerArchetype: string;
    speakerContext: string;  // "First-gen sommelier, climate activist"
    collectablePhrases: string[];
  };
  biasReveal: {
    commonAssumptions: string[];
    reframePrompt: string;
  };
  crownStatus: "OPEN" | "LOCKED" | "PREMIUM";
  unlockRequirements?: {
    prerequisiteDialogues?: string[];
    badgeRequired?: string;
  };
}
```

**Quest Progression:**
```typescript
interface VintageVoiceQuest {
  visitorId: string;  // Anonymous
  dialoguesWitnessed: string[];
  phrasesCollected: {
    phrase: string;
    source: "incumbent" | "digital_native";
    dialogueId: string;
    collectedAt: Date;
  }[];
  blindPairingGuesses: {
    dialogueId: string;
    guessedArchetype: "incumbent" | "digital_native";
    actualArchetype: "incumbent" | "digital_native";
    correct: boolean;
    biasRevealed: string;
  }[];
  completionBadge?: string;
  discordInvited: boolean;
  discordJoined: boolean;
}
```

**Measurement Events (STA-39 Adapter):**
```typescript
type VintageVoiceMeasurement =
  | { event: "dialogue_started"; dialogueId: string; theme: string; }
  | { event: "dialogue_completed"; dialogueId: string; completionPercent: number; }
  | { event: "phrase_collected"; phrase: string; source: string; }
  | { event: "blind_guess_submitted"; correct: boolean; }
  | { event: "quest_completed"; totalDialogues: number; totalPhrases: number; }
  | { event: "discord_invited"; }
  | { event: "discord_joined"; };
```

---

## Part 3: PROOF-Maker Activation Framework

### What PROOF-Maker Is

**Definition:** A toolkit enabling partners to run Spatial Studio activations at their venues. Partners own operations; SWF provides infrastructure.

**Not:** An event production service. SWF does not staff booths or run activations.

### PROOF-Maker Components

```
PROOF-MAKER TOOLKIT
│
├── 1. BOOTH DESIGN KIT
│   ├── Spatial footprint (6'x6' minimum)
│   ├── Audio equipment checklist
│   ├── Signage templates (Canva/Figma)
│   ├── QR code placement guide
│   └── WiFi requirements
│
├── 2. FACILITATION GUIDE
│   ├── Greeting script ("Invite, don't sell")
│   ├── Explanation of paired perspectives
│   ├── Conflict de-escalation ("Honor multiplicity")
│   ├── Discord onboarding (optional, gentle)
│   └── Accessibility accommodations
│
├── 3. MEASUREMENT DASHBOARD
│   ├── Per-event view
│   │   ├── Attendance (QR scans)
│   │   ├── Dialogue completions
│   │   ├── Phrase collections
│   │   ├── Blind guess accuracy (aggregate)
│   │   └── Discord conversions
│   │
│   └── Actuals-only policy
│       ├── No projections
│       ├── No revenue claims
│       └── Privacy: anon_user_id only
│
├── 4. STAFF TRAINING
│   ├── 1-hour video module
│   ├── Quick reference card
│   ├── Practice scenarios
│   └── Assessment quiz
│
└── 5. DISCORD HANDOFF
    ├── Event-specific channel creation
    ├── Moderation guidelines
    ├── First-week engagement prompts
    └── Ongoing participation incentives
```

### PROOF-Maker Revenue Model

```
VENUE PAYS (Per Activation)
         │
         ↓
    ┌────────────────────────────────────┐
    │  REVENUE DISTRIBUTION              │
    │                                    │
    │  70% → Operational costs           │
    │        (staff, equipment, venue)   │
    │                                    │
    │  20% → Platform (Spatial Studio)   │
    │        (infrastructure, dashboard) │
    │                                    │
    │  10% → Community Fund              │
    │        (Guild Academy, grants)     │
    │                                    │
    └────────────────────────────────────┘
```

---

## Part 4: VanWineFest Integration

### Updated Business Case Positioning

**VanWineFest Role:** Anchor partner for Vintage & Voice launch + PROOF-Maker pilot.

**March 7-14, 2026:** Reconnaissance + content capture (not launch)
**May/June 2026:** Actual Vintage & Voice launch at regional event

### VanWineFest Reconnaissance Plan

| Day | Activity | Output |
|-----|----------|--------|
| March 7 | Bacchanalia Gala observation | Incumbent voice candidates |
| March 8-11 | Trade Days networking | Producer partnerships |
| March 12-13 | Grand Tasting recording | 6-8 paired perspectives captured |
| March 14 | Partner debrief | Commitments for May activation |

### Module 4: Engagement Game Engine (Business Case Addition)

**4.1 Quest Mechanics:**
- Dialogue Explorer progression
- Phrase collection (gem bag)
- Blind Pairing Challenge (bias reveal)
- Completion badges (not leaderboards)

**4.2 Dispersion Integration:**
- GTM-weighted regional scoring
- Undervisited region multipliers (3x Similkameen, 2x Fraser Valley)
- Post-festival trails drive winery visits

**4.3 Social Mechanics:**
- Discord community continuity
- Story gem sharing
- No competition framing (witness, don't rank)

---

## Part 5: Revised Implementation Roadmap

### Repo-Cognizant 30-60-90 Days

**Days 1-30 (Feb 1-28): Adaptation + Reconnaissance Prep**

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Oral-Kinetic data models | `OralKineticDialogue` + `VintageVoiceQuest` schemas |
| 2 | Partner briefs (3 versions) | Producer / Venue / Institution |
| 3 | Reconnaissance plan | VanWineFest content capture checklist |
| 4 | MVP scope definition | What's in/out for May launch |

**Gate 1 Criteria (Feb 28):**
- [ ] Data models defined
- [ ] 3 partner briefs complete
- [ ] VanWineFest reconnaissance confirmed
- [ ] Dev resource identified (or descope decision)
- [ ] 5 partner conversations completed

**Days 31-60 (March 1-31): Content Capture + Build**

| Week | Focus | Deliverable |
|------|-------|-------------|
| 5-6 | VanWineFest attendance | 6-8 incumbent voices recorded |
| 7 | MVP development sprint | Audio player + phrase tap + quest tracking |
| 8 | Discord setup | Channel structure, bot basics, invite flow |

**Gate 2 Criteria (March 31):**
- [ ] 6-8 incumbent voices captured
- [ ] MVP playable (functional, not polished)
- [ ] Discord channel live
- [ ] 1 venue confirmed for May pilot
- [ ] Digital-native recording scheduled

**Days 61-90 (April 1-30): Polish + Pilot Prep**

| Week | Focus | Deliverable |
|------|-------|-------------|
| 9 | Digital-native recording | Match incumbents, complete pairs |
| 10 | Soft launch (friends/family) | Feedback capture |
| 11 | Iteration | Bug fixes, UX improvements |
| 12 | PROOF-Maker prep | Booth kit, training, signage |

**Gate 3 Criteria (April 30):**
- [ ] 6-8 complete dialogue pairs
- [ ] Soft launch feedback incorporated
- [ ] PROOF-Maker toolkit complete
- [ ] 2 venues confirmed for May/June
- [ ] Staff trained
- [ ] Go/no-go decision for hard launch

---

## Part 6: Technical Specifications

### Shared Backend Components

**1. Content Library (Extended)**
```typescript
interface ContentLibrary {
  dialogues: OralKineticDialogue[];
  narratives: ProhibitionArtifact[];  // Existing
  wineryExperiences: WineryExperience[];  // New
  patterns: PatternModule[];  // Reusable components
}
```

**2. Measurement System (STA-39)**
```typescript
interface MeasurementEvent {
  eventId: string;
  visitorId: string;  // Anonymous
  partnerId: string;
  eventType: string;
  properties: Record<string, any>;
  timestamp: Date;
}

interface PartnerDashboard {
  partnerId: string;
  events: {
    eventName: string;
    eventDate: Date;
    metrics: {
      attendance: number;
      completionRate: number;
      depthSignals: number;
      discordConversions: number;
    };
  }[];
}
```

**3. Unlock System**
```typescript
type CrownStatus = "OPEN" | "LOCKED" | "PREMIUM" | "CHALLENGE";

interface UnlockRequirements {
  prerequisiteIds?: string[];
  badgeRequired?: string;
  seasonalWindow?: [Date, Date];
  dispersionBonus?: boolean;
}
```

**4. Discord Integration**
```typescript
interface DiscordFlow {
  triggerEvent: "quest_completed" | "phrase_threshold" | "badge_earned";
  inviteUrl: string;
  defaultChannel: string;
  welcomeMessage: string;
  moderationRules: string[];
}
```

### Frontend Architecture

```
NEXT.JS APPLICATION
│
├── /app
│   ├── /(marketing)         # B2B landing pages
│   │   ├── page.tsx         # Home
│   │   ├── platform/
│   │   ├── solutions/
│   │   └── partners/
│   │
│   ├── /(consumer)          # Vintage & Voice
│   │   ├── vintage-and-voice/
│   │   │   ├── page.tsx     # Landing
│   │   │   ├── explore/     # Dialogue Explorer
│   │   │   ├── collect/     # Story Collector
│   │   │   └── challenge/   # Blind Pairing
│   │   └── [future-campaigns]/
│   │
│   └── /(dashboard)         # Partner Portal
│       ├── experiences/
│       ├── analytics/
│       ├── library/
│       └── proof-maker/
│
├── /components
│   ├── audio/               # Dual-waveform player
│   ├── quest/               # Progression UI
│   ├── gems/                # Phrase collection
│   └── dashboard/           # Partner analytics
│
└── /lib
    ├── measurement/         # STA-39 adapter
    ├── discord/             # Bot integration
    └── unlock/              # Crown status logic
```

---

## Part 7: Success Metrics

### Vintage & Voice Metrics (Consumer)

| Metric | Target (Launch) | Target (6mo) |
|--------|-----------------|--------------|
| Dialogues witnessed | 500 | 5,000 |
| Quest completions | 100 | 1,000 |
| Phrases collected | 2,000 | 25,000 |
| Blind guess accuracy | Track baseline | N/A (not a goal) |
| Discord joins | 50 | 500 |
| NCV comfort score | >70% | >80% |

### PROOF-Maker Metrics (B2B)

| Metric | Target (Launch) | Target (6mo) |
|--------|-----------------|--------------|
| Venue activations | 3 | 15 |
| Partner retention | N/A | 70% |
| Per-event completion rate | 40% | 50% |
| Revenue per activation | $2,500 | $3,500 |

### VanWineFest Specific (Reconnaissance)

| Metric | Target |
|--------|--------|
| Incumbent voices captured | 6-8 |
| Partner leads generated | 10 |
| Content quality (usable clips) | 80% |
| Commitments for May pilot | 2 venues |

---

## Appendix A: Terminology Glossary

| Term | Definition |
|------|------------|
| **Oral-Kinetic** | Learning integrating oral tradition with embodied participation |
| **Paired Perspectives** | Two viewpoints presented side-by-side without winner selection |
| **Incumbent** | Established voice (tradition, experience, legacy) |
| **Digital-Native** | Emerging voice (new approaches, generational perspective) |
| **Witness** | Active listening without judgment (not passive consumption) |
| **Gem** | Collected phrase that resonates with the listener |
| **PROOF-Maker** | Partner activation toolkit for running Spatial Studio events |
| **Crown Status** | Unlock state (OPEN, LOCKED, PREMIUM, CHALLENGE) |
| **Dispersion** | Strategy to drive visits to undervisited regions |
| **NCV Comfort** | Non-confrontational value; comfort with multiplicity |

---

## Appendix B: Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Dual-interface vs. single | Dual (B2B + Consumer) | Different audiences, different UX needs |
| VanWineFest March role | Reconnaissance, not launch | Timeline too compressed for quality launch |
| Measurement approach | Actuals-only | Anti-maximalist; no projections, no extraction |
| Discord vs. in-app community | Discord | Lower dev cost, existing community habits |
| Leaderboard | No | Witness framing, not competition |
| Audio source | Partner-provided | Authenticity + early partner engagement |

---

*Document Version: 2.0*
*Last Updated: 2026-01-29*
*Status: DRAFT — Pending stakeholder review*
