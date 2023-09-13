const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    fontFamily: {
      sans: ["Dosis", ...defaultTheme.fontFamily.sans],
      serif: ["Hepta Slab", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      width: {
        screen: ["100vw", "100dvw"],
      },
    },
  },
  plugins: [],
};
