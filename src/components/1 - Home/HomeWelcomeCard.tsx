import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/react';
/* Styles*/
import './Home.css';
/* i18n */
import { useTranslation } from 'react-i18next';

export const HomeWelcomeCard = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <IonCard id="card-welcome" class='limits-content ion-margin-top'>
      <IonCardTitle class="text-white">
        <h1 className="ion-padding-horizontal">{t('welcome.title')}</h1>
      </IonCardTitle>
      <IonCardContent class="ion-no-margin no-border">
        <IonText class="multi-line-container text-white">
          <p>{t('welcome.message')}</p>
        </IonText>
        {/* <IonRouterLink routerLink='/buscar'> 
          <IonSearchbar mode="ios" class="ion-margin-bottom" color={"light"}/>
        </IonRouterLink> */}
        <IonButton color={'secondary'} routerLink="/buscar" routerDirection='root'>
          {t('welcome.search')}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};