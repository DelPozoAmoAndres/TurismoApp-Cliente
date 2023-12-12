import React from 'react';
import { User } from '@models/User';
import { useTranslation } from 'react-i18next';
import { useScreen } from '@hooks/useScreen';
import { IonButton, IonItem, IonList, IonSearchbar } from '@ionic/react';
import "@shared/List.css";
import { UserItem } from '@search-user/List/UserItem';
import { UserSortSelect } from '@search-user/List/UserSortSelect';
export const UserList : React.FC<{
    items: User[];
    setSearchText: (arg0: string) => void;
    numFilters: number;
  }> = ({ items, setSearchText, numFilters }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  return (
    <div id="activity-list">
      <section>
        <IonSearchbar
          mode="ios"
          placeholder={t('search.user.placeholder') || ''}
          debounce={500}
          onIonInput={(e) => setSearchText(e.detail.value || '')}
        />
        <UserSortSelect />
      </section>
      {items?.length > 0 && (
        <IonList>
          {items.map((user, index) => (
            <UserItem key={'User' + index} user={user}/>
          ))}
        </IonList>
      )}
      {isMobile && (
        <footer>
          <IonItem lines="none">
            <IonButton id="filters-modal" style={{ width: '100%' }} expand="block" size="default">
              {numFilters > 0 ? t('filters.applied') + ` (${numFilters})` : t('filters.add')}
            </IonButton>
          </IonItem>
        </footer>
      )}
    </div>
  )
}
