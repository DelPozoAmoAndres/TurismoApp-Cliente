import React from 'react';
/* Ionic Comments */
import { IonButton } from '@ionic/react';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';

export const DiagramSteps: React.FC = () => {
  const { step, setStep } = useReservation(); //Context of reservation
  return (
    <div className="ion-align-items-center" style={{ display: 'flex' }}>
      <IonButton onClick={() => setStep(1)} color={'primary'} shape="round" disabled={step == 3}>
        1
      </IonButton>
      <div
        style={{
          borderBottom: '1px solid var(--ion-color-primary)',
          width: '50%',
        }}
      />
      <IonButton onClick={() => setStep(1)} color={step < 2 ? 'dark' : 'primary'} disabled={step != 2} shape="round">
        2
      </IonButton>
      <div
        style={{
          borderBottom: `1px solid var(${step > 1 ? '--ion-color-primary' : '--color'})`,
          width: '50%',
        }}
      />
      <IonButton onClick={() => setStep(1)} color={step < 3 ? 'dark' : 'primary'} disabled={step < 3} shape="round">
        3
      </IonButton>
    </div>
  );
};
