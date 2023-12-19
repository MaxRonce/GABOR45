// Ionic Components
import { IonGrid, IonRow, IonCol, IonIcon, IonInput } from "@ionic/react";

// Custom Styling
import "../theme/custom.css";
import "../theme/variables.css";

const InputComponent = (props: any) => {
	const {
		classP,
		labelP,
		typeP,
		iconName,
		placeholderP,
		styleP,
		valueP,
		onChange,
		classI,
		classIcon,
		onIconClick,
		iconP,
	} = props;

	return (
		<IonGrid class="ion-margin-horizontal ion-padding-horizontal">
			<IonRow>
				{iconName && (
					<IonCol size="1" class="ion-margin">
						{iconName && (
							<IonIcon src={iconName} className={classIcon} />
						)}
					</IonCol>
				)}
				<IonCol class="ion-margin-start input-col">
					<div className={classP}>
						{onIconClick && (
							<IonIcon
								src={iconP}
								className="login-icon ion-icon"
								onClick={onIconClick}
							/>
						)}
						<IonInput
							label={labelP}
							label-placement="floating"
							type={typeP}
							placeholder={placeholderP}
							value={valueP}
							onIonChange={onChange}
							className={classI}
							style={styleP}
						/>
					</div>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default InputComponent;
