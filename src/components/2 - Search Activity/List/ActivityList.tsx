import React, { useEffect } from 'react';
/* Ionic components */
import { IonButton, IonList, IonSearchbar } from '@ionic/react';
/* Components */
import { ActivityItem } from '@search-activity/List/ActivityItem';
import { ActivitySortSelect } from './ActivitySortSelect';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Models */
import { Activity } from '@models/Activity';
/* Stles */
import "@shared/List.css";
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityList: React.FC<{
  items: Activity[];
  setSearchText: (arg0: string) => void;
  numFilters: number;
}> = ({ items, setSearchText, numFilters }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const searchBar = React.useRef<HTMLIonSearchbarElement>(null);

  useEffect(() => {
    searchBar.current?.setFocus();
  }, [searchBar,items]);
  
  return (
    <div id="activity-list">
      <section>
        <IonSearchbar
          mode="ios"
          ref={searchBar}
          placeholder={t('search.activity.placeholder') || ''}
          debounce={500}
          onIonInput={(e) => setSearchText(e.detail.value || '')}
        />
        <ActivitySortSelect />
      </section>
      <IonList class='ion-no-padding'>
        {items?.map((activity, index) => (
          <ActivityItem key={'Activity' + index} activity={activity} />
        ))}
        {isMobile && (
          <IonButton class='sticky' id="filters-modal" style={{ width: '100%' }} expand="block" size="default">
            {numFilters > 0 ? t('filters.applied') + ` (${numFilters})` : t('filters.add')}
          </IonButton>
        )}
      </IonList>
    </div>
  );
};
