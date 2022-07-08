/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  lightMode: "class",
  daisyui: { themes: ["light", "dark"] },
  theme: {
    extend: {
      screens: {
        sm: "425px",
        md: "768px",
        lg: "1024px",
        hd: "1920px",
        mba: "2560px",
      },
    },
  },
  plugins: [require("daisyui")],
};
