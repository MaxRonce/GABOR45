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
    IonText,
    IonIcon,
    IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { getPointsVent, createPointsVente, deletePointsVente, updatePointVente, 
    getHoraires, deleteHoraire, createHoraire, updateHoraire } from '../../services/PointsHoraireService';
import { useAuth } from '../../hooks/useAuth';
import { PointsVente } from '../../models/PointsVente';
import { Horaires } from '../../models/Horaires';
import arrowLeft from '../../icons/arrowLeft.svg';
import './PointsHorairesEdit.css';
import ModalMap from '../map/ModalMap';
import HorairesEdit from './HoraireEdit';
import edit from '../../icons/edit.svg';
interface Location {
    lat: number;
    lng: number;
}

const PointsHorairesEdit: React.FC = () => {
    const currentUser = useAuth();
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showToast] = useIonToast();
    //pdv
    const [PointsVente, setPointsVente] = useState<PointsVente[]>([]);
    const [adresse, setAdresse] = useState<string>('');
    const [telFixe, setTelFixe] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [nom, setNom] = useState<string>('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [showHorairePdv, setShowHorairePdv] = useState<boolean>(false);
    const [hideAddForm, setHideAddForm] = useState<boolean>(false);
    const [hideEditForm, setHideEditForm] = useState<boolean>(true);
    //horaires
    const [jour, setJour] = useState<string>('');
    const [heureDebutMatin, setHeureDebutMatin] = useState<string>('');
    const [heureFinMatin, setHeureFinMatin] = useState<string>('');
    const [heureDebutApresMidi, setHeurDebutApresMidi] = useState<string>('');
    const [heureFinApresMidi, setHeureFinApresMidi] = useState<string>('');
    const [showAddHoraireForm, setShowAddHoraireForm] = useState<boolean>(false);
    const [isHoraire, setIsHoraire] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [horaires, setHoraires] = useState<Horaires[]>([]);
    const [PointVente, setPointVente] = useState<PointsVente | ''>({
        id_point_de_vente: '',
        adresse: '',
        tel_fixe: '',
        Description: '',
        website: '',
        lien_image_user: '',
        nom: '',
        latitude: 0,
        longitude: 0,
        appartient_a: ''
        // Asegúrate de inicializar todos los campos necesarios
    });
    const [idPdv, setIdPdv] = useState<string>('');
    const [idHoraire, setIdHoraire] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedPdvId, setSelectedPdvId] = useState<string>('');
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleShowHoraireForm = () => {
        setHideEditForm(false);
        setShowAddHoraireForm(true);
    }

    const handleShowEditPdvForm = () => {
        setHideEditForm(true);
        setHideAddForm(false);
    }

    const handleSetPdv = (pointVente: PointsVente) => {
        setIdPdv(pointVente.id_point_de_vente);
        setPointVente(pointVente);
        setAdresse(pointVente.adresse);
        setTelFixe(pointVente.tel_fixe ?? '');
        setDescription(pointVente.Description ?? '');
        setWebsite(pointVente.website ?? '');
        setNom(pointVente.nom);
        if (pointVente.latitude !== null && pointVente.longitude !== null) {
            setLatitude(pointVente.latitude);
            setLongitude(pointVente.longitude);
        }
        showHoraires(pointVente.id_point_de_vente);
        setHideAddForm(false);
    };

    const onDeleteHoraire = async () => {
        try {
            setIsLoading(true);
            const data = await deleteHoraire(idHoraire);
            if (data) {
                showToast({
                    message: 'Horaire supprimé avec succès',
                    duration: 2000,
                    color: 'success',
                });
                await showHoraires(idPdv);
            }
        } catch (error) {
            console.error(error);
            showToast({
                message: 'Erreur lors de la suppression de l\'horaire',
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
            setShowConfirmModal(false);
        }
    };

    const handleLocationSelect = (location: Location) => {
        setLatitude(location.lat);
        setLongitude(location.lng);
        handleCloseModal();
    };

    const confirmDelete = (pdvId: string) => {
        setSelectedPdvId(pdvId);
        setShowConfirmModal(true);
    };

    const confirmDeleteHoraire = (horaireId: string) => {
        setIdHoraire(horaireId);
        setShowConfirmModal(true);
        setIsHoraire(true);
    }

    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const fetchData = async () => {
        if (currentUser) {
            setIsLoading(true);
            try {
                restoreForm();
                const userData = await getPointsVent(currentUser.id);
                setPointsVente(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        if (!adresse.trim() || !description.trim() || !website.trim() || !nom.trim() || !telFixe.trim() || !latitude) {
            showToast({
                message: "Vous devez remplir tous les champs obligatoires",
                duration: 2000,
                color: "danger",
            });
            return false;
        }
        return true;
    };

    const restoreForm = () => {
        setAdresse('');
        setTelFixe('');
        setDescription('');
        setWebsite('');
        setNom('');
        setLatitude(0);
        setLongitude(0);
        setPointVente('');
        setHideAddForm(false);
        setShowHorairePdv(false);
        setHideEditForm(true);
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            setIsLoading(true);
            let pdv = {
                adresse: adresse,
                tel_fixe: telFixe,
                Description: description,
                website: website,
                nom: nom,
                latitude: latitude,
                longitude: longitude,
                appartient_a: currentUser?.id
            };
            console.log(pdv);
            const data = await createPointsVente(pdv);
            if (data) {
                await showToast({
                    message: `Point de vente ajouté avec succès`,
                    duration: 2000,
                    color: 'success',
                });
                await fetchData();
            }
        } catch (error) {
            await showToast({
                message: `Erreur lors de l'ajout du point de vente`,
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmitHr = async () => {
        try {
            setIsLoading(true);
            let horaire = {
                jour: jour,
                heure_debut_matin: heureDebutMatin,
                heure_fin_matin: heureFinMatin,
                heure_debut_apres_midi: heureDebutApresMidi,
                heure_fin_apres_midi: heureFinApresMidi,
                id_point_de_vente: idPdv
            };
            console.log(horaire);
            const data = await createHoraire(horaire);
            if (data) {
                await showToast({
                    message: `Horaire ajouté avec succès`,
                    duration: 2000,
                    color: 'success',
                });
                await showHoraires(idPdv);
                handleShowEditPdvForm();
            }
        } catch (error) {
            await showToast({
                message: `Erreur lors de l'ajout de l'horaire`,
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeletePdv = async () => {
        if (isHoraire) {
            onDeleteHoraire();
        }else{
            try {
                console.log("id", selectedPdvId);
                setIsButtonDisabled(true);
                const data = await deletePointsVente(selectedPdvId);
                if (data) {
                    await showToast({
                        message: `Point de vente supprimé avec succès`,
                        duration: 2000,
                        color: 'success',
                    });
                    await fetchData();
                    setShowConfirmModal(false);
                }
            } catch (error) {
                await showToast({
                    message: `Erreur lors de la suppression du point de vente`,
                    duration: 2000,
                    color: 'danger',
                });
            } finally {
                setIsButtonDisabled(false);
            }
        }
    }
    const handleUpdatePdv = async (id: string) => {
        if (!validateForm()) {
            return;
        }
        try {
            setIsLoading(true);
            let updatedPdv = {
                id_point_de_vente: id,
                adresse: adresse,
                tel_fixe: telFixe,
                Description: description,
                website: website,
                nom: nom,
                latitude: latitude,
                longitude: longitude,
                appartient_a: currentUser?.id
            };
            console.log(updatedPdv);
            const data = await updatePointVente(updatedPdv);
            if (data) {
                await showToast({
                    message: `Point de vente ajouté avec succès`,
                    duration: 2000,
                    color: 'success',
                });
                await fetchData();
            }
        } catch (error) {
            await showToast({
                message: `Erreur lors de la mise à jour du point de vente`,
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateHr = async () => {
        try {
            setIsLoading(true);
            let updatedHoraire = {
                id_horaires: idHoraire,
                jour: jour,
                heure_debut_matin: heureDebutMatin,
                heure_fin_matin: heureFinMatin,
                heure_debut_apres_midi: heureDebutApresMidi,
                heure_fin_apres_midi: heureFinApresMidi,
                id_point_de_vente: idPdv
            };
            console.log(updatedHoraire);
            const data = await updateHoraire(updatedHoraire);
            if (data) {
                await showToast({
                    message: `Horaire modifié avec succès`,
                    duration: 2000,
                    color: 'success',
                });
                await showHoraires(idPdv);
                handleShowEditPdvForm();
            }
        } catch (error) {
            await showToast({
                message: `Erreur lors de la mise à jour de l'horaire`,
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const onEditHoraire = (horaire: Horaires) => {
        setShowAddHoraireForm(false);
        setIdHoraire(horaire.id_horaires);
        setHideEditForm(false);
        setJour(horaire.jour);
        setHeureDebutMatin(horaire.heure_debut_matin || ''); 
        setHeureFinMatin(horaire.heure_fin_matin || '');
        setHeurDebutApresMidi(horaire.heure_debut_apres_midi || ''); 
        setHeureFinApresMidi(horaire.heure_fin_apres_midi || ''); 
        setIdPdv(horaire.id_point_de_vente);
    }

    const ShowHideForm = () => {
        if (hideEditForm) {
            return (
                <div className='pointv-container'>
                    <h2 className='title-actuelles'>Modifier un point de vente</h2>
                    <div>
                        <div className='row-form'>
                            <IonItem>
                                <IonInput label="Addresse" labelPlacement="stacked" value={adresse}
                                    onIonChange={(e: any) => setAdresse(e.target.value)}
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput label="Téléphone fixe" labelPlacement="stacked" value={telFixe}
                                    onIonChange={(e: any) => setTelFixe(e.target.value)}
                                ></IonInput>
                            </IonItem>
                        </div>
                        <div className='row-form'>
                            <IonItem>
                                <IonInput label="Description" labelPlacement="stacked" value={description}
                                    onIonChange={(e: any) => setDescription(e.target.value)}
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput label="Website" labelPlacement="stacked" value={website}
                                    onIonChange={(e: any) => setWebsite(e.target.value)}
                                ></IonInput>
                            </IonItem>
                        </div>
                        <div className='row-form'>
                            <IonItem className='nom-input'>
                                <IonInput label="Nom" labelPlacement="stacked" value={nom}
                                    onIonChange={(e: any) => setNom(e.target.value)}
                                ></IonInput>
                            </IonItem>
                            <IonButton expand="block" className='btn-show-modal' onClick={handleOpenModal}>Localisation</IonButton>
                        </div>
                        <div className='row-form'>
                            <IonButton className="annuler-btn" onClick={() => restoreForm()}>
                                Retour
                            </IonButton>
                            <IonButton expand="block" type='submit'
                                onClick={() => handleUpdatePdv(PointVente && PointVente.id_point_de_vente)}
                            >Modifier</IonButton>
                        </div>

                    </div>
                    <ModalMap
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onLocationSelect={handleLocationSelect}
                    />
                </div>
            )
        } else {
            if (showAddHoraireForm) {
                return (
                    <div className='pointv-container'>
                        <h2 className='title-actuelles'>Ajouter un Horaire</h2>
                        <div>
                            <div className='row-form'>
                                <IonItem style={{ width: '100%' }}>
                                    <IonInput label="Jour" labelPlacement="stacked"

                                        onIonChange={(e: any) => setJour(e.target.value)}
                                    ></IonInput>
                                </IonItem>

                            </div>
                            <div className='row-form'>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Debut Matin" labelPlacement="stacked" type='time'
                                        onIonChange={(e: any) => setHeureDebutMatin(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Fin Matin" labelPlacement="stacked" type='time'
                                        onIonChange={(e: any) => setHeureFinMatin(e.target.value)}
                                    ></IonInput>
                                </IonItem>

                            </div>
                            <div className='row-form'>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Debut Apres Matin" labelPlacement="stacked" type='time'
                                        onIonChange={(e: any) => setHeurDebutApresMidi(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Fin Apres Matin" labelPlacement="stacked" type='time'
                                        onIonChange={(e: any) => setHeureFinApresMidi(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                            </div>
                            <div className='row-form'>
                                <IonButton expand="block" type='submit' className="annuler-btn"
                                    onClick={() => handleShowEditPdvForm()}
                                >Anuller</IonButton>
                                <IonButton expand="block" type='submit'
                                    onClick={() => handleSubmitHr()}
                                >Ajouter</IonButton>
                            </div>
                        </div>
                        <ModalMap
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onLocationSelect={handleLocationSelect}
                        />
                    </div>
                )
            } else {
                return (
                    <div className='pointv-container'>
                        <h2 className='title-actuelles'>Modifier un Horaire</h2>
                        <div>
                            <div className='row-form'>
                                <IonItem style={{ width: '100%' }}>
                                    <IonInput label="Jour" labelPlacement="stacked"
                                        value={jour}
                                        onIonChange={(e: any) => setJour(e.target.value)}
                                    ></IonInput>
                                </IonItem>

                            </div>
                            <div className='row-form'>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Debut Matin" labelPlacement="stacked" type='time'
                                        value={heureDebutMatin}
                                        onIonChange={(e: any) => setHeureDebutMatin(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Fin Matin" labelPlacement="stacked" type='time'
                                        value={heureFinMatin}
                                        onIonChange={(e: any) => setHeureFinMatin(e.target.value)}
                                    ></IonInput>
                                </IonItem>

                            </div>
                            <div className='row-form'>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Debut Apres Matin" labelPlacement="stacked" type='time'
                                        value={heureDebutApresMidi}
                                        onIonChange={(e: any) => setHeurDebutApresMidi(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem className='input-hr'>
                                    <IonInput label="Hr Fin Apres Matin" labelPlacement="stacked" type='time'
                                        value={heureFinApresMidi}
                                        onIonChange={(e: any) => setHeureFinApresMidi(e.target.value)}
                                    ></IonInput>
                                </IonItem>
                            </div>
                            <div className='row-form'>
                                <IonButton expand="block" type='submit' className="annuler-btn"
                                    onClick={() => handleShowEditPdvForm()}
                                >Anuller</IonButton>
                                <IonButton expand="block" type='submit'
                                    onClick={() => handleUpdateHr()}
                                >Modifier</IonButton>
                            </div>
                        </div>
                        <ModalMap
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onLocationSelect={handleLocationSelect}
                        />
                    </div>
                )
            }
        }
    }

    const showHoraires = async (id: string) => {
        try {
            setIsLoading(true);
            const data = await getHoraires(id);
            if (data) {
                setHoraires(data);
                setShowHorairePdv(true);
            }
        } catch (error) {
            await showToast({
                message: `Erreur lors de la récupération des horaires`,
                duration: 2000,
                color: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <IonPage>
            <IonContent>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <div className='header-points'>
                            <IonIcon src={arrowLeft} onClick={() => history.push('/profile/')} className='nav-icon ion-icon' />
                            <h2 className='title'>Mes points de vente</h2>
                        </div>
                        <div className='point-actuelles-container'>
                            {PointsVente.length === 0 ? (
                                <IonText>Aucun point de vente à afficher</IonText>
                            ) : (
                                PointsVente.map((pointVente) => (
                                    <div key={pointVente.id_point_de_vente} className='box-pdv'>
                                        <div className='row-form-actuelles'>
                                            <IonItem className='labels-points'>
                                                <IonInput className='input-pdv' label="Nom" labelPlacement="stacked" value={pointVente.nom} disabled={true}></IonInput>
                                            </IonItem>
                                            <IonItem className='labels-points'>
                                                <IonInput className='input-pdv' label="Adresse" labelPlacement="stacked" value={pointVente.adresse} disabled={true}></IonInput>
                                            </IonItem>
                                            <div className='buttons-content'>
                                                <IonButton className='btn-modifier' color="danger" onClick={() => confirmDelete(pointVente.id_point_de_vente)}>X</IonButton>
                                                <IonButton className='btn-modifier' onClick={() => handleSetPdv(pointVente)}>
                                                    <IonIcon icon={edit} className="ion-icon" />
                                                </IonButton>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>
                        <IonModal
                            isOpen={showConfirmModal}
                            onDidDismiss={() => setShowConfirmModal(false)}
                            className="my-custom-class"
                        >
                            <div className="modal-content">
                                <div className="modal-form">
                                    <IonText className="delete_modal">Supprimer cet point de vente ?</IonText>
                                    <div className="modal-buttons">
                                        <IonButton
                                            className="annuler-btn"
                                            expand="block"
                                            onClick={() => setShowConfirmModal(false)}
                                            disabled={isButtonDisabled}
                                        >
                                            Annuler
                                        </IonButton>
                                        <IonButton
                                            expand="block"
                                            color="danger"
                                            onClick={() => handleDeletePdv()}
                                            disabled={isButtonDisabled}
                                        >
                                            Supprimer
                                        </IonButton>
                                    </div>
                                </div>
                            </div>

                        </IonModal>
                        {showHorairePdv && (
                            <HorairesEdit
                                horaires={horaires}
                                confirmDeleteHoraire={(id: string) => confirmDeleteHoraire(id)}
                                onEditHoraire={(horaire: any) => onEditHoraire(horaire)}
                                handleShowHoraireForm={handleShowHoraireForm}
                            />
                        )}

                        {hideAddForm || !PointVente ? (
                            <div className='pointv-container'>
                                <h2 className='title-actuelles'>Ajouter un point de vente</h2>
                                <div>
                                    <div className='row-form'>
                                        <IonItem>
                                            <IonInput label="Addresse" labelPlacement="stacked"
                                                onIonChange={(e: any) => setAdresse(e.target.value)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonInput label="Téléphone fixe" labelPlacement="stacked" type='number'
                                                onIonChange={(e: any) => setTelFixe(e.target.value)}
                                            ></IonInput>
                                        </IonItem>
                                    </div>
                                    <div className='row-form'>
                                        <IonItem>
                                            <IonInput label="Description" labelPlacement="stacked"
                                                onIonChange={(e: any) => setDescription(e.target.value)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonInput label="Website" labelPlacement="stacked"
                                                onIonChange={(e: any) => setWebsite(e.target.value)}
                                            ></IonInput>
                                        </IonItem>
                                    </div>
                                    <div className='row-form'>
                                        <IonItem className='nom-input'>
                                            <IonInput label="Nom" labelPlacement="stacked"
                                                onIonChange={(e: any) => setNom(e.target.value)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonButton expand="block" className='btn-show-modal' onClick={handleOpenModal}>Localisation</IonButton>
                                    </div>
                                    <IonButton expand="block" type='submit' className='btn-valider'
                                        onClick={() => handleSubmit()}
                                    >Ajouter</IonButton>
                                </div>
                                <ModalMap
                                    isOpen={isModalOpen}
                                    onClose={handleCloseModal}
                                    onLocationSelect={handleLocationSelect}
                                />
                            </div>
                        ) : (
                            ShowHideForm()
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default PointsHorairesEdit;
