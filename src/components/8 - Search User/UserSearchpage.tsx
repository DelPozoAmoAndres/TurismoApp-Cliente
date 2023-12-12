import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Ionic components */
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
/* Apis */
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { AppPage } from '@pages/AppPage';
import { Modal } from '@shared/Modal';
/* Styles */
import "@shared/SearchPage.css";
/* i18n */
import { useTranslation } from 'react-i18next';
import { getUserList } from '@apis/adminUserApi';
import { UserList } from '@search-user/List/UserList';
import { UserFiltersView } from './Filters/UserFiltersView';

const UserSearchPage: React.FC<RouteComponentProps> = () => {
  const { setSearchText, handleFilter, filters, items } = useSearch(getUserList, {
    country: null,
    role: null,
  });
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { isMobile, browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it

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
    <div id="activity-search-page">
      {!isMobile ?
        <UserFiltersView filters={filters} applyFilters={handleFilter} />
      :     
        <Modal
          id="modal-filters"
          minWidthAndroid={490}
          minWidthIos={540}
          modal={modal}
          trigger="filters-modal"
          tittle={t('filtersToApply.title')}
        >
          <UserFiltersView
            filters={filters}
            applyFilters={(filters: Record<string, unknown>) => {
              handleFilter(filters);
              modal.current?.dismiss();
            }}
          />
        </Modal>}
      <IonContent>
        <UserList setSearchText={setSearchText} items={items} numFilters={Object.values(filters).filter((v) => v !== null).length} />
      </IonContent>

    </div>
  );
  return !browsingWeb ? (
    <AppPage>
      {header}
      {content}
    </AppPage>
  ) : (
    <>{content}</>
  );
};

export default UserSearchPage;
