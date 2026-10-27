# Voice-Driven Cartography: Audio Interaction Specification

## Overview

This document outlines the technical specification for implementing voice-driven, location-based storytelling for the USA250 Prohibition Artifacts project. Inspired by **19 Crimes AR wine labels** (where bottles "speak" their stories), this system enables **physical locations to narrate their history** through audio when users approach.

---

## Core Concept: "19 Crimes for Places"

**19 Crimes Model:**
- Scan wine bottle → Label comes alive → Convict tells their story
- 80% narrative (crime lore) + 20% commerce (wine sales)
- Emotional hook: Rebel identity, collectible artifacts

**Our Adaptation:**
- Approach location → GPS trigger → Location narrates its history
- 80% narrative (Prohibition lore) + 20% commerce (tours, merch, experiences)
- Emotional hook: Urban exploration, hidden history, gangster mystique

---

## Technical Architecture

### 1. Proximity Detection System

#### GPS-Based Triggering
```javascript
// User's current location
const userLocation = { lat: 41.9642, lon: -87.6593 };

// Query narratives within 100m radius
const nearbyStories = await supabase.rpc('get_narratives_within_radius', {
  lat: userLocation.lat,
  lon: userLocation.lon,
  radius_meters: 100
});

// Trigger notification: "You're 15 meters from the Green Mill Speakeasy"
```

#### Trigger Zones (Configurable per Artifact)
| Distance | Trigger Action | User Experience |
|----------|---------------|-----------------|
| **500m** | Pre-notification | "Approaching Green Mill (400m away)" |
| **100m** | Story unlocked | "Green Mill unlocked! Tap to listen" |
| **50m** | Auto-play option | "Now entering Green Mill. Audio starting..." |
| **<10m** | Enhanced content | Unlock photos, AR overlays, hidden details |

---

### 2. Audio Playback System

#### Audio File Structure
```
/audio/
  /narratives/
    /green-mill/
      - green-mill-en.mp3          (Primary English narration)
      - green-mill-es.mp3          (Spanish translation)
      - green-mill-transcript.txt  (Accessibility)
      - green-mill-alt.mp3         (Alternate dramatic reading)
```

#### Metadata for Each Audio File
```typescript
interface AudioAsset {
  narrative_id: string;
  file_url: string;
  file_format: "mp3" | "ogg" | "wav";
  duration_seconds: number;
  language_code: string; // ISO 639-1
  voice_style: "documentary" | "narrative" | "first_person" | "dramatic";
  voice_artist: string;
  is_primary: boolean;
}
```

---

### 3. Narration Specifications

#### Voice Styles by Artifact Type

| Voice Style | Use Case | Example Artifact |
|-------------|----------|------------------|
| **Documentary** | Historical events, massacres | St. Valentine's Day Massacre |
| **Narrative** | Speakeasies, ongoing stories | Green Mill, Twin Anchors |
| **First Person** | Personal accounts, testimonies | (Future UGC content) |
| **Dramatic** | Theatrical readings for tours | Murder sites, dramatic moments |

#### Audio Production Guidelines

**Length:**
- Standard: 2-3 minutes (120-180 seconds)
- Extended: 4-5 minutes for landmark locations
- Micro: 30-60 seconds for quick facts

**Tone:**
- Jazz music undertones for speakeasy stories
- Period-appropriate sound effects (gunshots, church bells, clinking glasses)
- Noir film aesthetic for murder/violence narratives
- Warm, nostalgic for restaurants still operating

**Accessibility:**
- Full transcript for deaf/hard-of-hearing users
- Audio descriptions for visually impaired users
- Multilingual support (EN, ES, future: more languages)

---

### 4. User Interaction Flow

#### A. Walk-Up Experience (Passive Discovery)
```
1. User opens app with GPS enabled
2. App detects proximity to Green Mill (100m)
3. Push notification: "🎷 Green Mill Speakeasy nearby. Al Capone drank here."
4. User taps notification → Story unlocked
5. Audio begins playing with visual timeline
6. User can pause, rewind, share, favorite
```

#### B. Voice Query Experience (Active Search)
```
User: "Find stories about bootleggers near me"
App: [Searches narratives with tag "bootlegger" within 5km]
App: "Found 3 stories: Green Mill, Four Deuces, Twin Anchors"
User: "Play Green Mill"
App: [Plays audio narration]
```

#### C. Guided Tour Experience
```
App: "Chicago Prohibition Walking Tour - 5 locations, 45 minutes"
Route: Green Mill → St. Valentine's Massacre → Holy Name Cathedral →
        Schofield's Flower Shop → Green Door Tavern
App auto-plays audio as user reaches each waypoint
```

---

### 5. Audio Player Interface (UI/UX)

#### Player Controls
```
┌──────────────────────────────────────────┐
│  🎙️ Green Mill Cocktail Lounge          │
│  Al Capone's favorite speakeasy          │
├──────────────────────────────────────────┤
│  [▶️ PLAY]  [⏸️ PAUSE]  [⏭️ NEXT]        │
│  ━━━━━━━━━○───────── 1:42 / 3:00        │
│                                           │
│  🔊 Volume    📝 Transcript   ⭐ Favorite │
└──────────────────────────────────────────┘
```

#### Companion Visualizations
- **Map view:** Show user location + artifact location
- **Photo gallery:** Historical photos appear during playback
- **AR overlay (future):** Point camera at building, see 1920s overlay

---

### 6. Caching & Offline Support

#### Strategy: Pre-download for Offline Tours
```javascript
// User downloads "Chicago Prohibition Tour" pack
const tourPack = {
  narratives: [/* 10 prohibition artifacts */],
  audio_files: [/* All MP3s */],
  images: [/* Historical photos */],
  map_tiles: [/* Offline map data */]
};

// Total size: ~50MB for 10 artifacts
// Enables GPS + audio playback without internet
```

#### Redis Caching (for online mode)
```javascript
// Cache frequently accessed audio URLs
await redis.set(
  `audio:green-mill:en`,
  audioUrl,
  { ex: 86400 } // 24-hour TTL
);

// Cache geo-proximity results
await redis.georadius('chicago:prohibition',
  -87.6593, 41.9642, 100, 'm'
);
```

---

### 7. UGC (User-Generated Content) Pipeline

#### Future: Community Contributions
```
1. User visits location (e.g., unmarked speakeasy site)
2. Records audio story on phone (30-90 seconds)
3. Uploads with GPS coordinates + photos
4. Moderation review (historical accuracy check)
5. Approved → Added to narrative database
6. Original contributor earns credit + badge
```

**Quality Control:**
- Require historical sources citation
- Fact-check by community moderators
- Flag system for inaccuracies
- Upvote/downvote for quality ranking

---

### 8. Commerce Integration (20% Layer)

#### Monetization Aligned with 19 Crimes Model

**In-App Purchases:**
- Premium tours ($4.99): "Capone's Chicago" with 15 locations
- Extended audio ($0.99/each): 10-minute deep dives
- AR experiences ($2.99): See 1920s overlays on buildings

**Physical Merchandise:**
- QR codes at real locations link to merch store
- "I visited the Green Mill" collectible pins
- Prohibition tour t-shirts, maps, booklets

**Partnership Revenue:**
- Restaurants (Twin Anchors, Exchequer) pay for premium placement
- Ghost tour companies license audio content
- Chicago Tourism Board sponsorship

---

### 9. Analytics & Engagement Metrics

#### Track User Behavior
```sql
-- Most popular narratives
SELECT title, COUNT(*) AS play_count
FROM audio_plays
GROUP BY narrative_id, title
ORDER BY play_count DESC;

-- Average listen duration (engagement score)
SELECT AVG(listen_duration_seconds / audio_duration_seconds) AS completion_rate
FROM audio_plays;

-- Geographic heatmap (where users listen)
SELECT ST_AsGeoJSON(user_location) AS location, COUNT(*) AS plays
FROM audio_plays
GROUP BY user_location;
```

#### Gamification
- **Badges:** "Speakeasy Expert" (visit 5 speakeasies)
- **Leaderboards:** Top contributors, most locations visited
- **Streaks:** "7-day Prohibition history streak"

---

### 10. Implementation Roadmap

#### Phase 1: MVP (4-6 weeks)
- ✅ Supabase database + PostGIS setup
- ✅ 10 Chicago Prohibition artifacts seeded
- ⬜ Record 10 professional audio narrations
- ⬜ Build mobile app (React Native / Flutter)
- ⬜ GPS proximity detection
- ⬜ Basic audio player

#### Phase 2: Enhanced Features (8-12 weeks)
- ⬜ Multilingual support (Spanish)
- ⬜ Offline tour pack downloads
- ⬜ Voice search ("Find bootlegger stories")
- ⬜ Historical photo galleries
- ⬜ User accounts + favorites

#### Phase 3: Community & Commerce (12+ weeks)
- ⬜ UGC submission pipeline
- ⬜ AR overlays (historical building views)
- ⬜ Premium tour subscriptions
- ⬜ Partner integrations (restaurants, tour companies)
- ⬜ Expand to other cities (NYC, New Orleans, San Francisco)

---

### 11. Voice Interaction Examples

#### Scenario 1: Tourist at Green Mill
```
[User walks past Green Mill, phone buzzes]

App: "You're 20 meters from the Green Mill Cocktail Lounge,
      Al Capone's favorite speakeasy. Want to hear the story?"

User: [Taps "Yes"]

Narrator (warm, jazzy tone):
"Step into the Green Mill Cocktail Lounge, and you're walking
through the same doors that Al Capone pushed open nearly a
century ago..."

[2.5 minutes of narration with jazz music undertones]

App: "Story complete. Nearby: St. Valentine's Day Massacre (1.2 km)"
```

#### Scenario 2: Voice Query
```
User: "Tell me about secret tunnels"

App: [Searches tags: "tunnels", "escape-routes"]

App: "Found 2 stories with secret tunnels:
      1. Green Mill - Capone's escape tunnels (500m away)
      2. Twin Anchors - Tunnel to apartments (2.1 km away)
      Which would you like to hear?"

User: "Play Green Mill"

[Audio begins]
```

---

## Acceptance Criteria (Voice-Driven Cartography)

### ✅ Completed
- [x] 10 artifacts seeded with GPS coordinates
- [x] All narratives have 2-3 paragraph descriptions
- [x] Historical accuracy verified with sources
- [x] Audio duration estimates calculated
- [x] Voice style specified for each artifact

### ⬜ In Progress
- [ ] Professional audio narrations recorded
- [ ] Mobile app MVP deployed
- [ ] GPS proximity triggers functional
- [ ] Basic audio playback working

### 🎯 Future Goals
- [ ] 100+ artifacts across 5 cities
- [ ] 10,000+ monthly active users
- [ ] 50% average audio completion rate
- [ ] $50K annual revenue from tours + merch

---

## Technical Dependencies

**Infrastructure:**
- Supabase (PostgreSQL + PostGIS + Storage)
- Upstash Redis (geo-caching)
- Cloudflare CDN (audio file delivery)

**Mobile App:**
- React Native / Flutter
- Expo Location API
- React Native Track Player

**Audio Production:**
- Voice actors (3 narrators for variety)
- Adobe Audition / Audacity
- Epidemic Sound (licensed music)

---

## References & Inspiration

- **19 Crimes AR Wine:** [https://www.19crimes.com](https://www.19crimes.com)
- **The Mob Museum (Las Vegas):** Audio tour model
- **Detour (acquired by Bose):** Location-based audio walks
- **Atlas Obscura:** Hidden history discovery platform

---

**Last Updated:** 2026-01-09
**Version:** 1.0
**Contact:** USA250 Story Trails Team
