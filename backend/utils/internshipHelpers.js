import logger from "./logger.js";
import { uploadToCloudinary } from "../configs/cloudinary.js";
import fs from "fs";
import { cleanupUploadedFile } from "../middleware/uploadMiddleware.js";
import sql from "../configs/connectDB.js";

// Send consistent error responses
export const sendErrorResponse = (res, status, message, errors = null, uploadedFile = null) => {
  if (uploadedFile) {
    cleanupUploadedFile(uploadedFile.path);
  }
  
  const response = {
    success: false,
    message,
  };
  
  if (errors) {
    response.errors = Array.isArray(errors) ? errors : [errors];
  }
  
  if (process.env.NODE_ENV === "development" && errors) {
    response.error = typeof errors === 'string' ? errors : JSON.stringify(errors);
  }
  
  return res.status(status).json(response);
};

// Handle validation errors
export const handleValidationError = (error, uploadedFile, res) => {
  logger.warn(
    `Validation error: ${error.details.map((d) => d.message).join(", ")}`,
  );
  
  const errors = error.details.map((detail) => detail.message);
  return sendErrorResponse(res, 400, "Validation error", errors, uploadedFile);
};

// Check company authorization
export const checkCompanyAuth = (user, uploadedFile, res) => {
  if (user?.userType !== "company") {
    logger.warn(`Non-company user ${user?.id} attempted to create internship`);
    return sendErrorResponse(
      res, 
      403, 
      "Only companies can create internships", 
      null, 
      uploadedFile
    );
  }
  return null; // No error
};

// Get company ID
export const getCompanyId = async (userId, uploadedFile, res) => {
  logger.db(`Fetching company profile for user: ${userId}`);
  const companyResult = await sql`
    SELECT user_id FROM companies 
    WHERE user_id = ${userId} 
    LIMIT 1
  `;

  if (companyResult.length === 0) {
    logger.warn(`Company profile not found for user: ${userId}`);
    return {
      error: sendErrorResponse(
        res, 
        404, 
        "Company profile not found for the user", 
        null, 
        uploadedFile
      ),
    };
  }

  logger.success(`Company profile found: ${companyResult[0].user_id}`);
  return { companyId: companyResult[0].user_id };
};

// Handle image upload
export const processImageUpload = async (uploadedFile) => {
  if (!uploadedFile) return null;

  try {
    logger.info(`Processing uploaded file: ${uploadedFile.originalname}`);

    const fileBuffer = fs.readFileSync(uploadedFile.path);
    const base64Image = `data:${uploadedFile.mimetype};base64,${fileBuffer.toString("base64")}`;

    logger.db(`Uploading image to Cloudinary`);
    const cloudinaryResult = await uploadToCloudinary(
      base64Image,
      "internships",
    );

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

// Create activity log
export const createActivityLog = async (userId, entityId, action, details = {}) => {
  logger.db(`Creating activity log: ${action}`);
  
  // Ensure details is an object
  const detailsObj = typeof details === 'object' ? details : { title: details };
  
  await sql`
    INSERT INTO activity_logs (
      user_id, action, entity_type, entity_id, details
    ) VALUES (
      ${userId}, ${action}, ${"internship"}, ${entityId}, 
      ${JSON.stringify(detailsObj)}
    )
  `;
  logger.success(`Activity log created for ${action}`);
};

// Clean up file on error
export const cleanupOnError = (uploadedFile) => {
  if (uploadedFile) {
    try {
      cleanupUploadedFile(uploadedFile.path);
      logger.db(`Cleaned up file after error`);
    } catch (cleanupError) {
      logger.error(`Failed to cleanup file: ${cleanupError.message}`);
    }
  }
};

// Build WHERE conditions dynamically
export const buildWhereConditions = (filters) => {
  const conditions = [];
  const values = [];

  const {
    internship_type,
    location,
    experience_level,
    min_stipend,
    max_stipend,
    search,
    is_active,
    company_id,
    skills,
  } = filters;

  logger.dev("Building WHERE conditions with filters:", filters);

  // Add filters only if they exist
  if (internship_type) {
    conditions.push(`i.internship_type = $${conditions.length + 1}`);
    values.push(internship_type);
  }

  if (location) {
    conditions.push(`i.location ILIKE $${conditions.length + 1}`);
    values.push(`%${location}%`);
  }

  if (experience_level) {
    conditions.push(`i.experience_level = $${conditions.length + 1}`);
    values.push(experience_level);
  }

  if (min_stipend !== undefined && min_stipend !== null && min_stipend !== "") {
    conditions.push(`
      CAST(REGEXP_REPLACE(i.stipend, '[^0-9]', '', 'g') AS INTEGER) >= $${conditions.length + 1}
    `);
    values.push(parseInt(min_stipend, 10));
  }

  if (max_stipend !== undefined && max_stipend !== null && max_stipend !== "") {
    conditions.push(`
      CAST(REGEXP_REPLACE(i.stipend, '[^0-9]', '', 'g') AS INTEGER) <= $${conditions.length + 1}
    `);
    values.push(parseInt(max_stipend, 10));
  }

  if (search) {
    conditions.push(
      `(i.title ILIKE $${conditions.length + 1} OR i.description ILIKE $${conditions.length + 1})`,
    );
    values.push(`%${search}%`);
  }

  if (is_active !== undefined && is_active !== null) {
    conditions.push(`i.is_active = $${conditions.length + 1}`);
    values.push(is_active);
  }

  if (company_id) {
    conditions.push(`i.company_id = $${conditions.length + 1}`);
    values.push(company_id);
  }

  if (skills) {
    const skillsArray = skills.split(",").map((s) => s.trim());
    skillsArray.forEach((skill) => {
      conditions.push(
        `i.required_skills::text ILIKE $${conditions.length + 1}`,
      );
      values.push(`%${skill}%`);
    });
  }

  return {
    whereClause:
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    values,
  };
};

// Get total count for pagination
export const getTotalCount = async (whereClause, values) => {
  try {
    let query = "SELECT COUNT(*) as total FROM internships i";
    const safeValues = Array.isArray(values) ? values : [];

    if (whereClause) {
      query += " " + whereClause;
    }

    logger.dev("Count query:", query);
    logger.dev("Count values:", safeValues);

    const result = await sql.query(query, safeValues);

    if (result && result.length > 0) {
      return parseInt(result[0]?.total || 0, 10);
    }

    return 0;
  } catch (error) {
    logger.error(`Error in getTotalCount: ${error.message}`);
    return 0;
  }
};

// Get paginated internships with company details
export const getPaginatedInternships = async (
  sortOptions,
  pagination,
  whereClause,
  values,
) => {
  try {
    const { sort_by, sort_order } = sortOptions;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    // Ensure values is an array
    const safeValues = Array.isArray(values) ? values : [];

    // Convert to integers
    const limitInt = Number(limit);
    const offsetInt = Number(offset);

    // Validate that they're valid numbers
    if (isNaN(limitInt) || isNaN(offsetInt)) {
      throw new Error("Limit and offset must be valid numbers");
    }

    logger.dev("safeValues:", safeValues);
    logger.dev("limit:", limitInt, "offset:", offsetInt);

    // Calculate parameter indices
    const valueCount = safeValues.length;
    const limitParamIndex = valueCount + 1;
    const offsetParamIndex = valueCount + 2;

    // Build the query string
    const query = `
      SELECT 
        i.id,
        i.title,
        i.description,
        i.requirements,
        i.location,
        i.internship_type,
        i.duration,
        i.stipend,
        i.application_deadline,
        i.required_skills,
        i.max_applications,
        i.experience_level,
        i.perks,
        i.responsibilities,
        i.image_url,
        i.posted_at,
        i.is_active,
        c.company_name,
        c.user_id as company_id
      FROM internships i
      JOIN companies c ON i.company_id = c.user_id
      ${whereClause}
      ORDER BY i.${sort_by} ${sort_order}
      LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}
    `;

    // Add limit and offset to values
    const allValues = [...safeValues, limitInt, offsetInt];

    logger.dev("Data query:", query);
    logger.dev("All values:", allValues);

    // Execute the query
    const result = await sql.query(query, allValues);

    return Array.isArray(result) ? result : [];
  } catch (error) {
    logger.error(`Error in getPaginatedInternships: ${error.message}`);
    logger.dev("Stack:", error.stack);
    return [];
  }
};

// Format internship data (parse JSON fields)
export const parseDatabaseArray = (value) => {
  if (!value) return [];

  // If it's already an array, return it
  if (Array.isArray(value)) return value;

  // If it's a string in PostgreSQL array format: {"item1","item2"}
  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    // Remove the curly braces and split by comma
    const content = value.slice(1, -1);
    if (!content) return [];

    // Split by comma but handle quoted strings properly
    const items = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        items.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    // Add the last item
    if (current) items.push(current);

    return items;
  }

  // If it's a JSON string, try to parse it
  if (typeof value === "string" && value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch (e) {
      logger.dev("Failed to parse JSON:", e.message);
      return [];
    }
  }

  return [];
};

// Build pagination metadata
export const buildPagination = (page, limit, total) => {
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const totalNum = Number(total) || 0;

  const totalPages = Math.ceil(totalNum / limitNum);

  return {
    page: pageNum,
    limit: limitNum,
    total: totalNum,
    total_pages: totalPages || 0,
    has_next: pageNum < totalPages,
    has_previous: pageNum > 1,
  };
};