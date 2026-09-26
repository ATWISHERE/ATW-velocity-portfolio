/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-lime': '#D2FF00',
        'carbon-black': '#111112',
        'dark-olive-carbon': '#282C20',
        'monastic-cream': '#F4F4ED',
      },
    },
  },
  plugins: [],
}
