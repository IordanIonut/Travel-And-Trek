// tailwind.config.js
module.exports = {
  content: [
    "./dist/app-core/src/**/*.{html,ts}",
    "./node_modules/travel-and-trek-app-core/**/*.{html,ts}",
    "./projects/app-core/src/**/*.{html,ts,scss}",
    "./projects/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
