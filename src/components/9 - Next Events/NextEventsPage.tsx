import LogoHeaderAppLayout from '@components/app/layouts/LogoHeaderAppLayout';
import { useScreen } from '@hooks/useScreen';
import { IonButton, IonDatetime, IonIcon, IonList } from '@ionic/react';
import { Activity } from '@models/Activity';
import { formatDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { EventItemList } from './EventItemList';
import "./EventList.css"
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';
import { Modal } from '@shared/Modal';
import { calendarOutline } from 'ionicons/icons';
import { getWorkerEvents } from '@apis/eventsApi';
import { useAuth } from '@contexts/AuthContexts';

export const NextEventsPage: React.FC = () => {
    const { browsingWeb } = useScreen();
    const [eventList, setEventList] = useState<Activity[]>();
    const [highlightedDates, setHighlightedDates] = useState<{ date: string; textColor: string; backgroundColor: string }[]>()
    const [filterEvents, setFilterEvents] = useState<Activity[]>()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { isMobile } = useScreen();
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();


    const getEventList = async () => {
        user?._id !== undefined && setEventList(await getWorkerEvents(user._id));
    }

    useEffect(() => {
        getEventList();
        //eslint-disable-next-line
    }, [user]);
    useEffect(() => {
        getHighlightedDates();
        //eslint-disable-next-line
    }, [eventList]);

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
        eventList?.forEach((activity) => {
            activity.events?.forEach((event) => {
                days.push({
                    date: formatDate(event.date),
                    textColor: 'white',
                    backgroundColor: 'var(--ion-color-tertiary)',
                })
            });
        });
        setHighlightedDates(days);
    }

    const getFilterEvents = () => {
        const filteredEvents: Activity[] = []
        eventList?.forEach((activity) => {
            activity.events?.forEach((event) => {
                event.date = new Date(event.date);
                    if (event.date.getDate() === selectedDate.getDate() && event.date.getMonth() === selectedDate.getMonth() && event.date.getFullYear() === selectedDate.getFullYear()) {
                        filteredEvents.push(activity)
                    }
                });
        });
        setFilterEvents(filteredEvents.sort((a, b) => a.events && b.events ? a.events[0].date.getTime() - b.events[0].date.getTime():0));
    }

    const leftContent = () => (
        <IonDatetime
            style={{ margin: isMobile ? "auto" : "", marginTop: isMobile ? "0" : '85px', height: isMobile ? "100%" : "", width: isMobile ? "100%" : "", }}
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
            <Modal id="dateTimeOrigin" modal={modal} tittle='OriginDate' isOpen={showModal} setOpen={setShowModal}>
                {leftContent()}
            </Modal>
            <IonButton class="outlined" onClick={() => setShowModal(true)}><IonIcon icon={calendarOutline} class='ion-margin-end' />{formatDate(selectedDate)}</IonButton>
        </>
    );

    const content = (
        <IonList id="event-list" class={isMobile ? 'ion-margin' : ''}>
            <div className="grid"><h1>Next Events</h1>{isMobile && mobileContent()} </div>
            <div>
                {filterEvents?.map((event, index) => (
                    <EventItemList activity={event} key={index} />
                ))}
            </div>
        </IonList>
    );

    return !browsingWeb
        ? <LogoHeaderAppLayout>{content}</LogoHeaderAppLayout>
        : <SearchWebLayout leftMenu={leftContent}>{content}</SearchWebLayout>;
};