// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';  // Importez le type User
import { Database} from "../../types/supabase";
import { Utilisateur } from '../../models/User';
import {getUserInfo} from "../../services/userService";
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
                    console.log(userData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Annulez la souscription lorsque le composant est démonté
        return () => {
            authListener?.subscription.unsubscribe();
        };

    }, []);

    const redirectToLogin = () => {
        history.push('/login');
    };

    const redirectToProfileEdit = () => {
        if (user) {
            history.push(`/profile_edit/${user.id}`);
        } else {
            history.push('/login');
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
        } else {
            console.log('Déconnexion réussie');
            history.push('/profile');  // Redirige vers la page de connexion après la déconnexion réussie
        }
    }

    return (
        <IonPage>
            <IonContent>
                {user ? (
                    <div>
                        Bonjour {user.email}
                        <IonButton onClick={signOut}>Se déconnecter</IonButton>
                        <IonButton onClick={redirectToProfileEdit}> Edit </IonButton>
                    </div>
                ) : (
                    <div>
                        Vous n'êtes pas connecté.
                        <IonButton onClick={redirectToLogin}>Se connecter</IonButton>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};
export default Profile;