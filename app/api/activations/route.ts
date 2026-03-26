/**
 * Corridor Activations API — POST /api/activations
 *
 * Accepts an activation proposal from the Temporal Co-Design Forum
 * and writes it to Sanity as a 'corridorActivation' document with status 'draft'.
 *
 * This forms the second keystroke of Phase 0 async seeding: producers
 * propose activations with dates, nodes, and formats. Other nodes
 * can sync with these proposals asynchronously, creating multi-node
 * temporal coherence without real-time coordination.
 *
 * Form → Server → Sanity write mutation
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

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

interface ActivationProposal {
  title: string
  proposingNodeSlug: string
  proposingProducerSlug: string
  proposedDate: string             // ISO datetime
  activationFormat: string
  localIngredientFocus: string
  ancestralStitchSlug?: string     // Optional reference
  spatialContext: string
  seasonalLogic: string
  audienceSize: number
  requiresMarthaSession: boolean
  consentedAt: string
}

function validate(body: unknown): body is ActivationProposal {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.title === 'string' && b.title.length > 0 &&
    typeof b.proposingNodeSlug === 'string' &&
    typeof b.proposingProducerSlug === 'string' &&
    typeof b.proposedDate === 'string' &&
    typeof b.activationFormat === 'string' &&
    typeof b.spatialContext === 'string' &&
    typeof b.seasonalLogic === 'string' &&
    typeof b.audienceSize === 'number' &&
    typeof b.requiresMarthaSession === 'boolean' &&
    typeof b.consentedAt === 'string'
  )
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 422 }
    )
  }

  const client = getSanityWriteClient()
  if (!client) {
    return NextResponse.json({
      ok: true,
      mode: 'dry-run',
      message: 'Sanity not configured',
      received: body,
    })
  }

  // Resolve references
  const nodeDoc = await client.fetch<{ _id: string } | null>(
    `*[_type == "corridorNode" && slug.current == $slug][0]{ _id }`,
    { slug: body.proposingNodeSlug }
  )
  const producerDoc = await client.fetch<{ _id: string } | null>(
    `*[_type == "producerProfile" && slug.current == $slug][0]{ _id }`,
    { slug: body.proposingProducerSlug }
  )

  if (!nodeDoc || !producerDoc) {
    return NextResponse.json(
      { error: 'Node or producer not found' },
      { status: 422 }
    )
  }

  const uniqueSuffix = Date.now().toString(36)
  const slug = `${slugify(body.title)}-${uniqueSuffix}`

  const doc = {
    _type: 'corridorActivation',
    title: body.title,
    slug: { _type: 'slug', current: slug },
    proposedBy: { _type: 'reference', _ref: producerDoc._id },
    proposingNode: { _type: 'reference', _ref: nodeDoc._id },
    proposedDate: body.proposedDate,
    activationFormat: body.activationFormat,
    nodeSpecificContext: {
      localIngredientFocus: body.localIngredientFocus,
      ...(body.ancestralStitchSlug && {
        ancestralStitchReference: await client.fetch<{ _id: string } | null>(
          `*[_type == "ancestralStitch" && slug.current == $slug][0]{ _id }`,
          { slug: body.ancestralStitchSlug }
        ).then(doc => doc ? { _type: 'reference', _ref: doc._id } : undefined)
      }),
      spatialContext: body.spatialContext,
      seasonalLogic: body.seasonalLogic,
      audienceSize: body.audienceSize,
      requiresMarthaSession: body.requiresMarthaSession,
    },
    proposalStatus: 'draft',
  }

  try {
    const created = await client.create(doc)
    return NextResponse.json({
      ok: true,
      _id: created._id,
      slug,
      status: 'draft',
      message: 'Activation proposal created. Other corridor nodes can sync with it from the Temporal Co-Design Forum.',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[activations API] Sanity write failed:', msg)
    return NextResponse.json({ error: 'Submission failed', detail: msg }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
