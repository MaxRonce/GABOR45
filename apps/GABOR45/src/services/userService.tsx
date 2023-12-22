// Supabase Components
import { supabase } from '../supabaseClient';

// Models
import { Utilisateur } from '../models/User';
import { Farmer } from '../models/Farmer';

export const getUserInfo = async (id: string): Promise<Utilisateur> => {
	let { data, error } = await supabase.rpc('get_utilisateur_info', {
		id_util: id,
	});
	if (error) console.error(error);
	else console.log(data);
	return data as Utilisateur;
};

export const updateUserInfo = async (
	userId: string,
	updatedUser: Utilisateur,
): Promise<void> => {
	const { error } = await supabase
		.from('utilisateur')
		.update(updatedUser)
		.eq('id_utilisateur', userId);

	if (error) throw error;
};

export const getAgriInfo = async (id: string): Promise<Farmer> => {
	let { data, error } = await supabase.rpc('get_agriculteur_info', {
		p_id: id,
	});
	if (error) console.error(error);
	else console.log(data);
	return data as Farmer;
};

export const updateAgriInfo = async (
	userId: string,
	updatedUser: Farmer,
): Promise<void> => {
	let { error } = await supabase.rpc('update_agriculteur_info', {
		agriculteur_id: userId,
		new_description: updatedUser.description,
		new_email: updatedUser.email,
		new_facebook: updatedUser.facebook,
		new_instagram: updatedUser.instagram,
		new_lien_image: updatedUser.lien_image_user,
		new_nom: updatedUser.nom,
		new_num_tel: updatedUser.num_tel,
		new_prenom: updatedUser.prenom,
		new_tel_portable: updatedUser.tel_portable,
		new_twitter: updatedUser.twitter,
		new_type_produit_principal: updatedUser.type_produit_principal,
		new_website: updatedUser.website,
	});
	if (error) console.error(error);
};
