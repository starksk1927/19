/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celestial: {
          950: '#070b19',
          900: '#0b132b',
          800: '#1c2541',
          700: '#3a506b',
        },
        roseGold: {
          300: '#fed7e2',
          400: '#fbb6ce',
          500: '#f687b3',
        },
        babyCyan: {
          300: '#a5f3fc',
          400: '#67e8f9',
          500: '#22d3ee',
          600: '#06b6d4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Dancing Script"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(103, 232, 249, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(246, 135, 179, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
