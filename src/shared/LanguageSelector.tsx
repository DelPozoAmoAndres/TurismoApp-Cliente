import React, { useState } from 'react';
import { IonButton, IonIcon, IonNavLink, IonSelect, IonSelectOption } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { Language } from '@models/Language';
import i18n from '@components/i18n/i18n';
import { getItem } from '@utils/Utils';
import { useLanguage } from '@hooks/useLanguage';

type LanguageSelectorProps = {
  hidden: boolean,
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({hidden}) => {
  const { languages, defaultLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const handleLanguageChange = async (lang: Language) => {
    setSelectedLanguage(lang);
    await i18n.changeLanguage(lang.code);
    
  };

  return (
    <IonNavLink hidden={hidden} >
      <IonButton expand="block" disabled={getItem('i18nextLng') === null}>
        <IonIcon slot="start" icon={globeOutline} />
        <IonSelect
          style={{ width: 'auto' }}
          interface="popover"
          selectedText={selectedLanguage.name}
          onIonChange={async (e) => {
            await handleLanguageChange(e.detail.value);
          }}
          value={selectedLanguage}
        >
          {languages.map((lang) => (
            <IonSelectOption key={lang.code} value={lang}>
              {lang.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonButton>
    </IonNavLink>
  );
};

export default LanguageSelector;
