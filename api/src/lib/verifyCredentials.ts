import type { Request } from "express";
import { verify } from "@node-rs/argon2";
import { queryUser } from "@/db/statements";
import type { User } from "@/db/schema";

export const verifyCredentials = async (req: Request): Promise<User | null> => {
  const { username: userName, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await queryUser.get({
    userName,
  });

  if (!user) {
    return null;
  }

  const isCorrectPassword = await verify(user.password, password);

  if (isCorrectPassword) {
    return user;
  }

  return null;
};
