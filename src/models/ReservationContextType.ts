import { PaymentIntent } from '@stripe/stripe-js';
import { Activity, Event } from './Activity';
import { Reservation } from './Reservation';

export interface ReservationContextType {
  step: number;
  activity: Activity | null;
  event: Event | null;
  paymentIntent: PaymentIntent | null;
  reservation: Reservation;
  setStep: (arg0: number) => void;
  setPersonalData: (arg0: NonNullable<unknown>) => void;
  setPaymentIntent: (arg0: PaymentIntent) => void;
  registerReservation: (arg0: string) => void;
}
