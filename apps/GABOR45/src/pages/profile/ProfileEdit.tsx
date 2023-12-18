import {IonButton} from "@ionic/react";
import "./ProfileEdit.css";
import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';

const ProfileEdit: React.FC = () => {
    const {user_id} = useParams<{ user_id: string }>(); // Assurez-vous que ce nom correspond au paramètre défini dans votre route
    const history = useHistory();

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        num_tel: "",
        // Ajouter d'autres champs ici si nécessaire
    });

    useEffect(() => {
        if (!user_id) {
            // Redirigez vers la page de connexion ou d'accueil si aucun ID utilisateur n'est fourni
            history.push('/login');
        } else {
            // Ici, vous pouvez charger les données de l'utilisateur pour l'édition
        }
    }, [user_id, history]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
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
            {/* Ajouter d'autres champs de formulaire ici si nécessaire */}
            <IonButton type="submit">Enregistrer</IonButton>
        </form>
    );
}

export default ProfileEdit;
