import { supabase } from "../supabaseClient";

export const getAllCategories = async () => {
    let { data, error } = await supabase
    .rpc('get_all_categories')

    if (error) console.error(error)
    else console.log("category: ", data)
    return data; 
}