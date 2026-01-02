import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://piotr-sochacz.design",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic()],
});
