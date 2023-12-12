import React from 'react';
/* Ionic components */
import { IonButton, IonLabel } from '@ionic/react';
/* Components */
import { ReviewsModal } from '@activity-details/Reviews/ReviewsModal';
import { ReviewItem } from '@activity-details/Reviews/ReviewItem';
/* Hooks */
import { useReviewsData } from '@hooks/useReviewsData';
/* Style */
import './ActivityReviews.css';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityReviews: React.FC<{activityId:string}> = ({ activityId }) => {
  const listOfComments = useReviewsData(activityId);
  const { t } = useTranslation();
  return (
    listOfComments && listOfComments.length > 0 ?
    <div className="ion-margin" style={{maxWidth : 600,width:"100%"}}>
      <IonLabel>
        <strong>{t('reviews.title')}</strong>
      </IonLabel>
      <div id="list-activity-review" className="ion-margin-vertical">
        {listOfComments?.slice(-10, listOfComments.length).map((comment, index) => (
          <div key={"comment" + index} style={{width:"100%"}}>
            <ReviewItem comment={comment} />
          </div>
        ))}
      </div>
      {listOfComments && listOfComments?.length>10 && <>
        <IonButton id="modal-reviews" expand='block'>Ver más</IonButton>
        <ReviewsModal listOfComments={listOfComments} />
      </>}
    </div>
    : <></>
  );
};
