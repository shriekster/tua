import { verify } from "@node-rs/argon2";
import { getDatabaseUser } from "./db.service";
import type { User } from "@/db/schema";

export const verifyCredentials = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = await getDatabaseUser(username);

  if (!user) {
    return null;
  }

  const isCorrectPassword = await verify(user.password, password);

  if (isCorrectPassword) {
    return user;
  }

  return null;
};
