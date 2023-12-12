import axios, { AxiosResponse } from 'axios';
import { User } from '@models/User';
import { ReservationGroup } from '@models/Reservation';

const baseUrl = `${process.env.REACT_APP_API_URL}/user`;

export const getUserByToken = (): Promise<AxiosResponse> => {
  return axios.get(baseUrl);
};

export const editProfile = async (user: User): Promise<User> => {
  const response = await axios.put(`${baseUrl}/edit`, user);
  return response.data;
};

export const changePassword = async (oldPass:string,newPass:string)=>{
  return axios.post(`${baseUrl}/edit/password/`,{newPass,oldPass}).then((res) => res.data)
}

export const getUserReservationList = async (userId:string): Promise<ReservationGroup[]> => {
  return axios.get(`${baseUrl}/${userId}/reservation/list`).then((res) => {
    return res.data;
  });
};
