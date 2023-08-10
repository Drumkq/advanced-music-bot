/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E12D4D',
        'hovered-primary': '#51232B',
        'active-primary': '#32181D',
        'bacground': '#1A1A1D',
        'darker-background': '#17171B'
      }
    },
  },
  plugins: [],
}

