// import { Request, Response } from "express";
// import {handleUpload} from './helpers/cloudinary.helper'
// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const myUploadMiddleware = upload.single("file");

// const maxSize = parseInt(process.env.MAX_FILE_SIZE_MB || "2", 10);
// const allowedMimeTypes: string[] = ["image/jpeg", "image/png", "application/pdf"];

// function runMiddleware(req: Request, res: Response, fn: Function) {
//   return new Promise<void>((resolve, reject) => {
//     fn(req, res, (err: any) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// }
// export const imageHandler = async (req: Request, res: Response): Promise<{ public_id: string; secure_url: string } | void> => {
//   try {
//     await runMiddleware(req, res, myUploadMiddleware);

//     if (!req.file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }

//     if (req.file.size > maxSize * 1024 * 1024) {
//       res.status(400).json({ error: "File size exceeds the allowed limit" });
//       return;
//     }

//     if (!allowedMimeTypes.includes(req.file.mimetype)) {
//       res.status(400).json({ error: "Invalid file type. Only JPG, PNG, and PDF are allowed." });
//       return;
//     }

//     const folderName = "Image"; 
//     const cldRes = await handleUpload(req.file, folderName);

//     if (!cldRes || !cldRes.secure_url) {
//       throw new Error("Image upload to Cloudinary failed");
//     }

//     return { public_id: cldRes.public_id, secure_url: cldRes.secure_url };
//   } catch (error) {
//     throw error;
//   }
// };


import { Request, Response } from "express";
import { handleUpload } from './helpers/cloudinary.helper';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("file");

const maxSize = parseInt(process.env.MAX_FILE_SIZE_MB || "2", 10);
const allowedMimeTypes: string[] = ["image/jpeg", "image/png", "application/pdf"];

function runMiddleware(req: Request, res: Response, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export const imageHandler = async (req: Request, res: Response): Promise<{ public_id: string; secure_url: string } | void> => {
  try {
    await runMiddleware(req, res, myUploadMiddleware);

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    if (req.file.size > maxSize * 1024 * 1024) {
      res.status(400).json({ error: "File size exceeds the allowed limit" });
      return;
    }

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ error: "Invalid file type. Only JPG, PNG, and PDF are allowed." });
      return;
    }

    const folderName = "Image"; 
    const cldRes = await handleUpload(req.file, folderName);

    if (!cldRes || !cldRes.secure_url) {
      throw new Error("Image upload to Cloudinary failed");
    }

    return { public_id: cldRes.public_id, secure_url: cldRes.secure_url };
  } catch (error) {
    throw error;
  }
};