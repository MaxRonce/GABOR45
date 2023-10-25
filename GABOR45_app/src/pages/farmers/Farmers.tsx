import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList } from '@ionic/react';
import { Farmer } from '../../models/Farmer';
import { useHistory } from 'react-router-dom';
import {getUsersWithFarmers} from '../../services/farmerService';
import './Farmers.css';

const FarmerPage: React.FC = () => {
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
        history.push({
            pathname: `/farmers/${farmerId}`,
            state: { farmerId: farmerId }
        });
    };

    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {farmers.map(farmer => (
                        <div key={farmer.id} onClick={() => handleCardClick(farmer.id)}>
                            <IonCard className="farmer-card">
                                <IonImg src={`${baseUrl}${farmer.lien_image}`} alt="Image de l'agriculteur" />
                                <IonCardHeader>
                                    <IonCardTitle>{farmer.prenom} {farmer.nom}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p>{farmer.description}</p>
                                    <p>{farmer.adresse}</p>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default FarmerPage;





