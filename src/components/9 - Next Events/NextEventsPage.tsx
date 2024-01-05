import LogoHeaderAppLayout from '@components/app/layouts/LogoHeaderAppLayout';
import { useScreen } from '@hooks/useScreen';
import { IonButton, IonDatetime, IonIcon, IonList } from '@ionic/react';
import { Event } from '@models/Activity';
import { formatDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { EventItemList } from './EventItemList';
import "./EventList.css"
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';
import { Modal } from '@shared/Modal';
import { calendarOutline } from 'ionicons/icons';

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
    const { isMobile } = useScreen();
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // eventList = getEventsByUser(user?._id);
        getHighlightedDates();
        console.log("highlightedDates", highlightedDates);
        //eslint-disable-next-line
    }, []);

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
            style={{  margin:isMobile?"auto":"",marginTop: isMobile?"0":'85px', height: isMobile?"100%":"", width: isMobile?"100%":"",}}
            class='sticky'
            // min={new Date().toISOString()}
            highlightedDates={highlightedDates}
            value={formatDate(selectedDate)}
            onIonChange={e => e.detail.value && setSelectedDate(new Date(e.detail.value.toString()))}
            presentation='date'
            showDefaultButtons={isMobile} />
    )

    const mobileContent = () => (
        <>
            <Modal id="dateTimeOrigin" modal={modal} minWidthAndroid={0} minWidthIos={0} tittle='OriginDate' isOpen={showModal} setOpen={setShowModal}>
                {leftContent()}
            </Modal>
            <IonButton class="outlined" onClick={() => setShowModal(true)}><IonIcon icon={calendarOutline} class='ion-margin-end' />{formatDate(selectedDate)}</IonButton>
        </>
    );

    const content = (
        <IonList id="event-list" class={isMobile ? 'ion-margin' : ''}>
            <div className ="grid"><h1>Next Events</h1>{isMobile && mobileContent()} </div>
            <div>
                {filterEvents?.map((event, index) => (
                    <EventItemList event={event} key={index} />
                ))}
            </div>
        </IonList>
    );

    return !browsingWeb
        ? <LogoHeaderAppLayout>{content}</LogoHeaderAppLayout>
        : <SearchWebLayout leftMenu={leftContent}>{content}</SearchWebLayout>;
};