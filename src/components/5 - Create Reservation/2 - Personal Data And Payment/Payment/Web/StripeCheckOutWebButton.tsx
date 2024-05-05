import React, { useRef } from 'react';
/* Ionic Components */
import StripePaymentFormReact from './StripePaymentFormReact';
/* Stripe */
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
/* Apis */
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* Styles */
import './StripeCheckOutWebButton.css';
/* i18n */
import { useTheme } from '@hooks/useTheme';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`); //Initializing Stripe with the publishable key

export const StripeCheckOutWebButton: React.FC = () => {
  const { reservation, registerReservation, clientSecret } = useReservation(); //Context of reservation
  const { theme } = useTheme();
  const appearance = {
    rules: {
      '.Label': {
        color: theme === 'dark' ? '#fff' : '#000',
      },
    },
    variables: {
      colorPrimary: '#209059',
    },
  };
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it

  return (
    <>
      {/* <IonButton expand="block" id="payment-modal" style={{ width: '100%' }} onClick={createIntent} disabled={disabled}>
        {t('continue')}
      </IonButton>
      <Modal id="modal-payment" modal={modal} trigger="payment-modal" title={t('payment.title')}>
        {options.clientSecret && ( */}
      {clientSecret && <div className="ion-margin ion-padding-bottom">
        <Elements stripe={stripePromise} options={{
          clientSecret: clientSecret, appearance: { ...appearance, theme: 'flat' }
        }}>
          <StripePaymentFormReact registerReservation={registerReservation} price={reservation.price} modal={modal} />
        </Elements>
      </div>}
      {/* )}
      </Modal > */}
    </>
  );
};
