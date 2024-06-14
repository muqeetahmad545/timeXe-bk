import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface File {
  originalname: string;
  buffer: Buffer;
}

interface FolderOptions {
  folderName: string;
}

export const handleUpload = async (file: File, folderName: FolderOptions): Promise<any> => {
  try {
    const uploadOptions = {
      resource_type: "auto",
      public_id: file.originalname,
      folder: folderName.folderName,
    };

    const res = await cloudinary.uploader.upload(file.buffer, uploadOptions);
    return res;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary: " + error.message);
  }
};

