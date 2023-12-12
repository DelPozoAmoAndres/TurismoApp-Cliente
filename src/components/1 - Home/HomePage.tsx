import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic components */
import { IonAlert, IonContent } from '@ionic/react';
/* Hooks */
import { useExitAlert } from '@hooks/useExitAlert';
/* Components*/
import { HomeWelcomeCard } from './HomeWelcomeCard';
import { ActivityCardList } from './ActivityCardList';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useScreen } from '@hooks/useScreen';
import { AppPage } from '@pages/AppPage';
import Logo from '@components/web/Logo';
import PageTemplate from '@components/web/PageTemplate';
import DownloadApp from './DownloadApp';

const HomePage: React.FC<RouteComponentProps> = () => {
  const { showAlert, handleAlertCancel, handleAlertConfirm } = useExitAlert(); // Hook to handle the alert of exit when its pressed back button on native apps
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions

  const alert = (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={handleAlertCancel}
      header={t('alert.title.confirmation') || ''}
      message={t('alert.message.exit') || ''}
      buttons={[
        {
          text: t('alert.option.cancel'),
          role: 'cancel',
          handler: handleAlertCancel,
        },
        {
          text: t('alert.option.exit'),
          handler: handleAlertConfirm,
        },
      ]}
    />
  );

  const content = (
    <>
      {!browsingWeb && <Logo />}
      <HomeWelcomeCard />
      <ActivityCardList />
      {browsingWeb && <DownloadApp />}
      {alert}
    </>
  );

  return !browsingWeb ? <AppPage>{content}</AppPage> : <PageTemplate>{content}</PageTemplate>;
};

export default HomePage;
