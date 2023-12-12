import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonModal, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

declare interface DateSelectorProps {
  page: React.MutableRefObject<null>;
  setBirthday: (arg0: Date) => void;
  presentation: typeof IonDatetime.prototype.defaultProps.presentation;
  initialBreakpoint: number;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ page, setBirthday, presentation, initialBreakpoint }) => {
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const [fecha, setFecha] = useState<Date>(new Date());
  useEffect(() => {
    setPresentingElement(page.current);
  }, [page]);

  const handleDateChange = (value: Date) => {
    setFecha(value);
  };

  function dismiss() {
    modal.current?.dismiss();
  }

  async function canDismiss(role?: string) {
    return role !== 'gesture';
  }

  const { defaultLanguage } = useLanguage();

  return (
    <>
      <IonModal
        ref={modal}
        trigger="open-modal"
        animated
        initialBreakpoint={initialBreakpoint}
        canDismiss={canDismiss}
        presentingElement={presentingElement || undefined}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => dismiss()}>Cancelar</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setBirthday(fecha);
                  dismiss();
                }}
              >
                Aceptar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonDatetime
            locale={defaultLanguage.code}
            presentation={presentation}
            onIonChange={(e) => handleDateChange(new Date(e.detail.value as string))}
          />
        </IonContent>
      </IonModal>
    </>
  );
};
