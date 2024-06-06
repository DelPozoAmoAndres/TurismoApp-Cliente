import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic Components */
import { IonAlert, IonButton, IonCard, IonCardHeader, IonCardTitle, IonImg, IonRow, IonText } from '@ionic/react';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
import { useReservationData } from '@hooks/useReservationData';
import { useScreen } from '@hooks/useScreen';
/* Styles */
import './ReservationDetailsPage.css';
/* Components */
import { ReservationInstructionsData } from './ReservationInstructionsData';
import { ReservationData } from './ReservationData';
import LoadingPage from '@pages/LoadingPage';
import { ReviewModal } from '@components/7 - Reservation Details/Add Review/ReviewModal';
import BackHeaderAppLayout from '@components/app/layouts/BackHeaderAppLayout';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';
import { Review } from '@models/Activity';
import { getReviewFromReservation } from '@apis/reviewApi';
import { ReviewItem } from '@components/3 - Activity Details/Reviews/ReviewItem';
import { cancelReservation } from '@apis/reservationApi';

type ReservationDetailsProps = RouteComponentProps<{ id: string }>;

const ReservationDetailsPage: React.FC<ReservationDetailsProps> = ({ match }) => {
  const { reservation, setRefresh } = useReservationData(match.params.id); //Hook to have reservation data
  const [review, setReview] = useState<Review | null>(null);
  const { isMobile, browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false); //State to show the alert to delete the account
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const getReview = async () => {
    const review = await getReviewFromReservation(match.params.id);
    setReview(review);
  }

  useEffect(() => {
    getReview();
    // eslint-disable-next-line
  }, [reservation]);

  const content = reservation ? (
    <div className="limits-content">
      <IonRow id="reservation-detail" class="ion-justify-content-between ion-margin-top" style={{ width: "100%" }}>
        <section className={isMobile ? 'ion-margin-horizontal' : ''} style={{ width: isMobile ? '93%' : '70%' }}>
          <div className='ion-margin'>
            {reservation.paymentId && <IonRow class="ion-margin-top ion-justify-content-between ion-align-items-center" style={{ gap: "20px" }}>
              <IonCardHeader class='ion-no-padding'>
                <IonCardTitle><strong>{t('RESERVATION.ID')}</strong></IonCardTitle>
              </IonCardHeader>
              <IonText color={'dark'}>{reservation.paymentId.split('_')[1]}</IonText>
            </IonRow>}
          </div>
        </section>
        <section className={isMobile ? 'ion-margin-horizontal' : ''} style={{ width: isMobile ? '100%' : '70%' }}>
          <IonCard>
            <ReservationData reservation={reservation} />
            <IonRow class="ion-justify-content-between ion-align-items-center ion-margin-top" style={{ gap: "20px" }}>
              <IonButton routerLink={'/activity/' + reservation?.activity?._id} expand="block">
                {t('ACTIVITY.SHOW.INFO')}
              </IonButton>
              {reservation?.state === 'completed' && review === null && reservation.activity?._id &&
                <>
                  <IonButton id="add" expand="block" className='outlined'>{t('ACTIVITY.REVIEWS.ADD')}</IonButton>
                  <ReviewModal action={"add"} activityId={reservation.activity?._id} reservationId={match.params.id} setRefresh={setRefresh} />
                </>}
              {reservation?.state === 'success' &&
                (<IonButton color={'danger'} onClick={async () => setShowDeleteAlert(true)} expand="block">
                  {t('ACTIONS.CANCEL')}
                </IonButton>)}
            </IonRow>
          </IonCard>
          {reservation?.state === 'completed' && review !== null &&
            <section style={{ marginInline: "5%" }}>
              <h3>{t('ACTIVITY.REVIEWS.TITLE')}</h3>
              <ReviewItem comment={review} setRefresh={setRefresh} />
            </section>}
        </section>
        <IonCard class="img" style={{ width: "26%", height: "310px" }}>
          <IonImg
            src={reservation?.activity?.images[0]}
            style={{ "width": "100%", "height": "100%", "object-fit": "cover", "display": "flex", "aspect-ratio": "4 / 3", "object-position": "center" }}
          />
        </IonCard>
      </IonRow>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={t('RESERVATION.CANCEL.TITLE') || ""}
        message={t('RESERVATION.CANCEL.MESSAGE') || ""}
        buttons={[
          {
            text: t('RESERVATION.CANCEL.OPTION.NO'),
            role: 'cancel',
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: t('RESERVATION.CANCEL.OPTION.YES'),
            handler: async () => { cancelReservation(match.params.id).then(() => setRefresh(true)); },
          },
        ]}
      />
      <ReservationInstructionsData />
    </div>
  ) : (
    <LoadingPage />
  );

  return !browsingWeb ? <BackHeaderAppLayout>{content}</BackHeaderAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationDetailsPage;
