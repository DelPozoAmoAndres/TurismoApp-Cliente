import React from 'react';
/* Ionic components */
import { IonButton, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/react';
import { logOutOutline, pencilOutline } from 'ionicons/icons';
/* Contexts */
import { useAuth } from '@contexts/AuthContexts';
/* Components */
import { UserModal } from '@components/Admin/Users/Modal/UserModal';
/* i18n */
import { useTranslation } from 'react-i18next';

export const PersonalData = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  return (
    <IonGrid style={{ width: '100%' }}>
      <IonRow>
        <h2>
          <strong>{t('personal.data.title')}</strong>
        </h2>
      </IonRow>
      <IonRow class="ion-justify-content-between">
        <section style={{ width: '100%' }}>
          <IonRow class="ion-justify-content-between ion-margin-vertical">
            <IonLabel>{t('personal.data.email') + ':'}</IonLabel>
            <IonLabel>{auth.user?.email}</IonLabel>
          </IonRow>
          <IonRow class="ion-justify-content-between ion-margin-vertical">
            <IonLabel>{t('personal.data.telephone') + ':'}</IonLabel>
            <IonLabel>{auth.user?.telephone ? String(auth.user?.telephone) : t('personal.data.unknown')}</IonLabel>
          </IonRow>
          <IonRow class="ion-justify-content-between ion-margin-vertical">
            <IonLabel>{t('personal.data.country') + ':'}</IonLabel>
            <IonLabel>{auth.user?.country ? auth.user?.country : t('personal.data.unknown')}</IonLabel>
          </IonRow>
        </section>
        <section style={{ width: '100%' }}>
          <IonRow>
            <IonButton id={auth.user?._id} style={{ width: '100%' }} expand="block">
              <IonIcon slot="start" icon={pencilOutline} />
              {t('personal.data.modify')}
            </IonButton>
          </IonRow>
          <IonRow>
            <IonButton color={'danger'} style={{ width: '100%' }} expand="block" onClick={() => auth.logout()}>
              <IonIcon slot="start" icon={logOutOutline} />
              {t('log.out')}
            </IonButton>
          </IonRow>
        </section>
      </IonRow>
      {auth.user && <UserModal user={auth.user} action='edit' updateInfo={() => auth.setForcedUpdate(true)} />}
    </IonGrid>
  );
};
