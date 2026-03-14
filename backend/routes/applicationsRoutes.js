import express from "express";
import { authenticateUser } from "../middleware/userAuth.js";
import {
  applyForInternship,
  getCompanyApplications,
  getStudentApplications,
  updateApplicationStatus,
  withdrawApplication,
} from "../controllers/applicationsController.js";

const applicationRouter = express.Router();

// All routes require authentication
applicationRouter.use(authenticateUser);

// Apply for an internship
applicationRouter.post("/apply/:internshipId", applyForInternship);

// Get applications for logged in student
applicationRouter.get("/student", getStudentApplications);

// Get applications for logged in company
applicationRouter.get("/company", getCompanyApplications);

// Update application status (company only)
applicationRouter.patch("/:applicationId/status", updateApplicationStatus);

// Withdraw application (student only)
applicationRouter.delete("/:applicationId", withdrawApplication);

export default applicationRouter;
