import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import LoadingPage from '../pages/LoadingPage';
import { Role } from '../models/User';

interface AdminRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token ? (
          auth.user ? (
            auth.user?.role === Role.administrador ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          ) : (
            <LoadingPage />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
