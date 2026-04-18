/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#2563eb',
        secondary: '#1e40af',
        dark:      '#0f172a',
      },
    },
  },
  plugins: [],
};
