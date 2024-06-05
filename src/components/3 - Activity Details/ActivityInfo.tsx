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
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const auth = useAuth();
  const { soldOutProps } = useSoldOut(activityData);
  const date: Date = new Date();
  const { defaultLanguage } = useLanguage();

  date.setHours(0, 0, 0, 0);
  date.setMinutes(activityData.duration);

  console.log(activityData.events)

  return (
    <div id="activity-info">
      <IonRow class="ion-margin-bottom">
        <IonCardTitle>
          <strong>{activityData?.name}</strong>
        </IonCardTitle>
        <IonCardSubtitle>{activityData?.location}</IonCardSubtitle>
      </IonRow>
      <div style={{ width: "100%" }}>
        {!isMobile && <>
          <section>
            <IonButton {...soldOutProps} expand="block" id="Availability-modal">
              {auth.user?.role === Role.administrador
                ? t('ACTIVITY.SHOW.EVENTS')
                : activityData?.events
                  && activityData.events.filter(e => e.bookedSeats == undefined || e.seats > e.bookedSeats).length > 0
                  && activityData.state != ActivityState['temporaly-closed']
                  ? t('ACTIVITY.SHOW.AVAILABILITY')
                  : t('ACTIVITY.SOLD.OUT')}
              <IonIcon slot="end" icon={calendarOutline} />
            </IonButton>
          </section>
          <IonButton class='outlined' onClick={share}>
            {t('ACTIONS.SHARE')}
            <IonIcon slot="end" icon={shareSocialOutline} />
          </IonButton></>}
      </div>

      <div>
        {activityData?.events && activityData?.events?.length > 0 && (
          <IonRow>
            <IonRow class="ion-margin-top">
              <IonLabel>
                <strong>{t('ACTIVITY.EVENT.PRICE')}</strong>
              </IonLabel>
            </IonRow>
            {t('FROM')}{' '}
            {activityData?.events && activityData.events.length > 0 ? Math.min(...activityData.events.map((e) => e.price)).toString() + "€" : ''}
          </IonRow>
        )}
        <IonRow>
          <IonRow class="ion-margin-top">
            <IonLabel>
              <strong>{t('ACTIVITY.DURATION')}</strong>
            </IonLabel>
          </IonRow>
          {formatDateToTime(date)} {t('hours')}
        </IonRow>
      </div>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('ACTIVITY.DESCRIPTION')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>
        <IonText style={{ whiteSpace: "pre-line" }}>{activityData?.description && activityData.description[defaultLanguage.code]}</IonText>
      </IonRow>

      {isMobile && <section className='sticky'>
        <IonButton slot='start' {...soldOutProps} expand="block" id="Availability-modal">
          {activityData?.events && activityData.events.length > 0 ? auth.user?.role === Role.administrador ? t('ACTIVITY.SHOW.EVENTS') : t('ACTIVITY.SHOW.AVAILABILITY') : t('ACTIVITY.SOLD.OUT')}
        </IonButton>
        <IonButton slot='end' class='outlined' onClick={share}>
          <IonIcon icon={shareSocialOutline} />
        </IonButton>
      </section>
      }
    </div>
  );
};
