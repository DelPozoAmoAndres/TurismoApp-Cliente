import Logo from '@components/web/Logo';
import { IonContent, IonPage } from '@ionic/react';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

const LogoHeaderAppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <IonPage>
        <Logo />
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default LogoHeaderAppLayout;