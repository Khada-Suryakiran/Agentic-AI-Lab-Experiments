/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Deep dark neutral
        panel: 'rgba(30, 41, 59, 0.7)',
        accent: '#06b6d4', // Cyan/electric blue
        threat: '#f97316', // Orange
        success: '#10b981', // Green
        info: '#3b82f6', // Blue
        warning: '#f59e0b', // Amber
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
