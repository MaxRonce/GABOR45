// Home.tsx
// React
import React, { useState, useEffect } from "react";

// Ionic Framework Components
import {
	IonPage,
	IonContent,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonModal,
	IonIcon,
} from "@ionic/react";

// Services and Models
import { News } from "../models/News";
import { getGlobalNews } from "../services/global_news_service";

// Custom styling and Assets
import "./Home.css";
import logo from "../assets/logo_Gabor45_notxt.svg";

// Ionicons
import { closeCircle } from "ionicons/icons";

const Home: React.FC = () => {
	const [newsList, setNewsList] = useState<News[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");

	const openImageModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const handleModalContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	useEffect(() => {
		const fetchNews = async () => {
			const newsFromService = await getGlobalNews();
			setNewsList(newsFromService);
		};
		fetchNews();
	}, []);

	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
	function calcul_temps(newsItem: News): React.ReactNode {
		const date_evenement = new Date(newsItem.date_creation);
		const date_actuelle = new Date();
		const diff = date_actuelle.getTime() - date_evenement.getTime();
		const diff_jours = diff / (1000 * 3600 * 24);
		const diff_heures = diff / (1000 * 3600);
		const diff_minutes = diff / (1000 * 60);
		const diff_secondes = diff / 1000;
		if (diff_secondes < 60) {
			return Math.round(diff_secondes) + " secondes";
		} else if (diff_minutes < 60) {
			return Math.round(diff_minutes) + " minutes";
		} else if (diff_heures < 24) {
			return Math.round(diff_heures) + " heures";
		} else {
			return Math.round(diff_jours) + " jours";
		}
	}

	return (
		<IonPage>
			<IonContent>
				{newsList.map((newsItem: News) => (
					<IonCard key={newsItem.id_evenement}>
						<IonCardHeader className="head">
							<div className="title_containter">
								<div className="avatar-container">
									<img
										src={logo}
										alt="icon"
										className="logo-news"
									/>
								</div>
								<IonCardTitle>
									{newsItem.nom_evenement}
								</IonCardTitle>
							</div>
						</IonCardHeader>
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
						<IonCardContent>{newsItem.description}</IonCardContent>
						<p className="distance">{calcul_temps(newsItem)}</p>
					</IonCard>
				))}

				<IonModal
					isOpen={showModal}
					onDidDismiss={closeModal}
					className="my-custom-class"
				>
					<div className="modal-content" onClick={closeModal}>
						{}
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
			</IonContent>
		</IonPage>
	);
};

export default Home;
