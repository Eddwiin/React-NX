const {
  createGlobPatternsForDependencies
} = require('@nrwl/react/tailwind');
const {
  join
} = require('path');
const sharedPresetTailwind = require("./../../tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedPresetTailwind],
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};