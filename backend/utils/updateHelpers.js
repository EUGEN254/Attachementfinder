import { uploadToCloudinary } from "../configs/cloudinary.js";
import fs from "fs";
import { cleanupUploadedFile } from "../middleware/uploadMiddleware.js";
import logger from "./logger.js";
import sql from "../configs/connectDB.js";

// Build SET clause for update query
export const buildUpdateSetClause = (updates) => {
  const setClauses = [];
  const values = [];
  let index = 1;

  // Map of database column names to update
  const fieldMap = {
    title: 'title',
    description: 'description',
    requirements: 'requirements',
    location: 'location',
    internship_type: 'internship_type',
    duration: 'duration',
    stipend: 'stipend',
    application_deadline: 'application_deadline',
    required_skills: 'required_skills',
    max_applications: 'max_applications',
    experience_level: 'experience_level',
    perks: 'perks',
    responsibilities: 'responsibilities',
    is_active: 'is_active'
  };

  Object.keys(updates).forEach(key => {
    if (fieldMap[key] && updates[key] !== undefined) {
      setClauses.push(`${fieldMap[key]} = $${index}`);
      
      // Handle arrays - stringify for database
      if (Array.isArray(updates[key])) {
        values.push(JSON.stringify(updates[key]));
      } else {
        values.push(updates[key]);
      }
      
      index++;
    }
  });

  return {
    setClause: setClauses.join(', '),
    values
  };
};

// Handle image update
export const handleImageUpdate = async (uploadedFile, oldImagePublicId, deleteFromCloudinary) => {
  if (!uploadedFile) return null;
  
  try {
    logger.info(`Processing uploaded file: ${uploadedFile.originalname}`);

    const fileBuffer = fs.readFileSync(uploadedFile.path);
    const base64Image = `data:${uploadedFile.mimetype};base64,${fileBuffer.toString("base64")}`;

    logger.db(`Uploading image to Cloudinary`);
    const cloudinaryResult = await uploadToCloudinary(base64Image, "internships");

    // Delete old image if exists
    if (oldImagePublicId) {
      await deleteFromCloudinary(oldImagePublicId);
      logger.db(`Deleted old image: ${oldImagePublicId}`);
    }

    // Clean up local file
    cleanupUploadedFile(uploadedFile.path);
    logger.db(`Local file cleaned up`);

    return {
      url: cloudinaryResult.url,
      public_id: cloudinaryResult.public_id,
    };
  } catch (uploadError) {
    logger.error(`Image upload failed: ${uploadError.message}`);
    cleanupUploadedFile(uploadedFile.path);
    throw uploadError;
  }
};

// Check if internship exists and user owns it
export const checkInternshipOwnership = async (internshipId, userId) => {
  const result = await sql`
    SELECT i.*, c.user_id as company_user_id
    FROM internships i
    JOIN companies c ON i.company_id = c.user_id
    WHERE i.id = ${internshipId}
  `;
  
  if (result.length === 0) {
    return { error: 'Internship not found', status: 404 };
  }
  
  const internship = result[0];
  
  // Check if the user owns this internship
  if (internship.company_user_id !== userId) {
    return { error: 'You do not have permission to update this internship', status: 403 };
  }
  
  return { internship };
};