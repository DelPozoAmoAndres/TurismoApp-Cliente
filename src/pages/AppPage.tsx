import { IonContent, IonPage } from '@ionic/react';
import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
type Props = {
  children: ReactNode;
};

export const AppPage: React.FC<Props> = ({ children }) => {
  return (
    <>
      <IonPage>
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
};

AppPage.propTypes = {
  children: PropTypes.node.isRequired,
};

AppPage.displayName = 'AppPage';
