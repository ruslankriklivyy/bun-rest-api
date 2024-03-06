import express from "express";
import dotenv from "dotenv";

dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";

import checkAuth from "./src/middlewares/checkAuth.ts";
import UserRoutes from "./src/routes/UserRoutes.ts";
import AuthRoutes from "./src/routes/AuthRoutes.ts";
import TaskRoutes from "./src/routes/TaskRoutes.ts";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(checkAuth);
app.use("/api", UserRoutes, AuthRoutes, TaskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
