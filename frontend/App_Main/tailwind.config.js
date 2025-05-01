/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./projects/**/*.{html,ts}",
    "./projects/app-core/**/*.{html,ts}",
    "./node_modules/travel-and-trek-app-authentication/**/*.{html,ts,scss}",
    "./node_modules/travel-and-trek-app-core/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
