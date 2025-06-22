/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./projects/**/*.{html,ts}",
    "./node_modules/travel-and-trek-app-authentication/projects/app-authentication/**/*.{html,ts,scss}",
    "./node_modules/travel-and-trek-app-core/projects/app-core/**/*.{html,ts,scss}",
    "./node_modules/travel-and-trek-app-dashboard/projects/app-dashboard/**/*.{html,ts,scss}",
    "./node_modules/travel-and-trek-app-create/projects/app-create/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
