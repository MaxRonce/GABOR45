// src/pages/Login.tsx

import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { IonButton, useIonToast, IonItem, IonLabel, IonInput, IonText, IonPage, IonContent,
     IonImg, IonIcon, IonGrid, IonRow, IonCol, IonTabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo_Gabor45.png';
import mail from '../../icons/mail.svg';
import facebook from '../../icons/facebook.svg';
import bloquer from '../../icons/bloquer.svg';
import showP from '../../icons/showP.svg'
import hideP from '../../icons/hideP.svg'

import '../../theme/custom.css';
import '../../theme/variables.css';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showToast ] = useIonToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    

    const history = useHistory();

    const handleLogin = async () => {
        console.log("Enter into the login function");
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

            setError("Error signing up with email and password");
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

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };



    return (
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonImg src={logo} alt="GABOR45" class="ion-img ion-margin ion-padding" />
                </IonItem>
                <IonGrid class="ion-margin-horizontal ion-padding-horizontal ion-margin-top">
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

                <IonGrid class="ion-margin-horizontal ion-padding-horizontal ion-margin-bottom">
                    <IonRow>
                        <IonCol size="1" class="ion-margin">
                            <IonIcon src={bloquer} className="login-icon ion-icon" />
                        </IonCol>
                        <IonCol class='ion-margin-start'>
                            <div className='login-input'>
                                <IonItem lines="none">
                                    <IonInput
                                        label="Mot de passe"
                                        label-placement="floating"
                                        type={showPassword ? "text" : "password"}
                                        placeholder='********'
                                        value={password}
                                        onIonChange={(e) => setPassword(e.detail.value || "")}
                                        className='custom-input'
                                    />

                                </IonItem>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {error && <IonText color="danger">{error}</IonText>}
                <IonButton onClick={handleLogin} className='btn-login ion-padding-horizontal'>
                    Se connecter
                </IonButton>
                <IonText onClick={() => {history.push('/registerUser')}} className='btn-login ion-padding-horizontal'>
                    S'inscrire
                </IonText>
                <IonButton onClick={signInWithFacebook} className='btn-login ion-padding-horizontal' style={{ '--ion-color-primary': '#2b5c93',  }}>
                    <IonIcon src={facebook} className="login-icon ion-icon"/>
                    Se connecter avec Facebook
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Login;
