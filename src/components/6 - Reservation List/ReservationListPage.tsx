import React from 'react';
/* Ionic Components */
import { IonCard, IonIcon, IonLabel, IonList, IonRow } from '@ionic/react';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
import { useReservationList } from '@hooks/useReservationList';
/* Components */
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import { ReservationItemList } from '@reservation-list/ReservationItemList';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Style */
import "./ReservationList.css";
/* i18n */
import { useTranslation } from 'react-i18next';
import { ellipsisHorizontal } from 'ionicons/icons';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';

const ReservationListPage: React.FC = () => {
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const reservationsGroup = useReservationList(); //Hooks to have all the reservation data
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const content = (
    <IonList mode="ios" id="reservation-list">
      <IonRow class="ion-justify-content-center ion-margin-top">
        <IonLabel class="ion-text-center">
          <h1><strong>{t('RESERVATION.TITLE')}</strong></h1>
        </IonLabel>
      </IonRow>
      {reservationsGroup.length === 0 &&
        <p className='ion-text-center ion-margin-top'>
          <IonLabel>
            {t('RESERVATION.LIST_EMPTY')}
          </IonLabel>
        </p>}
      {reservationsGroup.map((reservationGroup, index) => (
        <div key={'reservationsGroup' + index} className="ion-margin-bottom">
          <IonRow class="ion-padding-start ion-padding-vertical">
            <IonLabel>
              <strong>{formatDate(reservationGroup.dateFrom)}</strong> {reservationGroup.dateFrom.toString().split("T")[0] !== reservationGroup.dateTo.toString().split("T")[0] && <strong><IonIcon icon={ellipsisHorizontal} style={{ "opacity": 0.5, "margin-bottom": "-2.5px" }} /> {formatDate(reservationGroup.dateTo)}</strong>}
            </IonLabel>
          </IonRow>
          <IonCard>
            {reservationGroup.reservations.map((reservation, index, array) => (
              <div key={'reservation' + index}>
                <ReservationItemList reservation={reservation} last={index === array.length - 1} />
              </div>
            ))}
          </IonCard>
        </div>
      ))}
    </IonList>
  );

  return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationListPage;
