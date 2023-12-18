import { useParams } from "react-router";
import {IonPage, IonIcon, IonToolbar, IonBackButton, IonButtons} from "@ionic/react";
import { newspaperOutline } from 'ionicons/icons';
import { IonAlert } from '@ionic/react';
import {Farmer} from '../../models/Farmer';
import {getUserWithFarmer} from "../../services/farmerDetailService";
import {followFarmer, unfollowFarmer} from '../../services/follow_service';

import React, {useEffect, useState} from "react";
import './FarmerDetailPage.css';
import './FarmerDetailPage.css';
import LoadingScreen from "../../components/LoadingScreen";
import {User} from "@supabase/supabase-js";
import {useHistory} from "react-router-dom";
import { supabase } from '../../supabaseClient'; // Assurez-vous d'importer votre client Supabase

import facebookIcon from '../../icons/facebook_mini.svg';
import instagramIcon from '../../icons/instagram_mini.svg';
import globeIcon from '../../icons/globe.svg';

import { Horaires } from "../../models/Horaires";
import { getHorairesFerme } from "../../services/horaires_point_de_vente";


const Farmer_detail_page: React.FC = () => {
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
    const { farmerId } = useParams<{ farmerId: string }>();
    const [data, setData] = useState<Farmer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showLoginAlert, setShowLoginAlert] = useState(false);  // Nouveau state pour la popup
    const [user, setUser] = useState<User | null>(null);  // Définissez l'état initial comme null ou User
    const history = useHistory();

    const [isFollowing, setIsFollowing] = useState(false); // Nouvel état pour suivre si l'utilisateur suit l'agriculteur

    const [horairesList, setHorairesList] = useState<Horaires[]>([]); // Utilisez le type Horaires[] pour l'état


    // Fonction pour vérifier si l'utilisateur suit déjà l'agriculteur
    const checkIfUserIsFollowing = async () => {
        if (user) {
            try {

                const { data, error } = await supabase
                    .from('follow')
                    .select('*')
                    .eq('id_utilisateur', user.id)
                    .eq('id_agriculteur', farmerId);


                setIsFollowing(!!data); // Si data existe, l'utilisateur suit l'agriculteur
            } catch (error) {
                console.error('Erreur lors de la vérification du suivi:', error);
            }
        }
    };
    const handleFollow = async () => {
        if (user) {
            try {
                await followFarmer(user.id, farmerId);
                console.log('Agriculteur suivi!');
                setIsFollowing(true); // Assurez-vous de mettre à jour l'état ici
            } catch (error) {
                console.error('Erreur lors du suivi de l\'agriculteur:', error);
            }
        } else {
            setShowLoginAlert(true);
        }
    };

    const handleUnfollow = async () => {
        if (user) {
            try {
                await unfollowFarmer(user.id, farmerId);
                console.log('Vous ne suivez plus cet agriculteur.');
                setIsFollowing(false); // Mettre à jour l'état ici aussi
            } catch (error) {
                console.error('Erreur lors de l\'arrêt du suivi de l\'agriculteur:', error);
            }
        } else {
            setShowLoginAlert(true);
        }
    };


    useEffect(() => {
        // Fonction pour vérifier si l'utilisateur suit déjà l'agriculteur
        const checkIfUserIsFollowing = async () => {
            if (user && farmerId) { // Ajoutez cette vérification pour vous assurer que user et farmerId sont définis
                try {
                    const { data, error } = await supabase
                        .from('follow')
                        .select('*')
                        .eq('id_utilisateur', user.id)
                        .eq('id_agriculteur', farmerId)
                        .maybeSingle(); // Utilisez maybeSingle pour retourner null si pas trouvé

                    setIsFollowing(!!data); // Si data existe, l'utilisateur suit l'agriculteur
                } catch (error) {
                    console.error('Erreur lors de la vérification du suivi:', error);
                }
            }
        };

        checkIfUserIsFollowing();
    }, [user, farmerId]);

    useEffect(() => {


        // Souscrivez aux modifications de session pour obtenir les mises à jour de l'utilisateur
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;  // Obtenez l'utilisateur de la session
                // @ts-ignore
                setUser(currentUser);
            }
        );
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

        // Annulez la souscription lorsque le composant est démonté
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [farmerId]);

    useEffect(() => {
        const fetchHoraires = async () => {
            const horairesFromService = await getHorairesFerme(farmerId);
            setHorairesList(horairesFromService); // horairesFromService est déjà de type Horaires[]
        };
        fetchHoraires();
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
                        <IonButtons slot="start" className="back_button">
                            <IonBackButton defaultHref="/farmer" /> {/* Utilisez IonBackButton pour une meilleure gestion de la pile */}
                        </IonButtons>
                        <div className="header-container">
                            <h1>{data.nom_ferme}</h1>
                        </div>
                        <div className="button_rows">
                            <button
                                className={`follow_button ${isFollowing ? 'followed' : ''}`}
                                onClick={isFollowing ? handleUnfollow : handleFollow}
                            >
                                {isFollowing ? 'Suivi' : 'Suivre'}
                            </button>
                            <button
                                color="secondary"
                                onClick={() => history.push(`/farmers/producteurs/${farmerId}/news`)}
                            >
                                <IonIcon slot="start" icon={newspaperOutline} />
                                News
                            </button>
                        </div>
                        <div className="page_content">
                            <div>
                                <h2>{data.nom} {data.prenom}</h2>
                            </div>
                            <div className="social-media-links">
                                {data.facebook && (
                                    <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                                        <img src={facebookIcon} alt="Facebook" className="icon-svg" />
                                    </a>
                                )}
                                {data.instagram && (
                                    <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                                        <img src={instagramIcon} alt="Instagram" className="icon-svg" />
                                    </a>
                                )}
                                {data.website && (
                                    <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">
                                        <img src={globeIcon} alt="Website" className="icon-svg" />
                                    </a>
                                )}
                            </div>
                            <div>
                                <p className="production"><b>Production : </b>{data.description}</p>
                                {/* Ici, nous ajoutons la section pour les liens de réseaux sociaux */}
                            </div>


                                {horairesList != null && (
                            <div>
                                <b>Horaires : </b>
                                <table className="horaires">
                                    
                                    <tbody>
                                        {horairesList && horairesList.map((horairesItem: Horaires) => (
                                            <tr key={horairesItem.id_horaires}>
                                                <td><b>{horairesItem.jour}</b> : </td>
                                                <td>{horairesItem.heure_debut_matin?.slice(0,5)}-{horairesItem.heure_fin_matin?.slice(0,5)}</td>
                                                <td>{horairesItem.heure_debut_apres_midi?.slice(0,5)}-{horairesItem.heure_fin_apres_midi?.slice(0,5)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                    </>
                ) : (
                    <LoadingScreen />
                )
            )}
            <IonAlert
                isOpen={showLoginAlert}
                onDidDismiss={() => setShowLoginAlert(false)}
                header={'Connexion requise'}
                message={'Vous devez être connecté pour suivre cet agriculteur.'}
                buttons={[
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: blah => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: 'Se connecter',
                        handler: () => {
                            // Rediriger vers la page de connexion
                            history.push('/login');
                        }
                    }
                ]}
            />
        </IonPage>
    );
}

export default Farmer_detail_page;
