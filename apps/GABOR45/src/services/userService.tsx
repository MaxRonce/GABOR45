// Supabase Components
import { supabase } from "../supabaseClient";

// Models
import { Utilisateur } from "../models/User";

export const getUserInfo = async (id: string): Promise<Utilisateur> => {
	console.log("on attend le user");
	let { data, error } = await supabase.rpc("get_utilisateur_info", {
		id_util: id,
	});
	console.log("on a le user");
	if (error) console.error(error);
	else console.log(data);
	return data as Utilisateur;
};



export const updateUserInfo = async (userId: string, updatedUser: Utilisateur): Promise<void> => {
    const { error } = await supabase
        .from('utilisateur')
        .update(updatedUser)
        .eq('id_utilisateur', userId);

    if (error) throw error;
};