import express from "express";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";

import { createRoutes } from "@/core/routes.ts";
import { createSocket } from "@/core/socket.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const http = createServer(app);
const socket = createSocket(http);

app.use(express.static(path.join(__dirname, "/public")));

createRoutes(app, socket);

http.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
