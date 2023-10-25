import { UserWithFarmer } from '../models/UserWithFarmer';
import { supabase } from '../supabaseClient';

export const getUserWithFarmer = async (id: string): Promise<UserWithFarmer> => {
    const { data, error } = await supabase.rpc('get_user_with_farmer', { p_id: id });

    if (error) throw error;

    return data as UserWithFarmer;
}
