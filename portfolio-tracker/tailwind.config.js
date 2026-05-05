/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dust: {
          50: '#fdf6e3',
          100: '#f5e6c8',
          200: '#e8c99a',
          300: '#d4a96a',
          400: '#c4874a',
          500: '#a0522d',
          600: '#7a3b1e',
          700: '#5c2a12',
          800: '#3d1a0a',
          900: '#1e0d05',
        },
        blood: {
          400: '#c0392b',
          500: '#96281b',
          600: '#7b241c',
        },
        amber: {
          300: '#f0c040',
          400: '#e8a020',
          500: '#c07820',
        },
        sepia: {
          700: '#2a1a0a',
          800: '#1a0f05',
          900: '#0d0704',
        },
        charcoal: {
          700: '#2a1a0a',
          800: '#1a0f05',
          900: '#0d0704',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        western: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
        mono: ['"Special Elite"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'rdr-gradient': 'linear-gradient(180deg, #0d0704 0%, #1e0d05 30%, #3d1a0a 60%, #5c2a12 80%, #c07820 100%)',
        'sunset': 'linear-gradient(180deg, #1a0a02 0%, #3d1506 25%, #7a2a08 50%, #c05010 75%, #e08020 100%)',
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'dust': 'dust 8s linear infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
          '75%': { opacity: 0.95 },
        },
        dust: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}