// NewsFarmerPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle , IonModal} from '@ionic/react';
import { getNewsByFarmer } from '../../services/newsService';
import { News } from '../../models/News'; // Importez le type News
import './NewsFarmerPage.css';
import { IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';

const NewsFarmerPage: React.FC = () => {
    const { farmerId } = useParams<{ farmerId: string }>();
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
            if (farmerId) {
                const newsFromService = await getNewsByFarmer(farmerId);
                setNewsList(newsFromService); // newsFromService est déjà de type News[]
            }
        };

        fetchNews();
    }, [farmerId]);

    // define the base url for your images
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
    return (
        <IonPage>
            <IonContent>
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

export default NewsFarmerPage;