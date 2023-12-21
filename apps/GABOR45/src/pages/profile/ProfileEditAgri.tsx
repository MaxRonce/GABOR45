// ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import {
	IonPage,
	IonContent,
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import {
	getAgriInfo,
	getUserInfo,
	updateAgriInfo,
	updateUserInfo,
} from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { Farmer } from '../../models/Farmer';
import { supabase } from '../../supabaseClient';

const ProfileEdit: React.FC = () => {
	const currentUser = useAuth();
	const [farmer, setFarmer] = useState<Farmer | null>(null);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [produits, setProduits] = useState<any[]>([]);

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

	const handleSave = async () => {
		if (farmer) {
			try {
				await updateAgriInfo(currentUser?.id || '', farmer);
				history.push(`/profile`);
			} catch (error) {
				console.error('Error updating user:', error);
			}
		}
	};

	return (
		<IonPage>
			<IonContent>
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
					<IonInput
						label="Adresse"
						labelPlacement="floating"
						value={farmer?.adresse}
						onIonChange={e =>
							handleInputChange('adresse', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Latitude"
						labelPlacement="floating"
						value={farmer?.latitude}
						onIonChange={e =>
							handleInputChange('latitude', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Longitude"
						labelPlacement="floating"
						value={farmer?.longitude}
						onIonChange={e =>
							handleInputChange('longitude', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Nom de la ferme"
						labelPlacement="floating"
						value={farmer?.nom_ferme}
						onIonChange={e =>
							handleInputChange('nom_ferme', e.detail.value!)
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
								value={produit.name}
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
