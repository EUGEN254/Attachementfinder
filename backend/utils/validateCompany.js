import sql from "../configs/connectDB.js";

// Helper function to check if company exists and user owns it
const validateCompanyOwnership = async (companyId, userId) => {
  const companyQuery = await sql.query(
    "SELECT id FROM companies WHERE id = $1 AND user_id = $2",
    [companyId, userId],
  );
  return companyQuery.rows[0];
};
export default validateCompanyOwnership;
