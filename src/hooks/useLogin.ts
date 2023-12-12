import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const auth = useAuth();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await auth.login(email, password);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error || error instanceof AxiosError) setError(error?.message ?? 'Ha habido un error en el servidor.');
    }
    setShowAlert(true);
    setLoading(false);
  };

  return {
    handleLogin,
    setShowAlert,
    setEmail,
    setPassword,
    email,
    password,
    loading,
    showAlert,
    error,
  };
};
