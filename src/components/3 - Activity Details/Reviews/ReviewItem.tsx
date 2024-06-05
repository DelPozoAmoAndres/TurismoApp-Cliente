import React, { useContext } from 'react';
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
import { deleteReview, reportReview } from '@apis/reviewApi';
/* i18n */
import { useTranslation } from 'react-i18next';
import { ReviewModal } from '@components/7 - Reservation Details/Add Review/ReviewModal';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const ReviewItem: React.FC<{ comment: Review, setRefresh: (arg: boolean) => void }> = ({ comment, setRefresh }) => {
    const { t } = useTranslation();
    const auth = useAuth();
    const { showNotification } = useContext(NotificationContext);
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
                        {t('ACTIVITY.REVIEWS.REPORT')}
                    </IonButton>
                }
                {auth.user && auth.user._id === comment.author && comment.activityId &&
                    <IonRow class="ion-justify-content-between ion-align-items-center ion-margin-top" style={{ width: "100%" }}>
                        <IonButton color={'danger'} onClick={() => comment._id && deleteReview(comment._id).then((res: boolean) => { if (res) { showNotification("Se ha eliminado correctamente"); setRefresh && setRefresh(true) } else showNotification("Ha habido un problema para eliminar la valoración"); })}>
                            {t('ACTIONS.DELETE')}
                        </IonButton>
                        <IonButton id={comment._id}>
                            {t('ACTIONS.EDIT')}
                        </IonButton>
                        <ReviewModal action={"edit"} activityId={comment.activityId} reviewData={comment} reservationId={comment.reservationId} setRefresh={setRefresh} />
                    </IonRow>
                }
            </IonRow>
        </IonCard >
    )
}
