/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1650px'
    },
    extend: {}
  },
  plugins: []
}
