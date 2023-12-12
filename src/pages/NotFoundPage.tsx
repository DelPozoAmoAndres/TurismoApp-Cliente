// NotFound.tsx
import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/react';
import { useScreen } from '../hooks/useScreen';
import { AppPage } from './AppPage';

const NotFound: React.FC = () => {
  const { browsingWeb } = useScreen();
  const content = (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Página no encontrada</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <p>Lo sentimos, la página que estás buscando no se encuentra en nuestro sitio.</p>
        </IonText>
      </IonContent>
    </>
  );
  return !browsingWeb ? <AppPage>{content}</AppPage> : <>{content}</>;
};

export default NotFound;
