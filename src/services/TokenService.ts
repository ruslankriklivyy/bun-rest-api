import { PrismaClient } from "@prisma/client";

import UserService from "./UserService.ts";
import createJWTToken from "../helpers/createJWTToken.ts";

interface CreateTokenPayload {
  userId: number;
}

class TokenService {
  private readonly prisma = new PrismaClient();

  async create({ userId }: CreateTokenPayload) {
    const user = await UserService.findOne({ userId });

    if (!user) throw new Error("User not found");

    const accessToken = createJWTToken({
      id: user.id,
      email: user.email,
      password: user.password,
    });

    return this.prisma.token.create({
      data: {
        user_id: user.id,
        access_token: accessToken,
      },
    });
  }
}

export default new TokenService();
