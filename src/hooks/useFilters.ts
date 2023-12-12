import { useEffect, useState } from 'react';
import { UserFilter } from '../models/User';
import { ActivityFilter } from '../models/Activity';

export const useFilters = (applyFilters: (arg0: UserFilter|ActivityFilter) => void, filters?: Record<string,unknown>) => {
  const defaultFilters = {};
  const [filtersToApply, setFilters] = useState<Record<string,unknown>>(filters ? filters : defaultFilters);
  const [newFilters, setNewFilters] = useState<boolean>(false);

  useEffect(() => {
    filters && Object.values(filters).filter((value) => value !== null).length > 0 && setNewFilters(true);
  }, [filters]);

  const clearFilters = () => {
    applyFilters(defaultFilters);
    setFilters(defaultFilters);
    setNewFilters(false);
  };

  const confirmFilters = () => {
    applyFilters(filtersToApply);
    setNewFilters(JSON.stringify(filtersToApply) !== JSON.stringify(defaultFilters));
  };

  const handleFilters = (value: unknown, filterName: string) => {
    const filtersCopy = { ...filtersToApply, [filterName]: value };
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
