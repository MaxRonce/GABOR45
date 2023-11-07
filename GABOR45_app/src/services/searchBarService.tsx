import { Farmer } from '../models/Farmer';
import { supabase } from '../supabaseClient';

export const getUserWithFarmerSearch = async (prenom: string): Promise<Farmer> => {
    let { data, error } = await supabase
        .rpc('get_search_agriculteur_info', {
            prenom_search : prenom
        })

    if (error) console.error(error)
    else console.log(data)


    return data as Farmer;
}