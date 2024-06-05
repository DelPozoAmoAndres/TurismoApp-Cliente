import React from 'react';
/* Ionic Components */
import { IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import { useTranslation } from 'react-i18next';

export const ReservationInstructionsData = () => {
  const { t } = useTranslation();
  return (
    <div id="reservation-instructions" >
      <IonCard class='ion-margin-bottom'>
        <IonCardHeader>
          {t('RESERVATION.INSTRUCTION.IMPORTANT.TITLE')}
        </IonCardHeader>
        <IonCardContent>
          <p>{t('RESERVATION.INSTRUCTION.IMPORTANT.FIRST_PARAGRAPH')}</p>
          <p>{t('RESERVATION.INSTRUCTION.IMPORTANT.SECOND_PARAGRAPH')}</p>
        </IonCardContent>
        <IonCardHeader>
          {t('RESERVATION.INSTRUCTION.LOCATION.TITLE')}
        </IonCardHeader>
        <IonCardContent>
          <p>{t('RESERVATION.INSTRUCTION.LOCATION.FIRST_PARAGRAPH')}</p>
          <p>{t('RESERVATION.INSTRUCTION.LOCATION.SECOND_PARAGRAPH')}</p>
          <p>{t('RESERVATION.INSTRUCTION.LOCATION.THIRD_PARAGRAPH')}</p>
          <p>{t('RESERVATION.INSTRUCTION.LOCATION.FOURTH_PARAGRAPH')}</p>
        </IonCardContent>
      </IonCard >
    </div >
  );
};
