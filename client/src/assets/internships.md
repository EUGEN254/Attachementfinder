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