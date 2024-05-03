import React, { useContext, useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const useLogin = (modal: React.RefObject<HTMLIonModalElement>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const auth = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    auth.login(email, password).then(() => {
      showNotification('Inicio de sesión correcto.')
      modal.current?.dismiss();
    }).catch(error =>
      showNotification(error?.message ?? 'Ha habido un error en el servidor.'));
    setLoading(false);
  };

  return {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    loading,
  };
};
