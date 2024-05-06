import React from 'react';
import { Redirect, Route } from 'react-router-dom';
/* Ionic Components */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Capacitor } from '@capacitor/core';
/* Pages */
import HomePage from '@home/HomePage';
import NotFound from '@pages/NotFoundPage';
import ReservationDetailsPage from '@reservation-details/ReservationDetailsPage';
import SearchActivityPage from '@search-activity/ActivitySearchPage';
import ReservationListPage from '@reservation-list/ReservationListPage';
import ProfilePage from '@components/4 - Personal Area/ProfilePage';
import ReservationPage from '@create-reservation/ReservationPage';
import ActivityDetailsPage from '@activity-details/ActivityDetailsPage';
/* Styles */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@theme/variables.css';
import 'src/components/web/layouts/WebLayout.css';
/* Utility */
import axios from 'axios';
import { getItem } from '@utils/Utils';
/* i18n */
import { I18nextProvider } from 'react-i18next';
import i18n from '@components/i18n/i18n';
/* Components */
import AdminRoute from '@shared/AdminRoute';
import TabBar from '@components/app/TabBar/TabBar';
import PrivateRoute from '@shared/PrivateRoute';
/* Hooks */
import { useTheme } from '@hooks/useTheme';
import UserDetailsPage from '@components/Admin/Users/UserDetailsPage';
import { NextEventsPage } from '@components/9 - Next Events/NextEventsPage';
import { DashboardPage } from '@components/Admin/Dashboard/DashboardPage';
import { AdminActivityList } from '@components/Admin/Activities/AdminActivityList';
import { AdminReservationList } from '@components/Admin/Reservations/AdminReservationList';
import { AdminUserList } from '@components/Admin/Users/AdminUserList';
import { AdminEventList } from '@components/Admin/Events/AdminEventList';
import ThankYouPage from '@pages/ThankYouPage';

setupIonicReact();

axios.interceptors.request.use(
  (config) => {
    const token = getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AppIndex: React.FC = () => {
  useTheme();
  return (
    <I18nextProvider i18n={i18n}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="ion-router-outlet">
            <Route path={"/*"} component={NotFound} />
            <Route exact path="/">
              {Capacitor.isNativePlatform() ? <Redirect to="/movil" /> : <Redirect to="/home" />}
            </Route>
            <Route exact path="/home">
              {Capacitor.isNativePlatform() ? <Redirect to="/movil" /> : <Redirect to="/home" />}
            </Route>
            <Route path="/movil" render={() => <TabBar />} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/buscar" component={SearchActivityPage} />
            <Route exact path="/activity/:id" component={ActivityDetailsPage} />
            <PrivateRoute path="/activity/:id/reservar/" component={ReservationPage} alternativePath="/" />
            <PrivateRoute exact path="/perfil" component={ProfilePage} alternativePath="/" />
            <PrivateRoute exact path="/reservas" component={ReservationListPage} alternativePath="/" />
            <PrivateRoute exact path="/thank-you" component={ThankYouPage} alternativePath="/" />
            {/* <Route path="/payment/status" component={ReservationStatusPage} /> */}
            {/* <PrivateRoute exact path="/saved" component={SavedPage} alternativePath='/' /> */}
            <PrivateRoute exact path="/reservation/:id" component={ReservationDetailsPage} alternativePath="/" />
            <AdminRoute exact path="/admin/dashboard" component={DashboardPage} />
            <AdminRoute exact path="/admin/activities" component={AdminActivityList} />
            <AdminRoute exact path="/admin/reservations" component={AdminReservationList} />
            <AdminRoute exact path="/admin/users" component={AdminUserList} />
            <AdminRoute exact path="/admin/user/:id" component={UserDetailsPage} />
            <AdminRoute exact path="/admin/events/" component={AdminEventList} />
            <PrivateRoute exact path="/nextEvents/" component={NextEventsPage} alternativePath="/" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </I18nextProvider>
  );
};

export default AppIndex;
