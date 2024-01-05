import { useScreen } from "@hooks/useScreen";
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonLabel, IonText } from "@ionic/react";
import { Event } from "@models/Activity";
import { formatDateToTime } from "@utils/Utils";
import { arrowDownOutline } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    event: Event
}

export const EventItemList: React.FC<Props> = ({ event }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    const { isMobile } = useScreen();
    return (
        <IonCardContent className="ion-no-margin ion-no-padding">
            <IonCol>
                <section className="ion-margin-bottom">
                    <IonCol>
                        <IonCard class="ion-no-margin">
                            <IonText>{formatDateToTime(event.date || null)}</IonText>
                            <IonIcon icon={arrowDownOutline} />
                            <IonText>{formatDateToTime(event.date || null)}</IonText>
                        </IonCard>
                    </IonCol>
                    <img
                        width={"85%"}
                        height={150}
                        alt={t('img.activity.alt') || ''}
                        className="img"
                        style={{ borderRadius: 6 }}
                        src={"https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"}
                    />
                </section>
                <section>
                <IonCol>
                    <IonCardTitle>
                        {"NAMENAME"}
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
                                <strong>{t('event.language')}</strong>
                            </IonLabel>
                            <IonLabel>
                                {event.language}
                            </IonLabel>
                        </IonCol>
                    </section>
                    {isMobile &&
                        <section>
                            <IonCol class="ion-no-margin">
                                <IonButton color={"primary"} routerLink={`/events/${event._id}`}>
                                    {t('event.participants')}
                                </IonButton>
                                <IonButton class="outlined" routerLink={`/events/${event._id}`}>
                                    {t('activity.details')}
                                </IonButton>
                            </IonCol>
                        </section>
                    }
                </IonCol>
                {!isMobile &&
                        <IonCol class="ion-no-margin">
                            <IonButton color={"primary"} routerLink={`/events/${event._id}`}>
                                {t('event.participants')}
                            </IonButton>
                            <IonButton class="outlined" routerLink={`/events/${event._id}`}>
                                {t('activity.details')}
                            </IonButton>
                        </IonCol>
                }
                </section>
            </IonCol>
        </IonCardContent>
    )
}