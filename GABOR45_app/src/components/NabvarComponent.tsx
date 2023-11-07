import { IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid, IonRow, IonCol, IonText, IonFooter } from "@ionic/react";
import '../theme/custom.css';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import arrowLeft from '../icons/arrowLeft.svg';
import search from '../icons/search.svg';

const NabvarComponent = (props:any) => {
    const { changeView } = props;  
    console.log("Props: ", changeView);
    const [isActive, setIsActive] = useState([true, false]);
    const history = useHistory(); // Ajoutez cette ligne   
    //control the button active
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

    
    const handleSearch = async (value:any) => {
        if (value) {
            const searchQuery = value.toLowerCase();
            history.push({
                pathname: `/farmers/search/${searchQuery}`,
                state: { searchQuery: searchQuery }
            
            })
        
        }
    }

      const navClass = (index:any) => `nav-line ${isActive[index] ? 'active' : ''}`;
    return (
        <IonFooter>
            <IonToolbar>
                <IonItem lines="none" className="ion-margin-top">
                    <IonIcon src={arrowLeft} onClick={()=> history.goBack()} className='nav-icon ion-icon' />
                    <IonSearchbar placeholder="SEARCH"
                        value={""}
                        onIonChange={(e) => handleSearch(e.detail.value)}
                        className="ion-justify-content-end searchBar">
                        <IonIcon src={search} onClick={handleSearch} slot="end" className="search-icon"/>
                    </IonSearchbar>
                    
                </IonItem>
                <IonGrid class="ion-margin-horizontal">
                    <IonRow>
                        <IonCol size="6" class="custom-center">
                            <div className={navClass(0)} onClick={() => {changeView('proximity'); handleClick(0)}}>
                                <IonText className="nav-text ion-text-center">à proximité</IonText>
                            </div>
                        </IonCol>
                        <IonCol size="6" class="custom-center">
                            <div className={navClass(1)} onClick={() => {changeView('produits'); handleClick(1)}}>
                                <IonText className="nav-text ion-text-center">Produits</IonText>
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid> 
            </IonToolbar>
        </IonFooter>
    )
};

export default NabvarComponent;