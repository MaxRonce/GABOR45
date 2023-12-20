// React and React Router
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Ionic Components
import { IonPage, IonContent, IonButton } from "@ionic/react";

// Supabase Components
import { supabase } from "../../supabaseClient";
import { User } from "@supabase/supabase-js";

// Models and Services
import { Utilisateur } from "../../models/User";
import { getUserInfo } from "../../services/userService";

// Custom Components
import LoadingScreen from "../../components/LoadingScreen";
import { useAuth } from "../../hooks/useAuth";

// Custom Styling
import "./Profile.css";

const Profile: React.FC = () => {
	const t = useAuth();
	const baseUrl =
		"https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
	const [user, setUser] = useState<User | null>(null);
	const [util, setUtil] = useState<Utilisateur | null>(null);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("ici ca fetch user");
				if (user != null) {
					console.log(user);
					console.log(user.id);
					console.log("ici ca fetch user");
					const userData = await getUserInfo(user.id);
					console.log(userData);
					setUtil(userData);
					setIsLoading(false);
				} else
					console.log("pas de user donc pas de fetch de user info");
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				//setIsLoading(false);
			}
		};
		setUser(t);

		fetchData();
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
			{isLoading ? (
				<LoadingScreen />
			) : user ? (
				<div>
					Bonjour {user.email}
					<IonButton onClick={signOut}>Se déconnecter</IonButton>
					<IonButton onClick={redirectToProfileEdit}>Edit</IonButton>
				</div>
			) : (
				<div>
					Vous n'êtes pas connecté.
					<IonButton onClick={redirectToLogin}>
						Se connecter
					</IonButton>
				</div>
			)}
		</IonPage>
	);
};
export default Profile;
