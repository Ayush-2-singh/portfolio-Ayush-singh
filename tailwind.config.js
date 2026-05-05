/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saddle: {
          50: '#fdf6ee',
          100: '#f5e6cc',
          200: '#e8c99a',
          300: '#d4a56a',
          400: '#c0823a',
          500: '#a0621a',
          600: '#7d4a10',
          700: '#5c330a',
          800: '#3b1f05',
          900: '#1e0e02',
        },
        blood: {
          400: '#e05555',
          500: '#c0392b',
          600: '#96281b',
          700: '#6e1a10',
        },
        dust: {
          300: '#d4c5a9',
          400: '#b8a98a',
          500: '#9c8d6e',
          600: '#7a6c52',
        },
        ember: '#e8a020',
        parchment: '#f0e6c8',
        darkwood: '#1a0f05',
        midnight: '#0d0705',
      },
      fontFamily: {
        display: ['"Rye"', 'serif'],
        body: ['"Philosopher"', 'serif'],
        mono: ['"Special Elite"', 'cursive'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}