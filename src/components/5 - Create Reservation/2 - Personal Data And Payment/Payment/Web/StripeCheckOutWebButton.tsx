import React, { useRef, useState } from 'react';
/* Ionic Components */
import { IonButton } from '@ionic/react';
import { Modal } from '@shared/Modal';
import StripePaymentFormReact from './StripePaymentFormReact';
/* Stripe */
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
/* Apis */
import { intentPayment } from '@apis/reservationApi';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`); //Initializing Stripe with the publishable key

export const StripeCheckOutWebButton: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { reservation, registerReservation, setPaymentIntent } = useReservation(); //Context of reservation
  const [options, setOptions] = useState({
    //Options to configure the Stripe Element
    clientSecret: '',
    appearance: {
      /*...*/
    },
  });
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const createIntent = async () => {
    //Create a payment intent with the reservation data
    await intentPayment(reservation.price).then((data) => {
      setOptions({
        clientSecret: data.client_secret,
        appearance: {
          /*...*/
        },
      });
      setPaymentIntent(data);
    });
  };

  return (
    <>
      <IonButton expand="block" id="payment-modal" style={{ width: '100%' }} onClick={createIntent}>
        {t('continue')}
      </IonButton>
      <Modal id="modal-payment" modal={modal} trigger="payment-modal" title={t('payment.title')}>
        {options.clientSecret && (
          <div className="ion-margin">
            <Elements stripe={stripePromise} options={options}>
              <StripePaymentFormReact registerReservation={registerReservation} price={reservation.price} modal={modal} />
            </Elements>
          </div>
        )}
      </Modal>
    </>
  );
};
