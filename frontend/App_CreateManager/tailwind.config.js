/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Enable Just-In-Time mode
  content: ["./src/**/*.{html,ts,scss}", "./projects/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
