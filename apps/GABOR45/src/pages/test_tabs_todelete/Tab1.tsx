import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import NabvarComponent from '../../components/NabvarComponent';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 12</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
      
      
    </IonPage>
  );
};

export default Tab1;
