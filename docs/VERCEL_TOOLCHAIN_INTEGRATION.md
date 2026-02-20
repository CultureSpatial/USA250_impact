# Vercel-Native Toolchain Integration
## Cultural Current Mesh — Approved Stack Configuration

**Version:** 1.0
**Decision Date:** February 2026
**Status:** Approved — replaces Convex consideration

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL EDGE                       │
│  Next.js 15 (App Router)                            │
│  Deployment: Vercel Platform                        │
└───────────────┬─────────────────────────────────────┘
                │
    ┌───────────┼────────────────────────┐
    │           │                        │
    ▼           ▼                        ▼
┌────────┐ ┌────────────┐        ┌──────────────┐
│Sanity  │ │  Inngest   │        │   Descope    │
│Content │ │  Workflows │        │    Auth      │
│  CMS   │ │(Vercel MP) │        │(Vercel MP)   │
└───┬────┘ └─────┬──────┘        └──────┬───────┘
    │            │                       │
    │     ┌──────┴────────┐              │
    │     ▼               ▼              │
    │  ┌──────────┐ ┌──────────┐        │
    │  │ Supabase │ │ Felt.com │        │
    │  │(PostGIS) │ │  Maps    │        │
    └──►  + pgvec │ └──────────┘        │
         └──────────┘                   │
              ▲                         │
              └─────────────────────────┘
                    (user sessions)
```

---

## 2. Inngest — Event-Driven Workflow Orchestration

**Replaces:** Convex real-time reactivity (Convex evaluated and rejected)
**Role:** Tend & Transmit dual-loop engine

### Installation
```bash
npm install inngest
```

### Narrative Lifecycle Workflow

```typescript
// inngest/narrativeWorkflow.ts
import { inngest } from "./client"
import { createClient } from "@supabase/supabase-js"

export const narrativeLifecycle = inngest.createFunction(
  { id: "narrative-lifecycle", retries: 3 },
  { event: "narrative/created" },
  async ({ event, step }) => {
    // Step 1: Calculate CFI (Cultural Fidelity Index)
    const cfi = await step.run("calculate-cfi", async () => {
      const { data } = await supabase
        .from("narratives")
        .select("cfi_score")
        .eq("id", event.data.narrativeId)
        .single()
      return data?.cfi_score ?? 0
    })

    // IGNIS-ADAPT Tier 1: CFI < 0.50 = veto
    if (cfi < 0.50) {
      await step.run("trigger-tier1-veto", async () => {
        await supabase
          .from("governance_events")
          .insert({
            narrative_id: event.data.narrativeId,
            event_type: "tier1_veto",
            cfi_score: cfi,
            triggered_at: new Date().toISOString(),
          })
      })
      return { vetoed: true, cfi }
    }

    // Step 2: Store geospatial narrative
    const stored = await step.run("store-geospatial", async () => {
      const { data } = await supabase
        .from("narratives")
        .update({ status: "active" })
        .eq("id", event.data.narrativeId)
        .select()
        .single()
      return data
    })

    // Step 3: Update Felt map layer
    await step.run("update-felt-map", async () => {
      // Felt webhook to add/update site pin
      await fetch(process.env.FELT_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "feature_upsert",
          siteId: stored.site_id,
          coordinates: stored.coordinates,
          properties: { status: "active", cfi },
        }),
      })
    })

    return { activated: true, cfi, siteId: stored.site_id }
  }
)
```

### Tend & Transmit Loop

```typescript
// inngest/tendTransmit.ts
// TEND: steward contribution workflow
export const tendWorkflow = inngest.createFunction(
  { id: "tend-contribution", retries: 2 },
  { event: "trail/tend-submitted" },
  async ({ event, step }) => {
    // Queue for steward review (async, not real-time)
    await step.run("queue-for-review", async () => {
      await supabase.from("contribution_queue").insert({
        site_id: event.data.siteId,
        steward_id: event.data.stewardId,
        contribution_type: event.data.contributionType,
        payload_url: event.data.payload,
        cfi_estimate: event.data.cfiEstimate,
        status: "pending_review",
      })
    })
  }
)

// TRANSMIT: viral share workflow
export const transmitWorkflow = inngest.createFunction(
  { id: "transmit-share", retries: 1 },
  { event: "trail/transmit-triggered" },
  async ({ event, step }) => {
    await step.run("generate-share-link", async () => {
      // Generate signed short link with site attribution
      const shareUrl = `${process.env.BASE_URL}/trail/${event.data.siteId}?ref=share`
      await supabase.from("share_events").insert({
        site_id: event.data.siteId,
        channel: event.data.shareChannel,
        share_url: shareUrl,
        created_at: new Date().toISOString(),
      })
      return { shareUrl }
    })
  }
)
```

---

## 3. Sanity.io — Content Operating System

**Role:** Narrative CMS, editorial workflow, palimpsest versioning
**Pattern:** Sanity = source of truth for content; Supabase = source of truth for geospatial + governance

### Schema: Prohibition Narrative Document

```typescript
// sanity/schemas/prohibitionNarrative.ts
export const prohibitionNarrative = {
  name: "prohibitionNarrative",
  title: "Prohibition Narrative",
  type: "document",
  fields: [
    { name: "siteId", type: "string", title: "Site ID" },
    { name: "siteName", type: "string", title: "Site Name" },
    {
      name: "layers",
      type: "object",
      fields: [
        {
          name: "historical",
          type: "object",
          fields: [
            { name: "script", type: "text", title: "Narration Script" },
            { name: "audioUrl", type: "url", title: "Audio File URL (Supabase Storage)" },
            { name: "cfiScore", type: "number", title: "Cultural Fidelity Index (0-1)" },
            { name: "stewardApproved", type: "boolean" },
          ]
        },
        {
          name: "communityMemory",
          type: "object",
          fields: [
            { name: "script", type: "text" },
            { name: "audioUrl", type: "url" },
            { name: "contributorCredit", type: "string" },
            { name: "stewardApproved", type: "boolean" },
          ]
        },
        {
          name: "sensoryAtmosphere",
          type: "object",
          fields: [
            { name: "humePrompt", type: "text", title: "Hume.ai System Prompt" },
            { name: "fallbackAudioUrl", type: "url" },
            { name: "era", type: "string", title: "Historical Era (e.g. 1929)" },
          ]
        }
      ]
    },
    {
      name: "version",
      type: "number",
      title: "Palimpsest Version",
      description: "Increment when steward updates a layer",
    }
  ]
}
```

---

## 4. Descope — Passwordless Authentication

**Role:** Auth layer for steward roles, sovereignty level assignment
**Pattern:** Passkeys + magic links (no passwords, no OAuth friction)

### Role Configuration

```typescript
// lib/auth/descope.ts
import Descope from "@descope/nextjs-sdk"

export const STEWARD_ROLES = {
  CULTURAL_CUSTODIAN: "cultural-custodian",      // CFI/SSI assessment
  BOUNDARY_ACCESS: "boundary-access-steward",    // Sacred content gate
  NARRATIVE_EDITOR: "narrative-editor",          // Sanity editorial
  TRAIL_GUIDE: "trail-guide",                    // Pop-Up facilitation
  OBSERVER: "observer",                          // Read-only sovereignty 0
} as const

// Sovereignty level → role mapping
export const SOVEREIGNTY_ROLES: Record<number, string[]> = {
  0: [STEWARD_ROLES.OBSERVER],
  1: [STEWARD_ROLES.OBSERVER, STEWARD_ROLES.NARRATIVE_EDITOR],
  2: [STEWARD_ROLES.OBSERVER, STEWARD_ROLES.NARRATIVE_EDITOR, STEWARD_ROLES.CULTURAL_CUSTODIAN],
  3: [STEWARD_ROLES.OBSERVER, STEWARD_ROLES.NARRATIVE_EDITOR, STEWARD_ROLES.CULTURAL_CUSTODIAN, STEWARD_ROLES.BOUNDARY_ACCESS],
}
```

### SSI Threshold Enforcement

```typescript
// middleware.ts (Next.js)
import { withAuth } from "@descope/nextjs-sdk/server"

export default withAuth(async (req) => {
  const { session } = req
  const sovereigntyLevel = session?.customClaims?.sovereigntyLevel ?? 0

  // IGNIS-ADAPT: SSI < 0.50 blocks Tier 2+ routes
  if (req.nextUrl.pathname.startsWith("/govern") && sovereigntyLevel < 2) {
    return NextResponse.redirect(new URL("/access-denied", req.url))
  }
})
```

---

## 5. Felt.com — Collaborative Mapping

**Role:** Real-time multiplayer map layer for trail visualization
**Pattern:** Embed Felt map in PlacePacketShell; webhook-driven site pin updates

### Integration Points

```typescript
// src/examples/FeltIntegration.tsx (existing file — reference for ProhibitionTrailPacket)
// Felt embed: read-only for Conference slice, editable for Pop-Up/Commercial

const FELT_MAP_CONFIG = {
  prohibitionTrail: {
    mapId: process.env.NEXT_PUBLIC_FELT_MAP_ID,
    embedUrl: `https://felt.com/map/${process.env.NEXT_PUBLIC_FELT_MAP_ID}?lat=41.8827&lon=-87.6233&zoom=14`,
    layers: {
      sites: "prohibition-sites-layer",
      routes: "trail-route-layer",
      stewardZones: "steward-zone-layer",
    }
  }
}
```

---

## 6. Data Flow Summary

```
User enters Zone 2 (< 100m from site)
  → ProhibitionTrailPacket detects proximity
  → Fetch narrative from Sanity (by siteId + layer)
  → Play audio from Supabase Storage URL
  → Fire Inngest event: "trail/zone-entry"

User selects "Community Memory" layer
  → Descope check: sovereigntyLevel >= 1?
  → If yes: fetch Layer 2 from Sanity
  → Fire Inngest event: "trail/layer-selected"

User taps "Tend" (contribute)
  → Descope: require narrative-editor role
  → Submit form → Inngest: "trail/tend-submitted"
  → Queue in Supabase contribution_queue
  → Sanity: steward notified via webhook

Site activated by steward (SSI threshold met)
  → Inngest: "narrative/created" workflow
  → CFI check → if ≥ 0.50: activate
  → Felt webhook: update site pin to "active"
```

---

## 7. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Descope
NEXT_PUBLIC_DESCOPE_PROJECT_ID=
DESCOPE_MANAGEMENT_KEY=

# Felt
NEXT_PUBLIC_FELT_MAP_ID=
FELT_WEBHOOK_URL=
FELT_API_TOKEN=

# Hume.ai (Pop-Up slice only)
HUME_API_KEY=
HUME_SECRET_KEY=

# GrowthBook
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=
GROWTHBOOK_SECRET_KEY=
```
