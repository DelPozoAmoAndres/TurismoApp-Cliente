/* i18n */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
/* Translation files */
import enTranslation from './en.json';
import esTranslation from './es.json';
import frTranslation from './fr.json';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

//     fallbackLng: 'es',

export default i18n;
