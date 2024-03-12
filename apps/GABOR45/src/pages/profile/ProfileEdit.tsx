// ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import {
	IonPage,
	IonContent,
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	useIonToast,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import regexTest from '../../fonctions/regex';
import { supabase } from '../../supabaseClient';
import { Utilisateur } from '../../models/User';
import { getUserInfo, updateUserInfo } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

const ProfileEdit: React.FC = () => {
	const currentUser = useAuth();
	const [util, setUtil] = useState<Utilisateur | null>(null);
	const history = useHistory();
	const [showToast] = useIonToast();
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
				if (
					(util?.nom || '') != '' &&
					!regexTest(util?.nom || '', 'name')
				) {
					await showToast({
						message: 'Nom invalide',
						duration: 2000,
						color: 'danger',
					});
					return;
				}
				if (
					(util?.prenom || '') != '' &&
					!regexTest(util?.prenom || '', 'name')
				) {
					await showToast({
						message: 'Prénom invalide',
						duration: 2000,
						color: 'danger',
					});
					return;
				}
				if (
					(util?.email || '') != '' &&
					!regexTest(util?.email || '', 'email')
				) {
					await showToast({
						message: 'Email invalide',
						duration: 2000,
						color: 'danger',
					});
					return;
				}
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
					<IonInput
						label="Nom"
						labelPlacement="floating"
						value={util?.nom}
						onIonInput={e =>
							handleInputChange('nom', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Email"
						labelPlacement="floating"
						value={util?.email}
						onIonInput={e =>
							handleInputChange('email', e.detail.value!)
						}
					/>
				</IonItem>
				<IonItem>
					<IonInput
						label="Prénom"
						labelPlacement="floating"
						value={util?.prenom}
						onIonInput={e =>
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
