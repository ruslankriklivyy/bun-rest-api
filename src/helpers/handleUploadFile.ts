import path from "path";
import type { Request, Response } from "express";
import multer from "multer";

import {
  MAX_FILE_SIZE,
  UPLOAD_FILES_DESTINATION,
  AVAILABLE_FILES_EXTENSIONS,
  AVAILABLE_FILES_MIME_TYPES,
} from "@/consts";

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: UPLOAD_FILES_DESTINATION,
  filename(
    _: Express.Request,
    file: Express.Multer.File,
    fn: (error: Error | null, filename: string) => void
  ): void {
    fn(
      null,
      `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

const uploadFile = multer({
  storage: storageFile,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter(req, file, callback) {
    const isAvailableExtension: boolean =
      AVAILABLE_FILES_EXTENSIONS.indexOf(
        path.extname(file.originalname).toLowerCase()
      ) >= 0;
    const isAvailableMimeType: boolean =
      AVAILABLE_FILES_MIME_TYPES.indexOf(file.mimetype) >= 0;

    if (isAvailableExtension && isAvailableMimeType) {
      return callback(null, true);
    }

    callback(
      new Error(
        "Invalid file type. Only picture file on type PNG and JPG are allowed!"
      )
    );
  },
}).single("image");

const handleSingleUploadFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  return new Promise((resolve, reject): void => {
    uploadFile(req, res, (error) => {
      if (error) {
        reject(error);
      }

      resolve({ file: req.file, body: req.body });
    });
  });
};

export { handleSingleUploadFile };
