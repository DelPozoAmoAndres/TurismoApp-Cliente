import React from 'react';
/* Ionic components */
import { IonButton, IonIcon, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { Role } from '@models/User';
import { addOutline } from 'ionicons/icons';
import { useScreen } from '@hooks/useScreen';
import { ActivityModal } from '@components/2 - Search Activity/Modal/ActivityModal';
import { Activity } from '@models/Activity';
import { useActivityList } from '@contexts/ActivityListContext';

export const ActivitySortSelect: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const { sort, setSort} = useActivityList(); //Context of the activities

  return (
    <IonRow class="ion-justify-content-between">
      <IonSelect
        style={{
          width: auth.user?.role === Role.administrador && !isMobile ? 'auto' : '100%',
        }}
        value={sort}
        label={t('sort.by') || ''}
        labelPlacement="start"
        onIonChange={(e) => { setSort(e.detail.value) }}
      >
        <IonSelectOption value={1}>{t('sort.name.asc')}</IonSelectOption>
        <IonSelectOption value={2}>{t('sort.name.des')}</IonSelectOption>
        <IonSelectOption value={3}>{t('sort.price.asc')}</IonSelectOption>
        <IonSelectOption value={4}>{t('sort.price.des')}</IonSelectOption>
      </IonSelect>
      {!isMobile && auth.user?.role == Role.administrador && (
        <IonButton id="add">
          <IonIcon icon={addOutline} />
          {t('activity.add')}
        </IonButton>
      )}
      {auth.user?.role == Role.administrador && <ActivityModal activity={new Activity()} action="add" />}
    </IonRow>
  );
};


