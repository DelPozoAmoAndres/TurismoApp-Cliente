import { useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import { getActivity } from '../apis/activityApi';

export const useActivityData = (activityId: string) => {
  const [activityData, setActivityData] = useState<Activity | null>(null); // All the data of the activity
  useEffect(() => {
    getActivity(activityId).then((data: Activity) => {
      setActivityData(data);
    });
  }, [activityId]);
  return { activityData };
};
