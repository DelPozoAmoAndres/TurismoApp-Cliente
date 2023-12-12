import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.astour',
  appName: 'AsTour',
  webDir: 'build',
  server: {
    cleartext: true, // Necesario para permitir conexiones HTTP en Android 9 y superiores
    androidScheme:"http",
  },
  android: {
    allowMixedContent: true, // Necesario para permitir conexiones HTTP en Android 9 y superiores

  },
  ios: {
  },
  
};

export default config;

