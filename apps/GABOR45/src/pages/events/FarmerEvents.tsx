import React, { useState, useEffect } from "react";
import {
    IonItem,
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
    IonFab,
    IonInput,
    IonTextarea,
    IonFabButton,
    IonList,
    IonText,
} from "@ionic/react";
import logo from "../../assets/logo_Gabor45_notxt.svg";
import { getNewsByFarmer, getNewsForUser, saveNews } from "../../services/newsService";
import { News } from "../../models/News";
import { supabase } from "../../supabaseClient";
import { closeCircle } from "ionicons/icons";
import "./FarmerEvents.css";
import add_outline from "../../icons/add_outline.svg";
import { useAuth } from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";
import { openImageModalF, closeModalF, handleModalContentClickF, redirectToFarmerProfileF } from "./FunctionsEvents";


const FarmerEvents: React.FC = () => {
    const user = useAuth();
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [nomEvenement, setNomEvenement] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState<string>("");


    const openImageModal = (imageUrl: string) => {
        openImageModalF(imageUrl, setSelectedImage, setShowModal);
    };

    const closeModal = () => {
        closeModalF(setShowModal);
    };

    const handleModalContentClick = (e: React.MouseEvent) => {
        handleModalContentClickF(e);
    };

    useEffect(() => {
        setImageName("");
        setIsLoading(true);
        fetchNews();
        setIsLoading(false);
    }, [user]);

    const doRefresh = (event: CustomEvent) => {
        setIsRefreshing(true);
        fetchNews().then(() => {
            event.detail.complete();
            setIsRefreshing(false);
        });
    };
    const fetchNews = async () => {
        try {
            if (user) {
                const newsFromService = await getNewsByFarmer(user.id);
                setNewsList(newsFromService);
            }
        } catch (error) {
            
        }
    };

    // Define the base URL for the images
    const baseUrl =
        "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/news/images/";
    const user_baseUrl =
        "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    if (!user) {
        return (
            <IonContent className="ion-padding">
                <h2>Connectez-vous pour voir votre fil d'actualité</h2>
                <IonButton routerLink="/login">Se connecter</IonButton>
            </IonContent>
        );
    }

    //function to handle click on farmer card and redirect to farmer page
    const redirectToFarmerProfile = (farmerId: string) => {
        redirectToFarmerProfileF(farmerId);
    };

    const uploadImage = async (file:File) => {
        const fileName = file.name;
        try {
            let { error: uploadError } = await supabase.storage
            .from('news')
            .upload(`images/${fileName}`, file, {
                cacheControl: '3600',
                upsert: false
            });
      
            if (uploadError) {
                throw new Error('Error to upload file: ' + uploadError.message);
          
            }
        } catch (error) {
            console.log(error);
            return '';
        }

        return fileName;
        
      }

      const handleFileChange = (event: any) => {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          setImageFile(file); // Guardamos el archivo seleccionado en el estado
          setImageName(file.name);
        }
      };
      
    
    const handleClose = () => {
        setShowFormModal(false);
        setImageFile(null);
        setImageName('');
    }
      

    //function to add an event
    const handleSubmitEvent = async () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace('T', ' ').substring(0, 19);
        try {
            let fileName = '';
            if (imageFile) {
                fileName = await uploadImage(imageFile);
                console.log("filename", fileName);
            }
            if (fileName != '') {
                const news = {
                    nom_evenement: nomEvenement,
                    description: description,
                    date_creation: formattedDate,
                    id_agriculteur: user.id,
                    image: fileName
                }
                const data = await saveNews(news);
                console.log(data);
                setShowFormModal(false);
                await fetchNews();
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
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

                    {newsList.map((newsItem: News) => (
                        <IonCard key={newsItem.id_evenement}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    <div className="title_containter">
                                        <div className="avatar-container">
                                            <IonAvatar>
                                                <img
                                                    src={`${user_baseUrl}${newsItem.lien_image_user}`}
                                                    alt="Profile"
                                                    onClick={() =>
                                                        redirectToFarmerProfile(
                                                            newsItem.id_agriculteur
                                                        )
                                                    }
                                                />
                                            </IonAvatar>
                                        </div>
                                        <IonLabel>
                                            {newsItem.nom_evenement}
                                        </IonLabel>
                                    </div>
                                </IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                {newsItem.image && (
                                    <img
                                        src={`${baseUrl}${newsItem.image}`}
                                        alt={newsItem.nom_evenement}
                                        onClick={() =>
                                            openImageModal(
                                                `${baseUrl}${newsItem.image}`
                                            )
                                        }
                                    />
                                )}
                                {newsItem.description}
                            </IonCardContent>
                        </IonCard>
                    ))}

                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={closeModal}
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
                                    onClick={closeModal}
                                />
                                <img
                                    src={selectedImage}
                                    alt="Zoomed in"
                                    className="zoomed-in-image"
                                />
                            </div>
                        </div>
                    </IonModal>
                    <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={() => setShowFormModal(true)}>
                        <IonFabButton>
                            <IonIcon src={add_outline} />
                        </IonFabButton>
                    </IonFab>
                    <IonModal isOpen={showFormModal} onDidDismiss={() => setShowFormModal(false)} className="my-custom-class">
                        <div className="modal-content" onClick={closeModal}>
                            <div className="modal-form">
                                <IonText>Ajouter évènement</IonText>
                                <IonList className="modal-list">
                                    <IonItem>
                                        <IonInput placeholder="Nom de l'évènement" onIonChange={(e:any) => setNomEvenement(e.detail.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonTextarea placeholder="Description de l'évènement" onIonChange={(e:any) => setDescription(e.detail.value)} />
                                    </IonItem>
                                    <IonItem>
                                    <IonLabel position="stacked" className="modal-label">Image</IonLabel>
                                    <label htmlFor="file-upload" className="file-upload-label">
                                    Choisir une image
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    </IonItem>
                                    {imageName !='' && (
                                        <IonItem>
                                            <IonLabel position="stacked" className="modal-label">Image sélectionnée</IonLabel>
                                            <IonText>{imageName}</IonText>
                                        </IonItem>
                                    )}
                                </IonList>
                                <div className="modal-buttons">
                                    <IonButton expand="block" color="medium" onClick={() => handleClose()}>Annuler</IonButton>
                                    <IonButton expand="block" type="submit" onClick={()=> handleSubmitEvent()}>Ajouter</IonButton>
                                </div>
                            </div>
                        </div>
                    </IonModal>
                </>
            )}
        </IonContent>
    );
};

export default FarmerEvents;
