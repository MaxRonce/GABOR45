import React, { useState, useEffect } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList } from '@ionic/react';
import { Farmer } from '../../models/Farmer';
import { useHistory } from 'react-router-dom';
import {getUsersWithFarmers} from '../../services/farmerService';
import './Farmers.css';
import NabvarComponent from '../../components/NabvarComponent';

import { Geolocation } from '@capacitor/geolocation'; // Importez Geolocation directement
import LoadingScreen from "../../components/LoadingScreen";

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

import { Capacitor } from '@capacitor/core';

async function requestLocationPermission() {
    try {
        if (Capacitor.getPlatform() !== 'web') {
            await Geolocation.requestPermissions();
        }
    } catch (error) {
        console.error('Error requesting location permissions', error);
    }
}

function sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const FarmerPage: React.FC = () => {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const history = useHistory(); // Ajoutez cette ligne
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getUsersWithFarmers();
                setFarmers(data);
            } catch (error) {
                console.error('Error fetching farmers', error);
            }
            setIsLoading(false);
        };

        requestLocationPermission().then(r => console.log(r));

        const getLocation = async () => {
            setIsLoading(true);
            try {
                await requestLocationPermission();
                const coordinates = await Geolocation.getCurrentPosition();
                setUserLocation({
                    latitude: coordinates.coords.latitude,
                    longitude: coordinates.coords.longitude,
                });
            } catch (err) {
                console.error('Could not get user location', err);
            }
            setIsLoading(false);
        };

        fetchData().then(r => console.log(r));
        getLocation().then(r => console.log(r));
    }, []);

    const handleCardClick = (farmerId: string) => {
        history.push({
            pathname: `/farmers/producteurs/${farmerId}`,
            state: { farmerId: farmerId }
        });
    };

    const destination = { latitude: 48.85835473209913, longitude: 2.2944613664788105 };


    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    // @ts-ignore
    return (
            <IonContent>
                {isLoading ? (
                    <LoadingScreen />
                ) : (

                <IonList>
                    {farmers.map(farmer => (
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
                )}
            </IonContent>
    );
};

export default FarmerPage;





