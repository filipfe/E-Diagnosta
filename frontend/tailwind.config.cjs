/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0028FA',
        darkPrimary: '#091E8C',
        font: '#141B3F'
      }
    },
  },
  plugins: [],
}
