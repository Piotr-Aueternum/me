/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // needs to be last
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
