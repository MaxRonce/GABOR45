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
    IonRefresher, IonRefresherContent, IonAvatar, IonChip, IonLabel,
} from '@ionic/react';
import { getNewsForUser } from '../../services/newsService';
import { News } from '../../models/News';
import { useAuth } from '../../hooks/useAuth';
import { closeCircle } from 'ionicons/icons';
import logo from '../../assets/logo_Gabor45_notxt.svg'; // Assurez-vous que le chemin d'accès est correct
import '../farmers/NewsFarmerPage.css';
import '../../components/LoadingScreen.css';
import './MyFeedPage.css'



const MyFeedPage: React.FC = () => {
    const user = useAuth();
    const [newsList, setNewsList] = useState<News[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

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
    const user_baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

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
        setIsRefreshing(true);
        fetchNews().then(() => {
            event.detail.complete();
            setIsRefreshing(false);
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
                        pullingText="Tirez pour rafraîchir"
                    />
                </IonRefresher>

                {isRefreshing && (
                    <div className="loading-container">
                        <img src={logo} alt="Loading..." className="loading-logo-fast" />
                    </div>
                )}

                {newsList.map((newsItem: News) => (
                    <IonCard key={newsItem.id_evenement}>
                        <IonCardHeader>
                            <IonCardTitle>
                                <div className="title_containter">
                                <div className="avatar-container">
                                    <IonAvatar>
                                        <img src={`${user_baseUrl}${newsItem.lien_image_user}`} alt="Profile" />
                                    </IonAvatar>
                                </div>
                                <IonLabel>{newsItem.nom_evenement}</IonLabel>
                                </div>
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            {newsItem.image && (
                                <img
                                    src={`${baseUrl}${newsItem.image}`}
                                    alt={newsItem.nom_evenement}
                                    onClick={() => openImageModal(`${baseUrl}${newsItem.image}`)}
                                />
                            )}
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