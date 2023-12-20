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

const ProfileEdit: React.FC = () => {
	const [util, setUtil] = useState<Utilisateur | null>(null);
	const { userId } = useParams<{ userId: string }>();
	const history = useHistory();

	useEffect(() => {
		const fetchUserData = async () => {
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', userId)
				.single();

			if (error) {
				console.error('Error fetching user data:', error);
			} else {
				setUtil(data);
			}
		};

		fetchUserData();
	}, [userId]);

	const handleInputChange = (name: string, value: string) => {
		// @ts-expect-error

		setUtil({ ...util, [name]: value });
	};

	const handleSave = async () => {
		const { error } = await supabase
			.from('users')
			.update({ ...util })
			.eq('id', userId);

		if (error) {
			console.error('Error updating user:', error);
		} else {
			history.push(`/profile/${userId}`);
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
				{/* Répétez pour d'autres champs comme prénom, email, etc. */}
				<IonButton onClick={handleSave}>
					Enregistrer les modifications
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default ProfileEdit;
