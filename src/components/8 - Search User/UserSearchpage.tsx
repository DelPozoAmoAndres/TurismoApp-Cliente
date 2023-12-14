import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Ionic components */
/* Apis */
import { getUserList } from '@apis/adminUserApi';
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { UserList } from '@search-user/List/UserList';
import { UserFiltersView } from './Filters/UserFiltersView';
/* Styles */
import "@shared/SearchPage.css";
/* Layouts */
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';
import BackHeaderAppLayout from '@components/app/layouts/BackHeaderAppLayout';

const UserSearchPage: React.FC<RouteComponentProps> = () => {
  const { setSearchText, handleFilter, filters, items } = useSearch(getUserList, { country: null, role: null});
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions

  const leftMenu = (modal? : React.RefObject<HTMLIonModalElement>) => <UserFiltersView filters={filters} applyFilters={(filters) => { handleFilter(filters); modal?.current?.dismiss(); }} />;
  const content = (
        <UserList setSearchText={setSearchText} items={items} numFilters={Object.values(filters).filter((v) => v !== null).length} />
  );
  return !browsingWeb ? <BackHeaderAppLayout>{content}</BackHeaderAppLayout> : <SearchWebLayout leftMenu={ leftMenu  }>{content}</SearchWebLayout>;
};

export default UserSearchPage;
