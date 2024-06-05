import { useState, useEffect } from 'react';

export const useSearch = (getList: (arg0: string, arg1: any) => Promise<[]>, filterScheme: any) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filters, setFilters] = useState(filterScheme);
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | 'none' }>({ key: '', direction: 'none' });
  const [forced, setForceUpdate] = useState(false);

  const handleSort = (key: string) => {
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      setSortConfig({ key, direction: 'descending' });
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig({ key, direction: 'none' });
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const list = (await getList(searchText, filters)).sort((a, b) => {
          if (sortConfig.direction === 'none') return 0;

          let aValue: any = a[sortConfig.key];
          let bValue: any = b[sortConfig.key];

          // Determinar el tipo de los valores (numérico, booleano o de texto)
          const isNumeric = typeof aValue === 'number' && typeof bValue === 'number';
          const isBoolean = typeof aValue === 'boolean' && typeof bValue === 'boolean';

          if (isBoolean) {
            return sortConfig.direction === 'ascending'
              ? (aValue === bValue ? 0 : aValue ? 1 : -1)
              : (aValue === bValue ? 0 : aValue ? -1 : 1);
          }
          if (!isNumeric) {
            aValue = String(aValue);
            bValue = String(bValue);
            return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
          return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;

        });
        setItems(list);
        setForceUpdate(false);
      } catch (error) {
        console.error(error);
      }
    };

    cargarServicios();
  }, [searchText, filters, getList, sortConfig.direction, sortConfig.key, forced]);

  const handleFilter = (filters: any) => {
    setFilters(filters);
  };

  return { handleFilter, setSearchText, forced, items, filters, handleSort, sortConfig, setForceUpdate };
};
