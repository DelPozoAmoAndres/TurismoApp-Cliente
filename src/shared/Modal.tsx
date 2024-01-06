import { Capacitor } from '@capacitor/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Modal: React.FC<{
  id: string;
  children: React.ReactNode;
  modal: React.RefObject<HTMLIonModalElement>;
  minWidthIos?: number;
  minWidthAndroid?: number;
  trigger?: string;
  tittle: string;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}> = ({ id, tittle, children, modal, trigger, minWidthAndroid, minWidthIos, isOpen = false, setOpen = null }) => {
  let initialBreakpoint = 0;
  let props = {};
  if (Capacitor.isNativePlatform()) {
    if (Capacitor.getPlatform() == 'ios' && minWidthIos!==undefined) {
      //const minWidth = 492;
      initialBreakpoint = minWidthIos / window.innerHeight;
    } else if (Capacitor.getPlatform() == 'android' && minWidthAndroid!==undefined) {
      //const minWidth = 550;
      initialBreakpoint = minWidthAndroid / window.innerHeight;
    }
    const breakpoints = [0, initialBreakpoint, 1];
    props = { initialBreakpoint, breakpoints };
  }

  function dismiss() {
    modal.current?.dismiss();
  }

  const { t } = useTranslation();
  return (
    <IonModal ref={modal} id={id} trigger={trigger} {...props} isOpen={isOpen}  onDidDismiss={()=> setOpen && setOpen(!isOpen)}>
      <IonHeader mode="ios" collapse="fade" class="ion-margin-top">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>
              <IonIcon slot="end" icon={closeOutline} />
              <IonLabel slot="start">{t('close')}</IonLabel>
            </IonButton>
          </IonButtons>
          <IonTitle>{tittle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonModal>
  );
};
