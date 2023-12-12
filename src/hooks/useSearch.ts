import { useState, useEffect } from 'react';

export const useSearch = (getList: (arg0: string, arg1: any) => Promise<[]>, filterScheme: any) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filters, setFilters] = useState(filterScheme);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        setItems(await getList(searchText, filters));
      } catch (error) {
        console.error(error);
      }
    };

    cargarServicios();
  }, [searchText, filters, getList]);

  const handleFilter = (filters: any) => {
    setFilters(filters);
  };

  return { handleFilter, setSearchText, items, filters };
};
