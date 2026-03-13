import Joi from "joi";

export const createInternshipSchema = Joi.object({
  title: Joi.string().required().min(3).max(255).trim(),
  description: Joi.string().required().min(10).max(5000).trim(),
  requirements: Joi.string().required().min(10).max(5000).trim(),
  location: Joi.string().required().min(2).max(255).trim(),
  internship_type: Joi.string().valid("onsite", "remote", "hybrid").required(),
  duration: Joi.string().required().max(100).trim(),
  stipend: Joi.string().required().max(100).trim(),
  application_deadline: Joi.date().iso().min("now").required(),
  required_skills: Joi.array().items(Joi.string().trim()).min(1).required(),
  max_applications: Joi.number().integer().min(1).optional(),
  experience_level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .optional(),
  perks: Joi.array().items(Joi.string().trim()).optional(),
  responsibilities: Joi.array().items(Joi.string().trim()).optional(),
});

// Add this after your existing schemas
export const getInternshipsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort_by: Joi.string()
    .valid(
      "posted_at",
      "application_deadline",
      "title",
      "stipend",
      "created_at",
    )
    .default("posted_at"),
  sort_order: Joi.string().valid("asc", "desc").default("desc"),
  internship_type: Joi.string().valid("onsite", "remote", "hybrid"),
  location: Joi.string().trim().max(255),
  experience_level: Joi.string().valid("beginner", "intermediate", "advanced"),
  min_stipend: Joi.number().min(0),
  max_stipend: Joi.number().min(0),
  search: Joi.string().trim().max(100),
  is_active: Joi.boolean().optional(),
  company_id: Joi.string().uuid(),
  skills: Joi.string().trim(), // Comma-separated skills
});

export const updateInternshipSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim(),
  description: Joi.string().min(10).max(5000).trim(),
  requirements: Joi.string().min(10).max(5000).trim(),
  location: Joi.string().min(2).max(255).trim(),
  internship_type: Joi.string().valid("onsite", "remote", "hybrid"),
  duration: Joi.string().max(100).trim(),
  stipend: Joi.string().max(100).trim(),
  application_deadline: Joi.date().iso().min("now"),
  required_skills: Joi.array().items(Joi.string().trim()),
  max_applications: Joi.number().integer().min(1),
  experience_level: Joi.string().valid("beginner", "intermediate", "advanced"),
  perks: Joi.array().items(Joi.string().trim()),
  responsibilities: Joi.array().items(Joi.string().trim()),
  is_active: Joi.boolean(),
}).min(1); // At least one field to update

export const internshipIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

// Add to your validation file
export const bulkDeleteSchema = Joi.object({
  filters: Joi.object({
    company_id: Joi.string().uuid(),
    is_active: Joi.boolean(),
    internship_type: Joi.string().valid("onsite", "remote", "hybrid"),
    experience_level: Joi.string().valid(
      "beginner",
      "intermediate",
      "advanced",
    ),
  })
    .required()
    .min(1),
});

export const queryParamsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort_by: Joi.string()
    .valid("posted_at", "application_deadline", "title", "stipend")
    .default("posted_at"),
  sort_order: Joi.string().valid("ASC", "DESC").default("DESC"),
  type: Joi.string().valid("onsite", "remote", "hybrid"),
  is_active: Joi.boolean(),
  company_id: Joi.string().uuid(),
  search: Joi.string().trim().max(100),
  min_stipend: Joi.number().min(0),
  max_stipend: Joi.number().min(0),
});
