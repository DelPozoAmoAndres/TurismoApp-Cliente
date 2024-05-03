import React, { createContext, useContext, useEffect, useState } from 'react';
import { ReservationContextType } from '@models/ReservationContextType';
import { Activity, Event } from '@models/Activity';
import { Reservation } from '@models/Reservation';
import { getActivity } from '@apis/activityApi';
import { useLocation } from 'react-router';
import { createReservation } from '@apis/reservationApi';
import { PaymentIntent } from '@stripe/stripe-js';

export const ReservationContext = createContext<ReservationContextType>({
  step: 1,
  activity: null,
  event: null,
  paymentIntent: null,
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
  const location = useLocation();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [step, setStep] = useState(1);
  const [activity, setActivity] = useState<Activity | null>(null);
  const event = location.state as Event;
  const [reservation, setReservation] = useState<Reservation>({
    email: '',
    eventId: event?._id || '',
    name: '',
    numPersons: 1,
    state: 'pending',
    telephone: 0,
    price: event?.price,
    date: new Date(),
  });

  useEffect(() => {
    getActivity(props.activityId).then((a: Activity) => setActivity(a));
  }, [props.activityId]);

  const setPersonalData = (data: Record<string, unknown>) => {
    const keyList = Object.keys(data);
    let reservationCopy = { ...reservation };
    keyList.forEach((key: string) => {
      reservationCopy = { ...reservationCopy, [key]: data[key] };
      if (key === 'numPersons' && reservationCopy.numPersons >= 1) reservationCopy.price = Number(event?.price) * reservationCopy.numPersons;
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
        activity,
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
