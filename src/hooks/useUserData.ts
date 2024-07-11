import { useEffect, useState } from 'react';
import { User } from '@models/User';
import { getUser } from '@apis/adminUserApi';

export const useUserData = (userId: string) => {
  const [user, setUser] = useState(new User());
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    if (forceUpdate) {
      setForceUpdate(false);
      getUser(userId).then(data => setUser(data))
    }
    // eslint-disable-next-line 
  }, [forceUpdate])

  useEffect(() => {
    getUser(userId).then(data => setUser(data))

    // eslint-disable-next-line
  }, [userId])

  return { user, setForceUpdate };
}
