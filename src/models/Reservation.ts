import { Activity, Event } from './Activity';

export interface Reservation {
  numPersons: number;
  price: number;
  eventId: string;
  event?: Event;
  activity?: Activity;
  name: string;
  email: string;
  telephone?: number;
  state: ReservationState;
  _id?: string;
  paymentId?: string;
  date:Date;
}

export interface ReservationGroup {
  dateFrom: Date;
  dateTo: Date;
  reservations: Reservation[];
}

export type ReservationState = 'pending' | 'success' | 'completed' | 'failure' | 'canceled';
