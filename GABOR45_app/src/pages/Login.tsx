// src/pages/Login.tsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { IonButton, useIonToast, IonItem, IonLabel, IonInput, IonText, IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showToast ] = useIonToast();

    const history = useHistory();

    const handleLogin = async () => {
        console.log("entro al login");
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          console.log(data);
    
          if (error) {
            setError(error.message);
          } else {
            await showToast({ message: 'Success', duration: 2000, color: 'success' });
            // Inicio de sesión exitoso, puedes redirigir a otra página aquí
            history.push('/profile');
          }
        } catch (error) {

            setError("Hubo un error al iniciar sesión");
        }
    };

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
                <h2>Se connecter</h2>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value || "")}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value || "")}
                    />
                </IonItem>
                {error && <IonText color="danger">{error}</IonText>}
                <IonButton expand="full" onClick={handleLogin}>
                    Se connecter
                </IonButton>
                <IonButton expand="full" onClick={signInWithFacebook} color="secondary">
                    Se connecter avec Facebook
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Login;
