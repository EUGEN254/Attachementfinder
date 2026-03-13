import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, folder = "internships") => {
  try {
    // If file is a base64 string
    if (file && file.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(file, {
        folder: folder,
        resource_type: "auto",
      });
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    return null;
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    logger.error("Cloudinary delete error:", error);
    //we cant throw an erro here because we dont want to fail the main operation if deletion fails, we just log it
  }
};

export default cloudinary;
