// @ts-check
import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

// TODO: investigate this: https://shadcn-solid.com/docs/installation/astro#update-astro-tailwind-config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  integrations: [solidJs()],
  output: "server",
  env: {
    schema: {
      PORT: envField.number({
        context: "server",
        access: "secret",
        optional: true,
        default: 4321,
      }),
      ALLOWED_ORIGIN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      DEFAULT_SESSION_DURATION: envField.number({
        context: "server",
        access: "secret",
        optional: true,
        default: 604800000, // 1 week
      }),
      SMS_TO_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      // TODO: this is legacy configuration, find a better solution
      ADMIN_USERNAME: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      ADMIN_PASSWORD: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      ADMIN_DISPLAY_NAME: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      ADMIN_PHONE_NUMBER: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      //
      NODE_ENV: envField.string({
        context: "server",
        access: "secret",
        default: "development",
      }),
    },
    validateSecrets: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
