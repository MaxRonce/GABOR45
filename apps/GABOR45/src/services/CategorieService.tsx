// Supabase Components
import { supabase } from '../supabaseClient';

export const getUsersWithFarmersByCategory = async (id: string) => {
	let { data, error } = await supabase.rpc(
		'get_all_agriculteurs_distance_info_by_category',
		{
			category_id: id,
		},
	);
	if (error) console.error(error);
	return data;
};
export const getCategorieFromId = async (id: string | null) => {
	let { data, error } = await supabase
		.from('categories')
		.select('name')
		.eq('id_categorie', id);
	if (error) console.error(error);
	return data;
};
