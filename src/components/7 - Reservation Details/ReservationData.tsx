import React from 'react';
/* Ionic Components */
import { IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItemDivider, IonRow, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '@models/Reservation';
import { useTranslation } from 'react-i18next';
import { formatDate, formatDateToTime } from '@utils/Utils';
import { useScreen } from '@hooks/useScreen';

export const ReservationData: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  const { t } = useTranslation();
  const { isMobile } = useScreen();
  return (
    <>
      <IonCardHeader class='ion-no-padding'>
        <IonRow class='ion-justify-content-between ion-align-items-center ion-margin-bottom'>
          <IonCardTitle><strong>{reservation?.activity?.name}</strong></IonCardTitle>
          <IonText color={reservation.state === "canceled" ? "danger" : "primary"} ><strong>{t('RESERVATION.STATE.' + reservation?.state.toUpperCase()).toUpperCase()}</strong></IonText>
        </IonRow>
      </IonCardHeader>
      <IonCardContent class="ion-no-padding">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", width: isMobile ? "100%" : "45%" }}>
            <IonCardSubtitle color='primary' className='ion-no-margin'>{t("RESERVATION.DETAILS.TITLE")}</IonCardSubtitle>
            <IonText color={'dark'} class='ion-margin-top' style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <IonText color={'dark'} >{formatDate(reservation?.event?.date || new Date())}</IonText>
              <IonText color={'dark'} >{formatDateToTime(reservation?.event?.date || new Date())}</IonText>
            </IonText>
            <IonText color={'dark'} class='ion-margin-top' style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <IonText color={'dark'} >{t('LANGUAGE.' + String(reservation?.event?.language).toUpperCase())}</IonText>
              <IonText color={'dark'}>{String(reservation?.numPersons) + " " + t(reservation.numPersons > 1 ? 'PEOPLE' : 'PERSON')}</IonText>
            </IonText>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: isMobile ? "100%" : "45%" }}>
            <IonCardSubtitle color='primary' className='ion-no-margin'>{t("RESERVATION.DATA_CONTACT.TITLE")}</IonCardSubtitle>
            <IonText class='ion-margin-top' color={'dark'} >{reservation.name}</IonText>
            <IonText color={'dark'} class='ion-margin-top' style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <IonText color={'dark'} >{reservation.email}</IonText>
              <IonText color={'dark'} >{reservation.telephone}</IonText>
            </IonText>
          </div>
        </div>
        <IonItemDivider class='ion-margin-bottom' style={{ "background-color": "var(--ion--color--background)" }}></IonItemDivider>
        <IonText color={'dark'} class='ion-margin-top' style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: 20 }}>
          <IonText color={'dark'} >{t('RESERVATION.TOTAL_PRICE')}</IonText>
          <IonText color={'dark'} ><strong>{String(reservation?.price)}€</strong></IonText>
        </IonText>
      </IonCardContent >
    </>
  );
};
