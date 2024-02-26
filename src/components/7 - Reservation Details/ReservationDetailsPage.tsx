import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic Components */
import { IonButton, IonCard, IonRow } from '@ionic/react';
import { cancelReservation, getReservation } from '@apis/reservationApi';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
import { useReservationData } from '@hooks/useReservationData';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { ReservationActivityData } from './ReservationActivityData';
import { ReservationData } from './ReservationData';
import LoadingPage from '@pages/LoadingPage';
import { ReviewModal } from '@components/7 - Reservation Details/Add Review/ReviewModal';
import BackHeaderAppLayout from '@components/app/layouts/BackHeaderAppLayout';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';
import { Review } from '@models/Activity';
import { getReviewFromReservation } from '@apis/reviewApi';
import { ReviewItem } from '@components/3 - Activity Details/Reviews/ReviewItem';

type ReservationDetailsProps = RouteComponentProps<{ id: string }>;

const ReservationDetailsPage: React.FC<ReservationDetailsProps> = ({ match }) => {
  const reservation = useReservationData(match.params.id); //Hook to have reservation data
  const [review,setReview] = useState<Review|null>(null);
  const { isMobile, browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const getReview = async () => {
    const review = await getReviewFromReservation(match.params.id);
    if(review) setReview(review);
  }

  useEffect(() => {
    getReview();
  }, [reservation]);
  
  const content = reservation ? (
    <IonRow class="ion-justify-content-center ion-margin-top">
      <ReservationActivityData reservation={reservation} />
      <section className={isMobile ? 'ion-margin-horizontal' : ''} style={{ width: isMobile ? '100%' : 'auto' }}>
        <IonCard>
          <ReservationData reservation={reservation} />
          <div className="ion-margin">
            <IonButton routerLink={'/activity/' + reservation?.activity?._id} expand="block">
              Ver información de la actividad
            </IonButton>
            {reservation?.state === 'completed' && review===null &&  reservation.activity?._id &&
              <>
              <IonButton id="add" expand="block">Añadir valoración</IonButton>
              <ReviewModal action={"add"} activityId={reservation.activity?._id} reservationId={match.params.id} />
              </>}
            {reservation?.state === 'success' &&
              (<IonButton color={'danger'} onClick={async () => await cancelReservation(match.params.id)} expand="block">
                {t('cancel')}
              </IonButton>)}
          </div>
        </IonCard>
        {reservation?.state === 'completed' && review!==null && 
          <section style={{"marginInline": 10}}>
            <h3>Valoración</h3>
            <ReviewItem comment={review} />
          </section>}
      </section>
    </IonRow>
  ) : (
    <LoadingPage />
  );

  return !browsingWeb ? <BackHeaderAppLayout>{content}</BackHeaderAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationDetailsPage;
