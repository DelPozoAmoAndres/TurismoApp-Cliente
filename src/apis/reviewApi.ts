import axios from 'axios';
import { Review } from '@models/Activity';

export const createReview = async (review: Review) => {
  const {activityId,...reviewData} = review;
  return axios.post(`${process.env.REACT_APP_API_URL}/activity/${activityId}/review`, reviewData); 
};

export const getReviews = async (activityId: string): Promise<Review[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/activity/${activityId}/reviews`).then((res) => res.data);
};

export const deleteReview = async (reviewId: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/review?id=${reviewId}`).then((res) => res.data);
};

export const reportReview = async (reviewId: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/admin/review?id=${reviewId}`).then((res) => res.data);
};

