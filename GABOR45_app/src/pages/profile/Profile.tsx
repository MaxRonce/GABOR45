// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';  // Importez le type User
import { Database} from "../../types/supabase";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);  // Définissez l'état initial comme null ou User
    const history = useHistory();

    useEffect(() => {
        // Souscrivez aux modifications de session pour obtenir les mises à jour de l'utilisateur
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;  // Obtenez l'utilisateur de la session
                // @ts-ignore
                setUser(currentUser);
            }
        );

        // Annulez la souscription lorsque le composant est démonté
        return () => {
            authListener?.subscription.unsubscribe();
        };

    }, []);

    const redirectToLogin = () => {
        history.push('/login');
    };
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