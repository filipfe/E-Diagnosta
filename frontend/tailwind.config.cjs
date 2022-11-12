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
      },
      backgroundImage: {
        background: 'linear-gradient(89.7deg, rgba(0, 40, 250, 0.018) -12.57%, rgba(0, 40, 250, 0) 94.56%)'
      },
      gridTemplateColumns: {
        skp: 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
}
