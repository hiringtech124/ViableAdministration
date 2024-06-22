/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(139.3deg, #D79314 3.92%, rgba(215, 147, 20, 0.44) 51.5%, #D79314 95.04%)',
      },
    },
  },
  plugins: [],
}

