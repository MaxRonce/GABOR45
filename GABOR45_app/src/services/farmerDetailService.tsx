import { Farmer } from '../models/Farmer';
import { supabase } from '../supabaseClient';

export const getUserWithFarmer = async (id: string): Promise<Farmer> => {
    let { data, error } = await supabase
        .rpc('get_agriculteur_ferme_info', {
            p_id : id
        })

    if (error) console.error(error)
    else console.log(data)


    return data as Farmer;
}
