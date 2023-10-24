// src/pages/Login.tsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { IonButton, useIonToast, IonItem, IonLabel, IonInput, IonText, IonPage, IonContent,
     IonImg, IonIcon, IonGrid, IonRow, IonCol, IonTabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo_Gabor45.png';
import mail from '../icons/mail.svg';
import '../theme/custom.css';

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
                <IonItem>
                    <IonImg src={logo} alt="GABOR45" class="ion-img ion-margin ion-padding" />
                </IonItem>
                <IonGrid class="ion-margin ion-padding">
                    <IonRow>
                        <IonCol size="1" class="ion-margin">
                            <IonIcon src={mail} className="login-icon ion-icon" />
                        </IonCol>
                        <IonCol class='ion-margin-start'>
                            <div className='login-input'>
                                <IonInput
                                label="Email"
                                label-placement="floating"     
                                type="email"
                                placeholder='email@domain.com'
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value || "")}
                                className='custom-input'
                                />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonGrid class="ion-margin-bottom ion-padding">
                    <IonRow>
                        <IonCol size="1" class="ion-margin">
                            <IonIcon src={mail} className="login-icon ion-icon" />
                        </IonCol>
                        <IonCol class='ion-margin-start'>
                            <div className='login-input'>
                                <IonInput
                                label="Mot de passe"
                                label-placement="floating"     
                                type="password"
                                placeholder='********'
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value || "")}
                                className='custom-input'
                                />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
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
