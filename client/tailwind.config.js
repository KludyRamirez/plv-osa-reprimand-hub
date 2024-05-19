/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "479px" },
        tablet: { max: "639px" }, 
        desktop: { max: "1023px" },
      },
    },
  },
  plugins: [],
};
