import React from "react";
import { getAllActivities } from "@apis/adminActivityApi";
import ListWebLayout from "@components/web/layouts/ListWebLayout";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { Activity } from "@models/Activity";
import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, eyeOutline, pencilOutline, trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";
import { ActivityModal } from "./Modal/ActivityModal";

import { deleteActivity } from "@apis/adminActivityApi";
import { formatDateToTime } from "@utils/Utils";
import { useTranslation } from "react-i18next";

export const AdminActivityList: React.FC = () => {
    const defaultFilters = { name: "", location: "", description: "", accesibility: "", duration: "", petsPermited: "", state: "" };
    const { setSearchText, handleSort, sortConfig, items, setForceUpdate } = useSearch(getAllActivities, defaultFilters);
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
            {th(t('DASHBOARD.LIST.NAME'))}
            {th(t('DASHBOARD.LIST.CATEGORY'))}
            {th(t('DASHBOARD.LIST.LOCATION'))}
            {th(t('DASHBOARD.LIST.DURATION'))}
            {th(t('DASHBOARD.LIST.STATE'))}
            <th>{t('DASHBOARD.LIST.DETAILS')}</th>
            <th>{t('DASHBOARD.LIST.EDIT')}</th>
            <th>{t('DASHBOARD.LIST.DELETE')}</th>
        </tr>

    const deleteAlert = (id: string) =>
        <>
            <IonAlert
                trigger={"delete-alert-" + id}
                header="Eliminar Actividad"
                message="¿Estás seguro de que quieres eliminar esta actividad?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'Delete',
                        role: 'confirm',
                        handler: () => {
                            deleteActivity(id).then(() => setForceUpdate(true));
                        },
                    },
                ]}
            ></IonAlert></>



    const item = (data: Activity) => {
        const date: Date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setMinutes(data.duration);
        return (
            <tr key={data._id}>
                <td className="ion-no-padding" style={{ maxWidth: "none", verticalAlign: "middle", width: 240 }}>{data._id}</td>
                <td>{data.name}</td>
                <td>{t(data.category)}</td>
                <td>{data.location}</td>
                <td>{formatDateToTime(date)}h</td>
                <td>{t(data.state)}</td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a href={`/activity/${data._id}`} target="_blank" rel="noreferrer"><IonIcon icon={eyeOutline} size="large" /></a></td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={data._id}><IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={"delete-alert-" + data._id}><IonIcon icon={trashOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
                <ActivityModal activity={data} action="edit" update={() => setForceUpdate(true)} />
                {data._id && deleteAlert(data._id)}
            </tr>
        )
    }

    const addButton = () =>
        <>
            <IonButton id="modal-activity-add">{t('ACTIONS.CREATE')}</IonButton>
            <ActivityModal activity={new Activity()} action="add" update={() => setForceUpdate(true)} />
        </>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems}>{addButton()}</ListWebLayout></DashboardLayout>
}