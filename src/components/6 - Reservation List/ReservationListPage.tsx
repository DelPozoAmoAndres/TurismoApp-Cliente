import React from 'react';
/* Ionic Components */
import { IonCard, IonContent, IonIcon, IonLabel, IonList, IonRow } from '@ionic/react';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
import { useReservationList } from '@hooks/useReservationList';
/* Components */
import { AppPage } from '@pages/AppPage';
import { ReservationItemList } from '@reservation-list/ReservationItemList';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Style */
import "./ReservationList.css";
/* i18n */
import { useTranslation } from 'react-i18next';
import { ellipsisHorizontal } from 'ionicons/icons';

const ReservationListPage: React.FC = () => {
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const reservationsGroup = useReservationList(); //Hooks to have all the reservation data
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const content = (
    <IonContent>
      <IonList mode="ios" id="reservation-list">
        <IonRow class="ion-justify-content-center ion-margin-top">
          <IonLabel class="ion-text-center">
            <h1><strong>Reservas</strong></h1>
          </IonLabel>
        </IonRow>
        {reservationsGroup.length === 0 &&
          <p className='ion-text-center ion-margin-top'>
            <IonLabel>
              {t('reservations.empty')}
            </IonLabel>
          </p>}
        {reservationsGroup.map((reservationGroup, index) => (
            <div key={'reservationsGroup' + index} className="ion-margin-bottom">
              <IonRow class="ion-padding-start ion-padding-vertical">
                <IonLabel>
                  <strong>{formatDate(reservationGroup.dateFrom)} <IonIcon icon={ellipsisHorizontal} style={{"opacity":0.5, "margin-bottom":"-2.5px"}}/> {formatDate(reservationGroup.dateTo)}</strong>
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
    </IonContent>
  );

  return !browsingWeb ? <AppPage>{content}</AppPage> : <>{content}</>;
};

export default ReservationListPage;
