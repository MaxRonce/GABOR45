import {IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';

import '../test_tabs_todelete/Tab3.css';
import React from 'react';

const FarmerProduit= () => {
    return (
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>

                    </IonToolbar>
                </IonHeader>
            </IonContent>
    );
};

export default FarmerProduit;