import { PrismaClient } from "@prisma/client";

import TokenService from "./TokenService.ts";
import type { UserAuth } from "../types/entities/user/UserAuth";

class AuthService {
  private readonly prisma = new PrismaClient();

  async signIn({ email, password }: UserAuth) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw Error("User not found");

      const isPasswordsMatch = await Bun.password.verify(
        password,
        user.password
      );

      if (!isPasswordsMatch) throw Error("User password or email is wrong");

      const token = await TokenService.create({ userId: user.id });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        access_token: token.access_token,
      };
    } catch (error) {
      throw new Error("User doesn't sign in");
    }
  }

  async logout(accessToken: string) {
    try {
      const token = await this.prisma.token.findFirst({
        where: { access_token: accessToken },
      });

      if (!token) throw Error();

      await this.prisma.token.delete({ where: { id: token.id } });

      return "User is logout";
    } catch (error) {
      throw new Error("User doesn't logout");
    }
  }
}

export default new AuthService();
