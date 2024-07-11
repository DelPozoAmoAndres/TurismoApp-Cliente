import React, { useState } from 'react';
import { IonButton, IonIcon, IonNavLink, IonSelect, IonSelectOption } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { Language } from '@models/Language';
import i18n from '@components/i18n/i18n';
import { getItem } from '@utils/Utils';
import { useLanguage } from '@hooks/useLanguage';
import { useTranslation } from 'react-i18next';

type LanguageSelectorProps = {
  hidden: boolean,
  color?: string
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ hidden, color }) => {
  const { languages, defaultLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const handleLanguageChange = async (lang: Language) => {
    setSelectedLanguage(lang);
    await i18n.changeLanguage(lang.code);
  };
  const { t } = useTranslation();
  const ionSelect = React.createRef<HTMLIonSelectElement>();

  return (
    <IonNavLink hidden={hidden} >
      <IonButton expand="block" disabled={getItem('i18nextLng') === null} color={color} onClick={() => { ionSelect.current?.click() }}>
        <IonIcon slot="start" icon={globeOutline} />
        <IonSelect
          ref={ionSelect}
          style={{ width: 'auto' }}
          interface="popover"
          selectedText={t('LANGUAGE.' + selectedLanguage.code.toUpperCase())}
          onIonChange={async (e) => {
            await handleLanguageChange(e.detail.value);
          }}
          value={selectedLanguage}
        >
          {languages.map((lang) => (
            <IonSelectOption key={lang.code} value={lang}>
              {t('LANGUAGE.' + lang.code.toUpperCase())}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonButton>
    </IonNavLink>
  );
};

export default LanguageSelector;
