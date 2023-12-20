// recipeService.tsx
import { supabase } from "../supabaseClient";
import { Ingredient, Etape, Recipe } from "../models/RecipeModels"; // Assurez-vous d'ajouter Recipe à vos modèles

export const getRecipeDetails = async (recipeId: string): Promise<{ recipe: Recipe | null, ingredients: Ingredient[], etapes: Etape[] }> => {
  // Fetch les détails de la recette
  let { data: recipeData, error: recipeError } = await supabase
    .from("news")
    .select("*")
    .eq("id_evenement", recipeId)
    .single(); // Supposant que id_evenement est l'ID unique de la recette

  // Fetch les ingrédients
  let { data: ingredients, error: ingredientsError } = await supabase
    .from("ingredient")
    .select("*")
    .eq("id_recette", recipeId);

  // Fetch les étapes
  let { data: etapes, error: etapesError } = await supabase
    .from("etape")
    .select("*")
    .eq("id_recette", recipeId);

  if (recipeError) {
    console.error("Error fetching recipe", recipeError);
  }

  if (ingredientsError) {
    console.error("Error fetching ingredients", ingredientsError);
  }

  if (etapesError) {
    console.error("Error fetching etapes", etapesError);
  }

  return {
    recipe: recipeData as Recipe,
    ingredients: ingredients as Ingredient[],
    etapes: etapes as Etape[],
  };
};
