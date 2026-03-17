/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './apps/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        // Core Brand
        brand: {
          primary: '#10B981',
          secondary: '#312E81',
          accent: '#6366F1',
        },
        // Wine Heritage
        wine: {
          primary: '#9333EA',
          secondary: '#DB2777',
          accent: '#F87171',
          light: '#E9D5FF',
        },
        // Freedom Trails
        trails: {
          primary: '#1E40AF',
          secondary: '#B45309',
          accent: '#FDE047',
          light: '#BFDBFE',
        },
        // Sound Clash
        sound: {
          primary: '#EA580C',
          secondary: '#06B6D4',
          accent: '#F59E0B',
          light: '#FEF3C7',
        },
        // GTM
        gtm: {
          primary: '#10B981',
          secondary: '#6366F1',
          accent: '#14B8A6',
          light: '#D1FAE5',
        },
        // Guild
        guild: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          accent: '#A78BFA',
          light: '#C7D2FE',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(16, 185, 129, 0.3)',
        'glow-md': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-lg': '0 0 30px rgba(16, 185, 129, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
