import React from 'react';
/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonText, IonCardHeader } from '@ionic/react';
import { star } from 'ionicons/icons';
/* Models */
import { Activity } from '@models/Activity';
/* Styles */
import './ActivityCard.css';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { width } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <IonCard
      id="card-home"
      class="ion-no-margin"
      style={{
        width: (width - 13 * 2 - (width / 250 - 1) * 10) / (width / 250),
      }}
    >
      <IonCardContent class="ion-no-padding">
        <IonCardHeader class="ion-no-padding">
          <img src={activity.images[0]} alt="activity"/>
        </IonCardHeader>
        <IonCard>
          <IonCardTitle>{activity.name}</IonCardTitle>
          <IonCardSubtitle>
            <IonText className="ion-margin-left">{activity.location}</IonText>
            <IonText class="ion-no-margin ion-align-items-center">
              <IonIcon icon={star} color="primary" />
              <IonText class="ion-no-margin">3/5 (323)</IonText>
            </IonText>
          </IonCardSubtitle>
          <IonCardContent class="ion-no-padding">
            {activity?.events && activity.events.length>0 ? (
              <strong>
                {t('from')}{' '}
                {activity?.events && activity.events.length > 0 ? Math.min(...activity.events.map((e) => e.price)).toString() : ''}
              </strong>
            ) : (
              <strong>{t('sold.out')}</strong>
            )}
            <IonButton routerLink={'/activity/' + activity._id}>{t('show.info')}</IonButton>
          </IonCardContent>
        </IonCard>
      </IonCardContent>
    </IonCard>
  );
};
