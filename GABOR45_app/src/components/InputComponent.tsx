import { IonGrid, IonRow, IonCol, IonIcon, IonInput } from "@ionic/react";
import '../theme/custom.css';
import '../theme/variables.css';
const InputComponent = (props: any) => {
    const { classP, labelP, typeP, iconName , placeholderP, valueP, onChange, classI, classIcon, onIconClick, iconP} = props;

    return (
        <IonGrid class="ion-margin-horizontal ion-padding-horizontal">
                    <IonRow>
                        {iconName && (
                            <IonCol size="1" class="ion-margin">
                                {iconName && <IonIcon src={iconName} className={classIcon} />}
                            </IonCol>
                        )}
                        <IonCol class='ion-margin-start '>
                            <div className={classP}>
                                <IonInput
                                label={labelP}
                                label-placement="floating"     
                                type={typeP}
                                placeholder={placeholderP}
                                value={valueP}
                                onIonChange={onChange}
                                className={classI}
                                />
                                {onIconClick && (
                                    <IonIcon src={iconP} className='login-icon ion-icon' onClick={onIconClick} />
                                )}
                            </div>
                        </IonCol>
                        
                    </IonRow>
                </IonGrid>
    );
}

export default InputComponent;