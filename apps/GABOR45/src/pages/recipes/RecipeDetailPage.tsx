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
	IonImg,
	IonContent,
} from '@ionic/react';

// Services and models
import { getRecipeDetails } from '../../services/recipeService';
import { Ingredient, Recipe, Etape } from '../../models/RecipeModels';

// Components
import LoadingScreen from '../../components/LoadingScreen';

//css
import './RecipeDetailPage.css';

interface Params {
	recipeId: string;
}

const RecipeDetailPage: React.FC = () => {
	const { recipeId } = useParams<Params>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [recipe, setRecipe] = useState<Recipe>();
	const [ingredients, setIngredients] = useState<Ingredient[]>();
	const [etapes, setEtapes] = useState<Etape[]>();

	const headerBannerClass = recipe?.image
		? 'header-banner'
		: 'header-banner-small';

	const pageContentClass = recipe?.image
		? 'page_content'
		: 'page_content_small';

	const baseUrl =
		'https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/';

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
					<IonContent>
						<div className={headerBannerClass}>
							<IonButtons slot="start" className="back_button">
								<IonBackButton defaultHref="/home" />
							</IonButtons>
							{recipe?.image && (
								<img
									className="recipe_image"
									src={baseUrl + recipe.image}
									alt={recipe.nom_evenement}
								/>
							)}
						</div>

						<div className={pageContentClass}>
							<div>
								{recipe && <h2>{recipe.nom_evenement}</h2>}
							</div>
							<div>{recipe && <p>{recipe.description}</p>}</div>
						</div>
						<div>
							<div className="production">
								<h2>Ingrédients : </h2>
								{ingredients && (
									<ul className="ingredients-list">
										{ingredients.map(ingredient => (
											<li key={ingredient.id_ingredient}>
												{ingredient.nom_ingredient} :{' '}
												{ingredient.quantite_ingredient}{' '}
												{ingredient.unite_de_mesure}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
						<div className="steps">
							<h2>Étapes :</h2>
							{etapes && (
								<ul className="etapes-list">
									{etapes.map(etape => (
										<li key={etape.id_etape}>
											{etape.description}
										</li>
									))}
								</ul>
							)}
						</div>
					</IonContent>
				</>
			)}
		</IonPage>
	);
};

export default RecipeDetailPage;
