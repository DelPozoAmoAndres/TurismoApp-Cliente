import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonIcon, IonImg, IonLabel, IonRow, IonText } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
/* Models */
import { Review } from '@models/Activity';
import { Role } from '@models/User';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Contexts */
import { useAuth } from '@contexts/AuthContexts';
/* Styles */
import "./ReviewItem.css"
/* Apis */
import { deleteReview, reportReview } from '@apis/reviewApi';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ReviewItem: React.FC<{ comment: Review }> = ({ comment }) => {
    const { t } = useTranslation();
    const auth = useAuth();
    return (
        <IonCard id="activity-review" class="ion-no-margin">
            <section className="ion-margin-bottom">
                <IonImg src={comment.authorImage} />
                <section>
                    <IonLabel>
                        <strong>{comment.authorName}</strong>
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
                    <IonButton color={'danger'} expand="block" onClick={()=>comment._id && reportReview(comment._id)}>
                        {t('report')}
                    </IonButton>
                }
                {auth.user?._id === comment.author &&
                    <>
                        <IonButton color={'danger'} onClick={()=>comment._id && deleteReview(comment._id)}>
                            {t('delete')}
                        </IonButton>
                        <IonButton >
                            {t('edit')}
                        </IonButton>
                    </>
                }
            </IonRow>
        </IonCard >
    )
}
