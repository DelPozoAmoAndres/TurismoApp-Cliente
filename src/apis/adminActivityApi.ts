import axios from 'axios';
import { Activity, Event } from '@models/Activity';
import { filterPropertiesNotNull } from '@utils/Utils';

const baseUrl = `${process.env.REACT_APP_API_URL}/admin/activity`;

export const createActivity = async (activity: Activity) => {
  return axios.post(baseUrl, activity);
};

export const editActivity = async (activity: Activity): Promise<Activity> => {
  return axios.put(`${baseUrl}/${activity._id}`, activity);
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

export const getEvents = async (search: string, filters: Record<string, unknown>): Promise<[]> => {
  filters = filterPropertiesNotNull(filters);
  const params = new URLSearchParams({ search, ...filters }).toString();
  const response = await axios.get(`${baseUrl}/event/list?${params}`);
  console.log(response.data);
  return response.data;
}

export const getAllActivities = async (search: string, filters: Record<string, unknown>): Promise<[]> => {
  filters = filterPropertiesNotNull(filters);
  const params = new URLSearchParams({ search, ...filters }).toString();
  const response = await axios.get(`${baseUrl}/list?${params}`);
  return response.data;
}




