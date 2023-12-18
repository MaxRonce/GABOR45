// React and React Router
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

// Ionic Framework Components
import {
	IonList,
	IonCard,
	IonCardContent,
	IonContent,
	IonCardHeader,
	IonCardTitle,
	IonTitle,
} from "@ionic/react";

// Services and Models
import { Farmer } from "../../models/Farmer";
import {
	getUsersWithFarmersByCategory,
	getCategories,
} from "../../services/farmerServiceCategory";

const FarmerProduit = () => {
	const [farmers, setFarmers] = useState<Farmer[]>([]);
	const history = useHistory();
	const [categories, setCategories] = useState<[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getUsersWithFarmersByCategory();
			setFarmers(data);

			const categories = await getCategories(data);
			setCategories(categories);
			console.log("categories tsx: ", categories);
		};

		fetchData().then((r) => console.log("data", r));
	}, []);

	const handleCardClick = (farmerId: string) => {
		console.log("id: ", farmerId);
		history.push({
			pathname: `/farmers/produits/${farmerId}`,
			state: { farmerId: farmerId },
		});
	};

	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

	return (
		<IonContent>
			{categories.map((category: any) => (
				<div key={category}>
					<IonTitle>{category}</IonTitle>
					<IonList>
						{farmers
							.filter(
								(farmer) =>
									farmer.type_produit_principal === category
							)
							.map((farmer) => (
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
							))}
					</IonList>
				</div>
			))}
		</IonContent>
	);
};

export default FarmerProduit;
