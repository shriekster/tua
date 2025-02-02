import type { EnvSchema } from "node_modules/astro/dist/env/schema";
import { envField } from "astro/config";

type Env = {
  schema?: EnvSchema;
  validateSecrets?: boolean;
};

export const env: Env = {
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
};
