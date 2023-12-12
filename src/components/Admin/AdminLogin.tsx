import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { person, lockClosed } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { AxiosError } from 'axios';

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { t } = useTranslation();
  const history = useHistory();

  const auth = useAuth();

  const handleLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await auth.login(email, password);
      //history.push('/admin/dashboard');
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error || error instanceof AxiosError) setErrorMessage(error?.message ?? t('adminLogin.errorMessage'));
    }
    setShowAlert(true);
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('adminLogin.title')}</IonTitle>
          <IonButtons slot="start">
            <IonButton routerLink="/">{t('adminLogin.backButton')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="admin-login-page">
        <div className="logo-container">
          <img src="/assets/images/logo.png" alt="Logo" />
        </div>
        <div className="form-container">
          <IonItem>
            <IonIcon icon={person} slot="start" />
            <IonLabel position="floating">{t('adminLogin.emailLabel')}</IonLabel>
            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonIcon icon={lockClosed} slot="start" />
            <IonLabel position="floating">{t('adminLogin.passwordLabel')}</IonLabel>
            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value || '')} />
          </IonItem>
          <IonButton expand="block" onClick={handleLogin}>
            {loading ? t('loading') : t('adminLogin.loginButton')}
          </IonButton>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            errorMessage ?? history.push('/admin/dashboard');
          }}
          header={errorMessage ? 'Error' : 'Inicio de sesión'}
          message={errorMessage ?? 'Se ha iniciado sesión correctamente'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
