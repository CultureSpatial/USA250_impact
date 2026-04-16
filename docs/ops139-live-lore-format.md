# OPS-139: Live Lore Publishing Format — Multi-Surface Editorial Grammar

## Purpose

One editorial spine runs across all live surfaces: Twitch, YouTube Live, Discord Stage, Instagram Live.
The grammar doesn't change. The cadence does.

This document is the show format reference for Martha's live sessions and any subsequent practitioner sessions in the DTC Nodes glide path.

---

## Show Structure

Every session follows this three-part arc regardless of platform:

1. **Opening terroir frame** (5–8 min)
   - Host names the place: watershed, season, what's in season right now
   - Martha names the ingredient or practice for today
   - No platform introduction — start with the land

2. **Practitioner interview** (20–35 min)
   - 3 question patterns (rotate, do not exhaust in one session):
     - **Place**: "Where does this [ingredient/practice] come from — physically, in the landscape?"
     - **Practice**: "How did you learn this? Who taught you, and what did they say?"
     - **Season**: "What does [current season] mean for what you're making / gathering / preserving?"
   - One follow-up permitted per question before moving on
   - Host does not editorialize or summarize — surface and move

3. **Sensory closing** (3–5 min)
   - Martha names one thing she wants guests to notice: a smell, a texture, a sound, a color
   - Host reads the Seeds governance note aloud: *"Martha retains full authority over her stories."*
   - Platform-specific CTA (see Platform Adaptation below)

---

## Platform Adaptation Matrix

| Platform | Cadence | Audience interaction | Clip cadence | Closing CTA |
|----------|---------|----------------------|--------------|-------------|
| Discord Stage | Weekly or bi-weekly | Live Q&A during practitioner interview | 1–2 clips extracted post-session | "Join #martha-sessions for notes" |
| YouTube Live | Monthly or event-driven | Super Chat / comment moderation | Full session archived + 3 clips | "Subscribe for next session" |
| Twitch | Weekly | Chat enabled during terroir frame, muted during interview | Highlights via Twitch Clip tool | "Follow for live alerts" |
| Instagram Live | Campaign-aligned (e.g. seasonal, event) | Host reads select comments to Martha | No clips — IG native save only | "Find Martha on Resy" |

---

## Clip Taxonomy

All clips extracted from Martha's sessions are tagged with one of four types:

| Type | Definition | Max duration | Public carry-over? |
|------|-----------|--------------|-------------------|
| **Terroir fragment** | Martha names a place — watershed, valley, trail, body of water | 60s | Yes (attribution required) |
| **Gesture fragment** | Martha demonstrates a practice — cutting, stirring, wrapping | 90s | Conditional (see consent scope) |
| **Sovereignty note** | Martha names who holds authority over a story or ingredient | 30s | Yes — priority carry-over |
| **Seasonal lore** | Martha connects current season to food, ceremony, or practice | 90s | Yes (attribution required) |

**Note**: Gesture fragments require `consentScope: gesture_public` before carry-over to contributor channels. Until CEAZ-242 clears, treat all Martha gesture fragments as non-carry-over.

---

## Attribution and Carry-Over Rules

- All clip descriptions must lead with: *"[Martha's name], [producerType], [node]."*
- Clips may be shared to contributor channels with full attribution line intact.
- Clip descriptions must not be summarized, paraphrased, or contextualized beyond the clip itself.
- The Seeds governance note must appear in the first comment of any posted clip: *"Martha retains full authority over her stories. Seeds sovereign storytelling platform."*

### OTW (On The Way) Carry-Over

OTW carry-over for Martha's content is blocked until CEAZ-242 (Puyallup consent gate) clears. Until then:
- No persistent archiving of Martha's session content outside platform-native saves
- No cross-posting to OTW channels (BOT-27)
- Seasonal lore and terroir fragments may be shared manually with attribution; no automated pipeline

---

## Infrastructure Connection Points

| Infrastructure | Issue | Role in live lore stack |
|---------------|-------|------------------------|
| EventBus | `lib/services/event-bus.ts` | `AUDIO_GEM_RECORDED`, `AUDIO_GEM_UPLOADED` fire during live capture |
| StoryGem | ENG-29 (#46) | Captures live voice → portable narrative artifact stored in PlayFab |
| QR → PlayFab lobby | ENG-31 (#45) | Place packet QR → Discord join during live session window |
| Martha live hub | `app/martha/live/page.tsx` | Consumer surface for StoryGem artifacts (Phase 1) |
| Producer coordinator | EXPLORE_CLIQUE (PART-64) | Brigata sequencing, cohort orchestration |
| Cross-subsidy optimizer | OPS-42 | Martha's live sessions as verchandising nodes |
| WA corridor intel | PART-87 | Washington Wine Commission + Alaska Airlines corridor routing |
