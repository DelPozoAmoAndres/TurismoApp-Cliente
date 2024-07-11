import { useScreen } from '@hooks/useScreen';
import { Event } from '@models/Activity';
import { formatDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { EventItemList } from './EventItemList';
import "./EventList.css";
import { getWorkerEvents } from '@apis/eventsApi';
import { useAuth } from '@contexts/AuthContexts';
import ScheduleWebLayout from '@components/web/layouts/ScheduleWebLayout';
import ScheduleAppLayout from '@components/app/layouts/ScheduleAppLayout';
import { useTranslation } from 'react-i18next';

export const NextEventsPage: React.FC = () => {
    const [eventList, setEventList] = useState<Event[]>();
    const [highlightedDates, setHighlightedDates] = useState<{ date: string; textColor: string; backgroundColor: string }[]>([])
    const [filterEvents, setFilterEvents] = useState<Event[]>()
    const { browsingWeb } = useScreen();
    const { user } = useAuth();
    const { t } = useTranslation();

    const getEventList = async () => {
        user?._id !== undefined && getWorkerEvents(user._id).then(e => setEventList(e));
    }

    useEffect(() => {
        getEventList();
        //eslint-disable-next-line
    }, [user]);
    useEffect(() => {
        getHighlightedDates();
        //eslint-disable-next-line
    }, [eventList]);

    const getHighlightedDates = () => {
        const days: {
            date: string;
            textColor: string;
            backgroundColor: string;
        }[] = []
        eventList?.forEach((e) => {
            days.push({
                date: formatDate(e.date),
                textColor: 'var(--ion-color-light)',
                backgroundColor: 'var(--ion-color-dark)',
            })
        });
        setHighlightedDates(days);
    }

    const getFilterEvents = (selectedDate: Date) => {
        const filteredEvents: Event[] = []
        eventList?.forEach((e) => {
            e.date = new Date(e.date);
            if (e.date.getDate() === selectedDate.getDate() && e.date.getMonth() === selectedDate.getMonth() && e.date.getFullYear() === selectedDate.getFullYear()) {
                filteredEvents.push(e)
            }
        });
        setFilterEvents(filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));
    }

    const content = (
        <div>
            {filterEvents?.map((event, index) => (
                <EventItemList event={event} key={index} />
            ))}
        </div>
    );

    return !browsingWeb
        ? <ScheduleAppLayout header={<h1 style={{ margin: "auto" }}>{t('NEXTEVENTS.TITLE')}</h1>} highlightedDates={highlightedDates} getItemList={getFilterEvents}>{content}</ScheduleAppLayout>
        : <ScheduleWebLayout header={<h1>{t('NEXTEVENTS.TITLE')}</h1>} highlightedDates={highlightedDates} getItemList={getFilterEvents}>{content}</ScheduleWebLayout>;
};