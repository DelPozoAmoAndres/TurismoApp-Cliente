import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReservationContextType } from '@models/ReservationContextType';
import { Activity, Event } from '@models/Activity';
import { Reservation } from '@models/Reservation';
import { getActivity } from '@apis/activityApi';
import { useLocation } from 'react-router';
import { createReservation, intentPayment } from '@apis/reservationApi';
import { PaymentIntent } from '@stripe/stripe-js';
import { emailValidation, lengthValidation, numberMoreThanValidation, telephoneValidation } from '@utils/Validations';

export const ReservationContext = createContext<ReservationContextType>({
  step: 1,
  activity: null,
  event: null,
  paymentIntent: null,
  isFormValid: false,
  reservation: {
    email: '',
    eventId: '',
    name: '',
    numPersons: 0,
    state: 'pending',
    telephone: 0,
    price: 0,
    date: new Date(),
  },
  clientSecret: '',
  privacyPolicy: false,
  setClientSecret: (arg) => {
    console.log(arg);
  },
  setPrivacyPolicy: (arg) => {
    console.log(arg);
  },
  setStep: (arg) => {
    console.log(arg);
  },
  setPaymentIntent: (arg) => {
    console.log(arg);
  },
  setPersonalData: (arg) => {
    console.log(arg);
  },
  registerReservation: (arg) => {
    console.log(arg);
  },
});

export const useReservation = () => useContext(ReservationContext);

interface Props {
  children: React.ReactNode;
  activityId: string;
}
const ReservationProvider: React.FC<Props> = (props) => {
  const location = useLocation<{ event: Event }>();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [step, setStep] = useState(2);
  const [activity, setActivity] = useState<Activity | null>(null);
  const event = location.state && location.state.event ? location.state.event : null;
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState(false);
  const [reservation, setReservation] = useState<Reservation>({
    email: '',
    eventId: event?._id || '',
    name: '',
    numPersons: 1,
    state: 'pending',
    telephone: 0,
    price: event?.price || 0,
    date: new Date(),
  });
  const [clientSecret, setClientSecret] = useState('');

  const createIntent = async () => {
    await intentPayment(reservation.price).then((data) => {
      setClientSecret(data.client_secret);
      setPaymentIntent(data);
    });
  };

  useEffect(() => {
    createIntent();
    //eslint-disable-next-line
  }, [reservation.numPersons]);

  useEffect(() => {
    getActivity(props.activityId).then((a: Activity) => setActivity(a));
    //eslint-disable-next-line
  }, [props.activityId]);


  useEffect(() => {
    setIsFormValid(lengthValidation(8, reservation.name)
      && emailValidation(reservation.email)
      && (reservation.telephone ? telephoneValidation(String(reservation.telephone)) : true)
      && numberMoreThanValidation(reservation.numPersons, 0));
    //eslint-disable-next-line
  }, [reservation]);

  const setPersonalData = (data: Record<string, unknown>) => {
    const keyList = Object.keys(data);
    let reservationCopy = { ...reservation };
    keyList.forEach((key: string) => {
      reservationCopy = { ...reservationCopy, [key]: data[key] };
      if (key === 'numPersons' && reservationCopy.numPersons >= 1) reservationCopy.price = Number(event?.price) * reservationCopy.numPersons;
      if (key === 'telephone' && String(reservationCopy.telephone) === '') reservationCopy.telephone = 0;
    });
    console.log(reservationCopy);
    setReservation(reservationCopy);
  };

  const registerReservation = async (intentId: string) => {
    return await createReservation(reservation, intentId);
  };


  return (
    <ReservationContext.Provider
      value={{
        step,
        setStep,
        setPersonalData,
        setPaymentIntent,
        registerReservation,
        isFormValid,
        privacyPolicy,
        setPrivacyPolicy,
        activity,
        clientSecret,
        setClientSecret,
        event,
        reservation,
        paymentIntent,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
