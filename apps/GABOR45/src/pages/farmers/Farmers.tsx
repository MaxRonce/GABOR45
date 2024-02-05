// React and React Router
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Ionic Framework Components
import {
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonList,
} from "@ionic/react";

// Services and Models
import { Farmer } from "../../models/Farmer";
import { getUsersWithFarmers } from "../../services/farmerService";

// Custom Components and Styling
import "./Farmers.css";
import LoadingScreen from "../../components/LoadingScreen";

// Capacitor Geolocation
import { Geolocation } from "@capacitor/geolocation";

function calculateDistance(
	lat1: number | null,
	lon1: number | null,
	lat2: number | null,
	lon2: number | null
) {
	if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
		return null;
	} else {
		const R = 6371; // Earth radius in km
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c; // Distance in km
		return Math.round(distance);
	}
}

function toRad(value: number) {
	return (value * Math.PI) / 180;
}

import { Capacitor } from "@capacitor/core";

async function requestLocationPermission() {
	try {
		if (Capacitor.getPlatform() !== "web") {
			await Geolocation.requestPermissions();
		}
	} catch (error) {
		console.error("Error requesting location permissions", error);
	}
}

function sleep(ms: number | undefined) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const FarmerPage: React.FC = () => {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchAndSortFarmers() {
            setIsLoading(true);
    
            try {
                await requestLocationPermission();
                const coordinates = await Geolocation.getCurrentPosition();
                setUserLocation({
                    latitude: coordinates.coords.latitude,
                    longitude: coordinates.coords.longitude,
                });
    
                const data = await getUsersWithFarmers();
                if (data) {
                    const sortedFarmers = data.slice().sort((a:any, b:any) => {
                        const distanceA = calculateDistance(a.latitude, a.longitude, coordinates.coords.latitude, coordinates.coords.longitude);
                        const distanceB = calculateDistance(b.latitude, b.longitude, coordinates.coords.latitude, coordinates.coords.longitude);
    
                        return (distanceA ?? Infinity) - (distanceB ?? Infinity);
                    });
                    setFarmers(sortedFarmers);
                }
            } catch (error) {
                console.error('Error fetching and sorting farmers', error);
            }
    
            setIsLoading(false);
        }
    
        fetchAndSortFarmers();
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

                <IonList className="farmer_list">
                    {farmers.map(farmer => (
                        <div key={farmer.id_utilisateur} onClick={() => handleCardClick(farmer.id_utilisateur)}>
                            <IonCard className="farmer-card">
                                <img className="farmer_img" src={`${baseUrl}${farmer.lien_image_user}`} alt="Image de l'agriculteur" />
                                <div className="farmer-info">
                                    <IonCardHeader className="farm_name">
                                        <IonCardTitle className="farm_name">{farmer.nom_ferme}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent className="card_content">
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
