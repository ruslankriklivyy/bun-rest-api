import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";

import checkAuth from "./src/middlewares/checkAuth.ts";
import UserRoutes from "./src/routes/UserRoutes.ts";
import AuthRoutes from "./src/routes/AuthRoutes.ts";
import TaskRoutes from "./src/routes/TaskRoutes.ts";
import FileRoutes from "./src/routes/FileRoutes.ts";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(bodyParser.json());
app.use(checkAuth);
app.use("/api", UserRoutes, AuthRoutes, TaskRoutes, FileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
