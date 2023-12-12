import axios from 'axios';
import { Activity, Event } from '@models/Activity';

const baseUrl = `${process.env.REACT_APP_API_URL}/admin/activity`;

export const createActivity = async (activity: Activity) => {
  return axios.post(baseUrl, activity);
};

export const editActivity = async (activity: Activity): Promise<Activity> => {
  const response = await axios.put(`${baseUrl}/${activity._id}`, activity);
  return response.data;
};

export const deleteActivity = async (id: string): Promise<Activity> => {
  return axios.delete(`${baseUrl}/${id}`);
};

export const createEvent = async (activityId: string, event: Event, repeatInfo: unknown) => {
  return axios.post(`${baseUrl}/${activityId}/events`, {
    event: event,
    repeatInfo,
  });
};



