import { useParams } from "react-router";
import {IonPage} from "@ionic/react";

const Farmer_detail_page: React.FC = () => {

    console.log("Rendering Farmer_detail_page")
    const { farmerId } = useParams<{ farmerId: string }>();

    return (
        <IonPage>
            {farmerId ? `Farmer ID: ${farmerId}` : "No Farmer ID provided"}
        </IonPage>
    );
}

export default Farmer_detail_page;