import React from 'react';
/* Ionic components */
import { IonAlert, IonButton, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { shieldOutline, trashOutline } from 'ionicons/icons';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Styles */
import './Account.css';
import { ChangePasswordModal } from '../Change Password/ChangePasswordModal';
import { useAuth } from '@contexts/AuthContexts';
import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
import { useScreen } from '@hooks/useScreen';

export const Account: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { deleteAccount } = useAuth();
  const [showAlert, setShowAlert] = React.useState(false);
  const { browsingWeb } = useScreen();
  return (
    <IonGrid id="account-settings">
      <ChangePasswordModal />
      <IonRow>
        <h2>
          <strong>{t('PROFILE.ACCOUNT.TITLE')}</strong>
        </h2>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ">
        <IonButton id="password-change-modal" style={{ width: '100%' }} expand="block">
          <IonIcon slot="start" icon={shieldOutline} />
          {t('PROFILE.ACCOUNT.PASSWORD.CHANGE')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-justify-content-between ">
        <IonButton color={'danger'} style={{ width: '100%' }} onClick={() => setShowAlert(true)}>
          <IonIcon slot="start" icon={trashOutline} />
          {t('PROFILE.ACCOUNT.DELETE')}
        </IonButton>
      </IonRow>

      {!browsingWeb && <>
        <IonRow>
          <h2>
            <strong>{t('ajustes.title')}</strong>
          </h2>
        </IonRow>
        <IonRow class="ion-justify-content-between ion-margin-top ">
          <LanguageSelector hidden={false} />
        </IonRow>
        <IonRow class="ion-justify-content-between" style={{ width: "100%" }}>
          <DarkModeToggle hidden={false} />
        </IonRow>
      </>}
      <IonAlert
        isOpen={showAlert}
        title={t('PROFILE.ACCOUNT.DELETE') || ''}
        message={t('PROFILE.ACCOUNT.DELETE.confirmation') || ''}
        buttons={[{ text: t('account.cancel'), role: 'cancel' }, { text: t('account.accept'), role: 'accept' }]}
        onDidDismiss={e => {
          if (e.detail.role === 'accept') {
            deleteAccount();
          }
          setShowAlert(false);
        }}
      />

    </IonGrid>
  );
};
