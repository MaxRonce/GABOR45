import React, { useState, useEffect } from "react";
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
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonLabel,
    IonText,
    useIonToast,
} from "@ionic/react";
import { getNewsByFarmer, deleteNews, deleteNewsWithImage } from "../../services/newsService";
import { News } from "../../models/News";
import { useAuth } from "../../hooks/useAuth";
import { closeCircle } from "ionicons/icons";
import logo from "../../assets/logo_Gabor45_notxt.svg";
import "../farmers/NewsFarmerPage.css";
import "./EditEvents.css";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { openImageModalF, closeModalF, handleModalContentClickF, redirectToFarmerProfileF } from "./FunctionsEvents";

const MyFeedPage: React.FC = () => {
    const currentUser = useAuth();
    const { farmerId } = useParams<{ farmerId: string }>();
    const [newsList, setNewsList] = useState<News[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [showToast] = useIonToast();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
    const [selectedNewsImage, setSelectedNewsImage] = useState<string>("");

    const openImageModal = (imageUrl: string) => {
        openImageModalF(imageUrl, setSelectedImage, setShowModal);
    };

    const confirmDelete = (newsId: string, image: string) => {
        // Al confirmar, establece el ID y la imagen de la noticia seleccionada
        setSelectedNewsId(newsId);
        setSelectedNewsImage(image);
        setShowConfirmModal(true);
    };

    const closeModal = () => {
        closeModalF(setShowConfirmModal);
    };

    const closeImage = () => {
        closeModalF(setShowModal);
    }

    const handleModalContentClick = (e: React.MouseEvent) => {
        handleModalContentClickF(e);
    };
    const doRefresh = (event: CustomEvent) => {
        setIsRefreshing(true);
        fetchNews().then(() => {
            event.detail.complete();
            setIsRefreshing(false);
        });
    };

    useEffect(() => {
        if (currentUser) {
            fetchNews().then(() => {
                setIsLoading(false);
            })
        }
    }, [currentUser]);

    const fetchNews = async () => {
        setNewsList([]);
        try {
            const newsFromService = await getNewsByFarmer(farmerId);
            setNewsList(newsFromService);
            console.log(newsList);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }

    };

    const handleDelete = async () => {
        let deleteSuccess = false;
        try {
            if (selectedNewsId != null) {
                if (selectedNewsImage != '') {
                    console.log("image", selectedNewsImage);
                    deleteSuccess = await deleteNewsWithImage(selectedNewsId, selectedNewsImage);
                } else {
                    console.log("id", selectedNewsId);
                    deleteSuccess = await deleteNews(selectedNewsId);
                }
            }

            if (deleteSuccess) {
                await showToast({
                    message: `évenement a été supprimé avec succès`,
                    duration: 2000,
                    color: 'success',
                });
            } else {
                await showToast({
                    message: `évenement n'a pas été supprimé`,
                    duration: 2000,
                    color: 'danger',
                });
            }
            fetchNews();
            closeModal();
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            await showToast({
                message: `une erreur s'est produite`,
                duration: 2000,
                color: 'danger',
            });
        }
        fetchNews();
    };
    function calcul_temps(newsItem: News): React.ReactNode {
        const date_evenement = new Date(newsItem.date_creation);
        const date_actuelle = new Date();
        const diff = date_actuelle.getTime() - date_evenement.getTime();
        const diff_jours = diff / (1000 * 3600 * 24);
        const diff_heures = diff / (1000 * 3600);
        const diff_minutes = diff / (1000 * 60);
        const diff_secondes = diff / 1000;
        if (diff_secondes < 60) {
            return Math.round(diff_secondes) + ' secondes';
        } else if (diff_minutes < 60) {
            return Math.round(diff_minutes) + ' minutes';
        } else if (diff_heures < 24) {
            return Math.round(diff_heures) + ' heures';
        } else {
            return Math.round(diff_jours) + ' jours';
        }
    }


    // Define the base URL for the images
    const baseUrl =
        "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
    const user_baseUrl =
        "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";


    return (
        <IonPage>
            <IonContent>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                            <IonRefresherContent pullingText="Tirez pour rafraîchir" />
                        </IonRefresher>

                        {isRefreshing && (
                            <div className="loading-container">
                                <img
                                    src={logo}
                                    alt="Loading..."
                                    className="loading-logo-fast"
                                />
                            </div>
                        )}
                        {newsList == null ? (
                            <div className="no-news">
                                <IonText>Aucun évènement à afficher</IonText>
                            </div>
                        ) : (
                            newsList.map((newsItem: News) => (
                                <IonCard key={newsItem.id_evenement}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            <div className="title_containter">
                                                <div className="avatar-container">
                                                    <IonAvatar>
                                                        <img
                                                            src={`${user_baseUrl}${newsItem.lien_image_user}`}
                                                            alt="Profile"
                                                        />
                                                    </IonAvatar>
                                                </div>
                                                <IonLabel>
                                                    {newsItem.nom_evenement}
                                                </IonLabel>
                                                <IonButton
                                                    className="supprimer-btn"
                                                    onClick={() => confirmDelete(newsItem.id_evenement, newsItem.image ?? '')}
                                                >X</IonButton>
                                            </div>
                                        </IonCardTitle>
                                    </IonCardHeader>


                                    <IonModal
                                        isOpen={showConfirmModal}
                                        onDidDismiss={() => setShowConfirmModal(false)}
                                        className="my-custom-class"
                                    >
                                        <div className="modal-content">
                                            <div className="modal-form">
                                                <IonText className="delete_modal">Supprimer cet événement ?</IonText>
                                                <div className="modal-buttons">
                                                    <IonButton
                                                        className="annuler-btn"
                                                        expand="block"
                                                        onClick={() => closeModal()}
                                                    >
                                                        Annuler
                                                    </IonButton>
                                                    <IonButton
                                                        expand="block"
                                                        color="danger"
                                                        onClick={() => handleDelete()}
                                                    >
                                                        Supprimer
                                                    </IonButton>
                                                </div>
                                            </div>
                                        </div>

                                    </IonModal>

                                    <IonModal
                                        isOpen={showModal}
                                        onDidDismiss={closeImage}
                                        className="my-custom-class"
                                    >
                                        <div className="modal-content" onClick={closeModal}>
                                            <div
                                                className="modal-image-container"
                                                onClick={handleModalContentClick}
                                            >
                                                <IonIcon
                                                    icon={closeCircle}
                                                    className="close-icon"
                                                    onClick={closeImage}
                                                />
                                                <img
                                                    src={selectedImage}
                                                    alt="Zoomed in"
                                                    className="zoomed-in-image"
                                                />
                                            </div>
                                        </div>
                                    </IonModal>

                                    <IonCardContent className="preserve-whitespace">
                                        {newsItem.image && (
                                            <img
                                                src={`${baseUrl}${newsItem.image}`}
                                                alt={newsItem.nom_evenement}
                                                onClick={() =>
                                                    openImageModal(
                                                        `${baseUrl}${newsItem.image}`,
                                                    )
                                                }
                                            />
                                        )}
                                        {newsItem.description}
                                    </IonCardContent>
                                    <p className="distance">
                                        {calcul_temps(newsItem)}
                                    </p>
                                </IonCard>
                            ))
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default MyFeedPage;
