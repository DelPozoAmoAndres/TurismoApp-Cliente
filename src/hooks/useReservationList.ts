import { useState, useEffect } from 'react';
import { ReservationGroup } from '../models/Reservation';
import { getReservationList } from '../apis/reservationApi';

export const useReservationList = () => {
  const [reservationsGroup, setReservationsGroup] = useState<ReservationGroup[]>([]);

  useEffect(() => {
    getReservationList().then((data) => {
      setReservationsGroup(data);
    });
  }, []);

  return reservationsGroup;
};
