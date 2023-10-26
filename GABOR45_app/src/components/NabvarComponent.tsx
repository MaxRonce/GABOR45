import { IonHeader, IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import '../theme/custom.css';
import React, { useState } from 'react';
import arrowLeft from '../icons/arrowLeft.svg';
const NabvarComponent = () => {
    const [isActive, setIsActive] = useState([false, false , false]);
    const handleClick = (index:any) => {
        const updateActive = [...isActive];
        updateActive[index] = !updateActive[index];
        for (let i = 0; i < updateActive.length; i++) {
            if (i !== index) {
                updateActive[i] = false;
            }
            
        }
        setIsActive(updateActive); 
      };

      const navClass = (index:any) => `nav-line ${isActive[index] ? 'active' : ''}`;
    return (
        <IonHeader>
            <IonToolbar>
                <IonItem lines="none" className="ion-margin-top">
                    <IonIcon src={arrowLeft} className='nav-icon ion-icon' />
                    <IonSearchbar placeholder="SEARCH" className="ion-justify-content-end"></IonSearchbar>
                </IonItem>
                <IonGrid class="ion-margin-horizontal">
                    <IonRow>
                        <IonCol size="4" class="custom-center">
                            <div className={navClass(0)} onClick={() => {handleClick(0)}}>
                                <IonText className="nav-text ion-text-center">à proximité</IonText>
                            </div>
                        </IonCol>
                        <IonCol size="4" class="custom-center">
                            <div className={navClass(1)} onClick={() => {handleClick(1)}}>
                                <IonText className="nav-text ion-text-center">Produits</IonText>
                            </div>
                        </IonCol>
                        <IonCol size="4" class="custom-center">
                            <div className={navClass(2)} onClick={() => {handleClick(2)}}>
                                <IonText className="nav-text ion-text-center">Producteurs</IonText>
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid> 
            </IonToolbar>
        </IonHeader>
    );
};

export default NabvarComponent;