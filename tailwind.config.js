/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // NOT 'media'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'urbanist': '"Urbanist", serif;'
      }
    },
  },
  plugins: [],
}