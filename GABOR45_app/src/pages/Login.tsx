// src/pages/Login.tsx
import '../theme/custom.css';
import '../theme/variables.css';
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { IonButton, useIonToast, IonItem, IonLabel, IonInput, IonText, IonPage, IonContent,
     IonImg, IonIcon, IonGrid, IonRow, IonCol, IonTabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logo_Gabor45 from '../icons/logo_Gabor45.svg';
import mail from '../icons/mail.svg';
import facebook from '../icons/facebook.svg';
import bloquer from '../icons/bloquer.svg';
import showP from '../icons/showP.svg'
import hideP from '../icons/hideP.svg'
import google from '../icons/google.svg'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showToast ] = useIonToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    

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

            setError("Error to sign in");
        }
    };

    const signInWith = async (provider: any) => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: provider,
            });

            
        } catch (error) {
            console.log(error);
            setError("Error to sign in");
        }
        
    };
    //show and hide password
    const showPasswordHandler = () => {
        console.log(" entro a la funcion ", password);
        setShowPassword(!showPassword);
    };



    return (
        <IonPage>
            <IonContent>
                <IonIcon src={logo_Gabor45} className="gabor45-logo" />
                <IonText className="ion-text-center">
                    <h1 className='text-title'>Connexion</h1>
                </IonText>
                <IonGrid class="ion-margin-horizontal ion-padding-horizontal">
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

                <IonGrid class="ion-margin-horizontal ion-padding-horizontal">
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
                                <IonIcon src={showPassword ? showP : hideP} className="login-icon ion-icon" onClick={() => showPasswordHandler()} />

                                </IonItem>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonText onClick={() => {history.push('/registerUser')}} id='motOublie' className='ion-padding-horizontal ion-float-right ion-margin-horizontal ion-margin-bottom'>
                    Mot de passe oublié ?
                </IonText>
                {error && <IonText color="danger">{error}</IonText>}
                <IonButton onClick={handleLogin} expand='full' shape="round" className='ion-margin-horizontal ion-padding-horizontal   '>
                    Se connecter
                </IonButton>
                <IonText onClick={() => {history.push('/registerUser')}} className='ion-text-center ion-margin-bottom'>
                    <h3 className='text-title'>S'inscrire</h3>
                </IonText>
                <div id='line-login'>
                    <span>ou</span>
                </div>
                <IonButton onClick={() => {signInWith("facebook")}} expand='full' shape="round" className='ion-padding-horizontal ion-margin-horizontal ion-margin-top' style={{ '--ion-color-primary': '#2b5c93',  }}>
                    <IonIcon src={facebook} className="ion-icon ion-margin-end"/>
                    Se connecter avec Facebook
                </IonButton>
                <IonButton onClick={() => {signInWith("google")}} expand='full' shape="round" className='btn-google ion-padding-horizontal ion-margin-horizontal ion-margin-top'>
                    <IonIcon src={google} className="ion-icon ion-margin-end"/>
                    Se connecter avec Google
                </IonButton>

            </IonContent>
        </IonPage>
    );
};

export default Login;
