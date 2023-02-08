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
        header: 'var(--bg-header, red)',
        body: 'var(--bg-body, white)',
        blue: "var(--color-blue, #003250)"
      }
    },
  },
  plugins: [],
};