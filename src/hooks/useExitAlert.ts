import { App } from '@capacitor/app';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useExitAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  useEffect(() => {
    App.addListener('backButton', (e:any) => {
      e.preventDefault();
      if (location.pathname.includes('home')) setShowAlert(true)
    });
  }, [location]);

  const handleAlertConfirm = () => {
    setShowAlert(false);
    App.exitApp();
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };
  return { showAlert, handleAlertConfirm, handleAlertCancel };
};
