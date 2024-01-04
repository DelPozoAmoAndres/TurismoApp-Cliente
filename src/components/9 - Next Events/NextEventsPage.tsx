import LogoHeaderAppLayout from '@components/app/layouts/LogoHeaderAppLayout';
import TwoColumnWebLayout from '@components/web/layouts/TwoColumnWebLayout';
import { useScreen } from '@hooks/useScreen';
import { IonDatetime, IonList } from '@ionic/react';
import { Event } from '@models/Activity';
import { formatDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { EventItemList } from './EventItemList';
import "./EventList.css"

export const NextEventsPage: React.FC = () => {
    const { browsingWeb } = useScreen();
    const event1 = new Event();
    event1.date = new Date(1704359151000);
    const event2 = new Event();
    event2.date = new Date(1704359451000);
    const event3 = new Event();
    event3.date = new Date(1704359751000);
    const event4 = new Event();
    event4.date = new Date(1704447542000);
    const eventList = [event2, event1, event3, event4];
    const [highlightedDates, setHighlightedDates] = useState<{ date: string; textColor: string; backgroundColor: string }[]>()
    const [filterEvents, setFilterEvents] = useState<Event[]>()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        // eventList = getEventsByUser(user?._id);
        getHighlightedDates();
        console.log("highlightedDates", highlightedDates);
        //eslint-disable-next-line
    },[]);

    useEffect(() => {
        getFilterEvents();
        //eslint-disable-next-line
    }, [selectedDate]);

    const getHighlightedDates = () => {
        const days: {
            date: string;
            textColor: string;
            backgroundColor: string;
        }[] = []
        eventList.forEach((event) => {
            days.push({
                date: formatDate(event.date),
                textColor: 'white',
                backgroundColor: 'var(--ion-color-tertiary)',
            })
        });
        setHighlightedDates(days);
    }

    const getFilterEvents = () => {
        const filteredEvents: Event[] = []
        eventList.forEach((event) => {
            if (event.date.getDate() === selectedDate.getDate() && event.date.getMonth() === selectedDate.getMonth() && event.date.getFullYear() === selectedDate.getFullYear()) {
                filteredEvents.push(event)
            }
        });
        setFilterEvents(filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));
    }

    const leftContent = () => (
        <IonDatetime
            style={{ marginTop: '85px' }}
            min={new Date().toISOString()}
            highlightedDates={highlightedDates}
            value={formatDate(selectedDate)}
            onIonChange={e => e.detail.value && setSelectedDate(new Date(e.detail.value.toString()))}
            presentation='date' />
    )

    const content = (
        <IonList id="event-list" class='ion-margin'>
            <h1>Next Events</h1>
            <div>
                {filterEvents?.map((event, index) => (
                    <EventItemList event={event} key={index} />
                ))}
            </div>
        </IonList>
    );

    return !browsingWeb
        ? <LogoHeaderAppLayout>{content}</LogoHeaderAppLayout>
        : <TwoColumnWebLayout leftContent={leftContent}>{content}</TwoColumnWebLayout>;
};