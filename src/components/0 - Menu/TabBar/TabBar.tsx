import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonContent, IonRouterOutlet, IonTabs } from '@ionic/react';
import HomePage from '@home/HomePage';
import PrivateRoute from '@shared/PrivateRoute';
import { useAuth } from '@contexts/AuthContexts';
import TabsFiltered from '@menu/TabBar/TabsFiltered';
import ProfilePage from '@personal-area/Profile/ProfilePage';
import ReservationListPage from '@reservation-list/ReservationListPage';
import { Button } from '@shared/Button';

const TabBar: React.FC = () => {
  const auth = useAuth();
  const rolesTabs = TabsFiltered();
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/movil" to="/movil/home" />
          <Route exact path="/movil/home" component={HomePage} />
          <PrivateRoute exact path="/movil/perfil" component={ProfilePage} alternativePath="/movil" />
          <PrivateRoute exact path="/movil/reservas" component={ReservationListPage} alternativePath="/movil" />
        </IonRouterOutlet>
        {auth.user?.role ? rolesTabs[auth.user?.role] : rolesTabs['none']}
      </IonTabs>
      <IonButton id="login-modal" hidden={true} />
    </IonContent>
  );
};

export default TabBar;
