import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://piotr-sochacz.design",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), markdoc()],
});
