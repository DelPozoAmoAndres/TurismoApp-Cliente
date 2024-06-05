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
import { logOutOutline, personOutline, homeOutline, briefcaseOutline, searchOutline } from 'ionicons/icons';
/* Contexts*/
import { useAuth } from '@contexts/AuthContexts';
/* Components */
import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
/* i18n */
import { useTranslation } from 'react-i18next';
import { Role } from '@models/User';
import Logo from './Logo';

const AppMenu: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const menuController = useRef<HTMLIonMenuElement>(null);

  const handleClick = () => {
    if (menuController.current?.isOpen()) {
      menuController.current?.close();
      menuController.current?.close();
    }
  };

  return (
    <IonMenu contentId="pageWeb" ref={menuController}>
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--ion-color-primary)' }}>
          <IonRow className="ion-margin ion-align-items-center">
            <Logo color="white" />
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList class='ion-margin-top'>
          <IonMenuToggle onClick={handleClick}>
            <IonItem button routerLink="/home" style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={homeOutline} />
              <IonLabel>{t('HOME.TITLE')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle onClick={handleClick} >
            <IonItem button routerLink="/buscar" style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={searchOutline} />
              <IonLabel>{t('ACTIONS.SEARCH')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user !== null} onClick={() => auth.setShowLoginModal(true)} >
            <IonItem button style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={personOutline} />
              <IonLabel>{t('PROFILE.ACCOUNT.TITLE')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null} onClick={handleClick} >
            <IonItem button routerLink="/perfil" style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={personOutline} />
              <IonLabel>{t('PROFILE.TITLE')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null || auth.user.role !== Role.turista} onClick={handleClick} >
            <IonItem button routerLink="/reservas" style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={briefcaseOutline} />
              <IonLabel>{t('RESERVATION.TITLE')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null || auth.user.role !== Role.guía}>
            <IonItem button routerLink="/nextEvents" style={{ "--background": "var(--ion--color--background)", borderRadius: 10, width: "90%", margin: "auto", marginBottom: 10 }} lines='none'>
              <IonIcon color={'tertiary'} slot="start" icon={briefcaseOutline} />
              <IonLabel>{t('NEXTEVENTS.TITLE')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList class="ion-margin" style={{ position: 'fixed', bottom: 0, width: '90%' }}>
          <LanguageSelector hidden={false} />
          <DarkModeToggle hidden={false} />
          {auth.user && <>
            <IonItemDivider style={{ background: "var(--ion-background-color)" }} />
            <IonMenuToggle onClick={handleClick}>
              <IonButton class="ion-margin-top" color={'danger'} expand="block" onClick={auth.logout}>
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>{t('LOG.OUT')}</IonLabel>
              </IonButton>
            </IonMenuToggle>
          </>}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
