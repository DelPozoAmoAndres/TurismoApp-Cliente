import { Capacitor } from '@capacitor/core';
import { useScreen } from '@hooks/useScreen';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Modal: React.FC<{
  id: string;
  children: React.ReactNode;
  modal: React.RefObject<HTMLIonModalElement>;
  minHeightIos?: number;
  minHeightAndroid?: number;
  trigger?: string;
  title: string;
  isOpen?: boolean;
  height?: string;
  width?: string;
  onlyNative?: boolean;
  setOpen?: (isOpen: boolean) => void;
}> = ({ id, title, children, modal, trigger, minHeightAndroid, minHeightIos, isOpen = false, setOpen = null, height, width, onlyNative }) => {
  let initialBreakpoint = 1;
  let props = {};
  const { isMobile, browsingWeb } = useScreen();

  if (isMobile) {
    if ((onlyNative === undefined || (onlyNative === true && !browsingWeb))) {
      if ((Capacitor.getPlatform() == 'ios' || /iPhone|iPad|iPod/i.test(navigator.userAgent)) && minHeightIos !== undefined && window.innerHeight > minHeightIos) {
        //const minWidth = 492;
        initialBreakpoint = minHeightIos / window.innerHeight;
      } else if ((Capacitor.getPlatform() == 'android' || /Android/i.test(navigator.userAgent)) && minHeightAndroid !== undefined && window.innerHeight > minHeightAndroid) {
        //const minWidth = 550;
        initialBreakpoint = minHeightAndroid / window.innerHeight;
      }
    }
    const breakpoints = [0, initialBreakpoint, 1];
    props = { initialBreakpoint, breakpoints };
  }

  function dismiss() {
    modal.current?.dismiss();
  }

  const { t } = useTranslation();
  return (
    <IonModal ref={modal} id={id} trigger={trigger} {...props} isOpen={isOpen} style={{ "--height": height && !minHeightAndroid ? height : "", "--width": width ? width : "", "--max-width": width ? "" : "900px" }} onDidDismiss={() => setOpen && setOpen(!isOpen)}>
      <IonHeader mode="ios" collapse="fade" class="ion-margin-top">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>
              <IonIcon slot="end" icon={closeOutline} />
              <IonLabel slot="start">{t('ACTIONS.CLOSE')}</IonLabel>
            </IonButton>
          </IonButtons>
          {!isMobile && <IonTitle>{title}</IonTitle>}
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonModal>
  );
};
