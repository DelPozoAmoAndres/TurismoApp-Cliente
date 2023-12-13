import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
/* Ionic components */
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
/* Apis */
import { getActivityList } from '@apis/activityApi';
/* Hooks */
import { useSearch } from '@hooks/useSearch';
import { useScreen } from '@hooks/useScreen';
/* Components */
import { ActivityFiltersView } from '@search-activity/Filters/ActivityFiltersView';
import { ActivityList } from '@search-activity/List/ActivityList';
import { AppPage } from '@pages/AppPage';
/* Styles */
import "@shared/SearchPage.css"
/* i18n */
import { useTranslation } from 'react-i18next';
import { ActivityFilter } from '@models/Activity';
import SearchWebLayout from '@components/web/layouts/SearchWebLayout';

const ActivitySearchPage: React.FC<RouteComponentProps> = () => {
  const defaultFilters: ActivityFilter = {}
  const { setSearchText, handleFilter, filters, items } = useSearch(getActivityList, defaultFilters);
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

  const content = <ActivityList setSearchText={setSearchText} items={items} numFilters={Object.values(filters).filter((v) => v !== null).length} /> ;
  
  return !browsingWeb ? (
    <AppPage>
      <div id="activity-search-page" className='limits-content'>
        {header}
        {content}
      </div>
    </AppPage>
  ) :
    <SearchWebLayout
      leftMenu={<ActivityFiltersView
        filters={filters}
        applyFilters={(filters: ActivityFilter) => {
          handleFilter(filters);
          // modal.current?.dismiss();
        }} />
      }>
      {content}
    </SearchWebLayout>;
};

export default ActivitySearchPage;
