import { userService } from "@/services/api/user";
import { sessionService } from "@/services/api/session";
import { delay } from "@/lib/utils";
import { loginSchema } from "@/validation/api/login.schema";
import { LOGIN_DURATION } from "@/constants/api";
import { getRequestBody } from "@/lib/request";
import type { APIRoute } from "astro";

// TODO: find a simple and CORRECT solution for a generic validator
export const POST: APIRoute = async ({ request, cookies }) => {
  const start = performance.now();

  const body = await getRequestBody(request);

  if (body) {
    const validationResult = loginSchema.safeParse(body);

    if (validationResult.success) {
      const { username, password } = validationResult.data;
      const user = await userService.verifyCredentials(username, password);

      if (!user) {
        const elapsed = performance.now() - start;
        await delay(LOGIN_DURATION - elapsed);

        return new Response(
          JSON.stringify({
            message: "Unauthorized",
          }),
          {
            status: 401,
          }
        );
      } else {
        const { session, token } = await sessionService.createSession(user.id);

        const elapsed = performance.now() - start;
        await delay(LOGIN_DURATION - elapsed);

        if (session && token) {
          cookies.set("session", token, {
            expires: session.expiresAt,
            path: "/",
            sameSite: "strict",
            httpOnly: true,
          });

          return new Response(
            JSON.stringify({
              message: "Hello",
            }),
            {
              status: 200,
            }
          );
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Bad Request",
    }),
    {
      status: 400,
    }
  );
};
