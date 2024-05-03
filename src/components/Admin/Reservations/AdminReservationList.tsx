import React from "react";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonAlert, IonIcon } from "@ionic/react";
import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, banOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";
import { cancelReservation } from "@apis/reservationApi";
import { Reservation } from "@models/Reservation";
import { getAllReservations } from "@apis/adminUserApi";
import { useTranslation } from "react-i18next";

export const AdminReservationList: React.FC = () => {
    const defaultFilters = { name: "", email: "", telephone: "", numPersons: "", price: "", paymentId: "", state: "", eventId: "" };
    const { setSearchText, handleSort, sortConfig, items, setForceUpdate } = useSearch(getAllReservations, defaultFilters);
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

    const cancelAlert = (id: string) =>
        <>
            <IonAlert
                trigger={"cancel-alert-" + id}
                header="Cancelar reserva"
                message="¿Estás seguro de que quieres cancelar esta reserva?"
                buttons={[
                    {
                        text: 'Atras',
                        role: 'cancel',
                    },
                    {
                        text: 'Continuar',
                        role: 'confirm',
                        handler: () => {
                            cancelReservation(id).then(() => setForceUpdate(true));
                        },
                    },
                ]}
            ></IonAlert>
        </>

    const th = (name: string) => {
        return (
            <th onClick={() => handleSort(name)}> {t(name)} {getSymbol(name)} </th>)
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
            <th>Cancel</th>
        </tr>

    const item = (data: Reservation) =>
        <tr key={data._id}>
            <td className="ion-no-padding" style={{ maxWidth: "none", width: 240 }}>{data._id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.telephone}</td>
            <td>{data.numPersons}</td>
            <td>{data.price}</td>
            <td className="ion-no-padding" style={{ maxWidth: "none", width: 240 }}>{data.paymentId}</td>
            <td className="ion-no-padding" style={{ maxWidth: "none", width: 240 }}>{data.eventId}</td>
            <td>{data.state}</td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}>
                {data.state != 'canceled' && <a id={"cancel-alert-" + data._id}><IonIcon icon={banOutline} size="large" style={{ cursor: "pointer" }} /></a>}
            </td>
            {data._id && cancelAlert(data._id)}
        </tr>

    // const addButton = () =>
    //     <>
    //         <IonButton id="add">Create</IonButton>
    //         {/* <ReservationModal reservation={new Reservation()} action="add"/> */}
    //     </>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems} /></DashboardLayout>
}