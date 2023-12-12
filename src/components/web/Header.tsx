import React from 'react';
/* Ionic Components */
import { IonButtons, IonHeader, IonLabel, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
import { useHistory } from 'react-router';
import AppMenu from '@components/web/AppMenu';
import { useAuth } from '@contexts/AuthContexts';

export const Header : React.FC = () => {
  const { isMobile, browsingWeb } = useScreen();
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <IonHeader mode="ios" class='ion-no-border'>
      <IonToolbar>
        <div className="toolBar-content">
          <IonButtons slot="start">
            {browsingWeb && isMobile
              ? <IonMenuButton autoHide={false} />
              : <strong><IonLabel class="ion-text-start " id="title-app">
                As<img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png"
                  width={20} />our
              </IonLabel></strong>

            }
          </IonButtons>
          <IonButtons slot="end" >
            <Button routeLink="/home" icon={homeOutline} text={t('home.title')} />
            <Button onClick={()=>auth.setShowLoginModal(true)} icon={personOutline} text={t('account.title')} />
            {/* <Button id="register-modal" icon={personOutline} text={t('sign.up')} /> */}
            <Button role={null} routeLink="/home" icon={homeOutline} text={t('home.title')} />
            <Button role={null} routeLink="/perfil" icon={personOutline} text={t('profile.title')} />
            <Button role={Role.administrador} routeLink="/admin/dashboard" icon={gridOutline} text={t('dashboard.title')} />
            <Button role={Role.turista} routeLink="/reservas" icon={briefcaseOutline} text={t('reservations.title')} />
            <LanguageSelector hidden={isMobile} />
            <DarkModeToggle hidden={isMobile} />
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
