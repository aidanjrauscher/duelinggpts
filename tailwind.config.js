/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-green':'#19C37D',
        'chatgpt-black' : '#202123',
        'chatgpt-grey-dark': '#343541',
        'chatgpt-grey-light': '#434654',
        'chatgpt-grey-accent':'#40414f',
        'chatgpt-white': '#E1E1E6',
        'chatgpt-red': '#EF4444',
        'chatgpt-blue':"#00AEFF"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}