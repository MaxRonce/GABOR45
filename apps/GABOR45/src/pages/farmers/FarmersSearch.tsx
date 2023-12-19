import React, { useState, useEffect } from 'react';
import './Farmers.css';
import { useParams } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList } from '@ionic/react';
import { Farmer } from '../../models/Farmer';
import { useHistory } from 'react-router-dom';
import { getUserWithFarmerSearch } from '../../services/searchBarService';

const FarmerSearchPage: React.FC<{ searchQuery: string, page: string }> = ({ searchQuery, page }) => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Farmer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNoResults, setShowNoResults] = useState<boolean>(false);
  const history = useHistory(); // Ajoutez cette ligne
  const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setShowNoResults(false);
      const query = "%" + searchQuery + "%";
      console.log("query", query);
        let userData = null;
        if (page === "producteurs") {
          console.log("page producteurs");
          userData = await getUserWithFarmerSearch(query);
          if (userData === null) {
            setShowNoResults(true);
            setIsLoading(false);
          }else {
            setData(userData);
            setId(userData.id_utilisateur);
            setIsLoading(false);
          }
        } else {
          console.log("page categorires");
        }
      console.log("dataUse: ", data);
    }

    fetchData().then(r => console.log("data", r));
  }, [searchQuery]);

  const handleCardClick = (farmerId: string) => {
    console.log("id: ", farmerId);
    history.push({
      pathname: `/farmers/producteurs/${farmerId}`,
      state: { farmerId: farmerId }
    });
  };



  return (
    <IonContent>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {showNoResults ? (
            <p>Aucun agriculteur disponible.</p>
          ) : (
            <IonList>
              {Array.isArray(data) ? (
                data.map(farmer => (
                  <div key={farmer.id_utilisateur} onClick={() => handleCardClick(farmer.id_utilisateur)}>
                    <IonCard className="farmer-card">
                      <img className="farmer_img" src={`${baseUrl}${farmer.lien_image_user}`} alt="Image de l'agriculteur" />
                      <div className="farmer-info">
                        <IonCardHeader>
                          <IonCardTitle>{farmer.nom_ferme}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p>{farmer.type_produit_principal}</p>
                          <p>
                            {farmer.prenom} {farmer.nom}
                          </p>
                        </IonCardContent>
                      </div>
                    </IonCard>
                  </div>
                ))
              ) : (
                // just one farmer
                <div onClick={() => handleCardClick(id)}>
                  <IonCard className="farmer-card">
                    <img className="farmer_img" src={`${baseUrl}${data?.lien_image_user}`} alt="Image de l'agriculteur" />
                    <div className="farmer-info">
                      <IonCardHeader>
                        <IonCardTitle>{data?.nom_ferme}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <p>{data?.type_produit_principal}</p>
                        <p>
                          {data?.prenom} {data?.nom}
                        </p>
                      </IonCardContent>
                    </div>
                  </IonCard>
                </div>
              )}
            </IonList>
          )}
        </>
      )}
    </IonContent>
  );
};

export default FarmerSearchPage;





