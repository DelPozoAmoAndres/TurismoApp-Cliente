import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic Components */
import { IonButton, IonCard, IonRow } from '@ionic/react';
import { cancelReservation } from '@apis/reservationApi';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
import { useReservationData } from '@hooks/useReservationData';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { ReservationActivityData } from './ReservationActivityData';
import { ReservationData } from './ReservationData';
import LoadingPage from '@pages/LoadingPage';
import { AddReviewModal } from '@reservation-details/Add Review/AddReviewModal';
import BackHeaderAppLayout from '@components/app/layouts/BackHeaderAppLayout';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';

type ReservationDetailsProps = RouteComponentProps<{ id: string }>;

const ReservationDetailsPage: React.FC<ReservationDetailsProps> = ({ match }) => {
  const reservation = useReservationData(match.params.id); //Hook to have reservation data
  const { isMobile, browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

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
              {reservation?.state === 'completed' && <IonButton id="reviews-modal" expand="block">Añadir valoración</IonButton>}
              {reservation?.state === 'success' && (
                <IonButton color={'danger'} onClick={async () => await cancelReservation(match.params.id)} expand="block">
                  {t('cancel')}
                </IonButton>
              )}
              {reservation.activity?._id && <AddReviewModal activityId={reservation.activity?._id}/>}
            </div>
          </IonCard>
        </section>
      </IonRow>
  ) : (
    <LoadingPage />
  );

  return !browsingWeb ? <BackHeaderAppLayout>{content}</BackHeaderAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationDetailsPage;
