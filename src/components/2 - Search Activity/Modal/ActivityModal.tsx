import React, { useRef } from 'react';
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
    const { formData, setFormData, guardarCambios, setShowAlert, showAlert, edited } = useEdit(activity,action=="edit"?editActivity:createActivity);
    const modal = useRef<HTMLIonModalElement>(null);
    return (
        <Modal id='modal-activity-edit' trigger={activity?._id || "add"} minWidthAndroid={0} minWidthIos={0} tittle={t("activity."+action+".title")} modal={modal} >
            <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
                <section className='ion-margin-end '>
                    <IonRow class="ion-justify-content-center" >
                        {(formData?.images)?.map((image, index) =>
                            <div key={"image" + index} >
                                <img src={String(image) || ""}/>
                            </div>
                        )}
                        <input type="file" id="file-input" accept="image/*"
                            onChange={(e) => {
                                const fr = new FileReader();
                                uploadImage(fr, e,
                                    async () => {
                                        formData && setFormData({ ...formData, images:  [fr.result] })
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
                        <IonTextarea
                            value={formData?.description}
                            rows={5}
                            label="Descripción"
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, description: e.detail.value || '' })}
                        ></IonTextarea>
                    </IonItem>
                    <IonItem >
                        <IonTextarea
                            value={formData?.accesibility}
                            rows={3}
                            label="Accesibilidad"
                            labelPlacement="stacked"
                            onIonInput={(e) => formData && setFormData({ ...formData, accesibility: e.detail.value || '' })}
                        ></IonTextarea>
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
                        <IonCheckbox
                            class="ion-margin-start ion-margin-top"
                            checked={formData?.petsPermited}
                            value={formData?.petsPermited === false}
                            labelPlacement="start"
                            onIonChange={(e) =>
                                formData &&
                                setFormData({
                                    ...formData,
                                    petsPermited: Boolean(e.detail.value),
                                })
                            }
                        >
                            Mascotas permitidas
                        </IonCheckbox>
                    </IonItem>
                    <IonItem lines='none'>
                        <IonSegment mode="ios" value={ActivityState.available}>
                            {Object.keys(ActivityState).map((value,index) =>
                                <IonSegmentButton key={"activityStates"+index} value={value} onChange={()=> formData && setFormData({...formData,state:ActivityState.available})}>
                                    <IonLabel>{t(value)}</IonLabel>
                                </IonSegmentButton>)}
                        </IonSegment>
                    </IonItem>

                    <IonButton disabled={!edited} expand="block" onClick={guardarCambios}>
                        Guardar cambios
                    </IonButton>
                </IonList>
            </IonRow>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Actividad actualizada"
                message="Los cambios se han guardado correctamente."
                buttons={['OK']}
            />
        </Modal>
    )
}
