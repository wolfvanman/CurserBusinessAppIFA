-- Update the user with ID f35e13de-b79d-4056-adf2-dfcb9c47ef6c to have admin role
UPDATE users
SET role = 'admin'
WHERE id = 'f35e13de-b79d-4056-adf2-dfcb9c47ef6c'
RETURNING *; 