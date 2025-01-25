import type { Login } from "@/types/auth";

export const login = async (credentials: Login) => {
  try {
    const response = await fetch("/api/sessions", {
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

export const logout = async () => {
  try {
    const response = await fetch("/api/sessions/current", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("🚨", error);
    return false;
  }
};
