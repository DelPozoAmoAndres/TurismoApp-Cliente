import React, { useRef } from 'react';
/* Ionic Components */
import { IonInput, IonButton, IonText, IonItem, IonAlert, IonList, IonGrid, IonRow } from '@ionic/react';
/* Styles */
import './Login.css';
/* Components */
import { Modal } from '@shared/Modal';
import Spinner from '@shared/Spinner';
/* Hooks */
import { useLogin } from '@hooks/useLogin';
/* i18n */
import { useTranslation } from 'react-i18next';
import Register from '../Register/Register';
import { useAuth } from '@contexts/AuthContexts';

const Login: React.FC= () => {
  const { handleLogin, setShowAlert, setEmail, setPassword, email, password, loading, showAlert, error } = useLogin();
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const {showLoginModal, setShowLoginModal} = useAuth();
  return (
    <Modal id={'login-modal-card'} isOpen={showLoginModal} setOpen={setShowLoginModal} tittle={t('log.in')} modal={modal} minWidthAndroid={330} minWidthIos={492}>
      <IonGrid id="login-grid" class="ion-no-padding">
        <IonRow>
          <IonList class="ion-margin-bottom">
            <IonItem lines="none">
              <IonInput
                type="email"
                placeholder={t('personal.data.email') || ''}
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonItem lines="none">
              <IonInput
                type="password"
                placeholder={t('personal.data.password') || ''}
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonButton type="submit" expand="block" onClick={() => handleLogin()}>
              {' '}
              {loading ? <Spinner /> : t('log.in')}
            </IonButton>
          </IonList>
        </IonRow>
        <IonRow class="ion-padding-top">
          <IonItem
            id="register-modal"
            lines="none"
            style={{ borderRadius: '5px', width: '100%' }}
          >
            <IonText>
              {t('not.account') + ' '}
              <strong>{t('sign.up.here')}</strong>
            </IonText>
          </IonItem>
        </IonRow>
      </IonGrid>
      <Register loginModal={modal}/>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          if (!error) {
            modal.current?.dismiss();
          }
        }}
        header={error ? t('alert.title.error') || 'Error' : t('log.in') || ''}
        message={error ?? (t('alert.login.success') || '')}
        buttons={['OK']}
      ></IonAlert>
    </Modal>
  );
};

export default Login;
