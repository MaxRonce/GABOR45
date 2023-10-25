
import {Farmer} from '../models/Farmer';
import {supabase} from '../supabaseClient';

export const getFarmerDetails = async (id: string): Promise<Farmer> => {
    const { data, error } = await supabase
        .from('agriculteur')
        .select('*')
        .eq('id', id);

    if (error) throw error;

    return data[0];
}
