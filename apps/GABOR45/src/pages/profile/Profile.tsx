// React and React Router
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Ionic Components
import { IonPage, IonContent, IonButton } from "@ionic/react";

// Supabase Components
import { supabase } from "../../supabaseClient";
import { User } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";

// Models and Services
import { Utilisateur } from "../../models/User";
import { getUserInfo } from "../../services/userService";

// Custom Components
import LoadingScreen from "../../components/LoadingScreen";

// Custom Styling
import "./Profile.css";

const Profile: React.FC = () => {
	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
	const [user, setUser] = useState<User | null>(null);
	const [util, setUtil] = useState<Utilisateur | null>(null);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
				if (user != null) {
					const userData = await getUserInfo(user.id);
					setUtil(userData);
					console.log(userData);
				}
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	const redirectToLogin = () => {
		history.push("/login");
	};

	const redirectToProfileEdit = () => {
		if (user) {
			history.push(`/profile_edit/${user.id}`);
		} else {
			history.push("/login");
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			console.log("Déconnexion réussie");
			history.push("/profile");
		}
	};

	return (
		<IonPage>
			<IonContent>
				{user ? (
					<div>
						Bonjour {user.email}
						<IonButton onClick={signOut}>Se déconnecter</IonButton>
						<IonButton onClick={redirectToProfileEdit}>
							{" "}
							Edit{" "}
						</IonButton>
					</div>
				) : (
					<div>
						Vous n'êtes pas connecté.
						<IonButton onClick={redirectToLogin}>
							Se connecter
						</IonButton>
					</div>
				)}
			</IonContent>
		</IonPage>
	);
};
export default Profile;
