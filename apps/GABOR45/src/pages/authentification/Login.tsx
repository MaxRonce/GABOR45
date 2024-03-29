// React and React Router
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Ionic Framework Components
import {
	useIonToast,
	IonText,
	IonPage,
	IonContent,
	IonIcon,
	IonAlert,
} from "@ionic/react";

// Supabase
import { supabase } from "../../supabaseClient";

// Custom Components
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";

// Custom Styling and Images
import "../../theme/variables.css";
import mail from "../../icons/mail.svg";
import facebook from "../../icons/facebook.svg";
import bloquer from "../../icons/bloquer.svg";
import showP from "../../icons/showP.svg";
import hideP from "../../icons/hideP.svg";
import google from "../../icons/google.svg";
import logo_Gabor45 from "../../icons/logo_Gabor45.svg";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [resetEmail, setResetEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showToast] = useIonToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);

	const openAlert = () => {
		setResetEmail(" ");
		setShowAlert(true);
	};
	const handleAlertClose = () => {
		setResetEmail("");
		setShowAlert(false);
	};
	const history = useHistory();

	// function to login with email and password
	const handleLogin = async () => {
		// TODO : ecrire des tests pour ces fonctions
		const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (!expression.test(email)) {
			await showToast({
				message: "Email invalide",
				duration: 2000,
				color: "danger",
			});
			return;
		}
		if (password.length < 6) {
			await showToast({
				message: "Mot de passe invalide",
				duration: 2000,
				color: "danger",
			});
			setPassword("");
			return;
		}
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});

			if (error) {
				await showToast({
					message: "connexion échouée",
					duration: 2000,
					color: "danger",
				});
				setPassword("");
			} else {
				setPassword("");
				setEmail("");
				await showToast({
					message: "Connexion réussie", // To keep in french
					duration: 1000,
					color: "success",
					position: "middle",
				});

				history.push("/profile");
			}
		} catch (error) {
			console.error("Unexpected error during login:", error);
			await showToast({
				message: "connexion échouée",
				duration: 2000,
				color: "danger",
			});
		}
	};

	const signInWith = async (provider: any) => {
		try {
			await supabase.auth.signInWithOAuth({
				provider: provider,
			});
		} catch (error) {
			console.log(error);
			await showToast({
				message: "Error to sigUp",
				duration: 2000,
				color: "danger",
			});
		}
	};
	//show and hide password
	const showPasswordHandler = () => {
		console.log("Push show password");
		setShowPassword(!showPassword);
	};

	//function to send reset password
	const handleSendResetPassword = async (e: any) => {
		setResetEmail(" ");
		console.log("email ", e.email);
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(
				e.email
			);
			if (error) {
				await showToast({
					message: "Error to send",
					duration: 2000,
					color: "danger",
				});
			} else {
				await showToast({
					message: "Success",
					duration: 2000,
					color: "success",
				});
				setResetEmail("");
				handleAlertClose();
			}
		} catch (error) {
			console.log(error);
			await showToast({
				message: "Error to send",
				duration: 2000,
				color: "danger",
			});
		}
	};

	return (
		<IonPage>
			<IonContent class="ion-text-center">
				<IonIcon src={logo_Gabor45} className="gabor45-logo" />
				<IonText className="ion-margin-horizontal text-title">
					Connexion
				</IonText>

				<InputComponent
					classP="login-input"
					labelP="Email"
					typeP="email"
					iconName={mail}
					placeholderP="email@domain.com"
					valueP={email}
					onChange={(e: any) => setEmail(e.detail.value || "")}
					classI="custom-input"
					classIcon="login-icon ion-icon"
				/>

				<InputComponent
					classP="login-input input-pass"
					labelP="Mot de passe"
					typeP={showPassword ? "text" : "password"}
					placeholderP="********"
					valueP={password}
					onChange={(e: any) => setPassword(e.detail.value || "")}
					classI="custom-input"
					iconName={bloquer}
					classIcon="login-icon ion-icon"
					onIconClick={showPasswordHandler}
					iconP={showPassword ? showP : hideP}
					styleP={{
						zIndex: "1",
						position: "relative",
					}}
				/>
				<IonText
					onClick={openAlert}
					id="motOublie"
					className="text-btn ion-padding-horizontal ion-float-right ion-margin-horizontal ion-margin-bottom"
				>
					Mot de passe oublié ?
				</IonText>
				<IonAlert
					header="réinitialiser le mot de passe"
					message="vous recevrez un courriel pour réinitialiser votre mot de passe"
					buttons={[
						{
							text: "Annuler",
							role: "cancel",
							handler: (e) => {
								console.log("Cancelado");
								handleAlertClose();
							},
						},
						{
							text: "Envoyer",
							handler: (e) => handleSendResetPassword(e),
						},
					]}
					isOpen={showAlert}
					inputs={[
						{
							name: "email",
							type: "email",
							placeholder: "Email",
							value: resetEmail,
						},
					]}
				/>
				<ButtonComponent
					classP="btns-login ion-margin-horizontal ion-padding-horizontal"
					text="Se connecter"
					onClick={handleLogin}
				/>
				<IonText
					onClick={() => {
						history.push("/registerUser");
					}}
					className="text-btn ion-text-center ion-margin-bottom"
				>
					<h3 className="text-title">S'inscrire</h3>
				</IonText>
				<div id="line-login">
					<IonText>ou</IonText>
				</div>
				<ButtonComponent
					classP="btns-login ion-padding-horizontal ion-margin-horizontal ion-margin-top"
					text="Se connecter avec Facebook"
					onClick={() => {
						signInWith("facebook");
					}}
					iconName={facebook}
					styleP={{ "--ion-color-primary": "#2b5c93" }}
				/>
				<ButtonComponent
					classP="btns-login btn-google ion-padding-horizontal ion-margin-horizontal ion-margin-top"
					text="Se connecter avec Google"
					onClick={() => {
						signInWith("google");
					}}
					iconName={google}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Login;
