// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://udaipurtransporter.netlify.app",
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
  },

  integrations: [sitemap()],
  redirects: {
    "/enquiry": "/contact",
  },
});
