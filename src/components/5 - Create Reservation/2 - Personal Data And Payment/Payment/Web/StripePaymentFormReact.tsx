import React, { useState } from 'react';
/* Ionic Components */
import { IonButton } from '@ionic/react';
/* Stripe */
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';

const CheckoutFormReact: React.FC<{
  price: number;
  modal: React.RefObject<HTMLIonModalElement>;
  registerReservation: (arg0: string) => void;
}> = ({ price, modal, registerReservation }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { activity, setStep, paymentIntent } = useReservation(); //Context of reservation
  const stripe = useStripe(); // Hook that returns a reference to the Stripe instance passed to the Elements provider
  const elements = useElements(); //Hook to pass the payment information collected by the Payment Element to the Stripe API
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //Pressing the submit button try to confirm the payment
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_URL + '/activity/' + activity?._id + '/reservar',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Error');
    } else {
      modal.current?.dismiss();
      paymentIntent?.id && (await registerReservation(paymentIntent.id)); //Register the new reservation
    }
    if (error?.type != "validation_error") {
      setStep(3);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ion-align-items-center">
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <IonButton id="paymentButton" type="submit" expand="block" style={{ "display": "none" }} disabled={!stripe}>
        {t('pay') + ' ' + price + '€'}
      </IonButton>
    </form>
  );
};

export default CheckoutFormReact;
