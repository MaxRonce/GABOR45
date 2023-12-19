// React and React Router
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Ionic Components
import { useIonToast, IonText, IonPage, IonContent } from "@ionic/react";

// Supabase Components
import { supabase } from "../../supabaseClient";

// Custom Components
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import LogoGaborComponent from "../../components/LogoGaborComponent";

// Images
import mail from "../../icons/mail.svg";
import bloquer from "../../icons/bloquer.svg";
import showP from "../../icons/showP.svg";
import hideP from "../../icons/hideP.svg";

// Custom Styling
import "../../theme/custom.css";
import "../../theme/variables.css";
import "./RegisterUser.css";

const RegisterUser: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showToast] = useIonToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const history = useHistory();

	const handleLogin = async () => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});
			console.log(data);
			if (error) {
				await showToast({
					message: "Error to signUp",
					duration: 2000,
					color: "danger",
				});
				console.log(error);
			} else {
				setPassword("");
				setEmail("");
				await showToast({
					message: "success. Verifie votre email",
					duration: 2000,
					color: "success",
				});
				history.push("/profile");
			}
		} catch (error) {
			await showToast({
				message: "Error to sigUp",
				duration: 2000,
				color: "danger",
			});
		}
	};

	const showPasswordHandler = () => {
		setShowPassword(!showPassword);
	};

	return (
		<IonPage>
			<IonContent>
				<LogoGaborComponent />
				<IonText className="ion-text-center">
					<h1 className="text-title">Inscription</h1>
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
				/>
				<ButtonComponent
					classP="ion-margin-horizontal ion-padding-horizontal"
					text="S'inscrire"
					onClick={handleLogin}
				/>
			</IonContent>
		</IonPage>
	);
};

export default RegisterUser;
