import React, { useEffect, useRef } from 'react';
/* Ionic Components */
import { IonInput, IonButton, IonText, IonItem, IonList, IonGrid, IonRow } from '@ionic/react';
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

const Login: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { handleLogin, setEmail, setPassword, email, password, loading } = useLogin(modal);
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { showLoginModal, setShowLoginModal } = useAuth();

  useEffect(() => {
    modal.current?.onDidDismiss().then(() => {
      setEmail('');
      setPassword('');
    });
    // eslint-disable-next-line
  }, [modal]);

  return (
    <Modal id={'login-modal-card'} isOpen={showLoginModal} setOpen={setShowLoginModal} title={t('LOG.IN')} modal={modal} minHeightAndroid={330} minHeightIos={300} onlyNative={true}>
      <IonGrid id="login-grid" class="ion-no-padding">
        <IonRow>
          <IonList class="ion-margin-bottom">
            <IonItem lines="none">
              <IonInput
                type="email"
                placeholder={t('DATA.EMAIL.LABEL') || ''}
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonItem lines="none">
              <IonInput
                type="password"
                placeholder={t('DATA.PASSWORD.LABEL') || ''}
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonButton disabled={!email || !password} type="submit" expand="block" onClick={() => handleLogin()}>
              {' '}
              {loading ? <Spinner /> : t('LOG.IN')}
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
              {t('NOT.ACCOUNT') + ' '}
              <strong style={{ cursor: "pointer" }}>{t('SIGN.UP.HERE')}</strong>
            </IonText>
          </IonItem>
        </IonRow>
      </IonGrid>
      <Register loginModal={modal} />
    </Modal>
  );
};

export default Login;
