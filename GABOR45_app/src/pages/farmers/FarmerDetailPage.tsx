import { useParams } from "react-router";
import {IonPage} from "@ionic/react";
import {UserWithFarmer} from '../../models/UserWithFarmer';
import {getUserWithFarmer} from "../../services/farmerDetailService";
import {useEffect, useState} from "react";

const Farmer_detail_page: React.FC = () => {

    const { farmerId } = useParams<{ farmerId: string }>();
    const [data, setData] = useState<UserWithFarmer | null>(null);

    useEffect(() => {
        // Fetch data when component mounts
        const fetchData = async () => {
            try {
                const userData = await getUserWithFarmer(farmerId);
                setData(userData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData().then(r => console.log("data", r));
    }, [farmerId]);




    return (
        <IonPage>
            {data ? (
                <div>
                    <h1>{data.nom} {data.prenom}</h1>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.num_tel}</p>
                </div>
            ) : (
                <p>Loading... farmer {farmerId ? `Farmer ID: ${farmerId}` : "No Farmer ID provided"}</p>
                //farmer id if it exists
            )}
        </IonPage>
    );

}

export default Farmer_detail_page;