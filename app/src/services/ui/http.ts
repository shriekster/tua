import { createHttpClient } from "@/lib/httpClient";
import { APP_URL } from "astro:env/client";

export const http = createHttpClient({
  baseUrl: APP_URL,
});
