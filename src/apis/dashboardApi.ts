import axios from "axios";
const baseUrl = `${process.env.REACT_APP_API_URL}/dashboard`;

export const getTotalReservations = async () => {
    return axios.get(`${baseUrl}/totalReservations`).then((res) => res.data);
}

export const getTotalIncome = async () => {
    return axios.get(`${baseUrl}/totalIncome`).then((res) => res.data);
}

export const getOccupation = async () => {
    return axios.get(`${baseUrl}/occupation`).then((res) => res.data);
}

export const getTotalUsers = async () => {
    return axios.get(`${baseUrl}/totalUsers`).then((res) => res.data);
}

export const getCancelationRate = async () => {
    return axios.get(`${baseUrl}/cancelationRate`).then((res) => res.data);
}

export const getDailySales = async () => {
    return axios.get(`${baseUrl}/dailySales`).then((res) => res.data);
}

export const getResume = async () => {
    return axios.get(`${baseUrl}/resume`).then((res) => res.data);
}

export const getReservations = async () => {
    return axios.get(`${baseUrl}/reservations`).then((res) => res.data);
}