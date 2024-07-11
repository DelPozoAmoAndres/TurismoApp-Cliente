import React, { useState } from 'react';
import { IonIcon, IonButton, IonNavLink } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { getItem, setItem } from '@utils/Utils';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

type DarkModeToggleProps = {
  hidden: boolean,
  color?: string
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ hidden, color }) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return theme === 'dark';
  });

  const { t } = useTranslation();

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark', !isDarkMode);
    setIsDarkMode(!isDarkMode);
    setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <IonNavLink hidden={hidden}>
      <IonButton expand="block" onClick={toggleDarkMode} disabled={getItem('i18nextLng') === null} color={color} style={{ color: "white" }}>
        <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} slot="start" />
        <span>{t('THEME.CHANGE')}</span>
      </IonButton>
    </IonNavLink>
  );
};

export default DarkModeToggle;
