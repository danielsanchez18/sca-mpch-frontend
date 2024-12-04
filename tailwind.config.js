/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#15283c',
        'primary': '#007bc2',
        'primary-light': '#5da3d3',
        'primary-dark': '#286ca1',
        'secondary': '#286ca1',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}
