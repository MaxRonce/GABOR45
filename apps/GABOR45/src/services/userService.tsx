// Supabase Components
import { supabase } from "../supabaseClient";

// Models
import { Utilisateur } from "../models/User";

export const getUserInfo = async (id: string): Promise<Utilisateur> => {
	let { data, error } = await supabase.rpc("get_utilisateur_info", {
		id_util: id,
	});
	if (error) console.error(error);
	else console.log(data);
	return data as Utilisateur;
};
