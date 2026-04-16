import { fetchSanityDataWithParams } from '@/lib/sanity.client'
import { MARTHA_PLACE_PACKET } from '@/lib/sanity.martha.queries'
import type { MarthaPlacePacket } from '@/lib/sanity.martha.queries'
import { PrintButton } from './PrintButton'

export const revalidate = 3600

export default async function PlacePacketPage() {
  const packet = await fetchSanityDataWithParams<MarthaPlacePacket>(
    MARTHA_PLACE_PACKET,
    { slug: 'pnw-watershed-martha' }
  )

  const packetName = packet?.name ?? 'Martha · PNW Watershed'

  return (
    <>
      {/* Print styles: A5 / half-letter, no nav/footer */}
      <style>{`
        @media print {
          nav, header, .print-hide { display: none !important; }
          body { margin: 0; }
          .place-packet { width: 148mm; min-height: 210mm; margin: 0; box-shadow: none; }
        }
      `}</style>

      <main className="min-h-screen bg-vii-be-void px-6 py-12 print:p-0">
        {/* Print action — hidden on print */}
        <div className="max-w-lg mx-auto mb-8 flex justify-end print:hidden">
          <PrintButton />
        </div>

        {/* Place packet body — A5 card */}
        <article className="place-packet max-w-lg mx-auto bg-earth-dark rounded-neo shadow-neo-large overflow-hidden">

          {/* 1. Cover */}
          <div className="px-8 pt-10 pb-6 bg-gradient-to-b from-vii-be-dusk to-earth-dark">
            <p className="text-vii-be-shimmer text-xs font-semibold uppercase tracking-widest mb-4">
              Place Packet · Seeds Platform
            </p>
            <h1 className="text-3xl font-bold text-vii-be-fog mb-2">{packetName}</h1>
            <p className="text-vii-be-soft text-base italic">
              Yakima valley to your table
            </p>
          </div>

          {/* 2. Food story */}
          <div className="px-8 py-6 border-t border-vii-be-mist/20">
            <h2 className="text-earth-light text-sm font-semibold uppercase tracking-wider mb-3">
              The food
            </h2>
            <p className="text-earth-slate text-sm leading-relaxed">
              Martha cooks from the watershed. Salmon that runs the Yakima in summer. Camas root
              dug in spring. Huckleberry from the high country in August. Her food is the geography
              of the Pacific Northwest as Yakima people have held it — ten thousand years of
              seasonal knowledge, still alive on the plate.
            </p>
          </div>

          {/* 3. Watershed map placeholder */}
          <div className="px-8 py-6 border-t border-vii-be-mist/20">
            <h2 className="text-earth-light text-sm font-semibold uppercase tracking-wider mb-3">
              The place
            </h2>
            <div
              className="w-full h-32 rounded-lg border border-vii-be-mist/30 flex items-center justify-center"
              style={{ background: 'rgba(45,38,80,0.4)' }}
              aria-label="PNW watershed corridor map"
            >
              <p className="text-vii-be-shimmer text-xs text-center px-4">
                PNW Watershed Corridor<br />
                <span className="opacity-60">Yakima · Columbia · Puget Sound</span>
              </p>
            </div>
          </div>

          {/* 4. QR / invitation */}
          <div className="px-8 py-6 border-t border-vii-be-mist/20">
            <h2 className="text-earth-light text-sm font-semibold uppercase tracking-wider mb-3">
              Reserve a seat
            </h2>
            <div className="flex items-start gap-4">
              {/* QR placeholder — replace with qrcode.react in production */}
              <div
                className="w-20 h-20 rounded border border-vii-be-mist/40 flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                aria-label="QR code linking to Martha's Resy booking"
              >
                <p className="text-vii-be-shimmer text-[9px] text-center leading-tight">
                  QR<br />/qr/<br />pnw-watershed<br />-martha
                </p>
              </div>
              <div>
                <p className="text-earth-slate text-sm leading-relaxed">
                  Scan to reserve a seat at Martha's table, or find her upcoming sessions on Resy.
                </p>
                <p className="text-vii-be-shimmer text-xs mt-2">
                  exploreclique.com/martha
                </p>
              </div>
            </div>
          </div>

          {/* 5. Seeds acknowledgment */}
          <div className="px-8 py-5 border-t border-vii-be-mist/20 bg-vii-be-void/40">
            <p className="text-vii-be-shimmer text-xs leading-relaxed">
              Martha retains full authority over her stories and recipes. This packet is part of
              the Seeds sovereign storytelling platform.
            </p>
          </div>

          {/* 6. Back panel — handwrite / stamp space */}
          <div
            className="px-8 py-10 border-t border-vii-be-mist/20 min-h-[80px]"
            style={{ background: 'rgba(21,128,61,0.04)' }}
            aria-label="Space for practitioner handwritten note or stamp"
          >
            <p className="text-earth-slate/40 text-xs italic text-center">
              — for Martha's note —
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
