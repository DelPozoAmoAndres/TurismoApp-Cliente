import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonRouterOutlet, IonTabs } from '@ionic/react';
import HomePage from '@home/HomePage';
import PrivateRoute from '@shared/PrivateRoute';
import { useAuth } from '@contexts/AuthContexts';
import TabsFiltered from '@components/app/TabBar/TabsFiltered';
import ProfilePage from '@components/4 - Personal Area/ProfilePage';
import ReservationListPage from '@reservation-list/ReservationListPage';
import { NextEventsPage } from '@components/9 - Next Events/NextEventsPage';
import ConfigPage from '@pages/ConfigPage';

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
          <PrivateRoute exact path="/movil/nextEvents" component={NextEventsPage} alternativePath="/movil" />
          <Route path="/movil/config" component={ConfigPage} />
        </IonRouterOutlet>
        {auth.user?.role ? rolesTabs[auth.user?.role] : rolesTabs['none']}
      </IonTabs>
    </IonContent>
  );
};

export default TabBar;
