import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { shareSocialOutline } from 'ionicons/icons';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
type Props = {
  children: ReactNode;
  onShareClick:()=>void;
};

const BackShareAppLayout: React.FC<Props> = ({ children, onShareClick }) => {
  const { t } = useTranslation();

  return (
    <>
      <IonPage>
        <IonHeader mode="ios" collapse="fade" class="ion-no-border sticky">
          <IonToolbar>
            {/* Back button */}
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text={t('go.back')} />
            </IonButtons>
            {/* Share button */}
            <IonButtons slot="end" onClick={onShareClick}>
              <IonButton>
                {t('share')}
                <IonIcon slot="end" icon={shareSocialOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default BackShareAppLayout;