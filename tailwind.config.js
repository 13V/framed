/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF4',
          100: '#F9F3E6',
          200: '#F5EFE0',
          300: '#EDE3CC',
          DEFAULT: '#F5EFE0',
        },
        crimson: {
          light: '#7A1215',
          DEFAULT: '#4B0507',
          dark:  '#2D0304',
        },
        ink: {
          DEFAULT: '#0D0505',
          muted:   '#2A1515',
          subtle:  '#4A2525',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1.0' }],
        '9xl':  ['8rem',   { lineHeight: '0.95' }],
        '10xl': ['10rem',  { lineHeight: '0.9' }],
        '11xl': ['12rem',  { lineHeight: '0.88' }],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
