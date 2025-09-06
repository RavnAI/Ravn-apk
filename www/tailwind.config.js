/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C4DFF',
        accent: '#00E5FF',
        ink: '#0B1020',
        card: '#131A2A',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
