import React, { useState, useEffect } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList } from '@ionic/react';
import { Farmer } from '../../models/Farmer';
import { useHistory } from 'react-router-dom';
import {getUsersWithFarmers} from '../../services/farmerService';
import './Farmers.css';
const FarmerPage= () => {
    const [farmers, setFarmers] = useState<Farmer[]>([]);

    const history = useHistory(); // Ajoutez cette ligne


    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsersWithFarmers();
            setFarmers(data);
        };

        fetchData().then(r => console.log("data", r));
    }, []);

    const handleCardClick = (farmerId: string) => {
        console.log("id: ", farmerId);
        history.push({
            pathname: `/farmers/producteurs/${farmerId}`,
            state: { farmerId: farmerId }
        });
    };

    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    return (
            <IonContent>
                <IonList>
                    {farmers.map(farmer => (
                        <div key={farmer.id_utilisateur} onClick={() => handleCardClick(farmer.id_utilisateur)}>
                            <IonCard className="farmer-card">
                                <img className="farmer_img" src={`${baseUrl}${farmer.lien_image_user}`} alt="Image de l'agriculteur" />
                                <div className="farmer-info">
                                    <IonCardHeader>
                                        <IonCardTitle>{farmer.nom_ferme}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{farmer.type_produit_principal}</p>
                                        <p>
                                            {farmer.prenom} {farmer.nom}</p>
                                    </IonCardContent>
                                </div>
                            </IonCard>

                        </div>
                    ))}
                </IonList>
                
            </IonContent>
    );
};

export default FarmerPage;





