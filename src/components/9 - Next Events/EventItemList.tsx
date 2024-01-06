import { useScreen } from "@hooks/useScreen";
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import { Activity, Event } from "@models/Activity";
import { Modal } from "@shared/Modal";
import { formatDateToTime, formatTime } from "@utils/Utils";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getParticipants } from "@apis/eventsApi";
import { User } from "@models/User";

interface Props {
    activity: Activity;
}

export const EventItemList: React.FC<Props> = ({ activity }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    const { isMobile } = useScreen();
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [participants, setParticipants] = useState<User[]>();
    const event = activity?.events !== undefined ? activity?.events[0] : null;

    useEffect(() => {
        getParticipantsList();
    }, [event]);

    const getParticipantsList = async () => {
        event?._id && setParticipants(await getParticipants(event._id));
    }

    const buttons = (
        <IonCol class="ion-no-margin">
            <IonButton
                // disabled={event?.bookedSeats !== null || event?.bookedSeats == 0}
                color={"primary"} id={"participants-" + event?._id}>
                {t('event.participants')}
            </IonButton>
            <IonButton className="outlined" routerLink={`/activity/${activity._id}`}>
                {t('activity.details')}
            </IonButton>
        </IonCol>
    )
    return (
        <>
            <IonCardContent className="ion-no-margin ion-no-padding">
                <IonCol>
                    <section className="ion-margin-bottom">
                        <IonCol>
                            <IonCard class="ion-no-margin">
                                <IonText>{formatDateToTime(event?.date || null)}</IonText>
                                <IonIcon icon={ellipsisHorizontalOutline} />
                                <IonText>{formatTime(activity.duration)} h</IonText>
                            </IonCard>
                        </IonCol>
                        <img
                            width={"85%"}
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
                                    <IonLabel>
                                        <strong>{t('event.bookedseats')}</strong>
                                    </IonLabel>
                                    <IonText>{event?.bookedSeats || 0}</IonText>
                                </IonCol>

                                <IonCol>
                                    <IonLabel>
                                        <strong>{t('event.language')}</strong>
                                    </IonLabel>
                                    <IonLabel>
                                        {event?.language}
                                    </IonLabel>
                                </IonCol>
                            </section>
                            {isMobile && buttons}
                        </IonCol>
                        {!isMobile && buttons}
                    </section>
                </IonCol>
            </IonCardContent>
            <Modal tittle={t('participant.list')} trigger={"participants-" + event?._id} id='participantsModal' modal={modal}>
                <IonList>
                    {participants?.map((participant, index) => (
                        <IonItem key={index} >
                            <IonLabel style={{ textAlign: "start", maxWidth: "70%" }}>{participant.name}</IonLabel>
                            <IonLabel style={{ textAlign: "end" }}>{participant.reservations!.at(0)?.numPersons} {t("persons")}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </Modal>
        </>
    )
}