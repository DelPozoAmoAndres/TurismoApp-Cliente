import axios from 'axios';
import { Reservation, ReservationGroup } from '@models/Reservation';

export const getReservationList = async (): Promise<ReservationGroup[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reservations/list`).then((res) => {
    return res.data;
  });
};

export const getReservation = async (id: string): Promise<Reservation> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reservations/${id}`).then((res) => res.data);
};

export const cancelReservation = async (id: string) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/reservations/${id}`);
};

export const createReservation = async (reservation: Reservation, intentId: string) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/reservations`, {
    reservation,
    intentId,
  });
};

export const intentPayment = async (price: number) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/intent`, {
    price,
  });
  return response.data.paymentIntent;
};

export const confirmPayment = async (paymentId: string) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/payment/confirm/`, {
      paymentId,
    })
    .then((res) => res.data);
};

export const verifyPayment = async (paymentId: string) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/payment/verify`, { paymentId }).then((res) => res.data);
};
