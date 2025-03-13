import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const email = 'philhandley@hotmail.com';
    
    // Check if the user exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ 
          success: false, 
          message: `User with email ${email} not found` 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: 'Error checking user', 
        error 
      });
    }
    
    // For security, remove password from response
    if (data) {
      const { password, ...userWithoutPassword } = data;
      return res.status(200).json({
        success: true,
        message: `User found`,
        user: userWithoutPassword
      });
    }
    
    return res.status(404).json({ 
      success: false, 
      message: `User with email ${email} not found` 
    });
  } catch (error: any) {
    console.error('Error checking user:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while checking user', 
      error: error.message 
    });
  }
} 