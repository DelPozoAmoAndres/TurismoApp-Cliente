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
import { useScreen } from '@hooks/useScreen';

export const ActivityReviews: React.FC<{ activityId: string }> = ({ activityId }) => {
  const listOfComments = useReviewsData(activityId);
  const { isMobile } = useScreen();
  const { t } = useTranslation();
  return (
    listOfComments && listOfComments.length > 0 ?
      <div className={isMobile ? "ion-margin-start ion-margin-end ion-margin-bottom" : "ion-margin"} style={{ minWidth: isMobile ? "" : 300 }}>
        {!isMobile &&
          <>
            <IonLabel>
              <strong>{t('reviews.title')}</strong>
            </IonLabel>
            <div id="list-activity-review" className="ion-margin-vertical">
              {listOfComments?.slice(-6, listOfComments.length).map((comment, index) => (
                <div key={"comment" + index} style={{ width: "100%" }}>
                  <ReviewItem comment={comment} />
                </div>
              ))}
            </div>
          </>
        }
        {(listOfComments && listOfComments?.length > 6) && <>
          <IonButton class="outlined ion-no-margin" style={{ width: "100%", height: "40px" }} id="modal-reviews" expand='block'>{isMobile ? "Ver reviews" : "Ver más"}</IonButton>
          <ReviewsModal listOfComments={listOfComments} />
        </>}
      </div>
      : <></>
  );
};
