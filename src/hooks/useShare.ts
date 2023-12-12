import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useShare = (activityId: string) => {
  /* Internal states */
  const [showAlert, setShowAlert] = useState(false); // Flag to know if the alert should be opened or closed
  /* i18n */
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const shareOptions = {
    //Options to configurate the text and content to share
    title: t('share.activity.title'),
    text: t('share.activity.text'),
    url: `${process.env.REACT_APP_URL}/activity/${activityId}`,
    dialogTitle: t('share.by'),
  };

  const shareActivity = async () => {
    //Method to create an intent to share the activity
    try {
      if (Capacitor.isNativePlatform())
        //Check if its an native app
        await Share.share(shareOptions);
      else {
        await navigator.share(shareOptions);
      }
    } catch (err) {
      console.error(t('navigator.incompatible'), err);
      setShowAlert(true);
    }
  };

  return { shareActivity, showAlert, setShowAlert };
};
