/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        procura: {
          bg: '#17131A',
          secondary: '#211B24',
          panel: '#2A222D',
          elevated: '#342B38',
          border: '#3D3342',
          borderSubtle: '#2E2632',
          copper: '#D4774C',
          copperHover: '#E28E67',
          copperMuted: 'rgba(212, 119, 76, 0.15)',
          gold: '#B8A06A',
          goldMuted: 'rgba(184, 160, 106, 0.15)',
          parchment: '#F3EBDD',
          textSecondary: '#A99EAA',
          textMuted: '#746B76',
          success: '#8FAF78',
          successMuted: 'rgba(143, 175, 120, 0.15)',
          warning: '#D6A45D',
          warningMuted: 'rgba(214, 164, 93, 0.15)',
          critical: '#C95C5C',
          criticalMuted: 'rgba(201, 92, 92, 0.15)',
          teal: '#6A9E96',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['Cinzel', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(61, 51, 66, 0.6)',
        'glow-copper': '0 0 25px -5px rgba(212, 119, 76, 0.25)',
        'glow-gold': '0 0 25px -5px rgba(184, 160, 106, 0.2)',
      }
    },
  },
  plugins: [],
}
