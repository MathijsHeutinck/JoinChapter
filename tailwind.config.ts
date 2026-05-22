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
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2C4270',
          dark: '#0E1929',
        },
        gold: {
          DEFAULT: '#B8892B',
          light: '#D4A843',
          pale: '#F0D9A0',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          dark: '#F0ECE3',
          darker: '#E3DDD3',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
