import React, { useRef,useState } from 'react';
/* Ionic components */
import { IonAlert, IonButton, IonCheckbox, IonInput, IonItem, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonTextarea } from '@ionic/react';
/* Components */
import { Modal } from '@shared/Modal';
/* Hooks */
import { useEdit } from '@hooks/useEdit';
/* Models */
import { Activity, ActivityState } from '@models/Activity';
/* Styles */
import "./ActivityModal.css";
/* Utils */
import { uploadImage } from '@utils/Utils';
/* Apis */
import { createActivity, editActivity } from '@apis/adminActivityApi';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityModal: React.FC<{ activity: Activity, action: "add" | "edit" }> = ({ activity, action }) => {
    const { t } = useTranslation();
    const modal = useRef<HTMLIonModalElement>(null);
    const closeModal = () => { modal.current?.dismiss() }
    const { formData, setFormData, guardarCambios, edited } = useEdit(activity, action == "edit" ? editActivity : createActivity,closeModal);
    const [language, setLanguage] = useState("es");
    
    return (
        <Modal id={'modal-activity-' + action} trigger={activity?._id || "modal-activity-add"} tittle={t("activity." + action + ".title")} modal={modal} >
            <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
                <section className='ion-margin-end '>
                    <IonRow class="ion-justify-content-center" >
                        {(formData?.images)?.map((image, index) =>
                            <div key={"image" + index} >
                                <img src={String(image) || ""} />
                            </div>
                        )}
                        <input type="file" id="file-input" accept="image/*"
                            onChange={(e) => {
                                const fr = new FileReader();
                                uploadImage(fr, e,
                                    async () => {
                                        formData && setFormData({ ...formData, images: [...formData.images, fr.result] })
                                    })
                            }} />
                    </IonRow>
                    <IonButton expand='block'>
                        <label htmlFor='file-input'>Seleccionar archivo</label>
                    </IonButton>
                </section>
                <IonList class='ion-no-padding'>
                    <IonItem>
                        <IonInput
                            value={formData?.name}
                            label="Nombre"
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, name: e.detail.value || '' })}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonSegment mode="ios" value={language} onIonChange={e => e.detail.value && setLanguage(e.detail.value)}>
                            <IonSegmentButton value="es">
                                <IonLabel>Español</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="en">
                                <IonLabel>English</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="fr">
                                <IonLabel>Français</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonItem>
                    <IonItem>
                        <IonTextarea
                            class='resize'
                            value={formData?.description[language]}
                            rows={5}
                            label="Description1"
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, description: { ...formData.description, [language]: e.detail.value || '' } })}>
                                
                            </IonTextarea>
                    </IonItem>
                    <IonItem >
                        <IonInput
                            value={formData?.location}
                            label="Ubicación"
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, location: e.detail.value || '' })}
                        ></IonInput>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonInput
                            value={formData?.duration}
                            label="Duración (minutos)"
                            labelPlacement="stacked"
                            type='number'
                            onIonInput={(e) => formData && setFormData({ ...formData, duration: Number(e.detail.value) })}
                        ></IonInput>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonSegment mode="ios" value={formData?.state} onIonChange={e => e.detail.value && formData && setFormData({ ...formData, state: ActivityState[e.detail.value as keyof typeof ActivityState] })}>
                            {Object.keys(ActivityState).map((value, index) =>
                                <IonSegmentButton key={"activityStates" + index} value={value}>
                                    <IonLabel>{t(value)}</IonLabel>
                                </IonSegmentButton>)}
                        </IonSegment>
                    </IonItem>

                    <IonButton disabled={!edited} expand="block" onClick={guardarCambios}>
                        Guardar cambios
                    </IonButton>
                </IonList>
            </IonRow>
        </Modal>
    )
}
