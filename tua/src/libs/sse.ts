import { createChannel } from "better-sse";
import type { Session, DefaultSessionState } from "better-sse";

const channel = createChannel();

const registerSession = (session: Session) => {
  channel.register(session);
};

const deregisterSession = (session: Session) => {
  channel.deregister(session);
};

const broadcast = (data: unknown) => {
  channel.broadcast(data);
};

export { registerSession, deregisterSession, broadcast };
