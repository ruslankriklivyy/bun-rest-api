import type { Server } from "socket.io";
import { validationResult } from "express-validator";
import type { Request, Response } from "express";

import type { RequestAuth } from "@/types/common/RequestAuth";
import ChatService from "@/services/ChatService.ts";
import ChatsUsersService from "@/services/ChatsUsersService.ts";

class ChatController {
  socket: Server;

  constructor(socket: Server) {
    this.socket = socket;
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const userId = (req as RequestAuth).user.id;
      const chats = await ChatService.findAllByUser(userId);

      res.json(chats);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const chatId = +req.params.id;
      const userId = (req as RequestAuth).user.id;
      const chat = await ChatService.findOne(chatId, userId);

      res.json(chat);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newChat = await ChatService.createOne({
        name: req.body.name,
      });

      await ChatsUsersService.createMany({
        chatId: newChat.id,
        membersIds: req.body.members_ids,
      });

      this.socket.emit("CHATS:NEW_CHAT", newChat);
      res.json(newChat);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  };
}

export default ChatController;
