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
import { Capacitor } from '@capacitor/core';
import { Review } from '@models/Activity';

export const ActivityReviews: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { listOfComments, setRefresh } = useReviewsData(activityId);
  const { isMobile } = useScreen();
  const { t } = useTranslation();
  return (
    listOfComments && listOfComments.length > 0 ?
      <div className={isMobile ? "ion-margin-start ion-margin-end ion-margin-bottom" : "ion-margin"} style={{ minWidth: isMobile ? "" : 300, width: Capacitor.isNativePlatform() ? "100%" : "" }}>
        {!isMobile &&
          <>
            <IonLabel>
              <strong>{t('ACTIVITY.REVIEWS.TITLE')}</strong>
            </IonLabel>
            <div id="list-activity-review" className="ion-margin-vertical">
              {listOfComments?.slice(-5, listOfComments.length).map((comment: Review, index: number) => (
                <div key={"comment" + index} style={{ width: "100%" }}>
                  <ReviewItem comment={comment} setRefresh={setRefresh} />
                </div>
              ))}
            </div>
          </>
        }
        {(listOfComments && listOfComments?.length > 6 || listOfComments && isMobile) && <>
          <IonButton class="outlined ion-no-margin" style={{ width: "100%", height: "40px" }} id="modal-reviews" expand='block'>{t(isMobile ? "ACTIVITY.SHOW.REVIEWS" : "SHOW.MORE")}</IonButton>
          <ReviewsModal listOfComments={listOfComments} setRefresh={setRefresh} />
        </>}
      </div>
      : <></>
  );
};
