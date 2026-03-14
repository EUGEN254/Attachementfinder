<!-- -- INTERNSHIPS TABLE
CREATE TABLE internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    location VARCHAR(255),
    internship_type VARCHAR(50) CHECK (internship_type IN ('onsite', 'remote', 'hybrid')),
    duration VARCHAR(100),
    stipend VARCHAR(100),
    application_deadline DATE,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Index for faster queries
CREATE INDEX idx_internships_company ON internships(company_id);
CREATE INDEX idx_internships_active ON internships(is_active) WHERE is_active = true; -->

<!-- 
-- Add image columns to internships table
ALTER TABLE internships 
ADD COLUMN image_url TEXT,
ADD COLUMN image_public_id VARCHAR(255);

-- Optional: Create index for better performance if you'll query by image
CREATE INDEX idx_internships_image ON internships(image_url) WHERE image_url IS NOT NULL; -->



<!-- -- Add all missing columns to match Joi schema
ALTER TABLE internships 
ADD COLUMN IF NOT EXISTS required_skills TEXT,
ADD COLUMN IF NOT EXISTS max_applications INTEGER,
ADD COLUMN IF NOT EXISTS experience_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS perks TEXT,
ADD COLUMN IF NOT EXISTS responsibilities TEXT;

-- Add check constraint for experience_level if you want validation at DB level
ALTER TABLE internships 
ADD CONSTRAINT check_experience_level 
CHECK (experience_level IN ('beginner', 'intermediate', 'advanced'));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_internships_experience ON internships(experience_level); -->