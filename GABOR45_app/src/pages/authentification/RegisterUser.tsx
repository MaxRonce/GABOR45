// RegisterUser.tsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { IonButton, useIonToast, IonItem, IonLabel, IonInput, IonText, IonPage, IonContent,
     IonImg, IonIcon, IonGrid, IonRow, IonCol, IonTabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent';
import InputComponent from '../../components/InputComponent';
import logo_Gabor45 from '../../icons/logo_Gabor45.svg';
import mail from '../../icons/mail.svg';
import bloquer from '../../icons/bloquer.svg';
import showP from '../../icons/showP.svg'
import hideP from '../../icons/hideP.svg'

import '../../theme/custom.css';
import '../../theme/variables.css';


const RegisterUser: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showToast ] = useIonToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    

    const history = useHistory();

    //function to login with email and password
    const handleLogin = async () => {
        console.log("entra a la funcion");
        try {
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          console.log(data);
    
          if (error) {
            await showToast({ message: 'Error to signUp', duration: 2000, color: 'danger' });
            console.log(error);
          } else {
            setPassword('');
            setEmail('');
            await showToast({ message: 'success. Verifie votre email', duration: 2000, color: 'success' });
            // Inicio de sesión exitoso, puedes redirigir a otra página aquí
            history.push('/profile');
          }
        } catch (error) {

            await showToast({ message: 'Error to sigUp', duration: 2000, color: 'danger' });
        }
    };


    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };



    return (
        <IonPage>
            <IonContent>
                <IonIcon src={logo_Gabor45} className="gabor45-logo" />
                <IonText className="ion-text-center">
                    <h1 className='text-title'>Inscription</h1>
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
                />
                <ButtonComponent classP='ion-margin-horizontal ion-padding-horizontal' text='Se connecter'
                    onClick={handleLogin}/>

            </IonContent>
        </IonPage>
    );
};

export default RegisterUser;
