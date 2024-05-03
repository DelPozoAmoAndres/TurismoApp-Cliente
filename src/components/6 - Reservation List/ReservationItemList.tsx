import React from 'react';
/* Ionic Components */
import { IonButton, IonCardContent, IonCardSubtitle, IonItem, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '@models/Reservation';
/* Utils */
import { formatDate } from '@utils/Utils';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ReservationItemList: React.FC<{
  reservation: Reservation;
  last: boolean;
}> = ({ reservation, last }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <>
      <IonCardContent className="ion-no-margin">
        <img
          width={100}
          height={80}
          alt={t('img.activity.alt') || ''}
          className="ion-margin-end img"
          style={{ borderRadius: 6 }}
          src={reservation.activity?.images[0]}
        />
        <IonList class="ion-no-margin">
          <IonLabel color={'primary'}>
            <strong>{reservation.activity?.name.toString()}</strong>
          </IonLabel>
          <IonText>{formatDate(reservation.event?.date || null, true)}</IonText>
          <IonText>{reservation.numPersons.toString()} personas</IonText>
          <IonRow style={{ background: "var(--ion--color-background)" }} class="ion-justify-content-between ion-align-items-center">
            <IonText>Total: {Number(reservation.price)}</IonText>
            <IonCardSubtitle>{reservation.state}</IonCardSubtitle>
          </IonRow>
        </IonList>
      </IonCardContent>
      <IonItem lines={last ? 'none' : 'full'}>
        <IonButton expand="block" mode="ios" size="small" routerLink={`/reservation/${reservation._id}`}>
          Gestionar
        </IonButton>
      </IonItem>
    </>
  );
};
