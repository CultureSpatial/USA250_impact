# Voice Interaction Specification
## Cultural Current Mesh — Chicago Prohibition Resistance Trail

**Version:** 1.0
**Stack:** Hume.ai (atmospheric synthesis) + Supabase (narrative storage) + Inngest (event orchestration)
**Pilot Deployment:** Heritage Trail — 7 stops, 90-120 min, ~2.5 miles

---

## 1. Proximity Zone Model

The trail uses a four-zone concentric trigger system. Each zone activates different audio behaviors:

```
Zone 0 — Ambient (> 500m)
  → Background atmospheric soundscape (city ambience, era-appropriate music bed)
  → No narration, no content loading

Zone 1 — Approach (100m–500m)
  → Pre-fetch narrative assets for the nearest site
  → Gentle audio cue: soft chime or period-appropriate sound motif
  → Display: site name + teaser headline on map pin

Zone 2 — Threshold (10m–100m)
  → Activate primary narrator voice
  → Begin full narrative layer (Historical fact layer)
  → Display: site card with all 3 layer options

Zone 3 — Immersion (< 10m)
  → Unlock Community Memory layer
  → Unlock Sensory Atmosphere layer (Hume.ai affective synthesis)
  → Enable: "Tend" action (steward contribution submission)
  → Enable: "Transmit" action (share this stop)
```

---

## 2. Narrative Layer Architecture

Each site carries three parallel narrative layers. Users select the layer; the audio/content adapts.

### Layer 1: Historical Fact
- **Voice style:** Authoritative, documentary tone
- **Content:** Verified historical record (dates, events, names)
- **Audio source:** Pre-recorded MP3 (primary path, reliability-first)
- **Hume.ai role:** None in Conference/Workshop slices; atmospheric only in Pop-Up slice
- **Duration:** 90–180 seconds per site

### Layer 2: Community Memory
- **Voice style:** Personal, testimonial tone
- **Content:** Oral history fragments, descendant accounts, neighborhood memory
- **Audio source:** Pre-recorded (steward-approved recordings)
- **Unlock condition:** Zone 3 (< 10m from site) or Sovereignty Level 1+
- **Duration:** 60–120 seconds per site

### Layer 3: Sensory Atmosphere
- **Voice style:** Hume.ai EVI (Empathic Voice Interface) — atmospheric, not behavioral
- **Content:** Environmental reconstruction — what it sounded, smelled, felt like
- **Audio source:** Hume.ai real-time synthesis (Pop-Up experimental slice only)
  - Pre-recorded fallback for Conference/Workshop slices
- **Unlock condition:** Zone 3 only
- **Duration:** 30–90 seconds per site

---

## 3. Hume.ai Integration Notes

### Deployment Mode Decision

| Slice | Hume.ai Use | Rationale |
|-------|------------|-----------|
| Conference | Pre-recorded fallback only | Reliability: no network dependency at events |
| Pop-Up Event | Live EVI synthesis (Layer 3 only) | Experimental showcase, controlled env |
| Workshop | Pre-recorded | Predictable pacing for facilitated sessions |
| Commercial (B2B) | Pre-recorded + async generation | SLA-grade reliability required |

### Hume.ai Configuration (Pop-Up Experimental)

```typescript
// Hume EVI configuration for sensory atmosphere layer
const eviConfig = {
  model: "evi-2",
  voice: {
    provider: "HUME_AI",
    name: "ITO",  // Contemplative, historically grounded tone
  },
  systemPrompt: `You are the atmospheric voice of [SITE_NAME], circa [YEAR].
    You speak in present tense, describing what surrounds the listener right now
    in that era. You do NOT narrate history — you inhabit the moment.
    You do NOT reference the user or their experience. You are the place itself.
    Limit: 60 seconds of continuous speech maximum.`,
  emotionFeatures: {
    enabled: false,  // Atmospheric only — no behavioral emotion tracking
    transmitToServer: false
  }
}
```

### Privacy Constraint
- Hume.ai emotion detection features are **disabled** (disabled in configuration)
- No emotional data is captured, stored, or transmitted
- This aligns with the IGNIS-ADAPT cultural consent requirement: AI configures to cultural protocol, not the reverse

---

## 4. Inngest Event Triggers

Voice interactions generate events that feed the Tend & Transmit dual-loop:

```typescript
// Zone entry event
await inngest.send({
  name: "trail/zone-entry",
  data: {
    siteId: "green-mill-tavern",
    userId: session.userId,  // anonymous or authenticated
    zone: 2,  // 0-3
    timestamp: new Date().toISOString(),
    sovereigntyLevel: user.sovereigntyLevel,
  }
})

// Layer selection event (Tend loop input)
await inngest.send({
  name: "trail/layer-selected",
  data: {
    siteId: "green-mill-tavern",
    layer: "community-memory",
    userId: session.userId,
    completionRate: 0.87,  // % of audio completed before exit
  }
})

// Tend action (steward contribution)
await inngest.send({
  name: "trail/tend-submitted",
  data: {
    siteId: "green-mill-tavern",
    contributionType: "oral-history",  // oral-history | photo | correction | note
    payload: encryptedContributionUrl,
    stewardId: session.userId,
    cfiEstimate: 0.72,  // local estimate before governance review
  }
})

// Transmit action
await inngest.send({
  name: "trail/transmit-triggered",
  data: {
    siteId: "green-mill-tavern",
    shareChannel: "link",  // link | qr | nfc
    recipientContext: "public",
  }
})
```

---

## 5. Seven-Stop Trail Sequence

| Stop | Site | Era | Zone 3 Unlock |
|------|------|-----|---------------|
| 1 (Trailhead) | Green Mill Cocktail Lounge | 1907–present (Prohibition use: 1920-1933) | Tunnel network narrative |
| 2 | St. Valentine's Day Massacre Site | Feb 14, 1929 | Al Capone connection fragment |
| 3 | Holy Name Cathedral | 1926 | Hymn audio reconstruction |
| 4 | Schofield's Flower Shop | 1926 | Weiss ambush oral account |
| 5 | Four Deuces (2222 S. Wabash) | 1920-1923 | Early Capone territory map |
| 6 | The 226 Club / Colosimo's | 1910-1920 | Big Jim Colosimo testimony fragment |
| 7 (Trail End) | Metro Theatre | 1927 | Jazz-era soundscape (Hume.ai) |

---

## 6. Audio Asset Checklist (Pre-Deployment)

- [ ] Layer 1 recordings: 7 sites × 1 track = 7 MP3 files (90-180s each)
- [ ] Layer 2 recordings: 7 sites × 1 track = 7 MP3 files (60-120s each)
- [ ] Layer 3 pre-recorded fallbacks: 7 sites × 1 track = 7 MP3 files (30-90s each)
- [ ] Zone 1 audio cues: 1 shared motif file (loopable, 3-5s)
- [ ] Ambient soundscape: 1 city ambience file (loopable, 2-5 min)
- [ ] All audio: culturally reviewed, CFI ≥ 0.65 before upload to Sanity
- [ ] Steward approval: Boundary & Access Steward sign-off on each Layer 2 file

---

## 7. Supabase Asset Storage

Audio files stored in Supabase Storage (not Sanity):

```
supabase-storage/
└── trail-audio/
    └── prohibition-trail/
        ├── green-mill/
        │   ├── layer-1-historical.mp3
        │   ├── layer-2-community.mp3
        │   └── layer-3-sensory.mp3
        ├── st-valentines/
        │   └── ...
        └── [5 more sites]
```

Metadata (title, duration, CFI score, steward approval date) stored in `narrative_layers` table in Supabase PostgreSQL.
