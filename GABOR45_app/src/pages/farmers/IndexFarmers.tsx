import React, { useState } from 'react';
import { IonContent, IonPage,} from '@ionic/react';
import FarmerPage from './Farmers';
import './Farmers.css';
import NabvarComponent from '../../components/NabvarComponent';
import FarmerProduit from './FarmerProduit';


const indexFarmers: React.FC = () => {
    const [currentView, setCurrentView] = useState<String>("proximity");
    const changeView = (view: string) => {
        setCurrentView(view);
    };
    return (
        <IonPage>
            <IonContent>
                <NabvarComponent changeView={changeView}/>
                {currentView === 'proximity' && <FarmerPage />}
                {currentView === 'produits' && <FarmerProduit />}

            </IonContent>
        </IonPage>
    );
}

export default indexFarmers;
