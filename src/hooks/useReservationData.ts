import { useEffect, useState } from 'react';
import { getReservation } from '../apis/reservationApi';
import { Reservation } from '../models/Reservation';

export const useReservationData = (reservationId: string) => {
  const [reservation, setReservation] = useState<Reservation>();
  useEffect(() => {
    getReservation(reservationId).then((reservation) => setReservation(reservation));
  }, [reservationId]);
  return reservation;
};
