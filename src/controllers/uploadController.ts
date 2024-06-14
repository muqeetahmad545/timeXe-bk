import { Request, Response } from "express";
import multer, { Multer } from "multer";
import { handleUpload } from "../helpers/cloudinary.helper";

const storage: Multer["storageEngine"] = multer.memoryStorage();
const upload: Multer = multer({ storage });

const myUploadMiddleware = upload.single("file");
const maxSize: number = parseInt(process.env.MAX_FILE_SIZE_MB || "2", 10);
const allowedMimeTypes: string[] = ["image/jpeg", "image/png", "application/pdf"];

function runMiddleware(req: Request, res: Response, fn: (error?: any) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export const imageHandler = async (req: Request, res: Response): Promise<{ public_id: string; secure_url: string }> => {
  try {
    await runMiddleware(req, res, myUploadMiddleware);
    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }
    if (req.file.size > maxSize * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds the allowed limit" });
    }
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type. Only JPG, PNG, and PDF are allowed.",
      });
    }
    const b64: string = Buffer.from(req.file.buffer).toString("base64");
    const dataURI: string = "data:" + req.file.mimetype + ";base64," + b64;

    const folderName: string = "Image";
    const cldRes: { public_id: string; secure_url: string } = await handleUpload(dataURI, { folderName });

    if (!cldRes || !cldRes.secure_url) {
      throw new Error("Image upload to Cloudinary failed");
    }

    return { public_id: cldRes.public_id, secure_url: cldRes.secure_url };
  } catch (error) {
    throw error;
  }
};
