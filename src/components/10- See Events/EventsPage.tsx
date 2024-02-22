import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import React from 'react';
import { useActivityAvailability } from '@hooks/useActivityAvailability';
import { RouteComponentProps } from 'react-router';
import { EventSortSelect } from './EventSortSelect';

import { useScreen } from '@hooks/useScreen';
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import ScheduleWebLayout from '@components/web/layouts/ScheduleWebLayout';
import { formatDateToTime } from '@utils/Utils';
import { calendarOutline, cashOutline, languageOutline, pencilOutline, personCircleOutline, ticketOutline, trashOutline } from 'ionicons/icons';
import { EventModal } from './EventModal';
import DeleteEventModal from './DeleteEventModal';

type EventsProps = RouteComponentProps<{ id: string }>;

const EventsPage: React.FC<EventsProps> = ({ match }) => {
    const { browsingWeb } = useScreen();
    const { selectedEvents, highlightedDates, handleDateChange } = useActivityAvailability(match.params.id);

    const content = (
        <>
            <EventSortSelect activityId={match.params.id} />
            <IonGrid>
                <IonRow style={{gap:"15px"}}>
                    {selectedEvents?.map((event, index) => (
                        <IonCol key={"event" + index} class='ion-no-padding'>
                            <IonCard class='ion-no-margin' style={{ marginBottom: '15px' }}>
                                <IonCardHeader style={{ padding: "5px", backgroundColor: '#f7f7f7' }}>
                                    <IonRow class='ion-align-items-center ion-justify-content-between'>
                                        <IonCardSubtitle>
                                            <IonIcon icon={calendarOutline} style={{ marginRight: '5px', color: "var(--ion-color-primary)" }} />
                                            Hora: {formatDateToTime(event.date)}
                                        </IonCardSubtitle>
                                        <IonCardTitle style={{ color: '#333' }}>{event._id}</IonCardTitle>
                                    </IonRow>
                                </IonCardHeader>

                                <IonCardContent style={{ paddingTop: "5px", paddingBottom: 0 }}>
                                    <IonRow>
                                        <IonCol size="12">
                                            <p><IonIcon icon={personCircleOutline} style={{ marginRight: '5px' }} /> Guía: {event.guide}</p>
                                            <p><IonIcon icon={languageOutline} style={{ marginRight: '5px' }} /> Idioma: {event.language}</p>
                                            <p><IonIcon icon={ticketOutline} style={{ marginRight: '5px' }} /> Reservas: <strong>{event.bookedSeats || 0}</strong> / {event.seats}
                                            </p>
                                            <p><IonIcon icon={cashOutline} style={{ marginRight: '5px' }} /> Precio: {event.price}€</p>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                                <IonRow class='ion-justify-content-between ion-margin-horizontal' style={{ marginBottom: "5px" }}>
                                    <IonButton id={event._id} color={'primary'} style={{ width: "45%" }} expand="block" ><IonIcon icon={pencilOutline} />Editar</IonButton>
                                    <DeleteEventModal eventId={event._id} />
                                </IonRow>
                            </IonCard>
                            <EventModal activity={match.params.id} event={event} action="edit" />
                            
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </>
    )

    return browsingWeb ? <ScheduleWebLayout header={<h1>Events</h1>} setDate={handleDateChange} highlightedDates={highlightedDates}>{content}</ScheduleWebLayout> : <GenericAppLayout>{content}</GenericAppLayout>;
}

export default EventsPage
