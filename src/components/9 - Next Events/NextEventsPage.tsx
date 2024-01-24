import LogoHeaderAppLayout from '@components/app/layouts/LogoHeaderAppLayout';
import { useScreen } from '@hooks/useScreen';
import { Activity } from '@models/Activity';
import { formatDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { EventItemList } from './EventItemList';
import "./EventList.css"
import { getWorkerEvents } from '@apis/eventsApi';
import { useAuth } from '@contexts/AuthContexts';
import ScheduleWebLayout from '@components/web/layouts/ScheduleWebLayout';

export const NextEventsPage: React.FC = () => {
    const [eventList, setEventList] = useState<Activity[]>();
    const [highlightedDates, setHighlightedDates] = useState<{ date: string; textColor: string; backgroundColor: string }[]>([])
    const [filterEvents, setFilterEvents] = useState<Activity[]>()
    const { browsingWeb } = useScreen();
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

    const getFilterEvents = (selectedDate : Date) => {
        const filteredEvents: Activity[] = []
        eventList?.forEach((activity) => {
            activity.events?.forEach((event) => {
                event.date = new Date(event.date);
                if (event.date.getDate() === selectedDate.getDate() && event.date.getMonth() === selectedDate.getMonth() && event.date.getFullYear() === selectedDate.getFullYear()) {
                    filteredEvents.push(activity)
                }
            });
        });
        setFilterEvents(filteredEvents.sort((a, b) => a.events && b.events ? a.events[0].date.getTime() - b.events[0].date.getTime() : 0));
    }

    const content = (
        <div>
            {filterEvents?.map((event, index) => (
                <EventItemList activity={event} key={index} />
            ))}
        </div>
    );

    return !browsingWeb
        ? <LogoHeaderAppLayout>{content}</LogoHeaderAppLayout>
        : <ScheduleWebLayout header={<h1>Next Events</h1>} highlightedDates={highlightedDates} getItemList={getFilterEvents}>{content}</ScheduleWebLayout>;
};