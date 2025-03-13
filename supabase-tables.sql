-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  contactEmail TEXT NOT NULL,
  contactPhone TEXT,
  address TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  dateOfBirth TIMESTAMP WITH TIME ZONE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
  company_id UUID REFERENCES companies(id),
  retirementAge INTEGER DEFAULT 65,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resetToken TEXT,
  resetTokenExpiry BIGINT
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  thumbnail TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  isCompanySpecific BOOLEAN DEFAULT FALSE,
  companies UUID[] DEFAULT '{}',
  isRetirementRelated BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featuredImage TEXT,
  tags TEXT[],
  isPublished BOOLEAN DEFAULT FALSE,
  publishedAt TIMESTAMP WITH TIME ZONE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sender TEXT NOT NULL,
  recipientType TEXT NOT NULL CHECK (recipientType IN ('individual', 'company', 'all')),
  recipients TEXT[],
  isScheduled BOOLEAN DEFAULT FALSE,
  scheduledFor TIMESTAMP WITH TIME ZONE,
  sentAt TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  isResolved BOOLEAN DEFAULT FALSE,
  resolvedAt TIMESTAMP WITH TIME ZONE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an admin user (password: admin123)
INSERT INTO users (email, password, firstName, lastName, dateOfBirth, role, retirementAge)
VALUES (
  'admin@example.com',
  '$2a$10$zPiXQ2Vs1F9g2Y4MvhRaB.WB8HaAK9Cq.3ThYGQOLZHWMC.1.4O/6',
  'Admin',
  'User',
  '1980-01-01',
  'admin',
  65
)
ON CONFLICT (email) DO NOTHING;
