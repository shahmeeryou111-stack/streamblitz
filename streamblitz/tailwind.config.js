/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface1: '#141414',
        surface2: '#1a1a1a',
        surface3: '#222222',
        accent: '#ff3b3b',
        live: '#00e676',
        amber: '#ffab00',
        textPrimary: '#f5f5f5',
        textSecondary: '#999999',
        textMuted: '#666666',
        borderc: '#2a2a2a',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'heat': 'linear-gradient(135deg, #ff3b3b, #ff6b35)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(255,59,59,0.35)',
      },
      keyframes: {
        pulseLive: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: .6, transform: 'scale(1.15)' },
        },
      },
      animation: {
        pulseLive: 'pulseLive 1.4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
