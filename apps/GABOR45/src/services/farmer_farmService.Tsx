import {supabase} from '../supabaseClient';

export const get_agriculteur_ferme_info = async () => {

    let { data, error } = await supabase
        .rpc('get_agriculteur_ferme_info')

    if (error) console.error(error)
    else console.log(data)
    return data;
}