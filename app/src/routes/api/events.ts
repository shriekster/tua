import type { APIEvent } from "@solidjs/start/server";
import { createSession } from "better-sse";
import { registerSession, deregisterSession } from "@/libs/sse";

export async function GET(event: APIEvent) {
  console.debug({ cookies: event.request.headers.get("Cookie") });

  event.response.headers.append("Set-Cookie", "test=TEST");
  const session = await createSession(
    event.nativeEvent.node.req,
    event.nativeEvent.node.res,
    {
      trustClientEventId: false,
    }
  );

  registerSession(session);

  let counter = 0;
  setInterval(() => {
    if (session.isConnected) {
      session.push(counter, "counter", "some-id");
      counter++;
    }
  }, 1000);

  session.on("disconnected", () => {
    deregisterSession(session);
    console.debug("SESSION DISCONNECTED");
  });
}
