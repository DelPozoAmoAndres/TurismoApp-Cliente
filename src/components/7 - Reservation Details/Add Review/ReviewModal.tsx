import React, { useRef, useState } from 'react';
import { Modal } from '@shared/Modal';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonRange, IonRow, IonTextarea } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Review } from '@models/Activity';
import { createReview, editReview } from '@apis/reviewApi';
import { useEdit } from '@hooks/useEdit';
import "./ReviewModal.css";
import { starOutline } from 'ionicons/icons';

export const ReviewModal: React.FC<{ activityId: string, reviewData?:Review, action: "add" | "edit", reservationId:string }> = ({ activityId,reviewData,reservationId,action }) => {
    const { t } = useTranslation();
    const modal = useRef<HTMLIonModalElement>(null);
    const [review] = useState<Review>(reviewData || new Review(activityId,reservationId));
    const { formData, setFormData, guardarCambios} = useEdit(review, action=="add"?createReview:editReview);
    return (
        <Modal id="modal-review" trigger={review._id || "add"}  tittle={t("valoration.add.title")} modal={modal} >
            <IonRow class=' ion-padding-horizontal ion-align-items-center ion-justify-content-center'>
                <IonIcon icon={starOutline} />
                <IonList>
                    <div className='ion-margin'>
                        <IonRow>
                            <IonLabel>
                                <strong>{t('score.title')}</strong>
                            </IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonRange
                                min={0}
                                max={5}
                                value={formData?.score}
                                snaps={true}
                                pin={true}
                                ticks={true}
                                onIonChange={(e)=> formData && setFormData({...formData, score:Number(e.detail.value)})}
                            ></IonRange>
                        </IonRow>
                    </div>
                    <IonItem>
                        <IonTextarea
                            value={formData?.comment}
                            rows={5}
                            label="Comentario (opcional)"
                            labelPlacement="stacked"
                            onIonInput={(e)=> formData && setFormData({...formData, comment:String(e.detail.value)})}
                        ></IonTextarea>
                    </IonItem>
                    <IonButton  expand="block" onClick={guardarCambios}>
                        Guardar cambios
                    </IonButton>
                </IonList>
            </IonRow>
        </Modal>
    )
}
