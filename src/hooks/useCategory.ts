import { useEffect, useState } from 'react';
import { getActivityList } from '../apis/activityApi';
import { Activity } from '../models/Activity';

export const useCategory = () => {
  const [actividades, setActividades] = useState<{
    populars: Activity[];
    mountain: Activity[];
    beach: Activity[];
  }>({ populars: [], mountain: [], beach: [] });
  const categories = {
    populares: actividades.populars,
    montaña: actividades.mountain,
    playa: actividades.beach,
  };
  useEffect(() => {
    getActivityList("",{})
      .then((list) =>
        setActividades({
          populars: [...list,],
          mountain: [...list],
          beach: [...list],
        })
      )
      .catch((error) => console.error(error));
  }, []);

  return { categories };
};
