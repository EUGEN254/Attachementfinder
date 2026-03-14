import Joi from 'joi';

export const applyForInternshipSchema = Joi.object({
    cover_letter: Joi.string().min(20).max(5000).required().messages({
        'string.min': 'Cover letter must be at least 20 characters long',
        'string.max': 'Cover letter cannot exceed 5000 characters',
        'any.required': 'Cover letter is required'
    }),
    resume_url: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Please provide a valid URL for your resume'
    }),
    additional_docs: Joi.object().optional()
});

export const updateApplicationStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'reviewed', 'accepted','interview', 'rejected').required().messages({
        'any.only': 'Status must be one of: pending, reviewed, accepted, interview, rejected',
        'any.required': 'Status is required'
    })
});

export const getApplicationsQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: Joi.string().valid('pending', 'reviewed', 'accepted', 'interview', 'rejected', 'withdrawn').optional(),
    internship_id: Joi.string().uuid().optional()
});