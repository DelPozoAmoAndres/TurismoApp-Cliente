import { Capacitor } from '@capacitor/core';
import { getItem } from '@utils/Utils';
import { StatusBar, Style } from '@capacitor/status-bar';

const setStatusBarStyleDark = async () => {
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#121212" });
  } catch (error) {
    console.error('Failed to set StatusBar color', error);
  }
};

const setStatusBarStyleLight = async () => {
  try {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#ffffff" });
  } catch (error) {
    console.error('Failed to set StatusBar color', error);
  }
};

export const useTheme = () => {
  const theme = getItem('theme');
  if (theme) {
    document.body.classList.toggle(theme, true);
    if (Capacitor.isNativePlatform()) {
      if (theme == 'dark') {
        setStatusBarStyleDark();
      } else {
        setStatusBarStyleLight();
      }
    }
  }
  else{
    setStatusBarStyleLight();
  }
  return { theme };
};
