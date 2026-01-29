import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Spatial Studio brand colors
        'studio-blue': '#1E3A5F',
        'action-teal': '#0D9488',
        'warm-sand': '#F5F0E8',
        'civic-gold': '#D97706',
        // Vintage & Voice extensions
        'incumbent-burgundy': '#722F37',
        'digital-native-teal': '#0D9488',
        // Wine-specific
        'wine-red': '#8B1538',
        'wine-gold': '#C9A962',
        'terroir-earth': '#5D4E37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
