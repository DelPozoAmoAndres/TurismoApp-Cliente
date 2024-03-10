import React from 'react';
/* Ionic components */
import { IonButton, IonIcon, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { Role } from '@models/User';
import { addOutline } from 'ionicons/icons';
import { useScreen } from '@hooks/useScreen';
import { Event } from '@models/Activity';
import { EventModal } from './EventModal';

export const EventSortSelect: React.FC<{activityId:string}> = ({activityId}) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  return (
    <IonRow class="ion-justify-content-between">
      <IonSelect
        style={{
          width: auth.user?.role === Role.administrador && !isMobile ? 'auto' : '100%',
        }}
        value={1}
        label={t('sort.by') || ''}
        labelPlacement="start"
      >
        <IonSelectOption value={1}>{t('sort.date.asc')}</IonSelectOption>
        <IonSelectOption value={2}>{t('sort.date.des')}</IonSelectOption>
        <IonSelectOption value={3}>{t('sort.price.asc')}</IonSelectOption>
        <IonSelectOption value={4}>{t('sort.price.des')}</IonSelectOption>
      </IonSelect>
      {!isMobile && (
        <IonButton id="add">
          <IonIcon icon={addOutline} />
          {t('event.add')}
        </IonButton>
      )}
      <EventModal activity={activityId} event={new Event()} action="add" />
    </IonRow>
  );
};
