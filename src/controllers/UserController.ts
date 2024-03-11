import type { Request, Response } from "express";
import { omit } from "lodash";

import UserService from "@/services/UserService.ts";

class UserController {
  async findAll(_: Request, res: Response) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const user = await UserService.findOne({ userId });
      res.json(omit(user, "password"));
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error?.message,
      });
    }
  }
}

export default UserController;
