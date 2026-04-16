import { fetchSanityDataWithParams } from '@/lib/sanity.client'
import { MARTHA_PRODUCER_PROFILE } from '@/lib/sanity.martha.queries'
import type { MarthaProfile } from '@/lib/sanity.martha.queries'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600

const FALLBACK_VOICE =
  'I cook from the watershed. The salmon knows the season. The camas remembers the fire. ' +
  'When you eat at my table, you\'re eating the geography of the Pacific Northwest as ' +
  'Indigenous people have held it for ten thousand years. I\'m Martha. This is what I do.'

const DACUM_FRAMES = [
  {
    label: 'Vocational',
    text: 'Regional protein knowledge — salmon, camas, huckleberry, game — from PNW watersheds.',
  },
  {
    label: 'Avocational',
    text: 'Food story transmission through cooking and gathering practice, passed down across generations.',
  },
  {
    label: 'Civic',
    text: 'Cross-cultural bridge between Indigenous and non-Indigenous food communities in the Pacific Northwest.',
  },
  {
    label: 'Cultural',
    text: 'Yakima stewardship — the land is part of the recipe.',
  },
]

export default async function MarthaPage() {
  const profile = await fetchSanityDataWithParams<MarthaProfile>(
    MARTHA_PRODUCER_PROFILE,
    { slug: 'martha' }
  )

  const voice = profile?.articulatedVoice ?? FALLBACK_VOICE
  const name = profile?.name ?? 'Martha'

  return (
    <main className="min-h-screen">
      {/* 1. Lyric pitch hero — articulatedVoice only, place before identity */}
      <section className="relative px-6 py-20 md:py-32 bg-gradient-to-b from-vii-be-dusk to-vii-be-void">
        <div className="max-w-3xl mx-auto">
          <p className="text-vii-be-shimmer text-sm font-medium tracking-widest uppercase mb-6">
            Pacific Northwest · Yakima Heritage
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-vii-be-fog mb-10 leading-tight">
            {name}
          </h1>
          <blockquote className="text-xl md:text-2xl text-vii-be-soft leading-relaxed italic border-l-4 border-vii-be-bloom pl-6">
            {voice}
          </blockquote>
        </div>
      </section>

      {/* 2. Place bio — terroir first, Martha's role second */}
      <section className="px-6 py-16 bg-earth-dark">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-earth-light mb-6">The Watershed</h2>
          <div className="space-y-4 text-earth-slate leading-relaxed">
            <p>
              Martha's practice is rooted in the PNW watershed corridor — the rivers, valleys, and
              forests that have sustained Yakima people for ten thousand years.
            </p>
            <p>
              She works seasonally. Spring brings camas and fiddle fern. Summer, the salmon runs.
              Autumn, huckleberry and game. Winter, preservation and story. The calendar is the
              curriculum.
            </p>
            <p>
              What she makes is not fusion. It is the original cuisine of this place, prepared by
              someone who learned it from the people who kept it.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Session booking CTA — meal before credentials, Phase A per Mission Doc */}
      <section className="px-6 py-16 bg-vii-be-mist text-center">
        <div className="max-w-xl mx-auto" id="booking">
          <h2 className="text-2xl font-semibold text-vii-be-fog mb-4">Eat at her table</h2>
          <p className="text-vii-be-soft mb-8">
            Martha hosts small-group meals and food gatherings in Seattle and the Yakima corridor.
            Reserve a seat.
          </p>
          <a
            href="https://resy.com/cities/seattle"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-button inline-block"
            aria-label="Reserve a seat at Martha's table via Resy"
          >
            Reserve a seat →
          </a>
          <p className="text-vii-be-shimmer text-xs mt-4">
            Reservations via Resy · Contact for group sessions
          </p>
        </div>
      </section>

      {/* 4. DACUM 4-frame — plain language, no HR jargon */}
      <section className="px-6 py-16 bg-earth-dark">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-earth-light mb-2">What she knows</h2>
          <p className="text-earth-slate text-sm mb-8">Her credential, in plain language.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {DACUM_FRAMES.map(({ label, text }) => (
              <div
                key={label}
                className="neo-card border border-earth-secondary/20"
                style={{ background: 'rgba(68,64,60,0.4)' }}
              >
                <Badge variant="secondary" className="mb-3">
                  {label}
                </Badge>
                <p className="text-earth-slate text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5a. DH2026 citation — governance layer (distinct claim) */}
      <section className="px-6 py-10 bg-vii-be-void border-t border-vii-be-mist/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-vii-be-shimmer text-xs font-semibold uppercase tracking-widest mb-3">
            Academic Validation · Governance Layer
          </p>
          <p className="text-vii-be-soft text-sm leading-relaxed">
            The sovereignty architecture underlying Martha's practice was accepted for presentation
            at the{' '}
            <strong className="text-vii-be-fog">
              Alliance of Digital Humanities Organizations (DH2026)
            </strong>
            . This validates the governance layer: that Indigenous food knowledge can be transmitted
            digitally with full practitioner authority intact.
          </p>
        </div>
      </section>

      {/* 5b. VSA citation — transmission methodology (distinct claim, separate block) */}
      <section className="px-6 py-10 bg-vii-be-void border-t border-vii-be-mist/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-vii-be-shimmer text-xs font-semibold uppercase tracking-widest mb-3">
            Academic Validation · Transmission Methodology
          </p>
          <p className="text-vii-be-soft text-sm leading-relaxed">
            Place packets as transmission artifacts were accepted for two posters at the{' '}
            <strong className="text-vii-be-fog">
              Visitor Studies Association (VSA) Conference
            </strong>
            . This validates the methodology: that place packets effectively reach and engage
            visitors in food-heritage learning contexts.
          </p>
        </div>
      </section>

      {/* 6. Seeds governance note — always last */}
      <footer className="px-6 py-8 bg-vii-be-void border-t border-vii-be-mist/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-vii-be-shimmer text-xs text-center">
            Martha retains full authority over her stories. This page is part of the Seeds
            sovereign storytelling platform.
          </p>
        </div>
      </footer>
    </main>
  )
}
