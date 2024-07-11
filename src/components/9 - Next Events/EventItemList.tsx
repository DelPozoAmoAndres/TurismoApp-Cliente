import { useScreen } from "@hooks/useScreen";
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonItemDivider, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { Activity, Event } from "@models/Activity";
import { Modal } from "@shared/Modal";
import { formatDateToTime, formatTime } from "@utils/Utils";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getParticipants } from "@apis/eventsApi";
import { Reservation } from "@models/Reservation";
import { getActivityFromEvent } from "@apis/activityApi";

interface Props {
    event: Event;
}

export const EventItemList: React.FC<Props> = ({ event }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    const { isMobile } = useScreen();
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [participants, setParticipants] = useState<Reservation[]>();
    const [activity, setActivity] = useState<Activity>(new Activity());

    useEffect(() => {
        getParticipantsList();
        event._id && getActivityFromEvent(event._id).then(a => setActivity(a));
        // eslint-disable-next-line
    }, [event]);

    const getParticipantsList = async () => {
        event?._id && setParticipants(await getParticipants(event._id));
    }

    const buttons = (
        <IonCol class="ion-no-margin">
            <IonButton
                disabled={event?.bookedSeats === null || event?.bookedSeats == 0}
                color={"primary"} id={"participants-" + event?._id}>
                {t('ACTIVITY.EVENT.PARTICIPANTS')}
            </IonButton>
            <IonButton className="outlined" routerLink={`/activity/${activity._id}`}>
                {t('ACTIVITY.SHOW.INFO')}
            </IonButton>
        </IonCol>
    )
    return (
        <>
            <IonCardContent className="ion-no-margin ion-padding" style={{ background: "var(--ion--color--background)", borderRadius: 10 }}>
                <IonCol>
                    <section className="ion-margin-bottom border-primary" >
                        <IonCol>
                            <IonCard class="ion-no-margin">
                                <IonText>{formatDateToTime(event?.date || null)}</IonText>
                                <IonIcon icon={ellipsisHorizontalOutline} />
                                <IonText>{formatTime(activity.duration)} h</IonText>
                            </IonCard>
                        </IonCol>
                        <img
                            width={"90%"}
                            height={150}
                            alt={t('img.activity.alt') || ''}
                            className="img"
                            style={{ borderRadius: 6 }}
                            src={activity?.images[0]}
                        />
                    </section>
                    <section>
                        <IonCol>
                            <IonCardTitle>
                                {activity.name}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                {activity.location}
                            </IonCardSubtitle>
                            <section>
                                <IonCol>
                                    <IonLabel color={"primary"}>
                                        <strong>{t('DASHBOARD.LIST.RESERVED-SEATS')}</strong>
                                    </IonLabel>
                                    <IonText>{event?.bookedSeats || 0}/{event?.seats}</IonText>
                                </IonCol>

                                <IonCol>
                                    <IonLabel color={"primary"}>
                                        <strong>{t('ACTIVITY.EVENT.LANGUAGE')}</strong>
                                    </IonLabel>
                                    <IonLabel>
                                        {t('LANGUAGE.' + event?.language.toUpperCase())}
                                    </IonLabel>
                                </IonCol>
                            </section>
                            {isMobile && buttons}
                        </IonCol>
                        {!isMobile && buttons}
                    </section>
                </IonCol>
            </IonCardContent>
            <Modal title={t('ACTIVITY.EVENT.PARTICIPANTS')} trigger={"participants-" + event?._id} id='participantsModal' modal={modal}>
                <IonList>
                    {participants?.map((participant) => (
                        <div key={participant._id}>
                            <IonRow class="ion-justify-content-between ion-align-items-center ion-margin">
                                <IonLabel style={{ textAlign: "start", maxWidth: "70%" }}>{participant.name}</IonLabel>
                                <IonLabel style={{ textAlign: "end" }}>{participant.numPersons} {participant.numPersons > 1 ? t("PEOPLE") : t("PERSON")}</IonLabel>
                            </IonRow>
                            <IonRow class="ion-justify-content-between ion-align-items-center ion-margin-horizontal">
                                <IonLabel style={{ textAlign: "start", maxWidth: "70%" }}>{participant.email}</IonLabel>
                                <IonLabel style={{ textAlign: "end" }}>{participant.telephone}</IonLabel>
                            </IonRow>
                            <IonItemDivider></IonItemDivider>
                        </div>
                    ))}
                </IonList>
            </Modal >
        </>
    )
}