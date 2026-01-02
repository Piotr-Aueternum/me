import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component("./src/components/MarkdocImage.astro"),
    },
    link: {
      ...nodes.link,
      render: component("./src/components/MarkdocLink.astro"),
    },
  },
  extends: [
    shiki({
      // Choose from Shiki's built-in themes (or add your own)
      // Default: 'github-dark'
      // https://shiki.style/themes
      themes: {
        light: "rose-pine-dawn",
        dark: "vitesse-dark",
      },
      // Pass custom languages
      // Note: Shiki has countless langs built-in, including `.astro`!
      // https://shiki.style/languages
      langs: [],
    }),
  ],
});
