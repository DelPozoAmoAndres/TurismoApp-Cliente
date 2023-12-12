import { useEffect, useState } from 'react';
import { Event } from '../models/Activity';

export const useSoldOut = (events: Event[]| undefined) => {
  /* Internal states */
  const [soldOutProps, setSoldOut] = useState({}); //Variable to change the state of the availability button

  useEffect(() => {
    const style = { opacity: '1' };
    const disabled = true;
    const color = 'medium';
    const props = { style, disabled, color }; //Props with disabled state for the availability button

    setSoldOut(!events || (events && events.length == 0) ? props : {});
  }, [events]);

  return { soldOutProps };
};
