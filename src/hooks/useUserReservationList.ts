import { useEffect, useState } from 'react';
import { ReservationGroup } from '@models/Reservation';
import { getUserReservationList } from '@apis/userApi';

export const useUserReservationList = (userId:string) => {

    const [reservationsGroup, setReservationsGroup] = useState<ReservationGroup[]>([]);
    useEffect(() => {
      getUserReservationList(userId).then((data) => {
        setReservationsGroup(data);
      });
    }, [userId]);
  
    return reservationsGroup;
}
