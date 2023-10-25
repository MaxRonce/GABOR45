import { UserWithFarmer } from '../models/UserWithFarmer';
import { supabase } from '../supabaseClient';

export const getUserWithFarmer = async (id: string): Promise<UserWithFarmer> => {
    let { data, error } = await supabase
        .rpc('get_agriculteur_info', {
            p_id : id
        })

    if (error) console.error(error)
    else console.log(data)


    return data as UserWithFarmer;
}
