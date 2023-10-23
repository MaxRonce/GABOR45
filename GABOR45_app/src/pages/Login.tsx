// src/pages/Login.tsx

import React from 'react';
import { supabase } from '../supabaseClient';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const history = useHistory();

    const signInWithFacebook = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
        });
        if (error) {
            console.error(error);
        } else {
            console.log('Connexion réussie :', data);
            console.log("Redirection vers la page de profil")
            history.push('/profile');  // Redirige vers la page de profil après la connexion réussie
        }
    };


    return (
        <IonPage>
            <IonContent>
                <IonButton onClick={signInWithFacebook}>
                    Se connecter avec Facebook
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
