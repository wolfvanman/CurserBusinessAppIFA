-- Create Phil Handley user with admin role
-- Password is hashed version of 'password123'
INSERT INTO users (
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  role,
  retirementAge,
  createdAt,
  updatedAt
)
VALUES (
  'philhandley@hotmail.com',
  '$2a$10$zPiXQ2Vs1F9g2Y4MvhRaB.WB8HaAK9Cq.3ThYGQOLZHWMC.1.4O/6',
  'Phil',
  'Handley',
  '1980-01-01',
  'admin',
  65,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING
RETURNING *; 