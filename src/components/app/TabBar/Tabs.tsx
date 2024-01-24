import React from 'react';
import { IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { briefcaseOutline, homeOutline, personOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';

export const Tabs = () => {
  const { t } = useTranslation();
  const {setShowLoginModal} = useAuth();
  const HomeTab = (
    <IonTabButton tab="tab1" href="/movil/home">
      <IonIcon icon={homeOutline} />
      <IonLabel>{t('home.title')}</IonLabel>
    </IonTabButton>
  );
  const PersonalAreaTab = (
    <IonTabButton tab="tab2" onClick={() => setShowLoginModal(true)}>
      <IonIcon icon={personOutline} />
      <IonLabel>{t('account.title')}</IonLabel>
    </IonTabButton>
  );

  const ReservationsTab = (
    <IonTabButton tab="tab3" href="/movil/reservas">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('reservations.title')}</IonLabel>
    </IonTabButton>
  );

  const NextEventsTab = (
    <IonTabButton tab="tab4" href="/movil/reservas">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('nextEvents.title')}</IonLabel>
    </IonTabButton>
  );

  const ProfileTab = (
    <IonTabButton tab="tab5" href="/movil/perfil">
      <IonIcon icon={personOutline} />
      <IonLabel>{t('profile.title')}</IonLabel>
    </IonTabButton>
  );

  return {
    HomeTab,
    ProfileTab,
    PersonalAreaTab,
    ReservationsTab,
    NextEventsTab,
  };
};
