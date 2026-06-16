/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#12141c',
        card: {
          bg: '#1e222d',
          inner: '#161a23',
        },
        text: {
          main: '#ffffff',
          muted: '#8a92a5',
        },
        accent: {
          blue: '#5c7aff',
          blueHover: '#4b66e6',
        },
        status: {
          green: '#2ecc71',
          red: '#e74c3c',
        },
        border: {
          DEFAULT: '#2c3142',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['monospace'],
      }
    },
  },
  plugins: [],
}
