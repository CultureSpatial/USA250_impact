# Sanity Content Model v0.1 - Analysis & Roadmap

## Executive Summary

The proposed Sanity content model for Place Packet + Magnet + CIP Overlay demonstrates a sophisticated architecture for managing location-based narrative experiences with strong governance and consent frameworks. The model is well-structured but requires clarification in several areas before full implementation.

---

## Strengths

### 1. Strong Separation of Concerns
- Clear distinction between content (placePacket), presentation (magnetTemplate), and governance (cipOverlay)
- Modular design allows independent evolution of each component
- References over embedding promotes reusability

### 2. Robust Policy Framework
- Comprehensive consent/refusal/NTAI policy fields
- Evidence tracking built into the core model
- ECP-expressible policies enable flexible governance

### 3. Versioning & Accountability
- Mandatory versioning on placePackets
- Changelog requirements enforce documentation
- Admin visibility ensures transparency

### 4. Accessibility First
- `accessibilityVariants[]` on stops shows inclusive design thinking
- `locationHint` over GPS coordinates respects privacy and accessibility needs

### 5. Event-Driven Architecture
- Clear minimum event set for tracking user interactions
- CIP-specific events enable governance workflows
- Supports analytics and compliance requirements

---

## Areas for Improvement

### 1. Schema Ambiguity

**Issue:** Several fields lack type definitions and constraints.

**Specific Problems:**
- `routeGraph` described as "array of stop refs + sequencing" but sequencing mechanism unclear
- `layers[]` array type not specified (narrativeLayer objects?)
- `contentRefs[]` on stops - what content types are valid?
- `assets` in narrativeLayer - format/storage strategy undefined

**Recommendation:**
```typescript
// Define explicit types
routeGraph: {
  stops: reference[], // to 'stop' documents
  sequence: number[], // parallel array or embedded in refs?
  branching?: conditionalLogic // if non-linear
}

layers: narrativeLayer[] // explicit type

contentRefs: reference[] // constrain to: audio | video | image | text
```

### 2. Missing Relationships

**Issue:** Document relationships not fully specified.

**Gaps:**
- How do magnetTemplates relate to specific stops or layers?
- Can multiple cipOverlays be active simultaneously?
- What happens when placePacket references a deleted stop?

**Recommendation:**
- Define referential integrity rules
- Specify cascade delete behavior
- Add relationship cardinality (1:1, 1:many, many:many)

### 3. Incomplete Data Validation

**Issue:** No validation rules for critical fields.

**Missing:**
- `version` format (semver? timestamp?)
- `consentPolicy` enum values
- `ntaiClass` flag definitions
- `proofMode` validation options

**Recommendation:**
```typescript
version: string // MUST match semver pattern
consentPolicy: 'capture' | 'remix' | 'export' | 'none'
ntaiClass: string[] // predefined flags list in docs
```

### 4. Event Schema Undefined

**Issue:** Event payloads not specified.

**Problems:**
- What data accompanies each event?
- Where are events stored (Sanity, external DB)?
- How do events link back to documents?

**Recommendation:**
Create separate `event` document type or define external event schema with clear reference back to content.

### 5. Scalability Concerns

**Issue:** Array fields may not scale well.

**Potential Problems:**
- `layers[]` could grow large with many narrative variants
- `overlays[]` array might cause performance issues
- `contentRefs[]` unlimited growth

**Recommendation:**
- Set reasonable array limits or use pagination
- Consider separate collection for large arrays with back-references
- Implement lazy loading for content-heavy arrays

### 6. Missing Query Examples

**Issue:** No example GROQ queries provided.

**Impact:**
- Developers unsure how to fetch expanded placePackets
- "Fully expanded config" requirement ambiguous
- Relationship traversal patterns unclear

**Recommendation:**
Include reference GROQ queries in documentation.

---

## Critical Corrections Required

### 1. Define `routeGraph` Structure
```typescript
routeGraph: {
  type: 'linear' | 'branching' | 'freeform',
  nodes: [{
    stopRef: reference, // to 'stop'
    sequence: number,
    required: boolean,
    conditions?: object // for branching
  }]
}
```

### 2. Clarify Policy Field Syntax
Create separate `policy.schema.ts` defining all policy field types, enums, and validation rules.

### 3. Add Authentication/Authorization Fields
```typescript
// On sensitive documents
accessControl: {
  visibility: 'public' | 'authenticated' | 'steward',
  roles: string[],
  embargo?: datetime
}
```

### 4. Specify Overlay Attachment Logic
```typescript
cipOverlay.attachmentPoints: [{
  phase: 'pre-flight' | 'mid-journey' | 'post',
  triggerCondition: string, // event or state
  priority: number,
  required: boolean
}]
```

### 5. Define Evidence Requirements
```typescript
evidencePolicy: {
  requiredEvents: string[], // event IDs
  artifacts: [{
    type: 'photo' | 'audio' | 'note',
    required: boolean,
    validation?: object
  }],
  retention: '30d' | '1y' | 'indefinite'
}
```

---

## Phased Implementation Roadmap

### Phase 1: Foundation (Week 1-2) ✅ IMMEDIATE

**Goal:** Establish working Sanity schema with core types

**Tasks:**
1. ✅ Create base schemas: `placePacket`, `stop`, `magnetTemplate`
2. ✅ Implement basic policy fields with validation
3. ✅ Set up Sanity Studio with dev environment
4. ✅ Write sample GROQ queries for common use cases
5. ✅ Document schema relationships in Mermaid diagrams

**Deliverables:**
- Working Sanity Studio
- 3 core document types
- Basic GROQ query library
- Schema documentation

### Phase 2: Narrative System (Week 3-4)

**Goal:** Build narrative layer infrastructure

**Tasks:**
1. Implement `narrativeLayer` with all TEK/historical/contemporary types
2. Create media asset management workflow
3. Add contributor attribution system
4. Build visibility policy logic
5. Test with sample narrative content

**Deliverables:**
- Complete narrative layer schema
- Asset upload/management UI
- Attribution tracking
- 5 sample narrative layers

### Phase 3: Magnet System (Week 5-6)

**Goal:** Enable content artifact creation

**Tasks:**
1. Build magnetTemplate variants (postcard, field_note, etc.)
2. Implement layout system
3. Create proof/verification modes
4. Add share policy enforcement
5. Test magnet generation pipeline

**Deliverables:**
- 4 magnet templates
- Generation preview UI
- Share flow validation
- Testing suite

### Phase 4: CIP Integration (Week 7-9)

**Goal:** Layer governance framework

**Tasks:**
1. Implement cipOverlay schema
2. Build attachment point logic
3. Create 12-direction toggle system
4. Develop restorative huddle scripts
5. Add governance hooks
6. Integrate evidence tracking

**Deliverables:**
- Complete CIP overlay system
- Toggle configuration UI
- Governance workflow
- Evidence collection module

### Phase 5: Event Tracking (Week 10-11)

**Goal:** Comprehensive analytics

**Tasks:**
1. Define event schema (internal or external)
2. Implement minimum event set
3. Add CIP-specific events
4. Build event dashboard
5. Create analytics queries

**Deliverables:**
- Event tracking system
- Analytics dashboard
- Compliance reports
- Event query library

### Phase 6: Production Hardening (Week 12-14)

**Goal:** Production readiness

**Tasks:**
1. Add comprehensive validation rules
2. Implement access control
3. Set up backup/restore procedures
4. Performance optimization
5. Security audit
6. Documentation completion

**Deliverables:**
- Production-ready schemas
- Security documentation
- Backup strategy
- Complete API documentation

---

## Immediate Action Items (Next 72 Hours)

### Priority 1: Schema Foundation
```bash
cd studio-project-bottleneck

# Create these files:
schemas/placePacket.ts
schemas/stop.ts
schemas/narrativeLayer.ts
schemas/magnetTemplate.ts
schemas/cipOverlay.ts
schemas/policy.ts
```

### Priority 2: Type Definitions
Create TypeScript interfaces matching Sanity schemas for type safety in Next.js app.

### Priority 3: GROQ Query Library
```typescript
// lib/sanity.queries.ts
export const PLACE_PACKET_EXPANDED = `
  *[_type == "placePacket" && _id == $id][0] {
    ...,
    "stops": routeGraph.stops[]->{ ... },
    "overlays": overlays[]->{ ... },
    "magnet": outputs.magnet->{ ... }
  }
`
```

### Priority 4: Sample Data
Create 1 complete placePacket with:
- 3 stops
- 2 narrative layers
- 1 magnet template
- Basic consent policy

### Priority 5: Studio UI Customization
Configure Sanity Studio for optimal content authoring experience.

---

## Long-Term Strategic Recommendations

### 1. Consider GraphQL Layer
For complex queries and relationship traversal, consider adding GraphQL on top of Sanity's GROQ.

### 2. Implement Content Workflows
Add draft/review/publish workflows for placePackets with multi-stakeholder approval.

### 3. Build Testing Framework
Create automated tests for schema validation, GROQ queries, and policy enforcement.

### 4. Add Localization Support
Prepare for multi-language content with i18n fields on narrative layers.

### 5. Plan Migration Strategy
Document how to migrate content when schema evolves (v0.1 → v0.2).

### 6. Create Developer Sandbox
Provide isolated environment for testing cipOverlay scenarios without affecting production.

---

## Risk Assessment

### High Risk
- **Schema Changes Post-Launch:** Versioning strategy must be robust
- **Performance at Scale:** Array fields may cause issues with 100+ stops
- **Policy Enforcement:** Need clear documentation on who enforces policies (client vs server)

### Medium Risk
- **CIP Complexity:** 12-direction toggles require careful UX design
- **Evidence Collection:** Privacy implications need legal review
- **Attribution Tracking:** Contributor consent and credit requirements

### Low Risk
- **Basic Content Management:** Standard Sanity patterns apply
- **Media Asset Handling:** Well-documented Sanity features

---

## Success Metrics

### Technical
- Schema validation passes 100% of test cases
- GROQ queries return in < 200ms for expanded placePackets
- Zero data loss during version migrations
- 99.9% uptime for Sanity Studio

### Business
- Content authors can create placePacket in < 30 minutes
- 90% of narrative layers pass accessibility review
- Evidence collection compliance rate > 95%
- Zero policy violations in production

---

## Conclusion

The Sanity Content Model v0.1 provides a solid foundation for a sophisticated location-based narrative system. With clarifications to schema definitions, explicit relationship documentation, and a phased implementation approach, this model can scale to support complex governance requirements while maintaining content authorship flexibility.

**Recommended Next Step:** Begin Phase 1 implementation immediately, focusing on the 5 priority action items listed above. Schedule a review after Week 2 to assess progress and adjust subsequent phases based on learnings.
