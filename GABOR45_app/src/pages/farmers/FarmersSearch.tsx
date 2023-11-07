import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList } from '@ionic/react';
import { Farmer } from '../../models/Farmer';
import { useHistory } from 'react-router-dom';
import {getUserWithFarmerSearch} from '../../services/searchBarService';
import './Farmers.css';
import NabvarComponent from '../../components/NabvarComponent';

const FarmerSearchPage: React.FC = () => {
    const [id, setId] = useState<string>("");
    const [data, setData] = useState<Farmer | null>(null);
    const { searchQuery } = useParams<{ searchQuery: string }>();
    const history = useHistory(); // Ajoutez cette ligne


    useEffect(() => {
        const fetchData = async () => {
            const query = "%" + searchQuery + "%";
            const userData = await getUserWithFarmerSearch(query);
            console.log("data", userData);
            setData(userData);
            if (Array.isArray(userData)) {
              // Si hay varios resultados, selecciona el primero por defecto
              setId(userData[0].id_utilisateur);
            } else {
              // Si solo hay un resultado, selecciona ese
              setId(userData.id_utilisateur);
            }
          };
          console.log("dataUse: ", data);
        fetchData().then(r => console.log("data", r));
    }, []);

    const handleCardClick = (farmerId: string) => {
        history.push({
            pathname: `/farmers/${farmerId}`,
            state: { farmerId: farmerId }
        });
    };

    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/";

    return (
        <IonPage>
          <IonContent>
            <NabvarComponent />
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
                // Solo un resultado
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
          </IonContent>
        </IonPage>
      );
};

export default FarmerSearchPage;





