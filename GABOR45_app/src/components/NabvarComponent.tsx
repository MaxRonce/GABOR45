import { IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid, IonRow, IonCol, IonText, IonFooter } from "@ionic/react";
import '../theme/custom.css';
import React, { useState } from 'react';
import arrowLeft from '../icons/arrowLeft.svg';
import search from '../icons/search.svg';

const NabvarComponent: React.FC = () => {
    const [isActive, setIsActive] = useState([true, false , false]);
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
        <IonFooter>
            <IonToolbar>
                <IonItem lines="none" className="ion-margin-top">
                    <IonIcon src={arrowLeft} className='nav-icon ion-icon' />
                    <IonSearchbar placeholder="SEARCH" className="ion-justify-content-end searchBar">
                        <IonIcon src={search} slot="end" className="search-icon"/>
                    </IonSearchbar>
                    
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
        </IonFooter>
    )
};

export default NabvarComponent;