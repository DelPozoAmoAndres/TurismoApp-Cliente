import React from 'react';
/* Ionic components */
import { IonRow, IonSelect, IonSelectOption } from '@ionic/react';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { Role } from '@models/User';
import { ActivityModal } from '@components/Admin/Activities/Modal/ActivityModal';
import { Activity } from '@models/Activity';
import { useActivityList } from '@contexts/ActivityListContext';

export const ActivitySortSelect: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { sort, setSort } = useActivityList(); //Context of the activities

  return (
    <IonRow class="ion-justify-content-between">
      <IonSelect
        style={{
          width: '100%',
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
      {auth.user?.role == Role.administrador && <ActivityModal activity={new Activity()} action="add" />}
    </IonRow>
  );
};


