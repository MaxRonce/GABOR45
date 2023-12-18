import {IonList, IonCard, IonCardContent, IonContent, IonCardHeader, IonCardTitle, IonImg} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Farmers.css';
import { getAllCategories } from '../../services/categoryService';
import LoadingScreen from "../../components/LoadingScreen";
import { Categories } from '../../models/Categories';
// interface for the props of the component
interface FarmerCategoriesProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string) => void;
  }

const FarmerCategories: React.FC<FarmerCategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const history = useHistory(); 

    // useEffect to get the categories from the database
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getAllCategories();
                console.log("data", data);
                setCategories(data || []);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
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