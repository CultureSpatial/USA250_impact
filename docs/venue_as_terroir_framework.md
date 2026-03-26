# Venue as Terroir: Hospitality Phenomenology Framework
**RES-11 / CEAZ-203 — Viticulture Lighthouse Format Kit**

---

## The Core Claim

A wine venue is not a location. It is a *terroir in time* — a convergence of soil, water, labour, knowledge, and season that a visitor enters for a few hours and carries away in their body.

Our job is not to describe that venue. Our job is to **make the visitor feel it** — before they leave, and after they go home.

The **1 Sense-of-Place / 3 Visitor-Experience** framework structures that feeling into replicable, culturally-honest, sovereignty-respecting narrative infrastructure.

---

## The Framework: 1 + 3

### 1 — Sense of Place (The Terroir Narrative)

One unified, unwavering identity statement for the venue. Not a tagline. Not marketing copy. **A place story.**

It answers:
- What water shaped this soil?
- Who has always known this land?
- What does this season feel like in this place?
- What chain of labour brought the harvest here?

**Format requirements:**
- **Headline**: ≤ 120 characters. One sentence. The place itself, not a welcome.
- **Body**: 2–4 paragraphs. Narrativised prose. No transactional language. No "we invite you."
- **Sensory anchors**: 3–5 specific, embodied details (smell, sound, sight, taste, touch)
- **Temporal signature**: The moment/season that makes this place irreducibly itself
- **Watershed**: The water body that defines the hydrology (always present, rarely named in wine tourism)

**Editorial rule**: If you can replace the venue name with another venue's name and it still reads correctly, rewrite it. Sense of Place is irreplaceable or it is nothing.

---

### 3 — Visitor Experience Arc

Three micro-moments that scaffold the visitor's phenomenological journey. Not stages of a sales funnel. **Phases of an encounter with place.**

#### Arrival
The visitor enters. They are still carrying the city, the traffic, the pre-event anxiety. The arrival micro-copy and sensory hook must interrupt that rhythm and plant them in *this* place.

- **Setting**: Physical/atmospheric context on entry
- **Micro-copy**: ≤ 30 words. Narrativised. Grounds them before the experience begins.
- **Sensory hook**: The first thing that arrives before cognition — smell, sound, temperature

*Avoid*: "Welcome to [Venue]." "We're so glad you're here." Any sentence beginning with "you're going to love."

*Example*: *"You're standing where the ocean ends and the harvest begins. Follow what calls you."*

#### Interstitial
The visitor is mid-experience. Three wines in. A producer at the table. The moment the festival becomes a conversation. The interstitial moment deepens the terroir narrative by connecting it to the specific knowledge the visitor is now encountering.

- **Setting**: Mid-experience environment
- **Micro-copy**: ≤ 30 words. Offers a question or observation that opens the producer story.
- **Transition**: What has shifted since arrival

*Example*: *"Ask them what year the river ran low. That's the wine in your glass."*

#### Departure
The visitor leaves. They have bottles. They have notes. They have someone's voice in their memory. The departure moment plants a **ripple hook** — something that will surface when they open a bottle 30, 60, 90 days from now.

- **Setting**: Leaving context
- **Micro-copy**: ≤ 30 words. Looks forward without closing the story.
- **Ripple hook**: The specific thing that will return when they drink the wine later

*Example*: *"The mountain will still be there. So will the producer. So will the harvest."*

---

## Indigenous Context Protocol

Every Sense-of-Place narrative must include an Indigenous context block. This is **not optional**. It is the ethical minimum for operating on unceded territories.

The block specifies:
- **Protocol**: `attribute` | `withhold` | `share` | `transform` (CARE Principles)
- **Knowledge holder**: Named with consent, or `"withheld"` with reason
- **Seasonal teaching**: What this place/season teaches, if shareable under the protocol
- **Visibility**: `express` | `show` | `steward` — maps directly to the narrativeLayer visibility policy in the CMS

**Working rule**: If the knowledge holder says withhold, we withhold. The CIP Overlay's `refusalRights` toggle enforces this technically. It is not consultation theater.

---

## Connection to Place Packet System

The Sense-of-Place framework maps directly to the existing Sanity CMS architecture:

| Framework Element          | Sanity Schema           | Field                        |
|----------------------------|-------------------------|------------------------------|
| Terroir narrative          | `narrativeLayer`        | `type: 'historical'`         |
| Indigenous context         | `narrativeLayer`        | `type: 'tek'`                |
| Visitor arc (3 moments)    | `stop` (×3)             | `title`, `locationHint`      |
| Sensory anchors            | `narrativeLayer`        | `assets` (text type)         |
| Visibility policy          | `narrativeLayer`        | `visibilityPolicy`           |
| CARE protocol              | `cipOverlay`            | `toggles.refusalRights`      |
| Producer attribution       | `author`                | `name`, `bio`, `website`     |
| Ripple hook / DtC link     | `magnetTemplate`        | `copyVariants[departure]`    |

The Sense-of-Place YAML block in `data/sense-of-place-template.yaml` can be ingested directly into Sanity via the converter pipeline.

---

## Editorial Style Guide

### Tone: Narrativised, Not Transactional

| Transactional (avoid)                     | Narrativised (use)                          |
|-------------------------------------------|---------------------------------------------|
| "Welcome to our tasting room"             | "The barrel room is still cool from winter" |
| "Our winemaker has 20 years experience"   | "He learned to read Brix from his father"  |
| "Enjoy our award-winning Pinot Noir"      | "This one took three harvests to get right" |
| "We hope you'll join us again"            | "The harvest will come around again"        |

### Sensory Over Abstract

Name the specific thing: the temperature of the glass, the smell before the wine, the sound of the pour. Abstract language ("beautiful," "unique," "exceptional") dissolves in memory. Sensory language returns with the bottle.

### Practitioner Voice Over Institution Voice

The terroir narrative should sound like **the person who grows it**, not the institution that markets it. When in doubt, ask the producer: "What's the hardest thing about this vintage that you'd only tell someone who already loves the wine?" Start there.

---

## Acceptance Checklist

- [ ] Headline ≤ 120 chars, place-specific, not replaceable with another venue
- [ ] Body 2–4 paragraphs, no transactional language, watershed named
- [ ] 3–5 sensory anchors with specific physical detail
- [ ] All three micro-copy moments ≤ 30 words each
- [ ] Indigenous context block present with protocol specified
- [ ] Knowledge holder named or explicitly withheld with reason
- [ ] Visibility policy set and reflected in CIP toggle
- [ ] Attribution block complete with license
- [ ] Sample JSON validates against `sense-of-place-template.yaml` structure
