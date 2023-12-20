import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailPage: React.FC = () => {
  const { recipeId } = useParams();

  useEffect(() => {
    console.log("Recipe ID changed to: ", recipeId);
    // Placez ici toute logique de chargement des données
  }, [recipeId]);

  return (
    <div>
      <h2>Hello World - Recipe ID: {recipeId}</h2>
    </div>
  );
};

export default RecipeDetailPage;
