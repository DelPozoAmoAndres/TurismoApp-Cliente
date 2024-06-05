import React from 'react';
/* Ionic Components */
import { IonButton, IonCardContent, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '@models/Reservation';
/* Utils */
import { formatDate } from '@utils/Utils';
/* i18n */
import { useTranslation } from 'react-i18next';
import { cancelReservation } from '@apis/adminUserApi';

export const ReservationItemList: React.FC<{
  reservation: Reservation;
  last: boolean;
  id?: string;
  update?: () => void;
}> = ({ reservation, last, id, update }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <>
      <IonCardContent className="ion-no-margin" >
        <img
          width={100}
          height={80}
          alt={t('img.activity.alt') || ''}
          className="ion-margin-end img"
          style={{ borderRadius: 6 }}
          src={reservation.activity?.images[0]}
        />
        <IonList class="ion-no-margin ion-justify-content-between" style={{ "background": "var(--ion--color--background)" }}>
          <IonRow style={{ background: "var(--ion--color-background)" }} class="ion-justify-content-between ion-align-items-center">
            <IonLabel color={'primary'} class='ion-margin-end'>
              <strong>{reservation.activity?.name.toString()}</strong>
            </IonLabel>
            <IonText><strong style={{ fontSize: "20px" }}>{Number(reservation.price) + "€"}</strong></IonText>
          </IonRow>
          <IonRow style={{ background: "var(--ion--color-background)" }} class="ion-justify-content-between ion-align-items-center">
            <IonText class='ion-margin-end'>{formatDate(reservation.event?.date || null, true, true)}</IonText>
            <IonText class='ion-margin-end'>{reservation.numPersons} {t(reservation.numPersons > 1 ? "PEOPLE" : "PERSON")}</IonText>
            <IonText><strong>{t("RESERVATION.STATE." + reservation.state.toUpperCase())}</strong></IonText>
            {id && reservation.state === "success" && <IonButton color={'danger'} onClick={() => { reservation._id && cancelReservation(reservation._id).then(() => { update && update() }) }} expand="block">
              {t('ACTIONS.CANCEL')}
            </IonButton>}
            {!id && <IonButton size="small" routerLink={`/reservation/${reservation._id}`}>
              {t("ACTIONS.MANAGE")}
            </IonButton>}
          </IonRow>
        </IonList>
      </IonCardContent>
      {!last && <IonItemDivider style={{ "min-height": "2px", "background-color": "var(--ion-background-color)" }} />}
    </>
  );
};
