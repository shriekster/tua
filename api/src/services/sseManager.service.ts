import { createSession, createChannel } from "better-sse";
import type { Session, Channel } from "better-sse";
import type { Request, Response } from "express";
import { eventEmitter } from "@/services/events.service";

const usersChannel = createChannel();
const adminsChannel = createChannel();

export type ChannelName = "users" | "admins";
export type EventName = "online_users";

eventEmitter.on("online_users", (onlineUsers) => {
  console.log("ONLINE USERS EVENT", onlineUsers);
  broadcast({ onlineUsers }, "online_users", "admins");
});

const getChannel = (channelName: ChannelName) => {
  switch (channelName) {
    case "admins":
      return adminsChannel;

    case "users":
      return usersChannel;
  }
};

export const createCustomSession = async (
  req: Request,
  res: Response,
  channelName: ChannelName
): Promise<Session> => {
  const channel = getChannel(channelName);
  const session = await createSession(req, res);

  channel.register(session);

  session.on("disconnected", () => {
    channel.deregister(session);
    session.removeAllListeners();
  });

  return session;
};

export const getOnlineUsers = () => {
  console.log(
    usersChannel.sessionCount,
    usersChannel.activeSessions?.[0]?.state
  );
  return usersChannel.activeSessions.length;
};

export const broadcast = (
  data: unknown,
  eventName: EventName,
  channelName: ChannelName
) => {
  const channel = getChannel(channelName);
  channel.broadcast(data, eventName);
};
