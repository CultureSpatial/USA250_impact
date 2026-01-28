# Crosswalk: VanWineFest Gap Analysis × Repo Assets

**Purpose:** Map the missing gamification/dispersion/engagement elements to existing infrastructure in the USA250_impact repository branches.

---

## Gap → Asset Mapping Matrix

| Gap Identified | Repo Asset | Branch | Integration Opportunity |
|----------------|-----------|--------|------------------------|
| **Dispersion mechanics** | GTM Market Mirroring + Node Activation | `gtm-strategy-dashboard` | Weight GTM scores by region undervisitation |
| **Map interface** | Felt.com Integration (Pattern 3) | `gtm-strategy-dashboard` | Deploy wine trails to collaborative Felt maps |
| **Game mechanics** | `crownStatus` field (OPEN/LOCKED/PREMIUM) | `seed-prohibition-artifacts` | Unlock system exists — extend to challenges |
| **Progress tracking** | Narrative engagement metrics | `INTEGRATION_GUIDE.md` | Pattern 9: Narrative Tourism already tracks consumption |
| **Social/multiplayer** | Event-Driven Cross-Component (Pattern 5) | `gtm-strategy-dashboard` | Shared context architecture for groups |
| **Drinking games** | Voice Interaction Spec trigger zones | `modular-conference-components` | Distance-based triggers at 500m/100m/50m/10m |
| **Emerging consumers** | Organizational Species "Explorers" | `STRATEGIC_FRAMEWORK.md` | Non-linear, emergence-based engagement |
| **Economic sovereignty** | 70/20/10 revenue model | `B2B_VOCATIONAL_TRAINING.md` | Winery revenue share infrastructure |

---

## Deep Crosswalk: What Already Exists

### 1. Dispersion Mechanics

**Gap:** How does Spatial Studio incentivize visits to undervisited BC wine regions (Similkameen, Fraser Valley, Vancouver Island)?

**Existing Asset:** GTM Accelerator Dashboard with Market Mirroring

```
From INTEGRATION_GUIDE.md, Pattern 3:

const geoJson = {
  type: 'FeatureCollection',
  features: marketNodes.map(node => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: node.coordinates },
    properties: {
      name: node.territory,
      gtmScore: node.gtmScore,    // ← DISPERSION WEIGHT
      status: node.status,
      growth: node.growth
    }
  }))
};
```

**Integration:**
- Assign `gtmScore` inversely to visitation (low visits = high score)
- Regions like Similkameen get 3x points in passport challenges
- "Dispersion Quest" rewards exploration of undervisited nodes

**Wine-Specific Implementation:**
```typescript
interface WineRegionNode {
  territory: "Okanagan" | "Similkameen" | "Fraser Valley" | "Vancouver Island";
  gtmScore: number;           // Inverse to visitation
  dispersionMultiplier: number; // 1x Okanagan, 3x Similkameen, 2x Fraser Valley
  wineryCount: number;
  averageVisitation: number;
}
```

---

### 2. Map Interface

**Gap:** Business case doesn't integrate with existing BC Wine Passport maps or the Wines of BC Explorer App.

**Existing Asset:** Felt.com Spatial Integration (Pattern 3)

```
From INTEGRATION_GUIDE.md:

await feltApi.createLayer({
  mapId: 'usa250-gtm-map',
  layerData: geoJson,
  style: {
    color: node => node.status === 'Active' ? '#10b981' : '#6366f1',
    radius: node => node.gtmScore / 10
  }
});
```

**Integration:**
- Deploy BC Wine Trail as Felt.com collaborative map
- Allow wineries to annotate their own locations
- Festival attendees see real-time "who's here" layer
- Sponsor overlays with attribution tracking

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│  FELT.COM WINE MAP LAYERS                                   │
│                                                             │
│  Layer 1: Base Trail (all wineries, static)                 │
│  Layer 2: Festival Participants (27 French wineries)        │
│  Layer 3: Real-time Attendance (GPS opt-in)                 │
│  Layer 4: Sponsor Zones (National Bank, BC Liquor, etc.)    │
│  Layer 5: Challenge Progress (personal, privacy-protected)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Game Mechanics / Unlock System

**Gap:** Zero mention of stamps, challenges, leaderboards, rewards in business case.

**Existing Asset:** `crownStatus` field in Prohibition Artifacts

```typescript
From prohibition-artifacts.ts:

metadata: {
  historicalAccuracy: "verified",
  sources: [...],
  crownStatus: "OPEN" | "LOCKED" | "PREMIUM",  // ← UNLOCK SYSTEM
  yearEstablished: 1907,
  stillStanding: true
}
```

**Integration:**
- `OPEN` = Visit available to all
- `LOCKED` = Requires completing prerequisite (e.g., visit 3 French region tastings)
- `PREMIUM` = Paid experience (VIP tier, exclusive winery)

**Wine-Specific Extension:**
```typescript
interface WineryExperience {
  crownStatus: "OPEN" | "LOCKED" | "PREMIUM" | "CHALLENGE";
  unlockRequirements?: {
    prerequisiteVisits?: string[];     // Must visit these first
    badgeRequired?: string;            // Must have this badge
    seasonalWindow?: [Date, Date];     // Only available this period
    dispersionBonus?: boolean;         // Extra points for undervisited region
  };
  rewards: {
    points: number;
    badge?: string;
    exclusiveOffer?: string;
  };
}
```

---

### 4. Progress Tracking & Journey Analytics

**Gap:** Business case mentions analytics but doesn't specify journey tracking mechanics.

**Existing Asset:** Narrative Tourism Integration (Pattern 9)

```tsx
From INTEGRATION_GUIDE.md:

// Sync narrative selection with GTM nodes
const handleNarrativeSelect = (narrative) => {
  setSelectedLocation({
    territory: narrative.location,
    gtmScore: narrative.gtmScore,
    storyContext: {
      crime: narrative.crimeContext,
      culture: narrative.cultureTransformation
    }
  });
};
```

**Tourist Consumption Features (already specified):**
- Interactive audio tours with local guide narration
- "Shop Local" integration for artisan products
- "Visit Site" geolocation for heritage trail navigation
- Real-time visitor flow tracking via sensors

**Wine-Specific Extension:**
```typescript
interface WineTastingJourney {
  sessionId: string;
  attendeeId: string;
  timestamp: Date;
  location: GeoPoint;
  winery: string;
  region: string;
  engagements: {
    audioPlayed: boolean;
    audioCompletionPercent: number;
    dwellTimeSeconds: number;
    socialShared: boolean;
    offerSaved: boolean;
    purchaseMade: boolean;
  };
  sponsorAttribution?: string;
}
```

---

### 5. Social / Multiplayer Mechanics

**Gap:** Current passport programs are individual. No group features.

**Existing Asset:** Event-Driven Cross-Component Communication (Pattern 5)

```tsx
From INTEGRATION_GUIDE.md:

const GTMContext = createContext();

function GTMProvider({ children }) {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [activeGuild, setActiveGuild] = useState(null);

  return (
    <GTMContext.Provider value={{
      selectedMarket,
      setSelectedMarket,
      activeGuild,
      setActiveGuild
    }}>
      {children}
    </GTMContext.Provider>
  );
}
```

**Integration:**
- Shared context for wine tasting groups (couples, friend groups, corporate teams)
- "Party Mode" — group progress aggregated
- Competitive leaderboards (friends, corporate teams, regions)
- "Challenge a Friend" — head-to-head tasting competitions

**Wine-Specific Extension:**
```typescript
interface WineTastingParty {
  partyId: string;
  members: string[];          // Attendee IDs
  partyType: "couple" | "friends" | "corporate" | "public";
  sharedProgress: {
    totalWineriesVisited: number;
    regionsExplored: string[];
    challengesCompleted: string[];
  };
  leaderboardPosition?: number;
  competingAgainst?: string[]; // Other party IDs
}
```

---

### 6. Drinking Games / Social Mechanics

**Gap:** Business case has zero mention of drinking games or social engagement mechanics.

**Existing Asset:** Voice Interaction Spec Trigger Zones

```
From VOICE_INTERACTION_SPEC.md:

| Distance | Trigger Action | User Experience |
|----------|---------------|-----------------|
| 500m | Pre-notification | "Approaching Green Mill (400m away)" |
| 100m | Story unlocked | "Green Mill unlocked! Tap to listen" |
| 50m | Auto-play option | "Now entering Green Mill. Audio starting..." |
| <10m | Enhanced content | Unlock photos, AR overlays, hidden details |
```

**Integration:**
- Distance-based challenges ("Complete 5 tastings in River North zone in 2 hours")
- Proximity triggers for drinking game prompts
- Location-unlocked trivia questions
- "Hidden speakeasy" mechanic — discover unlisted experiences

**Wine Festival Drinking Games:**

| Game | Mechanic | Trigger |
|------|----------|---------|
| **Regional Roulette** | Random winery assignment in a region; blind tasting challenge | Enter region zone |
| **Terroir Trivia** | Questions about wine/region while tasting | 10m proximity to winery |
| **Food Pairing Bingo** | Match wines to dishes across festival | Complete tasting |
| **Blind Guess Challenge** | Guess grape/region; compete with friends | Opt-in at tasting station |
| **Scavenger Hunt** | Find hidden "speakeasy" experiences | GPS + clue progression |
| **Sunset Challenge** | Visit X wineries before sunset; bonus points | Time-based trigger |

**Implementation Sketch:**
```typescript
interface DrinkingGameChallenge {
  gameId: string;
  gameType: "regional_roulette" | "terroir_trivia" | "food_pairing_bingo" |
            "blind_guess" | "scavenger_hunt" | "sunset_challenge";
  status: "available" | "in_progress" | "completed" | "failed";
  triggerCondition: {
    type: "proximity" | "time" | "prerequisite" | "opt_in";
    params: Record<string, any>;
  };
  rewards: {
    points: number;
    badge?: string;
    unlocks?: string[];
    exclusiveOffer?: string;
  };
  socialShare: {
    template: string;      // "I just completed the Bordeaux Blind Guess!"
    hashtags: string[];    // #VanWineFest #ViveLaFrance
  };
}
```

---

### 7. Emerging Consumer UX (Explorers)

**Gap:** Business case doesn't differentiate UX for younger consumers vs. Mature Mainstreamers.

**Existing Asset:** Organizational Species "Non-Linear Progression"

```
From STRATEGIC_FRAMEWORK.md:

We do not timeline this to speculative linear progression because:
1. Emergence over planning - Components reveal themselves through development
2. Feedback-driven iteration - Real-world deployment determines next steps
3. Partnership-dependent scaling - B2B relationships mature on their schedules
```

**Integration:**
- **Explorers (25-40):** Non-linear discovery, hidden experiences, social sharing, achievement hunting
- **Mature Mainstreamers (45+):** Curated journeys, structured tours, educational depth

**Persona-Specific UX:**

| Dimension | Explorers | Mature Mainstreamers |
|-----------|-----------|---------------------|
| **Discovery** | Hidden speakeasies, unlock mechanics | Curated trails, expert recommendations |
| **Progress** | Achievements, badges, leaderboards | Completion certificates, learning outcomes |
| **Social** | Share-first, competitive, FOMO | Private, couples-focused, memory capture |
| **Content** | Snackable, audio-first, meme-ready | Deep-dive, educational, sommelier notes |
| **Gamification** | High (challenges, competitions) | Low (collect, don't compete) |

---

### 8. Economic Sovereignty for Wineries

**Gap:** Business case mentions sponsor attribution but not winery revenue share.

**Existing Asset:** 70/20/10 Revenue Model

```
From B2B_VOCATIONAL_TRAINING.md:

| Principle | Implementation |
|-----------|---------------|
| 70/20/10 Revenue Split | 70% to content creators, 20% to platform, 10% to community fund |
| Pattern Ownership | Trainees own patterns they create; can license to others |
| Portable Credential | Guild certification recognized across CultureSpatial network |
```

**Integration:**
- Wineries receive 70% of any monetized engagement (premium experiences, exclusive tastings)
- Platform (Spatial Studio) takes 20% for infrastructure
- 10% to BC Wine Tourism community fund (supports Guild Academy training for wine industry)

**Wine-Specific Revenue Flows:**
```
ATTENDEE PURCHASES PREMIUM EXPERIENCE ($50)
         │
         ↓
    ┌────────────────────────────────────┐
    │  REVENUE SPLIT                     │
    │                                    │
    │  $35 (70%) → Winery               │
    │  $10 (20%) → Spatial Studio        │
    │  $5  (10%) → BC Wine Tourism Fund │
    │                                    │
    └────────────────────────────────────┘
```

---

## Synthesis: What the Business Case Needs

### Module 4: Engagement Game Engine (New Section)

Based on crosswalk, the VanWineFest business case must add:

```markdown
## Module 4: Engagement Game Engine

### 4.1 Passport Integration
- Connect to existing BC Wine Passport (uncorkBC) or replace with enhanced version
- Felt.com map layer for collaborative spatial display
- crownStatus unlock system (OPEN/LOCKED/PREMIUM/CHALLENGE)

### 4.2 Dispersion Mechanics
- GTM-weighted scoring (undervisited regions = higher points)
- "Dispersion Quest" challenges for Similkameen, Fraser Valley, Vancouver Island
- Real-time dispersion dashboard for festival organizers

### 4.3 Social/Multiplayer
- Party mode for couples, friends, corporate groups
- Leaderboards (friends, teams, public)
- Challenge-a-friend competitions

### 4.4 Drinking Games
- Regional Roulette (random winery in zone)
- Terroir Trivia (proximity-triggered questions)
- Food Pairing Bingo
- Blind Guess Challenge
- Scavenger Hunt (hidden experiences)

### 4.5 Journey Analytics
- Full attendee path tracking (with consent)
- Sponsor attribution at engagement level
- Dwell time, completion rates, social shares
- Post-festival winery conversion tracking

### 4.6 Persona-Specific UX
- Explorer mode (discovery, achievements, competition)
- Connoisseur mode (curated, educational, couples-focused)
```

---

## Technical Readiness Assessment

| Capability | Repo Status | Ready for Wine? |
|------------|-------------|-----------------|
| Felt.com map integration | ✅ Pattern documented | ✅ Yes — needs wine layer |
| Unlock system (crownStatus) | ✅ Implemented in artifacts | ✅ Yes — extend to wineries |
| Journey analytics | ✅ Pattern 9 specified | ⚠️ Partial — needs wine schema |
| Social/multiplayer | ✅ Pattern 5 context | ⚠️ Partial — needs party mode |
| Voice/audio triggers | ✅ VOICE_INTERACTION_SPEC | ✅ Yes — adapt for tastings |
| Dispersion weighting | ✅ GTM scoring model | ⚠️ Partial — needs BC region data |
| Economic sovereignty | ✅ 70/20/10 model | ✅ Yes — apply to wineries |
| Drinking games | ❌ Not implemented | ❌ No — needs new development |

---

## Recommended Development Sequence

1. **Immediate:** Extend `crownStatus` to wine experiences
2. **Week 1-2:** Build BC Wine Region GTM nodes with dispersion weights
3. **Week 2-3:** Deploy Felt.com map with festival layer
4. **Week 3-4:** Implement party mode using Pattern 5 context
5. **Week 4-6:** Build drinking game challenge system
6. **Week 6-8:** Journey analytics with sponsor attribution
7. **Pre-Festival:** Persona UX differentiation (Explorer vs. Connoisseur)

---

## Conclusion

The repo already contains **70% of the infrastructure** needed for a gamified, dispersion-focused wine engagement platform. The gaps are:

1. **Wine-specific data models** (wineries, regions, tastings)
2. **Drinking game challenge system** (new development)
3. **Party/multiplayer mode** (extension of Pattern 5)
4. **Persona-specific UX branching** (Explorer vs. Connoisseur)

The business case should not be finalized until these are specified and the relationship to existing BC Wine Passport / Wines of BC Explorer is clarified.

---

*Crosswalk Version: 1.0*
*Date: 2026-01-28*
