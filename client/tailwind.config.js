/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo primary
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B'
        },
        secondary: {
          DEFAULT: '#0D9488', // Soft Teal
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A'
        },
        emergency: {
          DEFAULT: '#E11D48', // Rose / controlled red
          light: '#FFE4E6',
          dark: '#BE123C',
          glow: 'rgba(225, 29, 72, 0.35)'
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F5F3FF',
          200: '#EDE9FE',
          300: '#DDD6FE'
        },
        glass: {
          base: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(255, 255, 255, 0.6)',
          darkBase: 'rgba(30, 27, 75, 0.75)',
          darkBorder: 'rgba(99, 102, 241, 0.2)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(99, 102, 241, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 40px 0 rgba(99, 102, 241, 0.16), 0 4px 12px 0 rgba(0, 0, 0, 0.06)',
        'emergency-glow': '0 0 40px 8px rgba(225, 29, 72, 0.45)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
