import React, { useEffect, useRef } from 'react';
/* Ionic components */
import { IonButton, IonList, IonSearchbar } from '@ionic/react';
/* Components */
import { ActivityItem } from '@search-activity/List/ActivityItem';
import { ActivitySortSelect } from './ActivitySortSelect';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Stles */
import "@shared/List.css";
/* i18n */
import { useTranslation } from 'react-i18next';
import { Modal } from '@shared/Modal';
import { useActivityList } from '@contexts/ActivityListContext';

export const ActivityList: React.FC<{
  setSearchText: (arg0: string) => void;
  numFilters: number;
  leftMenu: (arg0: React.RefObject<HTMLIonModalElement>) => React.ReactNode;
}> = ({ setSearchText, numFilters, leftMenu }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const searchBar = React.useRef<HTMLIonSearchbarElement>(null);
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { activities } = useActivityList();
  useEffect(() => {
    searchBar.current?.setFocus();
  }, [searchBar]);

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
        {activities?.map((activity) => (
          <ActivityItem key={activity._id} activity={activity} />
        ))}
        {isMobile && (
          <>
            <div className='sticky' >
              <IonButton id="filters-modal" style={{ width: '100%' }} expand="block" size="default">
                {numFilters > 0 ? t('filters.applied') + ` (${numFilters})` : t('filters.add')}
              </IonButton>
            </div>
            <Modal id="modal-filters"
              modal={modal}
              trigger="filters-modal"
              title={t('filters.title')}
              minHeightIos={850}
              minHeightAndroid={800}>
              {leftMenu(modal)}
            </Modal>
          </>
        )}
      </IonList>
    </div>
  );
};
