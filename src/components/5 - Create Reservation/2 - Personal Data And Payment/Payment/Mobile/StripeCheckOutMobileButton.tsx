import React, { useState } from 'react';
/* Ionic Components */
import { IonButton } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
/* Apis */
import { intentPayment } from '@apis/reservationApi';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Components */
import Spinner from '@shared/Spinner';
import { useHistory } from 'react-router';

const StripeCheckoutMobileButton: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { reservation, registerReservation, paymentIntent, setPaymentIntent } = useReservation(); //Context of reservation

  if (Capacitor.isPluginAvailable('Stripe')) {
    Stripe.initialize({
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY + '',

    });
  }

  const handleCheckout = async () => {
    setLoading(true);

    try {
      let intent = paymentIntent;
      if (!intent) {
        intent = await intentPayment(reservation.price);
        intent && setPaymentIntent(intent);
      }
      console.log('PaymentIntent client secret:', intent?.client_secret);

      intent?.client_secret &&
        (await Stripe.createPaymentSheet({
          paymentIntentClientSecret: intent?.client_secret,
          merchantDisplayName: 'Astour',
        }));

      const result = await Stripe.presentPaymentSheet();
      switch (result.paymentResult) {
        case PaymentSheetEventsEnum.Completed:
          intent?.id && await registerReservation(intent?.id);
          history.replace('/thank-you')
          break;
        case PaymentSheetEventsEnum.Canceled:
          console.log('PaymentSheet canceled');
          break
      }

    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonButton onClick={handleCheckout} disabled={disabled || loading} style={{ width: "100%" }}>
      {loading ? <Spinner /> : t('continue')}
    </IonButton>
  );
};

export default StripeCheckoutMobileButton;
