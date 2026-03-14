import sql from "../configs/connectDB.js";
import logger from "../utils/logger.js";
import {
  getStudentId,
  getCompanyId,
  handleValidationError,
} from "../utils/applicationHelpers.js";
import {
  applyForInternshipSchema,
  updateApplicationStatusSchema,
  getApplicationsQuerySchema,
} from "../validations/applicationValidation.js";
import {
  checkInternshipExists,
  checkExistingApplication,
  insertApplication,
  getStudentApplicationsFromDB,
  getCompanyApplicationsFromDB,
  updateApplicationStatusInDB,
  withdrawApplicationFromDB,
  createActivityLog,
} from "../services/applicationService.js";

// Apply for an internship
export const applyForInternship = async (req, res) => {
  try {
    logger.info(`Applying for internship: ${req.params.internshipId}`);

    // 1. Check authentication
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Validate input
    const { error, value } = applyForInternshipSchema.validate(req.body);
    if (error) return handleValidationError(error, res);

    // 3. Check if user is a student
    const studentId = await getStudentId(req.user.id);
    if (!studentId) {
      return res.status(403).json({
        success: false,
        message: "Only students can apply for internships",
      });
    }

    // 4. Check if internship exists and is active
    const internship = await checkInternshipExists(req.params.internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found or no longer active",
      });
    }

    // 5. Check if already applied
    const existingApplication = await checkExistingApplication(
      req.params.internshipId,
      studentId,
    );
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this internship",
      });
    }

    // 6. Insert application
    const newApplication = await insertApplication(
      req.params.internshipId,
      studentId,
      internship.company_id,
      value,
    );

    logger.success(`Application created with ID: ${newApplication.id}`);

    // 7. Create activity log
    await createActivityLog(
      req.user.id,
      newApplication.id,
      "APPLICATION_SUBMITTED",
      {
        internship_id: req.params.internshipId,
        internship_title: internship.title,
      },
    );

    // 8. Send response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    logger.error(`Failed to submit application: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

// Get applications for a student
export const getStudentApplications = async (req, res) => {
  try {
    logger.info("Fetching student applications");

   if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Validate query params
    const { error, value } = getApplicationsQuerySchema.validate(req.query);
    if (error) return handleValidationError(error, res);

    // 3. Check if user is a student
    const studentId = await getStudentId(req.user.id);
    if (!studentId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Student account required.",
      });
    }

    // 4. Get applications
    const { applications, total } = await getStudentApplicationsFromDB(
      studentId,
      value,
    );

    // 5. Calculate pagination
    const page = value.page || 1;
    const limit = value.limit || 10;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Failed to fetch student applications: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

// Get applications for a company
export const getCompanyApplications = async (req, res) => {
  try {
    logger.info("Fetching company applications");

    // 1. Check authentication
  if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Validate query params
    const { error, value } = getApplicationsQuerySchema.validate(req.query);
    if (error) return handleValidationError(error, res);

    // 3. Check if user is a company
    const companyId = await getCompanyId(req.user.id);
    if (!companyId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Company account required.",
      });
    }

    // 4. Get applications
    const { applications, total } = await getCompanyApplicationsFromDB(
      companyId,
      value,
    );

    // 5. Calculate pagination
    const page = value.page || 1;
    const limit = value.limit || 10;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    logger.error(`Failed to fetch company applications: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

// Update application status (for companies)
export const updateApplicationStatus = async (req, res) => {
  try {
    logger.info(`Updating application status: ${req.params.applicationId}`);

    // 1. Check authentication
  if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Validate input
    const { error, value } = updateApplicationStatusSchema.validate(req.body);
    if (error) return handleValidationError(error, res);

    // 3. Check if user is a company
    const companyId = await getCompanyId(req.user.id);
    if (!companyId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Company account required.",
      });
    }

    // 4. Update status
    const updatedApplication = await updateApplicationStatusInDB(
      req.params.applicationId,
      value.status,
      companyId,
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found or you do not have permission to update it",
      });
    }

    logger.success(
      `Application ${req.params.applicationId} status updated to: ${value.status}`,
    );

    // 5. Create activity log
    await createActivityLog(
      req.user.id,
      req.params.applicationId,
      "APPLICATION_STATUS_CHANGED",
      {
        new_status: value.status,
      },
    );

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    logger.error(`Failed to update application status: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

// Withdraw application (for students)
export const withdrawApplication = async (req, res) => {
  try {
    logger.info(`Withdrawing application: ${req.params.applicationId}`);

   if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Check if user is a student
    const studentId = await getStudentId(req.user.id);
    if (!studentId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Student account required.",
      });
    }

    // 3. Withdraw application
    const withdrawnApplication = await withdrawApplicationFromDB(
      req.params.applicationId,
      studentId,
    );

    if (!withdrawnApplication) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found or you do not have permission to withdraw it",
      });
    }

    logger.success(
      `Application ${req.params.applicationId} withdrawn successfully`,
    );

    // 4. Create activity log
    await createActivityLog(
      req.user.id,
      req.params.applicationId,
      "APPLICATION_WITHDRAWN",
    );

    res.json({
      success: true,
      message: "Application withdrawn successfully",
      data: withdrawnApplication,
    });
  } catch (error) {
    logger.error(`Failed to withdraw application: ${error.message}`);
    logger.dev(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};
