import { IonCard, IonDatetime, IonList, IonRow } from '@ionic/react';
import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { useActivityAvailability } from '@hooks/useActivityAvailability';
import { RouteComponentProps } from 'react-router';
import { EventSortSelect } from './EventSortSelect';

type EventsProps = RouteComponentProps<{ id: string }>;

const EventsPage: React.FC<EventsProps> = ({ match }) => {

    const { defaultLanguage } = useLanguage(); //Hook to know the language selected
    const { selectedEvents, selectedDate, highlightedDates, handleDateChange } =
        useActivityAvailability(match.params.id);

    return (
        <IonRow class='ion-justify-content-center'>
            <IonDatetime
                mode="ios"
                locale={defaultLanguage.code}
                presentation={'date'}
                onIonChange={(e) => handleDateChange(new Date(String(e.detail.value) || ''))}
                value={selectedDate?.toString()}
                highlightedDates={highlightedDates}
            />
            <IonList class="ion-no-padding ion-no-margin">
                <EventSortSelect  activityId={match.params.id}/>
            {selectedEvents?.map((e, index) => (
                <IonCard key={"event"+index}>
                    <p>{e.bookedSeats}</p>
                    <p>{e.seats}</p>
                    <p>{e.price}</p>
                    <p>{e.guide}</p>
                </IonCard>
            ))}
            </IonList>
        </IonRow>
    )
}

export default EventsPage
