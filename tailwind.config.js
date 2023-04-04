/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      //'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'grayish': '#eee',
      'whitish': '#f9f9f9',
      'gray': {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712'
      },
      'mexican-red': {
        DEFAULT: '#a30000',
        //'#9F2A2A',
        50: '#F8EBE4', 100: '#F2D7CC',
        200: '#E5AC9C', 300: '#D87B6C', 400: '#CB463B',
        500: '#9F2A2A', 600: '#83232A', 700: '#661B26',
        800: '#4A1420', 900: '#2E0C16'
      },
      'pale-sky': {
        DEFAULT: '#6B7280',
        50: '#CDD0D5',
        100: '#C2C5CC',
        200: '#ACB0BA',
        300: '#969BA7',
        400: '#7F8694',
        500: '#6B7280',
        600: '#515761',
        700: '#383C43',
        800: '#1E2024',
        900: '#050506'
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial'],
      serif: ['Mulish', 'sans-serif']
    },
    extend: {
      spacing: {
        '128': '32rem',
      },
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '25': 25,
        '50': 50,
        '75': 75,
        '100': 100,
        'auto': 'auto',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },

  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}
