//React and React Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation, useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid,
   IonRow, IonCol, IonText, IonHeader } from '@ionic/react';
import { useAuth } from "../../hooks/useAuth";
import MyFeedPage from "./MyFeedPage";
import FarmerEvents from "./FarmerEvents";
import { verifyUser } from "../../services/newsService";

const IndexEvents: React.FC = () => {
    const [isFarmer, setIsFarmer] = useState<boolean>(false); // State for the initial page [producteurs, produits
    const [error, setError] = useState<boolean>(false) // State for the search query
    const user = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFarmer(await verifyUser(user?.id || ""));
            } catch (error) {
                setError(true);
            }
        };
        fetchData();
    },[user]);
    return (
        <IonPage>
            <IonContent>
                {isFarmer ? (
                    <FarmerEvents />
                ) : (
                    <MyFeedPage />
                ) }
            </IonContent>
        </IonPage>
    );
}

export default IndexEvents;