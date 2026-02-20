# Component Slicing Architecture
## Cultural Current Mesh — Deployment Slice Framework

**Version:** 1.0
**Approach:** Component modular build — NOT linear timeline progression
**Orientation:** B2B first, feedback loop before revenue ramp

---

## 1. Core Philosophy

The CCM is not shipped as a monolith. It is sliced into deployable configurations — each slice is a curated subset of the 10-component inventory, targeted to a specific context (conference, pop-up, workshop, commercial engagement).

This is analogous to a "Place Packet" in the Place-Based Microlearning Blueprint: a deployable bundle with bounded scope, governed rights, and economic hooks — not a platform.

**Anti-pattern we reject:** Linear feature-flag progression toward a "complete" product.
**Pattern we adopt:** Each slice is complete for its context. Complexity is added by need, not schedule.

---

## 2. Component Inventory (10 Core Components)

| # | Component | File | Purpose |
|---|-----------|------|---------|
| 1 | PlacePacketShell | components/place-packet/PlacePacketShell.tsx | Render container for any Place Packet deployment |
| 2 | GTMAcceleratorDashboard | components/gtm/GTMAcceleratorDashboard.tsx | Spatial intelligence dashboard for B2B engagements |
| 3 | GuildAcademyCharter | components/guild/GuildAcademyCharter.tsx | SCID/DACUM vocational training scaffold |
| 4 | HumancodeWine | components/narrative/HumancodeWine.tsx | Crime→Culture narrative engine (wine pilot template) |
| 5 | FeltIntegration | src/examples/FeltIntegration.tsx | Collaborative map layer (Felt.com) |
| 6 | UnifiedGTMDashboard | src/examples/UnifiedGTMDashboard.tsx | Unified spatial + GTM dashboard |
| 7 | ThemeProvider | src/context/ThemeProvider.tsx | Design token context (spatial-studio-core + place-packet-contexts) |
| 8 | ProhibitionTrailPacket | components/place-packet/ProhibitionTrailPacket.tsx | Heritage Trail pilot (extends PlacePacketShell) |
| 9 | SovereigntyGate | (inline in ProhibitionTrailPacket) | GrowthBook feature flag enforcement |
| 10 | GuildAcademyCharter | components/guild/GuildAcademyCharter.tsx | Human capacity building — SCID/DACUM |

---

## 3. Five Deployment Slices

### Slice A — Conference Demo
**Context:** Event keynote, trade show, stakeholder presentation
**Duration:** 15–30 min self-guided or facilitated
**Governance overhead:** Minimal (Level 0 sovereignty)

**Components active:**
- PlacePacketShell (read-only mode)
- FeltIntegration (static map, no editing)
- GTMAcceleratorDashboard (view-only metrics)
- ThemeProvider

**Components inactive:**
- GuildAcademyCharter (no training session)
- ProhibitionTrailPacket (optional — swap in for cultural demo)
- SovereigntyGate (hidden — Level 0 default)
- HumancodeWine (background only, no interaction)

**GrowthBook flags:**
```json
{
  "governance-tier1-veto": false,
  "hume-voice-synthesis": false,
  "community-memory-layer": false,
  "tend-action-enabled": false,
  "transmit-action-enabled": true,
  "sovereignty-level": 0
}
```

---

### Slice B — Pop-Up Event (Hospitality / Heritage)
**Context:** Museum pop-up, hotel lobby activation, cultural festival booth
**Duration:** 10–45 min per visitor (drop-in)
**Governance overhead:** Level 1 sovereignty (editorial control)

**Components active:**
- ProhibitionTrailPacket (full — all 3 narrative layers)
- FeltIntegration (live collaborative map)
- ThemeProvider
- SovereigntyGate (Level 1)

**Components inactive:**
- GuildAcademyCharter
- GTMAcceleratorDashboard

**GrowthBook flags:**
```json
{
  "governance-tier1-veto": false,
  "hume-voice-synthesis": true,
  "community-memory-layer": true,
  "tend-action-enabled": false,
  "transmit-action-enabled": true,
  "sovereignty-level": 1
}
```

---

### Slice C — Developer Post / Community Submission
**Context:** Dev.to, Hashnode, GitHub Discussions, newsletter
**Duration:** Async (read-only artifact)
**Governance overhead:** None (public documentation)

**Components active:**
- Static render of PlacePacketShell (screenshot/embed)
- Design token documentation
- Architecture diagrams (SVG assets)

**GrowthBook flags:** N/A (static export)

---

### Slice D — Workshop (Domain Association / Academic)
**Context:** University seminar, cultural association workshop, SCID training session
**Duration:** 2–4 hours facilitated
**Governance overhead:** Level 2 sovereignty (revenue rules active)

**Components active:**
- GuildAcademyCharter (primary — training scaffold)
- ProhibitionTrailPacket (as case study)
- GTMAcceleratorDashboard (metrics teaching tool)
- ThemeProvider
- SovereigntyGate (Level 2)

**GrowthBook flags:**
```json
{
  "governance-tier1-veto": true,
  "hume-voice-synthesis": false,
  "community-memory-layer": true,
  "tend-action-enabled": true,
  "transmit-action-enabled": true,
  "sovereignty-level": 2,
  "scid-dacum-mode": true
}
```

---

### Slice E — Commercial Engagement (B2B)
**Context:** Hospitality brand partnership, heritage tourism operator, municipal tourism board
**Duration:** Ongoing SLA
**Governance overhead:** Level 2–3 sovereignty (full IGNIS-ADAPT)

**Components active:** All 10
**GrowthBook flags:**
```json
{
  "governance-tier1-veto": true,
  "hume-voice-synthesis": true,
  "community-memory-layer": true,
  "tend-action-enabled": true,
  "transmit-action-enabled": true,
  "sovereignty-level": 3,
  "scid-dacum-mode": true,
  "mvr-tracking": true,
  "ecp-distribution": true
}
```

---

## 4. Feedback Loop Architecture

```
Conference/Pop-Up (Slice A/B)
  → Visitor interaction data → Inngest "trail/layer-selected" events
  → Sanity CMS: steward review of top-engaged content
  → GrowthBook: A/B flag adjustments

Workshop (Slice D)
  → SCID/DACUM session data → GuildAcademyCharter metrics
  → Revenue validation: does training revenue offset development cost?
  → Decision gate: proceed to Commercial slice?

Commercial (Slice E)
  → MVR tracking: $70K annual per deployment target
  → ECP distribution: 70% creators / 20% community / 10% platform
  → SSI monitoring: governance health ≥ 0.50 threshold
```

The feedback loop completes BEFORE revenue ramp. Workshop → Commercial is gated on SSI ≥ 0.50 (IGNIS-ADAPT Tier 1).

---

## 5. Reusability Matrix

| Component | A: Conf | B: Pop-Up | C: Dev Post | D: Workshop | E: Commercial |
|-----------|---------|-----------|------------|------------|---------------|
| PlacePacketShell | ✓ | ✓ | Static | ✓ | ✓ |
| GTMAcceleratorDashboard | ✓ (view) | — | — | ✓ | ✓ |
| GuildAcademyCharter | — | — | — | ✓ | ✓ |
| HumancodeWine | — | ✓ | — | ✓ | ✓ |
| FeltIntegration | ✓ (static) | ✓ (live) | — | ✓ | ✓ |
| ProhibitionTrailPacket | Optional | ✓ | Static | ✓ | ✓ |
| ThemeProvider | ✓ | ✓ | — | ✓ | ✓ |
| SovereigntyGate | — | L1 | — | L2 | L2-3 |

---

## 6. Anti-Patterns

**Do NOT build:**
- A single app with all features hidden behind flags (monolith with complexity debt)
- A "roadmap" that adds features linearly (every slice is already complete for its context)
- Consumer-facing onboarding (B2B only — no cold-start problem)
- Real-time narration by default (pre-recorded = reliability; live Hume.ai = experimental Pop-Up only)
- Centralized governance AI (IGNIS-ADAPT gates are human-enforced, not algorithmic)
