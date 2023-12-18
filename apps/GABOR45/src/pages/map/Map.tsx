// React
import React from "react";

// Ionic Framework Components
import {
	IonContent,
	IonPage,
	IonBackButton,
	IonButtons,
	IonHeader,
	IonToolbar,
	IonTitle,
} from "@ionic/react";

// Custom Styling
import "./map.css";

const MapPage: React.FC = () => {
	const mapIframe = `
    <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1ny_1TOrj65dwzkjIgKCLnqCDwkyzhjA&ehbc=2E312F&z=9"
        class="map-iframe"
    ></iframe>`;

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start" className="back_button">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>Map</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{}
				<div
					className="map-container"
					dangerouslySetInnerHTML={{ __html: mapIframe }}
				/>
			</IonContent>
		</IonPage>
	);
};

export default MapPage;
