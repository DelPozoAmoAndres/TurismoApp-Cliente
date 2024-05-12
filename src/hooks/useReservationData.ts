import { useEffect, useState } from 'react';
import { getReservation } from '../apis/reservationApi';
import { Reservation } from '../models/Reservation';

export const useReservationData = (reservationId: string) => {
  const [reservation, setReservation] = useState<Reservation>();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getReservation(reservationId).then((reservation) => setReservation(reservation));
  }, [reservationId]);

  useEffect(() => {
    if (refresh) {
      getReservation(reservationId).then((reservation) => setReservation(reservation));
      setRefresh(false);
    }
  }, [refresh, reservationId]);
  return { reservation, setRefresh };
};
