/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'Poppins', 'system-ui'],
      },
      colors: {
        exaid: {
          pink: '#ff2bb3',
          green: '#8bfd00',
          cyan: '#29ffe3',
          purple: '#7a2ff7',
          bg: '#0b0b0f',
        }
      }
    },
  },
  plugins: [],
}






