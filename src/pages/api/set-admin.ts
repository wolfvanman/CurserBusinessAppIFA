import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = 'f35e13de-b79d-4056-adf2-dfcb9c47ef6c';
    
    // Update the user's role to admin
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userId)
      .select();
    
    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update user role', 
        error 
      });
    }
    
    if (!data || data.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: `User ${userId} has been set as admin`,
      user: data[0]
    });
  } catch (error: any) {
    console.error('Error setting admin:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while setting admin', 
      error: error.message 
    });
  }
} 