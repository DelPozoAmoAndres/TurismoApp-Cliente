import React, { useEffect } from "react";
import { getAllActivities } from "@apis/adminActivityApi";
import ListWebLayout from "@components/web/layouts/ListWebLayout";
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { Activity, Event } from "@models/Activity";
import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { eyeOutline, pencilOutline, trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";
import { ActivityModal } from "./Modal/ActivityModal";

import { deleteActivity } from "@apis/adminActivityApi";
import { formatDate, formatDateToTime } from "@utils/Utils";
import { useTranslation } from "react-i18next";
import { useMenuContext } from "@contexts/DashboardActivityContext";

import './AdminActivityList.css';
import { EventModal } from "../Events/Modal/EventModal";
import DeleteEventModal from "../Events/Modal/DeleteEventModal";

export const AdminActivityList: React.FC = () => {
    const defaultFilters = { name: "", location: "", description: "", state: "" };
    const { setSearchText, items, forced, setForceUpdate } = useSearch(getAllActivities, defaultFilters);
    const { showEvents, endDate, startDate, includeCancelled, menuForceUpdate } = useMenuContext();
    const [filtredItems, setFiltredItems] = React.useState<Activity[]>(items);
    const { t } = useTranslation();

    useEffect(() => {
        setForceUpdate(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuForceUpdate]);

    useEffect(() => {
        setFiltredItems(items);
    }, [items]);

    useEffect(() => {
        if (endDate) {
            const filtered = JSON.parse(JSON.stringify(items));
            filtered.forEach((activity: Activity) => {
                if (activity.events) { activity.events = activity.events.filter((event: Event) => new Date(event.date.toString()) <= new Date(endDate)) }
            });
            setFiltredItems(filtered);
            setForceUpdate(true);
        }
        else {
            setFiltredItems(items);
        }
        setForceUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDate, forced, items]);

    useEffect(() => {
        if (startDate) {
            const filtered = JSON.parse(JSON.stringify(items));
            filtered.forEach((activity: Activity) => {
                if (activity.events) { activity.events = activity.events.filter((event: Event) => new Date(event.date.toString()) >= new Date(startDate)) }
            });
            setFiltredItems(filtered);
            setForceUpdate(true);
        }
        else {
            setFiltredItems(items);
        }
        setForceUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, forced, items]);

    useEffect(() => {
        if (!includeCancelled) {
            const filtered = JSON.parse(JSON.stringify(items));
            filtered.forEach((activity: Activity) => {
                if (activity.events) { activity.events = activity.events.filter((event: Event) => event.state !== "cancelled") }
            });
            setFiltredItems(filtered);
            setForceUpdate(true);
        } else {
            setFiltredItems(items);
        }
        setForceUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [includeCancelled, forced, items]);


    // const getSymbol = (name: string) => {
    //     if (sortConfig?.key !== name) return <></>
    //     switch (sortConfig?.direction) {
    //         case "ascending":
    //             return <IonIcon icon={arrowUp} />
    //         case "descending":
    //             return <IonIcon icon={arrowDown} />
    //         default:
    //             return <></>
    //     }
    // }

    // const th = (name: string) => {
    //     return (
    //         <th onClick={() => handleSort(name)}> {t(name)} {getSymbol(name)} </th>)
    // }

    const columns = () => (
        <IonRow className={!showEvents ? "sticky-header" : "sub-header"}>
            <IonCol style={{ minWidth: "17.5%", maxWidth: "17.5%" }}>{t('DASHBOARD.LIST.ID')}</IonCol>
            <IonCol style={{ minWidth: "17.5%", maxWidth: "17.5%" }}>{t('DASHBOARD.LIST.NAME')}</IonCol>
            <IonCol style={{ minWidth: "11.4%", maxWidth: "11.4%" }}>{t('DASHBOARD.LIST.CATEGORY')}</IonCol>
            <IonCol style={{ minWidth: "11.4%", maxWidth: "11.4%" }}>{t('DASHBOARD.LIST.LOCATION')}</IonCol>
            <IonCol style={{ minWidth: "7.8%", maxWidth: "7.8%" }}>{t('DASHBOARD.LIST.DURATION')}</IonCol>
            <IonCol style={{ minWidth: "10.5%", maxWidth: "10.5%" }}>{t('DASHBOARD.LIST.STATE')}</IonCol>
            <IonCol>{t('DASHBOARD.LIST.DETAILS')}</IonCol>
            <IonCol>{t('DASHBOARD.LIST.EDIT')}</IonCol>
            <IonCol>{t('DASHBOARD.LIST.DELETE')}</IonCol>
        </IonRow>
    );

    const deleteAlert = (id: string) =>
        <>
            <IonAlert
                trigger={"delete-alert-" + id}
                header={t('ACTIVITY.DELETE.TITLE') || ""}
                message={t('ACTIVITY.DELETE.MESSAGE') || ""}
                buttons={[
                    {
                        text: t('ACTIONS.CANCEL'),
                        role: 'cancel',
                    },
                    {
                        text: t('ACTIONS.DELETE'),
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
            <>{showEvents && columns()}
                <IonCard class='ion-no-margin' key={data._id}>
                    <IonCardHeader>
                        <IonRow>
                            <IonCol style={{ minWidth: "17.5%", maxWidth: "17.5%" }}>{data._id}</IonCol>
                            <IonCol style={{ minWidth: "17.5%", maxWidth: "17.5%" }}>{data.name}</IonCol>
                            <IonCol style={{ minWidth: "11.4%", maxWidth: "11.4%" }}>{t("CATEGORY." + data.category.toUpperCase())}</IonCol>
                            <IonCol style={{ minWidth: "11.4%", maxWidth: "11.4%" }}>{data.location}</IonCol>
                            <IonCol style={{ minWidth: "7.8%", maxWidth: "7.8%" }}>{formatDateToTime(date)}h</IonCol>
                            <IonCol style={{ minWidth: "10.6%", maxWidth: "10.6%" }}>{t("ACTIVITY.STATE." + data.state.toUpperCase())}</IonCol>
                            <IonCol className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                                <a href={`/activity/${data._id}`} target="_blank" rel="noreferrer">
                                    <IonIcon icon={eyeOutline} size="large" />
                                </a>
                            </IonCol>
                            <IonCol className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                                <a id={data._id}>
                                    <IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} />
                                </a>
                            </IonCol>
                            <IonCol className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                                <a id={"delete-alert-" + data._id}>
                                    <IonIcon icon={trashOutline} size="large" style={{ cursor: "pointer" }} />
                                </a>
                            </IonCol>
                            <ActivityModal activity={data} action="edit" update={() => setForceUpdate(true)} />
                            {data._id && deleteAlert(data._id)}
                        </IonRow>
                    </IonCardHeader>
                    {showEvents && data.events && data.events.length > 0 && <IonCardContent class="ion-no-padding">
                        <IonGrid>
                            <IonRow className="sub-header">
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('DASHBOARD.LIST.DATE')}</IonCol>
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('DASHBOARD.LIST.SEATS')}</IonCol>
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('DASHBOARD.LIST.RESERVED-SEATS')}</IonCol>
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('ACTIVITY.EVENT.LANGUAGE')}</IonCol>
                                <IonCol style={{ minWidth: "18.4%", maxWidth: "18.4%" }}>{t('DASHBOARD.LIST.GUIDE')}</IonCol>
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('DASHBOARD.LIST.EDIT')}</IonCol>
                                <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('DASHBOARD.LIST.CANCEL')}</IonCol>
                            </IonRow>
                            {data.events && data.events.sort((e1, e2) => new Date(e1.date).getTime() - new Date(e2.date).getTime()).map((event, idx) => (
                                <>
                                    <IonRow key={idx} style={{ borderBottom: "10px solid var(--ion-background-color)" }}>
                                        <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{formatDate(event.date, true, true)}</IonCol>
                                        <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{String(event.seats)}</IonCol>
                                        <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{String(event.bookedSeats)}</IonCol>
                                        <IonCol style={{ minWidth: "13.6%", maxWidth: "13.6%" }}>{t('LANGUAGE.' + String(event.language).toUpperCase())}</IonCol>
                                        <IonCol style={{ minWidth: "18.4%", maxWidth: "18.4%" }}>{String(event.guide)}</IonCol>
                                        <IonCol className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                                            <a id={event._id}>
                                                <IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} />
                                            </a>
                                        </IonCol>
                                        <IonCol className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                                            {event.state !== "cancelled"
                                                ? <DeleteEventModal eventId={event._id} update={() => setForceUpdate(true)} />
                                                : <span>{t('ACTIVITY.EVENT.CANCELLED')}</span>}
                                        </IonCol>
                                    </IonRow>
                                    <EventModal action="edit" event={event} update={() => setForceUpdate(true)} />
                                </>
                            ))}
                        </IonGrid>
                    </IonCardContent>}
                </IonCard>
            </>
        );
    }

    const addButton = () =>
        <>
            <IonButton id="modal-activity-add">{t('ACTIONS.CREATE')}</IonButton>
            <ActivityModal activity={new Activity()} action="add" update={() => setForceUpdate(true)} />
        </>

    const getItems = () => filtredItems.map((value) => item(value))
    return <DashboardLayout><div id="activityList-admin"><ListWebLayout search={setSearchText} columns={!showEvents ? columns : () => <></>} items={getItems}>{addButton()}</ListWebLayout></div></DashboardLayout>
}