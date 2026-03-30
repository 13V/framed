/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#F5EFE0',
          100: '#F5EFE0',
          200: '#F5EFE0',
          300: '#F5EFE0',
          DEFAULT: '#F5EFE0',
        },
        crimson: {
          light: '#4B0507',
          DEFAULT: '#4B0507',
          dark:  '#4B0507',
        },
        ink: {
          DEFAULT: '#4B0507',
          muted:   '#4B0507',
          subtle:  '#4B0507',
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
