import { useParams } from "react-router";
import {IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonButton, IonIcon} from "@ionic/react";
import { newspaperOutline } from 'ionicons/icons';
import {Farmer} from '../../models/Farmer';
import {getUserWithFarmer} from "../../services/farmerDetailService"; 
import React, {useEffect, useState} from "react";
import './FarmerDetailPage.css';
const Farmer_detail_page: React.FC = () => {
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
    const { farmerId } = useParams<{ farmerId: string }>();
    const [data, setData] = useState<Farmer | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserWithFarmer(farmerId);
                console.log("setData", userData);
                setData(userData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [farmerId]);

    return (
        <IonPage>
            {data ? (
                <IonPage>
                    <img className="farmer_img_round" src={`${baseUrl}${data.lien_image_user}`} alt="Image de l'agriculteur" />

                    <div className="header-container">
                        <h1>{data.nom} {data.prenom}</h1>
                    </div>

                    <div className="button_rows">
                    <button  id="follow_button">Suivre</button>
                    <button color="secondary">
                        <IonIcon slot="start" icon={newspaperOutline} />
                        News
                    </button>
                    </div>

                    <div>
                        <p>{data.description}</p>
                    </div>
                </IonPage>

            ) : (
                <p>Loading... farmer {farmerId ? `Farmer ID: ${farmerId}` : "No Farmer ID provided"}</p>
            )}
        </IonPage>
    );
}

export default Farmer_detail_page;
