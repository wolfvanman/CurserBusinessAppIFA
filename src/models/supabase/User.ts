import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export interface IUser {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  role: 'admin' | 'employee';
  company_id?: string;
  retirementAge: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

const User = {
  async findOne(query: Partial<IUser>) {
    let supabaseQuery = supabase.from('users').select('*');
    
    // Apply filters based on the query object
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        supabaseQuery = supabaseQuery.eq(key, value);
      }
    });
    
    const { data, error } = await supabaseQuery.single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned, which is equivalent to findOne returning null
        return null;
      }
      throw error;
    }
    
    return {
      ...data,
      comparePassword: async (candidatePassword: string): Promise<boolean> => {
        return bcrypt.compare(candidatePassword, data.password);
      }
    };
  },
  
  async findById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    
    return {
      ...data,
      comparePassword: async (candidatePassword: string): Promise<boolean> => {
        return bcrypt.compare(candidatePassword, data.password);
      }
    };
  },
  
  async create(userData: IUser) {
    // Hash password before saving
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    
    // Set timestamps
    const now = new Date().toISOString();
    userData.createdAt = now;
    userData.updatedAt = now;
    
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      ...data,
      comparePassword: async (candidatePassword: string): Promise<boolean> => {
        return bcrypt.compare(candidatePassword, data.password);
      }
    };
  },
  
  async findByIdAndUpdate(id: string, updateData: Partial<IUser>) {
    // Hash password if it's being updated
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    // Update timestamp
    updateData.updatedAt = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return {
      ...data,
      comparePassword: async (candidatePassword: string): Promise<boolean> => {
        return bcrypt.compare(candidatePassword, data.password);
      }
    };
  },
  
  async save(user: IUser) {
    if (user.id) {
      // Update existing user
      return this.findByIdAndUpdate(user.id, user);
    } else {
      // Create new user
      return this.create(user);
    }
  }
};

export default User; 