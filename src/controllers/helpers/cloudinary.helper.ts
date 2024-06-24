import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "",
  api_key: process.env.CLOUD_API_KEY || "",
  api_secret: process.env.CLOUD_API_SECRET || "",
});

interface UploadOptions {
  resource_type: "auto";
  public_id: string;
  folder: string;
}

export const handleUpload = async (file: Express.Multer.File, folderName: string): Promise<UploadApiResponse> => {
  try {
    // console.log("Cloudinary Configuration:");
    // console.log("cloud_name:", process.env.CLOUD_NAME);
    // console.log("api_key:", process.env.CLOUD_API_KEY);
    // console.log("api_secret:", process.env.CLOUD_API_SECRET);

    const uploadOptions: UploadOptions = {
      resource_type: "auto",
      public_id: file.originalname,
      folder: folderName,
    };

    console.log("Uploading file:", file.originalname);
    const res = await cloudinary.uploader.upload(file.path, uploadOptions);
    console.log("File upload successful. Cloudinary response:", res);

    return res as UploadApiResponse;
  } catch (error: any) {
    console.error(`Error uploading image to Cloudinary: ${error.message}`);
    throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
  }
};
