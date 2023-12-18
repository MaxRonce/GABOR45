// React and React Router
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Ionic Framework Components
import {
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonList,
} from "@ionic/react";

// Services and Models
import { Farmer } from "../../models/Farmer";
import { getUserWithFarmerSearch } from "../../services/searchBarService";

// Custom Styling and Components
import "./Farmers.css";
import LoadingScreen from "../../components/LoadingScreen";

const FarmerSearchPage: React.FC<{ searchQuery: string; page: string }> = ({
	searchQuery,
	page,
}) => {
	const [id, setId] = useState<string>("");
	const [data, setData] = useState<Farmer | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const history = useHistory();
	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const query = "%" + searchQuery + "%";
			console.log("query", query);
			let userData = null;
			if (page === "producteurs") {
				console.log("page producteurs");
				userData = await getUserWithFarmerSearch(query);
				setData(userData);
				setId(userData.id_utilisateur);
			} else {
				console.log("page categorires");
			}
			console.log("data c", userData);
			setData(userData);
			setIsLoading(false);
		};
		console.log("dataUse: ", data);
		fetchData().then((r) => console.log("data", r));
	}, [searchQuery]);

	const handleCardClick = (farmerId: string) => {
		console.log("id: ", farmerId);
		history.push({
			pathname: `/farmers/producteurs/${farmerId}`,
			state: { farmerId: farmerId },
		});
	};

	return (
		<IonContent>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					<IonList>
						{Array.isArray(data) ? (
							data.map((farmer) => (
								<div
									key={farmer.id_utilisateur}
									onClick={() =>
										handleCardClick(farmer.id_utilisateur)
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
												<IonCardTitle>
													{farmer.nom_ferme}
												</IonCardTitle>
											</IonCardHeader>
											<IonCardContent>
												<p>
													{
														farmer.type_produit_principal
													}
												</p>
												<p>
													{farmer.prenom} {farmer.nom}
												</p>
											</IonCardContent>
										</div>
									</IonCard>
								</div>
							))
						) : (
							// just one farmer
							<div onClick={() => handleCardClick(id)}>
								<IonCard className="farmer-card">
									<img
										className="farmer_img"
										src={`${baseUrl}${data?.lien_image_user}`}
										alt="Image de l'agriculteur"
									/>
									<div className="farmer-info">
										<IonCardHeader>
											<IonCardTitle>
												{data?.nom_ferme}
											</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											<p>
												{data?.type_produit_principal}
											</p>
											<p>
												{data?.prenom} {data?.nom}
											</p>
										</IonCardContent>
									</div>
								</IonCard>
							</div>
						)}
					</IonList>
				</>
			)}
		</IonContent>
	);
};

export default FarmerSearchPage;
