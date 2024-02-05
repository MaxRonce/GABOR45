// React and React Router
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// Ionic Framework Components
import {
	IonPage,
	IonContent,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonModal,
	IonButton,
	IonIcon,
} from '@ionic/react';

// Services and Models
import { calcul_temps, getNewsByFarmer } from '../../services/newsService';
import { News } from '../../models/News';

// Custom Styling
import './NewsFarmerPage.css';

// Ionicons
import { closeCircle } from 'ionicons/icons';

const NewsFarmerPage: React.FC = () => {
	const { farmerId } = useParams<{ farmerId: string }>();
	const [newsList, setNewsList] = useState<News[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

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
			if (farmerId) {
				const newsFromService = await getNewsByFarmer(farmerId);
				setNewsList(newsFromService);
			}
		};
		
		fetchNews();
	}, [farmerId]);
	console.log(newsList);
	const baseUrl =
		'https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/';
	return (
		<IonPage>
			<IonContent>
				{newsList ? (
					newsList.map((newsItem: News) => (
						<IonCard key={newsItem.id_evenement}>
							<IonCardHeader>
								<IonCardTitle>
									{newsItem.nom_evenement}
								</IonCardTitle>
							</IonCardHeader>
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
							<IonCardContent>
								{newsItem.description}
							</IonCardContent>
							<p className="distance">
								{calcul_temps(newsItem)}
							</p>
						</IonCard>
					))
				) : (
					<div>
						<p>Aucune actualité disponible pour cet agriculteur.</p>
						<IonButton
							onClick={() => {
								window.history.back();
							}}
						>
							Retour
						</IonButton>
					</div>
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
			</IonContent>
		</IonPage>
	);
};

export default NewsFarmerPage;
