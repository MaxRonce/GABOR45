import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonModal,
    IonIcon,
    IonButton,
    IonRefresher, IonRefresherContent,
} from '@ionic/react';
import { getNewsForUser } from '../../services/newsService';
import { News } from '../../models/News';
import { useAuth } from '../../hooks/useAuth';
import { closeCircle } from 'ionicons/icons';
import logo from '../../assets/logo_Gabor45_notxt.svg'; // Assurez-vous que le chemin d'accès est correct
import { chevronDownCircleOutline } from 'ionicons/icons';
import '../farmers/NewsFarmerPage.css';



const MyFeedPage: React.FC = () => {
    const user = useAuth();
    const [newsList, setNewsList] = useState<News[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Empêche le clic sur le contenu de fermer le modal
    };

    useEffect(() => {
        const fetchNews = async () => {
            if (user) {
                const newsFromService = await getNewsForUser(user.id);
                setNewsList(newsFromService);
            }
        };

        fetchNews();
    }, [user]);



    // Définissez l'URL de base pour vos images, si elle est différente
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";

    if (!user) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <h2>Connectez-vous pour voir votre fil d'actualité</h2>
                    <IonButton routerLink="/login">Se connecter</IonButton>
                </IonContent>
            </IonPage>
        );
    }

    const doRefresh = (event: CustomEvent) => {
        // Fonction pour rafraîchir les données
        fetchNews().then(() => {
            // Une fois les données rafraîchies, complétez le refresher
            event.detail.complete();
        });
    };

    const fetchNews = async () => {
        // Fonction pour récupérer les nouvelles, similaire à celle utilisée dans useEffect
        if (user) {
            const newsFromService = await getNewsForUser(user.id);
            setNewsList(newsFromService);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={logo} // Your custom SVG icon
                        pullingText="Tirez pour rafraîchir"
                    >
                        <div className="loading-container" slot="refreshing-content">
                            <img src={logo} alt="Loading..." className="loading-logo" />
                        </div>
                    </IonRefresherContent>
                </IonRefresher>

                {newsList.map((newsItem: News) => (
                    <IonCard key={newsItem.id_evenement}>
                        <IonCardHeader>
                            <IonCardTitle>{newsItem.nom_evenement}</IonCardTitle>
                        </IonCardHeader>
                        {newsItem.image && (
                            <img
                                src={`${baseUrl}${newsItem.image}`}
                                alt={newsItem.nom_evenement}
                                onClick={() => openImageModal(`${baseUrl}${newsItem.image}`)}
                            />
                        )}
                        <IonCardContent>
                            {newsItem.description}
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal isOpen={showModal} onDidDismiss={closeModal} className='my-custom-class'>
                    <div className="modal-content" onClick={closeModal}>
                        <div className="modal-image-container" onClick={handleModalContentClick}>
                            <IonIcon icon={closeCircle} className="close-icon" onClick={closeModal} />
                            <img src={selectedImage} alt="Zoomed in" className="zoomed-in-image" />
                        </div>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default MyFeedPage;