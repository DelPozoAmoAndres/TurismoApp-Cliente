import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
type Props = {
  children: ReactNode;
};

const BackHeaderAppLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <>
      <IonPage>
        <IonHeader mode="ios" collapse="fade" class="ion-no-border sticky" >
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={t('GO.BACK')} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default BackHeaderAppLayout;