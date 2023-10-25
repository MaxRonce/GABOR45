import {Farmer} from '../models/Farmer';
import {supabase} from '../supabaseClient';

export const getUsersWithFarmers = async () => {
    const { data, error } = await supabase.from('users_with_farmers').select('*');

    if (error) throw error;

    return data;
}