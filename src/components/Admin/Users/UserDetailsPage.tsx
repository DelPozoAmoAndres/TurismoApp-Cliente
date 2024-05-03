import React from 'react'
import { IonButton, IonCard, IonGrid, IonLabel, IonRow } from '@ionic/react'
import { useScreen } from '@hooks/useScreen'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@utils/Utils'
import { ReservationItemList } from '@reservation-list/ReservationItemList'
import { RouteComponentProps } from 'react-router'
import { useUserReservationList } from '@hooks/useUserReservationList'
import { useUserData } from '@hooks/useUserData'
import { UserModal } from '@components/Admin/Users/Modal/UserModal'

type UserDetailsProps = RouteComponentProps<{ id: string }>;

const UserDetailsPage: React.FC<UserDetailsProps> = ({ match }) => {
    const { width } = useScreen();
    const { t } = useTranslation();
    const { user, setForceUpdate } = useUserData(match.params.id);
    const reservationsGroup = useUserReservationList(match.params.id); //Hooks to have all the reservation data

    return (
        <>
            <IonGrid>
                <IonRow class="ion-justify-content-center">
                    <section>
                        <img
                            src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"
                            width={width < 1000 ? 200 : 250}
                        />
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('name.title')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.name}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('email.title')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.email}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('telephone.title')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.telephone || t("personal.data.unknown")}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('country.title')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {user?.country || t("personal.data.unknown")}
                        </IonRow>
                        <IonRow class="ion-margin-top">
                            <IonLabel><strong>{t('account.created.date')}</strong></IonLabel>
                        </IonRow>
                        <IonRow>
                            {formatDate(user?.createdAt || null)}
                        </IonRow>
                        <div className=" ion-no-padding ion-margin-top">
                            <IonButton id={user._id} style={{ width: '100%' }} expand="block">
                                {t('personal.data.modify')}
                            </IonButton>
                            <IonButton color={"danger"} expand="block" style={{ width: '100%' }}>
                                {t('account.delete')}
                            </IonButton>
                        </div>
                    </section>
                    {reservationsGroup && reservationsGroup.length > 0 &&
                        <section style={{ width: "30%" }}>
                            <IonLabel class='ion-text-center'>{t("reservations.history.title")}</IonLabel>
                            {reservationsGroup.map((reservationGroup, index) => (
                                <div key={'reservationsGroup' + index} className="ion-margin-bottom">
                                    <IonRow class="ion-padding-start ion-padding-vertical">
                                        <IonLabel>
                                            <strong>{formatDate(reservationGroup.dateFrom) + '-----' + formatDate(reservationGroup.dateTo)}</strong>
                                        </IonLabel>
                                    </IonRow>
                                    <IonCard>
                                        {reservationGroup.reservations.map((reservation, index, array) => (
                                            <div key={'reservation' + index}>
                                                <ReservationItemList reservation={reservation} last={index === array.length - 1} />
                                            </div>
                                        ))}
                                    </IonCard>
                                </div>
                            ))}
                        </section>
                    }
                </IonRow>
                <UserModal action='edit' user={user} updateInfo={() => setForceUpdate(true)} />
            </IonGrid>
        </>

    )
}

export default UserDetailsPage
