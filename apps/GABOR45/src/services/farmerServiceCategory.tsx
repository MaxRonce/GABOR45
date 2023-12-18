import {Farmer} from '../models/Farmer';
import {supabase} from '../supabaseClient';

export const getUsersWithFarmersByCategory = async () => {
    let { data, error } = await supabase
        .rpc('get_all_agriculteurs_by_category')

    if (error) console.error(error)
    else console.log(data, "CATEGORY: ", data[0].type_produit_principal)
    return data;
}


export const getCategories = async (data:any) => {
    let categories:any = [];
    data.forEach((farmer:Farmer) => {
        if (!categories.includes(farmer.type_produit_principal)) {
            categories.push(farmer.type_produit_principal);
        }
    });
    return categories;
}