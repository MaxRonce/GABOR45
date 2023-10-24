import {IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from 'react';



async function fetchPhrase() {
    const { data, error } = await supabase
        .from('test')
        .select('phrase')
        .single();
    if (error) {
        console.error(error);
        return;
    }
    return data?.phrase;
}

async function test(){
    const { data } = await supabase.from("test").select("*");
}



const Tab3: React.FC = () => {
    const [phrase, setPhrase] = useState<string | null>(null);

    useEffect(() => {
        async function getPhrase() {
            const fetchedPhrase = await fetchPhrase();
            setPhrase(fetchedPhrase);
        }
        getPhrase();
    }, []);

    async function signInWithFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
        });
        if (error) console.error(error);
        else console.log('Connexion réussie :', data);
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        else console.log('Déconnexion réussie');
    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardContent>
                        {phrase}
                    </IonCardContent>
                </IonCard>
                <IonButton onClick={signInWithFacebook}>Se connecter avec Facebook</IonButton>
                <IonButton onClick={signOut}>Se déconnecter</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;

