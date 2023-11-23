import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { IonContent, IonPage, IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid,
   IonRow, IonCol, IonText, IonHeader } from '@ionic/react';
import FarmerPage from './Farmers';
import './Farmers.css';
import arrowLeft from '../../icons/arrowLeft.svg';
import search from '../../icons/search.svg';
import FarmerCategories from './FarmerCategories';
import FarmerSearchPage from './FarmersSearch';

const IndexFarmers: React.FC = () => {
  const [page, setPage] = useState<string>("producteurs"); // Estado para la página actual [producteurs, produits
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el término de búsqueda
  const [isActive, setIsActive] = useState([true, false]); 
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
        setPage(page);
    }
    //handle the button nearby
    const handleNearby = () => {
        const page = 'producteurs';
        setPage(page);
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
    <IonPage>
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
      <IonContent>
        {searchQuery !== "" ? ( // Si hay un término de búsqueda, mostrar el resultado de la búsqueda
          <FarmerSearchPage searchQuery={searchQuery} />
        ) : ( // De lo contrario, mostrar el contenido por defecto
          <>
            {page === 'producteurs' ? <FarmerPage /> : null}
            {page === 'produits' ? <FarmerCategories /> : null}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default IndexFarmers;
