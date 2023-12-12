import axios from 'axios';
import { filterPropertiesNotNull } from '@utils/Utils';
import { Activity, ActivityFilter, Event } from '@models/Activity';

const baseUrl = `${process.env.REACT_APP_API_URL}/activity`;

export const getActivityList = async (searchString = '', filters: ActivityFilter): Promise<[]> => {
  const filtersActived: Partial<Record<string, unknown>> = filterPropertiesNotNull(filters);
  const params = new URLSearchParams({ searchString, ...filtersActived }).toString();
  return axios.get(`${baseUrl}/list?${params}`).then((res) => res.data);
};

export const getActivity = async (id: string): Promise<Activity> => {
  return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const getEvents = async (activityId: string): Promise<Event[]> => {
  return axios.get(`${baseUrl}/${activityId}/events`).then((res) => res.data).catch(()=>null);
};