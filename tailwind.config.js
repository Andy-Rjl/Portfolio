/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- C'EST CELLE-CI QUI MANQUE !
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}