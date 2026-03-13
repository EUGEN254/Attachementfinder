import fs from "fs";
import {
  bulkDeleteSchema,
  createInternshipSchema,
  getInternshipsSchema,
  updateInternshipSchema,
} from "../validations/internshipValidation.js";
import logger from "../utils/logger.js";
import {
  handleValidationError,
  checkCompanyAuth,
  getCompanyId,
  processImageUpload,
  createActivityLog,
  cleanupOnError,
  buildPagination,
  buildWhereConditions,
  getPaginatedInternships,
  getTotalCount,
  parseDatabaseArray,
  sendErrorResponse, // You may want to add this helper
} from "../utils/internshipHelpers.js";
import { createInternshipInDB } from "../services/internshipService.js";

import sql from "../configs/connectDB.js";
import { deleteFromCloudinary } from "../configs/cloudinary.js";
import { cleanupUploadedFile } from "../middleware/uploadMiddleware.js";

export const createInternship = async (req, res) => {
  const uploadedFile = req.file;

  try {
    logger.info(`Creating internship for user: ${req.user?.id}`);

    // 1. Validate input
    const { error, value } = createInternshipSchema.validate(req.body);
    if (error) return handleValidationError(error, uploadedFile, res);

    // 2. Check authorization
    const authError = checkCompanyAuth(req.user, uploadedFile, res);
    if (authError) return authError;

    // 3. Get company ID
    const { companyId, error: companyError } = await getCompanyId(
      req.user.id,
      uploadedFile,
      res,
    );
    if (companyError) return companyError;

    // 4. Handle image upload
    let imageData = null;
    if (uploadedFile) {
      try {
        imageData = await processImageUpload(uploadedFile);
      } catch (uploadError) {
        await cleanupUploadedFile(uploadedFile.path);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }

    // 5. Create internship in database
    logger.db(`Inserting internship into database`);
    const result = await createInternshipInDB(companyId, value, imageData);
    const newInternship = result[0];
    logger.success(`Internship created with ID: ${newInternship.id}`);

    // 6. Format the response data
    const formattedData = {
      ...newInternship,
      required_skills: parseDatabaseArray(newInternship.required_skills),
      perks: parseDatabaseArray(newInternship.perks),
      responsibilities: parseDatabaseArray(newInternship.responsibilities),
    };

    // 7. Create activity log
    await createActivityLog(req.user.id, newInternship.id, "CREATE", {
      title: value.title,
    });

    // 8. Send response
    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: formattedData,
    });
  } catch (error) {
    logger.error(`Failed to create internship: ${error.message}`);
    logger.dev(error.stack);

    if (uploadedFile) {
      await cleanupUploadedFile(uploadedFile.path);
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

export const getInternships = async (req, res) => {
  try {
    logger.info("Fetching internships with filters");
    logger.dev("Query params received:", req.query);

    // 1. Validate query parameters
    const { error, value } = getInternshipsSchema.validate(req.query);

    if (error) {
      logger.warn("Invalid query parameters: ", error.message);
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        errors: error.details.map((d) => d.message),
      });
    }

    logger.info("Query parameters validated successfully", value);

    // 2. Extract filters and pagination from validated value
    const { page, limit, sort_by, sort_order, ...filters } = value;

    // 3. Build dynamic WHERE clause and parameters
    const { whereClause, values } = buildWhereConditions(filters);
    logger.dev("Constructed WHERE clause:", whereClause);
    logger.dev("Query parameters for WHERE clause:", values);

    // 4. Get total count for pagination
    const total = await getTotalCount(whereClause, values);

    // 5. Get paginated results
    const internships = await getPaginatedInternships(
      { sort_by, sort_order },
      { page, limit },
      whereClause,
      values,
    );

    // 6. Format the data (parse JSON arrays)
    const formattedInternships = internships.map((internship) => ({
      ...internship,
      required_skills: parseDatabaseArray(internship.required_skills),
      perks: parseDatabaseArray(internship.perks),
      responsibilities: parseDatabaseArray(internship.responsibilities),
    }));

    // 7. Build pagination metadata
    const pagination = buildPagination(page, limit, total);

    logger.success(`Found ${internships.length} internships (total: ${total})`);

    res.status(200).json({
      success: true,
      data: formattedInternships,
      pagination,
    });
  } catch (error) {
    logger.error(`Error fetching internships: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Error fetching internships",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

export const updateInternship = async (req, res) => {
  const uploadedFile = req.file;
  const { id } = req.params;

  try {
    logger.info(`Updating internship ${id} for user: ${req.user?.id}`);

    // 1. Validate internship ID
    if (!id) {
      if (uploadedFile) await cleanupUploadedFile(uploadedFile.path);
      return res.status(400).json({
        success: false,
        message: "Valid internship ID is required",
      });
    }

    // 2. Check if internship exists and user owns it
    const internshipCheck = await sql`
      SELECT i.*, c.user_id as company_user_id
      FROM internships i
      JOIN companies c ON i.company_id = c.user_id
      WHERE i.id = ${id}
    `;

    if (internshipCheck.length === 0) {
      if (uploadedFile) await cleanupUploadedFile(uploadedFile.path);
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const internship = internshipCheck[0];

    // Check if user owns this internship
    if (internship.company_user_id !== req.user.id) {
      if (uploadedFile) await cleanupUploadedFile(uploadedFile.path);
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this internship",
      });
    }

    // 3. Validate update data using the schema
    const { error, value } = updateInternshipSchema.validate(req.body);

    if (error) {
      logger.warn(`Validation error: ${error.message}`);
      if (uploadedFile) await cleanupUploadedFile(uploadedFile.path);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    // 4. Check if there's anything to update
    if (Object.keys(value).length === 0 && !uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    // 5. Handle image upload if new image provided
    let imageData = null;
    if (uploadedFile) {
      try {
        // Delete old image if it exists
        if (internship.image_public_id) {
          await deleteFromCloudinary(internship.image_public_id);
          logger.db(`Deleted old image: ${internship.image_public_id}`);
        }

        // Upload new image
        imageData = await processImageUpload(uploadedFile);
      } catch (uploadError) {
        await cleanupUploadedFile(uploadedFile.path);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }

    // 6. Build dynamic update query from validated value
    const updates = [];
    const queryParams = [];
    let paramIndex = 1;

    // Loop through all keys in validated value
    Object.keys(value).forEach((field) => {
      // Handle array fields specially
      if (["required_skills", "perks", "responsibilities"].includes(field)) {
        updates.push(`${field} = $${paramIndex++}`);
        queryParams.push(JSON.stringify(value[field]));
      } else {
        updates.push(`${field} = $${paramIndex++}`);
        queryParams.push(value[field]);
      }
    });

    // Add image fields if new image uploaded
    if (imageData) {
      updates.push(`image_url = $${paramIndex++}`);
      queryParams.push(imageData.url);
      updates.push(`image_public_id = $${paramIndex++}`);
      queryParams.push(imageData.public_id);
    }

    // Add the internship ID as the last parameter
    queryParams.push(id);

    // 7. Execute update
    const updateQuery = `
      UPDATE internships 
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    logger.dev("Update query:", updateQuery);
    logger.dev("Update params:", queryParams);

    const result = await sql.query(updateQuery, queryParams);
    const updatedInternship = result[0];

    // 8. Format the response
    const formatted = {
      ...updatedInternship,
      required_skills: parseDatabaseArray(updatedInternship.required_skills),
      perks: parseDatabaseArray(updatedInternship.perks),
      responsibilities: parseDatabaseArray(updatedInternship.responsibilities),
    };

    // 9. Create activity log
    await sql.query(
      `
      INSERT INTO activity_logs (
        user_id, action, entity_type, entity_id, details
      ) VALUES ($1, $2, $3, $4, $5)
    `,
      [
        req.user.id,
        "UPDATE",
        "internship",
        id,
        JSON.stringify({
          title: formatted.title,
          updated_fields: Object.keys(value),
        }),
      ],
    );

    logger.success(`Internship updated successfully: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: formatted,
    });
  } catch (error) {
    logger.error(`Failed to update internship: ${error.message}`);
    logger.dev(error.stack);

    if (uploadedFile) {
      try {
        await cleanupUploadedFile(uploadedFile.path);
      } catch (cleanupError) {
        logger.error(`Failed to cleanup file: ${cleanupError.message}`);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

export const deleteInternship = async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Deleting internship ${id} for user: ${req.user?.id}`);

    // validate id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Valid internship ID is required",
      });
    }

    // check ownership and get data
    const internship = await sql`
      SELECT i.*, c.user_id as company_user_id
      FROM internships i
      JOIN companies c ON i.company_id = c.user_id
      WHERE i.id = ${id}
    `;

    if (internship.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const internshipData = internship[0];

    //Check authorization
    if (
      internshipData.company_user_id !== req.user.id &&
      req.user.userType !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this internship",
      });
    }

    // Delete image from Cloudinary if exists
    if (internshipData.image_public_id) {
      await deleteFromCloudinary(internshipData.image_public_id);
    }

    // Delete from database
    await sql`
      DELETE FROM internships 
      WHERE id = ${id}
    `;

    // Create activity log
    await createActivityLog(req.user.id, id, "DELETE", {
      title: internshipData.title,
    });

    logger.success(`Internship deleted successfully: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    logger.error(`Failed to delete internship: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteInternshipBulk = async (req, res) => {
  try {
    logger.info(`Bulk delete internships for user: ${req.user?.id}`);

    // Only allow admins or company owners for bulk operations
    if (req.user.userType !== "company") {
      return res.status(403).json({
        success: false,
        message: "Only admins can perform bulk delete operations",
      });
    }

    // Validate filters
    const { error, value } = bulkDeleteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid filters",
        errors: error.details.map((d) => d.message),
      });
    }

    const { whereClause, values } = buildWhereConditions(value.filters);

    // First, get internships to delete (for image cleanup)
    const internshipsToDelete = await sql.query(
      `
      SELECT id, image_public_id 
      FROM internships i
      ${whereClause}
    `,
      values,
    );

    // Delete images from Cloudinary
    for (const internship of internshipsToDelete) {
      if (internship.image_public_id) {
        await deleteFromCloudinary(internship.image_public_id);
      }
    }

    // Then delete from database
    const result = await sql.query(
      `
      DELETE FROM internships i
      ${whereClause}
      RETURNING id
    `,
      values,
    );

    // Create activity log
    await createActivityLog(req.user.id, null, "BULK_DELETE", {
      count: result.length,
      filters: value.filters,
    });

    logger.success(`${result.length} internships deleted`);

    return res.status(200).json({
      success: true,
      message: `${result.length} internships deleted successfully`,
      count: result.length,
    });
  } catch (error) {
    logger.error(`Failed to bulk delete internships: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
