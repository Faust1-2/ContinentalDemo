/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './src/app/**/*.{html,ts}\''],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fbf8eb',
          '100': '#f7efca',
          '200': '#f0dd98',
          '300': '#e7c45d',
          '400': '#dea92c',
          '500': '#cf9423',
          '600': '#b2731c',
          '700': '#8f5419',
          '800': '#77431c',
          '900': '#66391d',
          '950': '#3b1d0d',
        },
        'accent': {
          '50': '#faf5f2',
          '100': '#f3e8e1',
          '200': '#e7cfc1',
          '300': '#d7af9a',
          '400': '#c78970',
          '500': '#bb6d54',
          '600': '#b05c4a',
          '700': '#90483e',
          '800': '#753d37',
          '900': '#5f332f',
          '950': '#331817',
        },
        'dark-shades': '#343845',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
