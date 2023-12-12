import React from 'react';
/* Ionic Components */
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel, IonList, IonText } from '@ionic/react';
/* Utils */
import { formatDate } from '@utils/Utils';
/* Models */
import { Reservation } from '@models/Reservation';
/* Hooks */
import { useScreen } from '@hooks/useScreen';

export const ReservationActivityData: React.FC<{
  reservation: Reservation;
}> = ({ reservation }) => {
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions

  return (
    <div className={isMobile ? 'ion-margin-horizontal' : ''} style={{maxWidth:"500px"}}>
      <IonCard>
        <IonImg
          src={reservation?.activity?.images[0]}
          style={{ maxWidth: isMobile ? 'none' : 500,"object-fit": "cover", "aspect-ratio": 4/3,"margin-bottom": "-10px"}}
        />
      </IonCard>
      <section hidden={isMobile}>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{reservation?.activity?.name}</IonCardTitle>
            <IonCardSubtitle>{formatDate(reservation?.event?.date || null, true)}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonLabel>
                <strong>Descripción:</strong>
              </IonLabel>
              <IonText>{String(reservation?.activity?.description)}</IonText>
            </IonList>
          </IonCardContent>
        </IonCard>
      </section>
    </div>
  );
};
