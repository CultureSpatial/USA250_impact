import { NextRequest, NextResponse } from 'next/server'

// Phase 0: redirect to Resy booking page.
// Phase 1 (ENG-31): fetch PlacePacket via /api/place-packets/[slug],
//   create/find PlayFab lobby, redirect to Discord join link.
const RESY_FALLBACK = 'https://resy.com/cities/seattle'

export async function GET(
  _request: NextRequest,
  { params }: { params: { placePacketSlug: string } }
) {
  // placePacketSlug available for Phase 1 lobby routing — used in Phase 1
  void params.placePacketSlug
  return NextResponse.redirect(RESY_FALLBACK)
}
