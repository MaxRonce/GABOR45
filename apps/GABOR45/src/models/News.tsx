export interface News {
	id_evenement: string;
	nom_evenement: string;
	description: string;
	date_creation: string;
	id_agriculteur: string;
	lien_image_user: string;
	image?: string;
	is_recette: boolean;
	is_on_main_page: boolean;
}
