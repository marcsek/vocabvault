/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gray: {
        50: '#fafafa',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#525252',
        600: '#404040',
        700: '#262626',
        800: '#191919',
      },
      primary: {
        100: '#BFDBFE',
        200: '#60A5FA',
        300: '#3B82F6',
        400: '#1D4ED8',
        500: '#1E40AF',
      },
      secondary: {
        100: '#FECDD3',
        200: '#FB7185',
        300: '#E11D48',
        400: '#BE123C',
        500: '#9F1239',
      },
      success: {
        50: '#D8FBDE',
        100: '#86E8AB',
        200: '#36B37E',
        300: '#1B806A',
        400: '#0A5554',
      },
      warning: {
        50: '#FFF5CC',
        100: '#FFD666',
        200: '#FFAB00',
        300: '#B76E00',
        400: '#7A4100',
      },
      error: {
        50: '#FEE2E2',
        100: '#FCA5A5',
        200: '#EF4444',
        300: '#DC2626',
        400: '#B91C1C',
      },
    },

    extend: {
      borderRadius: {
        default: '0.375rem',
      },
      lineHeight: {
        display: '5rem',
        h1: '4rem',
        h1s: '3rem',
      },
      padding: {
        8.5: '2.1875rem',
      },
      spacing: {
        17: '4.375rem',
      },
    },
  },
  // plugins: [require('@tailwindcss/forms')],
};
