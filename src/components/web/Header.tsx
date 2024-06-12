import React from 'react';
/* Ionic Components */
import { IonButtons, IonHeader, IonMenuButton, IonRow, IonToolbar } from '@ionic/react';
import { briefcaseOutline, briefcaseSharp, gridOutline, gridSharp, homeOutline, homeSharp, personOutline, personSharp } from 'ionicons/icons';
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
import { useLocation } from 'react-router';

export const Header: React.FC = () => {
  const { isMobile, browsingWeb } = useScreen();
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
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
            <Button routeLink="/home" icon={location.pathname.includes("/home") ? homeSharp : homeOutline} text={t('HOME.TITLE')} />
            <Button onClick={() => auth.setShowLoginModal(true)} icon={personOutline} text={t('PROFILE.ACCOUNT.TITLE')} />
            {/* <Button id="register-modal" icon={personOutline} text={t('sign.up')} /> */}
            <Button role={null} routeLink="/home" icon={location.pathname.includes("/home") ? homeSharp : homeOutline} text={t('HOME.TITLE')} />
            <Button role={null} routeLink="/perfil" icon={location.pathname.includes("/perfil") ? personSharp : personOutline} text={t('PROFILE.TITLE')} />
            <Button role={Role.administrador} routeLink="/admin/dashboard" icon={location.pathname.includes("/admin/dashboard") ? gridSharp : gridOutline} text={t('DASHBOARD.TITLE')} />
            <Button role={Role.guía} routeLink="/nextEvents" icon={location.pathname.includes("/nextEvents") ? briefcaseSharp : briefcaseOutline} text={t('NEXTEVENTS.TITLE')} />
            <Button role={Role.turista} routeLink="/reservas" icon={location.pathname.includes("/reservas") ? briefcaseSharp : briefcaseOutline} text={t('RESERVATION.TITLE')} />
            <LanguageSelector hidden={isMobile} />
            <DarkModeToggle hidden={isMobile} />
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
