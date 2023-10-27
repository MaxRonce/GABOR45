import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import NabvarComponent from '../../components/NabvarComponent';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <NabvarComponent/>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
      
      
    </IonPage>
  );
};

export default Tab1;
