import { useEffect, useState } from 'react';
import { ReservationGroup } from '@models/Reservation';
import { getUserReservations } from '@apis/adminUserApi';

export const useUserReservationList = (userId: string) => {

  const [reservationsGroup, setReservationsGroup] = useState<ReservationGroup[] | undefined>(undefined);
  const [forceUpdate, setForceReservationUpdate] = useState(false);
  useEffect(() => {
    getUserReservations(userId).then((data) => {
      setReservationsGroup(data);
    }).catch(() => { setReservationsGroup([]) });
  }, [userId]);

  useEffect(() => {
    if (forceUpdate) {
      setForceReservationUpdate(false);
      getUserReservations(userId).then((data) => {
        setReservationsGroup(data);
      }).catch(() => { setReservationsGroup([]) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate]);

  return { reservationsGroup, setForceReservationUpdate };
}
