const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      teal: colors.teal,
      violet: colors.violet,
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      indigo: colors.indigo,
      red: colors.rose,
      blue: colors.blue,
      green: colors.green,
      gold: {
        light: '#FFD700',
        DEFAULT: '#FFD700',
        dark: '#FFD700',
      },
      silver: {
        light: '#C0C0C0',
        DEFAULT: '#C0C0C0',
        dark: '#C0C0C0',
      },
      bronze: {
        light: '#cd7f32',
        DEFAULT: '#cd7f32',
        dark: '#cd7f32',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
