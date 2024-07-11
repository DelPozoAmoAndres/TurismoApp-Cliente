import { IonContent, IonPage } from '@ionic/react';
import React, { ReactNode } from 'react';
import './GenericAppLayout.css';
type Props = {
  children: ReactNode;
};

const GenericAppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <IonPage>
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default GenericAppLayout;