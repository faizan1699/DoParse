/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navy: {
          50: '#f0f4ff',
          100: '#dde7ff',
          200: '#bdd0ff',
          300: '#92b4ff',
          400: '#6490ff',
          500: '#4269ff',
          600: '#3647d9',
          700: '#2c3aa7',
          800: '#242e85',
          900: '#1e2366',
          950: '#141844',
        },
      },
    },
  },
  plugins: [],
}
