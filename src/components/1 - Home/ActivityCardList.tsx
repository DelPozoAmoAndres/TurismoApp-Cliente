import React from 'react';
/* Ionic components */
import { IonGrid, IonRow } from '@ionic/react';
/* Hooks */
import { usePopular } from '@hooks/usePopular';
/* Components */
import { ActivityItem } from '@components/2 - Search Activity/List/ActivityItem';

export const ActivityCardList: React.FC = () => {
  const { actividades } = usePopular(); //List of activities grouped by category

  return (
    <IonGrid class="limits-content ion-no-padding" >
      <IonRow class="grid-container ion-margin-bottom ion-margin-top ion-no-padding" >
        {actividades.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </IonRow>
    </IonGrid>
  );
};
