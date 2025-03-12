import { verify } from "@node-rs/argon2";
import { dbService } from "./db";
import type { User } from "@/db/schema";

class UserService {
  private static instance: UserService;
  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async verifyCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    const user = await dbService.getUser(username);

    if (!user) {
      return null;
    }

    const isCorrectPassword = await verify(user.password, password);

    if (isCorrectPassword) {
      return user;
    }

    return null;
  }
}

export const userService = UserService.getInstance();
