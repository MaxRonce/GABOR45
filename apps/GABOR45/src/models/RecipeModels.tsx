// RecipeModels.ts
export interface Ingredient {
    id_ingredient: string;
    nom_ingredient: string;
    quantite_ingredient: number;
    unite_de_mesure: string;
    id_recette: string;
  }
  
  export interface Etape {
    id_etape: string;
    description: string;
    id_recette: string;
  }
  
  // RecipeModels.ts
export interface Recipe {
  id_evenement: string;
  nom_evenement: string;
  description: string;
  date_creation: string;
  id_agriculteur: string;
	image?: string;
	is_recette: boolean;
	is_on_main_page: boolean;
}

export interface Ingredient {
  id_ingredient: string;
  nom_ingredient: string;
  quantite_ingredient: number;
  unite_de_mesure: string;
  id_recette: string;
}

export interface Etape {
  id_etape: string;
  description: string;
  id_recette: string;
}
