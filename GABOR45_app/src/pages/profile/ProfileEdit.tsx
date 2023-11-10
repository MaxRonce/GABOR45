import { IonButton } from "@ionic/react";
import { useState } from "react";
import "./ProfileEdit.css";

const ProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    num_tel: "",
    // Ajouter d'autres champs ici si nécessaire
  });

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
      {/* Ajouter d'autres champs de formulaire ici si nécessaire */}
      <IonButton type="submit">Enregistrer</IonButton>
    </form>
  );
}

export default ProfileEdit;