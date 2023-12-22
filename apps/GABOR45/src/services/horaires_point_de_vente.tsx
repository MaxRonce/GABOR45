// Supabase Components
import { supabase } from "../supabaseClient";

// Models
import { Horaires } from "../models/Horaires";

export const getHorairesFerme = async (
	agriculteur_id: string
): Promise<Horaires[]> => {
	let { data, error } = await supabase.rpc("get_horaires_ferme", {
		agriculteur_id: agriculteur_id,
	});
	if (error) console.error(error);
	return data as Horaires[];
};
