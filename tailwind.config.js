/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '560px',
      md: '840px',
    },
    extend: {
      colors: {
        containerWhite: 'rgb(241,245,249)',
        containerBlue: 'rgb(8,145,178)',
      },
    },
  },
  plugins: [],
};
