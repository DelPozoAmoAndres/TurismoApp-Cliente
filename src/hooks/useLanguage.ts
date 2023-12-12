import { getItem } from '@utils/Utils';
import { Language } from '../models/Language';

export const useLanguage = () => {
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];
  const languageSelected = languages.filter((l) => l.code === getItem('i18nextLng'))?.at(0);
  const defaultLanguage = languageSelected ?? { code: 'es', name: 'Español' };
  return { languages, defaultLanguage };
};
