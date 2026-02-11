# Phase 1 Implementation Guide

## Completed ✅

### 1. Sanity Schemas
All core content types have been created with full validation:
- ✅ `placePacket.ts` - Main route container with versioning
- ✅ `stop.ts` - Location stops with accessibility support
- ✅ `narrativeLayer.ts` - Content layers (TEK, historical, etc.)
- ✅ `magnetTemplate.ts` - Shareable artifact templates
- ✅ `cipOverlay.ts` - Governance overlay system

### 2. GROQ Query Library
Comprehensive queries created in `lib/sanity.placePacket.queries.ts`:
- Get fully expanded Place Packet (runner contract)
- List all Place Packets
- Stop details with content
- Magnet template retrieval
- CIP overlay management
- Search and validation queries

### 3. Schema Relationships
All document references properly configured:
- Place Packet → Stops (via routeGraph)
- Place Packet → Magnet Templates
- Place Packet → CIP Overlays
- Stops → Content (posts/products/media)

---

## Next Steps (Week 1-2)

### Day 1-2: Studio Configuration
```bash
cd studio-project-bottleneck
npm install
npm run dev
```

**Tasks:**
1. Test all schemas in Sanity Studio
2. Configure desk structure for optimal UX
3. Add custom input components if needed
4. Test document creation/editing flow

### Day 3-4: Sample Data Creation
Create 1 complete Place Packet with:
- **Name:** "Downtown Heritage Walk"
- **Version:** "1.0.0"
- **3 Stops:**
  - Historical landmark
  - Cultural center
  - Natural feature
- **2 Narrative Layers:**
  - Historical context
  - Contemporary perspective
- **1 Magnet Template:**
  - Postcard style
  - Share-friendly layout
- **Basic Policies:**
  - Consent: capture
  - NTAI: [photography-allowed]

### Day 5-6: Integration Testing
1. Fetch Place Packet using GROQ queries
2. Verify all references resolve correctly
3. Test accessibility variants
4. Validate evidence policy structure

### Day 7: Documentation
1. Create schema diagram (Mermaid)
2. Document content authoring workflow
3. Write contributor guide
4. Add troubleshooting section

---

## Testing Checklist

### Schema Validation
- [ ] All required fields enforce validation
- [ ] Version numbers follow semver pattern
- [ ] References resolve without errors
- [ ] Array limits are reasonable

### Content Creation
- [ ] Can create placePacket from scratch
- [ ] Can add/remove stops from route
- [ ] Can attach narrative layers
- [ ] Can configure CIP overlay
- [ ] Changelog updates automatically

### Query Performance
- [ ] PLACE_PACKET_EXPANDED returns in < 500ms
- [ ] Nested references load correctly
- [ ] Image URLs resolve properly
- [ ] Search queries respond quickly

### Studio UX
- [ ] Preview pane shows useful info
- [ ] Validation errors are clear
- [ ] Document structure is intuitive
- [ ] Navigation is efficient

---

## Common Issues & Solutions

### Issue: References not resolving
**Solution:** Ensure referenced documents exist before creating relationships. Use reference filters in schema.

### Issue: Version validation failing
**Solution:** Use format "X.Y.Z" (e.g., "1.0.0"). No prefixes or suffixes.

### Issue: Large arrays causing slowdown
**Solution:** Limit arrays to ~20 items. Use pagination for larger datasets.

### Issue: Missing assets
**Solution:** Upload files before referencing. Check asset permissions in Sanity.

---

## Sample GROQ Query Usage

```typescript
// In Next.js app
import { fetchSanityData } from '@/lib/sanity.client'
import { PLACE_PACKET_EXPANDED } from '@/lib/sanity.placePacket.queries'

async function getPlacePacket(id: string) {
  const packet = await fetchSanityData(
    PLACE_PACKET_EXPANDED,
    { id }
  )
  return packet
}
```

---

## Success Metrics for Phase 1

- ✅ All 5 schemas created and validated
- ✅ GROQ query library functional
- ⏳ 1 complete Place Packet created (TODO)
- ⏳ Studio tested and documented (TODO)
- ⏳ Integration with Next.js verified (TODO)

---

## Ready for Phase 2 When:

1. Sample Place Packet loads in Next.js app
2. All queries return expected data structures
3. Content creators can author packets without dev help
4. Documentation is complete and accurate
5. No critical bugs in schema validation

---

## Contact & Resources

- Schema Files: `/studio-project-bottleneck/schemas/`
- Queries: `/lib/sanity.placePacket.queries.ts`
- Analysis: `/SANITY_MODEL_ANALYSIS.md`
- Sanity Docs: https://www.sanity.io/docs
