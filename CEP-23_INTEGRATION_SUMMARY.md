# CEP-23 Integration Summary: Vintage & Voice

**Document Status:** Implementation Plan Updated (Feb 11, 2026)
**Related Ticket:** [CEP-23] Submission Package Assembly - Vintage and Voice
**Implementation Plan:** `/root/.claude/plans/polished-dazzling-rocket.md`

---

## Executive Summary

This document summarizes how CEP-23 (Vintage & Voice submission package) requirements have been integrated into the Delta × VanWineFest × Spatial Studio implementation plan.

**Key Integration:** CEP-23 provides the **proof narrative** (car-trunk → wine-booth evolution video), while the implementation plan delivers the **technical infrastructure** that makes it work.

---

## CEP-23 Overview

### Purpose
Create a submission package (video + screenshots + one-pager) showing how the proven Hyplocate beverage mechanic evolves into the Vintage & Voice festival experience for VanWineFest & Bard stakeholders.

### Deliverables
1. **3-5 min video** - Car-show pickup reframed for wine (Descript editing by Ernest)
2. **8-shot screenshot gallery** - Visual proof of system components
3. **One-page PDF deck** - Prospero/Chorus/Touchstone framing + value-driver table
4. **Submission checklist** - Bard brand guide + VIWF compliance

### Due Dates
- Video rough-cut: Feb 9
- Screenshot gallery: Feb 9
- One-pager PDF: Feb 10
- Checklist: Feb 10

---

## Proof Storyline: Past Edition → New Form

**Quote from CEP-23:** *"We traded trunk unlocking for bottle unlocking – same 30-second loop, now in service of terroir."*

| # | Car-show clip (original)         | Wine-fest overlay (new)                  | Lever proved          | Technical Component        |
|---|----------------------------------|------------------------------------------|-----------------------|----------------------------|
| 1 | "Iris battery nearly drained"    | "Queue fatigue – unsure what to taste"   | Discovery need        | Pre-Selection UI           |
| 2 | Selects energy drink             | Taps Bold Reds → picks 2018 Shiraz       | Pre-selection         | Wine Tribe API             |
| 3 | Visa checkout + identity         | Age + FPIC consent → TQ green            | Safety gate (TQ)      | TQ Safety Gate             |
| 4 | GM trunk auto-opens              | QR scanned → pour authorized in 3s       | Throughput boost      | Digital Tasting Ticket     |
| 5 | Retrieves drink                  | AR overlay shows Vertical Flight         | Infinite Shelf / DTC  | AR Infinite Shelf          |

---

## Technical Hooks Required by CEP-23

### 1. Operator Dashboard Hook
**Owner:** `src/services/operator-dashboard.service.ts`

**Purpose:** Staff interface for booth operators (wineries)

**Features:**
- Display pending Digital Tasting Tickets (QR codes waiting)
- TQ Safety Gate status indicators (GREEN/YELLOW/RED)
- Throughput metrics (pours/hour, average pour time)
- Tribal breakdown chart (pie chart of today's tastings)
- Tribe Reward notifications (99 Bottles challenge completions)

**Value Driver:** *"When the user reaches the front, the operator doesn't spend 2 minutes explaining the menu."* → **+25% throughput**

**Screenshot:** CEP-23 gallery #3 (staff confirm screen)

---

### 2. Dynamic Content Hook
**Owner:** `src/services/dynamic-content.service.ts`

**Purpose:** JSON config CDN for organizers to control wayfinding and quests

**Spec:**
```json
{
  "active_quest": "rare_riesling_hunt",
  "wayfinding_target": "booth_12",
  "ar_wayfinding_enabled": true,
  "sponsored_sky_canvas": {
    "sponsor": "Riedel Glass",
    "visual_layer": "aroma_clouds",
    "rpm": 4000
  }
}
```

**Value Driver:** *"If the queue for 'Booth A' is too long, the Organizer can change the 'Visual Language' in the AR sky."* → **Queue variance -30%**

**Use Case:** Organizer sees Tribal Heatmap showing "Rosé All Day tribe clustering near live music stage" → toggles AR Wayfinding to redirect traffic

---

### 3. Tribe-Specific API
**Owner:** `src/services/tribe-api.service.ts`

**Purpose:** Integration with festival app UUID for VIP tier unlocks

**Function:**
- If main app knows user is "VIP Member," unlock "Platinum Bottle" skin in games
- Track tribal preferences for winery lead capture
- Segment users by flavor profile ("Bold Reds" vs "Crisp Whites")

**Value Driver:** *"The Operator gets a segmented list of 'Digital-Plus' users who are already verified fans of their specific flavor profile."* → **100% verified lead capture**

---

### 4. Digital Tasting Ticket (QR Authorization)
**Owner:** `src/types/vintage-voice.ts` + `components/vintage-voice/DigitalTastingTicket.tsx`

**Purpose:** QR-based pour authorization (3-second validation)

**Spec:**
```typescript
interface DigitalTastingTicket {
  id: string;
  userId: string;
  tribeSelection: WineTribe;  // 'Bold Reds'
  vintage: string;            // '2018 Shiraz'
  qrCode: string;
  tqStatus: TransitionQuotientStatus; // GREEN/YELLOW/RED
  validUntil: Date;
}
```

**Value Driver:** *"QR ticket shown, pour authorised in three seconds. No queue melt-down, no staff bottleneck—just service."* → **+25% throughput**

**Screenshot:** CEP-23 gallery #2 (QR code display)

---

### 5. Tribal Heatmap (Real-Time Analytics)
**Owner:** `components/felt-integration/FeltWineMap.tsx` (Layer 7)

**Purpose:** Real-time tribe clustering visualization for organizer crowd control

**Features:**
- Color-coded tribe locations (Bold Reds = red, Rosé All Day = pink, etc.)
- 30-second batch updates
- Organizer view with crowd control recommendations
- Export data for post-event analysis

**Value Driver:** *"The Organizer sees a real-time map of which 'Tribes' are where."* → **Better planning + high-value data to sell back to wineries**

**Screenshot:** CEP-23 gallery #8 (Dekart Tribal Heat-map snapshot)

---

### 6. Pre-Selection UI
**Owner:** `components/vintage-voice/PreSelectionUI.tsx`

**Purpose:** Queue-time wine selection (moves decision-making to mobile while waiting)

**Features:**
- Wine Tribe selector (Bold Reds, Crisp Whites, Rosé All Day, etc.)
- Vintage picker (filtered by tribe)
- Estimated wait time display
- Generate Digital Tasting Ticket QR

**Value Driver:** *"By moving the 'What do you like?' conversation onto the mobile screen while guests are still in the queue, we turn a bottleneck into a fast-lane."* → **+25% pours/hour**

**Screenshot:** CEP-23 gallery #1 (Tribe select screen)

---

### 7. AR Infinite Shelf
**Owner:** `components/vintage-voice/ARInfiniteShelf.tsx`

**Purpose:** Show vintages not physically present at booth (drive DTC sales)

**Features:**
- Vertical Flight AR overlay (past vintages)
- 3D model viewer for bottles not on-site
- "Add to Cart" CTA for ship-to-home
- Integration with winery e-commerce

**Value Driver:** *"Show vintages the booth isn't physically carrying or bottles that are only available for shipping."* → **DTC orders +12%**

**Screenshot:** CEP-23 gallery #5 (AR overlay showing Vertical Flight)

---

### 8. Digital Salon (Provisional Identity)
**Owner:** `src/services/digital-salon.service.ts`

**Purpose:** Lightweight identity system (no heavy IAM)

**Model:**
- **Problem:** Heavy IAM creates signup friction → reduces throughput
- **Solution:** Provisional UUIDs (no email/password required)
- **Narrative:** *"We don't build gated fortresses. We host neighborhood salons. The door is open, but the vibe is curated."*

**Features:**
- Generate provisional UUID on first visit
- Role-based access (GUEST → VIP upgrade path)
- Consent-first (FPIC + Story Gem opt-in)
- Dialogue-first (no account creation gate)

**Value Driver:** Increases throughput (no signup gate) while deepening engagement (hosted conversations)

---

### 9. TQ Safety Gate (Transition Quotient)
**Owner:** `src/types/vintage-voice.ts` (TransitionQuotientStatus)

**Purpose:** Age/consent verification before pour authorization

**Spec:**
```typescript
interface TransitionQuotientStatus {
  ageVerified: boolean;      // Must be 19+ for BC
  fpicConsent: boolean;      // Free, Prior, Informed Consent
  storyGemConsent: boolean;  // Permission to capture story
  status: 'GREEN' | 'YELLOW' | 'RED'; // GREEN = authorized to pour
}
```

**Safety Gate Logic:**
- GREEN: Age 19+, FPIC consent given → Pour authorized
- YELLOW: Age verified but consent pending → Staff discretion
- RED: Age <19 or consent denied → No pour

**Value Driver:** Legal compliance + cultural sensitivity (FPIC for Indigenous content)

---

## Value-Driver Grid (CEP-23 Metrics)

| Stakeholder       | Lever                | Metric                | Technical Component         |
|-------------------|----------------------|-----------------------|-----------------------------|
| Booth operator    | Pre-selection UI     | pours/hr ↑ 25%        | PreSelectionUI.tsx          |
| Booth operator    | AR Infinite Shelf    | DTC orders ↑ 12%      | ARInfiniteShelf.tsx         |
| Organiser         | AR Wayfinding        | queue variance ↓ 30%  | DynamicContentService       |
| Organiser         | Sponsored Sky Canvas | digital RPM ↑ $4K     | SponsoredCanvas type        |
| Digital Tribes    | Tribal Leaderboard   | dwell time ↑ 8 min    | GamificationService         |

---

## Implementation Plan Updates

### New Phase: Phase 1.5 - Vintage & Voice Technical Hooks (Week 1-2)

**Created 5 new services:**
1. `src/services/operator-dashboard.service.ts` - Operator Dashboard Hook
2. `src/services/dynamic-content.service.ts` - Dynamic Content Hook
3. `src/services/tribe-api.service.ts` - Tribe-Specific API
4. `src/services/digital-salon.service.ts` - Digital Salon (provisional identity)
5. `src/types/vintage-voice.ts` - CEP-23 type system

**Created 7 new UI components:**
1. `components/vintage-voice/OperatorDashboard.tsx` - Staff interface
2. `components/vintage-voice/PreSelectionUI.tsx` - Queue-time wine selection
3. `components/vintage-voice/DigitalTastingTicket.tsx` - QR display
4. `components/vintage-voice/ARInfiniteShelf.tsx` - DTC upsell
5. `components/vintage-voice/TribalHeatmapDashboard.tsx` - Organizer analytics
6. `components/felt-integration/LayerControl.tsx` - 7-layer map control (updated)
7. `components/felt-integration/FeltWineMap.tsx` - Added Layer 7 (Tribal Heatmap)

---

## Felt.com Map Update: 6 Layers → 7 Layers

### Layer 7: Tribal Heatmap (NEW - CEP-23)

**Purpose:** Real-time tribe clustering for organizer analytics

**Color Mapping:**
- Bold Reds: `#DC2626` (red)
- Crisp Whites: `#FBBF24` (yellow)
- Rosé All Day: `#EC4899` (pink)
- Sparkling & Champagne: `#60A5FA` (blue)
- Natural & Orange: `#F97316` (orange)
- Dessert & Fortified: `#8B5CF6` (purple)

**Update Interval:** 30 seconds (batch mode for MVP)

**Organizer Features:**
- View tribe clustering ("Rosé All Day near live music stage")
- Get crowd control recommendations
- Export data for post-event analysis

---

## Testing Updates

### New Unit Tests:
```bash
npm test src/services/operator-dashboard.service.test.ts  # QR validation < 3s
npm test src/services/digital-salon.service.test.ts       # Provisional UUID generation
npm test src/services/dynamic-content.service.test.ts     # JSON config fetch
npm test src/services/tribe-api.service.test.ts           # UUID integration
```

### New Integration Tests:
```bash
npm test src/integration/operator-dashboard-flow.test.ts   # Pre-selection → QR → Pour → Reward
npm test src/integration/tribal-heatmap.test.ts            # Real-time clustering updates
npm test src/integration/digital-salon-flow.test.ts        # Provisional ID → Consent → Upgrade
npm test src/integration/dynamic-content-updates.test.ts   # Organizer toggles wayfinding
```

### CEP-23 Manual Testing Checklist:
- [ ] Pre-Selection UI allows tribe selection while in queue
- [ ] Digital Tasting Ticket QR code generates successfully
- [ ] TQ Safety Gate shows GREEN for age 19+ with FPIC consent
- [ ] Operator Dashboard displays pending pours in real-time
- [ ] **QR validation completes in < 3 seconds** (CEP-23 spec)
- [ ] Tribe Reward notification triggers when 99 Bottles challenge completed
- [ ] Tribal Heatmap Layer 7 shows tribe clustering with correct colors
- [ ] Organizer can toggle AR Wayfinding via Dynamic Content JSON
- [ ] AR Infinite Shelf displays Vertical Flight (related vintages)
- [ ] Digital Salon creates provisional UUID without signup
- [ ] Throughput metrics show **+25% increase** with Pre-Selection UI enabled
- [ ] DTC conversion tracking works for AR Infinite Shelf purchases

---

## Success Metrics (Updated with CEP-23 Targets)

### Booth Operator (Winery) Success:
- ✅ Throughput: **+25% pours/hour** (via Pre-Selection UI)
- ✅ DTC orders: **+12%** (via AR Infinite Shelf)
- ✅ Lead capture: **100% verified segmentation** by tribe

### Festival Organizer Success:
- ✅ Queue variance: **-30%** (via AR Wayfinding + Tribal Heatmap)
- ✅ Digital RPM: **+$4K** (via Sponsored Sky/Canvas)
- ✅ Real-time crowd control: **5+ successful wayfinding adjustments per day**

### Digital Tribes (User Engagement):
- ✅ Dwell time: **+8 min** (via Tribal Leaderboards)
- ✅ Pre-selection adoption: **70%+ users select tribe while in queue**
- ✅ Digital Tasting Ticket usage: **80%+ QR scans successful in < 3 seconds**

### Digital Salon Model Success:
- ✅ **90%+ provisional identities created without signup friction**
- ✅ **60%+ consent opt-in rate** (FPIC + Story Gem)
- ✅ **Zero heavy IAM dependencies** (fully dialogue-first)

---

## Related Tickets

- **CEP-21** - Submission Package Assembly (VineSight) - parent ticket
- **MDP-75** - Design TEK Viticulture Narrative Mode (Discovery)
- **CEAZ-193** - VanWineFest Anchor Pilot Surface (In Progress)
- **CEAZ-203** - Viticulture Lighthouse Launch @ spatial (In Progress)
- **CEAZ-219** - Digital Salon Concept Library - Confluence (Launched)

---

## Critical Files Added/Updated

### Must Create (Priority Order):
1. ✅ **`src/types/vintage-voice.ts`** - CEP-23 type system
2. ✅ **`src/services/operator-dashboard.service.ts`** - Operator Hook
3. ✅ **`src/services/digital-salon.service.ts`** - Provisional identity
4. ✅ **`components/vintage-voice/PreSelectionUI.tsx`** - Throughput driver (+25%)
5. ✅ **`components/vintage-voice/OperatorDashboard.tsx`** - Staff interface
6. ✅ **`components/felt-integration/FeltWineMap.tsx`** - Layer 7 (Tribal Heatmap)

### Reference Material (CEP-23):
- Proof mechanic video: https://youtu.be/WddN-6GXRy0
- Adaptation script: See CEP-23 comment #ProofStoryline (2026-02-05)
- Value-driver narrative: See CEP-23 comments by Ernest (2026-02-04 23:29)
- Technical hooks: Operator Dashboard, Dynamic Content Hook, Tribe API (OPS specs)

---

## Next Steps

1. **For Ernest (CEP-23 owner):**
   - Use this document to understand what technical components exist
   - Screenshot gallery #1-8 can reference these components
   - Video voice-over script aligns with Proof Storyline table above

2. **For Implementation Team:**
   - Prioritize Phase 1.5 files (Vintage & Voice Technical Hooks)
   - Target screenshot-ready builds by Feb 9 (Ernest's deadline)
   - Ensure QR validation < 3 seconds (critical CEP-23 spec)

3. **For VanWineFest Organizers:**
   - Review Tribal Heatmap Layer 7 for crowd control features
   - Test Dynamic Content Hook for AR Wayfinding toggling
   - Validate Sponsored Sky/Canvas revenue model (+$4K RPM)

4. **For Bard on the Beach:**
   - Review Digital Salon model (provisional identity, no heavy IAM)
   - Confirm FPIC consent integration (TQ Safety Gate)
   - Validate Prospero/Chorus/Touchstone framing in one-pager

---

## Document History

- **Feb 11, 2026** - Initial integration summary created
- **Updated:** Implementation plan at `/root/.claude/plans/polished-dazzling-rocket.md`
- **Status:** Ready for CEP-23 screenshot capture + video production

---

**Key Takeaway:** This implementation plan now delivers **all 9 technical hooks** required by CEP-23, enabling the Vintage & Voice submission package to show both the proof narrative (video) and the working infrastructure (screenshots) for VanWineFest & Bard stakeholders.
