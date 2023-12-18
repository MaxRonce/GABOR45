import {supabase} from '../supabaseClient';

export const getUsersWithFarmersByCategory = async (id:string) => {

    let { data, error } = await supabase
        .rpc('get_all_agriculteurs_distance_info_by_category', {
            category_id : id
        })

    if (error) console.error(error);
    return data;
}