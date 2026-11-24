/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        estate: {
          ivory: '#F7F6F2',
          offwhite: '#FDFCF9',
          charcoal: '#252723',
          'charcoal-light': '#32352F',
          forest: '#354A3D',
          'forest-dark': '#26362C',
          'forest-light': '#4A6554',
          stone: '#D9D5CB',
          'stone-light': '#EBE8E0',
          'stone-dark': '#B8B3A7',
          grey: '#777873',
          'grey-light': '#A1A29D',
          gold: '#B89758',
          'gold-light': '#CDB078'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(37, 39, 35, 0.04), 0 1px 2px -1px rgba(37, 39, 35, 0.04)',
        'elevated': '0 10px 25px -5px rgba(37, 39, 35, 0.06), 0 8px 10px -6px rgba(37, 39, 35, 0.04)',
        'editorial': '0 20px 35px -10px rgba(37, 39, 35, 0.08)'
      }
    },
  },
  plugins: [],
}
