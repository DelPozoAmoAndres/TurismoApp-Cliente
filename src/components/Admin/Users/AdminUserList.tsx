import React from "react";
import ListWebLayout from "@components/web/layouts/ListWebLayout"
import { IonAlert, IonButton, IonIcon } from "@ionic/react";

import { DashboardLayout } from "@components/web/layouts/DashboardLayout";
import { arrowDown, arrowUp, eyeOutline, pencilOutline, trashOutline } from "ionicons/icons";
import { useSearch } from "@hooks/useSearch";

import { deleteUser, getUserList } from "@apis/adminUserApi";
import { User } from "@models/User";
import { UserModal } from "@components/Admin/Users/Modal/UserModal";
import { formatDate } from "@utils/Utils";
import { useTranslation } from "react-i18next";

export const AdminUserList: React.FC = () => {
    const defaultFilters = { name: "", email: "", telephone: "", birthday: "", country: "", role: "" };
    const { setSearchText, handleSort, sortConfig, items, setForceUpdate } = useSearch(getUserList, defaultFilters);
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
            {th(t('DASHBOARD.LIST.EMAIL'))}
            {th(t('DASHBOARD.LIST.BIRTHDAY'))}
            {th(t('DASHBOARD.LIST.TELEPHONE'))}
            {th(t('DASHBOARD.LIST.COUNTRY'))}
            {th(t('DASHBOARD.LIST.ROLE'))}
            <th>{t('DASHBOARD.LIST.DETAILS')}</th>
            <th>{t('DASHBOARD.LIST.EDIT')}</th>
            <th>{t('DASHBOARD.LIST.CANCEL')}</th>
        </tr>

    const deleteAlert = (id: string) =>
        <>
            <IonAlert
                trigger={"delete-alert-" + id}
                header="Eliminar usuario"
                message="¿Estás seguro de que quieres eliminar este usuario?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'Delete',
                        role: 'confirm',
                        handler: () => {
                            deleteUser(id).then(() => setForceUpdate(true));
                        },
                    },
                ]}
            ></IonAlert></>

    const item = (data: User) =>
        <tr key={data._id}>
            <td className="ion-no-padding" style={{ maxWidth: "none", verticalAlign: "middle", width: 240 }}>{data._id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.birthday ? formatDate(new Date(data.birthday)) : ""}</td>
            <td>{data.telephone}</td>
            <td>{data.country}</td>
            <td>{data.role}</td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a href={`/admin/user/${data._id}`} target="_blank" rel="noreferrer"><IonIcon icon={eyeOutline} size="large" /></a></td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={data._id}><IonIcon icon={pencilOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
            <td className="ion-no-padding" style={{ verticalAlign: "middle" }}><a id={"delete-alert-" + data._id}><IonIcon icon={trashOutline} size="large" style={{ cursor: "pointer" }} /></a></td>
            <UserModal user={data} action="edit" updateInfo={() => setForceUpdate(true)} />
            {data._id && deleteAlert(data._id)}
        </tr>

    const addButton = () =>
        <>
            <IonButton id="modal-user-add">{t('ACTIONS.CREATE')}</IonButton>
            <UserModal user={new User()} action="add" updateInfo={() => setForceUpdate(true)} />
        </>

    const getItems = () => items.map((value) => item(value))
    return <DashboardLayout><ListWebLayout search={setSearchText} columns={columns} items={getItems}>{addButton()}</ListWebLayout></DashboardLayout>
}