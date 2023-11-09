// Home.tsx
import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle , IonModal, IonAvatar} from '@ionic/react';
import { News } from '../models/News'; // Importez le type News
import './Home.css';
import { IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { getGlobalNews } from '../services/global_news_service';
import logo from '../assets/logo_Gabor45_notxt.svg';

const Home: React.FC = () => {
    const [newsList, setNewsList] = useState<News[]>([]); // Utilisez le type News[] pour l'état
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
                const newsFromService = await getGlobalNews();
                setNewsList(newsFromService); // newsFromService est déjà de type News[]
        };
        fetchNews();
    });

    // define the base url for your images
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
    return (
        <IonPage>
            <IonContent>
                {newsList.map((newsItem: News) => (
                    <IonCard key={newsItem.id_evenement}>
                        <IonCardHeader className='head'>
                            <div className="title_containter">
                                <div className="avatar-container">
                                    <img src={logo} alt="icon" className="logo-news"/>
                                </div>
                                <IonCardTitle>{newsItem.nom_evenement}</IonCardTitle>
                            </div>
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
                    <div className="modal-content" onClick={closeModal}> {/* Ajout de l'écouteur de clic ici */}
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

export default Home;