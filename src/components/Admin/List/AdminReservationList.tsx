import React, { useRef } from "react";
import { getActivityList } from "@apis/activityApi";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonAlert, IonButton, IonCheckbox, IonCol, IonIcon, IonItem, IonModal, IonRow } from "@ionic/react";
import { Activity, ActivityFilter } from "@models/Activity";
import { get } from "http";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, banOutline, caretDownCircleOutline, eyeOutline, pencilOutline,trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";
import { ActivityModal } from "@components/2 - Search Activity/Modal/ActivityModal";

import { deleteActivity } from "@apis/adminActivityApi";
import { getReservationList } from "@apis/reservationApi";
import { Reservation } from "@models/Reservation";
import { getAllReservations } from "@apis/adminUserApi";
import { useTranslation } from "react-i18next";

export const AdminReservationList: React.FC = () => {
    const defaultFilters = { name: "", email: "", telephone: "", numPersons: "", price: "", paymentId: "", state: "", eventId: ""};
    const { setSearchText, handleSort, sortConfig, items } = useSearch(getAllReservations, defaultFilters);
    const {t} = useTranslation();

    const getSymbol = (name:string) => {
        if (sortConfig?.key !== name) return <></>
        switch (sortConfig?.direction) {
            case "ascending":
                return <IonIcon icon={arrowUp} />
            case "descending":
                return <IonIcon icon={arrowDown} />
            default:
                return <></>
        }
    }

    const th = (name: string) => {
        return (
            <th onClick={()=>handleSort(name)}> {t(name)} {getSymbol(name)} </th>)
    }
    
    const columns = () =>
        <tr>
            <th>#</th>
            {th("name")}
            {th("email")}
            {th("telephone")}
            {th("numPersons")}
            {th("price")}
            <th>PaymentId</th>
            <th>EventId</th>
            {th("state")}
            <th>Edit</th>
            <th>Cancell</th>
        </tr>

    const item = (data: Reservation) =>
        <tr key={data._id}>
            <td className="ion-no-padding" style={{ maxWidth: "none",width: 240 }}>{data._id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.telephone}</td>
            <td>{data.numPersons}</td>
            <td>{data.price}</td>
            <td className="ion-no-padding" style={{ maxWidth: "none",width: 240 }}>{data.paymentId}</td>
            <td className="ion-no-padding" style={{ maxWidth: "none",width: 240 }}>{data.eventId}</td>
            <td>{data.state}</td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a><IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }}/></a></td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a><IonIcon icon={banOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
        </tr>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems} /></DashboardLayout>
}