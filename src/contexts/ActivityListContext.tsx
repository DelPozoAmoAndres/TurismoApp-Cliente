import { Activity } from '@models/Activity';
import { ActivityListContextType } from '@models/ActivityListContextType';
import React, { createContext, useContext, useEffect, useState} from 'react';

const defaultActivityListContext = {
    activities: [],
    sort:1,
    addActivities: (activities: Activity[]) => {console.log(activities)},
    removeActivity: (id: string) => {console.log(id)},
    updateActivities: (activities: Activity[]) => {console.log(activities)},
    setSort: (sort: number) => {console.log(sort)}
};

const ActivityContext = createContext<ActivityListContextType>(defaultActivityListContext);

export const useActivityList = ()=> useContext(ActivityContext);

interface Props {
    children: React.ReactNode;
}

// Proveedor del contexto
const ActivityListProvider: React.FC<Props> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [sort, setSort] = useState<number>(1);

    const addActivities = (activities: Activity[]) => {
        setActivities(prevActivities => [...prevActivities, ...activities]);
    };

    const removeActivity = (id: string) => {
        setActivities(prevActivities => prevActivities.filter(activity => activity._id !== id));
    };

    const updateActivities = (newActivities: Activity[]) => {
        getSortedActivities(newActivities, sort); 
    };

    useEffect(() => {
       updateActivities(activities);
         // eslint-disable-next-line
    }, [sort]);

    const getSortedActivities = (activities: Activity[], sort: number) => {
        let list : Activity[] = activities;
        switch (sort) {
          case 1:
            list = activities.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 2:
            list = activities.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 3:
            list = activities.sort((a, b) => {
              const lowestPriceA = a.events?.reduce((min, event) => event.price < min ? event.price : min, Number.MAX_VALUE);
              const lowestPriceB = b.events?.reduce((min, event) => event.price < min ? event.price : min, Number.MAX_VALUE);
      
              // Ordena en orden descendente
              return lowestPriceB && lowestPriceA ? lowestPriceB - lowestPriceA : 0;
            });
            break;
          case 4:
            list = activities.sort((a, b) => {
              const lowestPriceA = a.events?.reduce((min, event) => event.price < min ? event.price : min, Number.MAX_VALUE);
              const lowestPriceB = b.events?.reduce((min, event) => event.price < min ? event.price : min, Number.MAX_VALUE);
      
              // Ordena en orden ascendente
              return lowestPriceA && lowestPriceB ? lowestPriceA - lowestPriceB : 0;
            });
            break;
        }
        setActivities ([...list]);
      }

    return (
        <ActivityContext.Provider value={{ activities,sort, addActivities, removeActivity, updateActivities, setSort}}>
            {children}
        </ActivityContext.Provider>
    );
};

export default ActivityListProvider;
