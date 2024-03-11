import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";

import signUpValidation from "@/helpers/validations/auth/sign-up-validation.ts";
import AuthController from "@/controllers/AuthController.ts";
import signInValidation from "@/helpers/validations/auth/sign-in-validation.ts";
import FileController from "@/controllers/FileController.ts";
import TaskController from "@/controllers/TaskController.ts";
import taskValidation from "@/helpers/validations/tasks/task-validation.ts";
import UserController from "@/controllers/UserController.ts";
import checkAuth from "@/middlewares/checkAuth.ts";
import ChatController from "@/controllers/ChatController.ts";
import createChatValidation from "@/helpers/validations/chats/create-chat-validation.ts";
import MessageController from "@/controllers/MessageController.ts";
import createMessageValidation from "@/helpers/validations/messages/create-message-validation.ts";

const router = express.Router();

export const createRoutes = (app: express.Express, socket: Server) => {
  const AuthCtrl = new AuthController();
  const FileCtrl = new FileController();
  const TaskCtrl = new TaskController(socket);
  const UserCtrl = new UserController();
  const ChatCtrl = new ChatController(socket);
  const MessageCtrl = new MessageController(socket);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(checkAuth);

  // Auth Routes
  router.post("/auth/sign-up", signUpValidation, AuthCtrl.signUp);
  router.post("/auth/sign-in", signInValidation, AuthCtrl.signIn);
  router.post("/auth/logout", AuthCtrl.logout);

  // File Routes
  router.post("/files", FileCtrl.createOne);
  router.delete("/files/:id", FileCtrl.deleteOne);

  // Task Routes
  router.get("/tasks/:id", TaskCtrl.findOne);
  router.get("/tasks", TaskCtrl.findAll);
  router.post("/tasks", taskValidation, TaskCtrl.createOne);
  router.put("/tasks/:id", taskValidation, TaskCtrl.updateOne);
  router.delete("/tasks/:id", TaskCtrl.deleteOne);

  // User Routes
  router.get("/users/:id", UserCtrl.findOne);
  router.get("/users", UserCtrl.findAll);

  // Chat Routes
  router.get("/chats", ChatCtrl.findAll);
  router.get("/chats/:id", ChatCtrl.findOne);
  router.post("/chats", createChatValidation, ChatCtrl.createOne);

  // Message Routes
  router.get("/messages/:chatId", MessageCtrl.findAllByChat);
  router.post("/messages", createMessageValidation, MessageCtrl.createOne);

  // Global Prefix
  app.use("/api", router);
};
