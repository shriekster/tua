import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.number(),
    ORIGIN: z.string().url(),
    DATABASE_URL: z.string(),
    SESSION_DURATION: z.number(),
    SMS_TO_API_KEY: z.string(),

    NODE_ENV: z.union([z.literal("production"), z.literal("development")]),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
