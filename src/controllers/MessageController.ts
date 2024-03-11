import type { Server } from "socket.io";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import MessageService from "@/services/MessageService.ts";
import type { RequestAuth } from "@/types/common/RequestAuth";

class MessageController {
  socket: Server;

  constructor(socket: Server) {
    this.socket = socket;
  }

  findAllByChat = async (req: Request, res: Response) => {
    try {
      const chatId = +req.params.chatId;
      const messages = await MessageService.findAllByChat(chatId);

      res.json(messages);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const chatId = +req.params.chatId;
      const userId = +(req as RequestAuth).user.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newMessage = await MessageService.createOne({
        ...req.body,
        chat_id: chatId,
        sender_id: userId,
      });

      res.json(newMessage);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  };
}

export default MessageController;
