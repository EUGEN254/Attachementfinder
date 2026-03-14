// services/applicationService.js
import sql from "../configs/connectDB.js";
import logger from "../utils/logger.js";

// 1. Core application operations
export const insertApplication = async (
  internshipId,
  studentId,
  companyId,
  data,
) => {
  try {
    logger.db(`Inserting application for internship: ${internshipId}`);

    const { cover_letter, resume_url, additional_docs } = data;

    const result = await sql`
            INSERT INTO applications (
                internship_id, 
                student_id, 
                company_id, 
                cover_letter, 
                resume_url, 
                additional_docs,
                status,
                applied_at,
                updated_at
            ) VALUES (
                ${internshipId}, 
                ${studentId}, 
                ${companyId}, 
                ${cover_letter || null}, 
                ${resume_url || null}, 
                ${additional_docs ? JSON.stringify(additional_docs) : null},
                'pending',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            )
            RETURNING *
        `;

    return result[0];
  } catch (error) {
    logger.error(`Error inserting application: ${error.message}`);
    throw error;
  }
};

// 2. Get applications for a student
export const getStudentApplicationsFromDB = async (studentId, params = {}) => {
  try {
    const { page = 1, limit = 10, status } = params;
    const offset = (page - 1) * limit;

    logger.db(`Fetching applications for student: ${studentId}`);

    let query = sql`
            SELECT 
                a.*,
                jsonb_build_object(
                    'id', i.id,
                    'title', i.title,
                    'location', i.location,
                    'internship_type', i.internship_type,
                    'stipend', i.stipend,
                    'image_url', i.image_url,
                    'company_name', c.company_name,
                    'description', i.description,
                    'duration', i.duration
                ) as internship
            FROM applications a
            JOIN internships i ON a.internship_id = i.id
            JOIN companies c ON i.company_id = c.user_id
            WHERE a.student_id = ${studentId}
        `;

    if (status) {
      query = sql`${query} AND a.status = ${status}`;
    }

    query = sql`${query} ORDER BY a.applied_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const applications = await query;

    let countQuery = sql`
            SELECT COUNT(*) as total 
            FROM applications 
            WHERE student_id = ${studentId}
        `;

    if (status) {
      countQuery = sql`${countQuery} AND status = ${status}`;
    }

    const countResult = await countQuery;

    return {
      applications,
      total: parseInt(countResult[0].total),
    };
  } catch (error) {
    logger.error(`Error getting student applications: ${error.message}`);
    throw error;
  }
};

// 3. Get applications for a company
export const getCompanyApplicationsFromDB = async (companyId, params = {}) => {
  try {
    const { page = 1, limit = 10, status, internship_id } = params;
    const offset = (page - 1) * limit;

    logger.db(`Fetching applications for company: ${companyId}`);

    let query = sql`
            SELECT 
                a.*,
                jsonb_build_object(
                    'id', i.id,
                    'title', i.title,
                    'location', i.location,
                    'internship_type', i.internship_type,
                    'stipend', i.stipend,
                    'duration', i.duration
                ) as internship,
                jsonb_build_object(
                    'user_id', s.user_id,
                    'full_name', s.full_name,
                    'email', u.email
                ) as student
            FROM applications a
            JOIN internships i ON a.internship_id = i.id
            JOIN students s ON a.student_id = s.user_id
            JOIN users u ON s.user_id = u.id
            WHERE a.company_id = ${companyId}
        `;

    if (status) {
      query = sql`${query} AND a.status = ${status}`;
    }

    if (internship_id) {
      query = sql`${query} AND a.internship_id = ${internship_id}`;
    }

    query = sql`${query} ORDER BY a.applied_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const applications = await query;

    let countQuery = sql`
            SELECT COUNT(*) as total 
            FROM applications 
            WHERE company_id = ${companyId}
        `;

    if (status) {
      countQuery = sql`${countQuery} AND status = ${status}`;
    }

    if (internship_id) {
      countQuery = sql`${countQuery} AND internship_id = ${internship_id}`;
    }

    const countResult = await countQuery;

    return {
      applications,
      total: parseInt(countResult[0].total),
    };
  } catch (error) {
    logger.error(`Error getting company applications: ${error.message}`);
    throw error;
  }
};

// 4. Update application status
export const updateApplicationStatusInDB = async (
  applicationId,
  status,
  companyId,
) => {
  try {
    logger.db(`Updating application ${applicationId} status to: ${status}`);

    const result = await sql`
            UPDATE applications 
            SET status = ${status}, updated_at = CURRENT_TIMESTAMP
            WHERE id = ${applicationId} AND company_id = ${companyId}
            RETURNING *
        `;

    return result[0];
  } catch (error) {
    logger.error(`Error updating application status: ${error.message}`);
    throw error;
  }
};

// 5. Withdraw application
export const withdrawApplicationFromDB = async (applicationId, studentId) => {
  try {
    logger.db(`Withdrawing application ${applicationId}`);

    const result = await sql`
            UPDATE applications 
            SET status = 'withdrawn', updated_at = CURRENT_TIMESTAMP
            WHERE id = ${applicationId} AND student_id = ${studentId}
            RETURNING *
        `;

    return result[0];
  } catch (error) {
    logger.error(`Error withdrawing application: ${error.message}`);
    throw error;
  }
};

// 6. Create activity log (optional - could also stay in utils)
export const createActivityLog = async (
  userId,
  entityId,
  action,
  details = {},
) => {
  try {
    await sql`
            INSERT INTO activity_logs (
                user_id,
                action,
                entity_type,
                entity_id,
                details,
                created_at
            ) VALUES (
                ${userId},
                ${action},
                'application',
                ${entityId},
                ${JSON.stringify(details)},
                CURRENT_TIMESTAMP
            )
        `;
  } catch (error) {
    logger.error(`Failed to create activity log: ${error.message}`);
  }
};

// 7. Business validation functions
export const checkInternshipExists = async (internshipId) => {
  try {
    logger.db(`Checking internship: ${internshipId}`);
    const result = await sql`
            SELECT i.*, c.user_id as company_id 
            FROM internships i
            JOIN companies c ON i.company_id = c.user_id
            WHERE i.id = ${internshipId} AND i.is_active = true
        `;
    return result[0];
  } catch (error) {
    logger.error(`Error checking internship: ${error.message}`);
    throw error;
  }
};

export const checkExistingApplication = async (internshipId, studentId) => {
  try {
    logger.db(
      `Checking existing application for internship: ${internshipId}, student: ${studentId}`,
    );
    const result = await sql`
            SELECT id FROM applications 
            WHERE internship_id = ${internshipId} AND student_id = ${studentId}
        `;
    return result[0];
  } catch (error) {
    logger.error(`Error checking existing application: ${error.message}`);
    throw error;
  }
};
