import React, { useRef } from 'react';
/* Ionic Components */
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRow,
  IonButton,
  IonItemDivider,
} from '@ionic/react';
import { logOutOutline, personOutline, homeOutline, briefcaseOutline } from 'ionicons/icons';
/* Contexts*/
import { useAuth } from '@contexts/AuthContexts';
/* Components */
import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
/* i18n */
import { useTranslation } from 'react-i18next';
import { Role } from '@models/User';

const AppMenu: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const menuController = useRef<HTMLIonMenuElement>(null);

  const handleLoginClick = () => {
    auth.setShowLoginModal(true);
    if (menuController.current?.isOpen())
      menuController.current?.close();
  };

  return (
    <IonMenu contentId="pageWeb" ref={menuController}>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--ion-color-primary)' }}>
          <IonRow className="ion-margin ion-align-items-center">
            <IonLabel class="ion-margin-start" style={{ fontSize: '40px', color: 'white' }}>
              As
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png"
                width={30} />
              our
            </IonLabel>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem button routerLink="/home">
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>{t('home.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonItem hidden={auth.user !== null} button onClick={handleLoginClick}>
            <IonIcon slot="start" icon={personOutline} />
            <IonLabel>{t('account.title')}</IonLabel>
          </IonItem>
          <IonMenuToggle hidden={auth.user === null}>
            <IonItem button routerLink="/perfil">
              <IonIcon slot="start" icon={personOutline} />
              <IonLabel>{t('profile.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null || auth.user.role !== Role.turista}>
            <IonItem button routerLink="/reservas">
              <IonIcon slot="start" icon={briefcaseOutline} />
              <IonLabel>{t('reservations.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null || auth.user.role !== Role.guía}>
            <IonItem button routerLink="/nextEvents">
              <IonIcon slot="start" icon={briefcaseOutline} />
              <IonLabel>{t('nextEvents.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList class="ion-margin" style={{ position: 'fixed', bottom: 0, width: '90%' }}>
          <LanguageSelector hidden={false} />
          <DarkModeToggle hidden={false} />
          <IonItemDivider />
          <IonMenuToggle>
            <IonButton class="ion-margin-top" color={'danger'} expand="block" onClick={auth.logout}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>{t('log.out')}</IonLabel>
            </IonButton>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
