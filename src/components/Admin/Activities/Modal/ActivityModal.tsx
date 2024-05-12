import React, { useRef, useState } from 'react';
/* Ionic components */
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
/* Components */
import { Modal } from '@shared/Modal';
/* Hooks */
import { useEdit } from '@hooks/useEdit';
/* Models */
import { Activity, ActivityCategory, ActivityState } from '@models/Activity';
/* Styles */
import "./ActivityModal.css";
/* Utils */
import { uploadImage } from '@utils/Utils';
/* Apis */
import { createActivity, editActivity } from '@apis/adminActivityApi';
/* i18n */
import { useTranslation } from 'react-i18next';
import { trashBinOutline } from 'ionicons/icons';
import { relative } from 'path';

export const ActivityModal: React.FC<{ activity: Activity, action: "add" | "edit", update?: () => void }> = ({ activity, action, update }) => {
    const { t } = useTranslation();
    const modal = useRef<HTMLIonModalElement>(null);
    const closeModal = () => { modal.current?.dismiss(); update && update(); }
    const { formData, setFormData, guardarCambios, edited } = useEdit(activity, action == "edit" ? editActivity : createActivity, closeModal);
    const [language, setLanguage] = useState("es");


    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(formData.images.length))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(formData.images.length / Math.ceil(Math.sqrt(formData.images.length)))}, 1fr)`,
        width: '345px',
        height: '470px',
        overflow: 'hidden'
    }

    return (
        <Modal id={'modal-activity-' + action} trigger={activity?._id || "modal-activity-add"} title={t("activity." + action + ".title")} modal={modal} >
            <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
                <section className='ion-margin-end '>
                    <IonRow class="ion-justify-content-center" style={gridStyle}>
                        {(formData?.images)?.map((image, imageIndex) =>
                            <div key={"image" + imageIndex} style={{ position: "relative" }} >
                                <img src={String(image) || ""} />
                                <span style={{ position: "absolute", top: 5, left: 5 }}>{imageIndex}</span>
                                <IonIcon
                                    onClick={() => {
                                        const updatedImages = formData?.images.filter((_, index) => index !== imageIndex);
                                        formData && setFormData({ ...formData, images: updatedImages });
                                    }}
                                    icon={trashBinOutline}
                                    size='large'
                                    class='delete-icon'
                                />
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
                        <IonLabel>Categoría</IonLabel>
                        <IonSelect
                            value={formData?.category}
                            placeholder="Seleccionar categoría"
                            onIonChange={(e) => formData && setFormData({ ...formData, category: e.detail.value })}
                        >
                            {Object.keys(ActivityCategory).map((value, index) => (
                                <IonSelectOption key={`categoryOption${index}`} value={ActivityCategory[value as keyof typeof ActivityCategory]}>
                                    {ActivityCategory[value as keyof typeof ActivityCategory]}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
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
                        {t('ACTIONS.SAVE')}
                    </IonButton>
                </IonList>
            </IonRow>
        </Modal>
    )
}
