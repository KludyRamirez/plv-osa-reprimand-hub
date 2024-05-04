/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "479px" }, // Max-width for phone screens
        tablet: { max: "639px" }, // Max-width for tablet screens
        desktop: { max: "1023px" }, // Max-width for desktop screens
      },
    },
  },
  plugins: [],
};
