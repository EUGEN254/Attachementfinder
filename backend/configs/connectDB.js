import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

// Initialize Neon with connection string
const sql = neon(process.env.DATABASE_URL);

// Test connection function
export const testConnection = async () => {
    try {
        const result = await sql`SELECT NOW()`;
        logger.db('Connected to Neon database successfully');
        logger.db(`Server time: ${result[0].now}`);
        return true;
    } catch (err) {
        logger.error('Database connection failed:', err.message);
        return false;
    }
};

export default sql;