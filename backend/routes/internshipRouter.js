import express from "express";
import {
  createInternship,
  getInternships,
  updateInternship,
  deleteInternship, // Add this
  deleteInternshipBulk, // Add this
} from "../controllers/internshipController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { authenticateUser } from "../middleware/userAuth.js";
import { parseInternshipArrays } from "../middleware/parseArrayFields.js";
import { idempotencyMiddleware } from "../middleware/idempotency.js";

const internshipRouter = express.Router();

// Public routes
internshipRouter.get("/", getInternships);

// Protected routes
internshipRouter.post(
  "/create",
  authenticateUser,
  idempotencyMiddleware,
  upload.single("image"),
  parseInternshipArrays,
  createInternship,
);

internshipRouter.put(
  "/:id",
  authenticateUser,
  upload.single("image"),
  parseInternshipArrays,
  updateInternship,
);

// Delete routes
internshipRouter.delete("/:id", authenticateUser, deleteInternship);

internshipRouter.delete("/bulk/delete", authenticateUser, deleteInternshipBulk);

export default internshipRouter;
