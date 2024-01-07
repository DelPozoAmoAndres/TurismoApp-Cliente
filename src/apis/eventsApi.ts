import axios from "axios";
const baseUrl = `${process.env.REACT_APP_API_URL}/events`;

export const getOneEvent = async (eventId:string) => {
    return axios.get(`${baseUrl}/${eventId}`).then((res) => res.data);
}

export const getParticipants = async (eventId:string) => {
    return axios.get(`${baseUrl}/${eventId}/participants`).then((res) => res.data);
}

export const getWorkerEvents = async (workerId:string) => {
    return axios.get(`${baseUrl}/list/${workerId}`).then((res) => res.data);
}