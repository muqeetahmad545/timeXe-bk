
// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import dotenv from "dotenv";
// import { Readable } from "stream";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME || "dfbsbullu",
//   api_key: process.env.CLOUD_API_KEY || "551785228467189",
//   api_secret: process.env.CLOUD_API_SECRET || "A1Ytz_3SebjVv52aDnrMFYuxN-o",
// });


// interface UploadOptions {
//   resource_type: "auto";
//   public_id: string;
//   folder: string;
// }

// export const handleUpload = async (file: Express.Multer.File, folderName: string): Promise<UploadApiResponse> => {
//   return new Promise((resolve, reject) => {
//     const uploadOptions: UploadOptions = {
//       resource_type: "auto",
//       public_id: file.originalname,
//       folder: folderName,
//     };

//     const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//       if (error) {
//         return reject(new Error(`Error uploading image to Cloudinary: ${error.message}`));
//       }
//       resolve(result as UploadApiResponse);
//     });

//     const readableStream = new Readable();
//     readableStream.push(file.buffer);
//     readableStream.push(null);
//     readableStream.pipe(uploadStream);
//   });
// };


import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

// Remove dotenv import and dotenv.config()

cloudinary.config({
  cloud_name: "dfbsbullu", // Hardcoded Cloudinary cloud name
  api_key: "551785228467189", // Hardcoded Cloudinary API key
  api_secret: "A1Ytz_3SebjVv52aDnrMFYuxN-o", // Hardcoded Cloudinary API secret
});

interface UploadOptions {
  resource_type: "auto";
  public_id: string;
  folder: string;
}

export const handleUpload = async (file: Express.Multer.File, folderName: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: UploadOptions = {
      resource_type: "auto",
      public_id: file.originalname,
      folder: folderName,
    };

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        return reject(new Error(`Error uploading image to Cloudinary: ${error.message}`));
      }
      resolve(result as UploadApiResponse);
    });

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};
