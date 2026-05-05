CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Work','Learning','Personal','Other')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_tasks_date ON tasks(date);
