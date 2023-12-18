// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { IonPage, IonContent, IonButton, IonTitle } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { Utilisateur } from '../../models/User';
import { User } from '@supabase/supabase-js';
import {getUserInfo} from "../../services/userService";
import { Database} from "../../types/supabase";
import LoadingScreen from '../../components/LoadingScreen';
import './Profile.css';

const Profile: React.FC = () => {
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";
    const [user, setUser] = useState<User | null>(null);
    const [util, setUtil] = useState<Utilisateur | null>(null)
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                if (user != null) {
                    const userData = await getUserInfo(user.id);
                    setUtil(userData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };


        if (!user && !util) {
            history.push('/login');
        }

    }, [user, history]);

    const redirectToLogin = () => {
        history.push('/login');
    };

    const redirectToProfileEdit = () => {
        if (user != null)
        history.replace(`/profile-edit/${user.id}`);
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        } else {
            console.log('Déconnexion réussie');
            redirectToLogin();  // Redirige vers la page de connexion après la déconnexion réussie
        }
    }

    return (
        <IonPage>
            {isLoading ? (
                <LoadingScreen/>
            ) : (
            util ? (
                <>
                <div className="image_mask"> 
                <img className="user_img_round" src={`${baseUrl}${util.lien_image ? util.lien_image : 'default.jfif'}`} alt="Image de l'utilisateur" />
                </div>
                <div className="header-container">
                    <h1>
                        {util.prenom} {util.nom}
                    </h1>
                </div>
                <div className='content'>
                    <div className='information'>
                        <div className="numTel">{util.num_tel}</div>
                        <div className="email">{util.email}</div>
                    </div>
                    <IonButton onClick={redirectToProfileEdit}>Modifier</IonButton>
                </div>
                <div className="deconnexion">
                    <IonButton onClick={signOut}>Déconnexion</IonButton>
                </div>
                </>
            ) : (
                <div>
                    Vous n'êtes pas connecté.
                    <IonButton onClick={redirectToLogin}>Se connecter</IonButton>
                </div>
            )
            )}
        </IonPage>
    );
};

export default Profile;