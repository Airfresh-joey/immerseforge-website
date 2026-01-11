/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        charcoal: {
          DEFAULT: '#0a0a0a',
          light: '#151515',
          medium: '#1a1a1a',
        },
        copper: {
          DEFAULT: '#c77b35',
          light: '#d4915a',
        },
        amber: '#f4a638',
        cream: {
          DEFAULT: '#f5ede4',
          muted: 'rgba(245, 237, 228, 0.7)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
