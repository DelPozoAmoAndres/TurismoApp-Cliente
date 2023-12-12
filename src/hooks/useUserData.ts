import { useEffect, useState } from 'react';
import { User } from '@models/User';
import { getUser } from '@apis/adminUserApi';

export const useUserData = (userId:string) => {
  const [user,setUser] = useState(new User());
  useEffect(()=>{
    getUser(userId).then(data=>setUser(data))
  },[userId])
  return user;
}
