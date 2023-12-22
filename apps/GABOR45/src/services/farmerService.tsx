// Supabase Components
import { supabase } from "../supabaseClient";

export const getUsersWithFarmers = async () => {
	let { data, error } = await supabase.rpc(
		"get_all_agriculteurs_distance_info"
	);
	if (error) console.error(error);
	else console.log(data);
	return data;
};
