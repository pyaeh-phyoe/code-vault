/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#272335',
        'secondaryColor': '#060606',
        'adjacentColor': '#870086',
        'borderColor': '#2F2F2F',
        'white': '#ffffff',
        'crimson': '#ed143d',
        'grey': 'hsl(214 4% 50% / 1)',
        'consoleColor': '#343539',
        'darkGrey': '#444857'
      }
    },
  },
  plugins: [],
}
