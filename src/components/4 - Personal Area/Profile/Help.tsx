import React from 'react';
/* Ionic Components*/
import { IonButton, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/react';
import { Clipboard } from '@capacitor/clipboard';
import { copyOutline, logoWhatsapp, mailOutline } from 'ionicons/icons';
/* i18n */
import { useTranslation } from 'react-i18next';

export const Help: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  const sendEmail = () =>{
    window.open(`mailto:${"uo271035@uniovi.es"}`);
  }
  const sendWhats = ()=>{
    window.open(`https://wa.me/${"34681193906"}`)
  }

  const writeToClipboard = async (value:string) => {
    await Clipboard.write({
      string: value
    });
  };

  return (
    <IonGrid style={{ width: '100%' }}>
      <IonRow>
        <h2>
          <strong>{t('help.title')}</strong>
        </h2>
      </IonRow>
      <IonRow style={{ width: '100%' }} class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('help.email') + ':'}</IonLabel>
        <IonLabel>uo271035@uniovi.es</IonLabel>
        <IonButton onClick={()=>writeToClipboard("uo271035@uniovi.es")}>
          <IonIcon icon={copyOutline} />
          {t('copy')}
        </IonButton>
      </IonRow>
      <IonRow>
        <IonButton onClick={sendEmail}>
          <IonIcon slot="start" icon={mailOutline} />
          {t('send.message.email')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('help.telephone') + ': '}</IonLabel>
        <IonLabel> +34 681193906 </IonLabel>
        <IonButton onClick={()=>writeToClipboard("+34 681193906")}>
          <IonIcon icon={copyOutline} />
          {t('copy')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-align-items-center">
        <IonButton onClick={sendWhats}>
          <IonIcon slot="start" icon={logoWhatsapp} />
          {t('send.message.whatsapp')}
        </IonButton>
        <IonLabel>{t('o') + ' ' + t('call.by.telephone')}</IonLabel>
      </IonRow>
    </IonGrid>
  );
};
