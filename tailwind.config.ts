import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          primary: '#15803D',
          secondary: '#92400E',
          accent: '#78350F',
          dark: '#44403C',
          slate: '#A8A29E',
          light: '#F5F0E8',
        },
      },
      backgroundImage: {
        'earth-gradient': 'linear-gradient(135deg, #78350F 0%, #92400E 50%, #15803D 100%)',
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

