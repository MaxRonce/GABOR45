// React and React Router
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Ionic Components
import { IonButton } from "@ionic/react";

// Custom Styling
import "./ProfileEdit.css";

const ProfileEdit: React.FC = () => {
	const { user_id } = useParams<{ user_id: string }>();
	const history = useHistory();

	const [formData, setFormData] = useState({
		nom: "",
		prenom: "",
		email: "",
		num_tel: "",
	});

	useEffect(() => {
		if (!user_id) {
			history.push("/login");
		} else {
		}
	}, [user_id, history]);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			// Envoyer une requête au serveur pour mettre à jour les éléments de l'utilisateur avec les nouvelles valeurs
			// Utiliser formData pour récupérer les nouvelles valeurs des champs de formulaire
			// Rediriger l'utilisateur vers la page de profil mise à jour après la soumission réussie du formulaire
		} catch (error) {
			// Gérer les erreurs de requête et afficher un message d'erreur si nécessaire
		}
	};

	return (
		<form className="editForm" onSubmit={handleSubmit}>
			<label>
				Nom :
				<input
					type="text"
					name="nom"
					value={formData.nom}
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Prénom :
				<input
					type="text"
					name="prenom"
					value={formData.prenom}
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Adresse e-mail :
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Numéro de téléphone :
				<input
					type="tel"
					name="num_tel"
					value={formData.num_tel}
					onChange={handleInputChange}
				/>
			</label>
			<IonButton type="submit">Enregistrer</IonButton>
		</form>
	);
};

export default ProfileEdit;
