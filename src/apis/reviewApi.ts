import axios from 'axios';
import { Review } from '@models/Activity';

const url = `${process.env.REACT_APP_API_URL}/reviews`;

export const createReview = async (review: Review) => {
  const { activityId, ...reviewData } = review;
  return axios.post(`${url}/activity/${activityId}`, reviewData);
};

export const editReview = async (review: Omit<Review, 'activityId'>) => {
  return axios.put(`${url}/${review._id}`, review);
};

export const getReviewFromReservation = async (reservationId: string): Promise<Review> => {
  return axios.get(`${url}/reservation/${reservationId}`).then((res) => res.data).catch(() => null);
}

export const deleteReview = async (reviewId: string) => {
  return axios.delete(`${url}/${reviewId}`).then(() => true).catch(() => false);
};

export const reportReview = async (reviewId: string) => {
  return axios.delete(`${url}/admin/${reviewId}`).then((res) => res.data);
};

