import React, { useState, useEffect } from 'react';
import {
	IonItem,
	IonContent,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonModal,
	IonIcon,
	IonButton,
	IonRefresher,
	IonRefresherContent,
	IonAvatar,
	IonLabel,
	IonFab,
	useIonToast,
	IonInput,
	IonTextarea,
	IonFabButton,
	IonList,
	IonText,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';
import logo from '../../assets/logo_Gabor45_notxt.svg';
import {
	getNewsByFarmer,
	getNewsForUser,
	saveNews,
} from '../../services/newsService';
import { News } from '../../models/News';
import { supabase } from '../../supabaseClient';
import { closeCircle } from 'ionicons/icons';
import './FarmerEvents.css';
import add_outline from '../../icons/add_outline.svg';
import { useAuth } from '../../hooks/useAuth';
import LoadingScreen from '../../components/LoadingScreen';
import {
	openImageModalF,
	closeModalF,
	handleModalContentClickF,
	redirectToFarmerProfileF,
} from './FunctionsEvents';

interface Ingredient {
	name: string;
	quantity: string;
	unit: string;
}

interface Step {
	description: string;
}

const FarmerEvents: React.FC = () => {
	const user = useAuth();
	const [newsList, setNewsList] = useState<News[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showModal, setShowModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [nomEvenement, setNomEvenement] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [imageFile, setImageFile] = useState<File | string>('');
	const [isActive, setIsActive] = useState([true, false]);
	const [imageName, setImageName] = useState<string>('');
	const [ingredients, setIngredients] = useState<Ingredient[]>([
		{ name: '', quantity: '', unit: '' },
	]);
	const [steps, setSteps] = useState<Step[]>([{ description: '' }]);
	const [showToast] = useIonToast();

	const openImageModal = (imageUrl: string) => {
		openImageModalF(imageUrl, setSelectedImage, setShowModal);
	};

	const closeModal = () => {
		closeModalF(setShowModal);
	};

	const validateForm = () => {
		// Validar campos para eventos
		if (isActive[0]) {
			if (!nomEvenement.trim() || !description.trim()) {
				showToast({
					message: "Vous devez remplir tous les champs obligatoires",
					duration: 2000,
					color: "danger",
				});
				return false;
			}
		}

		// Validar campos para recetas
		if (isActive[1]) {
			if (!nomEvenement.trim() || !description.trim() ||
				ingredients.some(ing => !ing.name.trim() || !ing.quantity.trim() || !ing.unit.trim()) ||
				steps.some(step => !step.description.trim())) {
				showToast({
					message: "Vous devez remplir tous les champs obligatoires",
					duration: 2000,
					color: "danger",
				});
				return false;
			}
		}

		return true;
	};



	const handleModalContentClick = (e: React.MouseEvent) => {
		handleModalContentClickF(e);
	};
	const cleanAll = () => {
		setImageFile('');
		setImageName('');
		setNomEvenement('');
		setDescription('');
		setIngredients([{ name: '', quantity: '', unit: '' }]);
		setSteps([{ description: '' }]);
		setIsActive([true, false]);
	};

	useEffect(() => {
		if (user) {
			fetchNews().then(() => {
				setIsLoading(false);
			});
		}
	}, [user]);

	const doRefresh = (event: CustomEvent) => {
		setIsRefreshing(true);
		fetchNews().then(() => {
			event.detail.complete();
			setIsRefreshing(false);
		});
	};
	const fetchNews = async () => {
		setNewsList([]);
		try {
			if (user) {
				const newsFromService = await getNewsForUser(user.id);
				setNewsList(newsFromService);
				setIsLoading(false);
			}
		} catch (error) { }
	};

	// Define the base URL for the images
	const baseUrl =
		'https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/';
	const user_baseUrl =
		'https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/';

	if (!user) {
		return (
			<IonContent className="ion-padding">
				<h2>Connectez-vous pour voir votre fil d'actualité</h2>
				<IonButton routerLink="/login">Se connecter</IonButton>
			</IonContent>
		);
	}

	//function to handle click on farmer card and redirect to farmer page
	const redirectToFarmerProfile = (farmerId: string) => {
		redirectToFarmerProfileF(farmerId);
	};

	const uploadImage = async (file: File, dossier: string) => {
		const fileName = `${dossier}-${user.id}-${Date.now()}-${file.name}`;
		try {
			let { error: uploadError } = await supabase.storage
				.from('news')
				.upload(`images/${fileName}`, file, {
					cacheControl: '3600',
					upsert: false,
				});

			if (uploadError) {
				await showToast({
					message: "Erreur lors de l'ajout l'image",
					duration: 2000,
					color: 'danger',
				});
				console.error('Error to upload file: ' + uploadError.message);
				return 'error';
			}
		} catch (error) {
			console.log(error);
			return 'error';
		}

		return fileName;
	};

	const handleClick = (index: any) => {
		const updateActive = [...isActive];
		if (!isActive[index]) {
			updateActive[index] = !updateActive[index];
			for (let i = 0; i < updateActive.length; i++) {
				if (i !== index) {
					updateActive[i] = false;
				}
			}
		}
		setIsActive(updateActive);
	};

	const handleFileChange = (event: any) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setImageFile(file); // Guardamos el archivo seleccionado en el estado
			setImageName(file.name);
		}
	};

	const navClass = (index: any) =>
		`nav-line ${isActive[index] ? 'active' : ''}`;

	const handleClose = () => {
		setShowFormModal(false);
		setImageFile('');
		setImageName('');
		setNomEvenement('');
		setDescription('');
		setIngredients([{ name: '', quantity: '', unit: '' }]);
		setSteps([{ description: '' }]);
		setIsActive([true, false]);
	};

	const handleIngredientChange = (
		index: number,
		field: keyof Ingredient,
		value: string,
	) => {
		const newIngredients = [...ingredients];
		const currentIngredient = newIngredients[index];
		if (currentIngredient !== undefined) {
			currentIngredient[field] = value;
			setIngredients(newIngredients);
		}
	};

	const handleStepChange = (
		index: number,
		field: keyof Step,
		value: string,
	) => {
		const newSteps = [...steps];
		const currentStep = newSteps[index];
		if (currentStep !== undefined) {
			currentStep[field] = value;
			setSteps(newSteps);
		}
	};

	// Functions to add and remove ingredients / steps
	const addIngredient = () => {
		setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
	};
	const removeIngredient = (index: number) => {
		const newIngredients = ingredients.filter((_, i) => i !== index);
		setIngredients(newIngredients);
	};

	const removeStep = (index: number) => {
		const newSteps = steps.filter((_, i) => i !== index);
		setSteps(newSteps);
	};

	const addStep = () => {
		setSteps([...steps, { description: '' }]);
	};

	const saveIngredients = async (id_recette: string) => {
		try {
			for (const ingredient of ingredients) {
				await supabase.from('ingredient').insert({
					nom_ingredient: ingredient.name,
					quantite_ingredient: ingredient.quantity,
					unite_de_mesure: ingredient.unit,
					id_recette: id_recette,
				});
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout", error);
			await showToast({
				message: `Erreur lors de l'ajout d'un ingrédient`,
				duration: 2000,
				color: 'danger',
			});
		}
	};

	const saveSteps = async (id_recette: string) => {
		try {
			let i = 1;
			for (const step of steps) {
				await supabase.from('etape').insert({
					id_etape: i++,
					description: step.description,
					id_recette: id_recette,
				});
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout de l'étape", error);
			await showToast({
				message: "Erreur lors de l'ajout de l'étape",
				duration: 2000,
				color: 'danger',
			});
		}
	};

	//function to add an event
	const handleSubmit = async (msg: string) => {
		//Validation of the form
		if (!validateForm()) {
			return;
		}

		// Validation of the ingredients
		const invalidQuantity = ingredients.some(ingredient => parseFloat(ingredient.quantity) < 0);
		if (invalidQuantity) {
			await showToast({
				message: "Les quantités ne peuvent pas être négatives",
				duration: 2000,
				color: "danger",
			});
			return;
		}
		const currentDate = new Date();
		const formattedDate = currentDate
			.toISOString()
			.replace('T', ' ')
			.substring(0, 19);
		try {
			setIsButtonDisabled(true);
			let fileName = '';
			if (imageFile && typeof imageFile !== 'string') {
				fileName = await uploadImage(imageFile, msg === 'recette' ? 'recettes' : 'evenements');
			}
			console.log(description);
			let is_recette = false;
			if (msg === 'recette') {
				is_recette = true;
			}
			console.log(is_recette, "recete?");
			let news = {
				nom_evenement: nomEvenement,
				description: description,
				date_creation: formattedDate,
				id_agriculteur: user.id,
				image: fileName,
				is_recette: is_recette,
				is_main: is_recette,
			};
			console.log("news", news);
			const data = await saveNews(news);
			if (data) {
				if (msg === 'recette') {
					await saveIngredients(data);
					await saveSteps(data);
				}
				setShowFormModal(false);
				cleanAll();
				await showToast({
					message: `${msg} a été ajouté avec succès`,
					duration: 2000,
					color: 'success',
				});
			}
			setIsButtonDisabled(false);
			setIsLoading(true);
			await fetchNews();
		} catch (error) {
			console.error(error);
			await showToast({
				message: `Erreur lors de l'ajout d'un ${msg}`,
				duration: 2000,
				color: 'danger',
			});
		}
	};

	function calcul_temps(newsItem: News): React.ReactNode {
		const date_evenement = new Date(newsItem.date_creation);
		const date_actuelle = new Date();
		const diff = date_actuelle.getTime() - date_evenement.getTime();
		const diff_jours = diff / (1000 * 3600 * 24);
		const diff_heures = diff / (1000 * 3600);
		const diff_minutes = diff / (1000 * 60);
		const diff_secondes = diff / 1000;
		if (diff_secondes < 60) {
			return Math.round(diff_secondes) + ' secondes';
		} else if (diff_minutes < 60) {
			return Math.round(diff_minutes) + ' minutes';
		} else if (diff_heures < 24) {
			return Math.round(diff_heures) + ' heures';
		} else {
			return Math.round(diff_jours) + ' jours';
		}
	}

	return (
		<IonContent>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					<IonRefresher slot="fixed" onIonRefresh={doRefresh}>
						<IonRefresherContent pullingText="Tirez pour rafraîchir" />
					</IonRefresher>

					{isRefreshing && (
						<div className="loading-container">
							<img
								src={logo}
								alt="Loading..."
								className="loading-logo-fast"
							/>
						</div>
					)}

					{newsList == null ? (
						<div className="no-news">
							<IonText>Aucun évènement à afficher</IonText>
						</div>
					) : (
						newsList.map((newsItem: News) => (
							<IonCard key={newsItem.id_evenement}>
								<IonCardHeader>
									<IonCardTitle>
										<div className="title_containter">
											<div className="avatar-container">
												<IonAvatar>
													<img
														src={`${user_baseUrl}${newsItem.lien_image_user}`}
														alt="Profile"
														onClick={() =>
															redirectToFarmerProfile(
																newsItem.id_agriculteur,
															)
														}
													/>
												</IonAvatar>
											</div>
											<IonLabel>
												{newsItem.nom_evenement}
											</IonLabel>
										</div>
									</IonCardTitle>
								</IonCardHeader>

								<IonCardContent className="preserve-whitespace">
									{newsItem.image && (
										<img
											src={`${baseUrl}${newsItem.image}`}
											alt={newsItem.nom_evenement}
											onClick={() =>
												openImageModal(
													`${baseUrl}${newsItem.image}`,
												)
											}
										/>
									)}
									{newsItem.description}
								</IonCardContent>
								<p className="distance">
									{calcul_temps(newsItem)}
								</p>
							</IonCard>
						))
					)}

					<IonModal
						isOpen={showModal}
						onDidDismiss={closeModal}
						className="my-custom-class"
					>
						<div className="modal-content" onClick={closeModal}>
							<div
								className="modal-image-container"
								onClick={handleModalContentClick}
							>
								<IonIcon
									icon={closeCircle}
									className="close-icon"
									onClick={closeModal}
								/>
								<img
									src={selectedImage}
									alt="Zoomed in"
									className="zoomed-in-image"
								/>
							</div>
						</div>
					</IonModal>
					<IonFab
						slot="fixed"
						vertical="bottom"
						horizontal="end"
						onClick={() => setShowFormModal(true)}
					>
						<IonFabButton id='my-fab-button'>
							<IonIcon src={add_outline} />
						</IonFabButton>
					</IonFab>
					<IonModal
						isOpen={showFormModal}
						onDidDismiss={() => setShowFormModal(false)}
						className="my-custom-class"
					>
						<div className="modal-content" onClick={closeModal}>
							<div className="modal-form">
								<IonText>Ajouter</IonText>
								<div className="modal-header">
									<div
										className={navClass(0)}
										onClick={() => {
											handleClick(0);
										}}
									>
										<IonText className="nav-text ion-text-center">
											évènement
										</IonText>
									</div>
									<div
										className={navClass(1)}
										onClick={() => {
											handleClick(1);
										}}
									>
										<IonText className="nav-text ion-text-center">
											recette
										</IonText>
									</div>
								</div>
								{isActive[0] ? (
									<>
										<IonList className="modal-list">
											<IonItem>
												<IonInput
													placeholder="Nom de l'évènement"
													onIonChange={(e: any) =>
														setNomEvenement(
															e.detail.value,
														)
													}
												/>
											</IonItem>
											<IonItem>
												<IonTextarea
													placeholder="Description de l'évènement"
													onIonChange={(e: any) => setDescription(e.detail.value)}
													onBlur={(e: any) => setDescription(e.target.value)}
												/>
											</IonItem>
											<IonItem>
												<IonLabel
													position="stacked"
													className="modal-label"
												>
													Image
												</IonLabel>
												<label
													htmlFor="file-upload"
													className="file-upload-label"
												>
													Choisir une image
												</label>
												<input
													id="file-upload"
													type="file"
													accept="image/*"
													onChange={handleFileChange}
													style={{ display: 'none' }}
												/>
											</IonItem>
											{imageName != '' && (
												<IonItem>
													<IonLabel
														position="stacked"
														className="modal-label"
													>
														Image sélectionnée
													</IonLabel>
													<IonText>
														{imageName}
													</IonText>
												</IonItem>
											)}
										</IonList>
										<div className="modal-buttons">
											<IonButton
												expand="block"
												color="danger"
												onClick={() => handleClose()}
												disabled={isButtonDisabled}
											>
												Annuler
											</IonButton>
											<IonButton
												expand="block"
												type="submit"
												onClick={() =>
													handleSubmit('évènement')
												}
												disabled={isButtonDisabled}
											>
												Ajouter
											</IonButton>
										</div>
									</>
								) : (
									<>
										<IonList className="modal-list">
											<IonItem>
												<IonInput
													placeholder="Nom de la recette"
													onIonChange={(e: any) =>
														setNomEvenement(
															e.detail.value,
														)
													}
												/>
											</IonItem>
											<IonItem>
												<IonTextarea
													placeholder="Description de la recette"
													onIonChange={(e: any) =>
														setDescription(
															e.detail.value,
														)
													}
												/>
											</IonItem>
											<IonItem>
												<IonLabel
													position="stacked"
													className="modal-label"
												>
													Ingredients
												</IonLabel>
												<div className="items-content">
													{ingredients.map(
														(ingredient, index) => (
															<div
																key={index}
																className="item-input"
															>
																<IonItem>
																	<IonInput
																		placeholder="Nom"
																		className="name-input"
																		value={
																			ingredient.name
																		}
																		onIonChange={e =>
																			handleIngredientChange(
																				index,
																				'name',
																				e
																					.detail
																					.value ??
																				'',
																			)
																		}
																	/>
																</IonItem>
																<IonItem>
																	<IonInput
																		placeholder="Quantité"
																		type="text"
																		inputmode="numeric"
																		pattern="\d*"
																		className="number-input"
																		min={0}
																		maxlength={3}
																		value={
																			ingredient.quantity
																		}
																		onIonChange={e =>
																			handleIngredientChange(
																				index,
																				'quantity',
																				e
																					.detail
																					.value ??
																				'',
																			)
																		}
																	/>
																</IonItem>
																<IonItem>
																	<IonSelect
																		placeholder="Unité"
																		value={
																			ingredient.unit
																		}
																		onIonChange={e =>
																			handleIngredientChange(
																				index,
																				'unit',
																				e
																					.detail
																					.value ??
																				'',
																			)
																		}
																	>
																		<IonSelectOption value="g">
																			g
																		</IonSelectOption>
																		<IonSelectOption value="kg">
																			kg
																		</IonSelectOption>
																		<IonSelectOption value="l">
																			l
																		</IonSelectOption>
																		<IonSelectOption value="cl">
																			cl
																		</IonSelectOption>
																		<IonSelectOption value="ml">
																			ml
																		</IonSelectOption>
																		<IonSelectOption value="cuillère à café">
																			cuillère
																			à
																			café
																		</IonSelectOption>
																		<IonSelectOption value="cuillère à soupe">
																			cuillère
																			à
																			soupe
																		</IonSelectOption>
																		<IonSelectOption value="pièce">
																			pièce
																		</IonSelectOption>
																	</IonSelect>
																</IonItem>
																<IonItem>
																	<IonButton
																		color="danger"
																		onClick={() =>
																			removeIngredient(
																				index,
																			)
																		}
																	>
																		Supprimer
																	</IonButton>
																</IonItem>
															</div>
														),
													)}
												</div>
												<IonButton
													className="btn-ajouter"
													onClick={addIngredient}
												>
													Ajouter un ingrédient
												</IonButton>
											</IonItem>
											<IonItem>
												<IonLabel
													position="stacked"
													className="modal-label"
												>
													Etapes
												</IonLabel>
												<div className="items-content">
													{steps.map(
														(step, index) => (
															<div
																key={index}
																className="item-input step"
															>
																<IonItem>
																	<IonTextarea
																		placeholder={`Étape ${index +
																			1
																			}`}
																		value={
																			step.description
																		}
																		onIonChange={e =>
																			handleStepChange(
																				index,
																				'description',
																				e
																					.detail
																					.value ??
																				'',
																			)
																		}
																	/>
																</IonItem>
																<IonItem>
																	<IonButton
																		color="danger"
																		onClick={() =>
																			removeStep(
																				index,
																			)
																		}
																	>
																		Supprimer
																	</IonButton>
																</IonItem>
															</div>
														),
													)}
												</div>
												<IonButton
													className="btn-ajouter"
													onClick={addStep}
												>
													Ajouter une étape
												</IonButton>
											</IonItem>

											<IonItem>
												<IonLabel
													position="stacked"
													className="modal-label"
												>
													Image
												</IonLabel>
												<label
													htmlFor="file-upload"
													className="file-upload-label"
												>
													Choisir une image
												</label>
												<input
													id="file-upload"
													type="file"
													accept="image/*"
													onChange={handleFileChange}
													style={{ display: 'none' }}
												/>
											</IonItem>
											{imageName != '' && (
												<IonItem>
													<IonLabel
														position="stacked"
														className="modal-label"
													>
														Image sélectionnée
													</IonLabel>
													<IonText>
														{imageName}
													</IonText>
												</IonItem>
											)}
										</IonList>
										<div className="modal-buttons">
											<IonButton
												expand="block"
												color="danger"
												onClick={() => handleClose()}
												disabled={isButtonDisabled}
											>
												Annuler
											</IonButton>
											<IonButton
												id="submit-recipe"
												expand="block"
												type="submit"
												onClick={() =>
													handleSubmit('recette')
												}
												disabled={isButtonDisabled}
											>
												Ajouter
											</IonButton>
										</div>
									</>

								)}
							</div>
						</div>
					</IonModal>
				</>
			)}
		</IonContent>
	);
};

export default FarmerEvents;

