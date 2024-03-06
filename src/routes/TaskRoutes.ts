import express from "express";
const router = express.Router();

import TaskController from "../controllers/TaskController.ts";
import taskValidation from "../helpers/validations/tasks/task-validation.ts";

router.get("/tasks/:id", TaskController.findOne);
router.get("/tasks", TaskController.findAll);
router.post("/tasks", taskValidation, TaskController.createOne);
router.put("/tasks/:id", taskValidation, TaskController.updateOne);
router.delete("/tasks/:id", TaskController.deleteOne);

export default router;
