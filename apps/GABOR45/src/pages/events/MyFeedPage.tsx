import React, { useState, useEffect } from "react";
import {
	IonPage,
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
} from "@ionic/react";
import { getNewsForUser } from "../../services/newsService";
import { News } from "../../models/News";
import { useAuth } from "../../hooks/useAuth";
import { closeCircle } from "ionicons/icons";
import logo from "../../assets/logo_Gabor45_notxt.svg";
import "../farmers/NewsFarmerPage.css";
import "../../components/LoadingScreen.css";
import "./MyFeedPage.css";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { openImageModalF, closeModalF, handleModalContentClickF, redirectToFarmerProfileF } from "./FunctionsEvents";

const MyFeedPage: React.FC = () => {
	const user = useAuth();
	const [newsList, setNewsList] = useState<News[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [isRefreshing, setIsRefreshing] = useState(false);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const openImageModal = (imageUrl: string) => {
		openImageModalF(imageUrl, setSelectedImage, setShowModal);
	};

	const closeModal = () => {
		closeModalF(setShowModal);
	};

	const handleModalContentClick = (e: React.MouseEvent) => {
		handleModalContentClickF(e);
	};

	useEffect(() => {
		if (user) {
            fetchNews().then(() => {
                setIsLoading(false);
            });
        }
		
	}, [user]);

	// Define the base URL for the images
	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
	const user_baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

	if (!user) {
		return (
			<IonContent className="ion-padding">
				<h2>Connectez-vous pour voir votre fil d'actualité</h2>
				<IonButton routerLink="/login">Se connecter</IonButton>
			</IonContent>
		);
	}

	const doRefresh = (event: CustomEvent) => {
		setIsRefreshing(true);
		fetchNews().then(() => {
			event.detail.complete();
			setIsRefreshing(false);
		});
	};

	const fetchNews = async () => {
		// Fonction to get the news for the user
		if (user) {
			const newsFromService = await getNewsForUser(user.id);
			setNewsList(newsFromService);
		}
	};

	//function to handle click on farmer card and redirect to farmer page
	const redirectToFarmerProfile = (farmerId: string) => {
		redirectToFarmerProfileF(farmerId);
	};

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

					{newsList.map((newsItem: News) => (
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
															newsItem.id_agriculteur
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

							<IonCardContent>
								{newsItem.image && (
									<img
										src={`${baseUrl}${newsItem.image}`}
										alt={newsItem.nom_evenement}
										onClick={() =>
											openImageModal(
												`${baseUrl}${newsItem.image}`
											)
										}
									/>
								)}
								{newsItem.description}
							</IonCardContent>
						</IonCard>
					))}

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
				</>
			)}
		</IonContent>
	);
};

export default MyFeedPage;
