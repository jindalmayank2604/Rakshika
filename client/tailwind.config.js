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
        // WeSafe Light Mode Palette
        parchment: {
          DEFAULT: '#edede9',
          50: '#faf9f6',
          100: '#f4f3ef',
          200: '#edede9',
          300: '#dedecc',
          400: '#cbcaa8',
        },
        'dust-grey': {
          DEFAULT: '#d6ccc2',
          light: '#e8e2dc',
          dark: '#b8a99a',
        },
        linen: {
          DEFAULT: '#f5ebe0',
          50: '#fdfbf9',
          100: '#fbf7f2',
          200: '#f5ebe0',
          300: '#ebd6c2',
        },
        'powder-petal': {
          DEFAULT: '#e3d5ca',
          light: '#f1e9e2',
          dark: '#cbb3a1',
        },
        'almond-silk': {
          DEFAULT: '#d5bdaf',
          light: '#e5d5cb',
          dark: '#bfa08f',
        },

        // WeSafe Dark Mode Palette
        silver: {
          DEFAULT: '#cebebe',
          light: '#e1d7d7',
          dark: '#b59f9f',
        },
        bone: {
          DEFAULT: '#ece2d0',
          light: '#f5efe4',
          dark: '#d9c5a5',
        },
        'almond-dark': {
          DEFAULT: '#d5b9b2',
          light: '#e5d1cb',
          dark: '#bc968c',
        },
        'smoky-rose': {
          DEFAULT: '#a26769',
          50: '#f7f1f1',
          100: '#ece0e1',
          200: '#dbc4c5',
          300: '#c59fa1',
          400: '#b47f82',
          500: '#a26769',
          600: '#8c5254',
          700: '#734143',
          800: '#5c3435',
          900: '#4c2b2c',
        },
        'wine-plum': {
          DEFAULT: '#6d2e46',
          50: '#fbf4f6',
          100: '#f4e5ea',
          200: '#ebcfd9',
          300: '#dcadc0',
          400: '#c6819e',
          500: '#ab5c7e',
          600: '#944465',
          700: '#7c3552',
          800: '#6d2e46',
          900: '#5c293c',
          950: '#3a1322',
        },

        // Primary / Accent Aliases for UI consistency
        primary: {
          DEFAULT: '#6d2e46', // Wine Plum
          50: '#fdf8f9',
          100: '#f4e5ea',
          200: '#e3d5ca',
          300: '#d5b9b2',
          400: '#a26769',
          500: '#8c5254',
          600: '#6d2e46',
          700: '#5c293c',
          800: '#4a1e30',
          900: '#3a1322',
        },
        accent: {
          DEFAULT: '#a26769', // Smoky Rose
          light: '#d5bdaf',
          dark: '#6d2e46',
        },
        emergency: {
          DEFAULT: '#b91c1c',
          light: '#fee2e2',
          dark: '#7f1d1d',
          glow: 'rgba(185, 28, 28, 0.4)',
        },
        safety: {
          DEFAULT: '#2b7a78',
          light: '#e6fffa',
          dark: '#17252a',
        },
        glass: {
          light: 'rgba(245, 235, 224, 0.75)',
          lightBorder: 'rgba(214, 204, 194, 0.65)',
          dark: 'rgba(58, 19, 34, 0.75)',
          darkBorder: 'rgba(162, 103, 105, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass-warm': '0 8px 32px 0 rgba(109, 46, 70, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.03)',
        'glass-warm-hover': '0 14px 38px 0 rgba(109, 46, 70, 0.15), 0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        'emergency-glow': '0 0 35px 6px rgba(185, 28, 28, 0.45)',
        'warm-sm': '0 2px 8px 0 rgba(109, 46, 70, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(109, 46, 70, 0.12)',
        'warm-lg': '0 20px 35px -8px rgba(109, 46, 70, 0.16)',
        '3d-badge': '0 6px 14px -2px rgba(109, 46, 70, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.96)', opacity: '1' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
