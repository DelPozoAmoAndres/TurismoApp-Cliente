import React from "react";
import { getActivityList } from "@apis/activityApi";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonAlert, IonButton, IonCheckbox, IonIcon } from "@ionic/react";
import { Activity } from "@models/Activity";
import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, eyeOutline, pencilOutline, trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";
import { ActivityModal } from "@components/2 - Search Activity/Modal/ActivityModal";

import { deleteActivity } from "@apis/adminActivityApi";
import { formatDateToTime } from "@utils/Utils";
import { useTranslation } from "react-i18next";

export const AdminActivityList: React.FC = () => {
    const defaultFilters = { name: "", location: "", description: "", accesibility: "", duration: "", petsPermited: "", state: "" };
    const { setSearchText, handleSort, sortConfig, items } = useSearch(getActivityList, defaultFilters);
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
            {th("location")}
            {/* {th("Description")}
            {th("Accesibility")} */}
            {th("duration")}
            {th("petsPermited")}
            {th("state")}
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
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
                            deleteActivity(id);
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
                <td>{data.location}</td>
                {/* <td>{data.description}</td>
            <td>{data.accesibility}</td> */}
                <td>{formatDateToTime(date)}h</td>
                <td><IonCheckbox checked={data.petsPermited} value={data.petsPermited} /></td>
                <td>{data.state}</td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a href={`/activity/${data._id}`} target="_blank" rel="noreferrer"><IonIcon icon={eyeOutline} size="large" /></a></td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={data._id}><IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
                <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={"delete-alert-" + data._id}><IonIcon icon={trashOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
                <ActivityModal activity={data} action="edit" />
                {data._id && deleteAlert(data._id)}
            </tr>
        )
    }

    const addButton = () => 
    <>
        <IonButton id="modal-activity-add">Create</IonButton>
        <ActivityModal activity={new Activity()} action="add"/>
    </>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems}>{addButton()}</ListWebLayout></DashboardLayout>
}