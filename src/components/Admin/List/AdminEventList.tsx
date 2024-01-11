import React, { useRef } from "react";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonAlert, IonIcon} from "@ionic/react";

import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, eyeOutline, pencilOutline,trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";

import { deleteUser, getUserList } from "@apis/adminUserApi";
import { User } from "@models/User";
import { UserModal } from "@components/8 - Search User/Edit Modal/UserModal";
import { formatDate, formatDateToTime, formatTime } from "@utils/Utils";
import { getEvents } from "@apis/adminActivityApi";
import { Event } from "@models/Activity";
import CreateEvent from "../Activities/Events/CreateEvent";
import { deleteEvents } from "@apis/eventsApi";
import DeleteEventModal from "@components/10- See Events/DeleteEventModal";
import { useTranslation } from "react-i18next";

export const AdminEventList : React.FC = () => {
    const defaultFilters = { name: "", email:"", telephone:"", birthday:"", country:"", role:""};
    const { setSearchText, handleSort, sortConfig, items } = useSearch(getEvents, defaultFilters);
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
            <th>{t("guide")}</th>
            {th("language")}
            {th("date")}
            {th("price")}
            {th("bookedSeats")}
            {th("seats")}
            <th>Edit</th>
            <th>Delete</th>
        </tr>


    const item = (data: Event) =>
        <tr key={data._id}>
            <td className="ion-no-padding" style={{ maxWidth: "none", verticalAlign: "middle", width: 240 }}>{data._id}</td>
            <td>{data.guide}</td>
            <td>{data.language}</td>
            <td>{formatDate(new Date(data.date))} {formatDateToTime(new Date(data.date))}</td>
            <td>{data.price}</td>
            <td>{data.bookedSeats}</td>
            <td>{data.seats}</td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={data._id} ><IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><DeleteEventModal eventId={data._id}/></td>
            

        </tr>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems} /></DashboardLayout>
}