import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface TableResult {
  exists: boolean;
  count: number;
  error: string | null;
}

interface TableResults {
  [key: string]: TableResult;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check connection
    const { data: connectionTest, error: connectionError } = await supabase.from('users').select('count()', { count: 'exact' });
    
    if (connectionError) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to connect to Supabase', 
        error: connectionError 
      });
    }
    
    // Check tables
    const tables = ['users', 'companies', 'videos', 'blogs', 'emails', 'contacts'];
    const tableResults: TableResults = {};
    
    for (const table of tables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(1);
      
      tableResults[table] = {
        exists: !error,
        count: count || 0,
        error: error ? error.message : null
      };
    }
    
    return res.status(200).json({
      success: true,
      message: 'Successfully connected to Supabase',
      tables: tableResults
    });
  } catch (error: any) {
    console.error('Error checking Supabase:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while checking Supabase', 
      error: error.message 
    });
  }
} 