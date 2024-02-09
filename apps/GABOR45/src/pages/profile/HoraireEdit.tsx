import React from 'react';
import { IonButton, IonInput, IonItem, IonText, IonIcon } from '@ionic/react';
import { Horaires } from '../../models/Horaires';
import edit from '../../icons/edit.svg';
import add_outline from '../../icons/add_outline.svg';
interface HorairesEditProps {
    horaires: Horaires[];
    confirmDeleteHoraire: (id: string) => void;
    onEditHoraire: (horaire: Horaires) => void;
    handleShowHoraireForm: () => void;
}

const HorairesEdit: React.FC<HorairesEditProps> = ({ horaires, confirmDeleteHoraire, onEditHoraire, handleShowHoraireForm}) => {
    return (
        <div className='point-actuelles-container'>
            <div className='horaire-head'>
                <IonButton className='btn-modifier-hr' onClick={handleShowHoraireForm}>
                    <IonIcon icon={add_outline} className="ion-icon" />
                </IonButton>
                <h2 className='title-actuelles'>Mes Horaires</h2>
            </div>
            {horaires.length === 0 ? (
                <IonText>Aucun horaire à afficher</IonText>
            ) : (
                horaires.map((horaire) => (
                    <div key={horaire.id_horaires} className='row-form-actuelles'>
                        <IonItem className='labels-points'>
                            <IonInput className='input-pdv' label="Jour" labelPlacement="stacked" value={horaire.jour} disabled={true}></IonInput>
                        </IonItem>
                        <IonItem className='labels-points'>
                            <IonInput className='input-pdv' label="Hr debut matin" labelPlacement="stacked" value={horaire.heure_debut_matin} disabled={true}></IonInput>
                        </IonItem>
                        <div className='buttons-content'>
                            <IonButton className='btn-modifier' color="danger" onClick={() => confirmDeleteHoraire(horaire.id_horaires)}>X</IonButton>
                            <IonButton className='btn-modifier' onClick={() => onEditHoraire(horaire)}>
                                <IonIcon icon={edit} className="ion-icon" />
                            </IonButton>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HorairesEdit;
