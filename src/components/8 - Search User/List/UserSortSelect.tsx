import React from 'react';
/* Ionic components */
import { IonButton, IonIcon, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { Role, User } from '@models/User';
import { addOutline } from 'ionicons/icons';
import { useScreen } from '@hooks/useScreen';
import { UserModal } from '@search-user/Edit Modal/UserModal';

export const UserSortSelect: React.FC = () => {
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
        <IonSelectOption value={1}>{t('sort.name.asc')}</IonSelectOption>
        <IonSelectOption value={2}>{t('sort.name.des')}</IonSelectOption>
        <IonSelectOption value={3}>{t('sort.accounte.age.asc')}</IonSelectOption>
        <IonSelectOption value={4}>{t('sort.account.age.des')}</IonSelectOption>
      </IonSelect>
      {!isMobile && auth.user?.role === Role.administrador && (
        <IonButton id="add">
          <IonIcon icon={addOutline} />
          {t('user.add')}
        </IonButton>
      )}
      <UserModal user={new User()} action='add'/>
    </IonRow>
  );
};
