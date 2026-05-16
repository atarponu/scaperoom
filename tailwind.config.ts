import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0805',
        'ink-light': '#1a1510',
        'ink-mid': '#2a2018',
        parchment: '#e8d5b7',
        'parchment-dim': '#c4a882',
        'parchment-dark': '#8a7055',
        'blood': '#8b2c2c',
        'blood-dim': '#5c1c1c',
        'olive': '#4a6741',
        'olive-dim': '#2e4028',
        'fog': 'rgba(232, 213, 183, 0.06)',
      },
      fontFamily: {
        narrative: ['var(--font-playfair)', 'Georgia', 'serif'],
        title: ['var(--font-special-elite)', 'Courier New', 'monospace'],
        ui: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'grain': 'grain 0.4s steps(1) infinite',
        'flicker': 'flicker 6s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-3%, -2%)' },
          '20%': { transform: 'translate(2%, 3%)' },
          '30%': { transform: 'translate(-1%, 1%)' },
          '40%': { transform: 'translate(3%, -3%)' },
          '50%': { transform: 'translate(-2%, 2%)' },
          '60%': { transform: 'translate(1%, -1%)' },
          '70%': { transform: 'translate(-3%, 3%)' },
          '80%': { transform: 'translate(2%, -2%)' },
          '90%': { transform: 'translate(-1%, 0%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.94' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.97' },
          '97%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1.00)' },
          '50%': { transform: 'scale(1.015)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
