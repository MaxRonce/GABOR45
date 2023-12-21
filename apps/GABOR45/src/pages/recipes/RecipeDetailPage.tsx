// React and React Router
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Ionic components
import {
	IonBackButton,
	IonButtons,
	IonPage,
	IonList,
	IonItem,
} from '@ionic/react';

// Services and models
import { getRecipeDetails } from '../../services/recipeService';
import { Ingredient, Recipe, Etape } from '../../models/RecipeModels';

// Components
import LoadingScreen from '../../components/LoadingScreen';

interface Params {
	recipeId: string;
}

const RecipeDetailPage: React.FC = () => {
	const { recipeId } = useParams<Params>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [recipe, setRecipe] = useState<Recipe>();
	const [ingredients, setIngredients] = useState<Ingredient[]>();
	const [etapes, setEtapes] = useState<Etape[]>();

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			setIsLoading(true);
			const { recipe, ingredients, etapes } = await getRecipeDetails(
				recipeId,
			);
			setRecipe(recipe);
			setIngredients(ingredients);
			setEtapes(etapes);
			console.log('Recipe:', recipe);
			console.log('Ingredients:', ingredients);
			console.log('Etapes:', etapes);
			setIsLoading(false);
		};

		fetchRecipeDetails();
	}, [recipeId]);

	return (
		<IonPage>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					<IonButtons slot="start" className="back_button">
						<IonBackButton defaultHref="/home" />
					</IonButtons>
					<div>
						{recipe?.image && (
							<img
								className="recipe_image"
								src={recipe.image}
								alt={recipe.nom_evenement}
							/>
						)}
					</div>
					<div className="page_content">
						<div>{recipe && <h2>{recipe.nom_evenement}</h2>}</div>
						<div>{recipe && <p>{recipe.description}</p>}</div>
					</div>
					<div>
						<div className="production">
							<b>ingrédients : </b>
							{ingredients &&
								ingredients.map(ingredient => (
									<p key={ingredient.id_ingredient}>
										{ingredient.nom_ingredient} :{' '}
										{ingredient.quantite_ingredient}{' '}
										{ingredient.unite_de_mesure}
									</p>
								))}
						</div>
					</div>
					<div>
						<b>étapes : </b>
						{etapes && (
							<IonList>
								{etapes.map(etape => (
									<IonItem key={etape.id_etape}>
										{etape.description}
									</IonItem>
								))}
							</IonList>
						)}
					</div>
				</>
			)}
		</IonPage>
	);
};

export default RecipeDetailPage;
