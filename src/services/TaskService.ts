import { PrismaClient } from "@prisma/client";

import type { CreateTaskPayload } from "../types/entities/task/CreateTaskPayload";
import type { UpdateTaskPayload } from "../types/entities/task/UpdateTaskPayload";

interface FindOneTaskPayload {
  taskId: number;
}

interface FindAllTasksPayload {
  userId?: number;
}

class TaskService {
  private readonly prisma = new PrismaClient();

  findOne({ taskId }: FindOneTaskPayload) {
    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  findAll(payload: FindAllTasksPayload) {
    const where: Record<string, any> = {};

    if (payload?.userId) {
      where["user_id"] = payload.userId;
    }

    return this.prisma.task.findMany({ where });
  }

  async createOne(payload: CreateTaskPayload) {
    try {
      return await this.prisma.task.create({
        data: { ...payload, end_date: new Date(payload.end_date) },
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async updateOne(taskId: number, payload: UpdateTaskPayload) {
    try {
      return await this.prisma.task.update({
        where: { id: taskId },
        data: { ...payload, end_date: new Date(payload.end_date) },
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async deleteOne(taskId: number) {
    try {
      return await this.prisma.task.delete({ where: { id: taskId } });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}

export default new TaskService();
