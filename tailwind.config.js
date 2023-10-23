/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDark: '#212120',
        textDark: '#252422',
        iconGray: '#9a9a9a',
        btnBg:'#66615b',
        inputColor:'#f3f2ee',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif']
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
}

