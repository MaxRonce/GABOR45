import { useParams } from "react-router";
import {IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonButton, IonIcon} from "@ionic/react";
import { newspaperOutline } from 'ionicons/icons';
import {Farmer} from '../../models/Farmer';
import {getUserWithFarmer} from "../../services/farmerDetailService";
import React, {useEffect, useState} from "react";
import './FarmerDetailPage.css';
import LoadingScreen from "../../components/LoadingScreen";
import { IonLoading } from '@ionic/react';

const Farmer_detail_page: React.FC = () => {
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
    const { farmerId } = useParams<{ farmerId: string }>();
    const [data, setData] = useState<Farmer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserWithFarmer(farmerId);
                setData(userData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData().then(r => console.log(r));
    }, [farmerId]);

    return (
        <IonPage>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                data ? (
                    <>
                        <div className="image_mask">
                            <img className="farmer_img_round" src={`${baseUrl}${data.lien_image_user}`} alt="Image de l'agriculteur" />
                        </div>
                        <div className="header-container">
                            <h1>{data.nom_ferme}</h1>
                        </div>
                        <div className="button_rows">
                            <button id="follow_button">Suivre</button>
                            <button color="secondary">
                                <IonIcon slot="start" icon={newspaperOutline} />
                                News
                            </button>
                        </div>
                        <div className="page_content">
                            <div>
                                <h2>{data.nom} {data.prenom}</h2>
                            </div>
                            <div>
                                <p className="production"><b>Production : </b>{data.description}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <LoadingScreen />
                )
            )}
        </IonPage>
    );
}

export default Farmer_detail_page;
