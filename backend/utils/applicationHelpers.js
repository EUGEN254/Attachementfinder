import sql from '../configs/connectDB.js';
import logger from './logger.js';

// Get student ID from user ID
export const getStudentId = async (userId) => {
    try {
        logger.db(`Getting student ID for user: ${userId}`);
        const result = await sql`
            SELECT user_id FROM students WHERE user_id = ${userId}
        `;
        return result[0]?.user_id;
    } catch (error) {
        logger.error(`Error getting student ID: ${error.message}`);
        throw error;
    }
};

// Get company ID from user ID
export const getCompanyId = async (userId) => {
    try {
        logger.db(`Getting company ID for user: ${userId}`);
        const result = await sql`
            SELECT user_id FROM companies WHERE user_id = ${userId}
        `;
        return result[0]?.user_id;
    } catch (error) {
        logger.error(`Error getting company ID: ${error.message}`);
        throw error;
    }
};



// Helper for validation error handling
export const handleValidationError = (error, res) => {
  logger.error(`Validation error: ${error.message}`);
  return res.status(400).json({
    success: false,
    message: "Validation error",
    errors: error.details.map((d) => d.message),
  });
};