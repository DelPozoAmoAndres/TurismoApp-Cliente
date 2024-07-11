import { useState, useEffect } from 'react';
import { ReservationGroup } from '../models/Reservation';
import { getReservationList } from '../apis/reservationApi';

export const useReservationList = () => {
  const [reservationsGroup, setReservationsGroup] = useState<ReservationGroup[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    console.log('reload', reload);
    if (reload) {
      getReservationList().then((data) => {
        setReservationsGroup(data);
      });
      setReload(false);
    }
  }, [reload]);

  return { reservationsGroup, setReload };
};
