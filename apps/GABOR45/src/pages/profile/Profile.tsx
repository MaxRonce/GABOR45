import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButton } from '@ionic/react';

import { supabase } from '../../supabaseClient';
import { User } from '@supabase/supabase-js';

import { Utilisateur } from '../../models/User';
import { getUserInfo } from '../../services/userService';

import LoadingScreen from '../../components/LoadingScreen';
import { useAuth } from '../../hooks/useAuth';

import './Profile.css';

const Profile: React.FC = () => {
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

	const redirectToLogin = () => {
		history.push('/login');
	};

	const verifyUser = async (userId: string): Promise<boolean> => {
		const { data, error } = await supabase
			.from('agriculteur')
			.select('*')
			.eq('id_agriculteur', userId);
		if (data && data.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	const redirectToProfileEdit = async () => {
		if (currentUser) {
			const valtest = await verifyUser(currentUser.id);
			console.log(valtest);
			if (valtest) {
				history.push(`/profile_edit_agri/${currentUser.id}`);
			} else {
				history.push(`/profile_edit/${currentUser.id}`);
			}
		} else {
			redirectToLogin();
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Failed to sign out:', error);
		} else {
			console.log('Sign out successful');
			history.replace('/login');
		}
	};

	const baseUrl =
		'https://sktoqgbcjidoohzeobcz.supabase.co/storage/v1/object/public/avatars/agri/';

	const profileImageUrl = util?.lien_image
		? `${baseUrl}${util.lien_image}`
		: '';

	return (
		<IonPage>
			<IonContent>
				{isLoading ? (
					<LoadingScreen />
				) : util ? (
					<div className="content">
						<div className="profile-image-container">
							<img
								src={profileImageUrl}
								alt="Profil"
								className="profile-image"
							/>
						</div>
						<div className="information">
							<h1>Profil</h1>
							<p>Nom: {util.nom}</p>
							<p>Prénom: {util.prenom}</p>
							<p>Email: {util.email}</p>
							<p>Numéro de téléphone: {util.num_tel}</p>
							{/* ... Autres informations de profil ... */}
						</div>
						<IonButton
							onClick={redirectToProfileEdit}
							className="edit-profile"
						>
							Modifier le Profil
						</IonButton>
						<div className="deconnexion">
							<IonButton onClick={signOut} expand="block">
								Se déconnecter
							</IonButton>
						</div>
					</div>
				) : (
					<div className="content">
						<h1>Profil</h1>
						<p>Vous n'êtes pas connecté.</p>
						<IonButton onClick={redirectToLogin} expand="block">
							Se connecter
						</IonButton>
					</div>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Profile;
