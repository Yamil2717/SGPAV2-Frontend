/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: '#FFFBF5',
        bg: '#0f172a',
        secondary: '#1e293b',
        primary: '#7743DB',
        primary_dark: '#10154c',
      },
      fontFamily: {
        custom: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

