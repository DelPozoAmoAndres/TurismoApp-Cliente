import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Ionic components */
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
/* Apis */
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { AppPage } from '@pages/AppPage';
/* Styles */
import "@shared/SearchPage.css";
/* i18n */
import { useTranslation } from 'react-i18next';
import { getUserList } from '@apis/adminUserApi';
import { UserList } from '@search-user/List/UserList';
import { UserFiltersView } from './Filters/UserFiltersView';
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';

const UserSearchPage: React.FC<RouteComponentProps> = () => {
  const { setSearchText, handleFilter, filters, items } = useSearch(getUserList, {
    country: null,
    role: null,
  });
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions


  const header = (
    <IonHeader mode="ios" collapse="fade" class="ion-no-border sticky">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text={t('go.back')} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );

  const content = (
        <UserList setSearchText={setSearchText} items={items} numFilters={Object.values(filters).filter((v) => v !== null).length} />
  );
  return !browsingWeb ? (
    <AppPage>
      {header}
      {content}
    </AppPage>
  ) : (
    <SearchWebLayout 
      leftMenu={
        <UserFiltersView
          filters={filters}
          applyFilters={(filters: Record<string, unknown>) => {
            handleFilter(filters);
            // modal.current?.dismiss();
          }}
        />
      }>
      {content}
      </SearchWebLayout>
  );
};

export default UserSearchPage;
