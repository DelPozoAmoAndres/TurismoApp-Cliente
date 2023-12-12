import React, { useState, useEffect } from 'react';
/* Ionic Components */
import { IonButton, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { checkmarkCircleOutline, refreshOutline, warningOutline } from 'ionicons/icons';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Apis */
import { verifyPayment } from '@apis/reservationApi';
import { ReservationState } from '@models/Reservation';

export const ReservationStatusPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [icon, setIcon] = useState<React.ReactNode>();
  const [canGoBack, setCanGoBack] = useState(true);
  const { paymentIntent, setStep } = useReservation(); //Context of reservation
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  useEffect(() => {
    paymentIntent?.id &&
      verifyPayment(paymentIntent?.id).then((status: ReservationState) => {
        switch (status) {
          case 'success':
            setIcon(<IonIcon class="ion-text-center" style={{ fontSize: '128px' }} icon={checkmarkCircleOutline} />);
            setMessage(t('payment.success'));
            setCanGoBack(false);
            break;

          case 'pending':
            setMessage(t('payment.pending'));
            setIcon(<IonIcon size="200px" icon={refreshOutline} />);
            setCanGoBack(false);
            break;

          case 'failure':
            setIcon(<IonIcon size="200px" icon={warningOutline} />);
            setMessage(t('payment.failure'));
            break;

          default:
            setIcon(<IonIcon size="200px" icon={warningOutline} />);
            setMessage(t('something.wrong'));
            break;
        }
      });
  }, [paymentIntent, t]);

  return (
    <IonGrid class="ion-padding-horizontal" style={{ maxWidth: '500px' }}>
      <IonRow class="ion-justify-content-center">{icon}</IonRow>
      <IonRow class="ion-justify-content-center">{message}</IonRow>
      {canGoBack && (
        <IonButton expand="block" onClick={() => setStep(3)}>
          {t('try.again')}
        </IonButton>
      )}
      <IonRow class="ion-justify-content-center">
        <p>{t('reservation.status.check.reservations')}</p>
      </IonRow>
      <IonButton expand="block" routerLink="/reservas">
        {t('go.to.reservations')}
      </IonButton>
      <IonButton expand="block" routerLink="/home">
        {t('go.to.home')}
      </IonButton>
    </IonGrid>
  );
};
