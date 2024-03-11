import { PrismaClient } from "@prisma/client";

import type { CreateFilePayload } from "../types/entities/file/CreateFilePayload";

class FileService {
  private readonly prisma = new PrismaClient();

  async create(payload: CreateFilePayload) {
    try {
      return await this.prisma.file.create({ data: payload });
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async delete(fileId: number, userId: number) {
    try {
      return await this.prisma.file.delete({
        where: { id: fileId, user_id: userId },
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}

export default new FileService();
