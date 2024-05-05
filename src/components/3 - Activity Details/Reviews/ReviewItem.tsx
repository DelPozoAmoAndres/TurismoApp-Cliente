import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonIcon, IonLabel, IonRow, IonText } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
/* Models */
import { Review } from '@models/Activity';
import { Role } from '@models/User';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Contexts */
import { useAuth } from '@contexts/AuthContexts';
/* Styles */
import "./ReviewItem.css";
/* Apis */
import { reportReview } from '@apis/reviewApi';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ReviewItem: React.FC<{ comment: Review }> = ({ comment }) => {
    const { t } = useTranslation();
    const auth = useAuth();
    return (
        <IonCard id="activity-review" class="ion-no-margin" style={{ width: "100%" }}>
            <section className="ion-margin-bottom">
                <img src={comment.authorImage || "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"} width={40} />
                <section>
                    <IonLabel>
                        <strong>{comment.authorName || "Anónimo"}</strong>
                    </IonLabel>
                    <section>
                        <IonLabel>{formatDate(comment.date)}</IonLabel>
                        <IonLabel>
                            {comment.score}/5 <IonIcon icon={starOutline} />
                        </IonLabel>
                    </section>
                </section>
            </section>
            <IonText>{comment.comment}</IonText>
            <IonRow class="ion-justify-content-between">
                {auth.user?.role === Role.administrador && auth.user?._id !== comment.author &&
                    <IonButton color={'danger'} expand="block" onClick={() => comment._id && reportReview(comment._id)}>
                        {t('report')}
                    </IonButton>
                }
                {/* {auth.user?._id === comment.author && comment.activityId &&
                    <>
                        <IonButton color={'danger'} onClick={()=>comment._id && deleteReview(comment._id)}>
                            {t('delete')}
                        </IonButton>
                        <IonButton id={comment._id}>
                            {t('edit')}
                        </IonButton>
                        <ReviewModal action={"edit"} activityId={comment.activityId} reviewData={comment} reservationId={comment.reservationId} />
                    </>
                } */}
            </IonRow>
        </IonCard >
    )
}
