import { defineMarkdocConfig } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [
    shiki({
      // Choose from Shiki's built-in themes (or add your own)
      // Default: 'github-dark'
      // https://shiki.style/themes
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      defaultColor: "light-dark()",
      // Pass custom languages
      // Note: Shiki has countless langs built-in, including `.astro`!
      // https://shiki.style/languages
      langs: [],
    }),
  ],
});
