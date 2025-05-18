import { createHttpClient } from "@/lib/httpClient";
import { PUBLIC_APP_URL } from "astro:env/client";

export const http = createHttpClient({
  baseUrl: PUBLIC_APP_URL,
});
