import { getReservations, getResume } from "@apis/dashboardApi";
import { AreaProps } from "@components/Admin/Dashboard/LineChart";
import { User } from "@models/User";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

export const useDashboardData = () => {
    const [totalReservations, setTotalReservations] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [occupationData, setOccupationData] = useState<{occupationRate:string,occupationPoints:AreaProps[]}>({occupationRate:"0",occupationPoints:[]});
    const [totalUsers, setTotalUsers] = useState(0);
    const [cancelationData, setCancelationData] = useState<{cancelationsByDayOfMonth :  {period:string,cancellations:number}[],
        cancelRate:number}>({cancelRate:0, cancelationsByDayOfMonth:[]});
    const [categoryReservations, setCategoryReservations] = useState<{category:string,reservationsRate:number}[]>([]);
    const [reservations, setReservations] = useState<User[]>([]);

    const fetchData = async () => {
        getResume().then((res) => {
            setTotalReservations(res.totalReservations);
            setTotalIncome(res.totalIncome);
            setOccupationData(res.occupationData);
            setTotalUsers(res.totalUsers);
            setCancelationData(res.cancelationData);
            setCategoryReservations(res.categoryReservations);
        });
    }

    const fetchReservationsData = async () => {
        getReservations().then((res) => {
            setReservations(res);
        });
    }
    

    const socket = io(`${process.env.REACT_APP_SOCKET_URL}`,{
        transports: ['websocket', 'polling', 'flashsocket']
    });

    useEffect(() => {
        socket.on('update', () => {
            fetchData();
        });
        socket.on('reservation', () => {
            fetchReservationsData();
        });
        fetchReservationsData();
        fetchData();
    },[socket.active]);

    return { totalReservations, totalIncome, occupationData, totalUsers, cancelationData, categoryReservations,reservations };
}