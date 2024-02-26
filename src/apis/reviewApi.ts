import axios from 'axios';
import { Review } from '@models/Activity';

const url = `${process.env.REACT_APP_API_URL}/reviews`;

export const createReview = async (review: Review) => {
  const {activityId,...reviewData} = review;
  return axios.post(`${url}/activity/${activityId}`, reviewData); 
};

export const editReview = async (review: Review) => {
  const {activityId,...reviewData} = review;
  return axios.put(`${url}/${review._id}`, reviewData); 
};

export const getReviewFromReservation = async (reservationId: string): Promise<Review> => {
  return axios.get(`${url}/reservation/${reservationId}`).then((res) => res.data).catch(()=>null);
}

export const getReviews = async (activityId: string): Promise<Review[]> => {
  return axios.get(`${url}/activity/${activityId}`).then((res) => res.data);
};

export const deleteReview = async (reviewId: string) => {
  return axios.delete(`${url}/${reviewId}`).then((res) => res.data);
};

export const reportReview = async (reviewId: string) => {
  return axios.delete(`${url}/admin/${reviewId}`).then((res) => res.data);
};

