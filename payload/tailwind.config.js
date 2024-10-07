/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  darkMode: ['class', '[data-theme="dark"]'], // data-theme is what works with next-themes
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea3a08',
          highlight: '#ea3a08',
          //   DEFAULT: '#009fff',
          //   highlight: '#009fff',
        },
        secondary: {
          // dark: '#C1FFCC',
          DEFAULT: '#ff9a51',
          highlight: '#ff9a51',
        },

        // styles from payload cms
        base: {
          0: 'rgb(255, 255, 255)',
          50: 'rgb(245, 245, 245)',
          100: 'rgb(235, 235, 235)',
          150: 'rgb(221, 221, 221)',
          200: 'rgb(208, 208, 208)',
          250: 'rgb(195, 195, 195)',
          300: 'rgb(181, 181, 181)',
          350: 'rgb(168, 168, 168)',
          400: 'rgb(154, 154, 154)',
          450: 'rgb(141, 141, 141)',
          500: 'rgb(128, 128, 128)',
          550: 'rgb(114, 114, 114)',
          600: 'rgb(101, 101, 101)',
          650: 'rgb(87, 87, 87)',
          700: 'rgb(74, 74, 74)',
          750: 'rgb(60, 60, 60)',
          800: 'rgb(47, 47, 47)',
          850: 'rgb(34, 34, 34)',
          900: 'rgb(20, 20, 20)',
          950: 'rgb(7, 7, 7)',
          1000: 'rgb(0, 0, 0)',
        },
        error: 'var(--theme-error-400)',
      },
    },
  },
  plugins: [],
};
