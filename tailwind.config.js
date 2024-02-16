/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    FontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      'primary': '#1A374D',
      'secondary': '#406882',
      'tertiary': '#6998AB',
      'quaternary': '#B1D0E0'
    },
    borderRadius: {
      '4xl': '4rem'
    },
    height: {
      '102': '28rem',
      '104': '30rem',
      '106': '32rem',
      '108': '34rem',
      '110': '36rem',
    },
    gridTemplateColumns: {
      '24': 'repeat(24, minmax(0, 1fr))'
    },
    gridColumn: {
      'span-13': 'span 13 / span 13',
      'span-14': 'span 14 / span 14',
      'span-15': 'span 15 / span 15',
      'span-16': 'span 16 / span 16',
      'span-17': 'span 17 / span 17',
      'span-18': 'span 18 / span 18',
      'span-19': 'span 19 / span 19',
      'span-20': 'span 20 / span 20',
      'span-21': 'span 21 / span 21',
      'span-22': 'span 22 / span 22',
      'span-23': 'span 23 / span 23',
      'span-24': 'span 24 / span 24'
    }
  }
};
export const plugins = [];
