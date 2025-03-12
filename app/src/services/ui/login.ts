import type { LoginData } from "@/types/ui";

export const login = async (credentials: LoginData) => {
  try {
    const response = await fetch("/api/admin/sessions", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    });

    return response.ok;
  } catch (error) {
    console.error("🚨", error);
    return false;
  }
};
