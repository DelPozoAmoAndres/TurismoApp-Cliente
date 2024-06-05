import { useEffect, useState } from 'react';
import { getPopular } from '../apis/activityApi';
import { Activity } from '../models/Activity';

export const usePopular = () => {
  const [actividades, setActividades] = useState<Activity[]>([]);

  useEffect(() => {
    getPopular().then((data) => {
      setActividades(data);
    });
  }, []);

  return { actividades };
};
