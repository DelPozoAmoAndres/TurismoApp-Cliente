import { useEffect, useState } from 'react';
import { Activity, ActivityState } from '../models/Activity';

export const useSoldOut = (activity: Activity | undefined) => {
  /* Internal states */
  const [soldOutProps, setSoldOut] = useState({}); //Variable to change the state of the availability button

  useEffect(() => {
    const style = { opacity: '1' };
    const disabled = true;
    const color = 'medium';
    const props = { style, disabled, color }; //Props with disabled state for the availability button

    setSoldOut(!activity || activity && activity.state==ActivityState['temporaly-closed'] || (activity.events && activity.events.length == 0) ? props : {});
  }, [activity]);

  return { soldOutProps };
};
