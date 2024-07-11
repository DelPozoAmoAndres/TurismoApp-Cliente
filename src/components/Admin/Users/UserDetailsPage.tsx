import React, { useContext } from 'react'
import { IonButton, IonCard, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/react'
import { useScreen } from '@hooks/useScreen'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@utils/Utils'
import { ReservationItemList } from '@reservation-list/ReservationItemList'
import { RouteComponentProps, useHistory } from 'react-router'
import { useUserReservationList } from '@hooks/useUserReservationList'
import { useUserData } from '@hooks/useUserData'
import { UserModal } from '@components/Admin/Users/Modal/UserModal'
import CenteredLayout from '@components/web/layouts/CenteredLayout'
import { ellipsisHorizontal } from 'ionicons/icons'
import { deleteUser } from '@apis/adminUserApi'
import { NotificationContext } from '@contexts/NotificationToastContext'

type UserDetailsProps = RouteComponentProps<{ id: string }>;

const UserDetailsPage: React.FC<UserDetailsProps> = ({ match }) => {
    const { width } = useScreen();
    const { t } = useTranslation();
    const { user, setForceUpdate } = useUserData(match.params.id);
    const { reservationsGroup, setForceReservationUpdate } = useUserReservationList(match.params.id); //Hooks to have all the reservation data
    const history = useHistory();
    const { showNotification } = useContext(NotificationContext);

    return (
        <CenteredLayout>
            <IonGrid class='limits-content'>
                <IonRow class="ion-justify-content-between" id="reservation-list">
                    <section className='ion-margin'>
                        <img
                            src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"
                            width={width < 1000 ? 200 : 250}
                        />
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('DATA.NAME.LABEL')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.name}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('DATA.EMAIL.LABEL')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.email}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('DATA.TELEPHONE.LABEL')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.telephone || t("DATA.UNKNOWN")}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('DATA.COUNTRY.LABEL')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.country || t("DATA.UNKNOWN")}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('PROFILE.ACCOUNT.CREATION')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {formatDate(user?.createdAt || null)}
                        </IonRow>
                        <div className=" ion-no-padding ion-margin-top">
                            <IonButton id={user._id} style={{ width: '100%' }} expand="block">
                                {t('PROFILE.DATA.MODIFY')}
                            </IonButton>
                            <IonButton color={"danger"} onClick={() => user._id && deleteUser(user._id).then(() => { history.replace("/home"); showNotification("Se ha eliminado correctamente") })} expand="block" style={{ width: '100%' }}>
                                {t('PROFILE.ACCOUNT.DELETE')}
                            </IonButton>
                        </div>
                    </section>
                    {reservationsGroup && reservationsGroup.length > 0 &&
                        <section className='ion-margin ion-padding' style={{ width: "70%" }}>
                            <IonLabel class='ion-text-center'>{t("RESERVATION.TITLE")}</IonLabel>
                            {reservationsGroup.map((reservationGroup, index) => (
                                <div key={'reservationsGroup' + index} className="ion-margin-bottom">
                                    <IonRow class="ion-padding-start ion-padding-vertical">
                                        <IonLabel>
                                            <strong>{formatDate(reservationGroup.dateFrom)}</strong> {reservationGroup.dateFrom.toString().split("T")[0] !== reservationGroup.dateTo.toString().split("T")[0] && <strong><IonIcon icon={ellipsisHorizontal} style={{ "opacity": 0.5, "margin-bottom": "-2.5px" }} /> {formatDate(reservationGroup.dateTo)}</strong>}
                                        </IonLabel>
                                    </IonRow>
                                    <IonCard>
                                        {reservationGroup.reservations.map((reservation, index, array) => (
                                            <div key={'reservation' + index}>
                                                <ReservationItemList reservation={reservation} last={index === array.length - 1} id={user._id} update={() => setForceReservationUpdate(true)} />
                                            </div>
                                        ))}
                                    </IonCard>
                                </div>
                            ))}
                        </section>
                    }
                    {reservationsGroup && reservationsGroup.length == 0 &&
                        <section className='ion-margin ion-padding' style={{ width: "70%", height: "100%", background: "var(--ion--color--background)", borderRadius: 20 }}>
                            <IonLabel class='ion-text-center'>{t("RESERVATION.LIST_EMPTY")}</IonLabel>
                        </section>
                    }
                </IonRow>
                <UserModal action='edit' user={user} updateInfo={() => setForceUpdate(true)} />
            </IonGrid>
        </CenteredLayout >

    )
}

export default UserDetailsPage
