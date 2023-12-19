import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useLocation, useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonSearchbar, IonToolbar, IonIcon, IonItem, IonGrid,
   IonRow, IonCol, IonText, IonHeader } from '@ionic/react';
import FarmerPage from './Farmers';
import './Farmers.css';
import './Nabvar.css';
import arrowLeft from '../../icons/arrowLeft.svg';
import search from '../../icons/search.svg';
import FarmerCategories from './FarmerCategories';
import FarmerSearchPage from './FarmersSearch';
import FarmersByCategory from './FarmersByCategory';

const IndexFarmers: React.FC = () => {
  const [page, setPage] = useState<string>("producteurs"); // State for the initial page [producteurs, produits
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const location = useLocation();
  const [isActive, setIsActive] = useState([true, false]); 
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    // Reset the page and search query when the user leaves the page
    setPage('producteurs');
    setSearchQuery('');
    setIsActive([true, false]);
    setSelectedCategory("");
  }, [location.pathname]);
    //control the button active
    const handleClick = (index:any) => {
        setSelectedCategory("");
        const updateActive = [...isActive];
        if (!isActive[index]) { 
            updateActive[index] = !updateActive[index];
            for (let i = 0; i < updateActive.length; i++) {
                if (i !== index) {
                    updateActive[i] = false;
                }
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
        const page = 'categories';
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
        else {
            setSearchQuery("");
        }
    }
    const handleBack = () => {
        setSearchQuery("");
        setPage("producteurs");
        setSelectedCategory("");
    }
    const showFarmersCategory =( category_id: string) => {
        setSelectedCategory(category_id);
        setPage("");
        }


      const navClass = (index:any) => `nav-line ${isActive[index] ? 'active' : ''}`;

  return (
    <IonPage>
        <div className='full-page'>
      <IonHeader>
            <IonToolbar>
                <IonItem lines="none" className="ion-margin-top">
                    <div className='nab-content'>
                        <IonIcon src={arrowLeft} onClick={handleBack} className='nav-icon ion-icon' />
                        <IonSearchbar placeholder="SEARCH"
                            value={searchQuery}
                            onKeyDown={(e) => handleSearch(e.currentTarget.value)}
                            className="ion-justify-content-end searchBar">
                            <IonIcon src={search} slot="end" className="search-icon"/>
                        </IonSearchbar>
                    </div>
                    
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
        {searchQuery !== "" ? ( // if searchQuery is not empty, show the search page
          <FarmerSearchPage searchQuery={searchQuery} page={page} category_id={selectedCategory} />
        ) : ( // else show the page selected
          <>
            {page === 'producteurs' ? <FarmerPage /> : null}
            {page === 'categories' ? <FarmerCategories selectedCategory={selectedCategory}
                onSelectCategory={(category) => showFarmersCategory(category)}/> : null}
            {selectedCategory != "" ? <FarmersByCategory categoryId={selectedCategory} /> : null}
          </>
        )}
      </IonContent>
      </div>
    </IonPage>
  );
}

export default IndexFarmers;
