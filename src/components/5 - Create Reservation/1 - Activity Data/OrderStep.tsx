import React from 'react';
/* Ionic Components */
import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonLabel, IonRow, IonTitle } from '@ionic/react';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';

export const OrderStep: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { activity, event, setStep } = useReservation(); //Context of reservation
  return (
    <>
      <IonRow class="ion-margin-top">
        <IonTitle>
          <strong>{t('order')}</strong>
        </IonTitle>
      </IonRow>
      <IonRow class="ion-margin-top ion-justify-content-center">
        <img
          src={activity?.images[0]}
          width={500}
        />
      </IonRow>
      <IonCol class="ion-margin-top ion-justify-content-center">
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonCardTitle>
            <strong>{activity?.name}</strong>
          </IonCardTitle>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonCardSubtitle>{activity?.location}</IonCardSubtitle>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonLabel>{formatDate(event?.date || null, true)}</IonLabel>
        </IonRow>
        <IonRow class="ion-margin-top ion-justify-content-start">
          <IonLabel>
            <strong>{t('cancel.policy')}</strong>
          </IonLabel>
        </IonRow>
      </IonCol>
      <IonButton expand="block" onClick={() => setStep(2)}>
        {t('continue')}
      </IonButton>
    </>
  );
};
