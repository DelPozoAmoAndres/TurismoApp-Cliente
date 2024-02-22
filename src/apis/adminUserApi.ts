import axios from 'axios';
import { User } from '@models/User';
import { filterPropertiesNotNull } from '@utils/Utils';

const baseUrl = `${process.env.REACT_APP_API_URL}/admin1/user`;

export const getUserList = async (searchString: string, filters: Record<string, unknown>): Promise<[]> => {
    filters = filterPropertiesNotNull(filters);
    const params = new URLSearchParams({ searchString, ...filters }).toString();
    return axios.get(`${baseUrl}/list?${params}`).then((res) => res.data);
};

export const getUser = async (id: string): Promise<User> => {
    return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
};

export const editUser = async (user: User): Promise<User> => {
    const response = await axios.put(`${baseUrl}/${user._id}`,user);
    return response.data;
};

export const deleteUser = async (id: string): Promise<User> => {
    return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export const registerUser = async (user: User) => {
    return axios.post(`${baseUrl}`, user).then((res) => res.data);
}

export const getAllReservations = async (text:string,filters:Record<string,unknown>): Promise<[]> => {
    return axios.get(`${baseUrl}/reservation/list`).then((res) => res.data);
};

export const checkWorkers = async (properties:Record<string,unknown>): Promise<User[]> => {
    properties = filterPropertiesNotNull(properties);
    const params = new URLSearchParams(properties as Record<string,string>).toString();
    return axios.get(`${baseUrl}/workers?${params}`).then((res) => res.data).catch((err) => {console.log(err); return []});
}
