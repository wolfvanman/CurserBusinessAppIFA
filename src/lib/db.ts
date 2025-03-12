import { supabase } from './supabase';

/**
 * This function is kept for backward compatibility with existing code.
 * It doesn't actually need to connect to Supabase since the client is already initialized,
 * but it's kept to minimize changes to existing code.
 */
async function dbConnect() {
  return supabase;
}

export default dbConnect; 