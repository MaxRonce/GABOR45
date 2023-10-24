import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList } from '@ionic/react';
import { Farmer } from '../models/Farmer';
import {getUsersWithFarmers} from '../services/farmerService';

const FarmerPage: React.FC = () => {
    const [farmers, setFarmers] = useState<Farmer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsersWithFarmers();
            setFarmers(data);
        };

        fetchData().then(r => console.log("data", r));
    }, []);

    //base url for the images
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {farmers.map(farmer => (
                        <IonCard key={farmer.id}>
                            <IonImg src={`${baseUrl}${farmer.lien_image}`} alt="Image de l'agriculteur" />
                            <IonCardHeader>
                                <IonCardTitle>{farmer.prenom} {farmer.nom}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{farmer.description}</p>
                                <p>{farmer.adresse}</p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default FarmerPage;
