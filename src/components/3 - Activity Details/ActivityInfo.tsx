import React from 'react';
/* Ionic components */
import { IonButton, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel, IonRow, IonText } from '@ionic/react';
/* Models */
import { Activity, ActivityState } from '@models/Activity';
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
import { calendarOutline, shareSocialOutline } from 'ionicons/icons';
import { formatDateToTime } from '@utils/Utils';
import { useLanguage } from '@hooks/useLanguage';

export const ActivityInfo: React.FC<{
  activityData: Activity;
  share: () => void;
}> = ({ activityData, share }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb, isMobile } = useScreen(); //Hook to have data of screen dimensions
  const auth = useAuth();
  const { soldOutProps } = useSoldOut(activityData);
  const date: Date = new Date();
  const {defaultLanguage} = useLanguage();

  date.setHours(0, 0, 0, 0);
  date.setMinutes(activityData.duration);

  return (
    <div id="activity-info" className="ion-margin-top">
      <IonRow class="ion-margin-bottom">
        <IonCardTitle>
          <strong>{activityData?.name}</strong>
        </IonCardTitle>
        <IonCardSubtitle>{activityData?.location}</IonCardSubtitle>
      </IonRow>
      <div style={{ width: "100%" }}>
        {browsingWeb && !isMobile && <>
          <section hidden={auth.user?.role === Role.administrador || auth.user?.role == Role.guía}>
            <IonButton {...soldOutProps} expand="block" id="Availability-modal">
              {activityData?.events && activityData.events.length > 0 && activityData.state!=ActivityState['temporaly-closed'] ? t('show.availability') : t('sold.out')}
              <IonIcon slot="end" icon={calendarOutline} />
            </IonButton>
          </section>
          <section hidden={isMobile || !auth.user || auth.user?.role !== Role.administrador}>
            <IonButton routerLink={`/admin/activity/${activityData._id}/events`} expand="block">
              {t('show.events')}
            </IonButton>
          </section></>}
        {browsingWeb &&
          <IonButton class='outlined' onClick={share}>
            {t('share')}
            <IonIcon slot="end" icon={shareSocialOutline} />
          </IonButton>}</div>
      <div>
        {activityData?.events && activityData?.events?.length > 0 && (
          <IonRow>
            <IonRow class="ion-margin-top">
              <IonLabel>
                <strong>{t('price')}</strong>
              </IonLabel>
            </IonRow>
            {t('from')}{' '}
            {activityData?.events && activityData.events.length > 0 ? Math.min(...activityData.events.map((e) => e.price)).toString() + "€" : ''}
          </IonRow>
        )}
        <IonRow>
          <IonRow class="ion-margin-top">
            <IonLabel>
              <strong>{t('duration')}</strong>
            </IonLabel>
          </IonRow>
          {formatDateToTime(date)} {t('hours')}
        </IonRow>   
      </div>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('description')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>
        <IonText style={{ whiteSpace: "pre-line" }}>{activityData?.description[defaultLanguage.code]}</IonText>
      </IonRow>

      {isMobile && <section className='sticky' hidden={auth.user?.role === Role.administrador || auth.user?.role == Role.guía}>
        <IonButton {...soldOutProps} expand="block" id="Availability-modal">
          {activityData?.events && activityData.events.length > 0 ? t('show.availability') : t('sold.out')}
        </IonButton>
      </section>
      }
    </div>
  );
};
