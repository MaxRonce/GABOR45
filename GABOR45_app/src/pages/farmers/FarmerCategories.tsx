import {IonList, IonCard, IonCardContent, IonContent, IonCardHeader, IonCardTitle, IonImg} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Farmers.css';
import { supabase } from '../../supabaseClient';
import LoadingScreen from "../../components/LoadingScreen";
interface FarmerCategoriesProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string) => void;
  }

const FarmerCategories: React.FC<FarmerCategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const history = useHistory(); // Ajoutez cette ligne
    const getCategories = async () => {
        try {
            let { data, error } = await supabase
                .from('categories')
                .select('*');
    
            if (error) {
                console.error(error);
                return [];
            } else {
                console.log(data);
                return data || [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
        
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const cate = await getCategories();
            console.log("data: ", cate);
            setCategories(cate);
            setIsLoading(false);
        };

            fetchData().then(r => console.log("data", r));
    }, []); 
    const baseUrl = "https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/categories/images/";
  
    const handleCardClick = (categoryId: string) => {
        console.log("id: ", categoryId);
        onSelectCategory(categoryId);
    };

    return (
        <IonContent>
            {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <IonList className='categories-card'>
                        {categories.map((category) => (
                            <div key={category.id_categorie} className="category-container" onClick={() => handleCardClick(category.id_categorie)}>
                                <IonCard className="category-card">
                                    <IonCardContent className='category-content'>
                                        <img className="categorie_img" src={`${baseUrl}${category.lien_image}`} alt="Image de la categorie" />
                                    </IonCardContent>
                                    <IonCardTitle class="ion-text-center category-title ion-margin-horizontal">{category.name}</IonCardTitle>
                                </IonCard>
                            </div>
                            
                        ))}
                    </IonList>
                    )}
        </IonContent>
      );
};

export default FarmerCategories;