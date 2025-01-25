import { createSession, createChannel } from "better-sse";
import type { Session, Channel } from "better-sse";
import type { Request, Response } from "express";

const usersChannel = createChannel();
const adminsChannel = createChannel();

export type ChannelName = "users" | "admins";

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

export const broadcast = (data: unknown, channelName: ChannelName) => {
  const channel = getChannel(channelName);

  channel.broadcast(data);
};
