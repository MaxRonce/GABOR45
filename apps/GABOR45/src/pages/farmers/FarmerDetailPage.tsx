// React and React Router
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Ionic Framework Components
import {
	IonPage,
	IonIcon,
	IonBackButton,
	IonButtons,
	IonAlert,
} from "@ionic/react";
import { newspaperOutline } from "ionicons/icons";

// Services and Models
import { Farmer } from "../../models/Farmer";
import { getUserWithFarmer } from "../../services/farmerDetailService";
import { Horaires } from "../../models/Horaires";
import { getHorairesFerme } from "../../services/horaires_point_de_vente";
import { followFarmer, unfollowFarmer } from "../../services/follow_service";
import { User } from "@supabase/supabase-js";

// Supabase Client
import { supabase } from "../../supabaseClient";

// Custom Components and Styling
import LoadingScreen from "../../components/LoadingScreen";
import "./FarmerDetailPage.css";

// Icons
import facebookIcon from "../../icons/facebook_mini.svg";
import instagramIcon from "../../icons/instagram_mini.svg";
import globeIcon from "../../icons/globe.svg";

const Farmer_detail_page: React.FC = () => {
	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
	const { farmerId } = useParams<{ farmerId: string }>();
	const [data, setData] = useState<Farmer | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showLoginAlert, setShowLoginAlert] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const history = useHistory();

	const [isFollowing, setIsFollowing] = useState(false);

	const [horairesList, setHorairesList] = useState<Horaires[]>([]);

	const handleFollow = async () => {
		if (user) {
			try {
				await followFarmer(user.id, farmerId);
				console.log("Agriculteur suivi!");
				setIsFollowing(true);
			} catch (error) {
				console.error("Erreur lors du suivi de l'agriculteur:", error);
			}
		} else {
			setShowLoginAlert(true);
		}
	};

	const handleUnfollow = async () => {
		if (user) {
			try {
				await unfollowFarmer(user.id, farmerId);
				console.log("Vous ne suivez plus cet agriculteur.");
				setIsFollowing(false);
			} catch (error) {
				console.error(
					"Erreur lors de l'arrêt du suivi de l'agriculteur:",
					error
				);
			}
		} else {
			setShowLoginAlert(true);
		}
	};

	useEffect(() => {
		const checkIfUserIsFollowing = async () => {
			if (user && farmerId) {
				try {
					const { data, error } = await supabase
						.from("follow")
						.select("*")
						.eq("id_utilisateur", user.id)
						.eq("id_agriculteur", farmerId)
						.maybeSingle();

					setIsFollowing(!!data);
				} catch (error) {
					console.error(
						"Erreur lors de la vérification du suivi:",
						error
					);
				}
			}
		};

		checkIfUserIsFollowing().then((r) => console.log(r));
	}, [user, farmerId]);

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				const currentUser = session?.user;
				// @ts-ignore
				setUser(currentUser);
			}
		);
		const fetchData = async () => {
			try {
				const userData = await getUserWithFarmer(farmerId);
				setData(userData);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData().then((r) => console.log(r));

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, [farmerId]);

	useEffect(() => {
		const fetchHoraires = async () => {
			const horairesFromService = await getHorairesFerme(farmerId);
			setHorairesList(horairesFromService);
		};
		fetchHoraires();
	}, [farmerId]);

	return (
		<IonPage>
			{isLoading ? (
				<LoadingScreen />
			) : data ? (
				<>
					<div className="image_mask">
						<img
							className="farmer_img_round"
							src={`${baseUrl}${data.lien_image_user}`}
							alt="Image de l'agriculteur"
						/>
					</div>
					<IonButtons slot="start" className="back_button">
						<IonBackButton defaultHref="/farmer" /> {}
					</IonButtons>
					<div className="header-container">
						<h1>{data.nom_ferme}</h1>
					</div>
					<div className="button_rows">
						<button
							className={`follow_button ${
								isFollowing ? "followed" : ""
							}`}
							onClick={
								isFollowing ? handleUnfollow : handleFollow
							}
						>
							{isFollowing ? "Suivi" : "Suivre"}
						</button>
						<button
							color="secondary"
							onClick={() =>
								history.push(
									`/farmers/producteurs/${farmerId}/news`
								)
							}
						>
							<IonIcon slot="start" icon={newspaperOutline} />
							News
						</button>
					</div>
					<div className="page_content">
						<div>
							<h2>
								{data.nom} {data.prenom}
							</h2>
						</div>
						<div className="social-media-links">
							{data.facebook && (
								<a
									href={data.facebook}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={facebookIcon}
										alt="Facebook"
										className="icon-svg"
									/>
								</a>
							)}
							{data.instagram && (
								<a
									href={data.instagram}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={instagramIcon}
										alt="Instagram"
										className="icon-svg"
									/>
								</a>
							)}
							{data.website && (
								<a
									href={`https://${data.website}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={globeIcon}
										alt="Website"
										className="icon-svg"
									/>
								</a>
							)}
						</div>
						<div>
							<p className="production">
								<b>Production : </b>
								{data.description}
							</p>
						</div>

						{horairesList != null && (
							<div>
								<b>Horaires : </b>
								<table className="horaires">
									<tbody>
										{horairesList &&
											horairesList.map(
												(horairesItem: Horaires) => (
													<tr
														key={
															horairesItem.id_horaires
														}
													>
														<td>
															<b>
																{
																	horairesItem.jour
																}
															</b>{" "}
															:{" "}
														</td>
														<td>
															{horairesItem.heure_debut_matin?.slice(
																0,
																5
															)}
															-
															{horairesItem.heure_fin_matin?.slice(
																0,
																5
															)}
														</td>
														<td>
															{horairesItem.heure_debut_apres_midi?.slice(
																0,
																5
															)}
															-
															{horairesItem.heure_fin_apres_midi?.slice(
																0,
																5
															)}
														</td>
													</tr>
												)
											)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</>
			) : (
				<LoadingScreen />
			)}
			<IonAlert
				isOpen={showLoginAlert}
				onDidDismiss={() => setShowLoginAlert(false)}
				header={"Connexion requise"}
				message={
					"Vous devez être connecté pour suivre cet agriculteur."
				}
				buttons={[
					{
						text: "Annuler",
						role: "cancel",
						cssClass: "secondary",
						handler: (blah) => {
							console.log("Confirm Cancel");
						},
					},
					{
						text: "Se connecter",
						handler: () => {
							history.push("/login");
						},
					},
				]}
			/>
		</IonPage>
	);
};

export default Farmer_detail_page;
