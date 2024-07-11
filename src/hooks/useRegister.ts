import { useState, FormEvent, useContext } from 'react';
import { RegisterFormData } from '../models/User';
import { useAuth } from '../contexts/AuthContexts';
import { filterPropertiesNotNull } from '@utils/Utils';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const useRegister = (modal: React.MutableRefObject<HTMLIonModalElement | null>, loginModal: React.MutableRefObject<HTMLIonModalElement | null>) => {
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
  const { showNotification } = useContext(NotificationContext);

  const auth = useAuth();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    auth.register(filterPropertiesNotNull(formData))
      .then(() => {
        modal.current?.dismiss();
        loginModal.current?.dismiss();
        showNotification('Usuario registrado correctamente');
      })
      .catch(error => showNotification(error?.message ?? 'Ha habido un error en el servidor.'))


    setLoading(false);
  }
  return {
    formData,
    loading,
    setFormData,
    handleRegister,
  };
};
