import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { supabase } from '../../supabaseClient';
import LoadingScreen from '../../components/LoadingScreen'; // Adjust the import path as needed

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Rayon de la terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en km
    return distance;
}

function toRad(value: number) {
    return (value * Math.PI) / 180;
}




const Tab3: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // Add a state to manage loading status

    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    useEffect(() => {
        // Simulate a loading process, for example fetching data
        const loadData = async () => {
            // Pretend we're loading data, then set loading to false
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 2 seconds
            setIsLoading(false); // Hide the loading screen
        };

        loadData();
    }, []);

    // Un lieu spécifique, par exemple la Tour Eiffel 48.85835473209913, 2.2944613664788105
    const destination = { latitude: 48.85835473209913, longitude: 2.2944613664788105 };


    // Embedded Map with adjusted style
    const mapIframe = `
    <iframe
      src="https://www.google.com/maps/d/u/0/embed?mid=1ny_1TOrj65dwzkjIgKCLnqCDwkyzhjA&ehbc=2E312F&z=9"
      class="map-iframe"
    ></iframe>`;


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Debug Tab</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {/* ... existing IonCard for distance if applicable ... */}
                        {/* Embedded Map in a container */}
                        <div className="map-container" dangerouslySetInnerHTML={{ __html: mapIframe }} />
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Tab3;



