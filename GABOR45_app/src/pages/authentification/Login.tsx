// src/pages/Login.tsx
import '../../theme/custom.css';
import '../../theme/variables.css';
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useIonToast, IonText, IonPage, IonContent,
     IonIcon, 
     IonAlert} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent';
import InputComponent from '../../components/InputComponent';
import logo_Gabor45 from '../../icons/logo_Gabor45.svg';
import mail from '../../icons/mail.svg';
import facebook from '../../icons/facebook.svg';
import bloquer from '../../icons/bloquer.svg';
import showP from '../../icons/showP.svg';
import hideP from '../../icons/hideP.svg';
import google from '../../icons/google.svg';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showToast ] = useIonToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleAlert = async () => {
        console.log("entro al funcion");
        console.log(showAlert);
        await setShowAlert(!showAlert);
    };
    const history = useHistory();

    //function to login with email and password
    const handleLogin = async () => {
        console.log("entra a la funcion");
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          console.log(data);
    
          if (error) {
            await showToast({ message: 'Error to sigUp', duration: 2000, color: 'danger' });
          } else {
            setPassword('');
            setEmail('');
            await showToast({ message: 'Success', duration: 2000, color: 'success' });
            // Inicio de sesión exitoso, puedes redirigir a otra página aquí
            history.push('/profile');
          }
        } catch (error) {

            await showToast({ message: 'Error to sigUp', duration: 2000, color: 'danger' });
        }
    };

    //function to login with providers
    const signInWith = async (provider: any) => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: provider,
            });


        } catch (error) {
            console.log(error);
            await showToast({ message: 'Error to sigUp', duration: 2000, color: 'danger' });
        }

    };
    //show and hide password
    const showPasswordHandler = () => {
        console.log("Push show password");
        setShowPassword(!showPassword);
    };



    return (
        <IonPage>
            <IonContent class='ion-text-center'>
                <IonIcon src={logo_Gabor45} className="gabor45-logo" />
                <IonText className="ion-margin-horizontal text-title">
                    Connexion
                </IonText>

                <InputComponent classP='login-input' labelP='Email' typeP='email'
                    iconName={mail} placeholderP='email@domain.com'
                    valueP={email} onChange={(e: any) => setEmail(e.detail.value || "")}
                    classI='custom-input' classIcon='login-icon ion-icon'
                />

                <InputComponent
                    classP="login-input input-pass" // Clase CSS personalizada para el contenedor del input
                    labelP="Mot de passe"
                    typeP={showPassword ? "text" : "password"}
                    placeholderP="********"
                    valueP={password}
                    onChange={(e: any) => setPassword(e.detail.value || "")}
                    classI="custom-input" // Clase CSS personalizada para el input
                    iconName={bloquer} // Cambia el icono según showPassword
                    classIcon="login-icon ion-icon"
                    onIconClick={showPasswordHandler}
                    iconP={showPassword ? showP : hideP}
                    styleP = {{
                        'zIndex': '1',
                        'position': 'relative',
                    }}
                />
                <IonText onClick={handleAlert} id='motOublie' className='text-btn ion-padding-horizontal ion-float-right ion-margin-horizontal ion-margin-bottom'>
                    Mot de passe oublié ?
                </IonText>
                <IonAlert
                  header="réinitialiser le mot de passe"
                  message="vous recevrez un courriel pour réinitialiser votre mot de passe"
                  buttons={[
                    {
                      text: 'Annuler',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancelado');
                        closeAlert();
                      },
                    },
                    {
                      text: 'OK',
                      handler: handleAlert,
                    },
                  ]}
                  onDidDismiss={handleAlert}
                  isOpen={showAlert}
                  inputs={[
                    {
                      name: 'email',
                      type: 'email',
                      placeholder: 'Email',
                    },
                    ]
                    }
                />
                <ButtonComponent classP='btns-login ion-margin-horizontal ion-padding-horizontal' text='Se connecter'
                    onClick={handleLogin}/>
                <IonText onClick={() => {history.push('/registerUser')}} className='text-btn ion-text-center ion-margin-bottom'>
                    <h3 className='text-title'>S'inscrire</h3>
                </IonText>
                <div id='line-login'>
                    <span>ou</span>
                </div>
                <ButtonComponent classP='btns-login ion-padding-horizontal ion-margin-horizontal ion-margin-top' text='Se connecter avec Facebook'
                    onClick={() => {signInWith("facebook")}}
                    iconName={facebook}
                    styleP = {{ '--ion-color-primary': '#2b5c93', }}
                />
                <ButtonComponent classP='btns-login btn-google ion-padding-horizontal ion-margin-horizontal ion-margin-top' text='Se connecter avec Google'
                    onClick={() => {signInWith("google")}}
                    iconName={google}
                />

            </IonContent>
        </IonPage>
    );
};

export default Login;
