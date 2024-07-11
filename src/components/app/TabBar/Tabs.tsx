import React from 'react';
import { IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { briefcaseOutline, homeOutline, personOutline, settingsOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';

export const Tabs = () => {
  const { t } = useTranslation();
  const { setShowLoginModal } = useAuth();
  const HomeTab = (
    <IonTabButton tab="tab1" href="/movil/home">
      <IonIcon icon={homeOutline} />
      <IonLabel>{t('HOME.TITLE')}</IonLabel>
    </IonTabButton>
  );
  const PersonalAreaTab = (
    <IonTabButton tab="tab2" onClick={() => setShowLoginModal(true)}>
      <IonIcon icon={personOutline} />
      <IonLabel>{t('PROFILE.ACCOUNT.TITLE')}</IonLabel>
    </IonTabButton>
  );

  const ReservationsTab = (
    <IonTabButton tab="tab3" href="/movil/reservas">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('RESERVATION.TITLE')}</IonLabel>
    </IonTabButton>
  );

  const NextEventsTab = (
    <IonTabButton tab="tab4" href="/movil/nextEvents">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('NEXTEVENTS.TITLE')}</IonLabel>
    </IonTabButton>
  );

  const ProfileTab = (
    <IonTabButton tab="tab5" href="/movil/perfil">
      <IonIcon icon={personOutline} />
      <IonLabel>{t('PROFILE.TITLE')}</IonLabel>
    </IonTabButton>
  );

  const ConfigTab = (
    <IonTabButton tab="tab6" href="/movil/config">
      <IonIcon icon={settingsOutline} />
      <IonLabel>{t('PROFILE.SETTINGS.TITLE')}</IonLabel>
    </IonTabButton>
  );

  return {
    HomeTab,
    ProfileTab,
    PersonalAreaTab,
    ReservationsTab,
    NextEventsTab,
    ConfigTab
  };
};
