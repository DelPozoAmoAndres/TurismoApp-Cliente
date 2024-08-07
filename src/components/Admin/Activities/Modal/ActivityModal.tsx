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
        height: '459px',
        overflow: 'hidden'
    }

    return (
        <Modal id={'modal-activity-' + action} trigger={activity?._id || "modal-activity-add"} title={t("ACTIVITY." + action.toUpperCase() + ".TITLE")} modal={modal} >
            <IonRow class='ion-margin-horizontal ion-nowrap ion-justify-content-center'>
                <section className='ion-margin-end '>
                    <IonRow class="ion-justify-content-center" style={gridStyle}>
                        {(formData?.images)?.map((image, imageIndex) =>
                            <div key={"image" + imageIndex} style={{ position: "relative" }} >
                                <img src={String(image) || ""} style={{ filter: 'brightness(50%)' }} />
                                <span style={{ position: "absolute", top: 5, left: 5, color: 'white' }}>{imageIndex + 1}</span>
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
                        <label htmlFor='file-input'>{t("ACTIONS.SELECT.FILES")}</label>
                    </IonButton>
                </section>
                <IonList class='ion-no-padding'>
                    <IonItem>
                        <IonInput
                            value={formData?.name}
                            label={t('ACTIVITY.NAME') || ''}
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, name: e.detail.value || '' })}
                        ></IonInput>
                    </IonItem>
                    <IonItem class='ion-margin-vertical' lines='inset'>
                        <IonLabel>{t('ACTIVITY.CATEGORY')}</IonLabel>
                        <IonSelect
                            value={formData?.category}
                            onIonChange={(e) => formData && setFormData({ ...formData, category: e.detail.value })}
                        >
                            {Object.keys(ActivityCategory).map((value, index) => (
                                <IonSelectOption key={`categoryOption${index}`} value={ActivityCategory[value as keyof typeof ActivityCategory]}>
                                    {t("CATEGORY." + ActivityCategory[value as keyof typeof ActivityCategory].toUpperCase())}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonSegment mode="ios" value={language} onIonChange={(e) => { e.detail.value && setLanguage(e.detail.value); }}>
                            <IonSegmentButton value="es">
                                <IonLabel>{t('LANGUAGE.ES')}</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="en">
                                <IonLabel>{t("LANGUAGE.EN")}</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="fr">
                                <IonLabel>{t("LANGUAGE.FR")}</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonItem>
                    <IonItem>
                        <IonTextarea
                            class='resize'
                            value={formData?.description[language]}
                            label={t('ACTIVITY.DESCRIPTION') || ''}
                            labelPlacement="stacked"
                            rows={4}
                            onIonInput={(e) => formData && setFormData({ ...formData, description: { ...formData.description, [language]: e.detail.value || '' } })}>

                        </IonTextarea>
                    </IonItem>
                    <IonItem >
                        <IonInput
                            value={formData?.location}
                            label={t('ACTIVITY.LOCATION') || ''}
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, location: e.detail.value || '' })}
                        ></IonInput>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonInput
                            value={formData?.duration}
                            label={t('ACTIVITY.DURATION') + " ( " + t('MINUTES') + " )" || ''}
                            labelPlacement="stacked"
                            type='number'
                            onIonInput={(e) => formData && setFormData({ ...formData, duration: Number(e.detail.value) })}
                        ></IonInput>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonSegment mode="ios" value={formData?.state} onIonChange={e => e.detail.value && formData && setFormData({ ...formData, state: ActivityState[e.detail.value as keyof typeof ActivityState] })}>
                            {Object.keys(ActivityState).map((value, index) =>
                                <IonSegmentButton key={"activityStates" + index} value={value}>
                                    <IonLabel style={{ textWrap: "wrap", margin: "auto" }}>{t("ACTIVITY.STATE." + value.toUpperCase())}</IonLabel>
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
