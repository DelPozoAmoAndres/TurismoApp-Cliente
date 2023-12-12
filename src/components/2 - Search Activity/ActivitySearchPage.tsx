import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Ionic components */
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
/* Apis */
import { getActivityList } from '@apis/activityApi';
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { ActivityFiltersView } from '@search-activity/Filters/ActivityFiltersView';
import { ActivityList } from '@search-activity/List/ActivityList';
import { AppPage } from '@pages/AppPage';
import { Modal } from '@shared/Modal';
/* Styles */
import "@shared/SearchPage.css"
/* i18n */
import { useTranslation } from 'react-i18next';
import { ActivityFilter } from '@models/Activity';
import PageTemplate from '@components/web/PageTemplate';

const ActivitySearchPage: React.FC<RouteComponentProps> = () => {
  const defaultFilters: ActivityFilter = {}
  const { setSearchText, handleFilter, filters, items } = useSearch(getActivityList, defaultFilters);
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
    
      <div id="activity-search-page" className='limits-content'>
        {!isMobile ? (
          <ActivityFiltersView filters={filters} applyFilters={handleFilter} />
        ) : (
          <Modal
            id="modal-filters"
            minWidthAndroid={Infinity}
            minWidthIos={Infinity}
            modal={modal}
            trigger="filters-modal"
            tittle={t('filters.title')}
          >
            <ActivityFiltersView
              filters={filters}
              applyFilters={(filters: ActivityFilter) => {
                handleFilter(filters);
                modal.current?.dismiss();
              }}
            />
          </Modal>
        )}

        {!browsingWeb && header}
        <ActivityList setSearchText={setSearchText} items={items} numFilters={Object.values(filters).filter((v) => v !== null).length} />
      </div>
  );
  return !browsingWeb ? (
    <AppPage>
      {content}
    </AppPage>
  ) : (
    <PageTemplate>{content}</PageTemplate>
  );
};

export default ActivitySearchPage;
