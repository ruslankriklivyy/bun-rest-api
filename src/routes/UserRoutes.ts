import express from "express";
const router = express.Router();

import UserController from "../controllers/UserController";

router.get("/users/:id", UserController.findOne);
router.get("/users", UserController.findAll);

export default router;
