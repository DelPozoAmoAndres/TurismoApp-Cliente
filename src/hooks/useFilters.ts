import { useContext, useEffect, useState } from 'react';
import { UserFilter } from '../models/User';
import { ActivityFilter } from '../models/Activity';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const useFilters = (applyFilters: (arg0: UserFilter | ActivityFilter) => void, defaultFilters: Record<string, unknown>, filters?: Record<string, unknown>) => {
  const [filtersToApply, setFilters] = useState<Record<string, unknown>>(filters ? filters : defaultFilters);
  const [newFilters, setNewFilters] = useState<boolean>(false);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    filters && Object.entries(filters).some(([key, value]) => defaultFilters[key as keyof typeof defaultFilters] !== value && value !== null) && setNewFilters(true);
    //eslint-disable-next-line
  }, [filters]);

  const clearFilters = () => {
    applyFilters(defaultFilters);
    setFilters(defaultFilters);
    setNewFilters(false);
    showNotification('Eliminados todos los filtros');
  };

  const confirmFilters = () => {
    applyFilters(filtersToApply);
    setNewFilters(JSON.stringify(filtersToApply) !== JSON.stringify(defaultFilters));
    showNotification('Aplicados nuevos filtros');
  };

  const handleFilters = (value: unknown, filterName: string, type?: 'multiple') => {
    const filterNames = filterName.split(" ");
    let filtersCopy = { ...filtersToApply };
    filterNames.forEach((name) => {
      if (type === 'multiple') {
        if (filtersCopy[name] === null || filtersCopy[name] === undefined) {
          filtersCopy = { ...filtersCopy, [name]: new Set().add(value) };
        } else {
          if ((filtersCopy[name] as Set<any>).has(value)) {
            (filtersCopy[name] as Set<any>).delete(value);
            if ((filtersCopy[name] as Set<any>).size === 0) {
              filtersCopy = { ...filtersCopy, [name]: null };
            }
          } else {
            filtersCopy = { ...filtersCopy, [name]: (filtersCopy[name] as Set<any>).add(value) };
          }
        }
      } else {
        filtersCopy = { ...filtersCopy, [name]: value };
      }
    });
    setFilters(filtersCopy);
  };

  return {
    handleFilters,
    confirmFilters,
    clearFilters,
    filtersToApply,
    newFilters,
  };
};
