export interface PointsVente {
	id_point_de_vente: string;
	adresse: string;
	tel_fixe: string | null;
	Description: string | null;
	website: string | null;
	lien_image_user: string;
	nom: string;
	latitude: number | null;
	longitude: number | null; 
    appartient_a: string;
}
