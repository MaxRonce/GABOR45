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

const Profile: React.FC = () => {
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

        fetchData().then(r => console.log(r));

        // Annule la souscription lorsque le composant est démonté
        return () => {
            authListener?.subscription.unsubscribe();
        };

        if (!user) {
            history.push('/login');
        }

    }, [user, history]);

    const redirectToLogin = () => {
        history.push('/login');
    };

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
            <>
            <IonTitle>
                {util ? (
                    <h1>
                        {util.nom}
                        {util.prenom}
                    </h1>
                ) : null}
            </IonTitle>
            <IonContent>
                {util ? (
                    <div>
                        {util.num_tel}
                        {util.email}
                        <IonButton>Modifier</IonButton>
                        <IonButton onClick={signOut}>Se déconnecter</IonButton>
                    </div>
                ) : (
                    <div>
                        Vous n'êtes pas connecté.
                        <IonButton onClick={redirectToLogin}>Se connecter</IonButton>
                    </div>
                )}
            </IonContent>
            </>)}
        </IonPage>
    );
};

export default Profile;
