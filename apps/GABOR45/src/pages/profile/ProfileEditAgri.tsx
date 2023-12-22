// ProfileEdit.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
	IonPage,
	IonContent,
	IonButton,
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { getAgriInfo, updateAgriInfo } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { Farmer } from '../../models/Farmer';
import { supabase } from '../../supabaseClient';

const ProfileEdit: React.FC = () => {
	const currentUser = useAuth();
	const [farmer, setFarmer] = useState<Farmer | null>(null);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [produits, setProduits] = useState<any[]>([]);
	const [image_profile, setImage_profile] = useState<any>();
	const [image_name, setImage_name] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			if (currentUser) {
				setIsLoading(true);
				try {
					const userData = await getAgriInfo(currentUser.id);
					setFarmer(userData);
				} catch (error) {
					console.error('Failed to fetch user data:', error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		};
		fetchData();
		arttest();
	}, [currentUser]);

	const handleInputChange = (name: string, value: string) => {
		// @ts-expect-error
		setFarmer({ ...farmer, [name]: value });
	};

	const arttest = async () => {
		const { data: types_produits, error: produitsError } = await supabase
			.from('categories')
			.select('*');
		console.log(types_produits);
		setProduits(types_produits || []);
		if (produitsError) {
			console.error('Error fetching products', produitsError);
			return [];
		}
		return types_produits;
	};

	const uploadImage = async (image: any) => {
		//const new_image = resize_image(image);
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(`agri/${image_name}`, image, {
				cacheControl: '3600',
				upsert: false,
			});
		if (error) {
			console.error('Error uploading image', error);
			return;
		}
		return data;
	};

	const handleSave = async () => {
		if (farmer) {
			try {
				if (image_profile && image_name) {
					await uploadImage(image_profile);
				}
				await updateAgriInfo(currentUser?.id || '', farmer);
				history.push(`/profile`);
			} catch (error) {
				console.error('Error updating user:', error);
			}
		}
	};

	function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setImage_profile(file);
			setImage_name(file.name);
			setFarmer(prevFarmer => ({
				...prevFarmer!,
				lien_image_user: file.name,
			}));
		}
	}

	return (
		<IonPage>
			<IonContent>
				<IonItem>
					<IonLabel position="stacked">Image</IonLabel>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Nom"
						labelPlacement="floating"
						value={farmer?.nom}
						onIonChange={e =>
							handleInputChange('nom', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Email"
						labelPlacement="floating"
						value={farmer?.email}
						onIonChange={e =>
							handleInputChange('email', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Prénom"
						labelPlacement="floating"
						value={farmer?.prenom}
						onIonChange={e =>
							handleInputChange('prenom', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Description"
						labelPlacement="floating"
						value={farmer?.description}
						onIonChange={e =>
							handleInputChange('description', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Numéro de téléphone"
						labelPlacement="floating"
						value={farmer?.num_tel}
						onIonChange={e =>
							handleInputChange('num_tel', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Numéro de téléphone portable"
						labelPlacement="floating"
						value={farmer?.tel_portable}
						onIonChange={e =>
							handleInputChange('tel_portable', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Site internet"
						labelPlacement="floating"
						value={farmer?.website}
						onIonChange={e =>
							handleInputChange('website', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Facebook"
						labelPlacement="floating"
						value={farmer?.facebook}
						onIonChange={e =>
							handleInputChange('facebook', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Instagram"
						labelPlacement="floating"
						value={farmer?.instagram}
						onIonChange={e =>
							handleInputChange('instagram', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Twitter"
						labelPlacement="floating"
						value={farmer?.twitter}
						onIonChange={e =>
							handleInputChange('twitter', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonSelect
						label="Type de produit principal"
						labelPlacement="floating"
						value={farmer?.type_produit_principal}
						onIonChange={e =>
							handleInputChange(
								'type_produit_principal',
								e.detail.value,
							)
						}
					>
						{produits.map(produit => (
							<IonSelectOption
								key={produit.id_categorie}
								value={produit.id_categorie}
							>
								{produit.name}
							</IonSelectOption>
						))}
					</IonSelect>
				</IonItem>
				{/* Ajoutez d'autres champs ici */}
				<IonButton onClick={handleSave}>
					Enregistrer les modifications
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default ProfileEdit;
