import React from 'react';
/* Ionic Components */
import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonItemDivider, IonLabel, IonRow, IonTitle } from '@ionic/react';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';
import StripeCheckoutMobileButton from '../2 - Personal Data And Payment/Payment/Mobile/StripeCheckOutMobileButton';
import { Capacitor } from '@capacitor/core';
import { useScreen } from '@hooks/useScreen';

export const OrderStep: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { activity, event, reservation, isFormValid, privacyPolicy } = useReservation(); //Context of reservation
  const { isMobile } = useScreen();

  const pay = () => {
    document.getElementById('paymentButton')?.click();
  }

  return (
    <section className={isMobile ? 'ion-padding ion-margin-bottom' : 'ion-padding ion-margin-top'} style={{ background: "var(--ion--color--background)", borderRadius: 20 }}>
      <IonRow class="ion-margin-top">
        <IonTitle class="ion-no-padding">
          <strong>{t('summary')}</strong>
        </IonTitle>
      </IonRow>
      {!isMobile && <IonRow class="ion-margin-top ion-justify-content-center">
        <img
          src={activity?.images[0]}
          width={300}
        />
      </IonRow>}
      <IonCol class="ion-margin-top ion-justify-content-center">
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonCardTitle color={'primary'}>
            <strong>{activity?.name}</strong>
          </IonCardTitle>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonCardSubtitle color={'tertiary'}>{activity?.location}</IonCardSubtitle>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonLabel>{formatDate(event?.date || null, true)}</IonLabel>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonLabel>Actividad en {event?.language}</IonLabel>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-between">
          <IonLabel>{reservation.numPersons > 0 ? reservation.numPersons : 1} Personas</IonLabel>
          <IonLabel>{reservation.numPersons > 0 ? reservation.numPersons : 1}x{event?.price}€</IonLabel>
        </IonRow>
        <IonItemDivider style={{ "border-bottom": "2px solid var(--ion-color-primary)", "--background": "var(--ion--color--background)" }} />
        <IonRow class='ion-margin-top ion-justify-content-between' style={{ fontSize: 18 }}>
          <IonLabel>{t('total.price')}:</IonLabel>
          <IonLabel><strong>{reservation.price + '€'}</strong></IonLabel>
        </IonRow>

      </IonCol>
      <IonRow>
        {Capacitor.isNativePlatform() ?
          <StripeCheckoutMobileButton disabled={!privacyPolicy || !isFormValid} />
          : <IonButton onClick={pay} disabled={!privacyPolicy || !isFormValid} expand="block" style={{ "width": "100%" }}>
            {t('pay') + ' ' + reservation.price + '€'}
          </IonButton>}
      </IonRow>
      <IonRow class='ion-margin-top'>
        <strong>{t('cancel.policy')}</strong>
      </IonRow>
    </section>
  );
};
