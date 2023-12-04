import {IonList, IonCard, IonCardContent, IonContent, IonCardHeader, IonCardTitle, IonImg, IonTitle, IonButton} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Categories.css';
import { supabase } from '../../supabaseClient';
import LoadingScreen from "../../components/LoadingScreen";
import {getUsersWithFarmersByCategory} from '../../services/CategorieService';
import { Farmer } from '../../models/Farmer';

function calculateDistance(lat1: number | null, lon1: number | null, lat2: number | null, lon2: number | null) {
    if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
        return null;
    }
    else {
        const R = 6371; // Rayon de la terre en km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance en km
        return Math.round(distance);
    }
}
function toRad(value: number) {
    return (value * Math.PI) / 180;
}

const FarmersByCategory: React.FC<{ categoryId: string }> = ({ categoryId }) => {
    const [data, setData] = useState<Farmer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const history = useHistory(); // Ajoutez cette ligne
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const cate = await getUsersWithFarmersByCategory(categoryId);
            console.log("data: ", cate);
            setData(cate);
            console.log("dataC: ", data);
            setIsLoading(false);
        };

            fetchData().then(r => console.log("data", r));
    }, []); 
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

  
    const handleCardClick = (categoryId: string) => {
        console.log("id: ", categoryId);
        history.push({
            //aqui ira la ruta de la pagina de la categoria
        });
    };
    

    return (
        <IonContent>
            {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                    {data != null ? (
                        <IonList>
                            {data.map(farmer => (
                                <div key={farmer.id_utilisateur} onClick={() => handleCardClick(farmer.id_utilisateur)}>
                                    <IonCard className="farmer-card">
                                        <img className="farmer_img" src={`${baseUrl}${farmer.lien_image_user}`} alt="Image de l'agriculteur" />
                                        <div className="farmer-info">
                                            <IonCardHeader>
                                                <IonCardTitle className="farm_name">{farmer.nom_ferme}</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <p className="produit_principal">{farmer.type_produit_principal}</p>
                                                <p className="nom_prenom_agri">
                                                    {farmer.prenom} {farmer.nom}</p>
                                                {userLocation && (
                                                    <p className="distance">
                                                        {calculateDistance(farmer.latitude, farmer.longitude, userLocation.latitude, userLocation.longitude)} km
                                                    </p>
                                                )}
                                            </IonCardContent>
                                        </div>
                                    </IonCard>

                                </div>
                            ))}
                        </IonList>
                    ) : (
                        <p>Aucun agriculteur disponible dans cette catégorie.</p>
                    )}
                    </>
                    
                    )}
        </IonContent>
      );
};

export default FarmersByCategory;