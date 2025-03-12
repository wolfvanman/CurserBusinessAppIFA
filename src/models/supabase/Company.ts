import { supabase } from '@/lib/supabase';

export interface ICompany {
  id?: string;
  name: string;
  description?: string;
  logo?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

const Company = {
  async findOne(query: Partial<ICompany>) {
    let supabaseQuery = supabase.from('companies').select('*');
    
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
    
    return data;
  },
  
  async findById(id: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    
    return data;
  },
  
  async create(companyData: ICompany) {
    // Set timestamps
    const now = new Date().toISOString();
    companyData.createdAt = now;
    companyData.updatedAt = now;
    
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  },
  
  async findByIdAndUpdate(id: string, updateData: Partial<ICompany>) {
    // Update timestamp
    updateData.updatedAt = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('companies')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  },
  
  async find(query: Partial<ICompany> = {}) {
    let supabaseQuery = supabase.from('companies').select('*');
    
    // Apply filters based on the query object
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        supabaseQuery = supabaseQuery.eq(key, value);
      }
    });
    
    const { data, error } = await supabaseQuery;
    
    if (error) throw error;
    
    return data || [];
  }
};

export default Company; 