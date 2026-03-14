-- APPLICATIONS TABLE
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(user_id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(user_id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected', 'withdrawn')),
    cover_letter TEXT,
    resume_url TEXT,
    additional_docs JSONB,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure a student can't apply twice to same internship
    UNIQUE(internship_id, student_id)
);

-- Indexes for faster queries
CREATE INDEX idx_applications_internship ON applications(internship_id);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_company ON applications(company_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at DESC);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Add an activity log trigger for applications
CREATE OR REPLACE FUNCTION log_application_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (NEW.student_id, 'APPLICATION_SUBMITTED', 'application', NEW.id, 
                jsonb_build_object('internship_id', NEW.internship_id, 'status', NEW.status));
    ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details)
        VALUES (NEW.student_id, 'APPLICATION_STATUS_CHANGED', 'application', NEW.id,
                jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status));
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_log_application_activity
    AFTER INSERT OR UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION log_application_activity();