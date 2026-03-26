/**
 * Producer Seeding Portal API — POST /api/seed
 *
 * Accepts a producer profile submission from the public-facing form and
 * writes it to Sanity as a 'producerProfile' document with status 'submitted'.
 *
 * Form → Server → Sanity write mutation
 *
 * This is the forms layer for the Phase 0 async seeding layer.
 * It deliberately accepts public (unauthenticated) submissions and
 * marks them submitted — human review happens in Sanity Studio.
 *
 * CARE principle: all submissions are logged with explicit consent scope.
 * Nothing is published without the translation workflow advancing to 'published'.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// ── Sanity write client ───────────────────────────────────────────────────────
function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !token) {
    return null
  }

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  })
}

// ── Request body type ─────────────────────────────────────────────────────────
interface SeedSubmission {
  // Identity
  name: string
  producerType: string
  nodeSlug: string          // corridor node slug — resolved to _ref server-side

  // DACUM profile
  primarySkill: string
  yearsOfPractice: number
  localIngredientSignature: string
  sourceLanguage: string
  gestureDescription: string

  // Consent
  consentedAt: string       // ISO datetime
  consentScope: string[]    // ['collective_page', 'martha_session', ...]
  knowledgeProtections?: string
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(body: unknown): body is SeedSubmission {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === 'string' && b.name.length > 0 &&
    typeof b.producerType === 'string' &&
    typeof b.nodeSlug === 'string' &&
    typeof b.primarySkill === 'string' &&
    typeof b.sourceLanguage === 'string' &&
    typeof b.gestureDescription === 'string' &&
    typeof b.consentedAt === 'string' &&
    Array.isArray(b.consentScope) && b.consentScope.length > 0
  )
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: 'Missing required fields: name, producerType, nodeSlug, primarySkill, sourceLanguage, gestureDescription, consentedAt, consentScope' },
      { status: 422 }
    )
  }

  const client = getSanityWriteClient()
  if (!client) {
    // In development without credentials, echo back a mock response
    return NextResponse.json({
      ok: true,
      mode: 'dry-run',
      message: 'Sanity not configured — submission received but not persisted. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN to enable persistence.',
      received: body,
    })
  }

  // Resolve node reference by slug
  const nodeDoc = await client.fetch<{ _id: string } | null>(
    `*[_type == "corridorNode" && slug.current == $slug][0]{ _id }`,
    { slug: body.nodeSlug }
  )

  if (!nodeDoc) {
    return NextResponse.json(
      { error: `No corridorNode found with slug: ${body.nodeSlug}` },
      { status: 422 }
    )
  }

  const uniqueSuffix = Date.now().toString(36)
  const slug = `${slugify(body.name)}-${uniqueSuffix}`

  const doc = {
    _type: 'producerProfile',
    name: body.name,
    slug: { _type: 'slug', current: slug },
    producerType: body.producerType,
    node: { _type: 'reference', _ref: nodeDoc._id },
    dacumProfile: {
      primarySkill:              body.primarySkill,
      yearsOfPractice:           Number(body.yearsOfPractice) || 0,
      localIngredientSignature:  body.localIngredientSignature,
      sourceLanguage:            body.sourceLanguage,
      gestureDescription:        body.gestureDescription,
    },
    translationStatus: 'submitted',
    consentRecord: {
      consentedAt:         body.consentedAt,
      consentScope:        body.consentScope,
      knowledgeProtections: body.knowledgeProtections ?? '',
    },
  }

  try {
    const created = await client.create(doc)
    return NextResponse.json({
      ok: true,
      _id: created._id,
      slug,
      status: 'submitted',
      message: 'Submission received. Your profile will be reviewed and translated before appearing on the corridor page.',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[seed API] Sanity write failed:', msg)
    return NextResponse.json({ error: 'Submission failed', detail: msg }, { status: 500 })
  }
}

// Only POST is supported — explicit 405 for other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
