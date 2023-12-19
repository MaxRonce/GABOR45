import { IonButton, IonIcon } from "@ionic/react";

const ButtonComponent = (props: any) => {
	const { classP, text, styleP, iconName, onClick } = props;
	const buttonStyle = styleP ? styleP : {};
	return (
		<IonButton
			onClick={onClick}
			expand="full"
			shape="round"
			className={classP}
			style={buttonStyle}
		>
			{iconName && (
				<IonIcon
					src={iconName}
					className="icon-input ion-margin-horizontal"
				/>
			)}
			{text}
		</IonButton>
	);
};

export default ButtonComponent;
