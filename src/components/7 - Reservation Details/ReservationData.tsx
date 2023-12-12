import React from 'react';
/* Ionic Components */
import { IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonList, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '@models/Reservation';

export const ReservationData: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  return (
    <>
      <IonCardHeader>
        <IonCardTitle>Datos del reservante:</IonCardTitle>
      </IonCardHeader>
      <IonCardContent class="ion-margin-start">
        <IonList>
          <IonLabel>
            <strong>Nombre y apellidos: </strong>
          </IonLabel>
          <IonText>{String(reservation?.name)}</IonText>
        </IonList>
        <IonList>
          <IonLabel>
            <strong>Email: </strong>
          </IonLabel>
          <IonText>{String(reservation?.email)}</IonText>
        </IonList>
        <IonList hidden={!reservation?.telephone}>
          <IonLabel>
            <strong>Teléfono: </strong>
          </IonLabel>
          <IonText>{String(reservation?.telephone)}</IonText>
        </IonList>
      </IonCardContent>
      <IonCardHeader>
        <IonCardTitle>Datos de la reserva: </IonCardTitle>
      </IonCardHeader>
      <IonCardContent class="ion-margin-start">
        <IonList>
          <IonLabel>
            <strong>Número de personas: </strong>
          </IonLabel>
          <IonText>{String(reservation?.numPersons)}</IonText>
        </IonList>
        <IonList>
          <IonLabel>
            <strong>Percio total: </strong>
          </IonLabel>
          <IonText>{String(reservation?.price)}€</IonText>
        </IonList>
        <IonList>
          <IonLabel>
            <strong>Estado: </strong>
          </IonLabel>
          <IonText>{reservation?.state}</IonText>
        </IonList>
      </IonCardContent>
    </>
  );
};
