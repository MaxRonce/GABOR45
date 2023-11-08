import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { IonContent, IonPage } from '@ionic/react';
import FarmerPage from './Farmers';
import './Farmers.css';
import NabvarComponent from '../../components/NabvarComponent';
import FarmerProduit from './FarmerProduit';
import FarmerSearchPage from './FarmersSearch';

const IndexFarmers: React.FC<{ hide: string }> = ({ hide }) => {
  const { page } = useParams<{ page: string }>();
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el término de búsqueda

  return (
    <IonPage>
      <IonContent>
        <NabvarComponent setSearchQuery={setSearchQuery} /> {/* Pasar setSearchQuery a NabvarComponent */}
        {searchQuery !== "" ? ( // Si hay un término de búsqueda, mostrar el resultado de la búsqueda
          <FarmerSearchPage searchQuery={searchQuery} />
        ) : ( // De lo contrario, mostrar el contenido por defecto
          <>
            {page === 'producteurs' ? <FarmerPage /> : null}
            {page === 'produits' ? <FarmerProduit /> : null}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default IndexFarmers;
