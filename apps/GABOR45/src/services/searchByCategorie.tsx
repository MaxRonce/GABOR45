import { Farmer } from "../models/Farmer";
import { supabase } from "../supabaseClient";

export const getFarmerByCategorySearch = async (
	prenom: string,
	id: string
): Promise<Farmer> => {
	let { data, error } = await supabase.rpc(
		"get_search_all_agriculteur_info_by_category",
		{
			prenom_search: prenom,
			category_id: id,
		}
	);

	if (error) console.error("error:", error);
	else console.log(data);

	return data as Farmer;
};
