import React, { useState } from 'react';
/* Ionic components */
import { IonGrid, IonRow } from '@ionic/react';
/* Hooks */
import { useCategory } from '@hooks/useCategory';
/* Components */
import { ActivityItem } from '@components/2 - Search Activity/List/ActivityItem';

export const ActivityCardList: React.FC = () => {
  const { categories } = useCategory(); //List of activities grouped by category
  const [filtro] = useState<'populares' | 'montaña' | 'playa'>('populares'); // Variable to change between the 3 lists of activities

  return (
    <IonGrid class="limits-content ion-no-padding" >
      <IonRow class="grid-container ion-margin-bottom ion-margin-top">
        {/* <strong className="ion-no-margin">{t('welcome.categories.title')}</strong> */}
        <h2> <strong className="chosen-title">Los <span className="plus">+</span><span className="highlight">Elegidos</span></strong></h2>
        {categories[filtro].map((activity, index) => (
          <>
          <ActivityItem key={index} activity={activity} />
          {index == 0 && <ActivityItem key={index+100} activity={activity} />}
          </>
        ))}
      </IonRow>
    </IonGrid>
  );
};
