import React from 'react';
/* Ionic components */
import { IonButton, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel, IonRow, IonText } from '@ionic/react';
/* Models */
import { Activity } from '@models/Activity';
import { Role } from '@models/User';
/* Styles */
import './ActivityInfo.css';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
import { useSoldOut } from '@hooks/useSoldOut';
/* Contexts */
import { useAuth } from '@contexts/AuthContexts';
import { shareSocialOutline } from 'ionicons/icons';

export const ActivityInfo: React.FC<{
  activityData: Activity;
  share: () => void;
}> = ({ activityData, share }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb, isMobile } = useScreen(); //Hook to have data of screen dimensions
  const auth = useAuth();
  const { soldOutProps } = useSoldOut(activityData?.events);

  return (
    <div id="activity-info" className="ion-margin-top">
      <IonRow class="ion-margin-bottom">
        <IonCardTitle>
          <strong>{activityData?.name}</strong>
        </IonCardTitle>
        <IonCardSubtitle>{activityData?.location}</IonCardSubtitle>
      </IonRow>
      <div>{browsingWeb &&
        <IonButton onClick={share}>
          {t('share')}
          <IonIcon slot="end" icon={shareSocialOutline} />
        </IonButton>}</div>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('description')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>
        <IonText style={{ whiteSpace: "pre-line" }}>{activityData?.description}</IonText>
      </IonRow>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('accesibility')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow style={{ whiteSpace: "pre-line" }}>{activityData?.accesibility}</IonRow>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('duration')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>{activityData?.duration + ' ' + t('minutes')}</IonRow>
      <IonRow>
        <IonLabel class="ion-margin-top">
          <strong>{t('info.extra')}</strong>
        </IonLabel>
      </IonRow>
      {activityData?.petsPermited ? t('pet.allowed') : t('pet.not.allowed')}
      {activityData?.events && activityData?.events?.length > 0 && (
        <IonRow>
          <IonRow class="ion-margin-top">
            <IonLabel>
              <strong>{t('price')}</strong>
            </IonLabel>
          </IonRow>
          {t('from')}{' '}
          {activityData?.events && activityData.events.length > 0 ? Math.min(...activityData.events.map((e) => e.price)).toString() : ''}
        </IonRow>
      )}
      <section hidden={isMobile || !auth.user || auth.user?.role !== Role.administrador}>
        <IonButton routerLink={`/admin/activity/${activityData._id}/events`} expand="block" mode="ios">
          {t('show.events')}
        </IonButton>
      </section>
      <section className='sticky' hidden={auth.user?.role === Role.administrador || auth.user?.role == Role.guía}>
        <IonButton {...soldOutProps} expand="block" id="login-modal">
          {activityData?.events && activityData.events.length > 0 ? t('show.availability') : t('sold.out')}
        </IonButton>
      </section>
    </div>
  );
};
