// React and React Router
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
	IonList,
	IonCard,
	IonCardContent,
	IonContent,
	IonCardHeader,
	IonCardTitle,
	IonText,
} from "@ionic/react";

// Models and Services
import { Farmer } from "../../models/Farmer";
import { getUsersWithFarmersByCategory } from "../../services/CategorieService";

// Custom Components
import LoadingScreen from "../../components/LoadingScreen";

//Custom Styling
import "./Categories.css";

function calculateDistance(
	lat1: number | null,
	lon1: number | null,
	lat2: number | null,
	lon2: number | null
) {
	if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
		return null;
	} else {
		const R = 6371; // Earth radius in km
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c; // Distance in km
		return Math.round(distance);
	}
}
function toRad(value: number) {
	return (value * Math.PI) / 180;
}

const FarmersByCategory: React.FC<{ categoryId: string }> = ({
	categoryId,
}) => {
	const [data, setData] = useState<Farmer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const history = useHistory();
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const cate = await getUsersWithFarmersByCategory(categoryId);
			console.log("data: ", cate);
			setData(cate);
			setIsLoading(false);
		};

            fetchData().then(r => console.log("data", r));
    }, []); 
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

  
    const handleCardClick = (farmerId: string) => {
        history.push({
            pathname: `/farmers/producteurs/${farmerId}`,
            state: { farmerId: farmerId }
        });
    };
    

	return (
		<IonContent>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					{data != null ? (
						<>
							<div className="header-content">
								<IonText className="title-category">
									Agriculteurs producteurs de :{" "}
								</IonText>
								<IonText className="button-category">
									{data[0].type_produit_principal}
								</IonText>
							</div>
							<IonList>
								{data.map((farmer) => (
									<div
										key={farmer.id_utilisateur}
										onClick={() =>
											handleCardClick(
												farmer.id_utilisateur
											)
										}
									>
										<IonCard className="farmer-card">
											<img
												className="farmer_img"
												src={`${baseUrl}${farmer.lien_image_user}`}
												alt="Image de l'agriculteur"
											/>
											<div className="farmer-info">
												<IonCardHeader>
													<IonCardTitle className="farm_name">
														{farmer.nom_ferme}
													</IonCardTitle>
												</IonCardHeader>
												<IonCardContent>
													<p className="produit_principal">
														{
															farmer.type_produit_principal
														}
													</p>
													<p className="nom_prenom_agri">
														{farmer.prenom}{" "}
														{farmer.nom}
													</p>
													{userLocation && (
														<p className="distance">
															{calculateDistance(
																farmer.latitude,
																farmer.longitude,
																userLocation.latitude,
																userLocation.longitude
															)}{" "}
															km
														</p>
													)}
												</IonCardContent>
											</div>
										</IonCard>
									</div>
								))}
							</IonList>
						</>
					) : (
						<p>
							Aucun agriculteur disponible dans cette catégorie.
						</p>
					)}
				</>
			)}
		</IonContent>
	);
};

export default FarmersByCategory;
