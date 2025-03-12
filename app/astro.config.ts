// @ts-check
import { defineConfig } from "astro/config";
// import { defineConfig, envField } from "astro/config";

import solidJs from "@astrojs/solid-js";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

import { env } from "./src/env-schema";

export default defineConfig({
  integrations: [solidJs()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  env,
  vite: {
    plugins: [tailwindcss()],
  },
});
