import express from "express";

import FileController from "../controllers/FileController.ts";

const router = express.Router();

router.post("/files", FileController.createOne);
router.delete("/files/:id", FileController.deleteOne);

export default router;
