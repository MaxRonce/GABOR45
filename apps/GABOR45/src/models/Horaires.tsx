export interface Horaires {
	id_horaires: string;
	id_point_de_vente: string;
	jour: string;
	heure_debut_matin: string | null;
	heure_fin_matin: string | null;
	heure_debut_apres_midi: string | null;
	heure_fin_apres_midi: string | null;
}
