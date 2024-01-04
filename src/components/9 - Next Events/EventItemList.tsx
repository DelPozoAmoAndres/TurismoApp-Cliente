import { IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonLabel, IonText } from "@ionic/react";
import { Event } from "@models/Activity";
import { formatDateToTime } from "@utils/Utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    event: Event
}

export const EventItemList: React.FC<Props> = ({ event }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    return (
        <IonCardContent className="ion-no-margin" style={{ height: 275 }}>
            <IonCol>
                <section>
                    <img
                        width={"50%"}
                        height={150}
                        alt={t('img.activity.alt') || ''}
                        className="ion-margin-end img"
                        style={{ borderRadius: 6 }}
                        src={"https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"}
                    />
                    <IonCol class="ion-no-margin">
                        <IonButton class="outlined" style={{ height: "100%" }} routerLink={`/events/${event._id}`}>
                            {t('activity.details')}
                        </IonButton>
                        <IonButton color={"primary"} style={{ height: "100%" }} routerLink={`/events/${event._id}`}>
                            {t('event.participants')}
                        </IonButton>
                    </IonCol>
                </section>
                <IonCol>
                    <IonCardTitle>
                        {"NAMENAMENAMENAMENAMENAMENAME"}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        {"LocationLocationLocationLocation"}
                    </IonCardSubtitle>
                    <section>
                        <IonCol>
                            <IonLabel>
                                <strong>{t('event.bookedseats')}</strong>
                            </IonLabel>
                            <IonText>{event.bookedSeats}</IonText>
                        </IonCol>
                        <IonCol>
                            <IonLabel>
                                <strong>{t('hour')}</strong>
                            </IonLabel>
                            <div>
                                <IonText>{formatDateToTime(event.date || null)}</IonText>
                                -
                                <IonText>{formatDateToTime(event.date || null)}</IonText>
                            </div>
                        </IonCol>
                        <IonCol>
                            <IonLabel>
                                <strong>{t('event.language')}</strong>
                            </IonLabel>
                            <IonLabel>
                                {event.language}
                            </IonLabel>
                        </IonCol>
                    </section>
                </IonCol>
            </IonCol>
        </IonCardContent>
    )
}