const {
  createGlobPatternsForDependencies
} = require('@nrwl/react/tailwind');
const {
  join
} = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: 'var(--blue-light, #11E4E4)',
          black: 'var(--blue-black, #003250)'
        },
        body: 'var(--bg-body, white)',
      }
    },
  },
  plugins: [],
};