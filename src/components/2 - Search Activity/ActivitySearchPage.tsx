import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Apis */
import { getActivityList, maxPrice } from '@apis/activityApi';
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { ActivityFiltersView } from '@search-activity/Filters/ActivityFiltersView';
import { ActivityList } from '@search-activity/List/ActivityList';
/* Styles */
import "@shared/SearchPage.css";
/* i18n */
import { ActivityFilter } from '@models/Activity';
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';
import BackHeaderAppLayout from '@components/app/layouts/BackHeaderAppLayout';
import { useActivityList } from '@contexts/ActivityListContext';

const ActivitySearchPage: React.FC<RouteComponentProps> = () => {
  const [defaultFilters, setDefaultFilters] = useState<ActivityFilter>({ numPersons: 1 });
  const { setSearchText, handleFilter, filters, items } = useSearch(getActivityList, defaultFilters);
  const { updateActivities } = useActivityList(); //Context of the activities
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions

  useEffect(() => {
    maxPrice().then((res) => {
      setDefaultFilters({ ...defaultFilters, price: res });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateActivities(items);
    // eslint-disable-next-line
  }, [items]);

  const leftMenu = (modal?: React.RefObject<HTMLIonModalElement>) => <ActivityFiltersView filters={filters} defaultFilters={defaultFilters} applyFilters={(filters: ActivityFilter) => { handleFilter(filters); modal?.current?.dismiss(); }} />
  const content = <ActivityList setSearchText={setSearchText} leftMenu={leftMenu} numFilters={Object.entries(filters).filter(([key, value]) => defaultFilters[key as keyof typeof defaultFilters] !== value && value !== null).length} />;

  return !browsingWeb ? <BackHeaderAppLayout> {content} </BackHeaderAppLayout> : <SearchWebLayout leftMenu={leftMenu}> {content} </SearchWebLayout>;
};

export default ActivitySearchPage;
