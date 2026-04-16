// Phase 0: static platform links + join CTA.
// Phase 1 (ENG-29): fetch StoryGem artifacts from PlayFab when artifact schema is stable.
// OTW carry-over NOT enabled — blocked by CEAZ-242 Puyallup consent gate (BOT-27).

const PLATFORM_LINKS = [
  {
    name: 'Discord Stage',
    description: 'Join live sessions and ask Martha questions in real time.',
    href: '#discord',
    cta: 'Join Discord →',
  },
  {
    name: 'YouTube Live',
    description: 'Watch archived sessions and upcoming live streams.',
    href: '#youtube',
    cta: 'Watch on YouTube →',
  },
  {
    name: 'Twitch',
    description: 'Catch live cooking and gathering sessions.',
    href: '#twitch',
    cta: 'Watch on Twitch →',
  },
]

export default function MarthaLivePage() {
  return (
    <main className="min-h-screen bg-vii-be-void">
      {/* Header */}
      <section className="px-6 py-16 bg-gradient-to-b from-vii-be-dusk to-vii-be-void">
        <div className="max-w-3xl mx-auto">
          <p className="text-vii-be-shimmer text-sm font-medium tracking-widest uppercase mb-4">
            Martha · Live Sessions
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-vii-be-fog mb-4">
            Lore, live.
          </h1>
          <p className="text-vii-be-soft text-lg leading-relaxed">
            Martha hosts live food and story sessions across Discord, YouTube, and Twitch.
            The same editorial grammar, different cadence. Come with questions.
          </p>
        </div>
      </section>

      {/* Platform links */}
      <section className="px-6 py-12 bg-earth-dark">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-earth-light mb-8">Find Martha live</h2>
          <div className="space-y-4">
            {PLATFORM_LINKS.map(({ name, description, href, cta }) => (
              <div
                key={name}
                className="neo-card border border-earth-secondary/20 flex items-center justify-between gap-4"
                style={{ background: 'rgba(68,64,60,0.4)' }}
              >
                <div>
                  <h3 className="text-earth-light font-semibold mb-1">{name}</h3>
                  <p className="text-earth-slate text-sm">{description}</p>
                </div>
                <a
                  href={href}
                  className="neo-button flex-shrink-0 text-sm"
                  aria-label={`${cta} — ${name}`}
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join next session CTA */}
      <section className="px-6 py-16 bg-vii-be-mist text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-vii-be-fog mb-4">Join the next session</h2>
          <p className="text-vii-be-soft mb-8 text-sm">
            Sessions announced in Discord. Join to get notified when Martha goes live.
          </p>
          <a
            href="#discord"
            className="neo-button inline-block"
            aria-label="Join Discord to get session notifications"
          >
            Join Discord →
          </a>
        </div>
      </section>

      {/* StoryGem artifacts — Phase 1 placeholder */}
      <section className="px-6 py-12 bg-vii-be-void border-t border-vii-be-mist/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-vii-be-fog mb-2">Recent sessions</h2>
          <p className="text-vii-be-shimmer text-sm">
            Session recordings and StoryGem artifacts will appear here once ENG-29 is live.
          </p>
        </div>
      </section>

      {/* Seeds governance note */}
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
