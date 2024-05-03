import { useContext, useEffect, useState } from 'react';
import { UserFilter } from '../models/User';
import { ActivityFilter } from '../models/Activity';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const useFilters = (applyFilters: (arg0: UserFilter | ActivityFilter) => void, filters?: Record<string, unknown>) => {
  const defaultFilters = {};
  const [filtersToApply, setFilters] = useState<Record<string, unknown>>(filters ? filters : defaultFilters);
  const [newFilters, setNewFilters] = useState<boolean>(false);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    filters && Object.values(filters).filter((value) => value !== null).length > 0 && setNewFilters(true);
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

  const handleFilters = (value: unknown, filterName: string) => {
    const filterNames = filterName.split(" ");
    let filtersCopy = { ...filtersToApply };
    filterNames.forEach((name) => {
      filtersCopy = { ...filtersCopy, [name]: value };
    })
    console.log(filtersCopy);
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
