import { useState, FormEvent } from 'react';
import { RegisterFormData } from '../models/User';
import { useAuth } from '../contexts/AuthContexts';
import { filterPropertiesNotNull } from '@utils/Utils';
import { AxiosError } from 'axios';

export const useRegister = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    telephone: '',
    email: '',
    birthday: null,
    country: null,
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const auth = useAuth();

  const handleRegister = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      await auth.register(filterPropertiesNotNull(formData));
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error || error instanceof AxiosError) setError(error?.message ?? 'Ha habido un error en el servidor.');
    }
    setLoading(false);
    setShowAlert(true);
  };
  return {
    formData,
    showAlert,
    setShowAlert,
    loading,
    error,
    setFormData,
    handleRegister,
  };
};
