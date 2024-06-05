import React from 'react';
/* Ionic Components */
import { IonButtons, IonHeader, IonMenuButton, IonRow, IonToolbar } from '@ionic/react';
import { briefcaseOutline, gridOutline, homeOutline, personOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Models */
import { Role } from '@models/User';
/* Components */
import { Button } from '@shared/Button';
import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
/* Styles */
import './Header.css';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import Logo from './Logo';

export const Header: React.FC = () => {
  const { isMobile, browsingWeb } = useScreen();
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <IonHeader mode="ios" class='ion-no-border'>
      <IonToolbar>
        <div className="toolBar-content">
          <IonButtons slot="start">
            {browsingWeb && isMobile
              ? <IonRow class="ion-align-items-center">
                <IonMenuButton autoHide={false} />
                <Logo />
              </IonRow>
              : <Logo />
            }
          </IonButtons>
          <IonButtons slot="end" >
            <Button routeLink="/home" icon={homeOutline} text={t('HOME.TITLE')} />
            <Button onClick={() => auth.setShowLoginModal(true)} icon={personOutline} text={t('PROFILE.ACCOUNT.TITLE')} />
            {/* <Button id="register-modal" icon={personOutline} text={t('sign.up')} /> */}
            <Button role={null} routeLink="/home" icon={homeOutline} text={t('HOME.TITLE')} />
            <Button role={null} routeLink="/perfil" icon={personOutline} text={t('PROFILE.TITLE')} />
            <Button role={Role.administrador} routeLink="/admin/dashboard" icon={gridOutline} text={t('DASHBOARD.TITLE')} />
            <Button role={Role.guía} routeLink="/nextEvents" icon={briefcaseOutline} text={t('NEXTEVENTS.TITLE')} />
            <Button role={Role.turista} routeLink="/reservas" icon={briefcaseOutline} text={t('RESERVATION.TITLE')} />
            <LanguageSelector hidden={isMobile} />
            <DarkModeToggle hidden={isMobile} />
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
