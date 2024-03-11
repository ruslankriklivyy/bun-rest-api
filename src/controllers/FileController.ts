import type { Request, Response } from "express";

import { handleSingleUploadFile } from "../helpers/handleUploadFile.ts";
import type { RequestAuth } from "../types/common/RequestAuth";
import FileService from "../services/FileService.ts";

class FileController {
  async createOne(req: Request, res: Response) {
    try {
      const uploadedData = await handleSingleUploadFile(req, res);
      const newFile = await FileService.create({
        user_id: (req as RequestAuth).user.id,
        type: uploadedData.file.mimetype,
        name: uploadedData.file.filename,
        size: uploadedData.file.size,
        url: uploadedData.file.path,
      });
      res.json(newFile);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const fileId = +req.params.id;
      const deletedFile = await FileService.delete(
        fileId,
        (req as RequestAuth).user.id
      );
      res.json(deletedFile);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }
}

export default new FileController();
