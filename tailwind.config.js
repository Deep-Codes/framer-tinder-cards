/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: 'var(--gray1)',
          200: 'var(--gray2)',
          300: 'var(--gray3)',
          400: 'var(--gray4)',
          500: 'var(--gray5)',
          600: 'var(--gray6)',
          700: 'var(--gray7)',
          800: 'var(--gray8)',
          900: 'var(--gray9)',
          1000: 'var(--gray10)',
          1100: 'var(--gray11)',
          1200: 'var(--gray12)',
        },
      },
    },
  },
  plugins: [],
};