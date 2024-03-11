import { Server } from "socket.io";
import http from "http";

export const createSocket = (http: http.Server) => {
  const io = new Server(http);

  io.on("connection", function (socket) {
    socket.on("CHATS:JOIN", (chatId: string) => {
      (socket as any)["chat_id"] = chatId;
      socket.join(chatId);
    });

    socket.on("CHATS:TYPING", (obj) => {
      socket.broadcast.emit("CHATS:TYPING", obj);
    });
  });

  return io;
};
