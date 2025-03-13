import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName, dateOfBirth, role, retirementAge } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          email, 
          password: hashedPassword, 
          firstName, 
          lastName, 
          dateOfBirth, 
          role, 
          retirementAge: retirementAge || 65,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create user', 
        error 
      });
    }

    // Return success without the password
    const userWithoutPassword = data[0] ? { ...data[0], password: undefined } : null;
    
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Error in create-user API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while creating user', 
      error: error.message 
    });
  }
} 