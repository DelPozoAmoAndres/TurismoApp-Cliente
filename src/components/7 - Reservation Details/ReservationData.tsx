import React from 'react';
/* Ionic Components */
import { IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonList, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '@models/Reservation';

export const ReservationData: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  return (
    <>
      <IonCardHeader class='ion-no-padding'>
        <IonCardTitle>Datos del reservante:</IonCardTitle>
      </IonCardHeader>
      <IonCardContent class="ion-margin-start ion-no-padding">
        <IonList>
          <IonLabel color={'primary'}>
            <strong>Nombre y apellidos: </strong>
          </IonLabel>
          <IonText color={'dark'}>{String(reservation?.name)}</IonText>
        </IonList>
        <IonList>
          <IonLabel color={'primary'}>
            <strong>Email: </strong>
          </IonLabel>
          <IonText color={'dark'}>{String(reservation?.email)}</IonText>
        </IonList>
        <IonList hidden={!reservation?.telephone}>
          <IonLabel color={'primary'}>
            <strong>Teléfono: </strong>
          </IonLabel>
          <IonText color={'dark'}>{String(reservation?.telephone)}</IonText>
        </IonList>
      </IonCardContent>
      <IonCardHeader class='ion-no-padding'>
        <IonCardTitle>Datos de la reserva: </IonCardTitle>
      </IonCardHeader>
      <IonCardContent class="ion-margin-start ion-no-padding">
        <IonList>
          <IonLabel color={'primary'}>
            <strong>Número de personas: </strong>
          </IonLabel>
          <IonText color={'dark'}>{String(reservation?.numPersons)}</IonText>
        </IonList>
        <IonList>
          <IonLabel color={'primary'}>
            <strong>Percio total: </strong>
          </IonLabel>
          <IonText color={'dark'}>{String(reservation?.price)}€</IonText>
        </IonList>
        <IonList>
          <IonLabel color={'primary'}>
            <strong>Estado: </strong>
          </IonLabel>
          <IonText color={'dark'}>{reservation?.state}</IonText>
        </IonList>
      </IonCardContent>
    </>
  );
};
