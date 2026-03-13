import sql from "../configs/connectDB.js";


export const createInternshipInDB = async (companyId, value, imageData) => {
  return await sql`
    INSERT INTO internships (
      company_id, title, description, requirements, location,
      internship_type, duration, stipend, application_deadline,
      required_skills, max_applications, experience_level,
      perks, responsibilities, image_url, image_public_id,
      posted_at, is_active
    ) VALUES (
      ${companyId},
      ${value.title},
      ${value.description},
      ${value.requirements},
      ${value.location},
      ${value.internship_type},
      ${value.duration},
      ${value.stipend},
      ${value.application_deadline},
      ${value.required_skills || []},
      ${value.max_applications || null},
      ${value.experience_level || null},
      ${value.perks || []},
      ${value.responsibilities || []},
      ${imageData?.url || null},
      ${imageData?.public_id || null},
      NOW(),
      ${true}
    )
    RETURNING *
  `;
};