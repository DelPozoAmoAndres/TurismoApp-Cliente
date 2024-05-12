import React from "react";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonButton, IonIcon } from "@ionic/react";

import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, pencilOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";

import { formatDate, formatDateToTime } from "@utils/Utils";
import { getEvents } from "@apis/adminActivityApi";
import { Event } from "@models/Activity";
import DeleteEventModal from "@components/Admin/Events/Modal/DeleteEventModal";
import { useTranslation } from "react-i18next";
import { EventModal } from "./Modal/EventModal";

export const AdminEventList: React.FC = () => {
    const defaultFilters = { name: "", email: "", telephone: "", birthday: "", country: "", role: "" };
    const { setSearchText, handleSort, sortConfig, items, setForceUpdate } = useSearch(getEvents, defaultFilters);
    const { t } = useTranslation();

    const getSymbol = (name: string) => {
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
            <th onClick={() => handleSort(name)}> {t(name)} {getSymbol(name)} </th>)
    }

    const columns = () =>
        <tr>
            <th>{t('DASHBOARD.LIST.ID')}</th>
            <th>{t('DASHBOARD.LIST.GUIDE')}</th>
            {th(t('DASHBOARD.LIST.LANGUAGE'))}
            {th(t('DASHBOARD.LIST.DATE'))}
            {th(t('DASHBOARD.LIST.PRICE'))}
            {th(t('DASHBOARD.LIST.BOOKED-SEATS'))}
            {th(t('DASHBOARD.LIST.SEATS'))}
            <th>{t('DASHBOARD.LIST.EDIT')}</th>
            <th>{t('DASHBOARD.LIST.CANCEL')}</th>
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
            {data.state !== "cancelled" && <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><DeleteEventModal eventId={data._id} update={() => setForceUpdate(true)} /></td>}
            <EventModal action="edit" event={data} update={() => setForceUpdate(true)} />
        </tr>

    const addButton = (event: Event) =>
        <>
            <IonButton id="modal-event-add">{t('ACTIONS.CREATE')}</IonButton>
            <EventModal event={event} action="add" update={() => setForceUpdate(true)} />
        </>


    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems} >{addButton(new Event())}</ListWebLayout></DashboardLayout>
}