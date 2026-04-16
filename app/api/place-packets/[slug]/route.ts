import { NextRequest, NextResponse } from 'next/server'
import { fetchSanityDataWithParams } from '@/lib/sanity.client'
import { PLACE_PACKET_LOBBY_SAFE } from '@/lib/sanity.martha.queries'
import type { LobbyPlacePacket } from '@/lib/sanity.martha.queries'

// Canonical distribution interface for all consumer endpoints.
// Returns only the sovereignty-cleared subset: no restrictions, sovereigntyFlags,
// gestureDescriptions, or knowledgeProtections.
// Consumers: swirly.quest induction, PlayFab lobby, trade proof surfaces, academic archive.
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400 })
  }

  const packet = await fetchSanityDataWithParams<LobbyPlacePacket>(
    PLACE_PACKET_LOBBY_SAFE,
    { slug }
  )

  if (!packet) {
    return NextResponse.json({ error: 'place packet not found' }, { status: 404 })
  }

  return NextResponse.json(packet, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
