module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0a0c1b',
          900: '#181c2e',
          800: '#23294a',
          700: '#2e365c',
          600: '#3a4270',
        },
        accent: {
          500: '#7ddaff',
          400: '#a5b4fc',
          300: '#fbc2eb',
          200: '#f8fafc',
        },
        text: {
          100: '#f8fafc',
          200: '#e0e7ef',
          300: '#cbd5e1',
        }
      }
    }
  },
  plugins: []
}
