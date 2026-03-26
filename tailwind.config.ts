import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Earth Motif (existing) ────────────────────────────────────────
        earth: {
          primary:   '#15803D',
          secondary: '#92400E',
          accent:    '#78350F',
          dark:      '#44403C',
          slate:     '#A8A29E',
          light:     '#F5F0E8',
        },

        // ── Ensemble: Prospero / Atmosphere (vii-be-*) — Issue #15 CEP-24 ──
        // Immersive venue atmosphere — deep, spatial, dusk-register colours
        'vii-be': {
          void:      '#0D0D12',  // deep space black
          dusk:      '#1A1035',  // late-evening indigo
          mist:      '#2D2650',  // layered atmospheric mid
          bloom:     '#5B4EA8',  // active bloom purple
          shimmer:   '#9B8FD4',  // shimmer highlight
          soft:      '#C8C2E8',  // soft atmospheric edge
          fog:       '#EAE8F5',  // near-white fog
        },

        // ── Ensemble: Chorus / Pipeline (gem-*) ──────────────────────────
        // Story gem pipeline — amber/gold production-signal palette
        gem: {
          raw:       '#3B2000',  // unprocessed — dark amber earth
          harvest:   '#92400E',  // harvested — warm amber (shares earth.secondary)
          pressed:   '#C2671A',  // pressed — bright amber
          ferment:   '#D97706',  // fermenting — golden
          barrel:    '#F59E0B',  // barrel — rich gold
          bottle:    '#FCD34D',  // bottled — pale gold
          pour:      '#FEF3C7',  // poured — near white gold
        },

        // ── Ensemble: Touchstone / Intelligence (tq-*) ───────────────────
        // TQ Control Loop — traffic-light safety register
        tq: {
          safe:      '#064E3B',  // score 0.0–0.40 — deep green
          low:       '#065F46',  // score 0.40–0.50
          guarded:   '#0D9488',  // score 0.50–0.60 — teal
          elevated:  '#D97706',  // score 0.60–0.65 — amber warning
          high:      '#DC2626',  // score 0.65–0.80 — red alert
          paused:    '#7C3AED',  // TQ_PAUSED — purple (Purple Alert protocol)
          surface:   '#F0FDF4',  // UI surface when safe
          bg:        '#FEF2F2',  // UI background when paused
        },
      },
      backgroundImage: {
        'earth-gradient':    'linear-gradient(135deg, #78350F 0%, #92400E 50%, #15803D 100%)',
        'vii-be-gradient':   'linear-gradient(180deg, #0D0D12 0%, #1A1035 50%, #2D2650 100%)',
        'gem-pipeline':      'linear-gradient(90deg, #3B2000 0%, #C2671A 40%, #FCD34D 100%)',
        'tq-safe-gradient':  'linear-gradient(135deg, #064E3B 0%, #0D9488 100%)',
        'tq-pause-gradient': 'linear-gradient(135deg, #7C3AED 0%, #DC2626 100%)',
      },
      boxShadow: {
        'neo-default': '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff',
        'neo-large': '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff',
        'neo-inset': 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
        'neo-button': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
      },
      borderRadius: {
        neo: '1rem',
      },
    },
  },
  plugins: [],
}

export default config

