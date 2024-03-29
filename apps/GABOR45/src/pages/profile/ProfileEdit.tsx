// ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import {
	IonPage,
	IonContent,
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';

import { supabase } from '../../supabaseClient';
import { Utilisateur } from '../../models/User';
import { getUserInfo, updateUserInfo } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

const ProfileEdit: React.FC = () => {
	const currentUser = useAuth();
	const [util, setUtil] = useState<Utilisateur | null>(null);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			if (currentUser) {
				setIsLoading(true);
				try {
					const userData = await getUserInfo(currentUser.id);
					setUtil(userData);
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
	}, [currentUser]);

	const handleInputChange = (name: string, value: string) => {
		// @ts-expect-error

		setUtil({ ...util, [name]: value });
	};

	const handleSave = async () => {
		if (util) {
			try {
				await updateUserInfo(currentUser?.id || '', util);
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
					<IonLabel position="floating">Nom</IonLabel>
					<IonInput
						value={util?.nom}
						onIonChange={e =>
							handleInputChange('nom', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="floating">Email</IonLabel>
					<IonInput
						value={util?.email}
						onIonChange={e =>
							handleInputChange('email', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="floating">Prénom</IonLabel>
					<IonInput
						value={util?.prenom}
						onIonChange={e =>
							handleInputChange('prenom', e.detail.value!)
						}
					/>
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
