// middleware/parseArrayFields.js
import logger from "../utils/logger.js";

/**
 * Middleware to parse specific string fields into arrays
 * @param {string[]} fields - Array of field names to parse
 * @returns {Function} Express middleware
 */
export const parseArrayFields = (fields) => {
  return (req, res, next) => {
    try {
      fields.forEach(field => {
        if (req.body[field] && typeof req.body[field] === 'string') {
          const originalValue = req.body[field];
          logger.dev(`Parsing field ${field} with value: ${originalValue}`);
          
          try {
            // Try parsing as JSON first
            req.body[field] = JSON.parse(originalValue);
            
            // Ensure it's actually an array
            if (!Array.isArray(req.body[field])) {
              throw new Error('Parsed value is not an array');
            }
            
            logger.dev(`Successfully parsed ${field} as JSON array`);
          } catch (error) {
            // Fallback to comma-separated string
            req.body[field] = originalValue
              .split(',')
              .map(item => item.trim())
              .filter(item => item.length > 0);
            
            logger.dev(`Parsed ${field} as comma-separated string, got ${req.body[field].length} items`);
          }
        }
      });
      
      next();
    } catch (error) {
      logger.error(`Error in parseArrayFields middleware: ${error.message}`);
      next(error);
    }
  };
};

// Pre-configured export for internship routes
export const parseInternshipArrays = parseArrayFields([
  'required_skills',
  'perks',
  'responsibilities'
]);