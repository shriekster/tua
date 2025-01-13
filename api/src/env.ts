import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.number({ coerce: true }),
    ALLOWED_ORIGIN: z.string(),
    DATABASE_URL: z.string(),
    SESSION_DURATION: z.number({ coerce: true }),
    SMS_TO_API_KEY: z.string(),

    ADMIN_USERNAME: z.string(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_DISPLAY_NAME: z.string(),
    ADMIN_PHONE_NUMBER: z.string(),

    NODE_ENV: z.union([z.literal("production"), z.literal("development")]),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
