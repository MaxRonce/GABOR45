import { IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid, IonRow, IonCol, IonText, IonHeader } from "@ionic/react";
import '../theme/custom.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import arrowLeft from '../icons/arrowLeft.svg';
import search from '../icons/search.svg';

const NabvarComponent = ({ setSearchQuery }: { setSearchQuery: (query: string) => void }) => {
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
        if(index === 1){
            handleProduit();
        } else {
            handleNearby();
        }
      };
    //handle the button produits
    const handleProduit = () => {
        const page = 'produits';
        history.push({
            pathname: `/farmers/${page}`,
            state: { page: page }
        
        })
    }
    //handle the button nearby
    const handleNearby = () => {
        const page = 'producteurs';
        history.push({
            pathname: `/farmers/${page}`,
            state: { page: page }
        
        })
    }

    
    const handleSearch = async (value:any) => {
        if (value) {
            const searchQuery = value.toLowerCase();
            setSearchQuery(searchQuery);
    
        }
    }
    const handleBack = () => {
        setSearchQuery("");
    }


      const navClass = (index:any) => `nav-line ${isActive[index] ? 'active' : ''}`;
    return (
        <IonHeader>
            <IonToolbar>
                <IonItem lines="none" className="ion-margin-top">
                    <IonIcon src={arrowLeft} onClick={handleBack} className='nav-icon ion-icon' />
                    <IonSearchbar placeholder="SEARCH"
                        value={""}
                        onIonChange={(e) => handleSearch(e.detail.value)}
                        className="ion-justify-content-end searchBar">
                        <IonIcon src={search} slot="end" className="search-icon"/>
                    </IonSearchbar>
                    
                </IonItem>
                <IonGrid class="ion-margin-horizontal">
                    <IonRow>
                        <IonCol size="6" class="custom-center">
                            <div className={navClass(0)} onClick={() => { handleClick(0)}}>
                                <IonText className="nav-text ion-text-center">à proximité</IonText>
                            </div>
                        </IonCol>
                        <IonCol size="6" class="custom-center">
                            <div className={navClass(1)} onClick={() => {handleClick(1)}}>
                                <IonText className="nav-text ion-text-center">Catégorie</IonText>
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid> 
            </IonToolbar>
        </IonHeader>
    )
};

export default NabvarComponent;