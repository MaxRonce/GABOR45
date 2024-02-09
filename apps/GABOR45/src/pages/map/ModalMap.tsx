import React from 'react';
import { IonModal, IonButton, IonContent } from '@ionic/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../profile/PointsHorairesEdit.css';

interface Location {
  lat: number;
  lng: number;
}

interface ModalMapProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
}

const ModalMap: React.FC<ModalMapProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = React.useState<Location | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        onLocationSelect({ lat, lng });
      },
    });

    return markerPosition === null ? null : (
      <Marker position={markerPosition}></Marker>
    );
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="my-custom-class modal-map">
      <div className="modal-content">
        <div className='modal-form'>
          <h1>Choisissez votre point de vente</h1>
          <MapContainer center={[47.903316909599056, 1.9056876260011466]} zoom={13} style={{ height: 300, width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
          <IonButton className='btn-modal' onClick={onClose}>Fermer</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ModalMap;
