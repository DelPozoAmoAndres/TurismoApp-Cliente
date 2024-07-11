import { useEffect, useState } from 'react';
import { getEvents } from '../apis/activityApi';
import { formatDate } from '@utils/Utils';
import { Event } from '../models/Activity';

export const useActivityAvailability = (activityId: string) => {
  const [highlightedDates, setHighlightedDates] = useState<{ date: string; textColor: string; backgroundColor: string }[]>([]); //Days with events available
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); //Day used to display the events of that day
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]); //List of the events whose date is the selectedDate
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); //Event selected for the reservation
  const [events, setEvents] = useState<Event[] | null>(null); //List of all the events of the activity
  const [numPersons, setNumPersons] = useState<number>(1); //Number of persons for the reservation

  const handleDateChange = (date: Date | null) => {
    //Method to handle when de date selected in the calendar change
    setSelectedDate(date);
    setSelectedEvent(null);
    if (!date) return setSelectedEvents([]);
    const selectedEvents = events?.filter((event) => formatDate(event.date) === formatDate(date));
    if (selectedEvents) {
      setSelectedEvents(selectedEvents);
    } else
      setSelectedEvents([]);
  };

  useEffect(() => {
    handleDateChange(selectedDate)
    //eslint-disable-next-line
  }, [events]);

  useEffect(() => {
    getEvents(activityId).then((events: Event[]) => {
      if (!events) return;
      events = events.filter((event) => event.seats - (event.bookedSeats ? event.bookedSeats : 0) >= numPersons);
      setEvents(events);
      const days: {
        date: string;
        textColor: string;
        backgroundColor: string;
      }[] = [];
      events.forEach((event) =>
        days.push({
          date: formatDate(event.date),
          textColor: 'var(--ion-color-light)',
          backgroundColor: 'var(--ion-color-dark)',
        })
      );

      setHighlightedDates(days);
    });
  }, [activityId, numPersons]);
  return {
    highlightedDates,
    selectedDate,
    selectedEvent,
    selectedEvents,
    numPersons,
    events,
    setNumPersons,
    handleDateChange,
    setSelectedEvent,
  };
};
