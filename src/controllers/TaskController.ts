import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Server } from "socket.io";

import TaskService from "@/services/TaskService";
import type { RequestAuth } from "@/types/common/RequestAuth";

class TaskController {
  private socket: Server;

  constructor(socket: Server) {
    this.socket = socket;
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await TaskService.findAll({
        userId: (req as RequestAuth).user.id,
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      const task = await TaskService.findOne({ taskId });
      res.json(task);
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async createOne(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const createdTask = await TaskService.createOne({
        ...req.body,
        user_id: (req as RequestAuth).user.id,
      });

      this.socket.emit("TASKS:TASK_CREATED", createdTask);
      res.json(createdTask);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async updateOne(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const updatedTask = await TaskService.updateOne(taskId, req.body);
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      const deletedTask = await TaskService.deleteOne(taskId);

      this.socket.emit("TASKS:TASK_DELETED");
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }
}

export default TaskController;
