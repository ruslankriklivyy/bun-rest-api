import { PrismaClient } from "@prisma/client";

import generatePasswordHash from "../helpers/generatePasswordHash.ts";
import TokenService from "./TokenService.ts";
import type { CreateUser } from "../types/entities/user/CreateUser";

interface UserFindOnePayload {
  userId: number;
}

interface UserCreateOnePayload {
  data: CreateUser;
}

class UserService {
  private readonly prisma = new PrismaClient();

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  findOne({ userId }: UserFindOnePayload) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async create({ data }: UserCreateOnePayload) {
    const hashedPassword = await generatePasswordHash(data.password);
    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    await TokenService.create({ userId: newUser.id });

    return newUser;
  }
}

export default new UserService();
