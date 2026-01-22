import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

export default defineConfig({
  redirects: {
    "/[year]/[month]/[slug]": "/blog/[year]/[month]/[slug]",
  },
  site: "https://piotr-sochacz.design",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic()],
});
