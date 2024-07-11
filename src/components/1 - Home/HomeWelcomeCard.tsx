import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/react';
/* Styles*/
import './Home.css';
/* i18n */
import { useTranslation } from 'react-i18next';

export const HomeWelcomeCard: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <IonCard id="card-welcome" class='limits-content ion-margin-top'>
      <IonCardTitle class="text-white">
        <h1 className="ion-padding-horizontal">{t('WELCOME.TITLE')}</h1>
      </IonCardTitle>
      <IonCardContent class="ion-no-margin no-border">
        <IonText class="multi-line-container text-white">
          <p>{t('WELCOME.MESSAGE')}</p>
        </IonText>
        <IonButton routerLink="/buscar" routerDirection='root'>
          {t('WELCOME.SEARCH')}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};