import type { LoginData } from "@/types/ui";
import { z } from "zod";
import { http } from "./http";

export const login = async (credentials: LoginData) =>
  http.post("/api/admin/sessions", credentials, {
    schema: z.object({
      message: z.string(),
    }),
  });
