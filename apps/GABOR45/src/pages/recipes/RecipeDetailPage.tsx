import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../../services/recipeService';

interface Params {
  recipeId: string;
}

  const RecipeDetailPage: React.FC = () => {
    const { recipeId } = useParams<Params>();

    useEffect(() => {
      const fetchRecipeDetails = async () => {
        const { recipe, ingredients, etapes } = await getRecipeDetails(recipeId);
        console.log('Recipe:', recipe);
        console.log('Ingredients:', ingredients);
        console.log('Etapes:', etapes);
      };
  
      fetchRecipeDetails();
    }, [recipeId]);

  return (
    <div>
      <h2>Hello World - Recipe ID: {recipeId}</h2>
    </div>
  );
};

export default RecipeDetailPage;
